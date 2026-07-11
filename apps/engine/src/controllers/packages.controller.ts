import type { RequestHandler } from 'express';
import { redis } from '../queue/client';
import { config } from '../config';
import { logger } from '../lib/logger';
import { extractMpack, installAndLoad } from '../marketplace/package-loader';
import { verifyPackage } from '../marketplace/package-verifier';
import { PACKAGE_EVENTS_CHANNEL, type PackageEvent } from '../marketplace/hot-load';
import { registry } from '../registry/node-registry';
import { integrationRegistry } from '../registry/integration-registry';

/**
 * POST /internal/packages/install
 *
 * Verifies and installs an .mpack bundle (base64). Serves both the
 * air-gapped bundle upload (always available) and the Marketplace install
 * path (gated in the API layer). On success the package is live in this
 * instance's registries and an install event is published for any other
 * engine instances.
 */
export const installPackage: RequestHandler = async (req, res, next) => {
  try {
    const { bundleBase64, registeredPublisherKey } = req.body as {
      bundleBase64?: string;
      registeredPublisherKey?: string;
    };

    if (!bundleBase64) {
      throw Object.assign(new Error('bundleBase64 is required'), { status: 400 });
    }

    let files: Map<string, Buffer>;
    try {
      files = extractMpack(Buffer.from(bundleBase64, 'base64'));
    } catch (err) {
      throw Object.assign(
        new Error(`bundle extraction failed: ${err instanceof Error ? err.message : String(err)}`),
        { status: 400, code: 'BUNDLE_INVALID' },
      );
    }

    const verification = verifyPackage(files, { registeredPublisherKey });
    if (verification.status === 'invalid') {
      throw Object.assign(
        new Error(`package verification failed: ${verification.errors.join('; ')}`),
        { status: 422, code: 'SIGNATURE_INVALID' },
      );
    }

    const loaded = installAndLoad(files, config.packagesDir);
    const generation = registry.hotLoad(loaded.nodes);
    if (loaded.integration) {
      integrationRegistry.register(loaded.integration);
    }

    const packageId = `${loaded.manifest.publisher}/${loaded.manifest.name}@${loaded.manifest.version}`;
    const event: PackageEvent = {
      event: 'installed',
      packageId,
      packageDir: `${config.packagesDir}/${loaded.manifest.publisher}-${loaded.manifest.name}-${loaded.manifest.version}`,
    };
    await redis.publish(PACKAGE_EVENTS_CHANNEL, JSON.stringify(event));

    logger.info(
      { packageId, status: verification.status, generation },
      'Package installed and hot-loaded',
    );

    res.status(201).json({
      packageId,
      publisher: loaded.manifest.publisher,
      name: loaded.manifest.name,
      version: loaded.manifest.version,
      scope: loaded.manifest.scope,
      signatureStatus: verification.status,
      countersigned: verification.countersigned,
      contentHash: verification.contentHash,
      publisherSig: loaded.manifest.publisherSignature,
      magicaalCountersig: loaded.manifest.magicaalSignature ?? null,
      nodeTypes: loaded.nodes.map((n) => n.type),
      manifest: loaded.manifest,
    });
  } catch (err) {
    next(err);
  }
};

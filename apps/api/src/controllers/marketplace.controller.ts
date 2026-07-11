import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import {
  marketplaceAccount,
  marketplaceCatalogCache,
  packageRegistry,
  assetLicenses,
  agents,
  promptVersions,
} from '../db/schema';
import { engineClient } from '../lib/engine-client';
import { config } from '../config';
import { encryptCredentials } from './integrations.controller';

const CATALOG_TTL_MS = 6 * 60 * 60 * 1000; // 6-hour refresh per MARKETPLACE_SPEC

function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

interface CatalogAsset {
  assetId: string;
  type: string;
  scope: string;
  publisher: string;
  name: string;
  version: string;
  downloadUrl?: string;
  pricing?: { model: string };
  publisherPublicKey?: string;
}

/** POST /v1/marketplace/account — link a MagiCaal Account by API key. */
export const linkAccount: RequestHandler = async (req, res, next) => {
  try {
    const { apiKey } = req.body as { apiKey?: string };
    if (!apiKey) {
      throw Object.assign(new Error('apiKey is required'), { status: 400 });
    }

    const response = await fetch(`${config.marketplaceApiUrl}/api/v1/accounts/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey }),
    });

    if (response.status === 401) {
      throw Object.assign(new Error('Invalid Marketplace API key'), { status: 401 });
    }
    if (!response.ok) {
      throw Object.assign(new Error(`Marketplace account verification failed (${response.status})`), {
        status: 502,
      });
    }

    const account = (await response.json()) as {
      accountId: string;
      displayName: string;
      plan: string;
    };

    const now = new Date();
    const apiKeyEnc = encryptCredentials(apiKey);
    const existing = await db.select().from(marketplaceAccount);
    if (existing[0]) {
      await db
        .update(marketplaceAccount)
        .set({ apiKeyEnc, updatedAt: now })
        .where(eq(marketplaceAccount.id, existing[0].id));
    } else {
      await db
        .insert(marketplaceAccount)
        .values({ id: newId(), apiKeyEnc, linkedAt: now, updatedAt: now });
    }

    res.status(201).json({
      linked: true,
      accountId: account.accountId,
      displayName: account.displayName,
      plan: account.plan,
    });
  } catch (err) {
    next(err);
  }
};

/** GET /v1/marketplace/account */
export const getAccount: RequestHandler = async (_req, res, next) => {
  try {
    const rows = await db.select().from(marketplaceAccount);
    if (!rows[0]) {
      res.json({ linked: false });
      return;
    }
    res.json({ linked: true, linkedAt: rows[0].linkedAt, updatedAt: rows[0].updatedAt });
  } catch (err) {
    next(err);
  }
};

async function fetchRemoteCatalog(): Promise<{ assets: CatalogAsset[] }> {
  const response = await fetch(`${config.marketplaceApiUrl}/api/v1/catalog`);
  if (!response.ok) {
    throw Object.assign(new Error(`Marketplace catalog fetch failed (${response.status})`), {
      status: 502,
    });
  }
  return (await response.json()) as { assets: CatalogAsset[] };
}

function readLocalCatalog(): { assets: CatalogAsset[] } {
  const raw = fs.readFileSync(config.marketplaceLocalCatalogPath, 'utf8');
  return JSON.parse(raw) as { assets: CatalogAsset[] };
}

/** GET /v1/marketplace/catalog — cached remote catalog, or the mounted local catalog. */
export const getCatalog: RequestHandler = async (req, res, next) => {
  try {
    if (config.marketplaceCatalogSource === 'local') {
      res.json(readLocalCatalog());
      return;
    }

    const forceRefresh = req.query.refresh === 'true';
    const cached = await db.select().from(marketplaceCatalogCache);
    const fresh =
      cached[0] && Date.now() - cached[0].fetchedAt.getTime() < CATALOG_TTL_MS && !forceRefresh;

    if (fresh) {
      res.json(JSON.parse(cached[0].catalogJson));
      return;
    }

    const catalog = await fetchRemoteCatalog();
    const now = new Date();
    if (cached[0]) {
      await db
        .update(marketplaceCatalogCache)
        .set({ fetchedAt: now, catalogJson: JSON.stringify(catalog) })
        .where(eq(marketplaceCatalogCache.id, cached[0].id));
    } else {
      await db.insert(marketplaceCatalogCache).values({
        id: newId(),
        fetchedAt: now,
        catalogJson: JSON.stringify(catalog),
      });
    }
    res.json(catalog);
  } catch (err) {
    next(err);
  }
};

/** GET /v1/marketplace/packages — installed packages for this tenant. */
export const listPackages: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const rows = await db
      .select({
        id: packageRegistry.id,
        name: packageRegistry.name,
        version: packageRegistry.version,
        publisher: packageRegistry.publisher,
        packageType: packageRegistry.packageType,
        installedAt: packageRegistry.installedAt,
        enabled: packageRegistry.enabled,
        signatureStatus: packageRegistry.signatureStatus,
      })
      .from(packageRegistry)
      .where(eq(packageRegistry.tenantId, tenantId));
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

interface EngineInstallResult {
  packageId: string;
  publisher: string;
  name: string;
  version: string;
  scope: string;
  signatureStatus: 'verified' | 'unverified' | 'invalid';
  contentHash: string;
  publisherSig: string;
  magicaalCountersig: string | null;
  nodeTypes: string[];
  manifest: Record<string, unknown>;
}

async function installBundle(
  tenantId: string,
  bundleBase64: string,
  registeredPublisherKey?: string,
): Promise<EngineInstallResult> {
  const engineRes = await engineClient.post('/internal/packages/install', {
    bundleBase64,
    registeredPublisherKey,
  });
  const result = engineRes.data as EngineInstallResult;

  const now = new Date();
  const rowId = newId();
  await db.insert(packageRegistry).values({
    id: rowId,
    tenantId,
    name: result.name,
    version: result.version,
    publisher: result.publisher,
    packageType: result.scope === 'integration' ? 'integration' : 'nodes',
    manifestJson: JSON.stringify(result.manifest),
    installedAt: now,
    enabled: true,
    publisherSig: result.publisherSig,
    contentHash: result.contentHash,
    magicaalCountersig: result.magicaalCountersig,
    signatureStatus: result.signatureStatus,
  });

  const pricing = (result.manifest.pricing ?? { model: 'free' }) as { model: string };
  await db.insert(assetLicenses).values({
    id: newId(),
    packageId: rowId,
    licenseType: pricing.model === 'free' ? 'free' : 'paid',
    status: 'active',
  });

  return result;
}

/** POST /v1/marketplace/packages/:id/install — install from the live catalog. */
export const installFromCatalog: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params; // catalog assetId

    const cached = await db.select().from(marketplaceCatalogCache);
    if (!cached[0]) {
      throw Object.assign(new Error('Catalog not loaded — fetch /v1/marketplace/catalog first'), {
        status: 409,
      });
    }
    const catalog = JSON.parse(cached[0].catalogJson) as { assets: CatalogAsset[] };
    const asset = catalog.assets.find((a) => a.assetId === id);
    if (!asset) {
      throw Object.assign(new Error('Asset not found in catalog'), { status: 404 });
    }
    if (!asset.downloadUrl) {
      throw Object.assign(new Error('Asset has no download URL'), { status: 422 });
    }

    const download = await fetch(asset.downloadUrl);
    if (!download.ok) {
      throw Object.assign(new Error(`Package download failed (${download.status})`), {
        status: 502,
      });
    }
    const bundleBase64 = Buffer.from(await download.arrayBuffer()).toString('base64');

    const result = await installBundle(tenantId, bundleBase64, asset.publisherPublicKey);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

/** POST /v1/marketplace/packages/:id/update — reinstall the newest catalog version. */
export const updatePackage: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params; // package_registry row id

    const rows = await db
      .select()
      .from(packageRegistry)
      .where(eq(packageRegistry.id, id));
    const installed = rows[0];
    if (!installed || installed.tenantId !== tenantId) {
      throw Object.assign(new Error('Package not found'), { status: 404 });
    }

    const cached = await db.select().from(marketplaceCatalogCache);
    const catalog = cached[0]
      ? (JSON.parse(cached[0].catalogJson) as { assets: CatalogAsset[] })
      : { assets: [] };
    const asset = catalog.assets.find(
      (a) => a.publisher === installed.publisher && a.name === installed.name,
    );
    if (!asset?.downloadUrl) {
      throw Object.assign(new Error('No catalog version available for this package'), {
        status: 404,
      });
    }
    if (asset.version === installed.version) {
      res.json({ updated: false, version: installed.version });
      return;
    }

    const download = await fetch(asset.downloadUrl);
    if (!download.ok) {
      throw Object.assign(new Error(`Package download failed (${download.status})`), {
        status: 502,
      });
    }
    const bundleBase64 = Buffer.from(await download.arrayBuffer()).toString('base64');
    const result = await installBundle(tenantId, bundleBase64, asset.publisherPublicKey);

    await db
      .update(packageRegistry)
      .set({ enabled: false })
      .where(eq(packageRegistry.id, installed.id));

    res.json({ updated: true, from: installed.version, to: result.version });
  } catch (err) {
    next(err);
  }
};

/** DELETE /v1/marketplace/packages/:id — disable an installed package. */
export const removePackage: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params;

    const rows = await db.select().from(packageRegistry).where(eq(packageRegistry.id, id));
    if (!rows[0] || rows[0].tenantId !== tenantId) {
      throw Object.assign(new Error('Package not found'), { status: 404 });
    }

    // Disable rather than delete: in-flight runs may still hold the module;
    // the loaded code unloads on the next engine restart.
    await db.update(packageRegistry).set({ enabled: false }).where(eq(packageRegistry.id, id));
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

/** GET /v1/marketplace/licenses */
export const listLicenses: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const rows = await db
      .select({
        id: assetLicenses.id,
        packageId: assetLicenses.packageId,
        licenseType: assetLicenses.licenseType,
        status: assetLicenses.status,
        expiresAt: assetLicenses.expiresAt,
        lastValidatedAt: assetLicenses.lastValidatedAt,
        packageName: packageRegistry.name,
        packageVersion: packageRegistry.version,
        publisher: packageRegistry.publisher,
      })
      .from(assetLicenses)
      .innerJoin(packageRegistry, eq(assetLicenses.packageId, packageRegistry.id))
      .where(eq(packageRegistry.tenantId, tenantId));
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /v1/marketplace/licenses/bundle — air-gapped bundle upload.
 * ALWAYS active regardless of MARKETPLACE_ENABLED: this is the install path
 * for deployments with no Marketplace connectivity.
 */
export const uploadLicenseBundle: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { bundleBase64 } = req.body as { bundleBase64?: string };

    if (!bundleBase64) {
      throw Object.assign(new Error('bundleBase64 is required'), { status: 400 });
    }

    const result = await installBundle(tenantId, bundleBase64);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

/** POST /v1/marketplace/templates/import — import an agent template as a DRAFT agent. */
export const importTemplate: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { template, parameters, name, handle } = req.body as {
      template?: { parameters?: Record<string, unknown>; graph?: unknown };
      parameters?: Record<string, string>;
      name?: string;
      handle?: string;
    };

    if (!template?.graph || !name || !handle) {
      throw Object.assign(new Error('template.graph, name, and handle are required'), {
        status: 400,
      });
    }

    // Replace {{param}} tokens in the serialized graph
    let graphJson = JSON.stringify(template.graph);
    for (const [key, value] of Object.entries(parameters ?? {})) {
      graphJson = graphJson.split(`{{${key}}}`).join(value);
    }
    const unresolved = graphJson.match(/\{\{([a-zA-Z0-9_]+)\}\}/);
    if (unresolved) {
      throw Object.assign(new Error(`Unresolved template parameter: ${unresolved[1]}`), {
        status: 422,
      });
    }

    const now = new Date();
    const [created] = await db
      .insert(agents)
      .values({
        id: crypto.randomUUID(),
        tenantId,
        name,
        handle,
        status: 'draft',
        authoringMode: 'studio',
        draftGraphJson: graphJson,
        enabled: true,
        createdAt: now,
        updatedAt: now,
      })
      .returning({ id: agents.id, name: agents.name, handle: agents.handle, status: agents.status });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

/** POST /v1/marketplace/prompt-packs/import — import prompt versions under a pack namespace. */
export const importPromptPack: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId, userId } = req.user!;
    const { pack } = req.body as {
      pack?: {
        publisher?: string;
        name?: string;
        prompts?: Array<{ name: string; content: string }>;
      };
    };

    if (!pack?.publisher || !pack?.name || !Array.isArray(pack.prompts) || pack.prompts.length === 0) {
      throw Object.assign(new Error('pack.publisher, pack.name, and pack.prompts are required'), {
        status: 400,
      });
    }

    const namespace = `pack:${pack.publisher}:${pack.name}`;
    const now = new Date();
    const imported: string[] = [];

    for (const prompt of pack.prompts) {
      const fullName = `${namespace}:${prompt.name}`;
      await db.insert(promptVersions).values({
        id: crypto.randomUUID(),
        tenantId,
        name: fullName,
        versionNumber: 1,
        content: prompt.content,
        createdBy: userId,
        isActive: true,
        packNamespace: namespace,
        createdAt: now,
      });
      imported.push(fullName);
    }

    res.status(201).json({ namespace, imported });
  } catch (err) {
    next(err);
  }
};

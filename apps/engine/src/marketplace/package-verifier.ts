import * as crypto from 'node:crypto';
import { magicaalSigningPublicKey } from './signing-keys';

/** manifest.json integrity fields (subset of the full PackageManifest). */
export interface PackageManifest {
  scope: 'integration' | 'community';
  publisher: string;
  name: string;
  version: string;
  nodeTypes?: Array<{ type: string; name: string; category: string }>;
  contentHash: string;
  publisherPublicKey: string;
  publisherSignature: string;
  magicaalSignature?: string;
  [key: string]: unknown;
}

export type SignatureStatus = 'verified' | 'unverified' | 'invalid';

export interface VerificationResult {
  status: SignatureStatus;
  contentHash: string;
  countersigned: boolean;
  errors: string[];
}

/** SPKI DER prefix for a raw Ed25519 public key (RFC 8410). */
const ED25519_SPKI_PREFIX = Buffer.from('302a300506032b6570032100', 'hex');

function ed25519PublicKey(base64Raw: string): crypto.KeyObject {
  const raw = Buffer.from(base64Raw, 'base64');
  if (raw.length !== 32) {
    throw new Error(`Ed25519 public key must be 32 bytes, got ${raw.length}`);
  }
  return crypto.createPublicKey({
    key: Buffer.concat([ED25519_SPKI_PREFIX, raw]),
    format: 'der',
    type: 'spki',
  });
}

function verifyEd25519(publicKeyBase64: string, data: Buffer, signatureBase64: string): boolean {
  try {
    const key = ed25519PublicKey(publicKeyBase64);
    return crypto.verify(null, data, key, Buffer.from(signatureBase64, 'base64'));
  } catch {
    return false;
  }
}

/**
 * Content hash per MARKETPLACE_SPEC §4.3:
 * SHA-256 over `path + ":" + SHA-256(content)` for every bundle file except
 * PUBLISHER_SIG, sorted by path. manifest.json is hashed with its integrity
 * fields (contentHash, publisherSignature, magicaalSignature) stripped, since
 * those are written after hashing.
 */
export function computeContentHash(files: Map<string, Buffer>): string {
  const entries: string[] = [];

  for (const [path, content] of files) {
    if (path === 'PUBLISHER_SIG') continue;

    let effective = content;
    if (path === 'manifest.json') {
      const manifest = JSON.parse(content.toString('utf8')) as Record<string, unknown>;
      delete manifest.contentHash;
      delete manifest.publisherSignature;
      delete manifest.magicaalSignature;
      effective = Buffer.from(JSON.stringify(manifest));
    }

    const fileHash = crypto.createHash('sha256').update(effective).digest('hex');
    entries.push(`${path}:${fileHash}`);
  }

  entries.sort();
  return crypto.createHash('sha256').update(entries.join('\n')).digest('hex');
}

export interface VerifyOptions {
  /**
   * Publisher public key registered with the Marketplace catalog. When
   * provided, the manifest's embedded key must match it (prevents key
   * substitution). Air-gapped installs without catalog access skip this check.
   */
  registeredPublisherKey?: string;
  /**
   * Official (`scope: integration`) packages must carry a valid MagiCaal
   * countersignature. Community packages without one verify as 'unverified'
   * and are subject to the community package policy.
   */
  requireCountersignature?: boolean;
}

/**
 * Three-step platform-side verification per MARKETPLACE_SPEC §5.3:
 * publisher signature → content hash → MagiCaal countersignature.
 */
export function verifyPackage(
  files: Map<string, Buffer>,
  opts: VerifyOptions = {},
): VerificationResult {
  const errors: string[] = [];

  const manifestBuf = files.get('manifest.json');
  if (!manifestBuf) {
    return {
      status: 'invalid',
      contentHash: '',
      countersigned: false,
      errors: ['bundle has no manifest.json'],
    };
  }

  let manifest: PackageManifest;
  try {
    manifest = JSON.parse(manifestBuf.toString('utf8')) as PackageManifest;
  } catch {
    return {
      status: 'invalid',
      contentHash: '',
      countersigned: false,
      errors: ['manifest.json is not valid JSON'],
    };
  }

  if (!files.has('index.js')) errors.push('bundle has no index.js');

  // Step 2 (computed first — steps 1 and 3 verify signatures over it):
  // recompute the content hash and compare with the manifest claim.
  const contentHash = computeContentHash(files);
  if (manifest.contentHash !== contentHash) {
    errors.push(
      `content hash mismatch: manifest claims ${manifest.contentHash}, bundle hashes to ${contentHash}`,
    );
  }

  // Step 1: publisher signature over the content hash.
  if (!manifest.publisherPublicKey || !manifest.publisherSignature) {
    errors.push('manifest is missing publisherPublicKey or publisherSignature');
  } else {
    if (
      opts.registeredPublisherKey !== undefined &&
      opts.registeredPublisherKey !== manifest.publisherPublicKey
    ) {
      errors.push('manifest publisher key does not match the registered publisher key');
    }
    if (
      !verifyEd25519(
        manifest.publisherPublicKey,
        Buffer.from(contentHash, 'utf8'),
        manifest.publisherSignature,
      )
    ) {
      errors.push('publisher signature verification failed');
    }
  }

  // Step 3: MagiCaal countersignature over the content hash.
  let countersigned = false;
  if (manifest.magicaalSignature) {
    const pinnedKey = magicaalSigningPublicKey();
    if (!pinnedKey) {
      errors.push('package carries a countersignature but no MagiCaal signing key is configured');
    } else if (
      verifyEd25519(pinnedKey, Buffer.from(contentHash, 'utf8'), manifest.magicaalSignature)
    ) {
      countersigned = true;
    } else {
      errors.push('MagiCaal countersignature verification failed');
    }
  }

  const requireCountersig = opts.requireCountersignature ?? manifest.scope === 'integration';
  if (requireCountersig && !countersigned && errors.length === 0) {
    errors.push('official packages require a valid MagiCaal countersignature');
  }

  if (errors.length > 0) {
    return { status: 'invalid', contentHash, countersigned, errors };
  }
  return {
    status: countersigned ? 'verified' : 'unverified',
    contentHash,
    countersigned,
    errors: [],
  };
}

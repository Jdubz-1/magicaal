import * as crypto from 'node:crypto';
import * as zlib from 'node:zlib';

/**
 * Ed25519 signing + ustar bundle builders, lifted out of
 * tests/unit/marketplace/package-verifier.test.ts and package-loader.test.ts
 * (duplicated there) so the /internal/packages/install route test can post a
 * genuinely signed .mpack the same way the real publisher CLI would produce.
 */

export function rawPublicKeyBase64(publicKey: crypto.KeyObject): string {
  const spki = publicKey.export({ format: 'der', type: 'spki' });
  return spki.subarray(spki.length - 32).toString('base64');
}

export function sign(privateKey: crypto.KeyObject, data: string): string {
  return crypto.sign(null, Buffer.from(data, 'utf8'), privateKey).toString('base64');
}

export interface BundleOptions {
  scope?: 'integration' | 'community';
  countersign?: boolean;
  magicaalKeys?: crypto.KeyPairKeyObjectResult;
  publisher?: string;
  name?: string;
  version?: string;
  nodeType?: string;
  tamperAfterSigning?: (files: Map<string, Buffer>) => void;
}

/** Builds a signed, verifier-shaped manifest.json + index.js file map. */
export function buildSignedFiles(
  publisherKeys: crypto.KeyPairKeyObjectResult,
  opts: BundleOptions,
): Map<string, Buffer> {
  const files = new Map<string, Buffer>();
  const nodeType = opts.nodeType ?? 'community:demo:hello';
  files.set(
    'index.js',
    Buffer.from(
      `module.exports.NODES = [{ type: ${JSON.stringify(nodeType)}, meta: {}, schema: {}, execute: async () => ({ status: 'complete', outputs: {} }) }];`,
    ),
  );

  const manifest: Record<string, unknown> = {
    scope: opts.scope ?? 'community',
    publisher: opts.publisher ?? 'acme',
    name: opts.name ?? 'demo',
    version: opts.version ?? '1.0.0',
    publisherPublicKey: rawPublicKeyBase64(publisherKeys.publicKey),
  };
  files.set('manifest.json', Buffer.from(JSON.stringify(manifest)));

  const contentHash = computeContentHashLike(files);
  manifest.contentHash = contentHash;
  manifest.publisherSignature = sign(publisherKeys.privateKey, contentHash);
  if (opts.countersign && opts.magicaalKeys) {
    manifest.magicaalSignature = sign(opts.magicaalKeys.privateKey, contentHash);
  }
  files.set('manifest.json', Buffer.from(JSON.stringify(manifest)));

  opts.tamperAfterSigning?.(files);
  return files;
}

/**
 * Mirrors src/marketplace/package-verifier.ts's computeContentHash exactly
 * (re-implemented rather than imported so this helper has no src/ dependency
 * beyond crypto/zlib primitives — the route test asserts against the real
 * verifier's behavior, not this one).
 */
function computeContentHashLike(files: Map<string, Buffer>): string {
  const entries: string[] = [];
  for (const [filePath, content] of files) {
    if (filePath === 'PUBLISHER_SIG') continue;
    let effective = content;
    if (filePath === 'manifest.json') {
      const manifest = JSON.parse(content.toString('utf8')) as Record<string, unknown>;
      delete manifest.contentHash;
      delete manifest.publisherSignature;
      delete manifest.magicaalSignature;
      effective = Buffer.from(JSON.stringify(manifest));
    }
    const fileHash = crypto.createHash('sha256').update(effective).digest('hex');
    entries.push(`${filePath}:${fileHash}`);
  }
  entries.sort();
  return crypto.createHash('sha256').update(entries.join('\n')).digest('hex');
}

/** Pack a 512-byte ustar header for a plain file entry. */
function ustarHeader(name: string, size: number): Buffer {
  const header = Buffer.alloc(512);
  header.write(name, 0, 100, 'utf8');
  header.write('0000644\0', 100, 8, 'utf8'); // mode
  header.write('0000000\0', 108, 8, 'utf8'); // uid
  header.write('0000000\0', 116, 8, 'utf8'); // gid
  header.write(size.toString(8).padStart(11, '0') + '\0', 124, 12, 'utf8');
  header.write('00000000000\0', 136, 12, 'utf8'); // mtime
  header.write('        ', 148, 8, 'utf8'); // checksum placeholder (spaces)
  header[156] = 0x30; // typeflag '0' = regular file
  header.write('ustar\0', 257, 6, 'utf8');
  header.write('00', 263, 2, 'utf8'); // ustar version

  let checksum = 0;
  for (let i = 0; i < 512; i++) checksum += header[i];
  header.write(checksum.toString(8).padStart(6, '0') + '\0 ', 148, 8, 'utf8');

  return header;
}

/** Build a gzipped tar (.mpack) from a path → content map. */
export function buildMpack(files: Map<string, Buffer>): Buffer {
  const chunks: Buffer[] = [];
  for (const [name, content] of files) {
    chunks.push(ustarHeader(name, content.length));
    chunks.push(content);
    const padding = (512 - (content.length % 512)) % 512;
    if (padding > 0) chunks.push(Buffer.alloc(padding));
  }
  chunks.push(Buffer.alloc(1024)); // two zero blocks terminate the archive
  const tar = Buffer.concat(chunks);
  return zlib.gzipSync(tar);
}

/** Convenience: a signed (and optionally countersigned) .mpack, base64-encoded. */
export function buildSignedMpackBase64(
  publisherKeys: crypto.KeyPairKeyObjectResult,
  opts: BundleOptions,
): string {
  const files = buildSignedFiles(publisherKeys, opts);
  return buildMpack(files).toString('base64');
}

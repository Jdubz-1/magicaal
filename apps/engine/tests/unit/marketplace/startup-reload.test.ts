import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

const packagesDir = fs.mkdtempSync(path.join(os.tmpdir(), 'magicaal-packages-'));

jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

jest.mock('@/config', () => ({
  config: {
    packagesDir,
    marketplaceAllowUnverified: false,
    databasePath: 'file::memory:',
  },
}));

import { computeContentHash } from '@/marketplace/package-verifier';
import { reloadInstalledPackages } from '@/marketplace/hot-load';
import { registry } from '@/registry/node-registry';

const publisherKeys = crypto.generateKeyPairSync('ed25519');
const magicaalKeys = crypto.generateKeyPairSync('ed25519');

function rawPublicKeyBase64(publicKey: crypto.KeyObject): string {
  const spki = publicKey.export({ format: 'der', type: 'spki' });
  return spki.subarray(spki.length - 32).toString('base64');
}

function sign(privateKey: crypto.KeyObject, data: string): string {
  return crypto.sign(null, Buffer.from(data, 'utf8'), privateKey).toString('base64');
}

/** Write a signed, countersigned package into the install dir, as an install would. */
function writeInstalledPackage(name: string, nodeType: string, countersign = true): string {
  const files = new Map<string, Buffer>();
  files.set(
    'index.js',
    Buffer.from(
      `module.exports.NODES = [{ type: ${JSON.stringify(nodeType)}, meta: {}, schema: {}, execute: async () => ({ status: 'complete', outputs: {} }) }];`,
    ),
  );

  const manifest: Record<string, unknown> = {
    scope: 'community',
    publisher: 'acme',
    name,
    version: '1.0.0',
    publisherPublicKey: rawPublicKeyBase64(publisherKeys.publicKey),
  };
  files.set('manifest.json', Buffer.from(JSON.stringify(manifest)));

  const contentHash = computeContentHash(files);
  manifest.contentHash = contentHash;
  manifest.publisherSignature = sign(publisherKeys.privateKey, contentHash);
  if (countersign) {
    manifest.magicaalSignature = sign(magicaalKeys.privateKey, contentHash);
  }
  files.set('manifest.json', Buffer.from(JSON.stringify(manifest)));

  const dir = path.join(packagesDir, `acme-${name}-1.0.0`);
  fs.mkdirSync(dir, { recursive: true });
  for (const [rel, content] of files) {
    fs.writeFileSync(path.join(dir, rel), content);
  }
  return dir;
}

const originalEnvKey = process.env.MAGICAAL_SIGNING_PUBLIC_KEY;

beforeAll(() => {
  process.env.MAGICAAL_SIGNING_PUBLIC_KEY = rawPublicKeyBase64(magicaalKeys.publicKey);
});

afterAll(() => {
  if (originalEnvKey === undefined) delete process.env.MAGICAAL_SIGNING_PUBLIC_KEY;
  else process.env.MAGICAAL_SIGNING_PUBLIC_KEY = originalEnvKey;
  fs.rmSync(packagesDir, { recursive: true, force: true });
});

describe('reloadInstalledPackages (ISS-050)', () => {
  it('re-registers a package installed in a previous boot', () => {
    writeInstalledPackage('demo', 'community:demo:hello');

    expect(() => registry.get('community:demo:hello')).toThrow(/Unknown node type/);

    reloadInstalledPackages();

    expect(registry.get('community:demo:hello').type).toBe('community:demo:hello');
  });

  it('skips a package whose on-disk code was tampered with after install', () => {
    const dir = writeInstalledPackage('evil', 'community:evil:pwn');
    // Swap index.js without re-signing — the content hash no longer matches
    fs.writeFileSync(path.join(dir, 'index.js'), 'module.exports.NODES = []; /* injected */');

    reloadInstalledPackages();

    expect(() => registry.get('community:evil:pwn')).toThrow(/Unknown node type/);
  });

  it('refuses an unverified (non-countersigned) package by default', () => {
    writeInstalledPackage('selfsigned', 'community:selfsigned:x', false);

    reloadInstalledPackages();

    expect(() => registry.get('community:selfsigned:x')).toThrow(/Unknown node type/);
  });

  it('is a no-op when the packages directory does not exist', () => {
    jest.isolateModules(() => {
      expect(() => reloadInstalledPackages()).not.toThrow();
    });
  });
});

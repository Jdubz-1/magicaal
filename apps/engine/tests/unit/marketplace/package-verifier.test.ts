import * as crypto from 'node:crypto';
import {
  computeContentHash,
  verifyPackage,
  isInstallAllowed,
} from '@/marketplace/package-verifier';

function rawPublicKeyBase64(publicKey: crypto.KeyObject): string {
  const spki = publicKey.export({ format: 'der', type: 'spki' });
  return spki.subarray(spki.length - 32).toString('base64');
}

function sign(privateKey: crypto.KeyObject, data: string): string {
  return crypto.sign(null, Buffer.from(data, 'utf8'), privateKey).toString('base64');
}

interface BundleOptions {
  scope?: 'integration' | 'community';
  countersign?: boolean;
  tamperAfterSigning?: (files: Map<string, Buffer>) => void;
}

const publisherKeys = crypto.generateKeyPairSync('ed25519');
const magicaalKeys = crypto.generateKeyPairSync('ed25519');

function makeSignedBundle(opts: BundleOptions = {}): Map<string, Buffer> {
  const files = new Map<string, Buffer>();
  files.set('index.js', Buffer.from('module.exports.NODES = [];'));
  files.set('index.d.ts', Buffer.from('export declare const NODES: unknown[];'));

  const manifest: Record<string, unknown> = {
    scope: opts.scope ?? 'community',
    publisher: 'acme',
    name: 'demo',
    version: '1.0.0',
    publisherPublicKey: rawPublicKeyBase64(publisherKeys.publicKey),
  };
  files.set('manifest.json', Buffer.from(JSON.stringify(manifest)));

  const contentHash = computeContentHash(files);
  manifest.contentHash = contentHash;
  manifest.publisherSignature = sign(publisherKeys.privateKey, contentHash);
  if (opts.countersign) {
    manifest.magicaalSignature = sign(magicaalKeys.privateKey, contentHash);
  }
  files.set('manifest.json', Buffer.from(JSON.stringify(manifest)));
  files.set('PUBLISHER_SIG', Buffer.from(manifest.publisherSignature as string));

  opts.tamperAfterSigning?.(files);
  return files;
}

const originalEnvKey = process.env.MAGICAAL_SIGNING_PUBLIC_KEY;

beforeAll(() => {
  process.env.MAGICAAL_SIGNING_PUBLIC_KEY = rawPublicKeyBase64(magicaalKeys.publicKey);
});

afterAll(() => {
  if (originalEnvKey === undefined) delete process.env.MAGICAAL_SIGNING_PUBLIC_KEY;
  else process.env.MAGICAAL_SIGNING_PUBLIC_KEY = originalEnvKey;
});

describe('computeContentHash', () => {
  it('is stable across manifest integrity-field changes', () => {
    const bundle = makeSignedBundle();
    const manifest = JSON.parse(bundle.get('manifest.json')!.toString());
    expect(computeContentHash(bundle)).toBe(manifest.contentHash);
  });

  it('changes when any bundle file changes', () => {
    const a = makeSignedBundle();
    const b = makeSignedBundle({
      tamperAfterSigning: (files) => files.set('index.js', Buffer.from('evil();')),
    });
    expect(computeContentHash(a)).not.toBe(computeContentHash(b));
  });
});

describe('verifyPackage', () => {
  it('verifies a countersigned community package as verified', () => {
    const result = verifyPackage(makeSignedBundle({ countersign: true }));
    expect(result.status).toBe('verified');
    expect(result.countersigned).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('accepts a non-countersigned community package as unverified', () => {
    const result = verifyPackage(makeSignedBundle({ scope: 'community' }));
    expect(result.status).toBe('unverified');
    expect(result.countersigned).toBe(false);
  });

  it('rejects a non-countersigned official (integration-scope) package', () => {
    const result = verifyPackage(makeSignedBundle({ scope: 'integration' }));
    expect(result.status).toBe('invalid');
    expect(result.errors.join(' ')).toContain('countersignature');
  });

  it('verifies a countersigned official package', () => {
    const result = verifyPackage(
      makeSignedBundle({ scope: 'integration', countersign: true }),
    );
    expect(result.status).toBe('verified');
  });

  it('rejects content tampered after signing', () => {
    const result = verifyPackage(
      makeSignedBundle({
        countersign: true,
        tamperAfterSigning: (files) => files.set('index.js', Buffer.from('evil();')),
      }),
    );
    expect(result.status).toBe('invalid');
    expect(result.errors.join(' ')).toContain('content hash mismatch');
  });

  it('rejects a publisher key substitution', () => {
    const otherKeys = crypto.generateKeyPairSync('ed25519');
    const result = verifyPackage(makeSignedBundle({ countersign: true }), {
      registeredPublisherKey: rawPublicKeyBase64(otherKeys.publicKey),
    });
    expect(result.status).toBe('invalid');
    expect(result.errors.join(' ')).toContain('registered publisher key');
  });

  it('rejects a signature from the wrong publisher key', () => {
    const result = verifyPackage(
      makeSignedBundle({
        tamperAfterSigning: (files) => {
          const manifest = JSON.parse(files.get('manifest.json')!.toString());
          const rogue = crypto.generateKeyPairSync('ed25519');
          manifest.publisherSignature = sign(rogue.privateKey, manifest.contentHash);
          files.set('manifest.json', Buffer.from(JSON.stringify(manifest)));
        },
      }),
    );
    expect(result.status).toBe('invalid');
    expect(result.errors.join(' ')).toContain('publisher signature');
  });

  it('rejects a bundle with no manifest', () => {
    const files = new Map<string, Buffer>([['index.js', Buffer.from('x')]]);
    expect(verifyPackage(files).status).toBe('invalid');
  });
});

describe('isInstallAllowed', () => {
  it('always allows verified (countersigned) packages', () => {
    expect(isInstallAllowed('verified', false)).toBe(true);
    expect(isInstallAllowed('verified', true)).toBe(true);
  });

  it('refuses unverified packages unless explicitly opted in', () => {
    expect(isInstallAllowed('unverified', false)).toBe(false);
    expect(isInstallAllowed('unverified', true)).toBe(true);
  });

  it('never allows invalid packages', () => {
    expect(isInstallAllowed('invalid', false)).toBe(false);
    expect(isInstallAllowed('invalid', true)).toBe(false);
  });
});

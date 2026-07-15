import * as crypto from 'node:crypto';
import * as zlib from 'node:zlib';
import request from 'supertest';
import type { Application } from 'express';
import { buildTestApp, internalAuthHeader } from '../helpers/app';
import { buildSignedFiles, buildMpack, rawPublicKeyBase64 } from '../helpers/mpack';
import { registry } from '@/registry/node-registry';

describe('POST /internal/packages/install', () => {
  let app: Application;
  const publisherKeys = crypto.generateKeyPairSync('ed25519');
  const magicaalKeys = crypto.generateKeyPairSync('ed25519');
  const originalSigningKey = process.env.MAGICAAL_SIGNING_PUBLIC_KEY;

  beforeAll(async () => {
    app = await buildTestApp();
    process.env.MAGICAAL_SIGNING_PUBLIC_KEY = rawPublicKeyBase64(magicaalKeys.publicKey);
  });

  afterAll(() => {
    if (originalSigningKey === undefined) delete process.env.MAGICAAL_SIGNING_PUBLIC_KEY;
    else process.env.MAGICAAL_SIGNING_PUBLIC_KEY = originalSigningKey;
  });

  // Payload mirrors apps/api/src/controllers/marketplace.controller.ts's
  // installBundle: { bundleBase64, registeredPublisherKey }.
  it('installs and hot-loads a signed, countersigned bundle', async () => {
    const nodeType = `community:demo:${crypto.randomUUID().slice(0, 8)}`;
    const files = buildSignedFiles(publisherKeys, {
      countersign: true,
      magicaalKeys,
      name: 'demo-install',
      nodeType,
    });
    const bundleBase64 = buildMpack(files).toString('base64');

    const res = await request(app)
      .post('/internal/packages/install')
      .set(internalAuthHeader())
      .send({ bundleBase64 });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      publisher: 'acme',
      name: 'demo-install',
      signatureStatus: 'verified',
      countersigned: true,
    });
    expect(res.body.nodeTypes).toContain(nodeType);
    expect(() => registry.get(nodeType)).not.toThrow();
    expect(registry.packageOf(nodeType)).toBe('acme/demo-install');
  });

  // ISS-057: installing runs the package's code with full engine privileges and
  // there is no sandbox yet — a self-signed, non-countersigned package must be
  // refused unless the operator explicitly opts in.
  it('refuses an unverified (non-countersigned) community package by default', async () => {
    const files = buildSignedFiles(publisherKeys, { countersign: false, name: 'unverified-pkg' });
    const bundleBase64 = buildMpack(files).toString('base64');

    const res = await request(app)
      .post('/internal/packages/install')
      .set(internalAuthHeader())
      .send({ bundleBase64 });

    expect(res.status).toBe(422);
    expect(res.body.code).toBe('SIGNATURE_UNVERIFIED');
  });

  it('rejects a package whose publisher signature does not verify (tampered content)', async () => {
    const files = buildSignedFiles(publisherKeys, {
      countersign: true,
      magicaalKeys,
      name: 'tampered-pkg',
      tamperAfterSigning: (f) => f.set('index.js', Buffer.from('evil();')),
    });
    const bundleBase64 = buildMpack(files).toString('base64');

    const res = await request(app)
      .post('/internal/packages/install')
      .set(internalAuthHeader())
      .send({ bundleBase64 });

    expect(res.status).toBe(422);
    expect(res.body.code).toBe('SIGNATURE_INVALID');
  });

  // ISS-056: extraction decompresses before any signature is checked, so an
  // uncapped bundle is a resource-exhaustion vector on its own.
  it('400s a bundle whose decompressed size exceeds the cap', async () => {
    const oversized = Buffer.alloc(300 * 1024 * 1024); // gzips to a few KB; decompresses past the 256MB cap
    const bundleBase64 = zlib.gzipSync(oversized).toString('base64');

    const res = await request(app)
      .post('/internal/packages/install')
      .set(internalAuthHeader())
      .send({ bundleBase64 });

    expect(res.status).toBe(400);
    expect(res.body.code).toBe('BUNDLE_INVALID');
  }, 20_000);

  it('rejects a bundle entry that attempts path traversal', async () => {
    const files = buildSignedFiles(publisherKeys, { countersign: true, magicaalKeys, name: 'traversal-pkg' });
    files.set('../../etc/evil.js', Buffer.from('evil();'));
    const bundleBase64 = buildMpack(files).toString('base64');

    const res = await request(app)
      .post('/internal/packages/install')
      .set(internalAuthHeader())
      .send({ bundleBase64 });

    expect(res.status).toBe(400);
    expect(res.body.code).toBe('BUNDLE_INVALID');
  });

  it('400s when bundleBase64 is missing', async () => {
    const res = await request(app).post('/internal/packages/install').set(internalAuthHeader()).send({});
    expect(res.status).toBe(400);
  });
});

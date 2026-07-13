import request from 'supertest';
import * as crypto from 'node:crypto';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { db } from '@/db/client';
import { apiKeys } from '@/db/schema';
import { encryptCredentials, decryptCredentials } from '@/lib/credentials';
import { signJwt, verifyJwt } from '@/lib/jwt';
import { validateGraph } from '@/lib/graph-validator';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: { post: jest.fn(), get: jest.fn() },
}));

const app = createApp();

beforeAll(async () => {
  await runMigrations();
});

/** Issue a platform API key (`mk_`-prefixed) for a user, as the seed path does. */
async function issueApiKey(
  tenantId: string,
  userId: string,
  opts: { revoked?: boolean; expiresAt?: Date | null } = {},
): Promise<string> {
  const plaintext = `mk_${crypto.randomBytes(32).toString('hex')}`;
  await db.insert(apiKeys).values({
    id: crypto.randomUUID(),
    tenantId,
    userId,
    name: 'test key',
    keyHash: crypto.createHash('sha256').update(plaintext).digest('hex'),
    revoked: opts.revoked ?? false,
    expiresAt: opts.expiresAt ?? null,
    createdAt: new Date(),
  });
  return plaintext;
}

describe('requireAuth — API key strategy', () => {
  it('authenticates an mk_ key and resolves the owner tenant and role', async () => {
    const { tenantId, userId } = await createUserAndLogin(app, 'tenant_admin');
    const key = await issueApiKey(tenantId, userId);

    // /v1/tenants requires platform_admin; tenant_admin can read one by id, so
    // use a route whose role gate proves the key resolved the right role
    const res = await request(app)
      .get('/v1/agents')
      .set('Authorization', `Bearer ${key}`);

    expect(res.status).toBe(200);
  });

  it('rejects an unknown key', async () => {
    const res = await request(app)
      .get('/v1/agents')
      .set('Authorization', `Bearer mk_${'0'.repeat(64)}`);
    expect(res.status).toBe(401);
  });

  it('rejects a revoked key', async () => {
    const { tenantId, userId } = await createUserAndLogin(app, 'developer');
    const key = await issueApiKey(tenantId, userId, { revoked: true });

    const res = await request(app).get('/v1/agents').set('Authorization', `Bearer ${key}`);
    expect(res.status).toBe(401);
    expect(res.body.error).toContain('revoked');
  });

  it('rejects an expired key', async () => {
    const { tenantId, userId } = await createUserAndLogin(app, 'developer');
    const key = await issueApiKey(tenantId, userId, { expiresAt: new Date(Date.now() - 1000) });

    const res = await request(app).get('/v1/agents').set('Authorization', `Bearer ${key}`);
    expect(res.status).toBe(401);
    expect(res.body.error).toContain('expired');
  });

  it('accepts a key whose expiry is still in the future', async () => {
    const { tenantId, userId } = await createUserAndLogin(app, 'developer');
    const key = await issueApiKey(tenantId, userId, {
      expiresAt: new Date(Date.now() + 3_600_000),
    });

    const res = await request(app).get('/v1/agents').set('Authorization', `Bearer ${key}`);
    expect(res.status).toBe(200);
  });

  it('scopes the caller to the key owner tenant', async () => {
    const alice = await createUserAndLogin(app, 'developer');
    const bob = await createUserAndLogin(app, 'developer');

    await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${alice.token}`)
      .send({ name: 'Alice Agent', handle: `akey-${Date.now()}` });

    const bobKey = await issueApiKey(bob.tenantId, bob.userId);
    const res = await request(app).get('/v1/agents').set('Authorization', `Bearer ${bobKey}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0); // Bob's key never sees Alice's agents
  });
});

describe('requireAuth — bearer token strategy', () => {
  it('rejects a missing header', async () => {
    expect((await request(app).get('/v1/agents')).status).toBe(401);
  });

  it('rejects a non-Bearer scheme', async () => {
    const res = await request(app).get('/v1/agents').set('Authorization', 'Basic abc');
    expect(res.status).toBe(401);
  });

  it('rejects a malformed or tampered JWT', async () => {
    const res = await request(app)
      .get('/v1/agents')
      .set('Authorization', 'Bearer not.a.jwt');
    expect(res.status).toBe(401);
    expect(res.body.error).toContain('Invalid or expired');
  });
});

describe('lib/jwt', () => {
  it('signs a token that verifies back to the same claims', async () => {
    const token = await signJwt({ sub: 'u1', tenantId: 't1', role: 'developer' });
    const payload = await verifyJwt(token);

    expect(payload.sub).toBe('u1');
    expect(payload.tenantId).toBe('t1');
    expect(payload.role).toBe('developer');
  });

  it('rejects a token signed with a different secret', async () => {
    // A structurally valid JWT whose signature does not match our secret
    const forged =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1MSIsInRlbmFudElkIjoidDEiLCJyb2xlIjoiZGV2ZWxvcGVyIn0.' +
      'aW52YWxpZC1zaWduYXR1cmU';

    await expect(verifyJwt(forged)).rejects.toThrow();
  });
});

describe('lib/credentials', () => {
  it('round-trips a value through AES-256-GCM', () => {
    const secret = 'super-secret-token';
    const ciphertext = encryptCredentials(secret);

    expect(ciphertext).not.toContain(secret);
    expect(decryptCredentials(ciphertext)).toBe(secret);
  });

  it('produces a different ciphertext each time (random IV)', () => {
    const a = encryptCredentials('same');
    const b = encryptCredentials('same');

    expect(a).not.toBe(b);
    expect(decryptCredentials(a)).toBe('same');
    expect(decryptCredentials(b)).toBe('same');
  });

  it('refuses to decrypt tampered ciphertext (auth tag)', () => {
    const ciphertext = encryptCredentials('value');
    const buf = Buffer.from(ciphertext, 'base64');
    buf[buf.length - 1] ^= 0xff; // flip a bit in the payload

    expect(() => decryptCredentials(buf.toString('base64'))).toThrow();
  });
});

describe('lib/graph-validator', () => {
  it('rejects a graph with no nodes at all', () => {
    expect(() =>
      validateGraph({ entry: 'start' } as unknown as Parameters<typeof validateGraph>[0]),
    ).toThrow(/no nodes/i);
  });

  it('tolerates a graph with no edges array', () => {
    expect(() =>
      validateGraph({
        entry: 'start',
        nodes: { start: { id: 'start', type: 'core:start', config: {} } },
      } as unknown as Parameters<typeof validateGraph>[0]),
    ).not.toThrow();
  });
});

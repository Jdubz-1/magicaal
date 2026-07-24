import request from 'supertest';
import { eq } from 'drizzle-orm';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { db } from '@/db/client';
import { apiKeys } from '@/db/schema';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: { post: jest.fn(), get: jest.fn() },
}));

const app = createApp();

beforeAll(async () => {
  await runMigrations();
});

describe('POST /v1/keys (ALIGN-020)', () => {
  it('creates a key, returns the plaintext once, and never leaks the hash on list', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');

    const created = await request(app)
      .post('/v1/keys')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'ci-pipeline' });

    expect(created.status).toBe(201);
    expect(created.body.key).toMatch(/^mk_[0-9a-f]{64}$/);
    expect(created.body.name).toBe('ci-pipeline');
    expect(created.body.keyHash).toBeUndefined();

    const list = await request(app)
      .get('/v1/keys')
      .set('Authorization', `Bearer ${token}`);
    expect(list.status).toBe(200);
    expect(list.body).toHaveLength(1);
    expect(list.body[0].name).toBe('ci-pipeline');
    expect(JSON.stringify(list.body)).not.toContain('keyHash');
    expect(list.body[0].keyHash).toBeUndefined();
  });

  it('400s without a name', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const res = await request(app)
      .post('/v1/keys')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(res.status).toBe(400);
  });

  it('refuses a developer-role caller', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .post('/v1/keys')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'x' });
    expect(res.status).toBe(403);
  });

  it('a newly created key authenticates against the platform API', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const created = await request(app)
      .post('/v1/keys')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'authenticates' });

    const res = await request(app)
      .get('/v1/agents')
      .set('Authorization', `Bearer ${created.body.key}`);
    expect(res.status).toBe(200);
  });
});

describe('DELETE /v1/keys/:id (revoke)', () => {
  it('revokes a key and the key stops authenticating', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const created = await request(app)
      .post('/v1/keys')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'revoke-me' });

    const revoke = await request(app)
      .delete(`/v1/keys/${created.body.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(revoke.status).toBe(204);

    const rows = await db.select().from(apiKeys).where(eq(apiKeys.id, created.body.id));
    expect(rows[0].revoked).toBe(true);

    const res = await request(app)
      .get('/v1/agents')
      .set('Authorization', `Bearer ${created.body.key}`);
    expect(res.status).toBe(401);
  });

  it('404s revoking an unknown or cross-tenant key', async () => {
    const alice = await createUserAndLogin(app, 'tenant_admin');
    const bob = await createUserAndLogin(app, 'tenant_admin');

    const created = await request(app)
      .post('/v1/keys')
      .set('Authorization', `Bearer ${alice.token}`)
      .send({ name: 'alices-key' });

    const res = await request(app)
      .delete(`/v1/keys/${created.body.id}`)
      .set('Authorization', `Bearer ${bob.token}`);
    expect(res.status).toBe(404);
  });
});

describe('tenant isolation', () => {
  it('lists only the caller tenant\'s keys', async () => {
    const alice = await createUserAndLogin(app, 'tenant_admin');
    const bob = await createUserAndLogin(app, 'tenant_admin');

    await request(app).post('/v1/keys').set('Authorization', `Bearer ${alice.token}`).send({ name: 'alice-1' });
    await request(app).post('/v1/keys').set('Authorization', `Bearer ${bob.token}`).send({ name: 'bob-1' });

    const aliceList = await request(app).get('/v1/keys').set('Authorization', `Bearer ${alice.token}`);
    expect(aliceList.body.every((k: { name: string }) => k.name !== 'bob-1')).toBe(true);
  });
});

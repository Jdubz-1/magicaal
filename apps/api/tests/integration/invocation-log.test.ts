import request from 'supertest';
import * as crypto from 'node:crypto';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { db } from '@/db/client';
import { invocationLog } from '@/db/schema';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: { post: jest.fn(), get: jest.fn() },
}));

const app = createApp();

beforeAll(async () => {
  await runMigrations();
});

async function createAgent(token: string, handle: string): Promise<string> {
  const res = await request(app)
    .post('/v1/agents')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'Log Agent', handle });
  return res.body.id as string;
}

async function seedLogEntry(
  agentId: string,
  tenantId: string,
  overrides: Partial<typeof invocationLog.$inferInsert> = {},
): Promise<void> {
  await db.insert(invocationLog).values({
    id: crypto.randomUUID(),
    agentId,
    tenantId,
    strategy: 'api-key',
    invocationKeyId: null,
    requestIp: '10.0.0.1',
    runId: 'run-1',
    status: 'dispatched',
    createdAt: new Date(),
    ...overrides,
  });
}

describe('GET /v1/agents/:id/invocation-log (ALIGN-015)', () => {
  it('lists entries newest-first with strategy, key, ip, run, and outcome', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `log-${Date.now()}`);

    await seedLogEntry(agentId, tenantId, { status: 'dispatched', createdAt: new Date(Date.now() - 2000), runId: 'run-old' });
    await seedLogEntry(agentId, tenantId, { status: 'rejected', createdAt: new Date(), runId: null });

    const res = await request(app)
      .get(`/v1/agents/${agentId}/invocation-log`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.entries).toHaveLength(2);
    expect(res.body.entries[0]).toMatchObject({ status: 'rejected', requestIp: '10.0.0.1' });
    expect(res.body.entries[1]).toMatchObject({ status: 'dispatched', runId: 'run-old' });
  });

  it('filters by status and honors limit/offset', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `log-f-${Date.now()}`);

    await seedLogEntry(agentId, tenantId, { status: 'dispatched' });
    await seedLogEntry(agentId, tenantId, { status: 'rejected' });
    await seedLogEntry(agentId, tenantId, { status: 'rejected' });

    const rejected = await request(app)
      .get(`/v1/agents/${agentId}/invocation-log?status=rejected`)
      .set('Authorization', `Bearer ${token}`);
    expect(rejected.body.entries).toHaveLength(2);

    const paged = await request(app)
      .get(`/v1/agents/${agentId}/invocation-log?limit=1&offset=1`)
      .set('Authorization', `Bearer ${token}`);
    expect(paged.body.entries).toHaveLength(1);
    expect(paged.body).toMatchObject({ limit: 1, offset: 1 });
  });

  it("404s another tenant's agent", async () => {
    const alice = await createUserAndLogin(app, 'developer');
    const bob = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(alice.token, `log-xt-${Date.now()}`);
    await seedLogEntry(agentId, alice.tenantId);

    const res = await request(app)
      .get(`/v1/agents/${agentId}/invocation-log`)
      .set('Authorization', `Bearer ${bob.token}`);

    expect(res.status).toBe(404);
  });
});

describe('invocation policy/keys tenant ownership (found during ALIGN-015)', () => {
  it("cannot read or rewrite another tenant's invocation policy", async () => {
    const alice = await createUserAndLogin(app, 'developer');
    const bob = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(alice.token, `pol-xt-${Date.now()}`);

    const read = await request(app)
      .get(`/v1/agents/${agentId}/invocation-policy`)
      .set('Authorization', `Bearer ${bob.token}`);
    expect(read.status).toBe(404);

    const write = await request(app)
      .patch(`/v1/agents/${agentId}/invocation-policy`)
      .set('Authorization', `Bearer ${bob.token}`)
      .send({ strategy: 'public' });
    expect(write.status).toBe(404);
  });

  it("cannot mint, list, or revoke keys for another tenant's agent", async () => {
    const alice = await createUserAndLogin(app, 'developer');
    const bob = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(alice.token, `key-xt-${Date.now()}`);

    const mint = await request(app)
      .post(`/v1/agents/${agentId}/invocation-keys`)
      .set('Authorization', `Bearer ${bob.token}`)
      .send({ label: 'stolen' });
    expect(mint.status).toBe(404);

    const list = await request(app)
      .get(`/v1/agents/${agentId}/invocation-keys`)
      .set('Authorization', `Bearer ${bob.token}`);
    expect(list.status).toBe(404);

    const revoke = await request(app)
      .delete(`/v1/agents/${agentId}/invocation-keys/any-key`)
      .set('Authorization', `Bearer ${bob.token}`);
    expect(revoke.status).toBe(404);
  });

  it('the owning tenant still manages its own policy and keys', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `pol-own-${Date.now()}`);

    const read = await request(app)
      .get(`/v1/agents/${agentId}/invocation-policy`)
      .set('Authorization', `Bearer ${token}`);
    expect(read.status).toBe(200);
    expect(read.body.strategy).toBe('api-key');

    const mint = await request(app)
      .post(`/v1/agents/${agentId}/invocation-keys`)
      .set('Authorization', `Bearer ${token}`)
      .send({ label: 'mine' });
    expect(mint.status).toBe(201);
    expect(mint.body.key).toMatch(/^ik_/);
  });
});

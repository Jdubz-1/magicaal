import request from 'supertest';
import { eq } from 'drizzle-orm';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { db } from '@/db/client';
import { invocationKeys } from '@/db/schema';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: { post: jest.fn(), get: jest.fn() },
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { engineClient } = require('../../src/lib/engine-client') as {
  engineClient: { post: jest.Mock; get: jest.Mock };
};

const app = createApp();

beforeAll(async () => {
  await runMigrations();
});

beforeEach(() => {
  jest.clearAllMocks();
  engineClient.get.mockResolvedValue({ data: {} });
  engineClient.post.mockResolvedValue({ data: {} });
});

async function createAgent(token: string, handle: string): Promise<string> {
  const res = await request(app)
    .post('/v1/agents')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'Agent', handle });
  return res.body.id as string;
}

describe('named router policies', () => {
  it('creates, lists, updates, and deletes a policy', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');

    const created = await request(app)
      .post('/v1/llm/router-policies')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'cheap-first',
        config: { strategy: 'cost-optimized', targets: [] },
        overridable: false,
      });
    expect(created.status).toBe(201);

    const list = await request(app)
      .get('/v1/llm/router-policies')
      .set('Authorization', `Bearer ${token}`);
    expect(list.status).toBe(200);
    expect(list.body[0].name).toBe('cheap-first');
    // config round-trips as an object, not a JSON string
    expect(list.body[0].config).toEqual({ strategy: 'cost-optimized', targets: [] });
    expect(list.body[0].overridable).toBe(false);

    const updated = await request(app)
      .patch(`/v1/llm/router-policies/${created.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'renamed' });
    expect(updated.status).toBe(200);

    const del = await request(app)
      .delete(`/v1/llm/router-policies/${created.body.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(del.status).toBe(204);

    const after = await request(app)
      .get('/v1/llm/router-policies')
      .set('Authorization', `Bearer ${token}`);
    expect(after.body).toHaveLength(0);
  });

  it('400s without name or config', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const res = await request(app)
      .post('/v1/llm/router-policies')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'no-config' });
    expect(res.status).toBe(400);
  });

  it('404s updating or deleting an unknown policy', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const auth = { Authorization: `Bearer ${token}` };

    expect((await request(app).patch('/v1/llm/router-policies/ghost').set(auth).send({ name: 'x' })).status).toBe(404);
    expect((await request(app).delete('/v1/llm/router-policies/ghost').set(auth)).status).toBe(404);
  });

  it("does not expose another tenant's policies", async () => {
    const alice = await createUserAndLogin(app, 'tenant_admin');
    const bob = await createUserAndLogin(app, 'tenant_admin');

    await request(app)
      .post('/v1/llm/router-policies')
      .set('Authorization', `Bearer ${alice.token}`)
      .send({ name: 'alice-only', config: {} });

    const list = await request(app)
      .get('/v1/llm/router-policies')
      .set('Authorization', `Bearer ${bob.token}`);
    expect(list.body).toHaveLength(0);
  });

  it('refuses a developer mutating policies', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .post('/v1/llm/router-policies')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'x', config: {} });
    expect(res.status).toBe(403);
  });

  it('proxies provider health from the engine', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    engineClient.get.mockResolvedValue({ data: { providers: [{ id: 'openai', healthy: true }] } });

    const res = await request(app).get('/v1/llm/health').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.providers[0].id).toBe('openai');
  });
});

describe('telemetry proxies', () => {
  it('always scopes the engine query to the caller tenant', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    engineClient.get.mockResolvedValue({ data: { runs: [], total: 0 } });

    await request(app).get('/v1/telemetry').set('Authorization', `Bearer ${token}`);
    expect(engineClient.get).toHaveBeenCalledWith('/internal/telemetry', {
      params: { tenantId, limit: '50' },
    });

    await request(app)
      .get('/v1/telemetry/tokens?period=week')
      .set('Authorization', `Bearer ${token}`);
    expect(engineClient.get).toHaveBeenCalledWith('/internal/telemetry/tokens', {
      params: { tenantId, period: 'week' },
    });

    await request(app).get('/v1/telemetry/trajectory/run-1').set('Authorization', `Bearer ${token}`);
    expect(engineClient.get).toHaveBeenCalledWith('/internal/telemetry/trajectory/run-1', {
      params: { tenantId },
    });

    await request(app).get('/v1/telemetry/routing-events').set('Authorization', `Bearer ${token}`);
    expect(engineClient.get).toHaveBeenCalledWith('/internal/telemetry/routing-events', {
      params: { tenantId, limit: '100' },
    });

    await request(app).get('/v1/telemetry/evaluate-scores').set('Authorization', `Bearer ${token}`);
    expect(engineClient.get).toHaveBeenCalledWith('/internal/telemetry/evaluate-scores', {
      params: { tenantId, limit: '100' },
    });
  });

  it('passes through agentId and status filters', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `tel-${Date.now()}`);
    engineClient.get.mockResolvedValue({ data: {} });

    await request(app)
      .get(`/v1/telemetry?agentId=${agentId}&status=failed&limit=10`)
      .set('Authorization', `Bearer ${token}`);

    expect(engineClient.get).toHaveBeenCalledWith('/internal/telemetry', {
      params: { tenantId, limit: '10', agentId, status: 'failed' },
    });
  });

  it("404s filtering by another tenant's agent, without reaching the engine", async () => {
    const alice = await createUserAndLogin(app, 'developer');
    const bob = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(alice.token, `tel-xt-${Date.now()}`);

    jest.clearAllMocks();

    const res = await request(app)
      .get(`/v1/telemetry?agentId=${agentId}`)
      .set('Authorization', `Bearer ${bob.token}`);

    expect(res.status).toBe(404);
    expect(engineClient.get).not.toHaveBeenCalled();
  });

  it('refuses a viewer', async () => {
    const { token } = await createUserAndLogin(app, 'viewer');
    const res = await request(app).get('/v1/telemetry').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
  });
});

describe('invocation keys', () => {
  it('issues a key once and never returns the plaintext again', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `key-${Date.now()}`);

    const created = await request(app)
      .post(`/v1/agents/${agentId}/invocation-keys`)
      .set('Authorization', `Bearer ${token}`)
      .send({ label: 'ci' });

    expect(created.status).toBe(201);
    expect(created.body.key).toMatch(/^ik_[0-9a-f]{64}$/);

    // only the hash is persisted
    const rows = await db
      .select()
      .from(invocationKeys)
      .where(eq(invocationKeys.id, created.body.id as string));
    expect(rows[0].keyHash).not.toContain(created.body.key);

    const list = await request(app)
      .get(`/v1/agents/${agentId}/invocation-keys`)
      .set('Authorization', `Bearer ${token}`);
    expect(list.status).toBe(200);
    expect(list.body[0].key).toBeUndefined();
    expect(list.body[0].label).toBe('ci');
  });

  it('accepts an expiry', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `keyexp-${Date.now()}`);
    const expiresAt = new Date(Date.now() + 86_400_000).toISOString();

    const res = await request(app)
      .post(`/v1/agents/${agentId}/invocation-keys`)
      .set('Authorization', `Bearer ${token}`)
      .send({ label: 'temp', expiresAt });

    expect(res.status).toBe(201);
    expect(res.body.expiresAt).not.toBeNull();
  });

  it('400s without a label', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `keynolabel-${Date.now()}`);

    const res = await request(app)
      .post(`/v1/agents/${agentId}/invocation-keys`)
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(res.status).toBe(400);
  });

  it('revokes rather than deletes', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `keyrev-${Date.now()}`);

    const created = await request(app)
      .post(`/v1/agents/${agentId}/invocation-keys`)
      .set('Authorization', `Bearer ${token}`)
      .send({ label: 'doomed' });

    const del = await request(app)
      .delete(`/v1/agents/${agentId}/invocation-keys/${created.body.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(del.status).toBe(204);

    const rows = await db
      .select()
      .from(invocationKeys)
      .where(eq(invocationKeys.id, created.body.id as string));
    expect(rows[0].revoked).toBe(true);
  });

  it('404s revoking an unknown key', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `keyghost-${Date.now()}`);

    const res = await request(app)
      .delete(`/v1/agents/${agentId}/invocation-keys/ghost`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });
});

describe('invocation policy', () => {
  it('returns a default api-key policy when none is configured', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `pol-def-${Date.now()}`);

    const res = await request(app)
      .get(`/v1/agents/${agentId}/invocation-policy`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      agentId,
      strategy: 'api-key',
      jwtConfig: null,
      rateLimit: null,
      overrideFlags: {},
    });
  });

  it('stores and returns a JWT policy with rate limits', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `pol-jwt-${Date.now()}`);

    const jwtConfig = { jwksUrl: 'https://idp/.well-known/jwks.json', issuer: 'idp' };
    const rateLimit = { requestsPerWindow: 10, windowSeconds: 60 };

    // upsert — the first write creates the policy row
    const patch = await request(app)
      .patch(`/v1/agents/${agentId}/invocation-policy`)
      .set('Authorization', `Bearer ${token}`)
      .send({ strategy: 'jwt', jwtConfig, rateLimit });
    expect(patch.status).toBe(201);

    const res = await request(app)
      .get(`/v1/agents/${agentId}/invocation-policy`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.body.strategy).toBe('jwt');
    expect(res.body.jwtConfig).toEqual(jwtConfig);
    expect(res.body.rateLimit).toEqual(rateLimit);
  });

  it('an update replaces the existing policy rather than inserting a second', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `pol-upd-${Date.now()}`);

    await request(app)
      .patch(`/v1/agents/${agentId}/invocation-policy`)
      .set('Authorization', `Bearer ${token}`)
      .send({ strategy: 'jwt', jwtConfig: { issuer: 'a' } });

    await request(app)
      .patch(`/v1/agents/${agentId}/invocation-policy`)
      .set('Authorization', `Bearer ${token}`)
      .send({ strategy: 'public' });

    const res = await request(app)
      .get(`/v1/agents/${agentId}/invocation-policy`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.body.strategy).toBe('public');
    expect(res.body.jwtConfig).toBeNull();
  });

  it('defaults the strategy to api-key when omitted', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `pol-noop-${Date.now()}`);

    await request(app)
      .patch(`/v1/agents/${agentId}/invocation-policy`)
      .set('Authorization', `Bearer ${token}`)
      .send({ rateLimit: { requestsPerWindow: 5, windowSeconds: 1 } });

    const res = await request(app)
      .get(`/v1/agents/${agentId}/invocation-policy`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.body.strategy).toBe('api-key');
    expect(res.body.rateLimit.requestsPerWindow).toBe(5);
  });
});

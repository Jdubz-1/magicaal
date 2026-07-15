import request from 'supertest';
import * as crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { db } from '@/db/client';
import { authSessions, users, apiKeys, invocationLog } from '@/db/schema';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: { post: jest.fn(), get: jest.fn() },
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { engineClient } = require('../../src/lib/engine-client') as {
  engineClient: { post: jest.Mock; get: jest.Mock };
};

const app = createApp();
const PASSWORD = 'Test1234!';

beforeAll(async () => {
  await runMigrations();
});

beforeEach(() => {
  jest.clearAllMocks();
  engineClient.post.mockResolvedValue({ data: { runId: 'run-1' } });
  engineClient.get.mockResolvedValue({ data: { status: 'completed', output: {}, error: null } });
});

/** Log in through the HTTP route so the refresh cookie is issued. */
async function login(email: string): Promise<request.Response> {
  return request(app).post('/v1/auth/login').send({ email, password: PASSWORD });
}

async function emailOf(userId: string): Promise<string> {
  const rows = await db.select().from(users).where(eq(users.id, userId));
  return rows[0].email;
}

describe('auth: login, refresh, logout', () => {
  it('rejects a wrong password and an unknown email alike', async () => {
    const { userId } = await createUserAndLogin(app, 'developer');
    const email = await emailOf(userId);

    const wrong = await request(app)
      .post('/v1/auth/login')
      .send({ email, password: 'not-the-password' });
    expect(wrong.status).toBe(401);

    const unknown = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'nobody@example.com', password: PASSWORD });
    expect(unknown.status).toBe(401);

    // the same message either way — no user enumeration
    expect(wrong.body.error).toBe(unknown.body.error);
  });

  it('issues an HttpOnly refresh cookie on login', async () => {
    const { userId } = await createUserAndLogin(app, 'developer');
    const res = await login(await emailOf(userId));

    const cookies = res.headers['set-cookie'] as unknown as string[];
    const refresh = cookies.find((c) => c.startsWith('refresh_token='))!;
    expect(refresh).toContain('HttpOnly');
    expect(refresh).toContain('SameSite=Strict');
  });

  it('rotates the refresh token, invalidating the old one', async () => {
    const { userId } = await createUserAndLogin(app, 'developer');
    const first = await login(await emailOf(userId));
    const cookie = (first.headers['set-cookie'] as unknown as string[])
      .find((c) => c.startsWith('refresh_token='))!
      .split(';')[0];

    const refreshed = await request(app).post('/v1/auth/refresh').set('Cookie', cookie);
    expect(refreshed.status).toBe(200);
    expect(refreshed.body.accessToken).toBeTruthy();

    // the old cookie is now dead — replay is refused
    const replay = await request(app).post('/v1/auth/refresh').set('Cookie', cookie);
    expect(replay.status).toBe(401);
  });

  it('401s refreshing without a cookie or with a bogus one', async () => {
    expect((await request(app).post('/v1/auth/refresh')).status).toBe(401);

    const bogus = await request(app)
      .post('/v1/auth/refresh')
      .set('Cookie', 'refresh_token=not-a-real-token');
    expect(bogus.status).toBe(401);
  });

  it('refuses to refresh for a deactivated user', async () => {
    const { userId } = await createUserAndLogin(app, 'developer');
    const res = await login(await emailOf(userId));
    const cookie = (res.headers['set-cookie'] as unknown as string[])
      .find((c) => c.startsWith('refresh_token='))!
      .split(';')[0];

    await db.update(users).set({ active: false }).where(eq(users.id, userId));

    const refreshed = await request(app).post('/v1/auth/refresh').set('Cookie', cookie);
    expect(refreshed.status).toBe(401);
  });

  it('logout deletes the session row and clears the cookie', async () => {
    const { userId } = await createUserAndLogin(app, 'developer');
    const res = await login(await emailOf(userId));
    const cookie = (res.headers['set-cookie'] as unknown as string[])
      .find((c) => c.startsWith('refresh_token='))!
      .split(';')[0];

    const before = await db.select().from(authSessions).where(eq(authSessions.userId, userId));
    expect(before.length).toBeGreaterThan(0);

    const out = await request(app).post('/v1/auth/logout').set('Cookie', cookie);
    expect(out.status).toBe(204);

    // the rotated token can no longer be redeemed
    const after = await request(app).post('/v1/auth/refresh').set('Cookie', cookie);
    expect(after.status).toBe(401);
  });

  it('logout without a cookie is a no-op, not an error', async () => {
    const res = await request(app).post('/v1/auth/logout');
    expect(res.status).toBe(204);
  });
});

describe('run dispatch: the two auth planes (ISS-063)', () => {
  async function publishedAgent(token: string, handle: string): Promise<string> {
    const create = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Runner', handle });
    const agentId = create.body.id as string;

    await request(app)
      .post(`/v1/agents/${agentId}/publish`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        graphJson: JSON.stringify({
          entry: 'start',
          nodes: { start: { id: 'start', type: 'core:start', config: {} } },
          edges: [],
        }),
      });
    return agentId;
  }

  /**
   * Route the engine mock by endpoint: the invocation plane is validated by
   * POST /internal/invocation-auth/validate, the dispatch by POST /internal/runs.
   */
  function mockEngine(opts: {
    validate?: { keyId: string; tenantId: string; strategy: string } | Error;
    runId?: string;
  }): void {
    engineClient.post.mockImplementation(async (url: string) => {
      if (url === '/internal/invocation-auth/validate') {
        if (opts.validate instanceof Error) throw opts.validate;
        if (!opts.validate) throw Object.assign(new Error('Invalid or revoked invocation key'), { status: 401 });
        return { data: opts.validate };
      }
      if (url === '/internal/runs') return { data: { runId: opts.runId ?? 'run-1' } };
      return { data: {} };
    });
  }

  async function issueKey(token: string, agentId: string): Promise<string> {
    const res = await request(app)
      .post(`/v1/agents/${agentId}/invocation-keys`)
      .set('Authorization', `Bearer ${token}`)
      .send({ label: 'ci' });
    return res.body.key as string;
  }

  describe('platform plane', () => {
    it('a Studio JWT dispatches without consulting the invocation policy', async () => {
      const { token } = await createUserAndLogin(app, 'developer');
      const agentId = await publishedAgent(token, `plat-jwt-${Date.now()}`);
      mockEngine({ runId: 'run-jwt' });

      const res = await request(app)
        .post(`/v1/agents/${agentId}/runs`)
        .set('Authorization', `Bearer ${token}`)
        .send({ input: { q: 'hi' } });

      expect(res.status).toBe(202);
      expect(res.body.runId).toBe('run-jwt');

      // §11.4: a platform caller bypasses invocation auth entirely
      const validateCalls = engineClient.post.mock.calls.filter(
        ([u]: [string]) => u === '/internal/invocation-auth/validate',
      );
      expect(validateCalls).toHaveLength(0);

      const [, body] = engineClient.post.mock.calls.find(
        ([u]: [string]) => u === '/internal/runs',
      )!;
      expect(body.caller).toEqual({ kind: 'platform', strategy: 'platform' });
      expect(body.input).toEqual({ q: 'hi' });
    });

    it('a platform API key also bypasses the invocation policy', async () => {
      const { token, tenantId, userId } = await createUserAndLogin(app, 'developer');
      const agentId = await publishedAgent(token, `plat-key-${Date.now()}`);

      const plaintext = `mk_${crypto.randomBytes(32).toString('hex')}`;
      await db.insert(apiKeys).values({
        id: crypto.randomUUID(),
        tenantId,
        userId,
        name: 'ci',
        keyHash: crypto.createHash('sha256').update(plaintext).digest('hex'),
        revoked: false,
        createdAt: new Date(),
      });

      mockEngine({ runId: 'run-mk' });

      const res = await request(app)
        .post(`/v1/agents/${agentId}/runs`)
        .set('Authorization', `Bearer ${plaintext}`)
        .send({ input: {} });

      expect(res.status).toBe(202);
      const [, body] = engineClient.post.mock.calls.find(
        ([u]: [string]) => u === '/internal/runs',
      )!;
      expect(body.caller.kind).toBe('platform');
    });
  });

  describe('invocation plane', () => {
    it('an ik_ key is validated by the engine and dispatches as an invocation caller', async () => {
      const { token, tenantId } = await createUserAndLogin(app, 'developer');
      const agentId = await publishedAgent(token, `inv-ok-${Date.now()}`);
      const key = await issueKey(token, agentId);
      expect(key).toMatch(/^ik_/);

      mockEngine({
        validate: { keyId: 'key-1', tenantId, strategy: 'api-key' },
        runId: 'run-ik',
      });

      const res = await request(app)
        .post(`/v1/agents/${agentId}/runs`)
        .set('Authorization', `Bearer ${key}`)
        .send({ input: {} });

      expect(res.status).toBe(202);

      // the engine authenticated it against THIS agent's policy
      const [, validateBody] = engineClient.post.mock.calls.find(
        ([u]: [string]) => u === '/internal/invocation-auth/validate',
      )!;
      expect(validateBody).toEqual({
        agentId,
        authorizationHeader: `Bearer ${key}`,
      });

      const [, body] = engineClient.post.mock.calls.find(
        ([u]: [string]) => u === '/internal/runs',
      )!;
      expect(body.caller).toEqual({
        kind: 'invocation',
        strategy: 'api-key',
        keyId: 'key-1',
      });
    });

    it('propagates the engine 401 when the credential fails the policy', async () => {
      const { token } = await createUserAndLogin(app, 'developer');
      const agentId = await publishedAgent(token, `inv-bad-${Date.now()}`);

      mockEngine({
        validate: Object.assign(new Error('Invalid or revoked invocation key'), { status: 401 }),
      });

      const res = await request(app)
        .post(`/v1/agents/${agentId}/runs`)
        .set('Authorization', `Bearer ik_${'0'.repeat(64)}`)
        .send({ input: {} });

      expect(res.status).toBe(401);
      // and no run was dispatched
      const dispatches = engineClient.post.mock.calls.filter(
        ([u]: [string]) => u === '/internal/runs',
      );
      expect(dispatches).toHaveLength(0);
    });

    it('a public agent is invokable with no Authorization header at all', async () => {
      const { token, tenantId } = await createUserAndLogin(app, 'developer');
      const agentId = await publishedAgent(token, `inv-pub-${Date.now()}`);

      await request(app)
        .patch(`/v1/agents/${agentId}/invocation-policy`)
        .set('Authorization', `Bearer ${token}`)
        .send({ strategy: 'public' });

      // the engine resolves the public policy without a credential
      mockEngine({
        validate: { keyId: 'public', tenantId, strategy: 'public' },
        runId: 'run-pub',
      });

      const res = await request(app)
        .post(`/v1/agents/${agentId}/runs`)
        .send({ input: {} });

      expect(res.status).toBe(202);
      const [, body] = engineClient.post.mock.calls.find(
        ([u]: [string]) => u === '/internal/runs',
      )!;
      expect(body.caller.strategy).toBe('public');
    });

    it('reaches run status and steps with an invocation key', async () => {
      const { token, tenantId } = await createUserAndLogin(app, 'developer');
      const agentId = await publishedAgent(token, `inv-read-${Date.now()}`);
      const key = await issueKey(token, agentId);

      mockEngine({ validate: { keyId: 'key-1', tenantId, strategy: 'api-key' } });
      engineClient.get.mockResolvedValue({
        data: { id: 'run-1', tenantId, agentId, status: 'completed', output: { a: 1 } },
      });

      const status = await request(app)
        .get(`/v1/agents/${agentId}/runs/run-1`)
        .set('Authorization', `Bearer ${key}`);
      expect(status.status).toBe(200);
      expect(status.body.output).toEqual({ a: 1 });

      const steps = await request(app)
        .get(`/v1/agents/${agentId}/runs/run-1/steps`)
        .set('Authorization', `Bearer ${key}`);
      expect(steps.status).toBe(200);
    });

    it("cannot read another agent's run, even in the same tenant", async () => {
      const { token, tenantId } = await createUserAndLogin(app, 'developer');
      const agentA = await publishedAgent(token, `inv-a-${Date.now()}`);
      const agentB = await publishedAgent(token, `inv-b-${Date.now()}`);
      const keyForA = await issueKey(token, agentA);

      mockEngine({ validate: { keyId: 'key-a', tenantId, strategy: 'api-key' } });
      // the run belongs to agent B
      engineClient.get.mockResolvedValue({
        data: { id: 'run-b', tenantId, agentId: agentB, status: 'completed' },
      });

      const res = await request(app)
        .get(`/v1/agents/${agentA}/runs/run-b`)
        .set('Authorization', `Bearer ${keyForA}`);

      expect(res.status).toBe(404);
    });
  });

  describe('rate limiting and agent state', () => {
    it('emits X-RateLimit headers and 429s once the window is exhausted', async () => {
      const { token } = await createUserAndLogin(app, 'developer');
      const agentId = await publishedAgent(token, `rl-${Date.now()}`);

      await request(app)
        .patch(`/v1/agents/${agentId}/invocation-policy`)
        .set('Authorization', `Bearer ${token}`)
        .send({ rateLimit: { requestsPerWindow: 2, windowSeconds: 60 } });

      mockEngine({ runId: 'run-rl' });

      const first = await request(app)
        .post(`/v1/agents/${agentId}/runs`)
        .set('Authorization', `Bearer ${token}`)
        .send({ input: {} });
      expect(first.status).toBe(202);
      expect(first.headers['x-ratelimit-limit']).toBe('2');
      expect(first.headers['x-ratelimit-remaining']).toBe('1');

      const second = await request(app)
        .post(`/v1/agents/${agentId}/runs`)
        .set('Authorization', `Bearer ${token}`)
        .send({ input: {} });
      expect(second.headers['x-ratelimit-remaining']).toBe('0');

      const third = await request(app)
        .post(`/v1/agents/${agentId}/runs`)
        .set('Authorization', `Bearer ${token}`)
        .send({ input: {} });
      expect(third.status).toBe(429);
      expect(third.body.code).toBe('RATE_LIMIT_EXCEEDED');
    });

    it('limitBy "key" buckets per invocation key (ALIGN-017)', async () => {
      const { token, tenantId } = await createUserAndLogin(app, 'developer');
      const agentId = await publishedAgent(token, `rl-key-${Date.now()}`);
      await issueKey(token, agentId);
      await issueKey(token, agentId);

      await request(app)
        .patch(`/v1/agents/${agentId}/invocation-policy`)
        .set('Authorization', `Bearer ${token}`)
        .send({ rateLimit: { requestsPerWindow: 1, windowSeconds: 60, limitBy: 'key' } });

      // Caller A exhausts its own bucket…
      mockEngine({ validate: { keyId: 'key-A', tenantId, strategy: 'api-key' }, runId: 'run-1' });
      const keyA = await issueKey(token, agentId);
      expect(
        (await request(app).post(`/v1/agents/${agentId}/runs`).set('Authorization', `Bearer ${keyA}`).send({ input: {} })).status,
      ).toBe(202);
      expect(
        (await request(app).post(`/v1/agents/${agentId}/runs`).set('Authorization', `Bearer ${keyA}`).send({ input: {} })).status,
      ).toBe(429);

      // …while caller B's bucket is untouched
      mockEngine({ validate: { keyId: 'key-B', tenantId, strategy: 'api-key' }, runId: 'run-2' });
      const keyB = await issueKey(token, agentId);
      expect(
        (await request(app).post(`/v1/agents/${agentId}/runs`).set('Authorization', `Bearer ${keyB}`).send({ input: {} })).status,
      ).toBe(202);
    });

    it('limitBy "ip" keys the counter by client address (ALIGN-017)', async () => {
      const { token } = await createUserAndLogin(app, 'developer');
      const agentId = await publishedAgent(token, `rl-ip-${Date.now()}`);

      await request(app)
        .patch(`/v1/agents/${agentId}/invocation-policy`)
        .set('Authorization', `Bearer ${token}`)
        .send({ rateLimit: { requestsPerWindow: 1, windowSeconds: 60, limitBy: 'ip' } });

      mockEngine({ runId: 'run-ip' });

      // Same client address — second request lands in the same bucket
      const first = await request(app)
        .post(`/v1/agents/${agentId}/runs`)
        .set('Authorization', `Bearer ${token}`)
        .send({ input: {} });
      expect(first.status).toBe(202);

      const second = await request(app)
        .post(`/v1/agents/${agentId}/runs`)
        .set('Authorization', `Bearer ${token}`)
        .send({ input: {} });
      expect(second.status).toBe(429);
    });

    it('reports an unlimited quota when no rate limit is configured', async () => {
      const { token } = await createUserAndLogin(app, 'developer');
      const agentId = await publishedAgent(token, `norl-${Date.now()}`);
      mockEngine({ runId: 'run-norl' });

      const res = await request(app)
        .post(`/v1/agents/${agentId}/runs`)
        .set('Authorization', `Bearer ${token}`)
        .send({ input: {} });

      expect(res.status).toBe(202);
      expect(res.headers['x-ratelimit-limit']).toBe('9999');
    });

    it('409s on a draft agent and 404s cross-tenant', async () => {
      const { token } = await createUserAndLogin(app, 'developer');
      mockEngine({ runId: 'run-x' });

      const draft = await request(app)
        .post('/v1/agents')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Draft', handle: `draft-run-${Date.now()}` });

      const notActive = await request(app)
        .post(`/v1/agents/${draft.body.id}/runs`)
        .set('Authorization', `Bearer ${token}`)
        .send({ input: {} });
      expect(notActive.status).toBe(409);

      const other = await createUserAndLogin(app, 'developer');
      const theirAgent = await publishedAgent(other.token, `theirs-${Date.now()}`);

      const crossTenant = await request(app)
        .post(`/v1/agents/${theirAgent}/runs`)
        .set('Authorization', `Bearer ${token}`)
        .send({ input: {} });
      expect(crossTenant.status).toBe(404);
    });

    it('runs in sync mode by polling the engine to completion', async () => {
      const { token } = await createUserAndLogin(app, 'developer');
      const agentId = await publishedAgent(token, `sync-${Date.now()}`);

      mockEngine({ runId: 'run-sync' });
      engineClient.get.mockResolvedValue({
        data: { status: 'completed', output: { answer: 42 }, error: null },
      });

      const res = await request(app)
        .post(`/v1/agents/${agentId}/runs`)
        .set('Authorization', `Bearer ${token}`)
        .send({ input: {}, mode: 'sync' });

      expect(res.status).toBe(200);
      expect(res.body.output).toEqual({ answer: 42 });
    }, 20_000);
  });

  describe('audit log (§11.5)', () => {
    it('records the strategy, run id, and outcome of a dispatch', async () => {
      const { token, tenantId } = await createUserAndLogin(app, 'developer');
      const agentId = await publishedAgent(token, `audit-ok-${Date.now()}`);
      mockEngine({ runId: 'run-audit' });

      await request(app)
        .post(`/v1/agents/${agentId}/runs`)
        .set('Authorization', `Bearer ${token}`)
        .send({ input: {} });

      const rows = await db
        .select()
        .from(invocationLog)
        .where(eq(invocationLog.agentId, agentId));

      expect(rows).toHaveLength(1);
      expect(rows[0]).toMatchObject({
        tenantId,
        strategy: 'platform',
        status: 'dispatched',
        runId: 'run-audit',
      });
    });

    it('records a rejected attempt too', async () => {
      const { token } = await createUserAndLogin(app, 'developer');
      const agentId = await publishedAgent(token, `audit-bad-${Date.now()}`);

      await request(app)
        .patch(`/v1/agents/${agentId}/invocation-policy`)
        .set('Authorization', `Bearer ${token}`)
        .send({ rateLimit: { requestsPerWindow: 1, windowSeconds: 60 } });

      mockEngine({ runId: 'run-a' });

      await request(app)
        .post(`/v1/agents/${agentId}/runs`)
        .set('Authorization', `Bearer ${token}`)
        .send({ input: {} });
      const limited = await request(app)
        .post(`/v1/agents/${agentId}/runs`)
        .set('Authorization', `Bearer ${token}`)
        .send({ input: {} });
      expect(limited.status).toBe(429);

      const rows = await db
        .select()
        .from(invocationLog)
        .where(eq(invocationLog.agentId, agentId));

      expect(rows.map((r) => r.status).sort()).toEqual(['dispatched', 'rejected']);
    });
  });
});

describe('OAuth apps: update and delete', () => {
  it('replaces the app in place on a second PUT for the same service', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');

    const first = await request(app)
      .put('/v1/integrations/oauth-apps')
      .set('Authorization', `Bearer ${token}`)
      .send({ service: 'slack', clientId: 'old-id', clientSecret: 'old-secret' });
    expect(first.status).toBe(201);

    const second = await request(app)
      .put('/v1/integrations/oauth-apps')
      .set('Authorization', `Bearer ${token}`)
      .send({
        service: 'slack',
        clientId: 'new-id',
        clientSecret: 'new-secret',
        scopes: ['chat:write'],
      });
    expect(second.status).toBe(200); // updated, not created
    expect(second.body.id).toBe(first.body.id);

    const list = await request(app)
      .get('/v1/integrations/oauth-apps')
      .set('Authorization', `Bearer ${token}`);
    expect(list.body).toHaveLength(1);
    expect(list.body[0].clientId).toBe('new-id');
    expect(list.body[0].scopes).toEqual(['chat:write']);
  });

  it('400s on a non-array scopes value', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const res = await request(app)
      .put('/v1/integrations/oauth-apps')
      .set('Authorization', `Bearer ${token}`)
      .send({ service: 'slack', clientId: 'c', clientSecret: 's', scopes: 'chat:write' });
    expect(res.status).toBe(400);
  });

  it('deletes an app, and 404s for one belonging to another tenant', async () => {
    const alice = await createUserAndLogin(app, 'tenant_admin');
    const bob = await createUserAndLogin(app, 'tenant_admin');

    const created = await request(app)
      .put('/v1/integrations/oauth-apps')
      .set('Authorization', `Bearer ${alice.token}`)
      .send({ service: 'github', clientId: 'c', clientSecret: 's' });

    const bobAttempt = await request(app)
      .delete(`/v1/integrations/oauth-apps/${created.body.id}`)
      .set('Authorization', `Bearer ${bob.token}`);
    expect(bobAttempt.status).toBe(404);

    const del = await request(app)
      .delete(`/v1/integrations/oauth-apps/${created.body.id}`)
      .set('Authorization', `Bearer ${alice.token}`);
    expect(del.status).toBe(204);

    const after = await request(app)
      .get('/v1/integrations/oauth-apps')
      .set('Authorization', `Bearer ${alice.token}`);
    expect(after.body).toHaveLength(0);
  });
});

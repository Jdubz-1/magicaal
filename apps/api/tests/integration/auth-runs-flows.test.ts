import request from 'supertest';
import { eq } from 'drizzle-orm';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { db } from '@/db/client';
import { authSessions, users, invocationKeys } from '@/db/schema';

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

describe('run dispatch: invocation keys and rate limiting', () => {
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

  it('runs in sync mode by polling the engine to completion', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await publishedAgent(token, `sync-${Date.now()}`);

    engineClient.post.mockResolvedValue({ data: { runId: 'run-sync' } });
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

  it('emits X-RateLimit headers and 429s once the window is exhausted', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await publishedAgent(token, `rl-${Date.now()}`);

    await request(app)
      .patch(`/v1/agents/${agentId}/invocation-policy`)
      .set('Authorization', `Bearer ${token}`)
      .send({ rateLimit: { requestsPerWindow: 2, windowSeconds: 60 } });

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
    expect(second.status).toBe(202);
    expect(second.headers['x-ratelimit-remaining']).toBe('0');

    const third = await request(app)
      .post(`/v1/agents/${agentId}/runs`)
      .set('Authorization', `Bearer ${token}`)
      .send({ input: {} });
    expect(third.status).toBe(429);
    expect(third.body.code).toBe('RATE_LIMIT_EXCEEDED');
  });

  it('reports an unlimited quota when no rate limit is configured', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await publishedAgent(token, `norl-${Date.now()}`);

    const res = await request(app)
      .post(`/v1/agents/${agentId}/runs`)
      .set('Authorization', `Bearer ${token}`)
      .send({ input: {} });

    expect(res.status).toBe(202);
    expect(res.headers['x-ratelimit-limit']).toBe('9999');
  });

  // NOTE: documents current behaviour, which is arguably wrong — see the
  // "invocation keys cannot invoke" finding. requireAuth resolves any `mk_`
  // token against the PLATFORM api_keys table, so a freshly minted invocation
  // key is rejected before dispatchRun (and its resolveInvocationKey) ever
  // runs. Changing this is an auth-design decision, not a test fix.
  it('rejects an invocation key at the platform auth layer', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await publishedAgent(token, `key-ok-${Date.now()}`);

    const key = await request(app)
      .post(`/v1/agents/${agentId}/invocation-keys`)
      .set('Authorization', `Bearer ${token}`)
      .send({ label: 'ci' });

    jest.clearAllMocks();

    const res = await request(app)
      .post(`/v1/agents/${agentId}/runs`)
      .set('Authorization', `Bearer ${key.body.key}`)
      .send({ input: {} });

    expect(res.status).toBe(401);
    expect(engineClient.post).not.toHaveBeenCalled();
  });

  it('dispatches with a platform JWT, forwarding no invocation key', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await publishedAgent(token, `jwt-disp-${Date.now()}`);

    jest.clearAllMocks();
    engineClient.post.mockResolvedValue({ data: { runId: 'run-jwt' } });

    const res = await request(app)
      .post(`/v1/agents/${agentId}/runs`)
      .set('Authorization', `Bearer ${token}`)
      .send({ input: { q: 'hi' } });

    expect(res.status).toBe(202);
    const [, body] = engineClient.post.mock.calls[0];
    expect(body.authKey).toBeUndefined();
    expect(body.authorizationHeader).toBe(`Bearer ${token}`);
    expect(body.input).toEqual({ q: 'hi' });
  });

  it('401s on a revoked invocation key', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await publishedAgent(token, `key-rev-${Date.now()}`);

    const key = await request(app)
      .post(`/v1/agents/${agentId}/invocation-keys`)
      .set('Authorization', `Bearer ${token}`)
      .send({ label: 'doomed' });

    await db
      .update(invocationKeys)
      .set({ revoked: true })
      .where(eq(invocationKeys.id, key.body.id as string));

    const res = await request(app)
      .post(`/v1/agents/${agentId}/runs`)
      .set('Authorization', `Bearer ${key.body.key}`)
      .send({ input: {} });

    expect(res.status).toBe(401);
  });

  it("401s on an invocation key issued for a different agent", async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentA = await publishedAgent(token, `key-a-${Date.now()}`);
    const agentB = await publishedAgent(token, `key-b-${Date.now()}`);

    const key = await request(app)
      .post(`/v1/agents/${agentA}/invocation-keys`)
      .set('Authorization', `Bearer ${token}`)
      .send({ label: 'for-a' });

    const res = await request(app)
      .post(`/v1/agents/${agentB}/runs`)
      .set('Authorization', `Bearer ${key.body.key}`)
      .send({ input: {} });

    expect(res.status).toBe(401);
  });

  it('401s on an expired invocation key', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await publishedAgent(token, `key-exp-${Date.now()}`);

    const key = await request(app)
      .post(`/v1/agents/${agentId}/invocation-keys`)
      .set('Authorization', `Bearer ${token}`)
      .send({ label: 'stale', expiresAt: new Date(Date.now() + 1000).toISOString() });

    await db
      .update(invocationKeys)
      .set({ expiresAt: new Date(Date.now() - 1000) })
      .where(eq(invocationKeys.id, key.body.id as string));

    const res = await request(app)
      .post(`/v1/agents/${agentId}/runs`)
      .set('Authorization', `Bearer ${key.body.key}`)
      .send({ input: {} });

    expect(res.status).toBe(401);
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

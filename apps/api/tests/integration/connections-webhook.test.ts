import request from 'supertest';
import * as crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { db } from '@/db/client';
import { integrationConnections } from '@/db/schema';
import { decryptCredentials } from '@/lib/credentials';
import { config } from '@/config';

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
  engineClient.post.mockResolvedValue({ status: 202, data: { runId: 'run-1' } });
  engineClient.get.mockResolvedValue({ data: [] });
});

async function createConnection(token: string, service = 'slack'): Promise<string> {
  const res = await request(app)
    .post('/v1/integrations/connections')
    .set('Authorization', `Bearer ${token}`)
    .send({
      service,
      displayName: 'Team Slack',
      authType: 'api_key',
      credentials: { api_key: 'xoxb-secret' },
    });
  expect(res.status).toBe(201);
  return res.body.id as string;
}

describe('integration connections', () => {
  it('stores credentials encrypted and never returns them', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const id = await createConnection(token);

    const rows = await db
      .select()
      .from(integrationConnections)
      .where(eq(integrationConnections.id, id));
    expect(rows[0].credentialsEnc).not.toContain('xoxb-secret');
    expect(JSON.parse(decryptCredentials(rows[0].credentialsEnc)).api_key).toBe('xoxb-secret');

    const got = await request(app)
      .get(`/v1/integrations/connections/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(got.status).toBe(200);
    expect(JSON.stringify(got.body)).not.toContain('xoxb-secret');

    const list = await request(app)
      .get('/v1/integrations/connections')
      .set('Authorization', `Bearer ${token}`);
    expect(list.body).toHaveLength(1);
    expect(JSON.stringify(list.body)).not.toContain('xoxb-secret');
  });

  it('400s when a required field is missing', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const res = await request(app)
      .post('/v1/integrations/connections')
      .set('Authorization', `Bearer ${token}`)
      .send({ service: 'slack' });
    expect(res.status).toBe(400);
  });

  it('re-encrypts on update and can rename', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const id = await createConnection(token);

    const res = await request(app)
      .patch(`/v1/integrations/connections/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ displayName: 'Renamed', credentials: { api_key: 'rotated' } });
    expect(res.status).toBe(200);

    const rows = await db
      .select()
      .from(integrationConnections)
      .where(eq(integrationConnections.id, id));
    expect(rows[0].displayName).toBe('Renamed');
    expect(JSON.parse(decryptCredentials(rows[0].credentialsEnc)).api_key).toBe('rotated');
  });

  it('deletes a connection', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const id = await createConnection(token);

    const res = await request(app)
      .delete(`/v1/integrations/connections/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
    expect(
      await db.select().from(integrationConnections).where(eq(integrationConnections.id, id)),
    ).toHaveLength(0);
  });

  it("404s on another tenant's connection", async () => {
    const alice = await createUserAndLogin(app, 'tenant_admin');
    const bob = await createUserAndLogin(app, 'tenant_admin');
    const id = await createConnection(alice.token);
    const auth = { Authorization: `Bearer ${bob.token}` };

    expect((await request(app).get(`/v1/integrations/connections/${id}`).set(auth)).status).toBe(404);
    expect(
      (await request(app).patch(`/v1/integrations/connections/${id}`).set(auth).send({ displayName: 'x' })).status,
    ).toBe(404);
    expect((await request(app).delete(`/v1/integrations/connections/${id}`).set(auth)).status).toBe(404);
  });

  it('requires tenant_admin to mutate', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .post('/v1/integrations/connections')
      .set('Authorization', `Bearer ${token}`)
      .send({ service: 's', displayName: 'd', authType: 'api_key', credentials: {} });
    expect(res.status).toBe(403);
  });
});

describe('POST /v1/agents/:id/webhook/:secret', () => {
  function webhookSecret(agentId: string): string {
    return crypto.createHmac('sha256', config.masterKey).update(agentId).digest('hex');
  }

  async function publishedAgent(token: string, handle: string): Promise<string> {
    const create = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Hook', handle });
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

  it('dispatches a run when the secret matches', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await publishedAgent(token, `hook-ok-${Date.now()}`);
    jest.clearAllMocks();
    engineClient.post.mockResolvedValue({ data: { runId: 'run-hook' } });

    const res = await request(app)
      .post(`/v1/agents/${agentId}/webhook/${webhookSecret(agentId)}`)
      .send({ event: 'ping' });

    expect(res.status).toBe(202);
    expect(engineClient.post).toHaveBeenCalledWith(
      `/internal/agents/${agentId}/webhook`,
      { event: 'ping' },
      { headers: { 'x-tenant-id': tenantId } },
    );
  });

  it('401s on a wrong secret without dispatching', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await publishedAgent(token, `hook-bad-${Date.now()}`);
    jest.clearAllMocks();

    const res = await request(app)
      .post(`/v1/agents/${agentId}/webhook/${'a'.repeat(64)}`)
      .send({});

    expect(res.status).toBe(401);
    expect(engineClient.post).not.toHaveBeenCalled();
  });

  it('401s on a secret of the wrong length (no timing-safe compare crash)', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await publishedAgent(token, `hook-short-${Date.now()}`);

    const res = await request(app).post(`/v1/agents/${agentId}/webhook/short`).send({});
    expect(res.status).toBe(401);
  });

  it('404s for an unknown agent', async () => {
    const res = await request(app)
      .post(`/v1/agents/ghost/webhook/${webhookSecret('ghost')}`)
      .send({});
    expect(res.status).toBe(404);
  });

  it('409s when the agent is still a draft', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const create = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Draft Hook', handle: `hook-draft-${Date.now()}` });
    const agentId = create.body.id as string;

    const res = await request(app)
      .post(`/v1/agents/${agentId}/webhook/${webhookSecret(agentId)}`)
      .send({});

    expect(res.status).toBe(409);
    expect(res.body.code).toBe('AGENT_NOT_ACTIVE');
  });
});

describe('POST /v1/utils/evaluate', () => {
  it('evaluates a JSONata expression against the supplied context', async () => {
    const { token } = await createUserAndLogin(app, 'developer');

    const res = await request(app)
      .post('/v1/utils/evaluate')
      .set('Authorization', `Bearer ${token}`)
      .send({ expression: '$.a + $.b', context: { a: 2, b: 3 } });

    expect(res.status).toBe(200);
    expect(res.body.result).toBe(5);
  });

  it('returns null for an empty expression', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .post('/v1/utils/evaluate')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(res.body.result).toBeNull();
  });

  it('reports an evaluation error as a field rather than a 500', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .post('/v1/utils/evaluate')
      .set('Authorization', `Bearer ${token}`)
      .send({ expression: '$.(' });

    expect(res.status).toBe(200);
    expect(res.body.error).toBeTruthy();
  });

  it('aborts a runaway expression instead of hanging (ISS-060)', async () => {
    const { token } = await createUserAndLogin(app, 'developer');

    const res = await request(app)
      .post('/v1/utils/evaluate')
      .set('Authorization', `Bearer ${token}`)
      .send({ expression: '$sum([1..10000000].($ * $))', context: {} });

    expect(res.status).toBe(200);
    expect(res.body.error).toMatch(/time budget/);
  }, 15_000);

  it('requires auth', async () => {
    expect((await request(app).post('/v1/utils/evaluate').send({})).status).toBe(401);
  });
});

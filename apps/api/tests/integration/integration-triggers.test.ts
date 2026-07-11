import request from 'supertest';
import { eq } from 'drizzle-orm';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { db } from '@/db/client';
import { tenants } from '@/db/schema';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: {
    post: jest.fn(),
    get: jest.fn(),
  },
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
});

async function tenantSlugOf(tenantId: string): Promise<string> {
  const rows = await db
    .select({ slug: tenants.slug })
    .from(tenants)
    .where(eq(tenants.id, tenantId));
  return rows[0].slug;
}

async function createAgent(token: string, handle: string): Promise<string> {
  const create = await request(app)
    .post('/v1/agents')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'Trigger Agent', handle });
  return create.body.id as string;
}

describe('GET /v1/integrations', () => {
  it('proxies the engine integration registry', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    engineClient.get.mockResolvedValue({
      data: [{ service: 'slack', displayName: 'Slack', hasTrigger: true }],
    });

    const res = await request(app)
      .get('/v1/integrations')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body[0].service).toBe('slack');
    expect(engineClient.get).toHaveBeenCalledWith('/internal/integrations');
  });

  it('requires auth', async () => {
    const res = await request(app).get('/v1/integrations');
    expect(res.status).toBe(401);
  });
});

describe('integration trigger CRUD', () => {
  it('registers, lists, and deletes a trigger', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');
    const agentId = await createAgent(token, `trig-crud-${Date.now()}`);
    const slug = await tenantSlugOf(tenantId);

    const created = await request(app)
      .post('/v1/integrations/triggers')
      .set('Authorization', `Bearer ${token}`)
      .send({ service: 'slack', agentId, secret: 'signing-secret', eventFilter: 'app_mention' });

    expect(created.status).toBe(201);
    expect(created.body.url).toContain(`/v1/triggers/integrations/slack/${slug}`);
    expect(created.body.secret).toBeUndefined(); // secret must never be echoed

    const list = await request(app)
      .get('/v1/integrations/triggers')
      .set('Authorization', `Bearer ${token}`);
    expect(list.status).toBe(200);
    expect(list.body).toHaveLength(1);
    expect(list.body[0].agentId).toBe(agentId);

    const del = await request(app)
      .delete(`/v1/integrations/triggers/${created.body.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(del.status).toBe(204);

    const after = await request(app)
      .get('/v1/integrations/triggers')
      .set('Authorization', `Bearer ${token}`);
    expect(after.body).toHaveLength(0);
  });

  it('rejects registration for an agent in another tenant', async () => {
    const alice = await createUserAndLogin(app, 'tenant_admin');
    const bob = await createUserAndLogin(app, 'tenant_admin');
    const aliceAgent = await createAgent(alice.token, `trig-xtenant-${Date.now()}`);

    const res = await request(app)
      .post('/v1/integrations/triggers')
      .set('Authorization', `Bearer ${bob.token}`)
      .send({ service: 'slack', agentId: aliceAgent, secret: 's' });

    expect(res.status).toBe(404);
  });

  it('requires tenant_admin role', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .post('/v1/integrations/triggers')
      .set('Authorization', `Bearer ${token}`)
      .send({ service: 'slack', agentId: 'x', secret: 's' });

    expect(res.status).toBe(403);
  });
});

describe('POST /v1/triggers/integrations/:service/:tenantSlug (public receiver)', () => {
  it('forwards raw body, headers, and trigger rows to the engine', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');
    const agentId = await createAgent(token, `trig-recv-${Date.now()}`);
    const slug = await tenantSlugOf(tenantId);

    await request(app)
      .post('/v1/integrations/triggers')
      .set('Authorization', `Bearer ${token}`)
      .send({ service: 'slack', agentId, secret: 'shhh' });

    engineClient.post.mockResolvedValue({ status: 202, data: { runIds: ['run-1'] } });

    const payload = { type: 'event_callback', event: { type: 'app_mention' } };
    const res = await request(app)
      .post(`/v1/triggers/integrations/slack/${slug}`)
      .set('x-slack-signature', 'v0=abc')
      .set('x-slack-request-timestamp', '1700000000')
      .send(payload);

    expect(res.status).toBe(202);
    expect(res.body.runIds).toEqual(['run-1']);

    const [url, body] = engineClient.post.mock.calls[0];
    expect(url).toBe('/internal/triggers/integrations/slack');
    expect(body.tenantId).toBe(tenantId);
    expect(JSON.parse(body.rawBody)).toEqual(payload);
    expect(body.headers['x-slack-signature']).toBe('v0=abc');
    expect(body.headers.authorization).toBeUndefined();
    expect(body.triggers).toHaveLength(1);
    expect(body.triggers[0].secret).toBe('shhh');
    expect(body.triggers[0].agentId).toBe(agentId);
  });

  it('404s for an unknown tenant slug without calling the engine', async () => {
    const res = await request(app)
      .post('/v1/triggers/integrations/slack/nope-does-not-exist')
      .send({ hello: 'world' });

    expect(res.status).toBe(404);
    expect(engineClient.post).not.toHaveBeenCalled();
  });

  it('404s when the tenant has no registrations for the service', async () => {
    const { tenantId } = await createUserAndLogin(app, 'tenant_admin');
    const slug = await tenantSlugOf(tenantId);

    const res = await request(app)
      .post(`/v1/triggers/integrations/slack/${slug}`)
      .send({ hello: 'world' });

    expect(res.status).toBe(404);
    expect(engineClient.post).not.toHaveBeenCalled();
  });
});

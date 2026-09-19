import request from 'supertest';
import { eq } from 'drizzle-orm';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { db } from '@/db/client';
import { integrationConnections, namedRouterPolicies } from '@/db/schema';
import { decryptCredentials } from '@/lib/credentials';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: { post: jest.fn(), get: jest.fn() },
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { engineClient } = require('../../src/lib/engine-client') as {
  engineClient: { post: jest.Mock; get: jest.Mock };
};

const app = createApp();
const KEY = 'sk-ant-test-secret';

const CATALOG = [
  {
    provider: 'anthropic',
    displayName: 'Anthropic',
    description: 'Claude models via the Anthropic API.',
    authFields: [{ key: 'api_key', label: 'API key', type: 'secret', required: true }],
    models: [{ id: 'claude-sonnet-5', label: 'Claude Sonnet 5', recommended: true }],
  },
];

beforeAll(async () => {
  await runMigrations();
});

beforeEach(() => {
  jest.clearAllMocks();
  engineClient.get.mockResolvedValue({ data: CATALOG });
  engineClient.post.mockResolvedValue({ data: { ok: true } });
});

async function tenantRows(tenantId: string) {
  const connections = await db
    .select()
    .from(integrationConnections)
    .where(eq(integrationConnections.tenantId, tenantId));
  const policies = await db
    .select()
    .from(namedRouterPolicies)
    .where(eq(namedRouterPolicies.tenantId, tenantId));
  return { connections, policies };
}

describe('GET /v1/llm/providers', () => {
  it('proxies the engine provider catalog to any authenticated user', async () => {
    const { token } = await createUserAndLogin(app, 'viewer');

    const res = await request(app).get('/v1/llm/providers').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(CATALOG);
    expect(engineClient.get).toHaveBeenCalledWith('/internal/llm/providers');
  });
});

describe('POST /v1/llm/providers/:provider/connections', () => {
  const connect = (token: string, body: Record<string, unknown>, provider = 'anthropic') =>
    request(app)
      .post(`/v1/llm/providers/${provider}/connections`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

  it('validates the key, stores the connection encrypted, and creates a router policy', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');

    const res = await connect(token, {
      credentials: { api_key: KEY },
      routerPolicy: { create: true, model: 'claude-sonnet-5' },
    });

    expect(res.status).toBe(201);
    expect(engineClient.post).toHaveBeenCalledWith('/internal/llm/providers/anthropic/validate', {
      credentials: { api_key: KEY },
    });
    expect(res.body.connection).toMatchObject({
      service: 'anthropic',
      displayName: 'Anthropic',
      authType: 'api_key',
      status: 'active',
    });
    expect(res.body.routerPolicy).toMatchObject({
      name: 'anthropic-claude-sonnet-5',
      config: {
        strategy: 'priority',
        targets: [
          { id: 'primary', connectionId: res.body.connection.id, provider: 'anthropic', model: 'claude-sonnet-5' },
        ],
        triggers: [],
      },
    });
    expect(JSON.stringify(res.body)).not.toContain(KEY);

    const { connections, policies } = await tenantRows(tenantId);
    expect(connections).toHaveLength(1);
    expect(connections[0].credentialsEnc).not.toContain(KEY);
    expect(JSON.parse(decryptCredentials(connections[0].credentialsEnc)).api_key).toBe(KEY);
    expect(policies).toHaveLength(1);
  });

  it('uses the provided display name and policy name', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');

    const res = await connect(token, {
      displayName: 'Prod Claude',
      credentials: { api_key: KEY },
      routerPolicy: { create: true, model: 'my-custom-model', name: 'primary' },
    });

    expect(res.status).toBe(201);
    expect(res.body.connection.displayName).toBe('Prod Claude');
    expect(res.body.routerPolicy.name).toBe('primary');
    expect(res.body.routerPolicy.config.targets[0].model).toBe('my-custom-model');
  });

  it('creates no router policy unless asked', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');

    const res = await connect(token, { credentials: { api_key: KEY } });

    expect(res.status).toBe(201);
    expect(res.body.routerPolicy).toBeUndefined();
    const { connections, policies } = await tenantRows(tenantId);
    expect(connections).toHaveLength(1);
    expect(policies).toHaveLength(0);
  });

  it('422s and stores nothing when the provider rejects the key', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');
    engineClient.post.mockResolvedValue({ data: { ok: false, reason: 'invalid_key', message: 'rejected' } });

    const res = await connect(token, {
      credentials: { api_key: KEY },
      routerPolicy: { create: true, model: 'claude-sonnet-5' },
    });

    expect(res.status).toBe(422);
    expect(res.body.code).toBe('PROVIDER_KEY_INVALID');
    const { connections, policies } = await tenantRows(tenantId);
    expect(connections).toHaveLength(0);
    expect(policies).toHaveLength(0);
  });

  it('424s when the provider is unreachable, and saves when validation is skipped', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');
    engineClient.post.mockResolvedValue({ data: { ok: false, reason: 'unreachable' } });

    const first = await connect(token, { credentials: { api_key: KEY } });
    expect(first.status).toBe(424);
    expect(first.body.code).toBe('PROVIDER_UNREACHABLE');
    expect((await tenantRows(tenantId)).connections).toHaveLength(0);

    engineClient.post.mockClear();
    const second = await connect(token, { credentials: { api_key: KEY }, skipValidation: true });
    expect(second.status).toBe(201);
    expect(engineClient.post).not.toHaveBeenCalled();
    expect((await tenantRows(tenantId)).connections).toHaveLength(1);
  });

  it('409s instead of 500ing when the generated policy name is taken', async () => {
    // named_router_policies is UNIQUE(tenant_id, name) and the generated name is
    // `${provider}-${model}` — a second key for the same provider repeated it,
    // rolled the transaction back, and surfaced as a 500 with the key lost.
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');
    const body = { credentials: { api_key: KEY }, routerPolicy: { create: true, model: 'claude-sonnet-5' } };

    const first = await connect(token, body);
    expect(first.status).toBe(201);

    const second = await connect(token, body);
    expect(second.status).toBe(409);
    expect(second.body.code).toBe('POLICY_NAME_TAKEN');
    expect(second.body.error).toContain('anthropic-claude-sonnet-5');

    // The clash rolled back cleanly — no orphan connection from the second try
    const { connections, policies } = await tenantRows(tenantId);
    expect(connections).toHaveLength(1);
    expect(policies).toHaveLength(1);
  });

  it('keeps the key out of the error when the engine is unreachable', async () => {
    // A transport-level failure used to rethrow the raw AxiosError, whose
    // config.data carries the plaintext key straight into errorHandler's log.
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    engineClient.post.mockRejectedValue(
      Object.assign(new Error('connect ECONNREFUSED'), { config: { data: JSON.stringify({ credentials: { api_key: KEY } }) } }),
    );

    const res = await connect(token, { credentials: { api_key: KEY } });

    expect(res.status).toBe(424);
    expect(res.body.code).toBe('PROVIDER_UNREACHABLE');
    expect(JSON.stringify(res.body)).not.toContain(KEY);
  });

  it('404s for a provider not in the catalog', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');

    const res = await connect(token, { credentials: { api_key: KEY } }, 'nope');

    expect(res.status).toBe(404);
    expect(res.body.code).toBe('PROVIDER_NOT_FOUND');
  });

  it('400s without validating when a required credential is missing', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');

    const res = await connect(token, { credentials: {} });

    expect(res.status).toBe(400);
    expect(engineClient.post).not.toHaveBeenCalled();
  });

  it('400s when a router policy is requested without a model', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');

    const res = await connect(token, { credentials: { api_key: KEY }, routerPolicy: { create: true } });

    expect(res.status).toBe(400);
    expect((await tenantRows(tenantId)).connections).toHaveLength(0);
  });

  it('403s for roles below tenant_admin', async () => {
    const { token } = await createUserAndLogin(app, 'developer');

    const res = await connect(token, { credentials: { api_key: KEY } });

    expect(res.status).toBe(403);
    expect(engineClient.post).not.toHaveBeenCalled();
  });
});

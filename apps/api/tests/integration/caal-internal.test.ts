import request from 'supertest';
import * as crypto from 'node:crypto';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { db } from '@/db/client';
import { agents, integrationConnections } from '@/db/schema';
import { config } from '@/config';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: { post: jest.fn(), get: jest.fn() },
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { engineClient } = require('../../src/lib/engine-client') as {
  engineClient: { post: jest.Mock; get: jest.Mock };
};

const app = createApp();
const INTERNAL = { 'X-Internal-Auth': config.masterKey };

beforeAll(async () => {
  await runMigrations();
});

beforeEach(() => {
  jest.clearAllMocks();
  engineClient.get.mockResolvedValue({
    data: [
      { type: 'core:start', meta: {}, schema: {} },
      { type: 'acme:premium:node', meta: {}, schema: {}, packageId: 'acme/premium' },
    ],
  });
});

/**
 * Caal's platform tools run inside the engine with no user session. They used
 * to call the tenant-facing /v1 routes with X-Internal-Auth — which only guards
 * /internal/* — so every call 401'd, the model got an error back, and the
 * suggester burned its iteration budget retrying.
 */
describe('internal Caal reads', () => {
  it('serves entitlement-filtered node types for the named tenant', async () => {
    const { tenantId } = await createUserAndLogin(app, 'developer');

    const res = await request(app)
      .get('/internal/caal/nodes')
      .set({ ...INTERNAL, 'X-Tenant-Id': tenantId });

    expect(res.status).toBe(200);
    expect(res.body.map((n: { type: string }) => n.type)).toEqual(['core:start']);
  });

  it('serves a single node type, and 404s for one that does not exist', async () => {
    const { tenantId } = await createUserAndLogin(app, 'developer');
    const headers = { ...INTERNAL, 'X-Tenant-Id': tenantId };

    const found = await request(app).get('/internal/caal/nodes/core:start').set(headers);
    expect(found.status).toBe(200);
    expect(found.body.type).toBe('core:start');

    // The old /v1/nodes/:type this tool called never existed at all.
    const missing = await request(app).get('/internal/caal/nodes/core:nope').set(headers);
    expect(missing.status).toBe(404);
    expect(missing.body.code).toBe('NODE_TYPE_NOT_FOUND');
  });

  it("lists the tenant's connections without their credentials", async () => {
    const { tenantId } = await createUserAndLogin(app, 'developer');
    await db.insert(integrationConnections).values({
      id: crypto.randomUUID(),
      tenantId,
      service: 'anthropic',
      displayName: 'Anthropic',
      authType: 'api_key',
      credentialsEnc: 'encrypted-secret-blob',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const res = await request(app)
      .get('/internal/caal/connections')
      .set({ ...INTERNAL, 'X-Tenant-Id': tenantId });

    expect(res.status).toBe(200);
    expect(res.body[0]).toMatchObject({ service: 'anthropic', status: 'active' });
    expect(JSON.stringify(res.body)).not.toContain('encrypted-secret-blob');
    expect(JSON.stringify(res.body)).not.toContain('credentialsEnc');
  });

  it("lists only the named tenant's agents", async () => {
    const mine = await createUserAndLogin(app, 'developer');
    const other = await createUserAndLogin(app, 'developer');
    for (const [tenantId, name] of [[mine.tenantId, 'Mine'], [other.tenantId, 'Theirs']] as const) {
      await db.insert(agents).values({
        id: crypto.randomUUID(),
        tenantId,
        name,
        handle: `agent-${crypto.randomUUID().slice(0, 8)}`,
        status: 'active',
        authoringMode: 'studio',
        enabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const res = await request(app)
      .get('/internal/caal/agents')
      .set({ ...INTERNAL, 'X-Tenant-Id': mine.tenantId });

    expect(res.status).toBe(200);
    expect(res.body.map((a: { name: string }) => a.name)).toEqual(['Mine']);
  });

  it('requires internal auth and an explicit tenant', async () => {
    const { tenantId, token } = await createUserAndLogin(app, 'developer');

    const noAuth = await request(app).get('/internal/caal/nodes').set({ 'X-Tenant-Id': tenantId });
    expect(noAuth.status).toBe(401);

    // A user bearer token is not a substitute for the engine's shared key
    const userToken = await request(app)
      .get('/internal/caal/nodes')
      .set({ Authorization: `Bearer ${token}`, 'X-Tenant-Id': tenantId });
    expect(userToken.status).toBe(401);

    const noTenant = await request(app).get('/internal/caal/nodes').set(INTERNAL);
    expect(noTenant.status).toBe(400);
  });
});

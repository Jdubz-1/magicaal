import request from 'supertest';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';

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

const GATED_ROUTES: Array<{ method: 'get' | 'post' | 'delete'; path: string }> = [
  { method: 'get', path: '/v1/marketplace/account' },
  { method: 'post', path: '/v1/marketplace/account' },
  { method: 'get', path: '/v1/marketplace/catalog' },
  { method: 'get', path: '/v1/marketplace/packages' },
  { method: 'post', path: '/v1/marketplace/packages/x/install' },
  { method: 'post', path: '/v1/marketplace/packages/x/update' },
  { method: 'delete', path: '/v1/marketplace/packages/x' },
  { method: 'get', path: '/v1/marketplace/licenses' },
  { method: 'post', path: '/v1/marketplace/templates/import' },
  { method: 'post', path: '/v1/marketplace/prompt-packs/import' },
];

describe('MARKETPLACE_ENABLED=false gate (default)', () => {
  it('returns 503 with MARKETPLACE_DISABLED for every gated route', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');

    for (const route of GATED_ROUTES) {
      const res = await request(app)
        [route.method](route.path)
        .set('Authorization', `Bearer ${token}`)
        .send({});
      expect({ ...route, status: res.status }).toEqual({ ...route, status: 503 });
      expect(res.body.code).toBe('MARKETPLACE_DISABLED');
    }
  });

  it('still requires auth before the gate answers', async () => {
    const res = await request(app).get('/v1/marketplace/catalog');
    expect(res.status).toBe(401);
  });

  it('air-gapped bundle upload is NOT gated', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    engineClient.post.mockResolvedValue({
      data: {
        packageId: 'acme/demo@1.0.0',
        publisher: 'acme',
        name: 'demo',
        version: '1.0.0',
        scope: 'community',
        signatureStatus: 'unverified',
        countersigned: false,
        contentHash: 'hash',
        publisherSig: 'sig',
        magicaalCountersig: null,
        nodeTypes: ['community:acme:demo'],
        manifest: { pricing: { model: 'free' } },
      },
    });

    const res = await request(app)
      .post('/v1/marketplace/licenses/bundle')
      .set('Authorization', `Bearer ${token}`)
      .send({ bundleBase64: Buffer.from('bundle').toString('base64') });

    expect(res.status).toBe(201);
    expect(res.body.packageId).toBe('acme/demo@1.0.0');
    expect(engineClient.post).toHaveBeenCalledWith(
      '/internal/packages/install',
      expect.objectContaining({ bundleBase64: expect.any(String) }),
    );
  });

  it('bundle upload records the package and license', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    engineClient.post.mockResolvedValue({
      data: {
        packageId: 'acme/demo2@1.0.0',
        publisher: 'acme',
        name: 'demo2',
        version: '1.0.0',
        scope: 'integration',
        signatureStatus: 'verified',
        countersigned: true,
        contentHash: 'hash2',
        publisherSig: 'sig2',
        magicaalCountersig: 'countersig2',
        nodeTypes: ['integration:acme:demo2'],
        manifest: { pricing: { model: 'free' } },
      },
    });

    await request(app)
      .post('/v1/marketplace/licenses/bundle')
      .set('Authorization', `Bearer ${token}`)
      .send({ bundleBase64: 'YQ==' });

    // Verify via the gated list route being 503 — read the DB directly instead
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { db } = require('@/db/client');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { packageRegistry } = require('@/db/schema');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { eq } = require('drizzle-orm');
    const rows = await db
      .select()
      .from(packageRegistry)
      .where(eq(packageRegistry.name, 'demo2'));
    expect(rows).toHaveLength(1);
    expect(rows[0].signatureStatus).toBe('verified');
    expect(rows[0].packageType).toBe('integration');
  });

  it('bundle upload requires tenant_admin', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .post('/v1/marketplace/licenses/bundle')
      .set('Authorization', `Bearer ${token}`)
      .send({ bundleBase64: 'YQ==' });
    expect(res.status).toBe(403);
  });

  it('surfaces engine signature rejection', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    engineClient.post.mockRejectedValue(
      Object.assign(new Error('package verification failed: content hash mismatch'), {
        status: 422,
      }),
    );

    const res = await request(app)
      .post('/v1/marketplace/licenses/bundle')
      .set('Authorization', `Bearer ${token}`)
      .send({ bundleBase64: 'YQ==' });

    expect(res.status).toBe(422);
  });
});

describe('GET /v1/openapi.json', () => {
  it('serves a valid OpenAPI 3 document without auth', async () => {
    const res = await request(app).get('/v1/openapi.json');
    expect(res.status).toBe(200);
    expect(res.body.openapi).toBe('3.0.3');
    expect(res.body.info.title).toContain('MagiCaal');
    expect(res.body.paths['/v1/agents']).toBeDefined();
    expect(res.body.paths['/v1/marketplace/licenses/bundle']).toBeDefined();
    expect(res.body.paths['/v1/triggers/integrations/{service}/{tenantSlug}']).toBeDefined();
  });
});

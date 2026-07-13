import request from 'supertest';
import { eq } from 'drizzle-orm';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { db } from '@/db/client';
import { packageRegistry, assetLicenses, marketplaceCatalogCache, agents, promptVersions } from '@/db/schema';

// The gated routes are 503 by default, so the controller bodies are unreachable
// without turning the flag on. jest.mock is hoisted above the imports above.
jest.mock('@/config', () => {
  const actual = jest.requireActual('@/config');
  return {
    ...actual,
    config: {
      ...actual.config,
      marketplaceEnabled: true,
      marketplaceApiUrl: 'https://marketplace.test',
    },
  };
});

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: { post: jest.fn(), get: jest.fn() },
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { engineClient } = require('../../src/lib/engine-client') as {
  engineClient: { post: jest.Mock; get: jest.Mock };
};

const app = createApp();
const originalFetch = global.fetch;

beforeAll(async () => {
  await runMigrations();
});

beforeEach(async () => {
  jest.clearAllMocks();
  await db.delete(marketplaceCatalogCache);
});

afterEach(() => {
  global.fetch = originalFetch;
});

function mockFetch(...responses: Response[]): jest.Mock {
  const fn = jest.fn();
  for (const r of responses) fn.mockResolvedValueOnce(r);
  global.fetch = fn as unknown as typeof fetch;
  return fn;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status });
}

function engineInstallResult(name: string, scope = 'community'): Record<string, unknown> {
  return {
    packageId: `acme/${name}@1.0.0`,
    publisher: 'acme',
    name,
    version: '1.0.0',
    scope,
    signatureStatus: 'verified',
    countersigned: true,
    contentHash: 'hash',
    publisherSig: 'sig',
    magicaalCountersig: 'countersig',
    nodeTypes: [`community:acme:${name}`],
    manifest: { pricing: { model: 'free' } },
  };
}

const CATALOG = {
  assets: [
    {
      assetId: 'asset-1',
      type: 'node-package',
      scope: 'community',
      publisher: 'acme',
      name: 'demo',
      version: '2.0.0',
      downloadUrl: 'https://marketplace.test/dl/demo',
      publisherPublicKey: 'pubkey',
    },
    { assetId: 'asset-no-url', type: 'node-package', scope: 'community', publisher: 'acme', name: 'nodl', version: '1.0.0' },
  ],
};

describe('POST /v1/marketplace/account', () => {
  it('verifies the key upstream and stores it encrypted', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    mockFetch(json({ accountId: 'acct-1', displayName: 'Acme', plan: 'pro' }, 200));

    const res = await request(app)
      .post('/v1/marketplace/account')
      .set('Authorization', `Bearer ${token}`)
      .send({ apiKey: 'mk_live_123' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ linked: true, accountId: 'acct-1', plan: 'pro' });

    const got = await request(app)
      .get('/v1/marketplace/account')
      .set('Authorization', `Bearer ${token}`);
    expect(got.body.linked).toBe(true);
    // the key itself is never echoed back
    expect(JSON.stringify(got.body)).not.toContain('mk_live_123');
  });

  it('400s without an apiKey', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const res = await request(app)
      .post('/v1/marketplace/account')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(res.status).toBe(400);
  });

  it('401s when the Marketplace rejects the key', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    mockFetch(json({}, 401));

    const res = await request(app)
      .post('/v1/marketplace/account')
      .set('Authorization', `Bearer ${token}`)
      .send({ apiKey: 'bad' });

    expect(res.status).toBe(401);
  });

  it('502s when the Marketplace is unhealthy', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    mockFetch(json({}, 500));

    const res = await request(app)
      .post('/v1/marketplace/account')
      .set('Authorization', `Bearer ${token}`)
      .send({ apiKey: 'x' });

    expect(res.status).toBe(502);
  });
});

describe('GET /v1/marketplace/catalog', () => {
  it('fetches, caches, then serves from cache', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const fetchMock = mockFetch(json(CATALOG), json(CATALOG));

    const first = await request(app)
      .get('/v1/marketplace/catalog')
      .set('Authorization', `Bearer ${token}`);
    expect(first.status).toBe(200);
    expect(first.body.assets).toHaveLength(2);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // second call is served from the cache — no upstream hit
    const second = await request(app)
      .get('/v1/marketplace/catalog')
      .set('Authorization', `Bearer ${token}`);
    expect(second.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // ...unless refresh is forced
    const forced = await request(app)
      .get('/v1/marketplace/catalog?refresh=true')
      .set('Authorization', `Bearer ${token}`);
    expect(forced.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('502s when the catalog fetch fails', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    mockFetch(json({}, 503));

    const res = await request(app)
      .get('/v1/marketplace/catalog')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(502);
  });
});

describe('package install / update / remove', () => {
  async function loadCatalog(token: string): Promise<void> {
    mockFetch(json(CATALOG));
    await request(app).get('/v1/marketplace/catalog').set('Authorization', `Bearer ${token}`);
  }

  it('installs from the catalog and records package + license', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');
    await loadCatalog(token);

    mockFetch(new Response(Buffer.from('bundle'), { status: 200 }));
    engineClient.post.mockResolvedValue({ data: engineInstallResult('demo') });

    const res = await request(app)
      .post('/v1/marketplace/packages/asset-1/install')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(201);
    // the catalog's registered publisher key is passed to the verifier
    expect(engineClient.post).toHaveBeenCalledWith(
      '/internal/packages/install',
      expect.objectContaining({ registeredPublisherKey: 'pubkey' }),
    );

    const pkgs = await db
      .select()
      .from(packageRegistry)
      .where(eq(packageRegistry.tenantId, tenantId));
    expect(pkgs).toHaveLength(1);

    const lic = await db
      .select()
      .from(assetLicenses)
      .where(eq(assetLicenses.packageId, pkgs[0].id));
    expect(lic[0].licenseType).toBe('free');

    const list = await request(app)
      .get('/v1/marketplace/packages')
      .set('Authorization', `Bearer ${token}`);
    expect(list.body).toHaveLength(1);

    const licenses = await request(app)
      .get('/v1/marketplace/licenses')
      .set('Authorization', `Bearer ${token}`);
    expect(licenses.body[0].packageName).toBe('demo');
  });

  it('409s when no catalog has been loaded', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const res = await request(app)
      .post('/v1/marketplace/packages/asset-1/install')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(409);
  });

  it('404s for an asset absent from the catalog', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    await loadCatalog(token);

    const res = await request(app)
      .post('/v1/marketplace/packages/ghost/install')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });

  it('422s for an asset with no download URL', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    await loadCatalog(token);

    const res = await request(app)
      .post('/v1/marketplace/packages/asset-no-url/install')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(422);
  });

  it('502s when the bundle download fails', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    await loadCatalog(token);
    mockFetch(new Response('nope', { status: 404 }));

    const res = await request(app)
      .post('/v1/marketplace/packages/asset-1/install')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(502);
  });

  it('updates to a newer catalog version and disables the old row', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');

    // install v1.0.0 via the air-gapped path (always available)
    engineClient.post.mockResolvedValue({ data: engineInstallResult('demo') });
    await request(app)
      .post('/v1/marketplace/licenses/bundle')
      .set('Authorization', `Bearer ${token}`)
      .send({ bundleBase64: 'YQ==' });

    // scope to this tenant — other tests install a package of the same name
    const installed = (
      await db.select().from(packageRegistry).where(eq(packageRegistry.tenantId, tenantId))
    )[0];

    await loadCatalog(token); // catalog offers 2.0.0
    mockFetch(new Response(Buffer.from('bundle'), { status: 200 }));
    engineClient.post.mockResolvedValue({
      data: { ...engineInstallResult('demo'), version: '2.0.0' },
    });

    const res = await request(app)
      .post(`/v1/marketplace/packages/${installed.id}/update`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ updated: true, from: '1.0.0', to: '2.0.0' });

    const old = await db.select().from(packageRegistry).where(eq(packageRegistry.id, installed.id));
    expect(old[0].enabled).toBe(false);
  });

  it('reports no-op when the catalog version matches the installed one', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');

    engineClient.post.mockResolvedValue({
      data: { ...engineInstallResult('demo'), version: '2.0.0' },
    });
    await request(app)
      .post('/v1/marketplace/licenses/bundle')
      .set('Authorization', `Bearer ${token}`)
      .send({ bundleBase64: 'YQ==' });

    const installed = (
      await db.select().from(packageRegistry).where(eq(packageRegistry.tenantId, tenantId))
    )[0];

    await loadCatalog(token);

    const res = await request(app)
      .post(`/v1/marketplace/packages/${installed.id}/update`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.body).toEqual({ updated: false, version: '2.0.0' });
  });

  it("404s updating or removing another tenant's package", async () => {
    const alice = await createUserAndLogin(app, 'tenant_admin');
    const bob = await createUserAndLogin(app, 'tenant_admin');

    engineClient.post.mockResolvedValue({ data: engineInstallResult('alicepkg') });
    await request(app)
      .post('/v1/marketplace/licenses/bundle')
      .set('Authorization', `Bearer ${alice.token}`)
      .send({ bundleBase64: 'YQ==' });

    const pkg = (
      await db.select().from(packageRegistry).where(eq(packageRegistry.name, 'alicepkg'))
    )[0];

    const upd = await request(app)
      .post(`/v1/marketplace/packages/${pkg.id}/update`)
      .set('Authorization', `Bearer ${bob.token}`);
    expect(upd.status).toBe(404);

    const del = await request(app)
      .delete(`/v1/marketplace/packages/${pkg.id}`)
      .set('Authorization', `Bearer ${bob.token}`);
    expect(del.status).toBe(404);
  });

  it('removal disables the package rather than deleting it', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    engineClient.post.mockResolvedValue({ data: engineInstallResult('removable') });
    await request(app)
      .post('/v1/marketplace/licenses/bundle')
      .set('Authorization', `Bearer ${token}`)
      .send({ bundleBase64: 'YQ==' });

    const pkg = (
      await db.select().from(packageRegistry).where(eq(packageRegistry.name, 'removable'))
    )[0];

    const res = await request(app)
      .delete(`/v1/marketplace/packages/${pkg.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);

    const rows = await db.select().from(packageRegistry).where(eq(packageRegistry.id, pkg.id));
    expect(rows).toHaveLength(1); // still present — in-flight runs may hold the module
    expect(rows[0].enabled).toBe(false);
  });
});

describe('POST /v1/marketplace/templates/import', () => {
  const template = {
    graph: {
      entry: 'start',
      nodes: {
        start: { id: 'start', type: 'core:start', config: { greeting: '{{greeting}}' } },
      },
      edges: [],
    },
  };

  it('substitutes parameters and creates a draft agent', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');

    const res = await request(app)
      .post('/v1/marketplace/templates/import')
      .set('Authorization', `Bearer ${token}`)
      .send({
        template,
        parameters: { greeting: 'hello' },
        name: 'From Template',
        handle: `tmpl-${Date.now()}`,
      });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('draft');

    const rows = await db.select().from(agents).where(eq(agents.id, res.body.id));
    const graph = JSON.parse(rows[0].draftGraphJson!);
    expect(graph.nodes.start.config.greeting).toBe('hello');
    expect(rows[0].tenantId).toBe(tenantId);
  });

  it('survives a parameter value containing quotes and backslashes (ISS-054)', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const nasty = 'he said "hi" \\ then left';

    const res = await request(app)
      .post('/v1/marketplace/templates/import')
      .set('Authorization', `Bearer ${token}`)
      .send({
        template,
        parameters: { greeting: nasty },
        name: 'Nasty',
        handle: `nasty-${Date.now()}`,
      });

    expect(res.status).toBe(201);

    const rows = await db.select().from(agents).where(eq(agents.id, res.body.id));
    // the stored graph is still valid JSON and the value round-trips intact
    const graph = JSON.parse(rows[0].draftGraphJson!);
    expect(graph.nodes.start.config.greeting).toBe(nasty);
  });

  it('422s on an unresolved parameter', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const res = await request(app)
      .post('/v1/marketplace/templates/import')
      .set('Authorization', `Bearer ${token}`)
      .send({ template, parameters: {}, name: 'X', handle: `unres-${Date.now()}` });

    expect(res.status).toBe(422);
    expect(res.body.error).toContain('greeting');
  });

  it('400s without template.graph, name, or handle', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const res = await request(app)
      .post('/v1/marketplace/templates/import')
      .set('Authorization', `Bearer ${token}`)
      .send({ template: {}, name: 'X' });
    expect(res.status).toBe(400);
  });

  it('refuses a structurally invalid template graph', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const res = await request(app)
      .post('/v1/marketplace/templates/import')
      .set('Authorization', `Bearer ${token}`)
      .send({
        template: { graph: { entry: 'ghost', nodes: {}, edges: [] } },
        name: 'Broken',
        handle: `broken-${Date.now()}`,
      });

    expect(res.status).toBe(400);
    expect(res.body.code).toBe('INVALID_GRAPH_ENTRY');
  });
});

describe('POST /v1/marketplace/prompt-packs/import', () => {
  it('imports prompts under a pack namespace', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');

    const res = await request(app)
      .post('/v1/marketplace/prompt-packs/import')
      .set('Authorization', `Bearer ${token}`)
      .send({
        pack: {
          publisher: 'acme',
          name: 'support',
          prompts: [
            { name: 'greeting', content: 'Hello!' },
            { name: 'closing', content: 'Bye!' },
          ],
        },
      });

    expect(res.status).toBe(201);
    expect(res.body.namespace).toBe('pack:acme:support');
    expect(res.body.imported).toEqual(['pack:acme:support:greeting', 'pack:acme:support:closing']);

    const rows = await db
      .select()
      .from(promptVersions)
      .where(eq(promptVersions.tenantId, tenantId));
    expect(rows).toHaveLength(2);
    expect(rows[0].packNamespace).toBe('pack:acme:support');
  });

  it('400s on a malformed pack', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const res = await request(app)
      .post('/v1/marketplace/prompt-packs/import')
      .set('Authorization', `Bearer ${token}`)
      .send({ pack: { publisher: 'acme', name: 'x', prompts: [] } });

    expect(res.status).toBe(400);
  });
});

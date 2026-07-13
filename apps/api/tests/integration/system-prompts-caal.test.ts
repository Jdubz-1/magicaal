import request from 'supertest';
import { eq } from 'drizzle-orm';
import * as crypto from 'node:crypto';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { ensurePlatformTenant, PLATFORM_TENANT_ID } from '../../src/platform/bootstrap';
import { db } from '@/db/client';
import {
  promptVersions,
  agents,
  sessions,
  sessionContext,
  syncEvents,
  caalConfiguration,
  packageRegistry,
  assetLicenses,
  tenants,
} from '@/db/schema';

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

// ── system ────────────────────────────────────────────────────────────────────

describe('system routes', () => {
  it('reports engine health, and degrades gracefully when it is unreachable', async () => {
    const { token } = await createUserAndLogin(app, 'developer');

    engineClient.get.mockResolvedValue({ data: { status: 'ok' } });
    const ok = await request(app).get('/v1/system').set('Authorization', `Bearer ${token}`);
    expect(ok.body).toEqual({ api: 'ok', engine: 'ok' });

    engineClient.get.mockRejectedValue(new Error('ECONNREFUSED'));
    const down = await request(app).get('/v1/system').set('Authorization', `Bearer ${token}`);
    expect(down.status).toBe(200); // the API is still up
    expect(down.body.engine).toBe('unreachable');
  });

  it('exposes non-sensitive feature flags', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .get('/v1/system/config')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('marketplaceEnabled');
    expect(res.body).toHaveProperty('marketplaceCatalogSource');
    // no secrets leak through this route
    expect(JSON.stringify(res.body)).not.toContain('secret');
  });

  it('upserts provider pricing, updating an existing row rather than duplicating', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');

    const created = await request(app)
      .post('/v1/system/provider-pricing')
      .set('Authorization', `Bearer ${token}`)
      .send([
        {
          provider: 'openai',
          model: 'gpt-4o',
          promptTokensPerMillion: 5,
          completionTokensPerMillion: 15,
        },
      ]);
    expect(created.status).toBe(200);
    expect(created.body[0].currency).toBe('USD'); // defaulted

    const updated = await request(app)
      .post('/v1/system/provider-pricing')
      .set('Authorization', `Bearer ${token}`)
      .send([
        {
          provider: 'openai',
          model: 'gpt-4o',
          promptTokensPerMillion: 4,
          completionTokensPerMillion: 12,
          currency: 'EUR',
        },
      ]);
    expect(updated.body[0].promptTokensPerMillion).toBe(4);
    expect(updated.body[0].currency).toBe('EUR');

    const list = await request(app)
      .get('/v1/system/provider-pricing')
      .set('Authorization', `Bearer ${token}`);
    const gpt4o = list.body.filter(
      (r: { provider: string; model: string }) => r.provider === 'openai' && r.model === 'gpt-4o',
    );
    expect(gpt4o).toHaveLength(1); // updated in place
  });

  it('400s on an empty pricing payload and 403s for a developer', async () => {
    const admin = await createUserAndLogin(app, 'tenant_admin');
    const bad = await request(app)
      .post('/v1/system/provider-pricing')
      .set('Authorization', `Bearer ${admin.token}`)
      .send([]);
    expect(bad.status).toBe(400);

    const dev = await createUserAndLogin(app, 'developer');
    const forbidden = await request(app)
      .post('/v1/system/provider-pricing')
      .set('Authorization', `Bearer ${dev.token}`)
      .send([{ provider: 'x', model: 'y', promptTokensPerMillion: 1, completionTokensPerMillion: 1 }]);
    expect(forbidden.status).toBe(403);
  });

  it('reports sync events, and null when none have run', async () => {
    const { token } = await createUserAndLogin(app, 'developer');

    const empty = await request(app)
      .get('/v1/system/sync')
      .set('Authorization', `Bearer ${token}`);
    expect(empty.status).toBe(200);

    await db.insert(syncEvents).values({
      id: crypto.randomUUID(),
      trigger: 'boot',
      startedAt: new Date(),
      agentsProcessed: 3,
      changesApplied: 1,
      errorCount: 0,
      createdAt: new Date(),
    });

    const latest = await request(app)
      .get('/v1/system/sync')
      .set('Authorization', `Bearer ${token}`);
    expect(latest.body.agentsProcessed).toBe(3);

    const log = await request(app)
      .get('/v1/system/sync/log?limit=5')
      .set('Authorization', `Bearer ${token}`);
    expect(Array.isArray(log.body)).toBe(true);
    expect(log.body.length).toBeGreaterThan(0);
  });
});

describe('GET /v1/nodes (palette entitlement, ISS-055)', () => {
  const BUILTIN = { type: 'core:start', meta: {}, schema: {} };
  const PKG_NODE = { type: 'acme:premium:node', meta: {}, schema: {}, packageId: 'acme/premium' };

  beforeEach(() => {
    engineClient.get.mockResolvedValue({ data: [BUILTIN, PKG_NODE] });
  });

  async function installFor(tenantId: string, enabled = true, status: 'active' | 'expired' = 'active') {
    const pkgId = crypto.randomUUID();
    await db.insert(packageRegistry).values({
      id: pkgId,
      tenantId,
      name: 'premium',
      version: '1.0.0',
      publisher: 'acme',
      packageType: 'nodes',
      manifestJson: '{}',
      installedAt: new Date(),
      enabled,
      signatureStatus: 'verified',
    });
    await db.insert(assetLicenses).values({
      id: crypto.randomUUID(),
      packageId: pkgId,
      licenseType: 'paid',
      status,
    });
  }

  it('shows built-ins to everyone but hides unentitled package nodes', async () => {
    const { token } = await createUserAndLogin(app, 'developer');

    const res = await request(app).get('/v1/nodes').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.map((n: { type: string }) => n.type)).toEqual(['core:start']);
  });

  it('shows a package node to the tenant that installed it', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    await installFor(tenantId);

    const res = await request(app).get('/v1/nodes').set('Authorization', `Bearer ${token}`);

    expect(res.body.map((n: { type: string }) => n.type)).toEqual([
      'core:start',
      'acme:premium:node',
    ]);
  });

  it('hides a package whose license expired, and one that is disabled', async () => {
    const expired = await createUserAndLogin(app, 'developer');
    await installFor(expired.tenantId, true, 'expired');

    const disabled = await createUserAndLogin(app, 'developer');
    await installFor(disabled.tenantId, false, 'active');

    for (const auth of [expired, disabled]) {
      const res = await request(app).get('/v1/nodes').set('Authorization', `Bearer ${auth.token}`);
      expect(res.body.map((n: { type: string }) => n.type)).toEqual(['core:start']);
    }
  });
});

// ── prompts ───────────────────────────────────────────────────────────────────

describe('prompt versions', () => {
  it('versions increment per name and only the promoted one is active', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');

    const v1 = await request(app)
      .post('/v1/prompts')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'greeting', content: 'Hello' });
    expect(v1.status).toBe(201);
    expect(v1.body.versionNumber).toBe(1);
    expect(v1.body.isActive).toBe(false);

    const v2 = await request(app)
      .post('/v1/prompts')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'greeting', content: 'Hi there' });
    expect(v2.body.versionNumber).toBe(2);

    // nothing is active until promoted
    const before = await request(app).get('/v1/prompts').set('Authorization', `Bearer ${token}`);
    expect(before.body).toHaveLength(0);

    const promote = await request(app)
      .post(`/v1/prompts/greeting/versions/${v2.body.id}/promote`)
      .set('Authorization', `Bearer ${token}`);
    expect(promote.status).toBe(200);

    const active = await request(app).get('/v1/prompts').set('Authorization', `Bearer ${token}`);
    expect(active.body).toHaveLength(1);
    expect(active.body[0].id).toBe(v2.body.id);

    // promoting v1 demotes v2 — exactly one active version per name
    await request(app)
      .post(`/v1/prompts/greeting/versions/${v1.body.id}/promote`)
      .set('Authorization', `Bearer ${token}`);

    const rows = await db
      .select()
      .from(promptVersions)
      .where(eq(promptVersions.tenantId, tenantId));
    expect(rows.filter((r) => r.isActive)).toHaveLength(1);
    expect(rows.find((r) => r.isActive)!.id).toBe(v1.body.id);
  });

  it('lists versions for a name in order', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    await request(app)
      .post('/v1/prompts')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'p', content: 'one' });
    await request(app)
      .post('/v1/prompts')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'p', content: 'two' });

    const res = await request(app)
      .get('/v1/prompts/p/versions')
      .set('Authorization', `Bearer ${token}`);
    expect(res.body.map((r: { versionNumber: number }) => r.versionNumber)).toEqual([1, 2]);
  });

  it('diffs two versions, and against nothing when compareWith is omitted', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const a = await request(app)
      .post('/v1/prompts')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'd', content: 'old' });
    const b = await request(app)
      .post('/v1/prompts')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'd', content: 'new' });

    const pair = await request(app)
      .get(`/v1/prompts/d/versions/${b.body.id}/diff?compareWith=${a.body.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(pair.status).toBe(200);
    expect(pair.body.version1.content).toBe('new');
    expect(pair.body.version2.content).toBe('old');

    const solo = await request(app)
      .get(`/v1/prompts/d/versions/${b.body.id}/diff`)
      .set('Authorization', `Bearer ${token}`);
    expect(solo.body.version2).toBeNull();
  });

  it('400s without name or content; 404s on unknown versions', async () => {
    const { token } = await createUserAndLogin(app, 'developer');

    const bad = await request(app)
      .post('/v1/prompts')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'only-name' });
    expect(bad.status).toBe(400);

    const promote = await request(app)
      .post('/v1/prompts/x/versions/ghost/promote')
      .set('Authorization', `Bearer ${token}`);
    expect(promote.status).toBe(404);

    const diff = await request(app)
      .get('/v1/prompts/x/versions/ghost/diff')
      .set('Authorization', `Bearer ${token}`);
    expect(diff.status).toBe(404);
  });
});

// ── caal ──────────────────────────────────────────────────────────────────────

describe('Caal configuration', () => {
  it('returns null before configuration, then inserts and updates in place', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');

    const empty = await request(app)
      .get('/v1/caal/config')
      .set('Authorization', `Bearer ${token}`);
    expect(empty.status).toBe(200);
    expect(empty.body).toBeNull();

    const created = await request(app)
      .patch('/v1/caal/config')
      .set('Authorization', `Bearer ${token}`)
      .send({ modelOverride: 'claude-opus-4-8' });
    expect(created.status).toBe(200);
    // unspecified fields take their defaults
    expect(created.body.enabled).toBe(true);
    expect(created.body.generationMode).toBe('complete');
    expect(created.body.confirmationMode).toBe('confirm_structural');
    expect(created.body.modelOverride).toBe('claude-opus-4-8');

    const updated = await request(app)
      .patch('/v1/caal/config')
      .set('Authorization', `Bearer ${token}`)
      .send({
        enabled: false,
        showReasoning: true,
        generationMode: 'skeleton',
        preferredConnections: { slack: 'conn-1' },
        allowedOperations: ['read', 'suggest'],
      });
    expect(updated.body.enabled).toBe(false);
    expect(updated.body.showReasoning).toBe(true);
    expect(updated.body.generationMode).toBe('skeleton');
    // the earlier field survives the partial update
    expect(updated.body.modelOverride).toBe('claude-opus-4-8');
    expect(JSON.parse(updated.body.preferredConnections)).toEqual({ slack: 'conn-1' });
    expect(JSON.parse(updated.body.allowedOperations)).toEqual(['read', 'suggest']);

    // exactly one row per tenant
    const rows = await db
      .select()
      .from(caalConfiguration)
      .where(eq(caalConfiguration.tenantId, tenantId));
    expect(rows).toHaveLength(1);
  });

  it('refuses a developer changing the config', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .patch('/v1/caal/config')
      .set('Authorization', `Bearer ${token}`)
      .send({ enabled: false });
    expect(res.status).toBe(403);
  });
});

describe('Caal invocation', () => {
  it('400s without a message', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .post('/v1/caal/invoke')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(res.status).toBe(400);
  });

  it('503s when the platform Caal agent has not been deployed', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .post('/v1/caal/invoke')
      .set('Authorization', `Bearer ${token}`)
      .send({ message: 'explain this graph' });
    expect(res.status).toBe(503);
  });

  it('dispatches to the platform agent under a user-scoped session and returns the output', async () => {
    const { token, tenantId, userId } = await createUserAndLogin(app, 'developer');

    await ensurePlatformTenant();
    const caalAgentId = crypto.randomUUID();
    await db.insert(agents).values({
      id: caalAgentId,
      tenantId: PLATFORM_TENANT_ID,
      name: 'Caal',
      handle: 'caal-assistant',
      status: 'active',
      authoringMode: 'code-defined',
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    engineClient.post.mockResolvedValue({ data: { runId: 'caal-run' } });
    engineClient.get.mockResolvedValue({
      data: { status: 'completed', output: { reply: 'It starts at core:start.' } },
    });

    const res = await request(app)
      .post('/v1/caal/invoke')
      .set('Authorization', `Bearer ${token}`)
      .send({ message: 'explain', agentId: 'agent-7' });

    expect(res.status).toBe(200);
    expect(res.body.output.reply).toContain('core:start');

    const [, body] = engineClient.post.mock.calls[0];
    expect(body.agentId).toBe(caalAgentId);
    expect(body.tenantId).toBe(PLATFORM_TENANT_ID);
    // the session is namespaced per invoking tenant + user + target agent
    expect(body.sessionId).toBe(
      `_platform:caal-assistant:${tenantId}:${userId}:agent-7`,
    );
    // the caller's real identity travels as input, not as the run tenant
    expect(body.input._invokerTenantId).toBe(tenantId);
  }, 20_000);

  it('surfaces a failed Caal run as a 500', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    await ensurePlatformTenant();

    engineClient.post.mockResolvedValue({ data: { runId: 'caal-bad' } });
    engineClient.get.mockResolvedValue({ data: { status: 'failed', error: { message: 'boom' } } });

    const res = await request(app)
      .post('/v1/caal/invoke')
      .set('Authorization', `Bearer ${token}`)
      .send({ message: 'x' });

    expect(res.status).toBe(500);
  }, 20_000);

  it('returns an empty history for a session that does not exist yet', async () => {
    const { token } = await createUserAndLogin(app, 'developer');

    const res = await request(app)
      .get('/v1/caal/sessions/agent-1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.messages).toEqual([]);
    expect(res.body.proposalHistory).toEqual([]);
  });

  it('returns the stored conversation for an existing Caal session', async () => {
    const { token, tenantId, userId } = await createUserAndLogin(app, 'developer');
    const sessionId = `_platform:caal-assistant:${tenantId}:${userId}:agent-9`;

    await ensurePlatformTenant();

    const caalAgentId = crypto.randomUUID();
    await db.insert(agents).values({
      id: caalAgentId,
      tenantId: PLATFORM_TENANT_ID,
      name: 'Caal',
      handle: `caal-hist-${Date.now()}`,
      status: 'active',
      authoringMode: 'code-defined',
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await db.insert(sessions).values({
      id: sessionId,
      agentId: caalAgentId,
      tenantId: PLATFORM_TENANT_ID,
      schemaVersion: 1,
      status: 'active',
      lastActiveAt: new Date(),
      expiresAt: new Date(Date.now() + 3_600_000),
      createdAt: new Date(),
    });
    await db.insert(sessionContext).values({
      id: crypto.randomUUID(),
      sessionId,
      key: 'messages',
      valueJson: JSON.stringify([{ role: 'user', content: 'hi' }]),
      accumulatedCount: 1,
      accumulationType: 'append',
      schemaVersion: 1,
      updatedAt: new Date(),
    });

    const res = await request(app)
      .get('/v1/caal/sessions/agent-9')
      .set('Authorization', `Bearer ${token}`);

    expect(res.body.messages).toEqual([{ role: 'user', content: 'hi' }]);
    expect(res.body.lastProposal).toBeNull();
  });
});

// ── platform bootstrap ────────────────────────────────────────────────────────

describe('ensurePlatformTenant', () => {
  it('creates the _platform tenant and its Caal config, and is idempotent', async () => {
    await ensurePlatformTenant();
    await ensurePlatformTenant(); // second call must not duplicate

    const t = await db.select().from(tenants).where(eq(tenants.id, PLATFORM_TENANT_ID));
    expect(t).toHaveLength(1);

    const cfg = await db
      .select()
      .from(caalConfiguration)
      .where(eq(caalConfiguration.tenantId, PLATFORM_TENANT_ID));
    expect(cfg).toHaveLength(1);
    expect(cfg[0].enabled).toBe(true);
  });
});

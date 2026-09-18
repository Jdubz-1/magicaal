import Database from 'better-sqlite3';
import type { AgentGraphDefinition, ModelRouterConfig } from '@magicaal/core';
import { createPrimaryDb, seedTenant } from '../../helpers/primary-db';

const dbFile = createPrimaryDb();
const MASTER_KEY = 'unit-test-master-key';

jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

jest.mock('@/config', () => {
  const actual = jest.requireActual('@/config') as { config: Record<string, unknown> };
  return { config: { ...actual.config, databasePath: `file:${dbFile}`, masterKey: MASTER_KEY } };
});

import { resolveCredentials, encryptCredentials } from '@/resolver/credential-resolver';
import { ExecutionContextImpl } from '@/execution/context';

const PLATFORM = '_platform';
const TENANT_A = 'tenant-a';
const TENANT_B = 'tenant-b';
/** Referenced by the graph's own node config. */
const GRAPH_CONNECTION = 'conn-graph';
/** Referenced only by a per-dispatch router override (Caal's shape). */
const OVERRIDE_CONNECTION = 'conn-override';
const API_KEY = 'sk-tenant-a-key';

function router(connectionId: string): ModelRouterConfig {
  return {
    strategy: 'priority',
    targets: [{ id: 'primary', connectionId, provider: 'anthropic', model: 'claude-sonnet-5' }],
    triggers: [],
  };
}

function graphWith(nodeConfig: Record<string, unknown>): AgentGraphDefinition {
  return {
    version: '1.0',
    name: 'cred-test',
    entry: 'llm',
    nodes: { llm: { id: 'llm', type: 'core:llm-call', config: nodeConfig } },
    edges: [],
    toolEdges: [],
    workspaceEdges: [],
    config: { trigger: { type: 'rest', mode: 'async' } },
  } as unknown as AgentGraphDefinition;
}

/** Caal's shape: the graph declares no router at all. */
const graphWithoutRouter = (): AgentGraphDefinition => graphWith({ outputKey: 'reply' });

function ctxFor(
  tenantId: string,
  opts: { credentialTenantId?: string; runRouterOverride?: ModelRouterConfig } = {},
): ExecutionContextImpl {
  return new ExecutionContextImpl({
    runId: 'run-1',
    agentId: 'agent-1',
    tenantId,
    triggerType: 'caal',
    input: {},
    credentialTenantId: opts.credentialTenantId ?? null,
    runRouterOverride: opts.runRouterOverride ?? null,
  });
}

beforeAll(() => {
  const db = new Database(dbFile);
  seedTenant(db, TENANT_A);
  seedTenant(db, TENANT_B);
  const now = Math.floor(Date.now() / 1000);
  const insert = db.prepare(
    `INSERT INTO integration_connections
       (id, tenant_id, service, display_name, auth_type, credentials_enc, status, created_at, updated_at)
     VALUES (?, ?, 'anthropic', 'Anthropic', 'api_key', ?, 'active', ?, ?)`,
  );
  for (const id of [GRAPH_CONNECTION, OVERRIDE_CONNECTION]) {
    insert.run(id, TENANT_A, encryptCredentials(JSON.stringify({ api_key: API_KEY }), MASTER_KEY), now, now);
  }
  db.close();
});

describe('credential collection across router levels', () => {
  it('resolves a connection named only by a per-dispatch router override', async () => {
    // The Caal path: nothing in the compiled graph references the connection,
    // so collecting graph routers alone leaves the credential map empty and
    // every target is skipped as uncredentialed.
    const ctx = ctxFor(PLATFORM, {
      credentialTenantId: TENANT_A,
      runRouterOverride: router(OVERRIDE_CONNECTION),
    });

    await resolveCredentials(graphWithoutRouter(), ctx);

    expect(ctx.credentials[OVERRIDE_CONNECTION]).toMatchObject({ type: 'apikey', apiKey: API_KEY });
  });

  it('resolves graph and override connections together', async () => {
    const ctx = ctxFor(TENANT_A, { runRouterOverride: router(OVERRIDE_CONNECTION) });

    await resolveCredentials(graphWith({ router: router(GRAPH_CONNECTION) }), ctx);

    expect(ctx.credentials[GRAPH_CONNECTION]).toMatchObject({ apiKey: API_KEY });
    expect(ctx.credentials[OVERRIDE_CONNECTION]).toMatchObject({ apiKey: API_KEY });
  });

  it("resolves a connection named by the graph's own node config", async () => {
    const ctx = ctxFor(TENANT_A);

    await resolveCredentials(graphWith({ router: router(GRAPH_CONNECTION) }), ctx);

    expect(ctx.credentials[GRAPH_CONNECTION]).toMatchObject({ apiKey: API_KEY });
  });
});

describe('credential tenant (platform agents)', () => {
  it("resolves the invoking tenant's connection for a platform-tenant run", async () => {
    const ctx = ctxFor(PLATFORM, { credentialTenantId: TENANT_A });

    await resolveCredentials(graphWith({ router: router(GRAPH_CONNECTION) }), ctx);

    expect(ctx.credentials[GRAPH_CONNECTION]).toMatchObject({ type: 'apikey', apiKey: API_KEY });
  });

  it('resolves nothing for a platform run with no credential tenant', async () => {
    const ctx = ctxFor(PLATFORM);

    await resolveCredentials(graphWith({ router: router(GRAPH_CONNECTION) }), ctx);

    expect(ctx.credentials[GRAPH_CONNECTION]).toBeUndefined();
  });

  it("ignores credentialTenantId on an ordinary tenant's run", async () => {
    // The guard that keeps this from becoming a cross-tenant credential read:
    // only platform-tenant runs may name a different credential tenant.
    const ctx = ctxFor(TENANT_B, { credentialTenantId: TENANT_A });

    await resolveCredentials(graphWith({ router: router(GRAPH_CONNECTION) }), ctx);

    expect(ctx.credentials[GRAPH_CONNECTION]).toBeUndefined();
  });

  it('ignores credentialTenantId on an ordinary run reached via an override', async () => {
    const ctx = ctxFor(TENANT_B, {
      credentialTenantId: TENANT_A,
      runRouterOverride: router(OVERRIDE_CONNECTION),
    });

    await resolveCredentials(graphWithoutRouter(), ctx);

    expect(ctx.credentials[OVERRIDE_CONNECTION]).toBeUndefined();
  });

  it("resolves its own tenant's connection with no credential tenant set", async () => {
    const ctx = ctxFor(TENANT_A);

    await resolveCredentials(graphWith({ router: router(GRAPH_CONNECTION) }), ctx);

    expect(ctx.credentials[GRAPH_CONNECTION]).toMatchObject({ apiKey: API_KEY });
  });
});

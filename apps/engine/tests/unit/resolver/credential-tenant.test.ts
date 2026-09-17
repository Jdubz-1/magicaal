import Database from 'better-sqlite3';
import type { AgentGraphDefinition } from '@magicaal/core';
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
const CONNECTION_ID = 'conn-a';
const API_KEY = 'sk-tenant-a-key';

/** Graph whose single LLM node routes through TENANT_A's connection. */
function graphUsing(connectionId: string): AgentGraphDefinition {
  return {
    version: '1.0',
    name: 'cred-test',
    entry: 'llm',
    nodes: {
      llm: {
        id: 'llm',
        type: 'core:llm-call',
        config: {
          router: {
            strategy: 'priority',
            targets: [{ id: 'primary', connectionId, provider: 'anthropic', model: 'claude-sonnet-5' }],
            triggers: [],
          },
        },
      },
    },
    edges: [],
    toolEdges: [],
    workspaceEdges: [],
    config: { trigger: { type: 'rest', mode: 'async' } },
  } as unknown as AgentGraphDefinition;
}

function ctxFor(tenantId: string, credentialTenantId?: string): ExecutionContextImpl {
  return new ExecutionContextImpl({
    runId: 'run-1',
    agentId: 'agent-1',
    tenantId,
    triggerType: 'caal',
    input: {},
    credentialTenantId: credentialTenantId ?? null,
  });
}

beforeAll(() => {
  const db = new Database(dbFile);
  seedTenant(db, TENANT_A);
  seedTenant(db, TENANT_B);
  const now = Math.floor(Date.now() / 1000);
  db.prepare(
    `INSERT INTO integration_connections
       (id, tenant_id, service, display_name, auth_type, credentials_enc, status, created_at, updated_at)
     VALUES (?, ?, 'anthropic', 'Anthropic', 'api_key', ?, 'active', ?, ?)`,
  ).run(CONNECTION_ID, TENANT_A, encryptCredentials(JSON.stringify({ api_key: API_KEY }), MASTER_KEY), now, now);
  db.close();
});

describe('credential resolution tenant (platform agents)', () => {
  it("resolves the invoking tenant's connection for a platform-tenant run", async () => {
    const ctx = ctxFor(PLATFORM, TENANT_A);

    await resolveCredentials(graphUsing(CONNECTION_ID), ctx);

    expect(ctx.credentials[CONNECTION_ID]).toMatchObject({ type: 'apikey', apiKey: API_KEY });
  });

  it('resolves nothing for a platform run with no credential tenant', async () => {
    const ctx = ctxFor(PLATFORM);

    await resolveCredentials(graphUsing(CONNECTION_ID), ctx);

    expect(ctx.credentials[CONNECTION_ID]).toBeUndefined();
  });

  it("ignores credentialTenantId on an ordinary tenant's run", async () => {
    // The guard that keeps this from becoming a cross-tenant credential read:
    // only platform-tenant runs may name a different credential tenant.
    const ctx = ctxFor(TENANT_B, TENANT_A);

    await resolveCredentials(graphUsing(CONNECTION_ID), ctx);

    expect(ctx.credentials[CONNECTION_ID]).toBeUndefined();
  });

  it("resolves its own tenant's connection with no credential tenant set", async () => {
    const ctx = ctxFor(TENANT_A);

    await resolveCredentials(graphUsing(CONNECTION_ID), ctx);

    expect(ctx.credentials[CONNECTION_ID]).toMatchObject({ apiKey: API_KEY });
  });
});

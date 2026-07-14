import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import Database from 'better-sqlite3';
import type { Request, Response, NextFunction } from 'express';

jest.mock('@/db/telemetry-client', () => ({
  telemetryDb: {
    insert: jest.fn().mockReturnValue({ values: jest.fn().mockResolvedValue(undefined) }),
  },
}));

jest.mock('@/queue/client', () => ({
  redis: {},
  runTriggerQueue: { add: jest.fn().mockResolvedValue(undefined) },
  runScheduledQueue: { add: jest.fn().mockResolvedValue(undefined) },
  runRetryQueue: { add: jest.fn().mockResolvedValue(undefined) },
}));

const MINIMAL_GRAPH = JSON.stringify({
  version: '1.0',
  name: 'Tenant A Agent',
  entry: 'start',
  nodes: {
    start: { id: 'start', type: 'core:start', config: {} },
    end: { id: 'end', type: 'core:end', config: {} },
  },
  edges: [{ id: 'e1', from: 'start', to: 'end', type: 'unconditional' }],
  toolEdges: [],
  workspaceEdges: [],
  config: { trigger: { type: 'rest', mode: 'async' } },
});

let tmpDir: string;
let graphLoader: typeof import('@/graph/graph-loader').graphLoader;
let assertAgentInTenant: typeof import('@/graph/graph-loader').assertAgentInTenant;
let dispatchRun: typeof import('@/controllers/runs.controller').dispatchRun;

beforeAll(async () => {
  tmpDir = mkdtempSync(join(tmpdir(), 'magicaal-tenant-iso-'));
  const dbPath = join(tmpDir, 'primary.db');

  const db = new Database(dbPath);
  // Production DBs are WAL (set by the API at creation); the engine's readonly
  // handles re-issue the pragma, which only succeeds if the file already is.
  db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE agents (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      status TEXT NOT NULL,
      enabled INTEGER NOT NULL,
      current_version_id TEXT
    );
    CREATE TABLE agent_versions (id TEXT PRIMARY KEY, graph_json TEXT NOT NULL);
  `);
  db.prepare("INSERT INTO agent_versions (id, graph_json) VALUES ('v-a', ?)").run(MINIMAL_GRAPH);
  db.prepare(
    "INSERT INTO agents (id, tenant_id, status, enabled, current_version_id) VALUES ('agent-a', 'tenant-a', 'active', 1, 'v-a')",
  ).run();
  db.close();

  // The engine config reads DATABASE_URL at first import — set it before any
  // src module is loaded (this file has no top-level src imports).
  process.env.DATABASE_URL = dbPath;

  ({ graphLoader, assertAgentInTenant } = await import('@/graph/graph-loader'));
  ({ dispatchRun } = await import('@/controllers/runs.controller'));
});

afterAll(() => {
  rmSync(tmpDir, { recursive: true, force: true });
});

describe('assertAgentInTenant (ALIGN-006)', () => {
  it('passes when the agent belongs to the tenant', () => {
    expect(() => assertAgentInTenant('agent-a', 'tenant-a')).not.toThrow();
  });

  it('throws 404 for another tenant and for unknown agents', () => {
    expect(() => assertAgentInTenant('agent-a', 'tenant-b')).toThrow(
      expect.objectContaining({ status: 404, code: 'AGENT_NOT_FOUND' }),
    );
    expect(() => assertAgentInTenant('nope', 'tenant-a')).toThrow(
      expect.objectContaining({ status: 404, code: 'AGENT_NOT_FOUND' }),
    );
  });
});

describe('graphLoader tenant scoping (ALIGN-006)', () => {
  it('loads a graph for the owning tenant', async () => {
    const graph = await graphLoader.load('agent-a', 'tenant-a');
    expect(graph.name).toBe('Tenant A Agent');
  });

  it('rejects a cross-tenant load — including on a warm cache', async () => {
    // agent-a is now cached from the previous test; the cache hit must not
    // leak it to another tenant.
    await expect(graphLoader.load('agent-a', 'tenant-b')).rejects.toMatchObject({
      status: 404,
      code: 'AGENT_NOT_FOUND',
    });
  });
});

describe('dispatchRun tenant check (ALIGN-006)', () => {
  function mockRes() {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    return res as Response & { status: jest.Mock; json: jest.Mock };
  }

  async function dispatch(agentId: string, tenantId: string) {
    const req = {
      body: { agentId, tenantId, input: {}, caller: { kind: 'platform', strategy: 'sub-graph' } },
    } as unknown as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction & jest.Mock;
    await dispatchRun(req, res, next);
    return { res, next };
  }

  it('dispatches when the agent belongs to the tenant', async () => {
    const { res, next } = await dispatch('agent-a', 'tenant-a');
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(202);
  });

  it('rejects a cross-tenant dispatch with 404', async () => {
    const { res, next } = await dispatch('agent-a', 'tenant-b');
    expect(res.status).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ status: 404, code: 'AGENT_NOT_FOUND' }),
    );
  });
});

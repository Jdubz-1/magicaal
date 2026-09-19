import type { NodeModule } from '@magicaal/sdk-node';
import * as https from 'node:https';
import * as http from 'node:http';

function httpGet(url: string, headers: Record<string, string>): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const lib = parsed.protocol === 'https:' ? https : http;
    const req = lib.get(
      { hostname: parsed.hostname, port: parsed.port, path: parsed.pathname + parsed.search, headers },
      (res) => {
        let body = '';
        res.on('data', (chunk: string) => { body += chunk; });
        res.on('end', () => {
          const status = res.statusCode ?? 0;
          // Status was ignored before, so an error page resolved as data and
          // the model was handed {"error":"..."} as if it were a result.
          if (status < 200 || status >= 300) {
            reject(new Error(`${url} responded ${status}: ${body.slice(0, 200)}`));
            return;
          }
          try { resolve(JSON.parse(body)); } catch { resolve(body); }
        });
      },
    );
    req.on('error', (err: NodeJS.ErrnoException) => {
      // A failed local connect arrives as an AggregateError whose own message
      // is empty (both ::1 and 127.0.0.1 refused), which logged as nothing at
      // all — name the cause explicitly.
      const cause = err.code ?? (err as { errors?: Array<{ code?: string }> }).errors?.[0]?.code;
      reject(new Error(`${url} unreachable${cause ? `: ${cause}` : ''}`));
    });
    req.setTimeout(10000, () => { req.destroy(new Error(`${url} timed out`)); });
  });
}

function getApiBase(ctx: { get<T>(key: string): T | undefined }): string {
  // The engine seeds _caal_api_base from its own config; the env var and the
  // localhost default are fallbacks for running a tool outside a run.
  return (ctx.get<string>('_caal_api_base') ?? process.env['API_BASE_URL'] ?? 'http://localhost:3000');
}

function getInternalToken(ctx: { get<T>(key: string): T | undefined }): string {
  return ctx.get<string>('_caal_master_key') ?? process.env['MAGICAAL_MASTER_KEY'] ?? '';
}

function getTenantId(ctx: { get<T>(key: string): T | undefined }): string {
  // A Caal run executes as the _platform tenant, so the run's own tenantId is
  // not the one whose nodes, agents and connections Caal is reasoning about.
  // The engine seeds _caal_tenant_id with the invoking tenant; _invokerTenantId
  // is the same value carried in the run input.
  return (
    ctx.get<string>('_caal_tenant_id') ??
    ctx.get<string>('_invokerTenantId') ??
    ctx.get<string>('tenantId') ??
    ''
  );
}

export const platformListNodeTypes: NodeModule = {
  type: 'caal.platform.listNodeTypes',
  meta: { name: 'List Node Types', description: 'List all available node types and their categories', category: 'integration', version: '0.1.0' },
  schema: {
    // Takes no arguments — providers reject a schema with no declared type.
    config: { type: 'object', properties: {} },
    input: {},
    output: {
      type: 'object',
      properties: {
        nodeTypes: { type: 'array', description: 'Available node type descriptors' },
      },
    },
  },
  async execute(ctx, _config) {
    const base = getApiBase(ctx);
    const token = getInternalToken(ctx);
    const tenantId = getTenantId(ctx);
    const data = await httpGet(`${base}/internal/caal/nodes`, {
      'X-Internal-Auth': token,
      'X-Tenant-Id': tenantId,
    });
    return { status: 'complete', outputs: { nodeTypes: data } };
  },
};

export const platformGetNodeSchema: NodeModule = {
  type: 'caal.platform.getNodeSchema',
  meta: { name: 'Get Node Schema', description: 'Get the full config/input/output schema for a node type', category: 'integration', version: '0.1.0' },
  schema: {
    config: {
      type: 'object',
      properties: {
        nodeType: { type: 'string', description: 'Node type identifier, e.g. core:llm-call' },
      },
      required: ['nodeType'],
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        schema: { type: 'object', description: 'Node schema definition' },
      },
    },
  },
  async execute(ctx, config) {
    const cfg = config as { nodeType: string };
    const base = getApiBase(ctx);
    const token = getInternalToken(ctx);
    const tenantId = getTenantId(ctx);
    const encoded = encodeURIComponent(cfg.nodeType);
    const data = await httpGet(`${base}/internal/caal/nodes/${encoded}`, {
      'X-Internal-Auth': token,
      'X-Tenant-Id': tenantId,
    });
    return { status: 'complete', outputs: { schema: data } };
  },
};

export const platformListConnections: NodeModule = {
  type: 'caal.platform.listConnections',
  meta: { name: 'List Connections', description: 'List all active integration connections for the tenant', category: 'integration', version: '0.1.0' },
  schema: {
    // Takes no arguments — providers reject a schema with no declared type.
    config: { type: 'object', properties: {} },
    input: {},
    output: {
      type: 'object',
      properties: {
        connections: { type: 'array', description: 'Active integration connections' },
      },
    },
  },
  async execute(ctx, _config) {
    const base = getApiBase(ctx);
    const token = getInternalToken(ctx);
    const tenantId = getTenantId(ctx);
    const data = await httpGet(`${base}/internal/caal/connections`, {
      'X-Internal-Auth': token,
      'X-Tenant-Id': tenantId,
    });
    return { status: 'complete', outputs: { connections: data } };
  },
};

export const platformListAgents: NodeModule = {
  type: 'caal.platform.listAgents',
  meta: { name: 'List Agents', description: 'List all agents in the tenant', category: 'integration', version: '0.1.0' },
  schema: {
    // Takes no arguments — providers reject a schema with no declared type.
    config: { type: 'object', properties: {} },
    input: {},
    output: {
      type: 'object',
      properties: {
        agents: { type: 'array', description: 'Agent summaries for the tenant' },
      },
    },
  },
  async execute(ctx, _config) {
    const base = getApiBase(ctx);
    const token = getInternalToken(ctx);
    const tenantId = getTenantId(ctx);
    const data = await httpGet(`${base}/internal/caal/agents`, {
      'X-Internal-Auth': token,
      'X-Tenant-Id': tenantId,
    });
    return { status: 'complete', outputs: { agents: data } };
  },
};

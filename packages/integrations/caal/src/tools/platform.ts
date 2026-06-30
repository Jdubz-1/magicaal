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
          try { resolve(JSON.parse(body)); } catch { resolve(body); }
        });
      },
    );
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(new Error('timeout')); });
  });
}

function getApiBase(ctx: { get<T>(key: string): T | undefined }): string {
  return (ctx.get<string>('_caal_api_base') ?? process.env['API_BASE_URL'] ?? 'http://localhost:3000');
}

function getInternalToken(ctx: { get<T>(key: string): T | undefined }): string {
  return ctx.get<string>('_caal_master_key') ?? process.env['MAGICAAL_MASTER_KEY'] ?? '';
}

function getTenantId(ctx: { get<T>(key: string): T | undefined }): string {
  return ctx.get<string>('tenantId') ?? '';
}

export const platformListNodeTypes: NodeModule = {
  type: 'caal.platform.listNodeTypes',
  meta: { name: 'List Node Types', description: 'List all available node types and their categories', category: 'integration', version: '0.1.0' },
  schema: {
    config: {},
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
    const data = await httpGet(`${base}/v1/nodes`, {
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
    const data = await httpGet(`${base}/v1/nodes/${encoded}`, {
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
    config: {},
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
    const data = await httpGet(`${base}/v1/integrations/connections`, {
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
    config: {},
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
    const data = await httpGet(`${base}/v1/agents`, {
      'X-Internal-Auth': token,
      'X-Tenant-Id': tenantId,
    });
    return { status: 'complete', outputs: { agents: data } };
  },
};

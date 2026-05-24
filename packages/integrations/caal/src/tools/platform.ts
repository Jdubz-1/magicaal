import type { NodeModule } from '@magicaal/sdk-node';

export const platformListNodeTypes: NodeModule = {
  type: 'caal.platform.listNodeTypes',
  meta: { name: 'List Node Types', description: 'List all available node types and their categories', category: 'integration', version: '0.1.0' },
  schema: { config: {}, input: {}, output: {} },
  async execute() { throw new Error('Not implemented'); },
};

export const platformGetNodeSchema: NodeModule = {
  type: 'caal.platform.getNodeSchema',
  meta: { name: 'Get Node Schema', description: 'Get the full config/input/output schema for a node type', category: 'integration', version: '0.1.0' },
  schema: { config: {}, input: {}, output: {} },
  async execute() { throw new Error('Not implemented'); },
};

export const platformListConnections: NodeModule = {
  type: 'caal.platform.listConnections',
  meta: { name: 'List Connections', description: 'List all active integration connections for the tenant', category: 'integration', version: '0.1.0' },
  schema: { config: {}, input: {}, output: {} },
  async execute() { throw new Error('Not implemented'); },
};

export const platformListAgents: NodeModule = {
  type: 'caal.platform.listAgents',
  meta: { name: 'List Agents', description: 'List all agents in the tenant', category: 'integration', version: '0.1.0' },
  schema: { config: {}, input: {}, output: {} },
  async execute() { throw new Error('Not implemented'); },
};

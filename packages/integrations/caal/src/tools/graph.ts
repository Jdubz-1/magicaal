import type { NodeModule } from '@magicaal/sdk-node';

export const graphRead: NodeModule = {
  type: 'caal.graph.read',
  meta: { name: 'Read Graph', description: 'Read the full agent graph definition', category: 'integration', version: '0.1.0' },
  schema: {
    config: {},
    input: {},
    output: {
      type: 'object',
      properties: {
        graphState: { type: 'object', description: 'Full AgentGraphDefinition' },
      },
    },
  },
  async execute(ctx, _config) {
    const graphState = ctx.get('graphState');
    return { graphState: graphState ?? null };
  },
};

export const graphGetNode: NodeModule = {
  type: 'caal.graph.getNode',
  meta: { name: 'Get Node', description: 'Get details of a specific node', category: 'integration', version: '0.1.0' },
  schema: {
    config: {
      type: 'object',
      properties: {
        nodeId: { type: 'string', description: 'ID of the node to retrieve' },
      },
      required: ['nodeId'],
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        node: { type: 'object', description: 'Node definition or null if not found' },
      },
    },
  },
  async execute(ctx, config) {
    const cfg = config as { nodeId: string };
    const graphState = ctx.get<{ nodes: Record<string, unknown> }>('graphState');
    const node = graphState?.nodes?.[cfg.nodeId] ?? null;
    return { node };
  },
};

export const graphGetSelectedNodes: NodeModule = {
  type: 'caal.graph.getSelectedNodes',
  meta: { name: 'Get Selected Nodes', description: 'Get details of the currently selected nodes', category: 'integration', version: '0.1.0' },
  schema: {
    config: {},
    input: {},
    output: {
      type: 'object',
      properties: {
        nodes: { type: 'array', description: 'Array of selected node definitions' },
      },
    },
  },
  async execute(ctx, _config) {
    const selectedNodeIds = ctx.get<string[]>('selectedNodeIds') ?? [];
    const graphState = ctx.get<{ nodes: Record<string, unknown> }>('graphState');
    const nodes = selectedNodeIds.map((id) => graphState?.nodes?.[id]).filter(Boolean);
    return { nodes };
  },
};

export const graphSummarize: NodeModule = {
  type: 'caal.graph.summarize',
  meta: { name: 'Summarize Graph', description: 'Get a high-level summary of the agent graph', category: 'integration', version: '0.1.0' },
  schema: {
    config: {},
    input: {},
    output: {
      type: 'object',
      properties: {
        summary: { type: 'string', description: 'Human-readable graph summary' },
        nodeCount: { type: 'number' },
        edgeCount: { type: 'number' },
        nodesByType: { type: 'object' },
      },
    },
  },
  async execute(ctx, _config) {
    const graphState = ctx.get<{
      nodes: Record<string, { type: string }>;
      edges: unknown[];
    }>('graphState');

    if (!graphState) {
      return { summary: 'No graph state available.', nodeCount: 0, edgeCount: 0, nodesByType: {} };
    }

    const nodesByType: Record<string, number> = {};
    for (const node of Object.values(graphState.nodes ?? {})) {
      nodesByType[node.type] = (nodesByType[node.type] ?? 0) + 1;
    }
    const nodeCount = Object.keys(graphState.nodes ?? {}).length;
    const edgeCount = (graphState.edges ?? []).length;

    const typeSummary = Object.entries(nodesByType)
      .map(([t, c]) => `${c}x ${t}`)
      .join(', ');
    const summary = `Graph has ${nodeCount} node(s) [${typeSummary}] and ${edgeCount} edge(s).`;

    return { summary, nodeCount, edgeCount, nodesByType };
  },
};

export const graphAddNode: NodeModule = {
  type: 'caal.graph.addNode',
  meta: { name: 'Add Node', description: 'Stage a new node to be added to the graph', category: 'integration', version: '0.1.0' },
  schema: {
    config: {
      type: 'object',
      properties: {
        nodeId: { type: 'string' },
        nodeType: { type: 'string' },
        nodeConfig: { type: 'object' },
        label: { type: 'string' },
      },
      required: ['nodeId', 'nodeType'],
    },
    input: {},
    output: {
      type: 'object',
      properties: { patchCount: { type: 'number' } },
    },
  },
  async execute(ctx, config) {
    const cfg = config as{ nodeId: string; nodeType: string; nodeConfig?: Record<string, unknown>; label?: string };
    const patches = ctx.get<unknown[]>('_caal_patches') ?? [];
    patches.push({
      op: 'add_node',
      data: {
        id: cfg.nodeId,
        type: cfg.nodeType,
        config: cfg.nodeConfig ?? {},
        ...(cfg.label && { label: cfg.label }),
      },
    });
    ctx.set('_caal_patches', patches);
    return { patchCount: patches.length };
  },
};

export const graphUpdateNode: NodeModule = {
  type: 'caal.graph.updateNode',
  meta: { name: 'Update Node', description: 'Stage updates to an existing node', category: 'integration', version: '0.1.0' },
  schema: {
    config: {
      type: 'object',
      properties: {
        nodeId: { type: 'string' },
        updates: { type: 'object', description: 'Partial config to merge onto the node' },
      },
      required: ['nodeId', 'updates'],
    },
    input: {},
    output: {
      type: 'object',
      properties: { patchCount: { type: 'number' } },
    },
  },
  async execute(ctx, config) {
    const cfg = config as{ nodeId: string; updates: Record<string, unknown> };
    const patches = ctx.get<unknown[]>('_caal_patches') ?? [];
    patches.push({ op: 'update_node', target: cfg.nodeId, data: cfg.updates });
    ctx.set('_caal_patches', patches);
    return { patchCount: patches.length };
  },
};

export const graphDeleteNode: NodeModule = {
  type: 'caal.graph.deleteNode',
  meta: { name: 'Delete Node', description: 'Stage deletion of a node', category: 'integration', version: '0.1.0' },
  schema: {
    config: {
      type: 'object',
      properties: {
        nodeId: { type: 'string' },
      },
      required: ['nodeId'],
    },
    input: {},
    output: {
      type: 'object',
      properties: { patchCount: { type: 'number' } },
    },
  },
  async execute(ctx, config) {
    const cfg = config as{ nodeId: string };
    const patches = ctx.get<unknown[]>('_caal_patches') ?? [];
    patches.push({ op: 'delete_node', target: cfg.nodeId });
    ctx.set('_caal_patches', patches);
    return { patchCount: patches.length };
  },
};

export const graphAddEdge: NodeModule = {
  type: 'caal.graph.addEdge',
  meta: { name: 'Add Edge', description: 'Stage a new edge between nodes', category: 'integration', version: '0.1.0' },
  schema: {
    config: {
      type: 'object',
      properties: {
        fromNodeId: { type: 'string' },
        toNodeId: { type: 'string' },
        condition: { type: 'string', description: 'Optional JSONata condition expression' },
      },
      required: ['fromNodeId', 'toNodeId'],
    },
    input: {},
    output: {
      type: 'object',
      properties: { patchCount: { type: 'number' } },
    },
  },
  async execute(ctx, config) {
    const cfg = config as{ fromNodeId: string; toNodeId: string; condition?: string };
    const patches = ctx.get<unknown[]>('_caal_patches') ?? [];
    patches.push({
      op: 'add_edge',
      data: {
        from: cfg.fromNodeId,
        to: cfg.toNodeId,
        ...(cfg.condition && { condition: cfg.condition }),
      },
    });
    ctx.set('_caal_patches', patches);
    return { patchCount: patches.length };
  },
};

export const graphDeleteEdge: NodeModule = {
  type: 'caal.graph.deleteEdge',
  meta: { name: 'Delete Edge', description: 'Stage deletion of an edge', category: 'integration', version: '0.1.0' },
  schema: {
    config: {
      type: 'object',
      properties: {
        fromNodeId: { type: 'string' },
        toNodeId: { type: 'string' },
      },
      required: ['fromNodeId', 'toNodeId'],
    },
    input: {},
    output: {
      type: 'object',
      properties: { patchCount: { type: 'number' } },
    },
  },
  async execute(ctx, config) {
    const cfg = config as{ fromNodeId: string; toNodeId: string };
    const patches = ctx.get<unknown[]>('_caal_patches') ?? [];
    patches.push({ op: 'delete_edge', data: { from: cfg.fromNodeId, to: cfg.toNodeId } });
    ctx.set('_caal_patches', patches);
    return { patchCount: patches.length };
  },
};

export const graphAddToolEdge: NodeModule = {
  type: 'caal.graph.addToolEdge',
  meta: { name: 'Add Tool Edge', description: 'Stage a new tool edge', category: 'integration', version: '0.1.0' },
  schema: {
    config: {
      type: 'object',
      properties: {
        toolNodeId: { type: 'string' },
        agentNodeId: { type: 'string' },
      },
      required: ['toolNodeId', 'agentNodeId'],
    },
    input: {},
    output: {
      type: 'object',
      properties: { patchCount: { type: 'number' } },
    },
  },
  async execute(ctx, config) {
    const cfg = config as{ toolNodeId: string; agentNodeId: string };
    const patches = ctx.get<unknown[]>('_caal_patches') ?? [];
    patches.push({ op: 'add_tool_edge', data: { tool: cfg.toolNodeId, agent: cfg.agentNodeId } });
    ctx.set('_caal_patches', patches);
    return { patchCount: patches.length };
  },
};

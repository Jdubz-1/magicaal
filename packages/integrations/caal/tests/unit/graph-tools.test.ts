import type { GraphPatch } from '@magicaal/core';
import {
  graphRead,
  graphGetNode,
  graphGetSelectedNodes,
  graphSummarize,
  graphAddNode,
  graphUpdateNode,
  graphDeleteNode,
  graphAddEdge,
  graphDeleteEdge,
  graphAddToolEdge,
} from '../../src/index';
import { makeMockContext, type MockContext } from '../helpers/mock-context';

/**
 * These ten tools are the whole of Caal's graph vocabulary, and until now none
 * of them had a test anywhere in the repo — the package shipped without a
 * `test` script, so `pnpm -r run test` skipped it entirely.
 *
 * The six staging tools matter most: `caal.proposal.create` builds a proposal
 * purely from what they pushed onto `_caal_patches`, so a malformed patch here
 * becomes a proposal Studio silently declines to apply.
 */

const GRAPH_STATE = {
  nodes: {
    start: { id: 'start', type: 'core:start' },
    llm: { id: 'llm', type: 'core:llm-call', config: { outputKey: 'answer' } },
    end: { id: 'end', type: 'core:end' },
  },
  edges: [
    { id: 'e1', from: 'start', to: 'llm' },
    { id: 'e2', from: 'llm', to: 'end' },
  ],
};

function patches(ctx: MockContext): GraphPatch[] {
  return (ctx.get<GraphPatch[]>('_caal_patches') ?? []) as GraphPatch[];
}

describe('caal.graph read tools', () => {
  it('caal.graph.read returns the graph, and null rather than undefined when there is none', async () => {
    const withGraph = makeMockContext({ graphState: GRAPH_STATE });
    await expect(graphRead.execute(withGraph, {})).resolves.toMatchObject({
      status: 'complete',
      outputs: { graphState: GRAPH_STATE },
    });

    // The result is serialized into a tool_result for the model; `undefined`
    // would vanish from the JSON and read as "no such field" rather than
    // "no graph".
    const empty = makeMockContext({});
    const res = await graphRead.execute(empty, {});
    expect(res.outputs).toEqual({ graphState: null });
  });

  it('caal.graph.getNode returns the node, or null when the id is unknown', async () => {
    const ctx = makeMockContext({ graphState: GRAPH_STATE });

    const found = await graphGetNode.execute(ctx, { nodeId: 'llm' });
    expect(found.outputs.node).toEqual(GRAPH_STATE.nodes.llm);

    const missing = await graphGetNode.execute(ctx, { nodeId: 'nope' });
    expect(missing.outputs).toEqual({ node: null });

    const noGraph = await graphGetNode.execute(makeMockContext({}), { nodeId: 'llm' });
    expect(noGraph.outputs).toEqual({ node: null });
  });

  it('caal.graph.getSelectedNodes resolves the selection and drops ids the graph no longer has', async () => {
    const ctx = makeMockContext({
      graphState: GRAPH_STATE,
      selectedNodeIds: ['llm', 'deleted-since', 'start'],
    });

    const res = await graphGetSelectedNodes.execute(ctx, {});
    expect(res.outputs.nodes).toEqual([GRAPH_STATE.nodes.llm, GRAPH_STATE.nodes.start]);
  });

  it('caal.graph.getSelectedNodes returns an empty list when nothing is selected', async () => {
    const res = await graphGetSelectedNodes.execute(makeMockContext({ graphState: GRAPH_STATE }), {});
    expect(res.outputs.nodes).toEqual([]);
  });

  it('caal.graph.summarize counts nodes by type and edges', async () => {
    const ctx = makeMockContext({ graphState: GRAPH_STATE });
    const res = await graphSummarize.execute(ctx, {});

    expect(res.outputs).toMatchObject({ nodeCount: 3, edgeCount: 2 });
    expect(res.outputs.nodesByType).toEqual({ 'core:start': 1, 'core:llm-call': 1, 'core:end': 1 });
    expect(res.outputs.summary).toContain('3 node(s)');
  });

  it('caal.graph.summarize answers for an empty graph instead of throwing', async () => {
    const res = await graphSummarize.execute(makeMockContext({}), {});
    expect(res.status).toBe('complete');
    expect(res.outputs).toMatchObject({ nodeCount: 0, edgeCount: 0, nodesByType: {} });
  });
});

describe('caal.graph staging tools', () => {
  let ctx: MockContext;
  beforeEach(() => {
    ctx = makeMockContext({ graphState: GRAPH_STATE });
  });

  it('addNode stages one add_node patch, defaulting config and omitting an absent label', async () => {
    const res = await graphAddNode.execute(ctx, { nodeId: 'guard', nodeType: 'core:guardrail' });

    expect(res.outputs).toEqual({ patchCount: 1 });
    expect(patches(ctx)).toEqual([
      { op: 'add_node', data: { id: 'guard', type: 'core:guardrail', config: {} } },
    ]);
    // An explicit `label: undefined` would serialize into the proposal and
    // overwrite a node's label with nothing when applied.
    expect(Object.keys(patches(ctx)[0].data!)).not.toContain('label');
  });

  it('addNode carries the label and config when given', async () => {
    await graphAddNode.execute(ctx, {
      nodeId: 'guard',
      nodeType: 'core:guardrail',
      nodeConfig: { policy: 'strict' },
      label: 'Safety check',
    });

    expect(patches(ctx)[0].data).toEqual({
      id: 'guard',
      type: 'core:guardrail',
      config: { policy: 'strict' },
      label: 'Safety check',
    });
  });

  it('updateNode stages a targeted merge', async () => {
    await graphUpdateNode.execute(ctx, { nodeId: 'llm', updates: { temperature: 0.2 } });

    expect(patches(ctx)).toEqual([
      { op: 'update_node', target: 'llm', data: { temperature: 0.2 } },
    ]);
  });

  it('deleteNode stages a target with no data payload', async () => {
    await graphDeleteNode.execute(ctx, { nodeId: 'llm' });

    expect(patches(ctx)).toEqual([{ op: 'delete_node', target: 'llm' }]);
  });

  it('addEdge stages from/to, and includes a condition only when one is given', async () => {
    await graphAddEdge.execute(ctx, { fromNodeId: 'start', toNodeId: 'guard' });
    await graphAddEdge.execute(ctx, { fromNodeId: 'guard', toNodeId: 'llm', condition: '$.ok = true' });

    expect(patches(ctx)).toEqual([
      { op: 'add_edge', data: { from: 'start', to: 'guard' } },
      { op: 'add_edge', data: { from: 'guard', to: 'llm', condition: '$.ok = true' } },
    ]);
  });

  it('deleteEdge identifies the edge by its endpoints', async () => {
    await graphDeleteEdge.execute(ctx, { fromNodeId: 'start', toNodeId: 'llm' });

    expect(patches(ctx)).toEqual([
      { op: 'delete_edge', data: { from: 'start', to: 'llm' } },
    ]);
  });

  it('addToolEdge uses tool/agent, not from/to', async () => {
    await graphAddToolEdge.execute(ctx, { toolNodeId: 'caal.graph.read', agentNodeId: 'agent' });

    expect(patches(ctx)).toEqual([
      { op: 'add_tool_edge', data: { tool: 'caal.graph.read', agent: 'agent' } },
    ]);
  });

  it('accumulates across tools in call order, reporting a running count', async () => {
    const counts: number[] = [];
    for (const call of [
      () => graphAddNode.execute(ctx, { nodeId: 'guard', nodeType: 'core:guardrail' }),
      () => graphAddEdge.execute(ctx, { fromNodeId: 'start', toNodeId: 'guard' }),
      () => graphDeleteEdge.execute(ctx, { fromNodeId: 'start', toNodeId: 'llm' }),
      () => graphUpdateNode.execute(ctx, { nodeId: 'llm', updates: { temperature: 0 } }),
    ]) {
      const res = await call();
      counts.push(res.outputs.patchCount as number);
    }

    expect(counts).toEqual([1, 2, 3, 4]);
    expect(patches(ctx).map((p) => p.op)).toEqual([
      'add_node', 'add_edge', 'delete_edge', 'update_node',
    ]);
  });

  /**
   * `applyProposalPatches` in Studio switches on this exact set. An op outside
   * it is staged, shown in the review card, and then silently skipped when the
   * developer clicks Apply.
   */
  it('only ever stages ops the GraphPatch union declares', async () => {
    const declared: Array<GraphPatch['op']> = [
      'add_node', 'update_node', 'delete_node', 'add_edge', 'delete_edge', 'add_tool_edge',
    ];

    await graphAddNode.execute(ctx, { nodeId: 'a', nodeType: 'core:start' });
    await graphUpdateNode.execute(ctx, { nodeId: 'a', updates: {} });
    await graphDeleteNode.execute(ctx, { nodeId: 'a' });
    await graphAddEdge.execute(ctx, { fromNodeId: 'a', toNodeId: 'b' });
    await graphDeleteEdge.execute(ctx, { fromNodeId: 'a', toNodeId: 'b' });
    await graphAddToolEdge.execute(ctx, { toolNodeId: 't', agentNodeId: 'a' });

    const staged = patches(ctx);
    expect(staged).toHaveLength(6);
    for (const patch of staged) {
      expect(declared).toContain(patch.op);
    }
    expect(new Set(staged.map((p) => p.op)).size).toBe(declared.length);
  });

  it('every staged patch carries the payload its op needs', async () => {
    await graphAddNode.execute(ctx, { nodeId: 'a', nodeType: 'core:start' });
    await graphUpdateNode.execute(ctx, { nodeId: 'a', updates: { x: 1 } });
    await graphDeleteNode.execute(ctx, { nodeId: 'a' });
    await graphAddEdge.execute(ctx, { fromNodeId: 'a', toNodeId: 'b' });

    for (const patch of patches(ctx)) {
      if (patch.op === 'delete_node') {
        expect(typeof patch.target).toBe('string');
      } else if (patch.op === 'update_node') {
        // A target without data (or the reverse) is the shape Studio reports
        // as "carried no changes" and skips.
        expect(typeof patch.target).toBe('string');
        expect(patch.data).toBeDefined();
      } else {
        expect(patch.data).toBeDefined();
      }
    }
  });
});

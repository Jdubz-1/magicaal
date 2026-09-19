import { applyProposalPatches, describeSkipped } from '../../../src/canvas/lib/proposalPatches';
import type { PatchableGraph } from '../../../src/canvas/lib/proposalPatches';

/**
 * Accepting a Caal proposal changed nothing but still showed "applied" and an
 * Undo button: the patch loop lived inline in App.svelte, silently ignored any
 * patch it couldn't match, and every proposal from the suggest path carried no
 * patches at all. Applications are counted here so the caller can tell.
 */
function baseGraph(): PatchableGraph {
  return {
    nodes: {
      start: { id: 'start', type: 'core:start', config: {}, position: { x: 0, y: 0 } },
      llm: { id: 'llm', type: 'core:llm-call', config: {}, position: { x: 300, y: 0 } },
    },
    edges: [{ id: 'e1', from: 'start', to: 'llm', type: 'unconditional' }],
    toolEdges: [],
  } as PatchableGraph;
}

describe('applyProposalPatches', () => {
  it('reports nothing applied for an empty or missing patch list', () => {
    for (const patches of [[], undefined]) {
      const before = baseGraph();
      const result = applyProposalPatches(before, patches);

      expect(result.applied).toBe(0);
      expect(result.skipped).toEqual([]);
      expect(result.graph).toEqual(before);
    }
  });

  it('does not mutate the graph it was given', () => {
    const before = baseGraph();
    applyProposalPatches(before, [{ op: 'add_node', data: { id: 'guard', type: 'core:guardrail' } }]);

    expect(before.nodes.guard).toBeUndefined();
  });

  it('applies every supported operation', () => {
    const result = applyProposalPatches(baseGraph(), [
      { op: 'add_node', data: { id: 'guard', type: 'core:guardrail' } },
      { op: 'update_node', target: 'llm', data: { label: 'Answer' } },
      { op: 'add_edge', data: { from: 'llm', to: 'guard' } },
      { op: 'delete_edge', data: { from: 'start', to: 'llm' } },
      { op: 'add_tool_edge', data: { tool: 'caal.graph.read', agent: 'llm' } },
    ]);

    expect(result.applied).toBe(5);
    expect(result.skipped).toEqual([]);
    expect(result.graph.nodes.guard).toMatchObject({ id: 'guard', type: 'core:guardrail', config: {} });
    expect(result.graph.nodes.llm).toMatchObject({ id: 'llm', type: 'core:llm-call', label: 'Answer' });
    expect(result.graph.edges).toEqual([
      { id: 'e_caal_1', from: 'llm', to: 'guard', type: 'unconditional' },
    ]);
    expect(result.graph.toolEdges).toEqual([
      { id: 'te_caal_1', from: 'caal.graph.read', to: 'llm' },
    ]);
  });

  /**
   * The caal.graph.* tools stage the model's own arguments, not the graph's
   * shapes: an edge with no id or type, a tool edge as { tool, agent }, a node
   * with no position. Stored verbatim those counted as applied while doing
   * nothing the engine or canvas could read.
   */
  it('gives a staged edge an id and a type derived from its condition', () => {
    const result = applyProposalPatches(baseGraph(), [
      { op: 'add_edge', data: { from: 'start', to: 'llm', condition: '$.ok = true' } },
      { op: 'add_edge', data: { from: 'llm', to: 'start' } },
    ]);

    expect(result.graph.edges[1]).toEqual({
      id: 'e_caal_1',
      from: 'start',
      to: 'llm',
      type: 'conditional',
      condition: '$.ok = true',
    });
    expect(result.graph.edges[2].type).toBe('unconditional');
    expect(result.graph.edges[2].id).toBe('e_caal_2');
  });

  it('gives an applied node a free position instead of the canvas fallback', () => {
    const result = applyProposalPatches(baseGraph(), [
      { op: 'add_node', data: { id: 'a', type: 'core:transform' } },
      { op: 'add_node', data: { id: 'b', type: 'core:transform' } },
    ]);

    const a = result.graph.nodes.a.position;
    const b = result.graph.nodes.b.position;
    expect(a).toBeDefined();
    expect(b).toBeDefined();
    expect(a).not.toEqual(b);
  });

  /**
   * caal.graph.updateNode stages its argument as "partial config to merge onto
   * the node", so the model sends config fields. Spreading them at the node
   * root wrote keys nothing reads, while still counting as applied.
   */
  it('merges staged updates into the node config, not onto its root', () => {
    const result = applyProposalPatches(baseGraph(), [
      { op: 'update_node', target: 'llm', data: { systemPrompt: 'Be brief.', temperature: 0.2 } },
    ]);

    expect(result.applied).toBe(1);
    expect(result.graph.nodes.llm.config).toEqual({ systemPrompt: 'Be brief.', temperature: 0.2 });
    expect((result.graph.nodes.llm as unknown as Record<string, unknown>).systemPrompt).toBeUndefined();
  });

  it('keeps genuine root fields at the root and merges an explicit config', () => {
    const result = applyProposalPatches(baseGraph(), [
      {
        op: 'update_node',
        target: 'llm',
        data: { label: 'Answer', position: { x: 10, y: 20 }, config: { model: 'haiku' } },
      },
    ]);

    expect(result.graph.nodes.llm.label).toBe('Answer');
    expect(result.graph.nodes.llm.position).toEqual({ x: 10, y: 20 });
    expect(result.graph.nodes.llm.config).toEqual({ model: 'haiku' });
  });

  it('skips an update that carries no changes', () => {
    const result = applyProposalPatches(baseGraph(), [
      { op: 'update_node', target: 'llm', data: {} },
      { op: 'update_node', target: 'llm', data: { id: 'renamed' } },
    ]);

    expect(result.applied).toBe(0);
    expect(result.skipped.map((s) => s.reason)).toEqual([
      'update_node carried no changes',
      'update_node carried no changes',
    ]);
  });

  it('refuses to repoint an existing node id through update_node', () => {
    const result = applyProposalPatches(baseGraph(), [
      { op: 'update_node', target: 'llm', data: { id: 'renamed', label: 'x' } },
    ]);

    expect(result.graph.nodes.llm.id).toBe('llm');
    expect(result.graph.nodes.renamed).toBeUndefined();
  });

  it('skips an edge whose endpoints are not in the graph', () => {
    const result = applyProposalPatches(baseGraph(), [
      { op: 'add_edge', data: { from: 'llm', to: 'ghost' } },
    ]);

    expect(result.applied).toBe(0);
    expect(result.skipped[0].reason).toContain('ghost');
  });

  it('skips a tool edge whose agent node is not in the graph', () => {
    const result = applyProposalPatches(baseGraph(), [
      { op: 'add_tool_edge', data: { tool: 'caal.graph.read', agent: 'ghost' } },
    ]);

    expect(result.applied).toBe(0);
    expect(result.skipped[0].reason).toContain('ghost');
  });

  it('deletes a node by target, taking its edges with it', () => {
    const graph = baseGraph();
    graph.toolEdges = [{ id: 'te1', from: 'caal.graph.read', to: 'llm' }];

    const result = applyProposalPatches(graph, [{ op: 'delete_node', target: 'llm' }]);

    expect(result.applied).toBe(1);
    expect(result.graph.nodes.llm).toBeUndefined();
    // Studio's own delete cascades; leaving these behind draws a line to a node
    // that isn't there and stops the graph compiling.
    expect(result.graph.edges).toEqual([]);
    expect(result.graph.toolEdges).toEqual([]);
  });

  it('does not report a cascaded edge as a failed delete_edge', () => {
    const result = applyProposalPatches(baseGraph(), [
      { op: 'delete_node', target: 'llm' },
      { op: 'delete_edge', data: { from: 'start', to: 'llm' } },
    ]);

    expect(result.applied).toBe(2);
    expect(result.skipped).toEqual([]);
  });

  it('skips a patch that cannot apply, with a reason', () => {
    const result = applyProposalPatches(baseGraph(), [
      { op: 'update_node', target: 'ghost', data: { label: 'x' } },
      { op: 'delete_node', target: 'ghost' },
      { op: 'delete_edge', data: { from: 'a', to: 'b' } },
      { op: 'add_node', data: { id: 'llm', type: 'core:llm-call' } },
      { op: 'add_node', data: { type: 'core:end' } },
      { op: 'rewrite_everything' },
    ]);

    expect(result.applied).toBe(0);
    expect(result.skipped).toHaveLength(6);
    expect(result.skipped[0]).toEqual({
      op: 'update_node',
      target: 'ghost',
      reason: 'node "ghost" is not in the graph',
    });
    expect(result.skipped[3].reason).toContain('already exists');
    expect(result.skipped[5].reason).toContain('unsupported operation');
  });

  it('counts a partial application honestly', () => {
    const result = applyProposalPatches(baseGraph(), [
      { op: 'add_node', data: { id: 'guard', type: 'core:guardrail' } },
      { op: 'update_node', target: 'ghost', data: { label: 'x' } },
    ]);

    expect(result.applied).toBe(1);
    expect(result.skipped).toHaveLength(1);
  });

  it('tolerates a graph with no edges or toolEdges yet', () => {
    const sparse = {
      nodes: { a: { id: 'a', type: 'core:start', config: {} }, b: { id: 'b', type: 'core:end', config: {} } },
    } as unknown as PatchableGraph;
    const result = applyProposalPatches(sparse, [{ op: 'add_edge', data: { from: 'a', to: 'b' } }]);

    expect(result.applied).toBe(1);
    expect(result.graph.edges).toEqual([
      { id: 'e_caal_1', from: 'a', to: 'b', type: 'unconditional' },
    ]);
  });
});

describe('describeSkipped', () => {
  it('names each skipped op and why', () => {
    const text = describeSkipped([
      { op: 'update_node', target: 'ghost', reason: 'node "ghost" is not in the graph' },
      { op: 'add_edge', reason: 'add_edge needs data' },
    ]);

    expect(text).toBe('update_node on ghost (node "ghost" is not in the graph); add_edge (add_edge needs data)');
  });
});

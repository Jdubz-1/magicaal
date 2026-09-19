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
    nodes: { llm: { id: 'llm', type: 'core:llm-call' } },
    edges: [{ from: 'start', to: 'llm' }],
    toolEdges: [],
  };
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
      { op: 'add_tool_edge', data: { from: 'caal.graph.read', to: 'llm' } },
    ]);

    expect(result.applied).toBe(5);
    expect(result.skipped).toEqual([]);
    expect(result.graph.nodes.guard).toEqual({ id: 'guard', type: 'core:guardrail' });
    expect(result.graph.nodes.llm).toEqual({ id: 'llm', type: 'core:llm-call', label: 'Answer' });
    expect(result.graph.edges).toEqual([{ from: 'llm', to: 'guard' }]);
    expect(result.graph.toolEdges).toHaveLength(1);
  });

  it('deletes a node by target', () => {
    const result = applyProposalPatches(baseGraph(), [{ op: 'delete_node', target: 'llm' }]);

    expect(result.applied).toBe(1);
    expect(result.graph.nodes.llm).toBeUndefined();
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
    const sparse = { nodes: {} } as unknown as PatchableGraph;
    const result = applyProposalPatches(sparse, [{ op: 'add_edge', data: { from: 'a', to: 'b' } }]);

    expect(result.applied).toBe(1);
    expect(result.graph.edges).toEqual([{ from: 'a', to: 'b' }]);
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

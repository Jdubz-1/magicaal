import type { AgentGraphDefinition } from '@magicaal/core';
import { validateGraph, parseAndValidateGraph } from '../../src/lib/graph-validator';

function makeGraph(
  edges: unknown[],
  nodes: Record<string, { type: string }> = {
    start: { type: 'core:start' },
    end: { type: 'core:end' },
  },
): AgentGraphDefinition {
  const fullNodes: AgentGraphDefinition['nodes'] = {};
  for (const [id, n] of Object.entries(nodes)) {
    fullNodes[id] = { id, type: n.type, config: {} };
  }
  return {
    version: '1.0',
    name: 'test-graph',
    entry: 'start',
    nodes: fullNodes,
    edges: edges as AgentGraphDefinition['edges'],
    toolEdges: [],
    workspaceEdges: [],
    config: {} as AgentGraphDefinition['config'],
  };
}

describe('validateGraph — edge types', () => {
  it('accepts each of the three valid edge types', () => {
    for (const type of ['unconditional', 'conditional', 'fallback']) {
      const graph = makeGraph([{ id: 'e1', from: 'start', to: 'end', type }]);
      expect(() => validateGraph(graph)).not.toThrow();
    }
  });

  it('rejects a misspelled edge type with a 400', () => {
    const graph = makeGraph([{ id: 'e1', from: 'start', to: 'end', type: 'uncondtional' }]);
    let caught: (Error & { status?: number; code?: string }) | undefined;
    try {
      validateGraph(graph);
    } catch (err) {
      caught = err as Error & { status?: number; code?: string };
    }
    expect(caught).toBeDefined();
    expect(caught?.status).toBe(400);
    expect(caught?.code).toBe('INVALID_GRAPH_EDGE_TYPE');
    expect(caught?.message).toContain('uncondtional');
  });

  it('accepts an edge with no type — the engine reads it as unconditional', () => {
    const graph = makeGraph([{ id: 'e1', from: 'start', to: 'end' }]);
    expect(() => validateGraph(graph)).not.toThrow();
  });
});

describe('validateGraph — existing structural rules still hold', () => {
  it('rejects an edge pointing at an unknown node', () => {
    const graph = makeGraph([{ id: 'e1', from: 'start', to: 'nope', type: 'unconditional' }]);
    expect(() => validateGraph(graph)).toThrow(/unknown target node/);
  });

  it('rejects a graph with an unreachable node', () => {
    const graph = makeGraph([]);
    expect(() => validateGraph(graph)).toThrow(/unreachable/);
  });

  it('rejects a graph with no core:start node', () => {
    const graph = makeGraph([{ id: 'e1', from: 'start', to: 'end', type: 'unconditional' }], {
      start: { type: 'core:log' },
      end: { type: 'core:end' },
    });
    expect(() => validateGraph(graph)).toThrow(/core:start/);
  });
});

describe('parseAndValidateGraph', () => {
  it('parses and validates a well-formed graph', () => {
    const graph = makeGraph([{ id: 'e1', from: 'start', to: 'end', type: 'unconditional' }]);
    expect(parseAndValidateGraph(JSON.stringify(graph)).entry).toBe('start');
  });

  it('rejects a bad edge type through the parse path too', () => {
    const graph = makeGraph([{ id: 'e1', from: 'start', to: 'end', type: 'nope' }]);
    expect(() => parseAndValidateGraph(JSON.stringify(graph))).toThrow(/invalid type/);
  });

  it('throws a 400 on malformed JSON', () => {
    expect(() => parseAndValidateGraph('{not json')).toThrow(/not valid JSON/);
  });
});

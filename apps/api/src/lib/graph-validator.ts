import type { AgentGraphDefinition } from '@magicaal/core';

/**
 * Structural validation of an agent graph, applied at every point a graph
 * enters the system: publish, and Marketplace template import.
 *
 * Moved here from the engine, where it existed but was never called — so
 * malformed graphs were accepted and only failed at run time (or ran
 * half-way). The API is the write path for graphs, so the gate belongs here.
 */
export function validateGraph(graph: AgentGraphDefinition): void {
  if (!graph.nodes || typeof graph.nodes !== 'object') {
    throw Object.assign(new Error('Graph has no nodes'), {
      status: 400,
      code: 'INVALID_GRAPH_NO_NODES',
    });
  }

  if (!graph.nodes[graph.entry]) {
    throw Object.assign(new Error(`Entry node '${graph.entry}' not found in graph`), {
      status: 400,
      code: 'INVALID_GRAPH_ENTRY',
    });
  }

  const hasStart = Object.values(graph.nodes).some((n) => n.type === 'core:start');
  if (!hasStart) {
    throw Object.assign(new Error('Graph must have at least one core:start node'), {
      status: 400,
      code: 'INVALID_GRAPH_NO_START',
    });
  }

  const edges = graph.edges ?? [];
  const nodeIds = new Set(Object.keys(graph.nodes));
  for (const edge of edges) {
    if (!nodeIds.has(edge.from)) {
      throw Object.assign(
        new Error(`Edge '${edge.id}' references unknown source node '${edge.from}'`),
        { status: 400, code: 'INVALID_GRAPH_EDGE' },
      );
    }
    if (!nodeIds.has(edge.to)) {
      throw Object.assign(
        new Error(`Edge '${edge.id}' references unknown target node '${edge.to}'`),
        { status: 400, code: 'INVALID_GRAPH_EDGE' },
      );
    }
  }

  const reachable = new Set<string>([graph.entry]);
  const queue = [graph.entry];
  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const edge of edges) {
      if (edge.from === current && !reachable.has(edge.to)) {
        reachable.add(edge.to);
        queue.push(edge.to);
      }
    }
  }
  for (const nodeId of nodeIds) {
    if (!reachable.has(nodeId)) {
      throw Object.assign(
        new Error(`Node '${nodeId}' is unreachable from entry node '${graph.entry}'`),
        { status: 400, code: 'INVALID_GRAPH_DISCONNECTED' },
      );
    }
  }
}

/** Parse and validate a serialized graph. Throws a 400 on malformed JSON. */
export function parseAndValidateGraph(graphJson: string): AgentGraphDefinition {
  let graph: AgentGraphDefinition;
  try {
    graph = JSON.parse(graphJson) as AgentGraphDefinition;
  } catch {
    throw Object.assign(new Error('graphJson is not valid JSON'), {
      status: 400,
      code: 'INVALID_GRAPH_JSON',
    });
  }
  validateGraph(graph);
  return graph;
}

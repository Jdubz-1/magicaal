import type { AgentGraphDefinition } from '@magicaal/core';

export function validateGraph(graph: AgentGraphDefinition): void {
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

  const nodeIds = new Set(Object.keys(graph.nodes));
  for (const edge of graph.edges) {
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
    for (const edge of graph.edges) {
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

import { Graph, layout } from '@dagrejs/dagre';
import type { GraphDef } from '../stores/graph';
import { NODE_WIDTH, NODE_HEIGHT, MIN_CLEARANCE } from './constants';

/**
 * Lays out the entire main flow graph (nodes + edges only — never toolEdges
 * or workspaceEdges, which live in their own separate canvas panel regions)
 * using dagre's layered/Sugiyama-style algorithm, left-to-right. Every
 * node's position is unconditionally overwritten regardless of its current
 * position. Cycles (e.g. a core:loop back-edge) are handled automatically
 * by dagre's internal feedback-edge detection — no special pre-processing
 * of edges is needed.
 */
export function runAutoLayout(g: GraphDef): GraphDef {
  const dg = new Graph({ multigraph: true });
  dg.setGraph({
    rankdir: 'LR',
    nodesep: MIN_CLEARANCE,
    ranksep: MIN_CLEARANCE * 2,
    marginx: 40,
    marginy: 40,
  });
  dg.setDefaultEdgeLabel(() => ({}));

  for (const node of Object.values(g.nodes)) {
    dg.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  }

  for (const edge of g.edges) {
    // Guard against dangling edge endpoints — dagre.setEdge would otherwise
    // implicitly create a phantom node for a reference with no matching entry.
    if (g.nodes[edge.from] && g.nodes[edge.to]) {
      dg.setEdge(edge.from, edge.to);
    }
  }

  layout(dg);

  const nodes: GraphDef['nodes'] = {};
  for (const [id, node] of Object.entries(g.nodes)) {
    const laidOut = dg.node(id);
    // dagre reports the node's CENTER; this codebase's position is top-left.
    nodes[id] = laidOut
      ? { ...node, position: { x: laidOut.x - NODE_WIDTH / 2, y: laidOut.y - NODE_HEIGHT / 2 } }
      : node;
  }

  return { ...g, nodes };
}

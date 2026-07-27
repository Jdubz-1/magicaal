import { findFreeSlot } from '../../../src/canvas/layout/collision';
import { NODE_WIDTH, NODE_HEIGHT, MIN_CLEARANCE } from '../../../src/canvas/layout/constants';
import type { GraphDef, NodeDef } from '../../../src/canvas/stores/graph';

function node(id: string, position: { x: number; y: number }): NodeDef {
  return { id, type: 'core:transform', config: {}, position };
}

function graphOf(nodes: NodeDef[]): GraphDef {
  const nodeMap: Record<string, NodeDef> = {};
  for (const n of nodes) nodeMap[n.id] = n;
  return { nodes: nodeMap, edges: [], toolEdges: [] };
}

function boxesOverlap(a: { x: number; y: number }, b: { x: number; y: number }): boolean {
  return (
    a.x < b.x + NODE_WIDTH &&
    a.x + NODE_WIDTH > b.x &&
    a.y < b.y + NODE_HEIGHT &&
    a.y + NODE_HEIGHT > b.y
  );
}

describe('findFreeSlot', () => {
  it('returns the desired position unchanged when nothing overlaps', () => {
    const g = graphOf([node('a', { x: 0, y: 0 })]);
    const result = findFreeSlot(g, { x: 1000, y: 1000 });
    expect(result).toEqual({ x: 1000, y: 1000 });
  });

  it('nudges to a free slot when the desired position exactly matches an existing node', () => {
    const g = graphOf([node('a', { x: 100, y: 100 })]);
    const result = findFreeSlot(g, { x: 100, y: 100 });
    expect(result).not.toEqual({ x: 100, y: 100 });
    expect(boxesOverlap(result, { x: 100, y: 100 })).toBe(false);
  });

  it('respects excludeNodeId so a node dragged back near its own spot does not flee itself', () => {
    const g = graphOf([node('a', { x: 100, y: 100 })]);
    const result = findFreeSlot(g, { x: 105, y: 105 }, 'a');
    expect(result).toEqual({ x: 105, y: 105 });
  });

  it('enforces MIN_CLEARANCE, not just literal rectangle intersection', () => {
    const g = graphOf([node('a', { x: 0, y: 0 })]);
    // Adjacent to 'a' with less than MIN_CLEARANCE gap — literal rects don't
    // intersect, but this must still be rejected.
    const tooClose = { x: NODE_WIDTH + MIN_CLEARANCE / 2, y: 0 };
    const result = findFreeSlot(g, tooClose);
    expect(result).not.toEqual(tooClose);
  });

  it('always terminates with a valid, non-overlapping fallback in a densely packed area', () => {
    const nodes: NodeDef[] = [];
    // Pack a dense grid around the origin so the ring search is exhausted.
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 6; col++) {
        nodes.push(node(`n${row}_${col}`, { x: col * (NODE_WIDTH + 1), y: row * (NODE_HEIGHT + 1) }));
      }
    }
    const g = graphOf(nodes);
    const result = findFreeSlot(g, { x: 0, y: 0 });
    expect(Number.isFinite(result.x)).toBe(true);
    expect(Number.isFinite(result.y)).toBe(true);
    for (const n of nodes) {
      expect(boxesOverlap(result, n.position!)).toBe(false);
    }
  });
});

import { runAutoLayout } from '../../../src/canvas/layout/autoLayout';
import { NODE_WIDTH, NODE_HEIGHT } from '../../../src/canvas/layout/constants';
import type { GraphDef, NodeDef, EdgeDef } from '../../../src/canvas/stores/graph';

function node(id: string, type = 'core:transform', position?: { x: number; y: number }): NodeDef {
  return { id, type, config: {}, ...(position ? { position } : {}) };
}

function edge(from: string, to: string, type: EdgeDef['type'] = 'unconditional'): EdgeDef {
  return { id: `${from}-${to}`, from, to, type };
}

function graphOf(nodes: NodeDef[], edges: EdgeDef[], toolEdges: GraphDef['toolEdges'] = []): GraphDef {
  const nodeMap: Record<string, NodeDef> = {};
  for (const n of nodes) nodeMap[n.id] = n;
  return { entry: nodes[0]?.id, nodes: nodeMap, edges, toolEdges };
}

function boxesOverlap(a: { x: number; y: number }, b: { x: number; y: number }): boolean {
  return (
    a.x < b.x + NODE_WIDTH &&
    a.x + NODE_WIDTH > b.x &&
    a.y < b.y + NODE_HEIGHT &&
    a.y + NODE_HEIGHT > b.y
  );
}

function assertNoOverlaps(result: GraphDef): void {
  const positions = Object.values(result.nodes).map((n) => {
    expect(n.position).toBeDefined();
    return n.position!;
  });
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      expect(boxesOverlap(positions[i], positions[j])).toBe(false);
    }
  }
}

describe('runAutoLayout', () => {
  it('lays out a linear chain with strictly increasing x and no overlaps', () => {
    const g = graphOf(
      [node('start', 'core:start'), node('a'), node('end', 'core:end')],
      [edge('start', 'a'), edge('a', 'end')],
    );
    const result = runAutoLayout(g);
    const xs = ['start', 'a', 'end'].map((id) => result.nodes[id].position!.x);
    expect(xs[0]).toBeLessThan(xs[1]);
    expect(xs[1]).toBeLessThan(xs[2]);
    assertNoOverlaps(result);
  });

  it('places fan-out siblings in the same rank with distinct y, no overlaps', () => {
    const g = graphOf(
      [node('start', 'core:start'), node('b'), node('c'), node('end', 'core:end')],
      [edge('start', 'b'), edge('start', 'c'), edge('b', 'end'), edge('c', 'end')],
    );
    const result = runAutoLayout(g);
    const bX = result.nodes.b.position!.x;
    const cX = result.nodes.c.position!.x;
    const bY = result.nodes.b.position!.y;
    const cY = result.nodes.c.position!.y;
    expect(bX).toBe(cX);
    expect(bY).not.toBe(cY);
    assertNoOverlaps(result);
  });

  it('gives a disconnected node a valid, non-overlapping position', () => {
    const g = graphOf(
      [node('start', 'core:start'), node('end', 'core:end'), node('orphan')],
      [edge('start', 'end')],
    );
    const result = runAutoLayout(g);
    expect(result.nodes.orphan.position).toBeDefined();
    assertNoOverlaps(result);
  });

  it('terminates and produces distinct valid positions for a core:loop cycle', () => {
    const g = graphOf(
      [node('start', 'core:start'), node('loop', 'core:loop'), node('body'), node('end', 'core:end')],
      [
        edge('start', 'loop'),
        edge('loop', 'body'),
        edge('body', 'loop'), // back-edge: legal only because 'body' -> 'loop' originates from...
        edge('loop', 'end'),
      ],
    );
    expect(() => runAutoLayout(g)).not.toThrow();
    const result = runAutoLayout(g);
    assertNoOverlaps(result);
    const ids = Object.keys(result.nodes);
    const positions = ids.map((id) => JSON.stringify(result.nodes[id].position));
    expect(new Set(positions).size).toBe(ids.length);
  });

  it('does not rank nodes linked only by a toolEdge adjacently the way a flow edge would', () => {
    const g = graphOf(
      [node('start', 'core:start'), node('agent'), node('tool'), node('end', 'core:end')],
      [edge('start', 'agent'), edge('agent', 'end')],
      [{ id: 't1', from: 'agent', to: 'tool' }],
    );
    const result = runAutoLayout(g);
    // 'tool' has no flow edge at all, so it must not be ranked into the
    // start->agent->end chain the way a real edge target would be.
    expect(result.nodes.tool.position!.x).not.toBe(result.nodes.agent.position!.x);
    assertNoOverlaps(result);
  });

  it('unconditionally overwrites positions regardless of prior state', () => {
    const g = graphOf(
      [
        node('start', 'core:start', { x: 9999, y: 9999 }),
        node('a', 'core:transform', { x: -500, y: 3 }),
        node('end', 'core:end', { x: 1, y: 1 }),
      ],
      [edge('start', 'a'), edge('a', 'end')],
    );
    const first = runAutoLayout(g);
    const second = runAutoLayout(g);
    expect(first.nodes.start.position).toEqual(second.nodes.start.position);
    expect(first.nodes.a.position).toEqual(second.nodes.a.position);
    expect(first.nodes.end.position).toEqual(second.nodes.end.position);
  });
});

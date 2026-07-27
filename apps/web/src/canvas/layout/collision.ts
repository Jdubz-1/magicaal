import type { GraphDef } from '../stores/graph';
import { NODE_WIDTH, NODE_HEIGHT, MIN_CLEARANCE } from './constants';

export interface Point {
  x: number;
  y: number;
}

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

function overlaps(a: Box, b: Box, clearance: number): boolean {
  return (
    a.x < b.x + b.w + clearance &&
    a.x + a.w + clearance > b.x &&
    a.y < b.y + b.h + clearance &&
    a.y + a.h + clearance > b.y
  );
}

function boxAt(pos: Point): Box {
  return { x: pos.x, y: pos.y, w: NODE_WIDTH, h: NODE_HEIGHT };
}

function hasCollision(g: GraphDef, pos: Point, excludeNodeId?: string): boolean {
  const candidate = boxAt(pos);
  for (const node of Object.values(g.nodes)) {
    if (excludeNodeId && node.id === excludeNodeId) continue;
    if (!node.position) continue;
    if (overlaps(candidate, boxAt(node.position), MIN_CLEARANCE)) return true;
  }
  return false;
}

const RING_STEP = NODE_WIDTH / 4;
const MAX_RINGS = 40;

/**
 * Returns `desired` unchanged if it doesn't overlap any existing node
 * (inflated by MIN_CLEARANCE). Otherwise searches outward in an expanding
 * ring for the nearest free slot, falling back to a position below the
 * bounding box of every other node — which is always free by construction —
 * if the ring search is exhausted.
 */
export function findFreeSlot(g: GraphDef, desired: Point, excludeNodeId?: string): Point {
  if (!hasCollision(g, desired, excludeNodeId)) return desired;

  for (let ring = 1; ring <= MAX_RINGS; ring++) {
    const radius = ring * RING_STEP;
    const candidates: Point[] = [
      { x: desired.x + radius, y: desired.y },
      { x: desired.x - radius, y: desired.y },
      { x: desired.x, y: desired.y + radius },
      { x: desired.x, y: desired.y - radius },
      { x: desired.x + radius, y: desired.y + radius },
      { x: desired.x + radius, y: desired.y - radius },
      { x: desired.x - radius, y: desired.y + radius },
      { x: desired.x - radius, y: desired.y - radius },
    ];
    for (const candidate of candidates) {
      if (!hasCollision(g, candidate, excludeNodeId)) return candidate;
    }
  }

  let maxBottom = desired.y;
  for (const node of Object.values(g.nodes)) {
    if (excludeNodeId && node.id === excludeNodeId) continue;
    if (!node.position) continue;
    maxBottom = Math.max(maxBottom, node.position.y + NODE_HEIGHT);
  }
  return { x: desired.x, y: maxBottom + MIN_CLEARANCE };
}

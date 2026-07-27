import { writable } from 'svelte/store';
import { findFreeSlot, type Point } from '../layout/collision';

export interface NodeDef {
  id: string;
  type: string;
  label?: string;
  config: Record<string, unknown>;
  position?: { x: number; y: number };
}

export interface EdgeDef {
  id: string;
  from: string;
  to: string;
  type: 'unconditional' | 'conditional' | 'fallback';
  condition?: string;
}

export interface ToolEdgeDef {
  id: string;
  from: string;
  to: string;
}

export interface GraphDef {
  version?: string;
  entry?: string;
  nodes: Record<string, NodeDef>;
  edges: EdgeDef[];
  toolEdges: ToolEdgeDef[];
}

export const graph = writable<GraphDef>({ nodes: {}, edges: [], toolEdges: [] });

export function addToolEdge(edge: ToolEdgeDef): void {
  graph.update((g) => ({ ...g, toolEdges: [...(g.toolEdges ?? []), edge] }));
}
export const selectedNode = writable<NodeDef | null>(null);
export const agent = writable<{ id: string; name: string; status: string; draftGraphJson?: string | null } | null>(null);
export const agentConfig = writable<{
  triggerType: 'rest' | 'cron' | 'webhook';
  description: string;
  cronExpression: string;
  webhookUrl: string;
}>({
  triggerType: 'rest',
  description: '',
  cronExpression: '',
  webhookUrl: '',
});

export function addEdge(edge: EdgeDef): void {
  graph.update((g) => ({ ...g, edges: [...g.edges, edge] }));
}

/**
 * Creates a new node, placing it at `desiredPosition` unless that would
 * overlap an existing node — in which case it's nudged to the nearest free
 * slot. This is the single entry point every node-creation call site (palette
 * click-to-add, palette drag-and-drop) should use, so collision avoidance is
 * applied consistently everywhere a node is added.
 */
export function addNode(type: string, label: string, desiredPosition: Point): string {
  const id = `${type.replace(/:/g, '_')}_${Date.now()}`;
  graph.update((g) => ({
    ...g,
    nodes: {
      ...g.nodes,
      [id]: { id, type, label, config: {}, position: findFreeSlot(g, desiredPosition) },
    },
  }));
  return id;
}

/**
 * Moves an existing node to `desiredPosition`, nudged to the nearest free
 * slot if it would overlap another node. `nodeId` is excluded from its own
 * collision check so a node dragged back near its original spot doesn't
 * flee itself.
 */
export function moveNode(nodeId: string, desiredPosition: Point): void {
  graph.update((g) => ({
    ...g,
    nodes: {
      ...g.nodes,
      [nodeId]: { ...g.nodes[nodeId], position: findFreeSlot(g, desiredPosition, nodeId) },
    },
  }));
}

import { writable } from 'svelte/store';

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

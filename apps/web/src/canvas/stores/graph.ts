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

export interface GraphDef {
  version?: string;
  entry?: string;
  nodes: Record<string, NodeDef>;
  edges: EdgeDef[];
}

export const graph = writable<GraphDef>({ nodes: {}, edges: [] });
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

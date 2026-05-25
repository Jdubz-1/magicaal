import { writable } from 'svelte/store';

export interface NodeSchema {
  config?: {
    type: string;
    properties?: Record<string, { type: string; items?: { type: string }; description?: string }>;
    required?: string[];
  };
}

export interface NodeTypeDef {
  type: string;
  meta: { name: string; description: string; category: string };
  schema?: NodeSchema;
}

export const nodeTypes = writable<NodeTypeDef[]>([]);

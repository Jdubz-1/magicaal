import { writable } from 'svelte/store';

export interface NodeSchema {
  config?: {
    type: string;
    properties?: Record<
      string,
      {
        type: string;
        items?: { type: string };
        description?: string;
        /** 'connection' renders an Integration Connection dropdown. */
        format?: string;
        /** Integration service the connection dropdown filters to (e.g. 'slack'). */
        service?: string;
      }
    >;
    required?: string[];
  };
}

export interface NodeTypeDef {
  type: string;
  meta: { name: string; description: string; category: string };
  schema?: NodeSchema;
}

export const nodeTypes = writable<NodeTypeDef[]>([]);

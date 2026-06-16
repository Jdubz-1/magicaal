import 'reflect-metadata';
import type { AgentConfig } from '@magicaal/core';

export interface AgentMeta {
  handle: string;
  name: string;
  description?: string;
  config: Partial<AgentConfig>;
}

export const AGENT_META_KEY = 'magicaal:agent';

export function Agent(meta: AgentMeta): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(AGENT_META_KEY, meta, target);
  };
}

import 'reflect-metadata';
import type { AgentConfig } from '@magicaal/core';

export interface AgentMeta {
  handle: string;
  name: string;
  description?: string;
  config: Partial<AgentConfig>;
  /**
   * Admin-override policy for config fields. false or absent = all fields
   * locked (code wins on every deploy); true = admin can override any field;
   * object = per-field flags (true = overridable, false = locked).
   */
  overridable?: boolean | Record<string, boolean>;
}

export const AGENT_META_KEY = 'magicaal:agent';

export function Agent(meta: AgentMeta): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(AGENT_META_KEY, meta, target);
  };
}

export type AccumulationType = 'append' | 'replace' | 'merge';
export type OverflowStrategy = 'evict_oldest' | 'summarize' | 'truncate';

export interface ContextSchemaEntry {
  type: AccumulationType;
  maxItems?: number;
  maxTokens?: number;
  overflow?: OverflowStrategy;
  summarizeWith?: {
    model: string;
    prompt: string | { ref: string; version?: number };
    targetItems: number;
  };
  deduplicateBy?: string;
  ttlSeconds?: number;
}

export interface SessionConfig {
  enabled: boolean;
  ttlSeconds: number;
  schemaVersion: number;
  contextSchema: Record<string, ContextSchemaEntry>;
  migrations?: SessionSchemaMigration[];
}

export interface SessionSchemaMigration {
  fromVersion: number;
  toVersion: number;
  transform: Record<string, string>;
}

export interface Session {
  id: string;
  agentId: string;
  tenantId: string;
  rootRunId: string;
  schemaVersion: number;
  status: 'active' | 'stale_schema' | 'expired';
  metadata: Record<string, unknown>;
  createdAt: number;
  lastActiveAt: number;
  expiresAt: number;
}

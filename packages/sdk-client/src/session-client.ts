import type { AxiosInstance } from 'axios';

export interface SessionSummary {
  id: string;
  agentId: string;
  status: 'active' | 'stale_schema' | 'expired';
  lastActiveAt: string;
  expiresAt?: string;
  schemaVersion: number;
  createdAt: string;
  /** Caller-supplied session_metadata from creation, or null. */
  metadata?: Record<string, unknown> | null;
}

export interface SessionContextEntry {
  value: unknown;
  accumulationType: 'append' | 'replace' | 'merge';
  accumulatedCount: number;
  tokenEstimate: number | null;
  /** Key-level TTL expiry, when ContextSchemaEntry.ttlSeconds is set. */
  expiresAt: string | null;
}

export interface SessionContext {
  session: SessionSummary;
  contextEntries: Record<string, SessionContextEntry>;
}

export class SessionClient {
  constructor(
    private readonly sessionId: string,
    private readonly agentId: string,
    private readonly http: AxiosInstance,
  ) {}

  async context(): Promise<SessionContext> {
    const res = await this.http.get<SessionContext>(
      `/v1/agents/${this.agentId}/sessions/${encodeURIComponent(this.sessionId)}`,
    );
    return res.data;
  }

  async reset(): Promise<void> {
    await this.http.post(
      `/v1/agents/${this.agentId}/sessions/${encodeURIComponent(this.sessionId)}/reset`,
    );
  }

  async clear(_keys?: string[]): Promise<void> {
    await this.http.post(
      `/v1/agents/${this.agentId}/sessions/${encodeURIComponent(this.sessionId)}/reset`,
    );
  }

  async destroy(): Promise<void> {
    await this.http.delete(
      `/v1/agents/${this.agentId}/sessions/${encodeURIComponent(this.sessionId)}`,
    );
  }

  get id(): string {
    return this.sessionId;
  }
}

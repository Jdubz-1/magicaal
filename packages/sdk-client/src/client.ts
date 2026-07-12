import type { AgentDescriptor, MagiCaalClientConfig, RunStatus } from './types.js';
import { AgentClient } from './agent-client.js';
import { createHttpClient } from './http.js';

interface RunRecord {
  runId: string;
  status: RunStatus;
  output?: Record<string, unknown>;
  error?: { code: string; message: string };
  startedAt?: number;
  completedAt?: number;
}

export class MagiCaalClient {
  private readonly http;

  constructor(config: MagiCaalClientConfig) {
    this.http = createHttpClient(config);
  }

  agent<TIn = Record<string, unknown>, TOut = Record<string, unknown>>(
    id: string,
  ): AgentClient<TIn, TOut>;
  agent<TIn, TOut>(descriptor: AgentDescriptor<TIn, TOut>): AgentClient<TIn, TOut>;
  agent<TIn = Record<string, unknown>, TOut = Record<string, unknown>>(
    idOrDescriptor: string | AgentDescriptor<TIn, TOut>,
  ): AgentClient<TIn, TOut> {
    if (typeof idOrDescriptor === 'string') {
      return new AgentClient<TIn, TOut>(idOrDescriptor, this.http);
    }
    return new AgentClient<TIn, TOut>(idOrDescriptor.agentId, this.http, {
      inputSchema: idOrDescriptor.inputSchema,
    });
  }

  /** Direct run utilities that don't require the owning AgentClient. */
  readonly runs = {
    get: async (runId: string): Promise<RunRecord> => {
      const res = await this.http.get<RunRecord>(`/v1/runs/${runId}`);
      return res.data;
    },
  };
}

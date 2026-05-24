import type { MagiCaalClientConfig } from './types';
import { AgentClient } from './agent-client';
import { createHttpClient } from './http';

export class MagiCaalClient {
  private readonly http;

  constructor(config: MagiCaalClientConfig) {
    this.http = createHttpClient(config);
  }

  agent<TIn = Record<string, unknown>, TOut = Record<string, unknown>>(
    id: string,
  ): AgentClient<TIn, TOut> {
    return new AgentClient<TIn, TOut>(id, this.http);
  }
}

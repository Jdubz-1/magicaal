import type { MagiCaalClientConfig } from './types.js';
import { AgentClient } from './agent-client.js';
import { createHttpClient } from './http.js';

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

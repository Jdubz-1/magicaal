import type { AxiosInstance } from 'axios';
import type { InvokeOptions, StartOptions } from './types';
import { RunHandleImpl } from './run-handle';

interface DispatchResponse {
  runId: string;
}

export class AgentClient<TIn = Record<string, unknown>, TOut = Record<string, unknown>> {
  constructor(
    private readonly agentId: string,
    private readonly http: AxiosInstance,
  ) {}

  async invoke(input: TIn, opts?: InvokeOptions): Promise<TOut> {
    const res = await this.http.post<DispatchResponse | TOut>(
      `/v1/agents/${this.agentId}/runs`,
      {
        input,
        mode: opts?.async ? 'async' : 'sync',
      },
      { timeout: opts?.timeout },
    );

    if (opts?.async) {
      const { runId } = res.data as DispatchResponse;
      const handle = new RunHandleImpl<TOut>(runId, this.agentId, this.http);
      return handle.wait();
    }

    return res.data as TOut;
  }

  async start(input: TIn, _opts?: StartOptions): Promise<RunHandleImpl<TOut>> {
    const res = await this.http.post<DispatchResponse>(
      `/v1/agents/${this.agentId}/runs`,
      { input, mode: 'async' },
    );
    const { runId } = res.data;
    return new RunHandleImpl<TOut>(runId, this.agentId, this.http);
  }
}

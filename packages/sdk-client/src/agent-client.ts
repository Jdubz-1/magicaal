import type { AxiosInstance } from 'axios';
import type { InvokeOptions, StartOptions, RunStreamEvent } from './types';
import { RunHandleImpl } from './run-handle';
import { streamRun } from './stream-client';
import { HumanReviewClient } from './human-review-client';

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

  /** Returns a HumanReviewClient for a suspended run, allowing approve/reject/modify. */
  reviewRun(runId: string): HumanReviewClient {
    return new HumanReviewClient(this.agentId, runId, this.http);
  }

  async *stream(
    input: TIn,
    opts?: StartOptions,
  ): AsyncGenerator<RunStreamEvent, void, unknown> {
    const res = await this.http.post<DispatchResponse>(
      `/v1/agents/${this.agentId}/runs`,
      { input, mode: 'async' },
      { signal: opts?.signal },
    );
    const { runId } = res.data;

    const baseUrl = (this.http.defaults.baseURL ?? '').replace(/\/$/, '');
    const authHeader = this.http.defaults.headers.common?.['Authorization'] as string | undefined;
    const headers: Record<string, string> = {};
    if (authHeader) headers['Authorization'] = authHeader;

    yield* streamRun(
      `${baseUrl}/v1/agents/${this.agentId}/runs/${runId}/stream`,
      headers,
      opts?.signal,
    );
  }
}

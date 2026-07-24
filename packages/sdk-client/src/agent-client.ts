import type { AxiosInstance } from 'axios';
import type { InvokeOptions, StartOptions, RunStreamEvent, RunListPage, RunStatus } from './types.js';
import type { ValidationIssue } from './errors.js';
import { RunHandleImpl } from './run-handle.js';
import { streamRun } from './stream-client.js';
import { HumanReviewClient } from './human-review-client.js';
import { SessionClient, type SessionSummary } from './session-client.js';
import { validateAgainstSchema } from './schema-validate.js';

interface DispatchResponse {
  runId: string;
  sessionId?: string;
}

export interface AgentClientOptions {
  /** Input schema from a generated descriptor — lets validate() work offline. */
  inputSchema?: object | null;
}

export class AgentClient<TIn = Record<string, unknown>, TOut = Record<string, unknown>> {
  private inputSchema: object | null | undefined;

  constructor(
    private readonly agentId: string,
    private readonly http: AxiosInstance,
    options?: AgentClientOptions,
  ) {
    this.inputSchema = options?.inputSchema;
  }

  /**
   * Pre-flight input validation against the agent's input schema. Uses the
   * descriptor schema when the client was built from one; otherwise fetches
   * it once from the API. Returns an empty array when the input is valid or
   * the agent declares no input schema.
   */
  async validate(input: TIn): Promise<ValidationIssue[]> {
    if (this.inputSchema === undefined) {
      try {
        const res = await this.http.get<{ inputSchema: object }>(
          `/v1/agents/${this.agentId}/schema/input`,
        );
        this.inputSchema = res.data.inputSchema;
      } catch {
        this.inputSchema = null; // no schema declared — nothing to validate against
      }
    }
    if (!this.inputSchema) return [];
    return validateAgainstSchema(input, this.inputSchema);
  }

  /** Return a SessionClient for reading/clearing a specific session. */
  session(sessionId: string): SessionClient {
    return new SessionClient(sessionId, this.agentId, this.http);
  }

  /** Convenience accessors for session management. */
  readonly sessions = {
    list: async (opts?: { status?: string; limit?: number }): Promise<SessionSummary[]> => {
      const params = new URLSearchParams();
      if (opts?.status) params.set('status', opts.status);
      if (opts?.limit) params.set('limit', String(opts.limit));
      const res = await this.http.get<SessionSummary[]>(
        `/v1/agents/${this.agentId}/sessions?${params.toString()}`,
      );
      return res.data;
    },
  };

  async invoke(input: TIn, opts?: InvokeOptions): Promise<TOut> {
    const res = await this.http.post<DispatchResponse | TOut>(
      `/v1/agents/${this.agentId}/runs`,
      {
        input,
        mode: opts?.async ? 'async' : 'sync',
        ...(opts?.sessionId && { session_id: opts.sessionId }),
        ...(opts?.sessionMetadata && { session_metadata: opts.sessionMetadata }),
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

  async start(input: TIn, opts?: StartOptions): Promise<RunHandleImpl<TOut>> {
    const res = await this.http.post<DispatchResponse>(
      `/v1/agents/${this.agentId}/runs`,
      {
        input,
        mode: 'async',
        ...(opts?.sessionId && { session_id: opts.sessionId }),
        ...(opts?.sessionMetadata && { session_metadata: opts.sessionMetadata }),
      },
    );
    const { runId } = res.data;
    return new RunHandleImpl<TOut>(runId, this.agentId, this.http);
  }

  /** Run history for this agent (ALIGN-021), newest first. */
  async listRuns(opts?: { status?: RunStatus; limit?: number; offset?: number }): Promise<RunListPage> {
    const params = new URLSearchParams();
    if (opts?.status) params.set('status', opts.status);
    if (opts?.limit) params.set('limit', String(opts.limit));
    if (opts?.offset) params.set('offset', String(opts.offset));
    const res = await this.http.get<RunListPage>(
      `/v1/agents/${this.agentId}/runs?${params.toString()}`,
    );
    return res.data;
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

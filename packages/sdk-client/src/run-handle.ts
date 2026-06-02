import type { AxiosInstance } from 'axios';
import type { RunHandle, RunStatus, RunStep } from './types';
import { RunFailedError, RunSuspendedError } from './errors';

const TERMINAL_STATUSES = new Set<RunStatus>(['completed', 'failed', 'suspended', 'cancelled']);

interface RunResponse {
  id: string;
  status: RunStatus;
  output: Record<string, unknown> | null;
  error: { code: string; message: string } | null;
  reviewId?: string;
}

export class RunHandleImpl<TOut = Record<string, unknown>> implements RunHandle<TOut> {
  readonly id: string;
  private readonly agentId: string;
  private readonly http: AxiosInstance;

  constructor(runId: string, agentId: string, http: AxiosInstance) {
    this.id = runId;
    this.agentId = agentId;
    this.http = http;
  }

  async wait(): Promise<TOut> {
    return this._poll();
  }

  private async _poll(pollIntervalMs = 1000): Promise<TOut> {
    for (;;) {
      const run = await this.status();
      if (run === 'failed') {
        const detail = await this._getRun();
        throw new RunFailedError(this.id, detail.error?.message ?? 'Run failed');
      }
      if (run === 'suspended') {
        const detail = await this._getRun();
        throw new RunSuspendedError(this.id, detail.reviewId ?? '');
      }
      if (run === 'completed') {
        const detail = await this._getRun();
        return (detail.output ?? {}) as TOut;
      }
      if (run === 'cancelled') {
        throw new RunFailedError(this.id, 'Run was cancelled');
      }
      await new Promise((r) => setTimeout(r, pollIntervalMs));
    }
  }

  async cancel(): Promise<void> {
    await this.http.delete(`/v1/agents/${this.agentId}/runs/${this.id}`);
  }

  async status(): Promise<RunStatus> {
    const run = await this._getRun();
    return run.status;
  }

  async steps(): Promise<RunStep[]> {
    const res = await this.http.get<RunStep[]>(`/v1/agents/${this.agentId}/runs/${this.id}/steps`);
    return res.data;
  }

  private async _getRun(): Promise<RunResponse> {
    const res = await this.http.get<RunResponse>(`/v1/agents/${this.agentId}/runs/${this.id}`);
    return res.data;
  }
}

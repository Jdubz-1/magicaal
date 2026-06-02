import type { AxiosInstance } from 'axios';

export interface ReviewDetails {
  runId: string;
  reviewId: string;
  status: string;
  contextSnapshot?: Record<string, unknown>;
}

export class HumanReviewClient {
  constructor(
    private readonly agentId: string,
    private readonly runId: string,
    private readonly http: AxiosInstance,
  ) {}

  async approve(): Promise<void> {
    await this.http.post(`/v1/agents/${this.agentId}/runs/${this.runId}/review`, {
      action: 'approve',
    });
  }

  async reject(reason?: string): Promise<void> {
    await this.http.post(`/v1/agents/${this.agentId}/runs/${this.runId}/review`, {
      action: 'reject',
      reason,
    });
  }

  async modify(modifications: Record<string, unknown>): Promise<void> {
    await this.http.post(`/v1/agents/${this.agentId}/runs/${this.runId}/review`, {
      action: 'approve',
      modifications,
    });
  }

  async details(): Promise<ReviewDetails> {
    const res = await this.http.get<ReviewDetails>(
      `/v1/agents/${this.agentId}/runs/${this.runId}`,
    );
    return res.data;
  }

  /** Poll for pending review on this agent. Calls handler when a run is found in 'suspended' status. */
  onPendingReview(
    handler: (client: HumanReviewClient) => void | Promise<void>,
    opts?: { intervalMs?: number; maxPolls?: number },
  ): () => void {
    const intervalMs = opts?.intervalMs ?? 5000;
    const maxPolls = opts?.maxPolls ?? Infinity;
    let polls = 0;
    let stopped = false;

    const poll = async () => {
      if (stopped || polls >= maxPolls) return;
      polls++;

      try {
        const res = await this.http.get<{ status: string; reviewId?: string }>(
          `/v1/agents/${this.agentId}/runs/${this.runId}`,
        );
        if (res.data.status === 'suspended') {
          await handler(this);
        }
      } catch {
        // non-fatal poll error
      }

      if (!stopped && polls < maxPolls) {
        setTimeout(poll, intervalMs);
      }
    };

    setTimeout(poll, 0);
    return () => { stopped = true; };
  }
}

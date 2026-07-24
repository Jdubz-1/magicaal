export interface MagiCaalClientConfig {
  baseUrl: string;
  /**
   * A per-agent invocation key (`ik_...`), issued from Admin or
   * `POST /v1/agents/:id/invocation-keys`. Scoped to one agent, and validated
   * against that agent's invocation policy. This is the credential you give to
   * an external consumer.
   *
   * Agents whose policy is `public` need no credential at all; omit both this
   * and `bearer`.
   */
  apiKey?: string;
  /**
   * A platform bearer token — a Studio session JWT, or a platform API key
   * (`mk_...`). Carries full tenant access and bypasses the agent's invocation
   * policy, so prefer `apiKey` for anything you hand to a third party.
   */
  bearer?: string;
  timeout?: number;
  /**
   * Opt-in request retry. Omitted = exactly one attempt per request.
   * Note that run dispatch (`POST /v1/agents/:id/runs`) is not idempotent:
   * a retry after an ambiguous network failure may dispatch the run twice.
   * Streaming requests are never retried.
   */
  retry?: RetryConfig;
}

export interface RetryConfig {
  /** Total attempts per request, including the first. */
  maxAttempts: number;
  backoff: 'fixed' | 'exponential';
  /** Base delay between attempts; a server Retry-After header takes precedence. */
  delayMs: number;
  /** Status codes to retry, as strings (e.g. '429', '503'), plus 'network'. Defaults to network + 429 + 5xx. */
  retryOn?: string[];
}

export interface AgentClientConfig {
  agentId: string;
}

export interface InvokeOptions {
  sessionId?: string;
  sessionMetadata?: Record<string, unknown>;
  timeout?: number;
  async?: boolean;
}

export interface StartOptions extends InvokeOptions {
  signal?: AbortSignal;
}

export type RunStatus =
  | 'pending'
  | 'running'
  | 'completed'
  | 'suspended'
  | 'failed'
  | 'cancelled';

export interface RunStep {
  id: string;
  nodeId: string;
  nodeType: string;
  status: string;
  startedAt: number;
  completedAt?: number;
  inputs?: Record<string, unknown>;
  outputs?: Record<string, unknown>;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetAt: number;
}

/** A single row from an agent's run history (ALIGN-021). */
export interface RunSummary {
  id: string;
  agentId: string;
  triggerType: string;
  status: RunStatus;
  startedAt: number;
  completedAt?: number;
  durationMs?: number;
  tokenUsage: {
    promptTokens: number;
    completionTokens: number;
    estimatedCostUsd: number;
  };
}

export interface RunListPage {
  runs: RunSummary[];
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface RunHandle<TOut = Record<string, unknown>> {
  readonly id: string;
  wait(): Promise<TOut>;
  cancel(): Promise<void>;
  status(): Promise<RunStatus>;
  steps(): Promise<RunStep[]>;
}

// Stream event types
export type RunStreamEvent =
  | RunStartedEvent
  | NodeStartedEvent
  | NodeCompletedEvent
  | NodeFailedEvent
  | RunCompletedEvent
  | RunFailedEvent
  | RunSuspendedEvent
  | RunCancelledEvent
  | RunRetryingEvent;

export interface RunStartedEvent {
  type: 'run.started';
  runId: string;
  agentId: string;
  timestamp: string;
}

export interface NodeStartedEvent {
  type: 'node.started';
  runId: string;
  nodeId: string;
  nodeType: string;
  timestamp: string;
}

export interface NodeCompletedEvent {
  type: 'node.completed';
  runId: string;
  nodeId: string;
  nodeType: string;
  outputs: Record<string, unknown>;
  timestamp: string;
}

export interface NodeFailedEvent {
  type: 'node.failed';
  runId: string;
  nodeId: string;
  nodeType: string;
  error: { code: string; message: string };
  timestamp: string;
}

export interface RunCompletedEvent {
  type: 'run.completed';
  runId: string;
  output: Record<string, unknown>;
  timestamp: string;
}

export interface RunFailedEvent {
  type: 'run.failed';
  runId: string;
  error: { code: string; message: string };
  timestamp: string;
}

export interface RunSuspendedEvent {
  type: 'run.suspended';
  runId: string;
  reviewId: string;
  timestamp: string;
}

export interface RunCancelledEvent {
  type: 'run.cancelled';
  runId: string;
  timestamp: string;
}

export interface RunRetryingEvent {
  type: 'run.retrying';
  runId: string;
  nodeId: string;
  attempt: number;
  delayMs: number;
  timestamp: string;
}

/**
 * Generated agent descriptor (written by `magicaal generate`). Carries the
 * agent identity and schemas plus phantom type parameters so
 * `client.agent(descriptor)` is fully typed with no manual generics.
 */
export interface AgentDescriptor<TIn = Record<string, unknown>, TOut = Record<string, unknown>> {
  agentId: string;
  handle: string;
  /** SHA-256 of the schemas at generation time — used for drift detection. */
  schemaHash: string;
  inputSchema: object | null;
  outputSchema: object | null;
  /** Phantom fields carrying the generated types; never populated at runtime. */
  __in?: TIn;
  __out?: TOut;
}

export interface MagiCaalClientConfig {
  baseUrl: string;
  apiKey?: string;
  bearer?: string;
  timeout?: number;
  retry?: RetryConfig;
}

export interface RetryConfig {
  maxAttempts: number;
  backoff: 'fixed' | 'exponential';
  delayMs: number;
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
  | RunSuspendedEvent;

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

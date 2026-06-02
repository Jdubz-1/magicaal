import type { TokenUsage, CanonicalLLMRequest, CanonicalLLMResponse, ModelRouterConfig } from '@magicaal/core';

export interface ResolvedCredentials {
  type: 'oauth' | 'apikey';
  accessToken?: string;
  apiKey?: string;
  expiresAt?: number;
  extra?: Record<string, unknown>;
}

export interface TrajectoryStep {
  iteration: number;
  reasoning?: string;
  toolSelected?: string;
  toolInputs?: Record<string, unknown>;
  toolOutputs?: Record<string, unknown>;
  llmResponse?: string;
}

export interface ExecutionContext {
  readonly runId: string;
  readonly agentId: string;
  readonly tenantId: string;
  readonly triggerType: string;

  data: Record<string, unknown>;

  get<T = unknown>(key: string): T | undefined;
  set(key: string, value: unknown): void;
  evaluate(expression: string): Promise<unknown>;
  resolvePrompt(name: string, version?: number): Promise<string>;

  readonly credentials: Record<string, ResolvedCredentials>;

  log(
    level: 'debug' | 'info' | 'warn' | 'error',
    message: string,
    meta?: Record<string, unknown>,
  ): void;
  metric(name: string, value: number): void;
  recordTokenUsage(usage: TokenUsage): void;
  recordTrajectoryStep(step: TrajectoryStep): void;

  suspend(reviewId: string): void;
  emit(event: string, payload: unknown): void;

  // LLM invocation routed through the configured provider adapter registry
  llmCall(
    request: CanonicalLLMRequest,
    routerConfig?: ModelRouterConfig | null,
  ): Promise<CanonicalLLMResponse>;
}

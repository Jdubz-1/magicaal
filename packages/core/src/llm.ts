import type { TokenUsage } from './run';

// ── Canonical LLM Types ────────────────────────────────────────────────────

export interface CanonicalLLMRequest {
  system?: string;
  messages: CanonicalMessage[];
  tools?: CanonicalTool[];
  outputSchema?: object;
  maxTokens?: number;
  temperature?: number;
  metadata?: Record<string, unknown>;
}

export interface CanonicalMessage {
  role: 'user' | 'assistant' | 'tool_result';
  content: string | CanonicalContentBlock[];
  toolCallId?: string;
}

export type CanonicalContentBlock =
  | { type: 'text'; text: string }
  | { type: 'image'; data: string; mimeType: string }
  | { type: 'tool_use'; id: string; name: string; input: Record<string, unknown> };

export interface CanonicalTool {
  name: string;
  description: string;
  inputSchema: object;
}

export interface CanonicalLLMResponse {
  content: string;
  toolCalls?: CanonicalToolCall[];
  stopReason: 'end_turn' | 'tool_use' | 'max_tokens' | 'content_filter' | 'error';
  usage: TokenUsage;
  routingMeta: {
    targetUsed: ModelRouterTarget;
    attemptCount: number;
    triggerHistory: RouterTriggerEvent[];
  };
}

export interface CanonicalToolCall {
  id: string;
  name: string;
  input: Record<string, unknown>;
}

// ── Model Router Types ─────────────────────────────────────────────────────

export type ModelRouterStrategy =
  | 'priority'
  | 'round-robin'
  | 'weighted'
  | 'least-latency'
  | 'cost-optimized';

export type RouterTriggerCondition =
  | { type: 'rate_limit' }
  | { type: 'provider_error'; statusCodes?: number[] }
  | { type: 'timeout'; thresholdMs: number }
  | { type: 'context_overflow' }
  | { type: 'content_policy' }
  | { type: 'latency_degraded'; p50ThresholdMs: number }
  | { type: 'error_rate'; threshold: number; windowMs: number };

export interface RouterTrigger {
  condition: RouterTriggerCondition;
  action: 'next_in_chain' | 'least_latency' | 'cheapest';
}

export interface RouterTriggerEvent {
  target: ModelRouterTarget;
  trigger: RouterTriggerCondition;
  skipped?: boolean;
}

export interface CircuitBreakerConfig {
  failureThreshold: number;
  errorRateThreshold: number;
  windowMs: number;
  cooldownMs: number;
  halfOpenProbeCount: number;
}

export interface ModelRouterTarget {
  id: string;
  connectionId: string;
  provider: string;
  model: string;
  weight?: number;
  maxTokensOverride?: number;
  contextWindowOverride?: number;
}

export interface ModelRouterConfig {
  name?: string;
  strategy: ModelRouterStrategy;
  targets: ModelRouterTarget[];
  triggers: RouterTrigger[];
  circuitBreaker?: CircuitBreakerConfig;
  streamFailureBehavior?: 'restart_with_next' | 'fail';
}

export interface NamedRouterPolicy extends ModelRouterConfig {
  name: string;
  overridable: boolean;
}

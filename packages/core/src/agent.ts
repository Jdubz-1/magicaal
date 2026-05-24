import type { ModelRouterConfig } from './llm';
import type { SessionConfig } from './session';

export interface AgentConfig {
  trigger: TriggerConfig;
  concurrency: ConcurrencyConfig;
  retry: RetryConfig;
  timeout?: number;
  invocationAuth?: InvocationAuthConfig;
  rateLimit?: RateLimitConfig;
  session?: SessionConfig;
  defaultRouter?: string | ModelRouterConfig;
}

export type TriggerConfig =
  | { type: 'rest'; mode: 'sync' | 'async' }
  | { type: 'cron'; expression: string }
  | { type: 'webhook' }
  | { type: 'integration'; service: string; event: string };

export interface ConcurrencyConfig {
  maxParallel: number;
  queueTimeout: number;
}

export interface RetryConfig {
  maxAttempts: number;
  backoff: 'fixed' | 'exponential';
  delayMs: number;
}

export interface InvocationAuthConfig {
  strategy: 'api-key' | 'jwt' | 'public';
  overridable?: boolean;
  jwtConfig?: {
    issuer: string;
    jwksUrl: string;
    audience?: string;
    requiredClaims?: Record<string, string>;
  };
}

export interface RateLimitConfig {
  requestsPerWindow: number;
  windowSeconds: number;
  limitBy: 'tenant' | 'key' | 'ip';
}

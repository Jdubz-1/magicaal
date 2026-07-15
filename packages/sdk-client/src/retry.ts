import type { RetryConfig } from './types.js';

export interface RetryPlan {
  retry: boolean;
  delayMs: number;
}

/** Statuses retried when RetryConfig.retryOn is not set: 429 and all 5xx. */
function isDefaultRetryable(status: number | undefined): boolean {
  if (status === undefined) return true; // network error — nothing was received
  return status === 429 || (status >= 500 && status <= 599);
}

/**
 * Parse a Retry-After header value: delta-seconds or an HTTP-date (RFC 9110).
 * Returns milliseconds from now, or undefined when unparseable.
 */
export function parseRetryAfterMs(value: string | undefined, nowMs: number = Date.now()): number | undefined {
  if (!value) return undefined;
  const seconds = Number(value);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);
  const dateMs = Date.parse(value);
  if (!Number.isNaN(dateMs)) return Math.max(0, dateMs - nowMs);
  return undefined;
}

/**
 * Decide whether a failed request gets another attempt (ALIGN-023).
 *
 * `attempt` is the number of attempts already made, including the one that
 * just failed — so with `maxAttempts: 3`, attempts 1 and 2 may retry and
 * attempt 3 surfaces the error. `retryOn` overrides the default retryable
 * set with explicit status codes (as strings) and/or the literal 'network'.
 * A server-provided `retryAfterMs` takes precedence over the configured
 * backoff delay.
 */
export function computeRetryPlan(args: {
  status?: number;
  attempt: number;
  config: RetryConfig;
  retryAfterMs?: number;
}): RetryPlan {
  const { status, attempt, config, retryAfterMs } = args;

  if (attempt >= config.maxAttempts) return { retry: false, delayMs: 0 };

  const retryable = config.retryOn
    ? config.retryOn.includes(status === undefined ? 'network' : String(status))
    : isDefaultRetryable(status);
  if (!retryable) return { retry: false, delayMs: 0 };

  const backoffMs =
    config.backoff === 'exponential' ? config.delayMs * 2 ** (attempt - 1) : config.delayMs;

  return { retry: true, delayMs: retryAfterMs ?? backoffMs };
}

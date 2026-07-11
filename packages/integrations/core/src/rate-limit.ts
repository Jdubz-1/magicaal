export interface RateLimitInfo {
  /** Maximum requests in the current window, if reported. */
  limit?: number;
  /** Requests remaining in the current window, if reported. */
  remaining?: number;
  /** Epoch milliseconds when the window resets, if reported. */
  resetAt?: number;
  /** Milliseconds the caller should wait before retrying, if reported. */
  retryAfterMs?: number;
}

function toNumber(value: string | null): number | undefined {
  if (value === null) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

/**
 * Normalizes the rate-limit header variants used across services into one
 * shape. Handles `X-RateLimit-*` (GitHub, Slack tier headers omitted — Slack
 * uses Retry-After only), `RateLimit-*` (IETF draft), and `Retry-After`
 * (both delta-seconds and HTTP-date forms).
 *
 * Reset headers are interpreted as epoch seconds when the value is large
 * enough to be a timestamp, otherwise as delta seconds from now.
 */
export function parseRateLimitHeaders(headers: Headers, nowMs: number = Date.now()): RateLimitInfo {
  const info: RateLimitInfo = {};

  info.limit = toNumber(headers.get('x-ratelimit-limit')) ?? toNumber(headers.get('ratelimit-limit'));
  info.remaining =
    toNumber(headers.get('x-ratelimit-remaining')) ?? toNumber(headers.get('ratelimit-remaining'));

  const reset = toNumber(headers.get('x-ratelimit-reset')) ?? toNumber(headers.get('ratelimit-reset'));
  if (reset !== undefined) {
    // Epoch-seconds timestamps are > 1e9; anything smaller is delta seconds.
    info.resetAt = reset > 1_000_000_000 ? reset * 1000 : nowMs + reset * 1000;
  }

  const retryAfter = headers.get('retry-after');
  if (retryAfter !== null) {
    const seconds = Number(retryAfter);
    if (Number.isFinite(seconds)) {
      info.retryAfterMs = Math.max(0, seconds * 1000);
    } else {
      const dateMs = Date.parse(retryAfter);
      if (!Number.isNaN(dateMs)) {
        info.retryAfterMs = Math.max(0, dateMs - nowMs);
      }
    }
  }

  return info;
}

/**
 * True when the response indicates the client is rate limited (429, or a
 * remaining count of 0 with a known reset).
 */
export function isRateLimited(status: number, info: RateLimitInfo): boolean {
  return status === 429 || (info.remaining === 0 && info.resetAt !== undefined);
}

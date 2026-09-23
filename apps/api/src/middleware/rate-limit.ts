import rateLimit, { type RateLimitRequestHandler } from 'express-rate-limit';
import { config } from '../config';

/**
 * Rate limiting for the tenant-facing API.
 *
 * Until now there was none: the only limiter in the platform guards agent
 * *invocation* auth in the engine, which leaves `/v1/auth/login` — and every
 * other tenant route — unthrottled. CodeQL flagged 46 routes for this, and on
 * the login route it is a real brute-force vector rather than a lint nit.
 *
 * Two tiers, because they defend different things:
 *
 *  - `authRateLimit` is strict and exists for credential stuffing. Its budget
 *    is per window, not per endpoint, so an attacker cannot spread attempts
 *    across login/refresh/register to multiply it.
 *  - `apiRateLimit` is loose and exists to stop one client exhausting the
 *    process, not to police normal use. A busy Studio session makes a lot of
 *    calls and must never trip it.
 *
 * Deliberately **not** applied to `/internal/*` — that is engine-to-API
 * traffic (session load and save happen on every run), and throttling it would
 * throttle agent execution itself. Health checks are likewise exempt so a
 * monitor cannot rate-limit itself out of observing the service.
 */

/** Shared across both limiters so a 429 always looks the same to a client. */
const common = {
  windowMs: config.rateLimitWindowMs,
  // `draft-7` emits the standard `RateLimit` header; the legacy
  // `X-RateLimit-*` set is off because nothing in this codebase reads it.
  standardHeaders: 'draft-7' as const,
  legacyHeaders: false,
  message: { error: 'Too many requests', code: 'RATE_LIMITED' },
};

/**
 * Login, refresh, register. Counted together on purpose — see above.
 */
export const authRateLimit: RateLimitRequestHandler = rateLimit({
  ...common,
  limit: config.rateLimitAuthMax,
});

/** Everything else under `/v1`. */
export const apiRateLimit: RateLimitRequestHandler = rateLimit({
  ...common,
  limit: config.rateLimitApiMax,
});

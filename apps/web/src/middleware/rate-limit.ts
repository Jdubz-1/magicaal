import rateLimit, { type RateLimitRequestHandler } from 'express-rate-limit';
import { config } from '../config';

/**
 * Rate limiting for the browser-facing app.
 *
 * `apps/api` already has limiters, and at first glance that makes one here
 * redundant: every call this app makes is proxied there. It is not, and the
 * reason is worth writing down.
 *
 * `createApiClient` calls the API **server-side**, forwarding no
 * `X-Forwarded-For`. So every browser's request reaches the API from this
 * container's single address, and the API's per-IP limiter sees one client.
 * Its strict `/v1/auth` budget is therefore not ten attempts per attacker — it
 * is ten attempts *in total*, shared by every operator who logs in through the
 * UI. That fails twice over: an attacker is not individually limited, and
 * spending the shared budget locks everyone else out of logging in.
 *
 * This app is the layer that can see the real client address, so this is where
 * the per-client budget belongs. The API's limiter stays as the backstop for
 * direct calls.
 *
 * `/health` is exempt — it is registered before these — so a monitor cannot
 * rate-limit itself out of observing the service.
 */

const common = {
  windowMs: config.rateLimitWindowMs,
  standardHeaders: 'draft-7' as const,
  legacyHeaders: false,
};

/**
 * The login form. Strict, because this is the credential-stuffing surface and
 * the only route here where a failed request is as interesting to an attacker
 * as a successful one.
 */
export const loginRateLimit: RateLimitRequestHandler = rateLimit({
  ...common,
  limit: config.rateLimitLoginMax,
  message: 'Too many sign-in attempts. Try again later.',
});

/**
 * Everything else. Loose: this exists to stop one client exhausting the
 * process, not to police normal use — an admin clicking through pages, each of
 * which fans out to several API calls, must never trip it.
 */
export const pageRateLimit: RateLimitRequestHandler = rateLimit({
  ...common,
  limit: config.rateLimitMax,
  message: 'Too many requests. Try again later.',
});

export function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required environment variable: ${key}`);
  return val;
}

/**
 * `parseInt` only falls back when a variable is absent: `API_TIMEOUT_MS=` or
 * `CAAL_TIMEOUT_MS=125s` yields NaN, and axios reads a falsy timeout as *no*
 * timeout — the proxy would hang forever, which is the failure these budgets
 * exist to prevent.
 */
export function positiveIntEnv(value: string | undefined, fallback: number): number {
  // Number(), not parseInt(): parseInt('125s') is 125, so a unit suffix would
  // silently become a 125ms budget — worse than the default it replaced.
  const parsed = Number(value);
  return value !== undefined && value.trim() !== '' && Number.isInteger(parsed) && parsed > 0
    ? parsed
    : fallback;
}

/**
 * Express's `trust proxy`, which decides what `req.ip` means and therefore what
 * the rate limiter counts.
 *
 * Defaults to `false`, for the same reason `apps/api` does: `true` behind an
 * untrusted hop lets a client send its own `X-Forwarded-For` and be counted as
 * a different address on every request, which is worse than no limiter because
 * the service looks protected. Set the number of trusted hops, or the proxy's
 * address — not `true`.
 */
function parseTrustProxy(raw: string | undefined): boolean | number | string {
  if (raw === undefined || raw.trim() === '' || raw === 'false') return false;
  if (raw === 'true') return true;
  const hops = Number(raw);
  if (Number.isInteger(hops) && hops >= 0) return hops;
  return raw; // an address or CIDR list; Express parses it
}

export const config = Object.freeze({
  port: parseInt(process.env.PORT ?? '8080', 10),
  trustProxy: parseTrustProxy(process.env.TRUST_PROXY),
  rateLimitWindowMs: positiveIntEnv(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  rateLimitLoginMax: positiveIntEnv(process.env.LOGIN_RATE_LIMIT_MAX, 10),
  rateLimitMax: positiveIntEnv(process.env.RATE_LIMIT_MAX, 600),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  apiBaseUrl: process.env.API_BASE_URL ?? 'http://api:3000',
  apiTimeoutMs: positiveIntEnv(process.env.API_TIMEOUT_MS, 15000),
  // Caal invokes block until the run finishes; the API waits
  // CAAL_INVOKE_TIMEOUT_MS (120s) before answering CAAL_STILL_RUNNING, which
  // the Studio panel handles. A shorter budget here aborted turns that were
  // seconds from completing and reported them as "API unreachable".
  caalTimeoutMs: positiveIntEnv(process.env.CAAL_TIMEOUT_MS, 125000),
  jwtSecret: requireEnv('JWT_SECRET'),
  cookieSecret: process.env.COOKIE_SECRET ?? 'dev-cookie-secret',
  marketplaceEnabled: process.env.MARKETPLACE_ENABLED === 'true',
});

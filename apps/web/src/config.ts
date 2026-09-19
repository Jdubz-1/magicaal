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

export const config = Object.freeze({
  port: parseInt(process.env.PORT ?? '8080', 10),
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

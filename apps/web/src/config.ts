export function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required environment variable: ${key}`);
  return val;
}

export const config = Object.freeze({
  port: parseInt(process.env.PORT ?? '8080', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  apiBaseUrl: process.env.API_BASE_URL ?? 'http://api:3000',
  apiTimeoutMs: parseInt(process.env.API_TIMEOUT_MS ?? '15000', 10),
  // Caal invokes block until the run finishes; the API waits
  // CAAL_INVOKE_TIMEOUT_MS (120s) before answering CAAL_STILL_RUNNING, which
  // the Studio panel handles. A shorter budget here aborted turns that were
  // seconds from completing and reported them as "API unreachable".
  caalTimeoutMs: parseInt(process.env.CAAL_TIMEOUT_MS ?? '125000', 10),
  jwtSecret: requireEnv('JWT_SECRET'),
  cookieSecret: process.env.COOKIE_SECRET ?? 'dev-cookie-secret',
  marketplaceEnabled: process.env.MARKETPLACE_ENABLED === 'true',
});

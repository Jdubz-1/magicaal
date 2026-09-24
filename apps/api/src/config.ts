export function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required environment variable: ${key}`);
  return val;
}

/**
 * `parseInt` only falls back when a variable is absent: `RATE_LIMIT_MAX=` or
 * `RATE_LIMIT_MAX=600req` yields NaN, and a NaN limit disables the limiter
 * silently — the opposite of what setting it was meant to do. Number() plus an
 * integer check refuses anything that is not a clean number.
 */
function positiveIntEnv(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return value !== undefined && value.trim() !== '' && Number.isInteger(parsed) && parsed > 0
    ? parsed
    : fallback;
}

/**
 * Express's `trust proxy`, which decides what `req.ip` means and therefore what
 * the rate limiter counts.
 *
 * Deliberately defaults to `false`. Setting it to `true` behind anything the
 * operator does not control lets a client send its own `X-Forwarded-For` and
 * be counted as a different address on every request — that is worse than no
 * limiter, because the service looks protected and is not. Operators running
 * behind a reverse proxy should set the number of trusted hops, or the
 * proxy's address, not `true`.
 */
function parseTrustProxy(raw: string | undefined): boolean | number | string {
  if (raw === undefined || raw.trim() === '' || raw === 'false') return false;
  if (raw === 'true') return true;
  const hops = Number(raw);
  if (Number.isInteger(hops) && hops >= 0) return hops;
  return raw; // an address or CIDR list; Express parses it
}

export const config = Object.freeze({
  port: parseInt(process.env.PORT ?? '3000', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  logLevel: process.env.LOG_LEVEL ?? 'info',
  databasePath: requireEnv('DATABASE_URL'),
  masterKey: process.env.MAGICAAL_MASTER_KEY ?? '',
  jwtSecret: requireEnv('JWT_SECRET'),
  engineBaseUrl: process.env.ENGINE_BASE_URL ?? 'http://engine:4000',
  publicBaseUrl: process.env.PUBLIC_BASE_URL ?? `http://localhost:${parseInt(process.env.PORT ?? '3000', 10)}`,
  seedOnBoot: process.env.SEED_ON_BOOT === 'true',
  agentsDir: process.env.AGENTS_DIR ?? '/agents',
  marketplaceEnabled: process.env.MARKETPLACE_ENABLED === 'true',
  marketplaceCatalogSource: (process.env.MARKETPLACE_CATALOG_SOURCE ?? 'remote') as
    | 'remote'
    | 'local',
  marketplaceLocalCatalogPath:
    process.env.MARKETPLACE_LOCAL_CATALOG_PATH ?? '/marketplace/catalog.json',
  marketplaceApiUrl: process.env.MARKETPLACE_API_URL ?? 'https://marketplace.magicaal.dev',
  // invokeCaal polls the engine synchronously within the request lifecycle
  // (no SSE — see ISS-067). 120s covers the large majority of real Caal
  // requests without holding the connection anywhere near the engine's own
  // 10-minute run timeout; requests that outlast it get a distinct
  // CAAL_STILL_RUNNING response rather than a bare 504 (ISS-068).
  caalInvokeTimeoutMs: parseInt(process.env.CAAL_INVOKE_TIMEOUT_MS ?? '120000', 10),

  // Rate limiting. The window is shared; the two budgets are not.
  rateLimitWindowMs: positiveIntEnv(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  // Credential stuffing is the threat here, so this is tight. Ten attempts per
  // quarter hour is generous for a human and useless for a script.
  rateLimitAuthMax: positiveIntEnv(process.env.AUTH_RATE_LIMIT_MAX, 10),
  // Loose on purpose: this exists to stop one client exhausting the process,
  // not to police normal use. A busy Studio session makes a lot of calls.
  rateLimitApiMax: positiveIntEnv(process.env.RATE_LIMIT_MAX, 600),
  trustProxy: parseTrustProxy(process.env.TRUST_PROXY),
});

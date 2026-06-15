export function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required environment variable: ${key}`);
  return val;
}

export const config = Object.freeze({
  port: parseInt(process.env.PORT ?? '4000', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  logLevel: process.env.LOG_LEVEL ?? 'info',
  databasePath: requireEnv('DATABASE_URL'),
  telemetryDatabasePath: requireEnv('TELEMETRY_DATABASE_URL'),
  redisUrl: requireEnv('REDIS_URL'),
  masterKey: process.env.MAGICAAL_MASTER_KEY ?? '',
  apiBaseUrl: process.env.API_BASE_URL ?? 'http://api:3000',
  engineInternalUrl: process.env.ENGINE_INTERNAL_URL ?? 'http://localhost:4000',
});

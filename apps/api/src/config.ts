export function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required environment variable: ${key}`);
  return val;
}

export const config = Object.freeze({
  port: parseInt(process.env.PORT ?? '3000', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  logLevel: process.env.LOG_LEVEL ?? 'info',
  databasePath: requireEnv('DATABASE_URL'),
  masterKey: process.env.MAGICAAL_MASTER_KEY ?? '',
  jwtSecret: requireEnv('JWT_SECRET'),
  engineBaseUrl: process.env.ENGINE_BASE_URL ?? 'http://engine:4000',
});

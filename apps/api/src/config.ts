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
});

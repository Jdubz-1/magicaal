export function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required environment variable: ${key}`);
  return val;
}

export const config = Object.freeze({
  port: parseInt(process.env.PORT ?? '8080', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  apiBaseUrl: process.env.API_BASE_URL ?? 'http://api:3000',
  jwtSecret: requireEnv('JWT_SECRET'),
  cookieSecret: process.env.COOKIE_SECRET ?? 'dev-cookie-secret',
  marketplaceEnabled: process.env.MARKETPLACE_ENABLED === 'true',
});

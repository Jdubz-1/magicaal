import * as crypto from 'node:crypto';
import Database from 'better-sqlite3';
import { createRemoteJWKSet, jwtVerify, errors as joseErrors } from 'jose';
import { config } from '../config';
import { redis } from '../queue/client';
import { logger } from '../lib/logger';

let sqlite: Database.Database | null = null;

function getDb(): Database.Database {
  if (!sqlite) {
    const dbPath = config.databasePath.replace(/^file:/, '');
    sqlite = new Database(dbPath, { readonly: true });
    sqlite.pragma('journal_mode = WAL');
  }
  return sqlite;
}

function sha256hex(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

interface InvocationKeyRow {
  id: string;
  agent_id: string;
  tenant_id: string;
  expires_at: number | null;
}

interface InvocationPolicyRow {
  agent_id: string;
  strategy: 'api-key' | 'jwt' | 'public';
  jwt_config: string | null;
  rate_limit: string | null;
}

interface JwtConfig {
  jwksUrl: string;
  issuer?: string;
  audience?: string;
  requiredClaims?: Record<string, unknown>;
}

export interface ValidatedKey {
  keyId: string;
  agentId: string;
  tenantId: string;
}

const RATE_LIMIT_RPM = 1000;

// JWKS set cache to avoid refetching on every request
const jwksCache = new Map<string, ReturnType<typeof createRemoteJWKSet>>();

function getJwks(url: string): ReturnType<typeof createRemoteJWKSet> {
  if (!jwksCache.has(url)) {
    jwksCache.set(url, createRemoteJWKSet(new URL(url)));
  }
  return jwksCache.get(url)!;
}

async function enforceRateLimit(agentId: string): Promise<void> {
  const window = Math.floor(Date.now() / 60000);
  const rateLimitKey = `ratelimit:${agentId}:${window}`;
  const count = await redis.incr(rateLimitKey);
  if (count === 1) await redis.expire(rateLimitKey, 60);
  if (count > RATE_LIMIT_RPM) {
    throw Object.assign(new Error('Rate limit exceeded'), { status: 429, code: 'RATE_LIMITED' });
  }
}

async function validateApiKey(agentId: string, rawKey: string): Promise<ValidatedKey> {
  const keyHash = sha256hex(rawKey);
  const db = getDb();

  const row = db
    .prepare(
      `SELECT id, agent_id, tenant_id, expires_at
       FROM invocation_keys
       WHERE agent_id = ? AND key_hash = ? AND revoked = 0`,
    )
    .get(agentId, keyHash) as InvocationKeyRow | undefined;

  if (!row) {
    throw Object.assign(new Error('Invalid or revoked invocation key'), { status: 401, code: 'INVALID_KEY' });
  }

  if (row.expires_at && row.expires_at < Math.floor(Date.now() / 1000)) {
    throw Object.assign(new Error('Invocation key expired'), { status: 401, code: 'KEY_EXPIRED' });
  }

  await enforceRateLimit(agentId);

  return { keyId: row.id, agentId: row.agent_id, tenantId: row.tenant_id };
}

async function validateJwt(agentId: string, token: string, jwtConfig: JwtConfig): Promise<ValidatedKey> {
  const db = getDb();

  // Get tenant_id from agents table for the response
  const agentRow = db
    .prepare('SELECT tenant_id FROM agents WHERE id = ?')
    .get(agentId) as { tenant_id: string } | undefined;

  if (!agentRow) {
    throw Object.assign(new Error('Agent not found'), { status: 404, code: 'AGENT_NOT_FOUND' });
  }

  const jwks = getJwks(jwtConfig.jwksUrl);

  try {
    const { payload } = await jwtVerify(token, jwks, {
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience,
    });

    // Validate required claims
    if (jwtConfig.requiredClaims) {
      for (const [claim, expected] of Object.entries(jwtConfig.requiredClaims)) {
        if (payload[claim] !== expected) {
          throw Object.assign(
            new Error(`Required JWT claim "${claim}" missing or incorrect`),
            { status: 401, code: 'JWT_MISSING_CLAIM' },
          );
        }
      }
    }

    await enforceRateLimit(agentId);

    return { keyId: 'jwt', agentId, tenantId: agentRow.tenant_id };
  } catch (err) {
    if (err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === 'JWT_MISSING_CLAIM') {
      throw err;
    }
    if (err instanceof joseErrors.JWTExpired) {
      throw Object.assign(new Error('JWT token expired'), { status: 401, code: 'JWT_EXPIRED' });
    }
    if (err instanceof joseErrors.JWKSNoMatchingKey) {
      // Invalidate JWKS cache and retry once
      jwksCache.delete(jwtConfig.jwksUrl);
      throw Object.assign(new Error('JWT signature invalid — no matching key'), { status: 401, code: 'JWT_INVALID_SIGNATURE' });
    }
    if (err instanceof joseErrors.JWSSignatureVerificationFailed || err instanceof joseErrors.JWSInvalid) {
      throw Object.assign(new Error('JWT signature verification failed'), { status: 401, code: 'JWT_INVALID_SIGNATURE' });
    }
    logger.warn({ agentId, err }, 'JWT validation failed');
    throw Object.assign(new Error('JWT validation failed'), { status: 401, code: 'JWT_INVALID' });
  }
}

export async function validateInvocationRequest(
  agentId: string,
  authorizationHeader: string | undefined,
): Promise<ValidatedKey> {
  const db = getDb();

  const policy = db
    .prepare('SELECT agent_id, strategy, jwt_config, rate_limit FROM invocation_policies WHERE agent_id = ?')
    .get(agentId) as InvocationPolicyRow | undefined;

  const strategy = policy?.strategy ?? 'api-key';

  if (strategy === 'public') {
    const agentRow = db
      .prepare('SELECT tenant_id FROM agents WHERE id = ?')
      .get(agentId) as { tenant_id: string } | undefined;
    return { keyId: 'public', agentId, tenantId: agentRow?.tenant_id ?? '' };
  }

  const bearer = authorizationHeader?.replace(/^Bearer\s+/i, '').trim();
  if (!bearer) {
    throw Object.assign(new Error('Missing Authorization header'), { status: 401, code: 'MISSING_AUTH' });
  }

  if (strategy === 'jwt') {
    if (!policy?.jwt_config) {
      throw Object.assign(new Error('JWT strategy configured but no jwtConfig found'), { status: 500, code: 'JWT_CONFIG_MISSING' });
    }
    const jwtConfig = JSON.parse(policy.jwt_config) as JwtConfig;
    return validateJwt(agentId, bearer, jwtConfig);
  }

  // Default: api-key
  return validateApiKey(agentId, bearer);
}

// Backwards-compatible wrapper used by existing callers that pass a raw key
export async function validateInvocationKey(agentId: string, rawKey: string): Promise<ValidatedKey> {
  return validateApiKey(agentId, rawKey);
}

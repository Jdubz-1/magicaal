import type { Request, RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { apiKeys, users } from '../db/schema';
import { engineClient } from '../lib/engine-client';
import { verifyJwt } from '../lib/jwt';
import { config } from '../config';

function sha256hex(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

/** Constant-time secret comparison; both sides hashed so lengths always match. */
function secretsMatch(provided: string, expected: string): boolean {
  return crypto.timingSafeEqual(
    crypto.createHash('sha256').update(provided).digest(),
    crypto.createHash('sha256').update(expected).digest(),
  );
}

/**
 * Guards the API's /internal/* routes, called only by the engine over the
 * internal network. Fails closed when MAGICAAL_MASTER_KEY is unset.
 */
export const requireInternalAuth: RequestHandler = (req, _res, next) => {
  const header = req.headers['x-internal-auth'];
  const provided = Array.isArray(header) ? header[0] : header;

  if (!config.masterKey || !provided || !secretsMatch(provided, config.masterKey)) {
    return next(Object.assign(new Error('Internal auth required'), { status: 401 }));
  }
  next();
};

export const requireAuth: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw Object.assign(new Error('Missing or invalid Authorization header'), { status: 401 });
    }

    const token = authHeader.slice(7);

    if (token.startsWith('mk_')) {
      const keyHash = sha256hex(token);
      const rows = await db
        .select({
          id: apiKeys.id,
          tenantId: apiKeys.tenantId,
          userId: apiKeys.userId,
          revoked: apiKeys.revoked,
          expiresAt: apiKeys.expiresAt,
          role: users.role,
        })
        .from(apiKeys)
        .leftJoin(users, eq(users.id, apiKeys.userId))
        .where(eq(apiKeys.keyHash, keyHash));
      const row = rows[0];

      if (!row || row.revoked) {
        throw Object.assign(new Error('Invalid or revoked API key'), { status: 401 });
      }
      if (row.expiresAt && row.expiresAt < new Date()) {
        throw Object.assign(new Error('API key expired'), { status: 401 });
      }

      req.user = {
        userId: row.userId ?? '',
        tenantId: row.tenantId,
        role: (row.role ?? 'developer') as 'platform_admin' | 'tenant_admin' | 'developer' | 'viewer',
      };
    } else {
      let payload: Awaited<ReturnType<typeof verifyJwt>>;
      try {
        payload = await verifyJwt(token);
      } catch {
        throw Object.assign(new Error('Invalid or expired token'), { status: 401 });
      }
      req.user = {
        userId: payload.sub,
        tenantId: payload.tenantId,
        role: payload.role as 'platform_admin' | 'tenant_admin' | 'developer' | 'viewer',
      };
    }

    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Resolve a platform credential — a Studio JWT or a platform API key (`mk_`,
 * from `api_keys`) — or undefined when the token belongs to no platform
 * principal (an `ik_` invocation key, an external JWT, or nothing at all).
 *
 * Unlike requireAuth this never throws: on the run routes a non-platform token
 * is not an error, it is the other auth plane.
 */
async function resolvePlatformCaller(
  authHeader: string | undefined,
): Promise<NonNullable<Request['user']> | undefined> {
  if (!authHeader?.startsWith('Bearer ')) return undefined;
  const token = authHeader.slice(7);

  if (token.startsWith('ik_')) return undefined; // invocation plane, by prefix

  if (token.startsWith('mk_')) {
    const rows = await db
      .select({
        tenantId: apiKeys.tenantId,
        userId: apiKeys.userId,
        revoked: apiKeys.revoked,
        expiresAt: apiKeys.expiresAt,
        role: users.role,
      })
      .from(apiKeys)
      .leftJoin(users, eq(users.id, apiKeys.userId))
      .where(eq(apiKeys.keyHash, sha256hex(token)));

    const row = rows[0];
    // Not a platform key: fall through to the invocation plane, so a legacy
    // `mk_`-prefixed invocation key keeps working.
    if (!row) return undefined;
    if (row.revoked) throw Object.assign(new Error('Invalid or revoked API key'), { status: 401 });
    if (row.expiresAt && row.expiresAt < new Date()) {
      throw Object.assign(new Error('API key expired'), { status: 401 });
    }

    return {
      userId: row.userId ?? '',
      tenantId: row.tenantId,
      role: (row.role ?? 'developer') as NonNullable<Request['user']>['role'],
    };
  }

  try {
    const payload = await verifyJwt(token);
    return {
      userId: payload.sub,
      tenantId: payload.tenantId,
      role: payload.role as NonNullable<Request['user']>['role'],
    };
  } catch {
    // Not one of ours — may still be an external JWT for a `jwt`-strategy agent
    return undefined;
  }
}

/**
 * Auth for the agent-scoped run routes, which serve two different kinds of
 * caller and therefore cannot use requireAuth alone:
 *
 * 1. A tenant principal (Studio JWT / platform API key) acting on its own
 *    agent — bypasses the agent's invocation policy (ARCHITECTURE §11.4).
 * 2. A third party holding a credential the tenant issued for that one agent
 *    (`ik_` key, external JWT, or none at all for a `public` agent) — must
 *    satisfy the agent's invocation policy, which the engine evaluates.
 *
 * The engine owns the invocation-policy implementation (JWKS handling, the
 * Redis limiter); this delegates to it rather than duplicating it, so a request
 * is validated — and rate-limited — exactly once.
 */
export const authenticateAgentCaller: RequestHandler = async (req, _res, next) => {
  try {
    const agentId = req.params.id;

    const platform = await resolvePlatformCaller(req.headers.authorization);
    if (platform) {
      req.user = platform;
      req.caller = { kind: 'platform', strategy: 'platform' };
      return next();
    }

    const { data } = await engineClient.post('/internal/invocation-auth/validate', {
      agentId,
      authorizationHeader: req.headers.authorization,
    });
    const validated = data as { keyId: string; tenantId: string; strategy: string };

    req.user = { userId: '', tenantId: validated.tenantId, role: 'developer' };
    req.caller = {
      kind: 'invocation',
      strategy: validated.strategy,
      keyId: validated.keyId,
    };
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Same two planes as authenticateAgentCaller, for `GET /v1/runs/:runId`, which
 * carries no agent in its path. An invocation credential is scoped to one
 * agent, so the run is looked up first to discover which agent to validate
 * against. The controller re-checks tenant ownership of the run.
 */
export const authenticateRunCaller: RequestHandler = async (req, _res, next) => {
  try {
    const platform = await resolvePlatformCaller(req.headers.authorization);
    if (platform) {
      req.user = platform;
      req.caller = { kind: 'platform', strategy: 'platform' };
      return next();
    }

    const { data: run } = await engineClient.get(`/internal/runs/${req.params.runId}`);
    const { agentId } = run as { agentId: string };

    const { data } = await engineClient.post('/internal/invocation-auth/validate', {
      agentId,
      authorizationHeader: req.headers.authorization,
    });
    const validated = data as { keyId: string; tenantId: string; strategy: string };

    req.user = { userId: '', tenantId: validated.tenantId, role: 'developer' };
    req.caller = { kind: 'invocation', strategy: validated.strategy, keyId: validated.keyId };
    next();
  } catch (err) {
    next(err);
  }
};

const ROLE_ORDER = ['viewer', 'developer', 'tenant_admin', 'platform_admin'] as const;

export function requireRole(
  ...roles: Array<'platform_admin' | 'tenant_admin' | 'developer' | 'viewer'>
): RequestHandler {
  return (req, res, next) => {
    if (!req.user) {
      return next(Object.assign(new Error('Unauthorized'), { status: 401 }));
    }
    if (!roles.includes(req.user.role)) {
      return next(Object.assign(new Error('Forbidden'), { status: 403 }));
    }
    next();
  };
}

export function requireMinRole(
  minRole: 'platform_admin' | 'tenant_admin' | 'developer' | 'viewer',
): RequestHandler {
  return (req, _res, next) => {
    if (!req.user) {
      return next(Object.assign(new Error('Unauthorized'), { status: 401 }));
    }
    const userLevel = ROLE_ORDER.indexOf(req.user.role);
    const minLevel = ROLE_ORDER.indexOf(minRole);
    if (userLevel < minLevel) {
      return next(Object.assign(new Error('Forbidden'), { status: 403 }));
    }
    next();
  };
}

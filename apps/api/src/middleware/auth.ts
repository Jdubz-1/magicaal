import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { apiKeys, users } from '../db/schema';
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

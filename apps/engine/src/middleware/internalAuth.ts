import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { config } from '../config';

/**
 * Constant-time comparison of two secrets. Both sides are hashed first so the
 * buffers are always equal length — timingSafeEqual throws on length mismatch,
 * which would itself leak the expected length.
 */
export function secretsMatch(provided: string, expected: string): boolean {
  const a = crypto.createHash('sha256').update(provided).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

/**
 * Guards the engine's /internal/* API, which is reachable only from the API
 * service on the internal network. Callers present the shared master key as
 * X-Internal-Auth (same convention the engine uses when calling back into the
 * API — see session/session-manager.ts).
 *
 * Fails closed: an unset MAGICAAL_MASTER_KEY rejects every request rather than
 * leaving the internal API open (startup only warns when the key is missing).
 */
export const requireInternalAuth: RequestHandler = (req, _res, next) => {
  const header = req.headers['x-internal-auth'];
  const provided = Array.isArray(header) ? header[0] : header;

  if (!config.masterKey || !provided || !secretsMatch(provided, config.masterKey)) {
    return next(Object.assign(new Error('Internal auth required'), { status: 401 }));
  }
  next();
};

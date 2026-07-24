import type { RequestHandler } from 'express';
import { eq, and } from 'drizzle-orm';
import * as crypto from 'node:crypto';
import { db } from '../db/client';
import { apiKeys } from '../db/schema';

/**
 * Platform API keys carry an `mk_` prefix (distinct from invocation keys'
 * `ik_`) and are validated the same way as any other `mk_` credential in
 * `requireAuth`/`resolvePlatformCaller` (apps/api/src/middleware/auth.ts).
 */
function generateKey(): { plaintext: string; hash: string } {
  const raw = crypto.randomBytes(32).toString('hex');
  const plaintext = `mk_${raw}`;
  const hash = crypto.createHash('sha256').update(plaintext).digest('hex');
  return { plaintext, hash };
}

export const createApiKey: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId, userId } = req.user!;
    const { name } = req.body as { name?: string };
    if (!name) throw Object.assign(new Error('name is required'), { status: 400 });

    const { plaintext, hash } = generateKey();
    const now = new Date();

    const [key] = await db
      .insert(apiKeys)
      .values({
        id: crypto.randomUUID(),
        tenantId,
        userId,
        name,
        keyHash: hash,
        revoked: false,
        createdAt: now,
      })
      .returning();

    res.status(201).json({
      id: key.id,
      name: key.name,
      createdAt: key.createdAt,
      key: plaintext,
    });
  } catch (err) {
    next(err);
  }
};

export const listApiKeys: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const keys = await db
      .select({
        id: apiKeys.id,
        name: apiKeys.name,
        lastUsedAt: apiKeys.lastUsedAt,
        expiresAt: apiKeys.expiresAt,
        revoked: apiKeys.revoked,
        createdAt: apiKeys.createdAt,
      })
      .from(apiKeys)
      .where(eq(apiKeys.tenantId, tenantId));

    res.json(keys);
  } catch (err) {
    next(err);
  }
};

export const revokeApiKey: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params;

    const [updated] = await db
      .update(apiKeys)
      .set({ revoked: true })
      .where(and(eq(apiKeys.id, id), eq(apiKeys.tenantId, tenantId)))
      .returning();

    if (!updated) throw Object.assign(new Error('API key not found'), { status: 404 });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

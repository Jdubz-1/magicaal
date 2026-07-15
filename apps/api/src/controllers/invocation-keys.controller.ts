import type { RequestHandler } from 'express';
import { eq, and } from 'drizzle-orm';
import * as crypto from 'node:crypto';
import { db } from '../db/client';
import { invocationKeys } from '../db/schema';
import { assertAgentOwnedByTenant } from './invocation-policy.controller';

/**
 * Invocation keys carry an `ik_` prefix to keep them distinct from platform
 * API keys (`mk_`, in `api_keys`). The two are different auth planes — a
 * platform key is a tenant principal on the management API, an invocation key
 * is a credential you hand to a third party for one agent — and sharing a
 * prefix is what let the platform auth middleware swallow invocation keys.
 */
function generateKey(): { plaintext: string; hash: string } {
  const raw = crypto.randomBytes(32).toString('hex');
  const plaintext = `ik_${raw}`;
  const hash = crypto.createHash('sha256').update(plaintext).digest('hex');
  return { plaintext, hash };
}

export const createInvocationKey: RequestHandler = async (req, res, next) => {
  try {
    const { id: agentId } = req.params;
    const { tenantId } = req.user!;
    const { label, expiresAt } = req.body as { label: string; expiresAt?: string };

    // Without this an authenticated developer could mint a working invocation
    // key for another tenant's agent.
    await assertAgentOwnedByTenant(agentId, tenantId);

    if (!label) throw Object.assign(new Error('label is required'), { status: 400 });

    const { plaintext, hash } = generateKey();
    const now = new Date();

    const [key] = await db
      .insert(invocationKeys)
      .values({
        id: crypto.randomUUID(),
        agentId,
        tenantId,
        label,
        keyHash: hash,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        revoked: false,
        createdAt: now,
      })
      .returning();

    res.status(201).json({
      id: key.id,
      agentId: key.agentId,
      label: key.label,
      expiresAt: key.expiresAt,
      createdAt: key.createdAt,
      key: plaintext,
    });
  } catch (err) {
    next(err);
  }
};

export const listInvocationKeys: RequestHandler = async (req, res, next) => {
  try {
    const { id: agentId } = req.params;
    await assertAgentOwnedByTenant(agentId, req.user!.tenantId);
    const keys = await db
      .select({
        id: invocationKeys.id,
        agentId: invocationKeys.agentId,
        tenantId: invocationKeys.tenantId,
        label: invocationKeys.label,
        lastUsedAt: invocationKeys.lastUsedAt,
        expiresAt: invocationKeys.expiresAt,
        revoked: invocationKeys.revoked,
        createdAt: invocationKeys.createdAt,
      })
      .from(invocationKeys)
      .where(eq(invocationKeys.agentId, agentId));

    res.json(keys);
  } catch (err) {
    next(err);
  }
};

export const revokeInvocationKey: RequestHandler = async (req, res, next) => {
  try {
    const { id: agentId, keyId } = req.params;
    await assertAgentOwnedByTenant(agentId, req.user!.tenantId);
    const [updated] = await db
      .update(invocationKeys)
      .set({ revoked: true })
      .where(and(eq(invocationKeys.id, keyId), eq(invocationKeys.agentId, agentId)))
      .returning();

    if (!updated) throw Object.assign(new Error('Invocation key not found'), { status: 404 });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

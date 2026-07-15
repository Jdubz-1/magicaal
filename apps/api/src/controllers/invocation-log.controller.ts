import type { RequestHandler } from 'express';
import { eq, and, desc } from 'drizzle-orm';
import { db } from '../db/client';
import { invocationLog } from '../db/schema';
import { assertAgentOwnedByTenant } from './invocation-policy.controller';

/**
 * GET /v1/agents/:id/invocation-log (§11.5 / ALIGN-015) — the read side of
 * the audit trail recordInvocation has been writing since Phase 2.
 */
export const getInvocationLog: RequestHandler = async (req, res, next) => {
  try {
    const { id: agentId } = req.params;
    const { tenantId } = req.user!;
    await assertAgentOwnedByTenant(agentId, tenantId);

    const { status, limit = '50', offset = '0' } = req.query as {
      status?: string;
      limit?: string;
      offset?: string;
    };

    const limitNum = Math.min(parseInt(limit, 10) || 50, 200);
    const offsetNum = Math.max(parseInt(offset, 10) || 0, 0);

    const conditions = [eq(invocationLog.agentId, agentId), eq(invocationLog.tenantId, tenantId)];
    if (status === 'dispatched' || status === 'rejected') {
      conditions.push(eq(invocationLog.status, status));
    }

    const entries = await db
      .select()
      .from(invocationLog)
      .where(and(...conditions))
      .orderBy(desc(invocationLog.createdAt))
      .limit(limitNum)
      .offset(offsetNum);

    res.json({ entries, limit: limitNum, offset: offsetNum });
  } catch (err) {
    next(err);
  }
};

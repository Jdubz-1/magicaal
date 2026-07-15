import type { RequestHandler } from 'express';
import { eq, and } from 'drizzle-orm';
import { db } from '../db/client';
import { invocationPolicies, agents } from '../db/schema';

/**
 * Agent IDs are not secrets — without this check any authenticated developer
 * could read or rewrite another tenant's invocation policy. 404 (not 403) so
 * agent IDs stay non-enumerable.
 */
export async function assertAgentOwnedByTenant(agentId: string, tenantId: string): Promise<void> {
  const rows = await db
    .select({ id: agents.id })
    .from(agents)
    .where(and(eq(agents.id, agentId), eq(agents.tenantId, tenantId)));
  if (!rows[0]) {
    throw Object.assign(new Error('Agent not found'), { status: 404, code: 'AGENT_NOT_FOUND' });
  }
}

export const getInvocationPolicy: RequestHandler = async (req, res, next) => {
  try {
    const { id: agentId } = req.params;
    await assertAgentOwnedByTenant(agentId, req.user!.tenantId);

    const [policy] = await db
      .select()
      .from(invocationPolicies)
      .where(eq(invocationPolicies.agentId, agentId));

    if (!policy) {
      // Return a default policy when none is set yet
      return res.json({
        agentId,
        strategy: 'api-key',
        jwtConfig: null,
        rateLimit: null,
        overrideFlags: {},
      });
    }

    res.json({
      agentId: policy.agentId,
      strategy: policy.strategy,
      jwtConfig: policy.jwtConfig ? (JSON.parse(policy.jwtConfig) as unknown) : null,
      rateLimit: policy.rateLimit ? (JSON.parse(policy.rateLimit) as unknown) : null,
      overrideFlags: policy.overrideFlags ? (JSON.parse(policy.overrideFlags) as unknown) : {},
    });
  } catch (err) {
    next(err);
  }
};

export const updateInvocationPolicy: RequestHandler = async (req, res, next) => {
  try {
    const { id: agentId } = req.params;
    await assertAgentOwnedByTenant(agentId, req.user!.tenantId);
    const { strategy, jwtConfig, rateLimit } = req.body as {
      strategy?: 'api-key' | 'jwt' | 'public';
      jwtConfig?: unknown;
      rateLimit?: unknown;
    };

    const values = {
      agentId,
      strategy: strategy ?? 'api-key',
      jwtConfig: jwtConfig !== undefined ? JSON.stringify(jwtConfig) : null,
      rateLimit: rateLimit !== undefined ? JSON.stringify(rateLimit) : null,
      overrideFlags: '{}',
    } as const;

    // Upsert: insert or replace on conflict
    const existing = await db
      .select({ agentId: invocationPolicies.agentId })
      .from(invocationPolicies)
      .where(eq(invocationPolicies.agentId, agentId));

    if (existing.length > 0) {
      const [updated] = await db
        .update(invocationPolicies)
        .set({
          strategy: values.strategy,
          jwtConfig: values.jwtConfig,
          rateLimit: values.rateLimit,
        })
        .where(eq(invocationPolicies.agentId, agentId))
        .returning();
      return res.json(updated);
    }

    const [created] = await db
      .insert(invocationPolicies)
      .values({ ...values, agentId })
      .returning();

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { agents, invocationPolicies, invocationLog } from '../db/schema';
import { engineClient } from '../lib/engine-client';
import { loadAgentSessionConfig } from '../lib/agent-session-config';

function newId(): string {
  return crypto.randomUUID();
}

interface EngineRun {
  id: string;
  tenantId: string;
  agentId: string;
  [key: string]: unknown;
}

/**
 * Fetch a run from the engine, asserting it belongs to the caller's tenant
 * (and, on agent-scoped routes, to the agent in the path). Run IDs are not
 * secrets — they appear in logs and telemetry — so every run-scoped route must
 * verify ownership rather than trusting the ID alone.
 *
 * Answers 404 (not 403) so run IDs stay non-enumerable.
 */
async function fetchRunScoped(
  runId: string,
  tenantId: string,
  agentId?: string,
): Promise<EngineRun> {
  const response = await engineClient.get(`/internal/runs/${runId}`);
  const run = response.data as EngineRun;

  if (run.tenantId !== tenantId || (agentId !== undefined && run.agentId !== agentId)) {
    throw Object.assign(new Error(`Run ${runId} not found`), {
      status: 404,
      code: 'RUN_NOT_FOUND',
    });
  }
  return run;
}

// Simple in-memory rate limit counter (production would use Redis)
const rateLimitCounters = new Map<string, { count: number; windowStart: number }>();

async function checkRateLimit(
  agentId: string,
  tenantId: string,
  caller: { strategy?: string; keyId?: string } | undefined,
  ip: string | undefined,
): Promise<{ limited: boolean; limit: number; remaining: number; resetAt: number }> {
  const policyRows = await db
    .select()
    .from(invocationPolicies)
    .where(eq(invocationPolicies.agentId, agentId));

  const policy = policyRows[0];
  if (!policy?.rateLimit) {
    return { limited: false, limit: Infinity, remaining: Infinity, resetAt: 0 };
  }

  const rateCfg = JSON.parse(policy.rateLimit) as {
    requestsPerWindow: number;
    windowSeconds: number;
    limitBy?: 'tenant' | 'key' | 'ip';
  };

  // §11.3 (ALIGN-017): the counter dimension follows RateLimitConfig.limitBy.
  // 'key' buckets per invocation key; callers without one (jwt, public,
  // platform) share a per-strategy bucket rather than one global bucket.
  let key: string;
  switch (rateCfg.limitBy) {
    case 'key':
      key = `${tenantId}:${agentId}:key:${caller?.keyId ?? caller?.strategy ?? 'anonymous'}`;
      break;
    case 'ip':
      key = `${tenantId}:${agentId}:ip:${ip ?? 'unknown'}`;
      break;
    default:
      key = `${tenantId}:${agentId}`;
  }
  const now = Date.now();
  const windowMs = (rateCfg.windowSeconds ?? 60) * 1000;
  const limit = rateCfg.requestsPerWindow ?? 100;

  const counter = rateLimitCounters.get(key);
  if (!counter || now - counter.windowStart >= windowMs) {
    rateLimitCounters.set(key, { count: 1, windowStart: now });
    return { limited: false, limit, remaining: limit - 1, resetAt: now + windowMs };
  }

  counter.count++;
  const remaining = Math.max(0, limit - counter.count);
  const resetAt = counter.windowStart + windowMs;

  if (counter.count > limit) {
    return { limited: true, limit, remaining: 0, resetAt };
  }

  return { limited: false, limit, remaining, resetAt };
}

/**
 * Invocation audit log (ARCHITECTURE §11.5): agent, tenant, strategy, caller
 * identity, and outcome — including failures, which is why it is written after
 * the dispatch attempt rather than before it. Never fatal to the request.
 */
async function recordInvocation(
  req: Parameters<RequestHandler>[0],
  agentId: string,
  tenantId: string,
  status: 'dispatched' | 'rejected',
  runId?: string,
): Promise<void> {
  await db
    .insert(invocationLog)
    .values({
      id: newId(),
      agentId,
      tenantId,
      // A platform caller bypassed invocation auth; an invocation caller was
      // authenticated by the agent's policy, which named the strategy.
      strategy: req.caller?.strategy ?? 'unknown',
      // Only the api-key strategy yields a real invocation_keys row id; jwt and
      // public return a sentinel, and a platform caller has no key at all.
      invocationKeyId: req.caller?.strategy === 'api-key' ? (req.caller.keyId ?? null) : null,
      requestIp: req.ip ?? 'unknown',
      runId: runId ?? null,
      status,
      createdAt: new Date(),
    })
    .catch(() => { /* audit write must never fail the request */ });
}

export const dispatchRun: RequestHandler = async (req, res, next) => {
  const { id: agentId } = req.params;
  const tenantId = req.user?.tenantId ?? '';

  try {
    const { userId } = req.user!;
    const { input = {}, mode = 'async', session_id, session_metadata } = req.body as {
      input?: Record<string, unknown>;
      mode?: 'sync' | 'async';
      session_id?: string;
      session_metadata?: Record<string, unknown>;
    };

    // Namespace session ID to prevent cross-tenant collisions
    let sessionId = session_id
      ? `${tenantId}:${agentId}:${session_id}`
      : undefined;

    // §14.2 (ALIGN-011): a session-enabled agent invoked without a session_id
    // gets a platform-generated one, echoed back in the response.
    if (!sessionId) {
      const sessionConfig = await loadAgentSessionConfig(agentId);
      if (sessionConfig?.enabled) {
        sessionId = `${tenantId}:${agentId}:${crypto.randomUUID()}`;
      }
    }

    const agentRows = await db.select().from(agents).where(eq(agents.id, agentId));
    const agent = agentRows[0];
    if (!agent) throw Object.assign(new Error('Agent not found'), { status: 404, code: 'AGENT_NOT_FOUND' });
    // An invocation caller is scoped to one agent by its credential; a platform
    // caller is scoped to its tenant.
    if (agent.tenantId !== tenantId) {
      throw Object.assign(new Error('Agent not found'), { status: 404, code: 'AGENT_NOT_FOUND' });
    }
    if (agent.status !== 'active' || !agent.enabled) {
      throw Object.assign(new Error('Agent is not active'), { status: 409, code: 'AGENT_NOT_ACTIVE' });
    }

    // Per-agent configured limit (§11.3). The engine's Redis limiter is a hard
    // backstop and was already incremented once, during invocation validation.
    const rl = await checkRateLimit(agentId, tenantId, req.caller, req.ip);
    res.setHeader('X-RateLimit-Limit', String(rl.limit === Infinity ? 9999 : rl.limit));
    res.setHeader('X-RateLimit-Remaining', String(rl.remaining === Infinity ? 9999 : rl.remaining));
    res.setHeader('X-RateLimit-Reset', String(Math.floor(rl.resetAt / 1000)));
    if (rl.limited) {
      throw Object.assign(new Error('Rate limit exceeded'), { status: 429, code: 'RATE_LIMIT_EXCEEDED' });
    }

    const response = await engineClient.post('/internal/runs', {
      agentId,
      tenantId,
      triggerType: 'api',
      input,
      caller: req.caller,
      sessionId,
      ...(session_metadata && { sessionMetadata: session_metadata }),
    });

    const { runId } = response.data as { runId: string };
    void userId; // Available if needed for audit logging

    await recordInvocation(req, agentId, tenantId, 'dispatched', runId);

    if (mode === 'sync') {
      let run: { status: string; output: unknown; error: unknown } | null = null;
      const maxPolls = 60;
      for (let i = 0; i < maxPolls; i++) {
        await new Promise((r) => setTimeout(r, 1000));
        const poll = await engineClient.get(`/internal/runs/${runId}`);
        run = poll.data as { status: string; output: unknown; error: unknown };
        if (['completed', 'failed', 'suspended', 'cancelled'].includes(run.status)) break;
      }
      // The generated/namespaced sessionId must be echoed here too — a sync
      // caller has no other way to learn it (ALIGN-011).
      return res.json({ ...(run ?? {}), ...(sessionId && { sessionId }) });
    }

    res.status(202).json({ runId, ...(sessionId && { sessionId }) });
  } catch (err) {
    // §11.5: every attempt is logged, including the ones that never dispatched
    if (tenantId) await recordInvocation(req, agentId, tenantId, 'rejected');
    next(err);
  }
};

/**
 * GET /v1/agents/:id/runs (ALIGN-021) — run history for one agent, for both
 * the platform and invocation-key auth planes (unlike GET /v1/telemetry,
 * which is platform-only and cross-agent). A list is already scoped by the
 * :id path param, so ownership is checked once here rather than per-row like
 * fetchRunScoped does for a bare run ID.
 */
export const listRuns: RequestHandler = async (req, res, next) => {
  try {
    const { id: agentId } = req.params;
    const { tenantId } = req.user!;

    const agentRows = await db.select().from(agents).where(eq(agents.id, agentId));
    const agent = agentRows[0];
    if (!agent || agent.tenantId !== tenantId) {
      throw Object.assign(new Error('Agent not found'), { status: 404, code: 'AGENT_NOT_FOUND' });
    }

    const { limit, offset, status } = req.query as { limit?: string; offset?: string; status?: string };
    const response = await engineClient.get(`/internal/agents/${agentId}/runs`, {
      params: { limit, offset, status },
    });
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

export const getRun: RequestHandler = async (req, res, next) => {
  try {
    const { id: agentId, runId } = req.params;
    const { tenantId } = req.user!;
    const run = await fetchRunScoped(runId, tenantId, agentId);
    res.json(run);
  } catch (err) {
    next(err);
  }
};

/** GET /v1/runs/:runId — direct run lookup without the owning agent ID. */
export const getRunDirect: RequestHandler = async (req, res, next) => {
  try {
    const { runId } = req.params;
    const { tenantId } = req.user!;
    const run = await fetchRunScoped(runId, tenantId);
    res.json(run);
  } catch (err) {
    next(err);
  }
};

export const reviewRun: RequestHandler = async (req, res, next) => {
  try {
    const { id: agentId, runId } = req.params;
    const { tenantId } = req.user!;

    // Ownership must be checked on the run, not just the agent: otherwise a
    // caller pairs their own agent ID with another tenant's runId and resolves
    // that tenant's human-review gate.
    await fetchRunScoped(runId, tenantId, agentId);

    const response = await engineClient.post(`/internal/runs/${runId}/review`, req.body);
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

export const cancelRun: RequestHandler = async (req, res, next) => {
  try {
    const { id: agentId, runId } = req.params;
    const { tenantId } = req.user!;

    await fetchRunScoped(runId, tenantId, agentId);

    const response = await engineClient.delete(`/internal/runs/${runId}`);
    res.status(response.status).json(response.data);
  } catch (err) {
    next(err);
  }
};

export const streamRun: RequestHandler = async (req, res, next) => {
  try {
    const { id: agentId, runId } = req.params;
    const { tenantId } = req.user!;

    await fetchRunScoped(runId, tenantId, agentId);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const engineResponse = await engineClient.get(`/internal/runs/${runId}/stream`, {
      responseType: 'stream',
      timeout: 0,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (engineResponse.data as any).pipe(res);

    req.on('close', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (engineResponse.data as any).destroy?.();
    });
  } catch (err) {
    if (!res.headersSent) {
      next(err);
    }
  }
};

export const getRunSteps: RequestHandler = async (req, res, next) => {
  try {
    const { id: agentId, runId } = req.params;
    const { tenantId } = req.user!;

    await fetchRunScoped(runId, tenantId, agentId);

    const response = await engineClient.get(`/internal/runs/${runId}/steps`);
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

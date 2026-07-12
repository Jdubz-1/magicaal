import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { agents, invocationKeys, invocationPolicies, invocationLog } from '../db/schema';
import { engineClient } from '../lib/engine-client';

function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
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
  };

  const key = `${tenantId}:${agentId}`;
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

function sha256hex(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

async function resolveInvocationKey(agentId: string, authHeader: string | undefined): Promise<string | undefined> {
  if (!authHeader?.startsWith('Bearer ')) return undefined;
  const token = authHeader.slice(7);
  if (!token.startsWith('mk_')) return undefined;

  const keyHash = sha256hex(token);
  const rows = await db
    .select()
    .from(invocationKeys)
    .where(eq(invocationKeys.keyHash, keyHash));
  const key = rows[0];

  if (!key || key.revoked || key.agentId !== agentId) {
    throw Object.assign(new Error('Invalid or revoked invocation key'), { status: 401 });
  }
  if (key.expiresAt && key.expiresAt < new Date()) {
    throw Object.assign(new Error('Invocation key expired'), { status: 401 });
  }

  return token;
}

export const dispatchRun: RequestHandler = async (req, res, next) => {
  try {
    const { id: agentId } = req.params;
    const { tenantId, userId } = req.user!;
    const { input = {}, mode = 'async', session_id } = req.body as {
      input?: Record<string, unknown>;
      mode?: 'sync' | 'async';
      session_id?: string;
      session_metadata?: Record<string, unknown>;
    };

    // Namespace session ID to prevent cross-tenant collisions
    const sessionId = session_id
      ? `${tenantId}:${agentId}:${session_id}`
      : undefined;

    const agentRows = await db.select().from(agents).where(eq(agents.id, agentId));
    const agent = agentRows[0];
    if (!agent) throw Object.assign(new Error('Agent not found'), { status: 404, code: 'AGENT_NOT_FOUND' });
    if (agent.status !== 'active' || !agent.enabled) {
      throw Object.assign(new Error('Agent is not active'), { status: 409, code: 'AGENT_NOT_ACTIVE' });
    }

    const authKey = await resolveInvocationKey(agentId, req.headers.authorization);

    // Rate limit check
    const rl = await checkRateLimit(agentId, tenantId);
    res.setHeader('X-RateLimit-Limit', String(rl.limit === Infinity ? 9999 : rl.limit));
    res.setHeader('X-RateLimit-Remaining', String(rl.remaining === Infinity ? 9999 : rl.remaining));
    res.setHeader('X-RateLimit-Reset', String(Math.floor(rl.resetAt / 1000)));
    if (rl.limited) {
      throw Object.assign(new Error('Rate limit exceeded'), { status: 429, code: 'RATE_LIMIT_EXCEEDED' });
    }

    // Log invocation for audit
    await db.insert(invocationLog).values({
      id: newId(),
      agentId,
      tenantId,
      strategy: authKey ? 'api-key' : 'bearer',
      requestIp: req.ip ?? 'unknown',
      status: 'dispatched',
      createdAt: new Date(),
    }).catch(() => { /* non-fatal */ });

    const response = await engineClient.post('/internal/runs', {
      agentId,
      tenantId,
      triggerType: 'api',
      input,
      authKey,
      authorizationHeader: req.headers.authorization,
      sessionId,
    });

    const { runId } = response.data as { runId: string };
    void userId; // Available if needed for audit logging

    if (mode === 'sync') {
      let run: { status: string; output: unknown; error: unknown } | null = null;
      const maxPolls = 60;
      for (let i = 0; i < maxPolls; i++) {
        await new Promise((r) => setTimeout(r, 1000));
        const poll = await engineClient.get(`/internal/runs/${runId}`);
        run = poll.data as { status: string; output: unknown; error: unknown };
        if (['completed', 'failed', 'suspended', 'cancelled'].includes(run.status)) break;
      }
      return res.json(run);
    }

    res.status(202).json({ runId, ...(sessionId && { sessionId }) });
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

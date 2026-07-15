import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import { telemetryDb } from '../db/telemetry-client';
import { telemetryRuns, telemetrySteps } from '../db/telemetry-schema';
import { runTriggerQueue } from '../queue/client';
import { graphLoader, assertAgentInTenant } from '../graph/graph-loader';
import { sseManager } from '../sse/sse-manager';
import { resumeRun } from '../execution/resume';
import { lifecycle } from '../execution/lifecycle';
import {
  requestAbort,
  acquireSessionLock,
  stealSessionLock,
  releaseSessionLock,
} from '../execution/run-control';

const TERMINAL_RUN_STATUSES = new Set(['completed', 'failed', 'cancelled']);

/**
 * §14.3 (ALIGN-010): a session accepts one concurrent top-level run. Child
 * runs (sub-graph/handoff) share the parent's session by design and never
 * contend for the lock. If the recorded holder is terminal (or unknown), the
 * lock is stale — e.g. a suspended run cancelled with no worker to release —
 * and this dispatch takes it over.
 */
async function assertSessionAvailable(sessionId: string, runId: string): Promise<void> {
  const lock = await acquireSessionLock(sessionId, runId);
  if (lock.acquired) return;

  const rows = await telemetryDb
    .select({ status: telemetryRuns.status })
    .from(telemetryRuns)
    .where(eq(telemetryRuns.id, lock.holderRunId));
  const holderStatus = rows[0]?.status;
  if (!holderStatus || TERMINAL_RUN_STATUSES.has(holderStatus)) {
    await stealSessionLock(sessionId, runId);
    return;
  }

  throw Object.assign(
    new Error(`Session is in use by an active run (${lock.holderRunId})`),
    { status: 409, code: 'SESSION_CONFLICT', holderRunId: lock.holderRunId },
  );
}

function newRunId(): string {
  return `run_${crypto.randomUUID()}`;
}

/**
 * Who a dispatch is on behalf of. The API is the enforcement point for both
 * auth planes — it has already authenticated the caller, on exactly one of
 * them — so this states which, rather than the engine re-validating (which
 * would double-count the rate limiter, and cannot work for the callers that
 * legitimately bypass invocation auth).
 *
 * - `platform`  — a tenant principal: Studio test run, Caal, test-case suite,
 *   sub-graph/handoff. Bypasses invocation policy, per ARCHITECTURE §11.4.
 * - `invocation` — a third-party credential already validated against the
 *   agent's invocation policy by /internal/invocation-auth/validate.
 */
interface RunCaller {
  kind: 'platform' | 'invocation';
  strategy: string;
  keyId?: string;
}

export const dispatchRun: RequestHandler = async (req, res, next) => {
  try {
    const { agentId, tenantId, triggerType = 'api', input = {}, sessionId, caller } = req.body as {
      agentId: string;
      tenantId: string;
      triggerType?: string;
      input?: Record<string, unknown>;
      sessionId?: string;
      caller?: RunCaller;
    };

    if (!agentId || !tenantId) {
      throw Object.assign(new Error('agentId and tenantId are required'), { status: 400 });
    }

    // Required, not defaulted: an omitted caller must fail loudly rather than
    // silently dispatching a run nobody authenticated.
    if (caller?.kind !== 'platform' && caller?.kind !== 'invocation') {
      throw Object.assign(
        new Error('caller.kind must be "platform" or "invocation"'),
        { status: 400, code: 'CALLER_REQUIRED' },
      );
    }

    // §14.3: sub-graph/handoff agentIds come from graph-author-controlled node
    // config — never dispatch an agent into a tenant that does not own it.
    assertAgentInTenant(agentId, tenantId);

    const runId = newRunId();
    const now = new Date();

    const isChildRun = triggerType === 'sub-graph' || triggerType === 'handoff';
    if (sessionId && !isChildRun) {
      await assertSessionAvailable(sessionId, runId);
    }

    try {
      await telemetryDb.insert(telemetryRuns).values({
        id: runId,
        tenantId,
        agentId,
        triggerType,
        status: 'pending',
        startedAt: now,
        inputJson: JSON.stringify(input),
        totalPromptTokens: 0,
        totalCompletionTokens: 0,
        estimatedCostUsd: 0,
        sessionId,
      });

      await runTriggerQueue.add('run', { runId, agentId, tenantId, triggerType, input, sessionId });
    } catch (err) {
      // The run never made it into the queue — don't leave the session locked.
      if (sessionId && !isChildRun) await releaseSessionLock(sessionId, runId).catch(() => {});
      throw err;
    }

    res.status(202).json({ runId, ...(sessionId && { sessionId }) });
  } catch (err) {
    next(err);
  }
};

export const getRun: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await telemetryDb
      .select()
      .from(telemetryRuns)
      .where(eq(telemetryRuns.id, id));

    if (!rows[0]) {
      throw Object.assign(new Error(`Run ${id} not found`), {
        status: 404,
        code: 'RUN_NOT_FOUND',
      });
    }

    const run = rows[0];
    res.json({
      id: run.id,
      agentId: run.agentId,
      tenantId: run.tenantId,
      triggerType: run.triggerType,
      status: run.status,
      startedAt: run.startedAt,
      completedAt: run.completedAt,
      output: run.outputJson ? JSON.parse(run.outputJson) : null,
      error: run.errorJson ? JSON.parse(run.errorJson) : null,
      tokenUsage: {
        promptTokens: run.totalPromptTokens,
        completionTokens: run.totalCompletionTokens,
        estimatedCostUsd: run.estimatedCostUsd,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getRunSteps: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const steps = await telemetryDb
      .select()
      .from(telemetrySteps)
      .where(eq(telemetrySteps.runId, id));

    res.json(
      steps.map((s) => ({
        id: s.id,
        runId: s.runId,
        nodeId: s.nodeId,
        nodeType: s.nodeType,
        status: s.status,
        startedAt: s.startedAt,
        completedAt: s.completedAt,
        input: s.inputSnapshotJson ? JSON.parse(s.inputSnapshotJson) : null,
        output: s.outputSnapshotJson ? JSON.parse(s.outputSnapshotJson) : null,
        error: s.errorJson ? JSON.parse(s.errorJson) : null,
        tokenUsage: {
          promptTokens: s.promptTokens,
          completionTokens: s.completionTokens,
          estimatedCostUsd: s.estimatedCostUsd,
        },
      })),
    );
  } catch (err) {
    next(err);
  }
};

export const streamRun: RequestHandler = async (req, res, next) => {
  try {
    const { id: runId } = req.params;

    const rows = await telemetryDb.select().from(telemetryRuns).where(eq(telemetryRuns.id, runId));
    const run = rows[0];
    if (!run) {
      throw Object.assign(new Error(`Run ${runId} not found`), { status: 404, code: 'RUN_NOT_FOUND' });
    }

    // Run is already terminal — send final event immediately and close
    const terminal = new Set(['completed', 'failed', 'suspended', 'cancelled']);
    if (terminal.has(run.status)) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders();

      const timestamp = new Date().toISOString();
      if (run.status === 'completed') {
        const output = run.outputJson ? (JSON.parse(run.outputJson) as Record<string, unknown>) : {};
        res.write(`event: run.completed\ndata: ${JSON.stringify({ runId, output, timestamp })}\n\n`);
      } else if (run.status === 'failed') {
        const error = run.errorJson ? (JSON.parse(run.errorJson) as { code: string; message: string }) : { code: 'UNKNOWN', message: 'Run failed' };
        res.write(`event: run.failed\ndata: ${JSON.stringify({ runId, error, timestamp })}\n\n`);
      } else if (run.status === 'suspended') {
        res.write(`event: run.suspended\ndata: ${JSON.stringify({ runId, reviewId: '', timestamp })}\n\n`);
      }
      res.end();
      return;
    }

    // Run is in progress — subscribe to live events
    sseManager.subscribe(runId, res);
  } catch (err) {
    next(err);
  }
};

export const reviewRun: RequestHandler = async (req, res, next) => {
  try {
    const { id: runId } = req.params;
    const { action, reason, modifications } = req.body as {
      action?: string;
      reason?: string;
      modifications?: Record<string, unknown>;
    };

    if (!action || !['approve', 'reject'].includes(action)) {
      throw Object.assign(new Error('action must be "approve" or "reject"'), { status: 400 });
    }

    await resumeRun(runId, { action: action as 'approve' | 'reject', reason, modifications });
    res.json({ runId, action, resumed: action === 'approve', rejected: action === 'reject' });
  } catch (err) {
    next(err);
  }
};

export const cancelRun: RequestHandler = async (req, res, next) => {
  try {
    const { id: runId } = req.params;
    const rows = await telemetryDb.select().from(telemetryRuns).where(eq(telemetryRuns.id, runId));
    const run = rows[0];
    if (!run) {
      throw Object.assign(new Error(`Run ${runId} not found`), { status: 404, code: 'RUN_NOT_FOUND' });
    }

    if (['completed', 'failed', 'cancelled'].includes(run.status)) {
      throw Object.assign(
        new Error(`Run ${runId} is already terminal (status: ${run.status})`),
        { status: 409, code: 'RUN_ALREADY_TERMINAL' },
      );
    }

    // The abort flag is set for every state: a pending run's job consumes it
    // instead of executing, and a running run's worker sees it at the next
    // node boundary.
    await requestAbort(runId, 'cancelled');

    if (run.status === 'running') {
      // The executing worker records the terminal state when it observes the flag
      res.status(202).json({ runId, cancelling: true });
      return;
    }

    // pending / suspended — no worker owns the run; record the state now
    await lifecycle.markRunCancelled(runId);
    res.json({ runId, status: 'cancelled' });
  } catch (err) {
    next(err);
  }
};

export const deployAgent: RequestHandler = (req, res, next) => {
  try {
    const { id } = req.params;
    graphLoader.invalidate(id);
    res.json({ agentId: id, invalidated: true });
  } catch (err) {
    next(err);
  }
};

export const webhookDispatch: RequestHandler = async (req, res, next) => {
  try {
    const { agentId } = req.params;

    const runId = newRunId();
    const now = new Date();

    // For webhook dispatch the tenantId comes from the caller (API layer validates secret)
    const tenantId = req.headers['x-tenant-id'] as string | undefined;
    if (!tenantId) {
      throw Object.assign(
        new Error('x-tenant-id header is required'),
        { status: 400, code: 'MISSING_TENANT_ID' },
      );
    }

    assertAgentInTenant(agentId, tenantId);

    // Webhook runs are sessionless (per-agent HMAC URLs carry no session_id),
    // so the ALIGN-010 session lock does not apply here. If webhook session
    // support is ever added, dispatch must go through assertSessionAvailable.
    await telemetryDb.insert(telemetryRuns).values({
      id: runId,
      tenantId,
      agentId,
      triggerType: 'webhook',
      status: 'pending',
      startedAt: now,
      inputJson: JSON.stringify(req.body ?? {}),
      totalPromptTokens: 0,
      totalCompletionTokens: 0,
      estimatedCostUsd: 0,
    });

    await runTriggerQueue.add('run', {
      runId,
      agentId,
      tenantId,
      triggerType: 'webhook',
      input: req.body ?? {},
    });

    res.status(202).json({ runId });
  } catch (err) {
    next(err);
  }
};

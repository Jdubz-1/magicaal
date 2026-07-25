import type { RequestHandler } from 'express';
import { eq, and, desc, inArray, gte } from 'drizzle-orm';
import { telemetryDb } from '../db/telemetry-client';
import { telemetryRuns, telemetrySteps, telemetryTrajectories, telemetryEvaluateScores } from '../db/telemetry-schema';

export const getTelemetry: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId, agentId, limit = '50', status } = req.query as {
      tenantId?: string;
      agentId?: string;
      limit?: string;
      status?: string;
    };

    if (!tenantId) {
      throw Object.assign(new Error('tenantId is required'), { status: 400 });
    }

    const limitNum = Math.min(parseInt(limit, 10) || 50, 500);

    const query = telemetryDb
      .select()
      .from(telemetryRuns)
      .where(eq(telemetryRuns.tenantId, tenantId))
      .orderBy(desc(telemetryRuns.startedAt))
      .limit(limitNum);

    const rows = await query;
    const filtered = rows
      .filter((r) => !agentId || r.agentId === agentId)
      .filter((r) => !status || r.status === status);

    res.json({
      runs: filtered.map((r) => ({
        id: r.id,
        agentId: r.agentId,
        triggerType: r.triggerType,
        status: r.status,
        startedAt: r.startedAt,
        completedAt: r.completedAt,
        durationMs: r.durationMs,
        // 'rev_'-prefixed for core:human-review, 'wait_'-prefixed for a
        // timed core:wait suspend (ALIGN-031) — lets consumers (the admin
        // review queue) tell the two kinds of 'suspended' apart.
        reviewId: r.reviewId,
        tokenUsage: {
          promptTokens: r.totalPromptTokens,
          completionTokens: r.totalCompletionTokens,
          estimatedCostUsd: r.estimatedCostUsd,
        },
      })),
      total: filtered.length,
    });
  } catch (err) {
    next(err);
  }
};

export const getTokenUsage: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId, agentId } = req.query as { tenantId?: string; agentId?: string };

    if (!tenantId) {
      throw Object.assign(new Error('tenantId is required'), { status: 400 });
    }

    const rows = await telemetryDb
      .select()
      .from(telemetryRuns)
      .where(eq(telemetryRuns.tenantId, tenantId));

    const filtered = agentId ? rows.filter((r) => r.agentId === agentId) : rows;

    const totals = filtered.reduce(
      (acc, r) => ({
        promptTokens: acc.promptTokens + (r.totalPromptTokens ?? 0),
        completionTokens: acc.completionTokens + (r.totalCompletionTokens ?? 0),
        estimatedCostUsd: acc.estimatedCostUsd + (r.estimatedCostUsd ?? 0),
        runCount: acc.runCount + 1,
      }),
      { promptTokens: 0, completionTokens: 0, estimatedCostUsd: 0, runCount: 0 },
    );

    // Per-agent breakdown
    const byAgent = new Map<string, typeof totals>();
    for (const r of filtered) {
      const existing = byAgent.get(r.agentId) ?? { promptTokens: 0, completionTokens: 0, estimatedCostUsd: 0, runCount: 0 };
      byAgent.set(r.agentId, {
        promptTokens: existing.promptTokens + (r.totalPromptTokens ?? 0),
        completionTokens: existing.completionTokens + (r.totalCompletionTokens ?? 0),
        estimatedCostUsd: existing.estimatedCostUsd + (r.estimatedCostUsd ?? 0),
        runCount: existing.runCount + 1,
      });
    }

    res.json({
      totals,
      byAgent: Object.fromEntries(byAgent),
    });
  } catch (err) {
    next(err);
  }
};

export const getTrajectory: RequestHandler = async (req, res, next) => {
  try {
    const { runId } = req.params;
    const { tenantId } = req.query as { tenantId?: string };

    if (!tenantId) throw Object.assign(new Error('tenantId is required'), { status: 400 });

    const runRows = await telemetryDb.select().from(telemetryRuns).where(
      and(eq(telemetryRuns.id, runId), eq(telemetryRuns.tenantId, tenantId)),
    );
    if (!runRows[0]) throw Object.assign(new Error('Run not found'), { status: 404 });

    const rows = await telemetryDb
      .select()
      .from(telemetryTrajectories)
      .where(eq(telemetryTrajectories.runId, runId))
      .orderBy(telemetryTrajectories.iteration);

    res.json({ runId, trajectories: rows });
  } catch (err) {
    next(err);
  }
};

export const getRoutingEvents: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId, agentId, limit = '100' } = req.query as {
      tenantId?: string;
      agentId?: string;
      limit?: string;
    };

    if (!tenantId) throw Object.assign(new Error('tenantId is required'), { status: 400 });

    const limitNum = Math.min(parseInt(limit, 10) || 100, 500);

    // Fetch LLM steps that have routing metadata (i.e. went through the router)
    const steps = await telemetryDb
      .select()
      .from(telemetrySteps)
      .where(eq(telemetrySteps.tenantId, tenantId))
      .orderBy(desc(telemetrySteps.startedAt))
      .limit(limitNum * 5); // over-fetch since we'll filter below

    // Find runs for agentId filtering — query only the runs referenced by the fetched steps
    const runIds = [...new Set(steps.map((s) => s.runId))];
    const runsMap = new Map<string, string>(); // runId → agentId
    if (runIds.length > 0) {
      const runs = await telemetryDb
        .select({ id: telemetryRuns.id, agentId: telemetryRuns.agentId })
        .from(telemetryRuns)
        .where(and(eq(telemetryRuns.tenantId, tenantId), inArray(telemetryRuns.id, runIds)));
      for (const r of runs) runsMap.set(r.id, r.agentId);
    }

    const events = steps
      .map((s) => {
        let meta: { targetUsed?: unknown; attemptCount?: number; triggerHistory?: unknown[] } | null = null;
        if (s.routingMetaJson) {
          try { meta = JSON.parse(s.routingMetaJson); } catch { /* skip malformed row */ }
        }
        return { s, meta, agentIdFromRun: runsMap.get(s.runId) ?? '' };
      })
      // Only include steps where a fallback occurred (attemptCount > 1)
      .filter(({ meta }) => meta !== null && (meta.attemptCount ?? 1) > 1)
      .filter(({ agentIdFromRun }) => !agentId || agentIdFromRun === agentId)
      .slice(0, limitNum)
      .map(({ s, meta, agentIdFromRun }) => ({
        runId: s.runId,
        nodeId: s.nodeId,
        nodeType: s.nodeType,
        agentId: agentIdFromRun,
        attemptCount: meta?.attemptCount ?? 1,
        targetUsed: meta?.targetUsed ?? null,
        triggerHistory: meta?.triggerHistory ?? [],
        timestamp: s.startedAt?.toISOString(),
      }));

    res.json({ events, total: events.length });
  } catch (err) {
    next(err);
  }
};

/**
 * Evaluate score history (§7.2 / ALIGN-014). evaluate_scores has no tenant
 * column — scoping happens through the owning run.
 */
export const getEvaluateScores: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId, agentId, limit = '100' } = req.query as {
      tenantId?: string;
      agentId?: string;
      limit?: string;
    };

    if (!tenantId) throw Object.assign(new Error('tenantId is required'), { status: 400 });

    const limitNum = Math.min(parseInt(limit, 10) || 100, 500);

    const conditions = [eq(telemetryRuns.tenantId, tenantId)];
    if (agentId) conditions.push(eq(telemetryRuns.agentId, agentId));

    const rows = await telemetryDb
      .select({
        runId: telemetryEvaluateScores.runId,
        nodeId: telemetryEvaluateScores.nodeId,
        scorerType: telemetryEvaluateScores.scorerType,
        score: telemetryEvaluateScores.score,
        rubricJson: telemetryEvaluateScores.rubricJson,
        createdAt: telemetryEvaluateScores.createdAt,
        agentId: telemetryRuns.agentId,
      })
      .from(telemetryEvaluateScores)
      .innerJoin(telemetryRuns, eq(telemetryEvaluateScores.runId, telemetryRuns.id))
      .where(and(...conditions))
      .orderBy(desc(telemetryEvaluateScores.createdAt))
      .limit(limitNum);

    const events = rows.map((r) => ({
      runId: r.runId,
      nodeId: r.nodeId,
      agentId: r.agentId,
      scorerType: r.scorerType,
      score: r.score,
      rubric: r.rubricJson ? (JSON.parse(r.rubricJson) as unknown) : null,
      timestamp: r.createdAt?.toISOString(),
    }));

    res.json({ events, total: events.length });
  } catch (err) {
    next(err);
  }
};

export const getRunDetail: RequestHandler = async (req, res, next) => {
  try {
    const { runId } = req.params;

    const runRows = await telemetryDb
      .select()
      .from(telemetryRuns)
      .where(eq(telemetryRuns.id, runId));

    const run = runRows[0];
    if (!run) {
      throw Object.assign(new Error('Run not found'), { status: 404 });
    }

    const steps = await telemetryDb
      .select()
      .from(telemetrySteps)
      .where(eq(telemetrySteps.runId, runId));

    res.json({
      run: {
        ...run,
        output: run.outputJson ? JSON.parse(run.outputJson) : null,
        error: run.errorJson ? JSON.parse(run.errorJson) : null,
        input: run.inputJson ? JSON.parse(run.inputJson) : null,
      },
      steps: steps.map((s) => ({
        ...s,
        input: s.inputSnapshotJson ? JSON.parse(s.inputSnapshotJson) : null,
        output: s.outputSnapshotJson ? JSON.parse(s.outputSnapshotJson) : null,
        error: s.errorJson ? JSON.parse(s.errorJson) : null,
        routingMeta: s.routingMetaJson ? JSON.parse(s.routingMetaJson) : null,
      })),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /internal/telemetry/usage?since=<iso> — deployment-wide run count.
 *
 * Backs the API's Marketplace usage reporter. Aggregate only: no tenant IDs,
 * inputs, or outputs — the telemetry DB stays engine-owned, and only the count
 * leaves the deployment.
 */
export const getUsageAggregate: RequestHandler = async (req, res, next) => {
  try {
    const { since } = req.query as { since?: string };
    if (!since) {
      throw Object.assign(new Error('since is required'), { status: 400 });
    }

    const sinceDate = new Date(since);
    if (Number.isNaN(sinceDate.getTime())) {
      throw Object.assign(new Error('since must be an ISO timestamp'), { status: 400 });
    }

    const rows = await telemetryDb
      .select({ id: telemetryRuns.id })
      .from(telemetryRuns)
      .where(gte(telemetryRuns.startedAt, sinceDate));

    res.json({ since: sinceDate.toISOString(), totalRuns: rows.length });
  } catch (err) {
    next(err);
  }
};

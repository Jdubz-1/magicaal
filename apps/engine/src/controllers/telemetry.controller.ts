import type { RequestHandler } from 'express';
import { eq, and, desc } from 'drizzle-orm';
import { telemetryDb } from '../db/telemetry-client';
import { telemetryRuns, telemetrySteps } from '../db/telemetry-schema';

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

    let query = telemetryDb
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

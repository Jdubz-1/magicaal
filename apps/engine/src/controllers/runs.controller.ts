import type { RequestHandler } from 'express';
import { eq } from 'drizzle-orm';
import { telemetryDb } from '../db/telemetry-client';
import { telemetryRuns, telemetrySteps } from '../db/telemetry-schema';
import { runTriggerQueue } from '../queue/client';
import { validateInvocationKey } from '../auth/invocation-auth';
import { graphLoader } from '../graph/graph-loader';

function newRunId(): string {
  return `run_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

export const dispatchRun: RequestHandler = async (req, res, next) => {
  try {
    const { agentId, tenantId, triggerType = 'api', input = {}, authKey } = req.body as {
      agentId: string;
      tenantId: string;
      triggerType?: string;
      input?: Record<string, unknown>;
      authKey?: string;
    };

    if (!agentId || !tenantId) {
      throw Object.assign(new Error('agentId and tenantId are required'), { status: 400 });
    }

    if (authKey) {
      await validateInvocationKey(agentId, authKey);
    }

    const runId = newRunId();
    const now = new Date();

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
    });

    await runTriggerQueue.add('run', { runId, agentId, tenantId, triggerType, input });

    res.status(202).json({ runId });
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

export const cancelRun: RequestHandler = (_req, _res, next) => {
  next(Object.assign(new Error('Run cancellation not implemented'), { status: 501, code: 'NOT_IMPLEMENTED' }));
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

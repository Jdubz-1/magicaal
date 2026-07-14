import { eq } from 'drizzle-orm';
import * as crypto from 'node:crypto';
import { telemetryDb } from '../db/telemetry-client';
import { telemetryRuns, telemetrySteps, telemetryTrajectories, telemetryEvaluateScores } from '../db/telemetry-schema';
import type { TrajectoryStep, NodeOutput } from '@magicaal/sdk-node';
import type { ExecutionContextImpl } from './context';
import type { StepError } from '@magicaal/core';
import { sseManager } from '../sse/sse-manager';
import { mcpRegistry } from '../mcp/mcp-registry';

function newId(): string {
  return crypto.randomUUID();
}

export const lifecycle = {
  async markRunStarted(runId: string, agentId: string): Promise<void> {
    await telemetryDb
      .update(telemetryRuns)
      .set({ status: 'running', startedAt: new Date() })
      .where(eq(telemetryRuns.id, runId));
    sseManager.broadcast(runId, 'run.started', {
      runId,
      agentId,
      timestamp: new Date().toISOString(),
    });
  },

  async markRunComplete(
    runId: string,
    output: Record<string, unknown>,
    ctx: ExecutionContextImpl,
  ): Promise<void> {
    const usage = ctx.tokenUsage;
    await telemetryDb
      .update(telemetryRuns)
      .set({
        status: 'completed',
        completedAt: new Date(),
        outputJson: JSON.stringify(output),
        totalPromptTokens: usage.promptTokens,
        totalCompletionTokens: usage.completionTokens,
        estimatedCostUsd: usage.estimatedCostUsd,
      })
      .where(eq(telemetryRuns.id, runId));
    sseManager.broadcast(runId, 'run.completed', {
      runId,
      output,
      timestamp: new Date().toISOString(),
    });
    sseManager.close(runId);
    void mcpRegistry.releaseForRun(runId);
  },

  async markRunFailed(
    runId: string,
    error: StepError,
    ctx: ExecutionContextImpl,
  ): Promise<void> {
    const usage = ctx.tokenUsage;
    await telemetryDb
      .update(telemetryRuns)
      .set({
        status: 'failed',
        completedAt: new Date(),
        errorJson: JSON.stringify(error),
        totalPromptTokens: usage.promptTokens,
        totalCompletionTokens: usage.completionTokens,
        estimatedCostUsd: usage.estimatedCostUsd,
      })
      .where(eq(telemetryRuns.id, runId));
    sseManager.broadcast(runId, 'run.failed', {
      runId,
      error: { code: error.code, message: error.message },
      timestamp: new Date().toISOString(),
    });
    sseManager.close(runId);
    void mcpRegistry.releaseForRun(runId);
  },

  async markRunCancelled(runId: string, ctx?: ExecutionContextImpl): Promise<void> {
    const usage = ctx?.tokenUsage;
    await telemetryDb
      .update(telemetryRuns)
      .set({
        status: 'cancelled',
        completedAt: new Date(),
        ...(usage && {
          totalPromptTokens: usage.promptTokens,
          totalCompletionTokens: usage.completionTokens,
          estimatedCostUsd: usage.estimatedCostUsd,
        }),
      })
      .where(eq(telemetryRuns.id, runId));
    sseManager.broadcast(runId, 'run.cancelled', {
      runId,
      timestamp: new Date().toISOString(),
    });
    sseManager.close(runId);
    void mcpRegistry.releaseForRun(runId);
  },

  async markRunSuspended(
    runId: string,
    reviewId: string,
    ctx: ExecutionContextImpl,
    suspendedNodeId?: string,
  ): Promise<void> {
    await telemetryDb
      .update(telemetryRuns)
      .set({
        status: 'suspended',
        reviewId,
        suspendedNodeId: suspendedNodeId ?? null,
        checkpointJson: JSON.stringify(ctx.data),
      })
      .where(eq(telemetryRuns.id, runId));
    sseManager.broadcast(runId, 'run.suspended', {
      runId,
      reviewId,
      timestamp: new Date().toISOString(),
    });
    sseManager.close(runId);
  },

  async writeStepStart(
    runId: string,
    nodeId: string,
    nodeType: string,
    ctx: ExecutionContextImpl,
  ): Promise<string> {
    const stepId = newId();
    await telemetryDb.insert(telemetrySteps).values({
      id: stepId,
      runId,
      tenantId: ctx.tenantId,
      nodeId,
      nodeType,
      status: 'running',
      startedAt: new Date(),
      inputSnapshotJson: JSON.stringify(ctx.data),
    });
    return stepId;
  },

  async writeStepEnd(
    stepId: string,
    output: NodeOutput,
    tokenDelta?: { promptTokens: number; completionTokens: number; estimatedCostUsd: number },
  ): Promise<void> {
    await telemetryDb
      .update(telemetrySteps)
      .set({
        status: output.status === 'complete' ? 'complete' : output.status,
        completedAt: new Date(),
        outputSnapshotJson: JSON.stringify(output.outputs),
        ...(tokenDelta && {
          promptTokens: tokenDelta.promptTokens,
          completionTokens: tokenDelta.completionTokens,
          estimatedCostUsd: tokenDelta.estimatedCostUsd,
        }),
        ...(output.routingMeta && {
          routingMetaJson: JSON.stringify(output.routingMeta),
          routerTargetUsed: output.routingMeta.targetUsed.id,
        }),
      })
      .where(eq(telemetrySteps.id, stepId));
  },

  async writeStepFailed(stepId: string, error: StepError): Promise<void> {
    await telemetryDb
      .update(telemetrySteps)
      .set({
        status: 'failed',
        completedAt: new Date(),
        errorJson: JSON.stringify(error),
      })
      .where(eq(telemetrySteps.id, stepId));
  },

  async writeTrajectorySteps(stepId: string, runId: string, steps: TrajectoryStep[]): Promise<void> {
    if (steps.length === 0) return;
    const now = new Date();
    await telemetryDb.insert(telemetryTrajectories).values(
      steps.map((s) => ({
        id: newId(),
        runId,
        stepId,
        iteration: s.iteration,
        thought: s.reasoning ?? null,
        action: s.toolSelected ?? null,
        toolInputsJson: s.toolInputs ? JSON.stringify(s.toolInputs) : null,
        observation: s.toolOutputs ? JSON.stringify(s.toolOutputs) : null,
        createdAt: now,
      })),
    );
  },

  async writeEvaluateScore(
    stepId: string,
    runId: string,
    nodeId: string,
    scorerType: string,
    score: number,
    rubric?: unknown,
  ): Promise<void> {
    await telemetryDb.insert(telemetryEvaluateScores).values({
      id: newId(),
      runId,
      stepId,
      nodeId,
      scorerType,
      score,
      rubricJson: rubric !== undefined ? JSON.stringify(rubric) : null,
      createdAt: new Date(),
    });
  },
};

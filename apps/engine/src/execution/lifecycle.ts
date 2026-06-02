import { eq } from 'drizzle-orm';
import { telemetryDb } from '../db/telemetry-client';
import { telemetryRuns, telemetrySteps } from '../db/telemetry-schema';
import type { ExecutionContextImpl } from './context';
import type { NodeOutput } from '@magicaal/sdk-node';
import type { StepError } from '@magicaal/core';
import { sseManager } from '../sse/sse-manager';

function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
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
};

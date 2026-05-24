import { eq } from 'drizzle-orm';
import { telemetryDb } from '../db/telemetry-client';
import { telemetryRuns, telemetrySteps } from '../db/telemetry-schema';
import type { ExecutionContextImpl } from './context';
import type { NodeOutput } from '@magicaal/sdk-node';
import type { StepError } from '@magicaal/core';

function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export const lifecycle = {
  async markRunStarted(runId: string): Promise<void> {
    await telemetryDb
      .update(telemetryRuns)
      .set({ status: 'running', startedAt: new Date() })
      .where(eq(telemetryRuns.id, runId));
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
  },

  async markRunSuspended(
    runId: string,
    _reviewId: string,
    _ctx: ExecutionContextImpl,
  ): Promise<void> {
    await telemetryDb
      .update(telemetryRuns)
      .set({ status: 'suspended' })
      .where(eq(telemetryRuns.id, runId));
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

  async writeStepEnd(stepId: string, output: NodeOutput): Promise<void> {
    await telemetryDb
      .update(telemetrySteps)
      .set({
        status: output.status === 'complete' ? 'complete' : output.status,
        completedAt: new Date(),
        outputSnapshotJson: JSON.stringify(output.outputs),
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

import { eq } from 'drizzle-orm';
import { telemetryDb } from '../db/telemetry-client';
import { telemetryRuns } from '../db/telemetry-schema';
import { runTriggerQueue } from '../queue/client';
import { logger } from '../lib/logger';

export type ReviewAction = 'approve' | 'reject';

export interface ReviewResolution {
  action: ReviewAction;
  reason?: string;
  modifications?: Record<string, unknown>;
}

export async function resumeRun(
  runId: string,
  resolution: ReviewResolution,
): Promise<void> {
  const rows = await telemetryDb
    .select()
    .from(telemetryRuns)
    .where(eq(telemetryRuns.id, runId));

  const run = rows[0];
  if (!run) {
    throw Object.assign(new Error(`Run ${runId} not found`), { status: 404, code: 'RUN_NOT_FOUND' });
  }

  if (run.status !== 'suspended') {
    throw Object.assign(
      new Error(`Run ${runId} is not suspended (status: ${run.status})`),
      { status: 409, code: 'RUN_NOT_SUSPENDED' },
    );
  }

  if (resolution.action === 'reject') {
    // Mark as failed immediately
    await telemetryDb
      .update(telemetryRuns)
      .set({
        status: 'failed',
        completedAt: new Date(),
        errorJson: JSON.stringify({
          code: 'HUMAN_REVIEW_REJECTED',
          message: resolution.reason ?? 'Human reviewer rejected the run',
          retryable: false,
        }),
      })
      .where(eq(telemetryRuns.id, runId));
    logger.info({ runId }, 'Run rejected by human reviewer');
    return;
  }

  // Approve: restore checkpoint and re-enqueue from the suspended node
  const checkpointData = run.checkpointJson
    ? (JSON.parse(run.checkpointJson) as Record<string, unknown>)
    : {};

  // Apply any modifications from the reviewer
  if (resolution.modifications) {
    Object.assign(checkpointData, resolution.modifications);
  }

  // Inject approval result into context so the human-review node's downstream
  // edges can route on review outcome
  checkpointData._review_approved = true;
  checkpointData._review_modifications = resolution.modifications ?? null;

  // Reset status to pending so the run can be re-dispatched
  await telemetryDb
    .update(telemetryRuns)
    .set({ status: 'pending' })
    .where(eq(telemetryRuns.id, runId));

  // Re-enqueue with restored checkpoint
  await runTriggerQueue.add('run-resume', {
    runId,
    agentId: run.agentId,
    tenantId: run.tenantId,
    triggerType: run.triggerType,
    input: checkpointData,
    resumeFromNodeId: run.suspendedNodeId ?? undefined,
  });

  logger.info({ runId, suspendedNodeId: run.suspendedNodeId }, 'Run queued for resume');
}

export async function requeuesuspendedRunsOnStartup(): Promise<void> {
  // On engine restart, find any runs that were suspended but never resumed
  // and re-queue them so they aren't permanently stuck
  const suspended = await telemetryDb
    .select()
    .from(telemetryRuns)
    .where(eq(telemetryRuns.status, 'suspended'));

  for (const run of suspended) {
    try {
      // Don't auto-approve — leave suspended runs for explicit human review via the API
      logger.debug({ runId: run.id }, 'Suspended run found on startup — leaving for human review');
    } catch (err) {
      logger.warn({ runId: run.id, err }, 'Error inspecting suspended run on startup');
    }
  }

  if (suspended.length > 0) {
    logger.info({ count: suspended.length }, 'Found suspended runs awaiting human review');
  }
}

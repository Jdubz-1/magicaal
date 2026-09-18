import { eq } from 'drizzle-orm';
import type { ModelRouterConfig } from '@magicaal/core';
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

  // A 'suspended' status also covers a timed core:wait resume (ALIGN-031,
  // 'wait_'-prefixed reviewId) — that path resumes itself via a delayed
  // BullMQ job and must never be pointed at by the human-review API.
  if (!run.reviewId?.startsWith('rev_')) {
    throw Object.assign(
      new Error(`Run ${runId} is not awaiting human review`),
      { status: 409, code: 'RUN_NOT_HUMAN_REVIEWABLE' },
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

  // Dispatch-level fields the original job carried, parked in the checkpoint by
  // markRunSuspended. Taken out before the reviewer's modifications are applied:
  // merging first would let an approver set these keys themselves and have them
  // promoted onto the job, pointing a platform-tenant run's credential
  // resolution at a tenant of their choosing.
  const {
    _dispatch_router_override: routerOverride,
    _dispatch_credential_tenant: credentialTenantId,
    ...restoredContext
  } = checkpointData as Record<string, unknown> & {
    _dispatch_router_override?: ModelRouterConfig;
    _dispatch_credential_tenant?: string;
  };

  // Apply any modifications from the reviewer, minus those reserved keys
  if (resolution.modifications) {
    const {
      _dispatch_router_override: injectedRouter,
      _dispatch_credential_tenant: injectedTenant,
      ...safeModifications
    } = resolution.modifications;
    if (injectedRouter !== undefined || injectedTenant !== undefined) {
      logger.warn(
        { runId },
        'Review modifications tried to set reserved dispatch keys — ignored',
      );
    }
    Object.assign(restoredContext, safeModifications);
  }

  // Inject approval result into context so the human-review node's downstream
  // edges can route on review outcome
  restoredContext._review_approved = true;
  restoredContext._review_modifications = resolution.modifications ?? null;

  // Reset status to pending so the run can be re-dispatched
  await telemetryDb
    .update(telemetryRuns)
    .set({ status: 'pending' })
    .where(eq(telemetryRuns.id, runId));

  // Re-enqueue with restored checkpoint. sessionId comes from the telemetry
  // row (ALIGN-010) — without it the resumed run would lose its session and
  // never release the session lock.
  await runTriggerQueue.add('run-resume', {
    runId,
    agentId: run.agentId,
    tenantId: run.tenantId,
    triggerType: run.triggerType,
    input: restoredContext,
    resumeFromNodeId: run.suspendedNodeId ?? undefined,
    sessionId: run.sessionId ?? undefined,
    ...(routerOverride && { routerOverride }),
    ...(credentialTenantId && { credentialTenantId }),
  });

  logger.info({ runId, suspendedNodeId: run.suspendedNodeId }, 'Run queued for resume');
}

export async function requeuesuspendedRunsOnStartup(): Promise<void> {
  // On engine restart, find any runs that were suspended but never resumed
  // and re-queue them so they aren't permanently stuck.
  //
  // This only concerns human-review suspensions ('rev_'-prefixed reviewId),
  // which have no timer and correctly wait for explicit API action — a timed
  // core:wait suspend (ALIGN-031, 'wait_'-prefixed reviewId) needs no
  // re-arming here: its delayed BullMQ job is a durable Redis sorted-set
  // entry independent of this process, so it fires at its original time
  // whether or not the engine restarted in the meantime.
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

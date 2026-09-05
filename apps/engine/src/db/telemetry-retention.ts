import { eq, lt, and, inArray, notInArray } from 'drizzle-orm';
import { telemetryDb } from './telemetry-client';
import {
  telemetryRuns,
  telemetrySteps,
  telemetryTrajectories,
  telemetryEvaluateScores,
  telemetryMetricsSnapshots,
} from './telemetry-schema';
import { config } from '../config';
import { logger } from '../lib/logger';

/** Chunk size for IN (...) deletes — SQLite's parameter limit is 999. */
const DELETE_CHUNK = 500;

// A run still awaiting something is never swept regardless of age: a
// suspended run's checkpoint is its only resume state, and pending/running
// rows are owned by live workers.
const SWEEPABLE_STATUSES = ['completed', 'failed', 'cancelled'];

/**
 * Delete runs and everything hanging off them, in chunks that stay under
 * SQLite's 999-parameter limit.
 *
 * `onlyTerminal` re-checks run status inside the delete: the retention sweep
 * selects rows and then deletes them in a later statement, so a run may have
 * been resumed in between and must not be swept. A per-agent purge has already
 * refused to run at all if anything is in flight, so it deletes unconditionally
 * — otherwise a purge could leave the run row behind while its steps were gone.
 */
async function deleteRunsWithChildren(
  runIds: string[],
  opts: { onlyTerminal: boolean },
): Promise<void> {
  for (let i = 0; i < runIds.length; i += DELETE_CHUNK) {
    const chunk = runIds.slice(i, i + DELETE_CHUNK);
    await telemetryDb.delete(telemetrySteps).where(inArray(telemetrySteps.runId, chunk));
    await telemetryDb.delete(telemetryTrajectories).where(inArray(telemetryTrajectories.runId, chunk));
    await telemetryDb.delete(telemetryEvaluateScores).where(inArray(telemetryEvaluateScores.runId, chunk));
    await telemetryDb.delete(telemetryMetricsSnapshots).where(inArray(telemetryMetricsSnapshots.runId, chunk));
    await telemetryDb
      .delete(telemetryRuns)
      .where(
        opts.onlyTerminal
          ? and(
              inArray(telemetryRuns.id, chunk),
              notInArray(telemetryRuns.status, ['pending', 'running', 'suspended']),
            )
          : inArray(telemetryRuns.id, chunk),
      );
  }
}

/**
 * Drop an agent's entire run history — used when an agent is purged, so its
 * telemetry does not outlive it as unattributable rows. The caller (the engine's
 * agent teardown) has already rejected the purge if any run is still pending,
 * running, or suspended.
 */
export async function purgeAgentTelemetry(agentId: string): Promise<{ runsDeleted: number }> {
  const rows = await telemetryDb
    .select({ id: telemetryRuns.id })
    .from(telemetryRuns)
    .where(eq(telemetryRuns.agentId, agentId));

  const runIds = rows.map((r) => r.id);
  if (runIds.length === 0) return { runsDeleted: 0 };

  await deleteRunsWithChildren(runIds, { onlyTerminal: false });

  logger.info({ agentId, runsDeleted: runIds.length }, 'Purged agent telemetry');
  return { runsDeleted: runIds.length };
}

/**
 * Count runs that are still in flight for an agent. A suspended run's
 * checkpoint is its only resume state, so these block both archive and purge
 * rather than being destroyed silently.
 */
export async function countActiveRuns(agentId: string): Promise<number> {
  const rows = await telemetryDb
    .select({ id: telemetryRuns.id })
    .from(telemetryRuns)
    .where(
      and(
        eq(telemetryRuns.agentId, agentId),
        inArray(telemetryRuns.status, ['pending', 'running', 'suspended']),
      ),
    );
  return rows.length;
}

/**
 * Telemetry retention (§9.2 / ALIGN-032). Full run/step payloads are stored
 * by design (run results are served from output_json), so the store grows
 * with payload-sized rows — this sweep deletes terminal runs older than
 * TELEMETRY_RETENTION_DAYS along with their steps, trajectories, evaluate
 * scores, and metrics snapshots.
 */
export async function sweepTelemetry(now: Date = new Date()): Promise<{ runsDeleted: number }> {
  if (config.telemetryRetentionDays <= 0) return { runsDeleted: 0 };

  const cutoff = new Date(now.getTime() - config.telemetryRetentionDays * 86_400_000);

  const expired = await telemetryDb
    .select({ id: telemetryRuns.id, status: telemetryRuns.status })
    .from(telemetryRuns)
    .where(lt(telemetryRuns.startedAt, cutoff));

  const runIds = expired.filter((r) => SWEEPABLE_STATUSES.includes(r.status)).map((r) => r.id);
  if (runIds.length === 0) return { runsDeleted: 0 };

  await deleteRunsWithChildren(runIds, { onlyTerminal: true });

  logger.info(
    { runsDeleted: runIds.length, cutoff: cutoff.toISOString() },
    'Telemetry retention sweep completed',
  );
  return { runsDeleted: runIds.length };
}

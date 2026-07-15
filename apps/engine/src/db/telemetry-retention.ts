import { lt, and, inArray, notInArray } from 'drizzle-orm';
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

  for (let i = 0; i < runIds.length; i += DELETE_CHUNK) {
    const chunk = runIds.slice(i, i + DELETE_CHUNK);
    await telemetryDb.delete(telemetrySteps).where(inArray(telemetrySteps.runId, chunk));
    await telemetryDb.delete(telemetryTrajectories).where(inArray(telemetryTrajectories.runId, chunk));
    await telemetryDb.delete(telemetryEvaluateScores).where(inArray(telemetryEvaluateScores.runId, chunk));
    await telemetryDb.delete(telemetryMetricsSnapshots).where(inArray(telemetryMetricsSnapshots.runId, chunk));
    await telemetryDb
      .delete(telemetryRuns)
      .where(
        and(
          inArray(telemetryRuns.id, chunk),
          // Status may have changed since the select (e.g. resumed) — recheck
          notInArray(telemetryRuns.status, ['pending', 'running', 'suspended']),
        ),
      );
  }

  logger.info(
    { runsDeleted: runIds.length, cutoff: cutoff.toISOString() },
    'Telemetry retention sweep completed',
  );
  return { runsDeleted: runIds.length };
}

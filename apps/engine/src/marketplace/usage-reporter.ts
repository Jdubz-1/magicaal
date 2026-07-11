import { config } from '../config';
import { logger } from '../lib/logger';
import { telemetryDb } from '../db/telemetry-client';
import { telemetryRuns } from '../db/telemetry-schema';
import { gte } from 'drizzle-orm';

const REPORT_INTERVAL_MS = 24 * 60 * 60 * 1000; // daily aggregate per MARKETPLACE_SPEC

/**
 * One report tick: send the last 24 hours' aggregate run count. Aggregate
 * only — no run inputs, outputs, or tenant identifiers leave the deployment.
 * Exported for tests; production runs it on a daily timer.
 */
export async function usageReportTick(nowMs: number = Date.now()): Promise<void> {
  const since = new Date(nowMs - REPORT_INTERVAL_MS);

  const rows = await telemetryDb
    .select({ id: telemetryRuns.id })
    .from(telemetryRuns)
    .where(gte(telemetryRuns.startedAt, since));

  const response = await fetch(`${config.marketplaceApiUrl}/api/v1/usage/report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      periodStart: since.toISOString(),
      periodEnd: new Date(nowMs).toISOString(),
      totalRuns: rows.length,
    }),
  });

  if (!response.ok) {
    throw new Error(`usage report returned ${response.status}`);
  }
}

/**
 * Daily aggregate usage reporting. Never starts when
 * MARKETPLACE_ENABLED=false.
 */
export function startUsageReporter(): NodeJS.Timeout | null {
  if (!config.marketplaceEnabled) return null;

  const timer = setInterval(() => {
    void usageReportTick().catch((err) => logger.warn({ err }, 'Usage report failed'));
  }, REPORT_INTERVAL_MS);
  timer.unref();

  logger.info('Usage Reporter started (daily aggregate)');
  return timer;
}

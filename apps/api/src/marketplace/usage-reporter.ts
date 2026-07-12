import { config } from '../config';
import { logger } from '../lib/logger';
import { engineClient } from '../lib/engine-client';
import { marketplaceAuthHeaders } from './account';

const REPORT_INTERVAL_MS = 24 * 60 * 60 * 1000; // daily aggregate per MARKETPLACE_SPEC

/**
 * One report tick: send the last 24 hours' aggregate run count. Aggregate
 * only — no run inputs, outputs, or tenant identifiers leave the deployment.
 * Exported for tests; production runs it on a daily timer.
 *
 * The telemetry DB stays engine-owned, so the count comes from the engine's
 * internal aggregate endpoint; only the Marketplace call (which needs the
 * account key) lives here.
 */
export async function usageReportTick(nowMs: number = Date.now()): Promise<void> {
  const since = new Date(nowMs - REPORT_INTERVAL_MS);

  const headers = await marketplaceAuthHeaders();
  if (!headers) {
    logger.warn('Usage report skipped — no MagiCaal Account linked');
    return;
  }

  const { data } = await engineClient.get('/internal/telemetry/usage', {
    params: { since: since.toISOString() },
  });
  const { totalRuns } = data as { totalRuns: number };

  const response = await fetch(`${config.marketplaceApiUrl}/api/v1/usage/report`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      periodStart: since.toISOString(),
      periodEnd: new Date(nowMs).toISOString(),
      totalRuns,
    }),
  });

  if (!response.ok) {
    throw new Error(`usage report returned ${response.status}`);
  }
}

/** Daily aggregate usage reporting. Never starts when MARKETPLACE_ENABLED=false. */
export function startUsageReporter(): NodeJS.Timeout | null {
  if (!config.marketplaceEnabled) return null;

  const timer = setInterval(() => {
    void usageReportTick().catch((err) => logger.warn({ err }, 'Usage report failed'));
  }, REPORT_INTERVAL_MS);
  timer.unref();

  logger.info('Usage Reporter started (daily aggregate)');
  return timer;
}

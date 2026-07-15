import { gte } from 'drizzle-orm';
import { config } from '../config';
import { logger } from '../lib/logger';
import { engineClient } from '../lib/engine-client';
import { db } from '../db/client';
import { usageCounters } from '../db/schema';
import { marketplaceAuthHeaders } from './account';

const REPORT_INTERVAL_MS = 24 * 60 * 60 * 1000; // daily aggregate per MARKETPLACE_SPEC

/**
 * Per-asset invocation counts for the window, summed across tenants —
 * counterKey is `{tenantId}:{publisher}/{name}:{day}` but no tenant
 * identifiers leave the deployment (MARKETPLACE_SPEC privacy posture).
 */
async function assetUsageSince(sinceMs: number): Promise<Record<string, number>> {
  const rows = await db
    .select({ counterKey: usageCounters.counterKey, value: usageCounters.value })
    .from(usageCounters)
    .where(gte(usageCounters.windowStart, Math.floor(sinceMs / 1000)));

  const byAsset: Record<string, number> = {};
  for (const row of rows) {
    // tenantId and day are single segments; the packageId between them may
    // itself contain ':'-free '/'-joined publisher/name
    const parts = row.counterKey.split(':');
    if (parts.length < 3) continue;
    const packageId = parts.slice(1, -1).join(':');
    byAsset[packageId] = (byAsset[packageId] ?? 0) + row.value;
  }
  return byAsset;
}

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

  // Per-asset counts (§8.2 / ALIGN-019) — what usage-type licenses bill on
  const assetUsage = await assetUsageSince(since.getTime());

  const response = await fetch(`${config.marketplaceApiUrl}/api/v1/usage/report`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      periodStart: since.toISOString(),
      periodEnd: new Date(nowMs).toISOString(),
      totalRuns,
      assetUsage,
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

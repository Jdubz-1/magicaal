import { eq, ne, and, isNull } from 'drizzle-orm';
import { db } from '../db/client';
import { assetLicenses } from '../db/schema';
import { config } from '../config';
import { logger } from '../lib/logger';
import { marketplaceAuthHeaders } from './account';

const HEARTBEAT_INTERVAL_MS = 60 * 60 * 1000; // hourly per MARKETPLACE_SPEC
const GRACE_PERIOD_MS = 72 * 60 * 60 * 1000; // 72-hour grace on heartbeat failure

/**
 * One heartbeat tick: report active licenses to the Marketplace, apply the
 * response, and manage the 72-hour grace window when the service is
 * unreachable. Exported for tests; production runs it on an hourly timer.
 *
 * Lives in the API (not the engine) because the Marketplace account key is
 * stored here and the API owns all primary-DB writes.
 */
export async function licenseHeartbeatTick(nowMs: number = Date.now()): Promise<void> {
  const licenses = await db
    .select({
      id: assetLicenses.id,
      packageId: assetLicenses.packageId,
      status: assetLicenses.status,
      gracePeriodEndsAt: assetLicenses.gracePeriodEndsAt,
    })
    .from(assetLicenses)
    .where(ne(assetLicenses.status, 'expired'));

  if (licenses.length === 0) return;

  const headers = await marketplaceAuthHeaders();
  if (!headers) {
    logger.warn('License heartbeat skipped — no MagiCaal Account linked');
    return;
  }

  try {
    const response = await fetch(`${config.marketplaceApiUrl}/api/v1/licenses/heartbeat`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        licenses: licenses.map((l) => ({ licenseId: l.id, packageId: l.packageId })),
      }),
    });

    if (!response.ok) throw new Error(`heartbeat returned ${response.status}`);

    const body = (await response.json()) as {
      results?: Array<{ licenseId: string; valid: boolean }>;
    };

    for (const license of licenses) {
      const result = body.results?.find((r) => r.licenseId === license.id);

      // A license absent from the response is NOT an endorsement: leave it as
      // it is rather than re-activating it, so a partial or malformed response
      // cannot silently reinstate a revoked license.
      if (result === undefined) continue;

      if (result.valid) {
        await db
          .update(assetLicenses)
          .set({ status: 'active', lastValidatedAt: new Date(nowMs), gracePeriodEndsAt: null })
          .where(eq(assetLicenses.id, license.id));
      } else {
        await db
          .update(assetLicenses)
          .set({ status: 'expired' })
          .where(eq(assetLicenses.id, license.id));
        logger.warn({ licenseId: license.id }, 'License revoked by Marketplace heartbeat');
      }
    }
  } catch (err) {
    // Marketplace unreachable — open the grace window rather than cutting
    // customers off on a transient outage.
    const graceEnds = new Date(nowMs + GRACE_PERIOD_MS);

    await db
      .update(assetLicenses)
      .set({ status: 'grace', gracePeriodEndsAt: graceEnds })
      .where(and(ne(assetLicenses.status, 'expired'), isNull(assetLicenses.gracePeriodEndsAt)));

    for (const license of licenses) {
      if (license.gracePeriodEndsAt && license.gracePeriodEndsAt.getTime() <= nowMs) {
        await db
          .update(assetLicenses)
          .set({ status: 'expired' })
          .where(eq(assetLicenses.id, license.id));
        logger.warn({ licenseId: license.id }, 'License grace period expired');
      }
    }

    logger.warn({ err }, 'License heartbeat failed — grace window applied');
  }
}

/**
 * Hourly license heartbeat. Never starts when MARKETPLACE_ENABLED=false —
 * air-gapped and standalone deployments run no Marketplace background work.
 */
export function startLicenseValidator(): NodeJS.Timeout | null {
  if (!config.marketplaceEnabled) return null;

  const timer = setInterval(() => {
    void licenseHeartbeatTick().catch((err) =>
      logger.error({ err }, 'License heartbeat tick failed'),
    );
  }, HEARTBEAT_INTERVAL_MS);
  timer.unref();

  logger.info('License Validator started (hourly heartbeat)');
  return timer;
}

import { config } from '../config';
import { logger } from '../lib/logger';

/**
 * Report a run's per-package node-execution counts to the API, which upserts
 * usage_counters (the engine's primary-DB access is read-only by design).
 * Fire-and-forget: usage metering must never affect run outcomes.
 */
export async function reportPackageUsage(
  tenantId: string,
  counts: Record<string, number>,
): Promise<void> {
  try {
    const res = await fetch(`${config.apiBaseUrl}/internal/marketplace/usage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Auth': config.masterKey,
      },
      body: JSON.stringify({ tenantId, counts }),
    });
    if (!res.ok) {
      logger.warn({ tenantId, status: res.status }, 'Package usage report rejected by API');
    }
  } catch (err) {
    logger.warn({ tenantId, err }, 'Package usage report failed');
  }
}

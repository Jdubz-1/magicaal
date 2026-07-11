import Database from 'better-sqlite3';
import { config } from '../config';
import { logger } from '../lib/logger';

const HEARTBEAT_INTERVAL_MS = 60 * 60 * 1000; // hourly per MARKETPLACE_SPEC
const GRACE_PERIOD_MS = 72 * 60 * 60 * 1000; // 72-hour grace on heartbeat failure

interface LicenseRow {
  id: string;
  package_id: string;
  license_type: string;
  status: string;
  grace_period_ends_at: number | null;
}

function openDb(): Database.Database {
  const dbPath = config.databasePath.replace(/^file:/, '');
  return new Database(dbPath);
}

/**
 * One heartbeat tick: report active licenses to the Marketplace, apply the
 * response, and manage the 72-hour grace window when the service is
 * unreachable. Exported for tests; production runs it on an hourly timer.
 */
export async function licenseHeartbeatTick(
  db: Database.Database,
  nowMs: number = Date.now(),
): Promise<void> {
  const licenses = db
    .prepare(`SELECT id, package_id, license_type, status, grace_period_ends_at
              FROM asset_licenses WHERE status != 'expired'`)
    .all() as LicenseRow[];

  if (licenses.length === 0) return;

  try {
    const response = await fetch(`${config.marketplaceApiUrl}/api/v1/licenses/heartbeat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        licenses: licenses.map((l) => ({ licenseId: l.id, packageId: l.package_id })),
      }),
    });

    if (!response.ok) throw new Error(`heartbeat returned ${response.status}`);

    const body = (await response.json()) as {
      results?: Array<{ licenseId: string; valid: boolean }>;
    };

    const markValid = db.prepare(
      `UPDATE asset_licenses SET status = 'active', last_validated_at = ?, grace_period_ends_at = NULL WHERE id = ?`,
    );
    const markRevoked = db.prepare(`UPDATE asset_licenses SET status = 'expired' WHERE id = ?`);

    for (const license of licenses) {
      const result = body.results?.find((r) => r.licenseId === license.id);
      if (result === undefined || result.valid) {
        markValid.run(Math.floor(nowMs / 1000), license.id);
      } else {
        markRevoked.run(license.id);
        logger.warn({ licenseId: license.id }, 'License revoked by Marketplace heartbeat');
      }
    }
  } catch (err) {
    // Marketplace unreachable — start or continue the grace window
    const startGrace = db.prepare(
      `UPDATE asset_licenses SET status = 'grace', grace_period_ends_at = ? WHERE id = ? AND grace_period_ends_at IS NULL`,
    );
    const expire = db.prepare(`UPDATE asset_licenses SET status = 'expired' WHERE id = ?`);

    for (const license of licenses) {
      if (license.grace_period_ends_at === null) {
        startGrace.run(Math.floor((nowMs + GRACE_PERIOD_MS) / 1000), license.id);
      } else if (license.grace_period_ends_at * 1000 <= nowMs) {
        expire.run(license.id);
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

  const db = openDb();
  const timer = setInterval(() => {
    void licenseHeartbeatTick(db).catch((err) =>
      logger.error({ err }, 'License heartbeat tick failed'),
    );
  }, HEARTBEAT_INTERVAL_MS);
  timer.unref();

  logger.info('License Validator started (hourly heartbeat)');
  return timer;
}

import Database from 'better-sqlite3';
import { config } from '../config';
import { logger } from '../lib/logger';

// Shared read-only connection to the primary DB (same pattern as graph-loader
// and credential-resolver — the API owns all writes).
let sqlite: Database.Database | null = null;

function getDb(): Database.Database {
  if (!sqlite) {
    const dbPath = config.databasePath.replace(/^file:/, '');
    sqlite = new Database(dbPath, { readonly: true });
    sqlite.pragma('journal_mode = WAL');
  }
  return sqlite;
}

/**
 * The packages a tenant may execute, as `{publisher}/{name}`.
 *
 * Installed packages are hot-loaded into the engine-wide node registry, but
 * package_registry rows are per-tenant — so without this, any tenant could
 * execute a node type from a package another tenant installed (and paid for).
 * A package counts as entitled when it is installed for the tenant, enabled,
 * and its license is active or inside its grace window.
 */
export function loadEntitledPackages(tenantId: string): Set<string> {
  try {
    const rows = getDb()
      .prepare(
        `SELECT DISTINCT pr.publisher AS publisher, pr.name AS name
           FROM package_registry pr
           JOIN asset_licenses al ON al.package_id = pr.id
          WHERE pr.tenant_id = ?
            AND pr.enabled = 1
            AND al.status IN ('active', 'grace')`,
      )
      .all(tenantId) as Array<{ publisher: string; name: string }>;

    return new Set(rows.map((r) => `${r.publisher}/${r.name}`));
  } catch (err) {
    // Fail closed: an unreadable registry must not grant execution rights.
    logger.error({ tenantId, err }, 'Failed to load package entitlements — denying package nodes');
    return new Set();
  }
}

/**
 * Built-in node types are available to every tenant; a package-provided type
 * requires an entitlement. `packageId` is undefined for built-ins.
 */
export function isNodeTypeAllowed(
  packageId: string | undefined,
  entitled: ReadonlySet<string>,
): boolean {
  if (packageId === undefined) return true;
  return entitled.has(packageId);
}

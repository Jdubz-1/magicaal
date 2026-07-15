import Database from 'better-sqlite3';
import type { TenantResourceLimits } from '@magicaal/core';
import { config } from '../config';
import { logger } from '../lib/logger';

// Shared read-only connection to the primary DB (same pattern as
// entitlements, graph-loader, invocation-auth — the API owns all writes).
let sqlite: Database.Database | null = null;

function getDb(): Database.Database {
  if (!sqlite) {
    const dbPath = config.databasePath.replace(/^file:/, '');
    sqlite = new Database(dbPath, { readonly: true });
    sqlite.pragma('journal_mode = WAL');
  }
  return sqlite;
}

// Limits are consulted on every job admission and invocation validation; a
// short cache keeps that off the hot path while letting admin edits take
// effect within seconds.
const CACHE_TTL_MS = 30_000;
const cache = new Map<string, { limits: TenantResourceLimits; loadedAt: number }>();

/**
 * The tenant's resource_limits (§14.2 / ALIGN-018), parsed and cached.
 * Fails open to {} — a broken row or missing tenant must never stop runs;
 * the platform-wide env caps still apply.
 */
export function loadTenantLimits(tenantId: string): TenantResourceLimits {
  const cached = cache.get(tenantId);
  if (cached && Date.now() - cached.loadedAt < CACHE_TTL_MS) return cached.limits;

  let limits: TenantResourceLimits = {};
  try {
    const row = getDb()
      .prepare('SELECT resource_limits AS resourceLimits FROM tenants WHERE id = ?')
      .get(tenantId) as { resourceLimits: string | null } | undefined;
    if (row?.resourceLimits) {
      const parsed = JSON.parse(row.resourceLimits) as unknown;
      if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        limits = parsed as TenantResourceLimits;
      }
    }
  } catch (err) {
    logger.warn({ tenantId, err }, 'Failed to load tenant resource limits — using platform defaults');
  }

  cache.set(tenantId, { limits, loadedAt: Date.now() });
  return limits;
}

/** Test hook: drop cached limits so a fresh row is read. */
export function clearTenantLimitsCache(): void {
  cache.clear();
}

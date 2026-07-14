import * as crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import { evaluate } from '@magicaal/nodes';
import type { SessionConfig, SessionSchemaMigration, ContextSchemaEntry } from '@magicaal/core';
import { db } from '../db/client';
import { sessions, sessionContext } from '../db/schema';
import { logger } from './logger';

const TRANSFORM_TIMEOUT_MS = 5_000;

/**
 * Find a contiguous migration chain fromVersion → toVersion (ARCHITECTURE
 * §14.5). Returns the ordered migrations, or null when any hop is missing.
 */
export function findMigrationPath(
  migrations: SessionSchemaMigration[] | undefined,
  fromVersion: number,
  toVersion: number,
): SessionSchemaMigration[] | null {
  if (fromVersion >= toVersion) return [];
  const path: SessionSchemaMigration[] = [];
  let cursor = fromVersion;
  while (cursor < toVersion) {
    const next = (migrations ?? []).find((m) => m.fromVersion === cursor);
    if (!next || next.toVersion <= cursor) return null;
    path.push(next);
    cursor = next.toVersion;
  }
  return cursor === toVersion ? path : null;
}

/**
 * Apply a migration chain to a session context snapshot. Each migration's
 * transform maps new-schema keys to JSONata expressions evaluated against the
 * previous context. Untransformed keys are preserved (non-destructive — keys
 * no longer in the schema are simply ignored by accumulation).
 */
export async function applyMigrationChain(
  context: Record<string, unknown>,
  path: SessionSchemaMigration[],
): Promise<Record<string, unknown>> {
  let current = { ...context };
  for (const migration of path) {
    const next: Record<string, unknown> = { ...current };
    for (const [newKey, expression] of Object.entries(migration.transform)) {
      next[newKey] = await evaluate(expression, current, { timeoutMs: TRANSFORM_TIMEOUT_MS });
    }
    current = next;
  }
  return current;
}

export type MigrationOutcome = 'migrated' | 'up-to-date' | 'stale_schema';

/**
 * Bring one session up to the agent's current schema version, rewriting its
 * context rows in place. Marks the session `stale_schema` when no contiguous
 * migration path exists (the session keeps functioning; unmigrated keys just
 * stop matching the new schema — §14.5).
 */
export async function migrateSessionToCurrent(
  sessionId: string,
  storedVersion: number,
  sessionConfig: SessionConfig,
): Promise<MigrationOutcome> {
  const targetVersion = sessionConfig.schemaVersion ?? 1;
  if (storedVersion >= targetVersion) return 'up-to-date';

  const path = findMigrationPath(sessionConfig.migrations, storedVersion, targetVersion);
  if (path === null) {
    await db
      .update(sessions)
      .set({ status: 'stale_schema' })
      .where(eq(sessions.id, sessionId));
    logger.warn(
      { sessionId, storedVersion, targetVersion },
      'No migration path for session schema — marked stale_schema',
    );
    return 'stale_schema';
  }

  const rows = await db.select().from(sessionContext).where(eq(sessionContext.sessionId, sessionId));
  const context = Object.fromEntries(rows.map((r) => [r.key, JSON.parse(r.valueJson) as unknown]));

  const migrated = await applyMigrationChain(context, path);

  const now = new Date();
  await db.delete(sessionContext).where(eq(sessionContext.sessionId, sessionId));
  for (const [key, value] of Object.entries(migrated)) {
    if (value === undefined) continue;
    const schemaEntry = sessionConfig.contextSchema?.[key] as ContextSchemaEntry | undefined;
    await db.insert(sessionContext).values({
      id: crypto.randomUUID(),
      sessionId,
      key,
      valueJson: JSON.stringify(value),
      accumulatedCount: Array.isArray(value) ? value.length : 1,
      accumulationType: schemaEntry?.type ?? 'replace',
      schemaVersion: targetVersion,
      updatedAt: now,
    });
  }

  await db
    .update(sessions)
    .set({ schemaVersion: targetVersion, status: 'active' })
    .where(eq(sessions.id, sessionId));

  logger.info({ sessionId, from: storedVersion, to: targetVersion }, 'Session schema migrated');
  return 'migrated';
}

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as crypto from 'node:crypto';
import { eq, and, notInArray } from 'drizzle-orm';
import type { AgentGraphDefinition } from '@magicaal/core';
import { db } from '../db/client';
import { agents, agentVersions, agentConfig, syncEvents } from '../db/schema';
import { logger } from '../lib/logger';
import { PLATFORM_TENANT_ID } from '../platform/bootstrap';

export interface ManifestEntry {
  handle: string;
  file: string;
  hash: string;
}

export interface SyncResult {
  inserted: number;
  updated: number;
  stale: number;
  errors: string[];
}

export async function bootTimeSync(agentsDir: string): Promise<SyncResult> {
  const startedAt = new Date();
  const result: SyncResult = { inserted: 0, updated: 0, stale: 0, errors: [] };

  const manifestPath = join(agentsDir, 'agents.manifest.json');
  if (!existsSync(manifestPath)) {
    logger.info({ agentsDir }, 'No agents.manifest.json found — skipping boot-time sync');
    return result;
  }

  let manifest: { agents: ManifestEntry[] };
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as { agents: ManifestEntry[] };
  } catch (err) {
    logger.warn({ agentsDir, err }, 'Failed to parse agents.manifest.json');
    result.errors.push(`Failed to parse manifest: ${err instanceof Error ? err.message : String(err)}`);
    await writeSyncEvent(startedAt, result, 0);
    return result;
  }

  const syncedHandles: string[] = [];

  for (const entry of manifest.agents) {
    try {
      await syncAgent(agentsDir, entry, result);
      syncedHandles.push(entry.handle);
    } catch (err) {
      const msg = `Failed to sync agent "${entry.handle}": ${err instanceof Error ? err.message : String(err)}`;
      logger.warn({ handle: entry.handle, err }, msg);
      result.errors.push(msg);
    }
  }

  // Mark code-defined agents no longer in the manifest as stale
  if (syncedHandles.length > 0) {
    const staleAgents = await db
      .select({ id: agents.id, handle: agents.handle })
      .from(agents)
      .where(
        and(
          eq(agents.authoringMode, 'code-defined'),
          notInArray(agents.handle, syncedHandles),
          eq(agents.stale, false),
        ),
      );

    for (const staleAgent of staleAgents) {
      await db.update(agents).set({ stale: true, updatedAt: new Date() }).where(eq(agents.id, staleAgent.id));
      result.stale++;
      logger.info({ handle: staleAgent.handle }, 'Marked agent as stale (not in current manifest)');
    }
  }

  const completedAt = new Date();
  await writeSyncEvent(startedAt, result, manifest.agents.length, completedAt, syncedHandles);

  logger.info(
    { inserted: result.inserted, updated: result.updated, stale: result.stale, errors: result.errors.length },
    'Boot-time sync complete',
  );

  return result;
}

/**
 * Derive the per-field override map from the definition's `overridable` policy
 * (ARCHITECTURE §5.2/§5.4). Fields default to locked — code is the source of
 * truth unless the agent author explicitly opens a field to admin override.
 */
const SYNCED_CONFIG_FIELDS = ['trigger', 'concurrency', 'retry'] as const;

export function resolveOverrideMap(
  overridable: boolean | Record<string, boolean> | undefined,
): Record<string, 'locked' | 'overridable'> {
  const map: Record<string, 'locked' | 'overridable'> = {};
  for (const field of SYNCED_CONFIG_FIELDS) {
    const flag = typeof overridable === 'object' ? overridable[field] : overridable;
    map[field] = flag === true ? 'overridable' : 'locked';
  }
  return map;
}

async function syncAgent(
  agentsDir: string,
  entry: ManifestEntry,
  result: SyncResult,
): Promise<void> {
  const agentFilePath = join(agentsDir, `${entry.handle}.agent.json`);
  if (!existsSync(agentFilePath)) {
    throw new Error(`Agent file not found: ${agentFilePath}`);
  }

  const definition = JSON.parse(readFileSync(agentFilePath, 'utf8')) as AgentGraphDefinition;
  const graphJson = JSON.stringify(definition);
  const contentHash = crypto.createHash('sha256').update(graphJson).digest('hex');

  // Look up by handle
  const existingRows = await db.select().from(agents).where(eq(agents.handle, entry.handle));
  const existing = existingRows[0];
  const now = new Date();

  if (!existing) {
    // New code-defined agent
    const agentId = crypto.randomUUID();
    const versionId = crypto.randomUUID();
    await db.insert(agents).values({
      id: agentId,
      tenantId: PLATFORM_TENANT_ID,
      name: definition.name,
      handle: entry.handle,
      description: definition.description,
      authoringMode: 'code-defined',
      status: 'draft',
      enabled: false,
      stale: false,
      currentVersionId: versionId,
      createdAt: now,
      updatedAt: now,
    });
    await db.insert(agentVersions).values({
      id: versionId,
      agentId,
      versionNumber: 1,
      graphJson,
      contentHash,
      createdBy: 'boot-sync',
      createdAt: now,
    });
    await db.insert(agentConfig).values({
      agentId,
      triggerConfig: JSON.stringify(definition.config?.trigger ?? {}),
      concurrency: JSON.stringify(definition.config?.concurrency ?? {}),
      retry: JSON.stringify(definition.config?.retry ?? {}),
      overrideMap: JSON.stringify(resolveOverrideMap(definition.overridable)),
      updatedAt: now,
    });
    result.inserted++;
    logger.info({ handle: entry.handle, agentId }, 'Inserted new code-defined agent');
  } else if (existing.currentVersionId) {
    // Check if hash has changed
    const versionRows = await db
      .select({ contentHash: agentVersions.contentHash, versionNumber: agentVersions.versionNumber })
      .from(agentVersions)
      .where(eq(agentVersions.id, existing.currentVersionId));
    const currentVersion = versionRows[0];

    if (currentVersion?.contentHash === contentHash) {
      // No change — ensure stale flag is clear
      if (existing.stale) {
        await db.update(agents).set({ stale: false, updatedAt: now }).where(eq(agents.id, existing.id));
      }
      return; // Skip
    }

    // Hash changed — insert new version
    const newVersionId = crypto.randomUUID();
    const nextVersionNumber = (currentVersion?.versionNumber ?? 0) + 1;
    await db.insert(agentVersions).values({
      id: newVersionId,
      agentId: existing.id,
      versionNumber: nextVersionNumber,
      graphJson,
      contentHash,
      createdBy: 'boot-sync',
      createdAt: now,
    });
    await db
      .update(agents)
      .set({ currentVersionId: newVersionId, stale: false, name: definition.name, updatedAt: now })
      .where(eq(agents.id, existing.id));
    // Update agent config — ARCHITECTURE §5.4: locked fields always take the
    // incoming code value (code is their source of truth); admin-overridable
    // fields keep the stored value once an admin has set one. The override
    // policy itself is code-owned, so it is re-derived from the definition
    // on every sync rather than read back from the DB.
    const existingConfigRows = await db.select().from(agentConfig).where(eq(agentConfig.agentId, existing.id));
    const existingConfig = existingConfigRows[0];
    const overrideMap = resolveOverrideMap(definition.overridable);

    const newTrigger = JSON.stringify(definition.config?.trigger ?? {});
    const newConcurrency = JSON.stringify(definition.config?.concurrency ?? {});
    const newRetry = JSON.stringify(definition.config?.retry ?? {});

    const keepStored = (field: string, current: string | null | undefined): current is string =>
      overrideMap[field] !== 'locked' && current != null;

    await db.update(agentConfig).set({
      triggerConfig: keepStored('trigger', existingConfig?.triggerConfig) ? existingConfig!.triggerConfig : newTrigger,
      concurrency: keepStored('concurrency', existingConfig?.concurrency) ? existingConfig!.concurrency : newConcurrency,
      retry: keepStored('retry', existingConfig?.retry) ? existingConfig!.retry : newRetry,
      overrideMap: JSON.stringify(overrideMap),
      updatedAt: now,
    }).where(eq(agentConfig.agentId, existing.id));

    result.updated++;
    logger.info({ handle: entry.handle, version: nextVersionNumber }, 'Updated code-defined agent');
  }
}

async function writeSyncEvent(
  startedAt: Date,
  result: SyncResult,
  agentsProcessed: number,
  completedAt?: Date,
  syncedHandles?: string[],
): Promise<void> {
  try {
    await db.insert(syncEvents).values({
      id: crypto.randomUUID(),
      trigger: 'boot',
      startedAt,
      completedAt: completedAt ?? null,
      agentsProcessed,
      changesApplied: result.inserted + result.updated,
      errorCount: result.errors.length,
      summaryJson: JSON.stringify({
        inserted: result.inserted,
        updated: result.updated,
        stale: result.stale,
        errors: result.errors,
        handles: syncedHandles ?? [],
      }),
      createdAt: startedAt,
    });
  } catch (err) {
    logger.warn({ err }, 'Failed to write sync event');
  }
}

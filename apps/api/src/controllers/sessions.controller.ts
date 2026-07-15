import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq, and, or, desc, lte, inArray } from 'drizzle-orm';
import type { SessionConfig, ContextSchemaEntry, ModelRouterConfig } from '@magicaal/core';
import { db } from '../db/client';
import { sessions, sessionContext, sessionRunLinks, agents, promptVersions } from '../db/schema';
import { migrateSessionToCurrent } from '../lib/session-migration';
import { loadAgentSessionConfig } from '../lib/agent-session-config';
import { engineClient } from '../lib/engine-client';
import { logger } from '../lib/logger';

function newId(): string {
  return crypto.randomUUID();
}

// ── Accumulation helpers (ALIGN-012) — exported for unit tests ────────────────

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** §14.4: merge is deep — nested objects merge recursively; arrays and scalars replace. */
export function deepMerge(
  current: Record<string, unknown>,
  incoming: Record<string, unknown>,
): Record<string, unknown> {
  const out = { ...current };
  for (const [key, value] of Object.entries(incoming)) {
    const prev = out[key];
    out[key] = isPlainObject(prev) && isPlainObject(value) ? deepMerge(prev, value) : value;
  }
  return out;
}

/**
 * Dedupe an append array by a field, keeping the NEWEST occurrence of each
 * value and preserving the relative order of survivors. Items without the
 * field are kept as-is.
 */
export function dedupeByField(arr: unknown[], field: string): unknown[] {
  const seen = new Set<unknown>();
  const out: unknown[] = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    const item = arr[i];
    const raw = isPlainObject(item) ? item[field] : undefined;
    if (raw === undefined) {
      out.push(item);
      continue;
    }
    const key = typeof raw === 'object' ? JSON.stringify(raw) : raw;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out.reverse();
}

/**
 * ~4 chars per token — the same heuristic used for cost estimation elsewhere.
 * ContextSchemaEntry.maxTokens is a budget, not an exact contract; a cheap
 * estimate at save time beats a tokenizer dependency.
 */
export function estimateTokens(json: string): number {
  return Math.ceil(json.length / 4);
}

/**
 * Filter out per-key-TTL-expired context rows (ALIGN-012), deleting them
 * lazily. Every context read path goes through here so an expired key never
 * reaches a run or an admin view.
 */
async function pruneExpiredContext<T extends { id: string; expiresAt: Date | null }>(
  rows: T[],
): Promise<T[]> {
  const now = Date.now();
  const expired = rows.filter((r) => r.expiresAt !== null && r.expiresAt.getTime() <= now);
  if (expired.length > 0) {
    await db.delete(sessionContext).where(inArray(sessionContext.id, expired.map((r) => r.id)));
  }
  return rows.filter((r) => !(r.expiresAt !== null && r.expiresAt.getTime() <= now));
}

// ── Public API handlers ────────────────────────────────────────────────────────

export const listSessions: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id: agentId } = req.params;
    const { status } = req.query as { status?: string };

    const conditions = [eq(sessions.tenantId, tenantId), eq(sessions.agentId, agentId)];
    if (status && ['active', 'stale_schema', 'expired'].includes(status)) {
      conditions.push(eq(sessions.status, status as 'active' | 'stale_schema' | 'expired'));
    }

    const rows = await db
      .select()
      .from(sessions)
      .where(and(...conditions))
      .orderBy(desc(sessions.lastActiveAt));

    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const getSession: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { sid } = req.params;

    const sessionRows = await db
      .select()
      .from(sessions)
      .where(and(eq(sessions.id, sid), eq(sessions.tenantId, tenantId)));

    if (!sessionRows[0]) {
      throw Object.assign(new Error('Session not found'), { status: 404 });
    }

    const contextRows = await pruneExpiredContext(
      await db.select().from(sessionContext).where(eq(sessionContext.sessionId, sid)),
    );

    const session = sessionRows[0];
    res.json({
      session: {
        ...session,
        metadata: session.metadata ? (JSON.parse(session.metadata) as Record<string, unknown>) : null,
      },
      contextEntries: Object.fromEntries(
        contextRows.map((r) => [r.key, JSON.parse(r.valueJson)]),
      ),
    });
  } catch (err) {
    next(err);
  }
};

export const getSessionRuns: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { sid } = req.params;

    const sessionRows = await db
      .select({ id: sessions.id })
      .from(sessions)
      .where(and(eq(sessions.id, sid), eq(sessions.tenantId, tenantId)));

    if (!sessionRows[0]) {
      throw Object.assign(new Error('Session not found'), { status: 404 });
    }

    const links = await db
      .select()
      .from(sessionRunLinks)
      .where(eq(sessionRunLinks.sessionId, sid))
      .orderBy(sessionRunLinks.position);

    res.json(links);
  } catch (err) {
    next(err);
  }
};

export const deleteSession: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { sid } = req.params;

    const sessionRows = await db
      .select({ id: sessions.id })
      .from(sessions)
      .where(and(eq(sessions.id, sid), eq(sessions.tenantId, tenantId)));

    if (!sessionRows[0]) {
      throw Object.assign(new Error('Session not found'), { status: 404 });
    }

    await db.delete(sessionContext).where(eq(sessionContext.sessionId, sid));
    await db.delete(sessionRunLinks).where(eq(sessionRunLinks.sessionId, sid));
    await db.delete(sessions).where(eq(sessions.id, sid));

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export const resetSession: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { sid } = req.params;

    const sessionRows = await db
      .select({ id: sessions.id })
      .from(sessions)
      .where(and(eq(sessions.id, sid), eq(sessions.tenantId, tenantId)));

    if (!sessionRows[0]) {
      throw Object.assign(new Error('Session not found'), { status: 404 });
    }

    await db.delete(sessionContext).where(eq(sessionContext.sessionId, sid));
    await db.update(sessions).set({ lastActiveAt: new Date() }).where(eq(sessions.id, sid));

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

export const migrateAgentSessions: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id: agentRef } = req.params;

    // The CLI's documented interface is --agent <handle> (ALIGN-013); accept
    // either the id or the handle, tenant-scoped.
    const agentRows = await db
      .select({ id: agents.id })
      .from(agents)
      .where(and(eq(agents.tenantId, tenantId), or(eq(agents.id, agentRef), eq(agents.handle, agentRef))));

    if (!agentRows[0]) {
      throw Object.assign(new Error('Agent not found'), { status: 404 });
    }
    const agentId = agentRows[0].id;

    const sessionConfig = await loadAgentSessionConfig(agentId);
    if (!sessionConfig?.enabled) {
      throw Object.assign(
        new Error('Agent has no session configuration on its current version'),
        { status: 400, code: 'NO_SESSION_CONFIG' },
      );
    }

    // Batch-apply the migration chain (§14.5) to every non-expired session
    // that is behind the current schema version — including previously
    // stale-marked sessions, for which a path may exist now.
    const candidates = await db
      .select({ id: sessions.id, schemaVersion: sessions.schemaVersion, status: sessions.status })
      .from(sessions)
      .where(eq(sessions.agentId, agentId));

    let migrated = 0;
    let skipped = 0;
    let failed = 0;
    for (const session of candidates) {
      if (session.status === 'expired') {
        skipped++;
        continue;
      }
      try {
        const outcome = await migrateSessionToCurrent(session.id, session.schemaVersion, sessionConfig);
        if (outcome === 'migrated') migrated++;
        else skipped++;
      } catch {
        failed++;
      }
    }

    res.json({ migrated, skipped, failed });
  } catch (err) {
    next(err);
  }
};

// ── Internal handlers (engine → API) ──────────────────────────────────────────

export const internalGetSession: RequestHandler = async (req, res, next) => {
  try {
    const { sessionId } = req.params;

    const sessionRows = await db.select().from(sessions).where(eq(sessions.id, sessionId));
    const session = sessionRows[0];

    if (!session) {
      throw Object.assign(new Error('Session not found'), { status: 404 });
    }

    const contextRows = await pruneExpiredContext(
      await db.select().from(sessionContext).where(eq(sessionContext.sessionId, sessionId)),
    );

    res.json({
      session,
      contextEntries: Object.fromEntries(
        contextRows.map((r) => [r.key, JSON.parse(r.valueJson)]),
      ),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Engine load path (ALIGN-008). Unlike the plain GET, this receives the
 * agent's current SessionConfig, asserts session↔agent↔tenant ownership
 * (§14.7), and applies the schema migration chain before returning context.
 */
export const internalLoadSession: RequestHandler = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { agentId, tenantId, sessionConfig } = req.body as {
      agentId: string;
      tenantId: string;
      sessionConfig: SessionConfig;
    };

    const sessionRows = await db.select().from(sessions).where(eq(sessions.id, sessionId));
    const session = sessionRows[0];
    if (!session || session.agentId !== agentId || session.tenantId !== tenantId) {
      throw Object.assign(new Error('Session not found'), { status: 404 });
    }

    if (session.status !== 'expired' && sessionConfig) {
      await migrateSessionToCurrent(sessionId, session.schemaVersion, sessionConfig);
    }

    const freshRows = await db.select().from(sessions).where(eq(sessions.id, sessionId));
    const contextRows = await pruneExpiredContext(
      await db.select().from(sessionContext).where(eq(sessionContext.sessionId, sessionId)),
    );

    res.json({
      session: freshRows[0],
      contextEntries: Object.fromEntries(
        contextRows.map((r) => [r.key, JSON.parse(r.valueJson)]),
      ),
    });
  } catch (err) {
    next(err);
  }
};

export const internalCreateSession: RequestHandler = async (req, res, next) => {
  try {
    const { sessionId, agentId, tenantId, sessionConfig, metadata } = req.body as {
      sessionId: string;
      agentId: string;
      tenantId: string;
      sessionConfig: SessionConfig;
      metadata?: Record<string, unknown>;
    };

    // Check if already exists (idempotent)
    const existing = await db.select({ id: sessions.id }).from(sessions).where(eq(sessions.id, sessionId));
    if (existing.length > 0) {
      res.status(409).json({ ok: true, existing: true });
      return;
    }

    const ttlMs = (sessionConfig.ttlSeconds ?? 86400) * 1000;
    const now = new Date();
    await db.insert(sessions).values({
      id: sessionId,
      agentId,
      tenantId,
      schemaVersion: sessionConfig.schemaVersion ?? 1,
      status: 'active',
      // §14.8: caller-supplied session_metadata rides along at creation
      metadata: metadata ? JSON.stringify(metadata) : null,
      lastActiveAt: now,
      expiresAt: new Date(now.getTime() + ttlMs),
      createdAt: now,
    });

    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
};

export const internalSaveSession: RequestHandler = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { runId, contextData, sessionConfig, defaultRouter } = req.body as {
      runId: string;
      contextData: Record<string, unknown>;
      sessionConfig: SessionConfig;
      defaultRouter?: ModelRouterConfig | null;
    };

    const session = await db.select().from(sessions).where(eq(sessions.id, sessionId));
    if (!session[0]) {
      throw Object.assign(new Error('Session not found'), { status: 404 });
    }
    const tenantId = session[0].tenantId;

    const clearAll = contextData['_session_clear_all'] === true;
    const clearKeys = (contextData['_session_clear_keys'] as string[] | undefined) ?? [];

    if (clearAll) {
      await db.delete(sessionContext).where(eq(sessionContext.sessionId, sessionId));
    } else if (clearKeys.length > 0) {
      for (const key of clearKeys) {
        await db.delete(sessionContext).where(
          and(eq(sessionContext.sessionId, sessionId), eq(sessionContext.key, key)),
        );
      }
    }

    const now = new Date();
    const ttlMs = (sessionConfig.ttlSeconds ?? 86400) * 1000;
    const expiresAt = new Date(now.getTime() + ttlMs);

    // Upsert context entries for keys in the schema
    for (const [key, schemaEntry] of Object.entries(sessionConfig.contextSchema ?? {})) {
      const newValue = contextData[key];
      if (newValue === undefined) continue;

      const existingRows = await db
        .select()
        .from(sessionContext)
        .where(and(eq(sessionContext.sessionId, sessionId), eq(sessionContext.key, key)));
      const existing = existingRows[0];

      const entry = schemaEntry as ContextSchemaEntry;
      let finalValue: unknown;

      if (!existing) {
        finalValue = entry.type === 'append' ? [newValue] : newValue;
      } else {
        const current = JSON.parse(existing.valueJson) as unknown;
        finalValue = await accumulateValue(current, newValue, entry, tenantId, defaultRouter);
      }

      // maxTokens budget applies after accumulation, whatever the type
      finalValue = await enforceTokenBudget(finalValue, entry, tenantId, defaultRouter);

      const jsonValue = JSON.stringify(finalValue);
      const count = Array.isArray(finalValue) ? finalValue.length : 1;
      const tokenEstimate = estimateTokens(jsonValue);
      // Key-level TTL (§14.4) — refreshed on every write to the key
      const keyExpiresAt = entry.ttlSeconds
        ? new Date(now.getTime() + entry.ttlSeconds * 1000)
        : null;

      if (existing) {
        await db.update(sessionContext).set({
          valueJson: jsonValue,
          accumulatedCount: count,
          tokenEstimate,
          accumulationType: entry.type,
          expiresAt: keyExpiresAt,
          updatedAt: now,
        }).where(eq(sessionContext.id, existing.id));
      } else {
        await db.insert(sessionContext).values({
          id: newId(),
          sessionId,
          key,
          valueJson: jsonValue,
          accumulatedCount: count,
          tokenEstimate,
          accumulationType: entry.type,
          schemaVersion: sessionConfig.schemaVersion ?? 1,
          expiresAt: keyExpiresAt,
          updatedAt: now,
        });
      }
    }

    await db.update(sessions).set({
      lastActiveAt: now,
      expiresAt,
      rootRunId: (session[0].rootRunId === null || session[0].rootRunId === undefined) ? runId : session[0].rootRunId,
    }).where(eq(sessions.id, sessionId));

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

export const internalRecordRunLink: RequestHandler = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { runId, isChildRun = false } = req.body as { runId: string; isChildRun?: boolean };

    const links = await db
      .select({ position: sessionRunLinks.position })
      .from(sessionRunLinks)
      .where(eq(sessionRunLinks.sessionId, sessionId))
      .orderBy(desc(sessionRunLinks.position));

    const nextPosition = (links[0]?.position ?? 0) + 1;

    await db.insert(sessionRunLinks).values({
      id: newId(),
      sessionId,
      runId,
      position: nextPosition,
      isChildRun,
      createdAt: new Date(),
    });

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

export const internalExpireSessions: RequestHandler = async (_req, res, next) => {
  try {
    await db
      .update(sessions)
      .set({ status: 'expired' })
      .where(and(eq(sessions.status, 'active'), lte(sessions.expiresAt, new Date())));

    res.json({ expired: 'ok' });
  } catch (err) {
    next(err);
  }
};

// ── Utility ────────────────────────────────────────────────────────────────────

/** Resolve summarizeWith.prompt — plain string, or a { ref } into prompt_versions. */
async function resolveSummarizePrompt(
  prompt: string | { ref: string; version?: number } | undefined,
  tenantId: string,
): Promise<string | undefined> {
  if (!prompt) return undefined;
  if (typeof prompt === 'string') return prompt;

  const conditions = [eq(promptVersions.tenantId, tenantId), eq(promptVersions.name, prompt.ref)];
  if (prompt.version !== undefined) {
    conditions.push(eq(promptVersions.versionNumber, prompt.version));
  } else {
    conditions.push(eq(promptVersions.isActive, true));
  }
  const rows = await db.select().from(promptVersions).where(and(...conditions));
  return rows[0]?.content;
}

/**
 * `summarize` overflow (§14.4 / ALIGN-007): compress the oldest targetItems
 * entries into one `role: "summary"` record via the engine's summarize
 * endpoint. Falls back to evict_oldest when the LLM call cannot run — a
 * session save must never fail or leave the key unbounded because
 * summarization was unavailable.
 */
async function summarizeOverflow(
  arr: unknown[],
  entry: ContextSchemaEntry,
  tenantId: string,
  defaultRouter: ModelRouterConfig | null | undefined,
): Promise<unknown[]> {
  const targetItems = Math.min(entry.summarizeWith?.targetItems ?? 1, arr.length - 1);
  try {
    if (!defaultRouter) {
      throw Object.assign(new Error('No router config for summarization'), { code: 'ROUTER_NOT_CONFIGURED' });
    }
    const oldest = arr.slice(0, targetItems);
    const prompt = await resolveSummarizePrompt(entry.summarizeWith?.prompt, tenantId);
    const response = await engineClient.post('/internal/llm/summarize', {
      tenantId,
      items: oldest,
      model: entry.summarizeWith?.model,
      prompt,
      routerConfig: defaultRouter,
    });
    const { summary } = response.data as { summary: string };
    return [{ role: 'summary', content: summary }, ...arr.slice(targetItems)];
  } catch (err) {
    logger.warn(
      { tenantId, err: err instanceof Error ? err.message : err },
      'Session summarize overflow failed — falling back to evict_oldest',
    );
    return arr.slice(-(entry.maxItems ?? arr.length));
  }
}

async function accumulateValue(
  current: unknown,
  newValue: unknown,
  entry: ContextSchemaEntry,
  tenantId: string,
  defaultRouter?: ModelRouterConfig | null,
): Promise<unknown> {
  if (entry.type === 'replace') return newValue;
  if (entry.type === 'merge') {
    if (isPlainObject(current) && isPlainObject(newValue)) {
      return deepMerge(current, newValue);
    }
    return newValue;
  }
  // append: accumulate → dedupe → maxItems overflow (§14.4 order)
  let arr = Array.isArray(current) ? [...current, newValue] : [newValue];
  if (entry.deduplicateBy) {
    arr = dedupeByField(arr, entry.deduplicateBy);
  }
  if (entry.maxItems && arr.length > entry.maxItems) {
    if (!entry.overflow || entry.overflow === 'evict_oldest') {
      return arr.slice(-entry.maxItems);
    }
    if (entry.overflow === 'truncate') {
      return arr.slice(0, entry.maxItems);
    }
    if (entry.overflow === 'summarize') {
      return summarizeOverflow(arr, entry, tenantId, defaultRouter);
    }
  }
  return arr;
}

/**
 * ContextSchemaEntry.maxTokens as a save-time budget (ALIGN-012): shrink an
 * over-budget array with the entry's own overflow strategy until it fits.
 * `summarize` runs at most once per save — one LLM call, then degrade to
 * evict_oldest — so a save can never fan out into unbounded summarization.
 * Non-array values over budget are stored anyway with a warning; splitting a
 * scalar or object is not meaningful.
 */
async function enforceTokenBudget(
  value: unknown,
  entry: ContextSchemaEntry,
  tenantId: string,
  defaultRouter: ModelRouterConfig | null | undefined,
): Promise<unknown> {
  if (!entry.maxTokens) return value;

  let current = value;
  let summarized = false;
  while (
    estimateTokens(JSON.stringify(current)) > entry.maxTokens &&
    Array.isArray(current) &&
    current.length > 1
  ) {
    if (entry.overflow === 'summarize' && !summarized) {
      summarized = true;
      current = await summarizeOverflow(current, entry, tenantId, defaultRouter);
    } else if (entry.overflow === 'truncate') {
      current = current.slice(0, -1);
    } else {
      current = current.slice(1);
    }
  }

  if (estimateTokens(JSON.stringify(current)) > entry.maxTokens) {
    logger.warn(
      { tenantId, maxTokens: entry.maxTokens },
      'Session context value exceeds its maxTokens budget and cannot be shrunk further — storing as-is',
    );
  }
  return current;
}

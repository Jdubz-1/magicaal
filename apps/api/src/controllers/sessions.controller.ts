import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq, and, desc, lte } from 'drizzle-orm';
import type { SessionConfig, ContextSchemaEntry, AgentGraphDefinition, ModelRouterConfig } from '@magicaal/core';
import { db } from '../db/client';
import { sessions, sessionContext, sessionRunLinks, agents, agentVersions, promptVersions } from '../db/schema';
import { migrateSessionToCurrent } from '../lib/session-migration';
import { engineClient } from '../lib/engine-client';
import { logger } from '../lib/logger';

function newId(): string {
  return crypto.randomUUID();
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

    const contextRows = await db.select().from(sessionContext).where(eq(sessionContext.sessionId, sid));

    res.json({
      session: sessionRows[0],
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

/** Read the agent's current SessionConfig from its published graph definition. */
async function loadAgentSessionConfig(agentId: string): Promise<SessionConfig | null> {
  const rows = await db
    .select({ graphJson: agentVersions.graphJson })
    .from(agents)
    .innerJoin(agentVersions, eq(agentVersions.id, agents.currentVersionId))
    .where(eq(agents.id, agentId));

  if (!rows[0]) return null;
  const definition = JSON.parse(rows[0].graphJson) as AgentGraphDefinition;
  return (definition.config?.session as SessionConfig | undefined) ?? null;
}

export const migrateAgentSessions: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id: agentId } = req.params;

    const agentRows = await db
      .select({ id: agents.id })
      .from(agents)
      .where(and(eq(agents.id, agentId), eq(agents.tenantId, tenantId)));

    if (!agentRows[0]) {
      throw Object.assign(new Error('Agent not found'), { status: 404 });
    }

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

    const contextRows = await db.select().from(sessionContext).where(eq(sessionContext.sessionId, sessionId));

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
    const contextRows = await db.select().from(sessionContext).where(eq(sessionContext.sessionId, sessionId));

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
    const { sessionId, agentId, tenantId, sessionConfig } = req.body as {
      sessionId: string;
      agentId: string;
      tenantId: string;
      sessionConfig: SessionConfig;
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

      const jsonValue = JSON.stringify(finalValue);
      const count = Array.isArray(finalValue) ? finalValue.length : 1;

      if (existing) {
        await db.update(sessionContext).set({
          valueJson: jsonValue,
          accumulatedCount: count,
          accumulationType: entry.type,
          updatedAt: now,
        }).where(eq(sessionContext.id, existing.id));
      } else {
        await db.insert(sessionContext).values({
          id: newId(),
          sessionId,
          key,
          valueJson: jsonValue,
          accumulatedCount: count,
          accumulationType: entry.type,
          schemaVersion: sessionConfig.schemaVersion ?? 1,
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
    if (typeof current === 'object' && current !== null && typeof newValue === 'object' && newValue !== null) {
      return { ...(current as Record<string, unknown>), ...(newValue as Record<string, unknown>) };
    }
    return newValue;
  }
  // append
  const arr = Array.isArray(current) ? [...current, newValue] : [newValue];
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

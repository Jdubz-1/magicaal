import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq, and, desc, lte } from 'drizzle-orm';
import type { SessionConfig, ContextSchemaEntry } from '@magicaal/core';
import { db } from '../db/client';
import { sessions, sessionContext, sessionRunLinks, agents } from '../db/schema';

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

    const staleSessions = await db
      .select({ id: sessions.id })
      .from(sessions)
      .where(and(eq(sessions.agentId, agentId), eq(sessions.status, 'stale_schema')));

    // For Phase 4, mark stale sessions as active with a fresh schema version
    // Full migration chain logic would be in the engine session manager
    let migrated = 0;
    for (const session of staleSessions) {
      await db.update(sessions).set({ status: 'active' }).where(eq(sessions.id, session.id));
      migrated++;
    }

    res.json({ migrated, skipped: 0, failed: 0 });
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
    const { runId, contextData, sessionConfig } = req.body as {
      runId: string;
      contextData: Record<string, unknown>;
      sessionConfig: SessionConfig;
    };

    const session = await db.select().from(sessions).where(eq(sessions.id, sessionId));
    if (!session[0]) {
      throw Object.assign(new Error('Session not found'), { status: 404 });
    }

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
        finalValue = accumulateValue(current, newValue, entry);
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
    const { runId } = req.body as { runId: string };

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
      .set({ status: 'expired', updatedAt: new Date() })
      .where(and(eq(sessions.status, 'active'), lte(sessions.expiresAt, new Date())));

    res.json({ expired: 'ok' });
  } catch (err) {
    next(err);
  }
};

// ── Utility ────────────────────────────────────────────────────────────────────

function accumulateValue(current: unknown, newValue: unknown, entry: ContextSchemaEntry): unknown {
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
  }
  return arr;
}

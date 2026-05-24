import type { RequestHandler } from 'express';
import { eq, and } from 'drizzle-orm';
import * as crypto from 'node:crypto';
import { db } from '@/db/client';
import { agents, agentVersions, agentConfig } from '@/db/schema';
import { engineClient } from '@/lib/engine-client';

function newId(): string {
  return crypto.randomUUID();
}

export const listAgents: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId, role } = req.user!;
    const rows =
      role === 'platform_admin'
        ? await db.select().from(agents)
        : await db.select().from(agents).where(eq(agents.tenantId, tenantId));
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const createAgent: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { name, handle, description } = req.body as {
      name: string;
      handle: string;
      description?: string;
    };

    if (!name || !handle) {
      throw Object.assign(new Error('name and handle are required'), { status: 400 });
    }

    const now = new Date();
    const [agent] = await db
      .insert(agents)
      .values({
        id: newId(),
        tenantId,
        name,
        handle,
        description,
        status: 'draft',
        authoringMode: 'studio',
        stale: false,
        enabled: true,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    await db.insert(agentConfig).values({
      agentId: agent.id,
      triggerConfig: '{}',
      concurrency: '{}',
      retry: '{}',
      overrideMap: '{}',
      updatedAt: now,
    });

    res.status(201).json(agent);
  } catch (err) {
    next(err);
  }
};

export const getAgent: RequestHandler = async (req, res, next) => {
  try {
    const rows = await db.select().from(agents).where(eq(agents.id, req.params.id));
    if (!rows[0]) throw Object.assign(new Error('Agent not found'), { status: 404, code: 'AGENT_NOT_FOUND' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

export const updateAgent: RequestHandler = async (req, res, next) => {
  try {
    const { name, description, enabled } = req.body as {
      name?: string;
      description?: string;
      enabled?: boolean;
    };

    const [updated] = await db
      .update(agents)
      .set({
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(enabled !== undefined && { enabled }),
        updatedAt: new Date(),
      })
      .where(eq(agents.id, req.params.id))
      .returning();

    if (!updated) throw Object.assign(new Error('Agent not found'), { status: 404 });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const publishAgent: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.user!;
    const { graphJson, publishNotes } = req.body as { graphJson: string; publishNotes?: string };

    if (!graphJson) {
      throw Object.assign(new Error('graphJson is required'), { status: 400 });
    }

    const agentRows = await db.select().from(agents).where(eq(agents.id, id));
    if (!agentRows[0]) throw Object.assign(new Error('Agent not found'), { status: 404 });

    const existingVersions = await db
      .select()
      .from(agentVersions)
      .where(eq(agentVersions.agentId, id));
    const nextVersionNumber = existingVersions.length + 1;

    const contentHash = crypto.createHash('sha256').update(graphJson).digest('hex');
    const now = new Date();

    const [version] = await db
      .insert(agentVersions)
      .values({
        id: newId(),
        agentId: id,
        versionNumber: nextVersionNumber,
        graphJson,
        publishNotes,
        contentHash,
        createdBy: userId,
        createdAt: now,
      })
      .returning();

    await db
      .update(agents)
      .set({ currentVersionId: version.id, status: 'active', updatedAt: now })
      .where(eq(agents.id, id));

    await engineClient.post(`/internal/agents/${id}/deploy`).catch(() => {
      // non-fatal: cache invalidation may fail if engine is temporarily unavailable
    });

    res.json({ versionId: version.id, versionNumber: version.versionNumber });
  } catch (err) {
    next(err);
  }
};

export const draftAgent: RequestHandler = async (req, res, next) => {
  try {
    const [updated] = await db
      .update(agents)
      .set({ status: 'draft', updatedAt: new Date() })
      .where(eq(agents.id, req.params.id))
      .returning();

    if (!updated) throw Object.assign(new Error('Agent not found'), { status: 404 });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const listAgentVersions: RequestHandler = async (req, res, next) => {
  try {
    const versions = await db
      .select()
      .from(agentVersions)
      .where(eq(agentVersions.agentId, req.params.id));
    res.json(versions);
  } catch (err) {
    next(err);
  }
};

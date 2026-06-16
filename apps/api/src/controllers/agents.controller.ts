import type { RequestHandler } from 'express';
import { eq, and } from 'drizzle-orm';
import * as crypto from 'node:crypto';
import { db } from '../db/client';
import { agents, agentVersions, agentConfig } from '../db/schema';
import { engineClient } from '../lib/engine-client';
import { config } from '../config';
import { getWebhookUrl } from './webhook.controller';

function diffObjects(
  a: Record<string, unknown>,
  b: Record<string, unknown>,
  path = '',
): Array<{ path: string; type: 'added' | 'removed' | 'changed'; oldValue?: unknown; newValue?: unknown }> {
  const changes: ReturnType<typeof diffObjects> = [];
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const key of allKeys) {
    const fullPath = path ? `${path}.${key}` : key;
    if (!(key in a)) {
      changes.push({ path: fullPath, type: 'added', newValue: b[key] });
    } else if (!(key in b)) {
      changes.push({ path: fullPath, type: 'removed', oldValue: a[key] });
    } else if (typeof a[key] === 'object' && typeof b[key] === 'object' && a[key] !== null && b[key] !== null && !Array.isArray(a[key]) && !Array.isArray(b[key])) {
      changes.push(...diffObjects(a[key] as Record<string, unknown>, b[key] as Record<string, unknown>, fullPath));
    } else if (JSON.stringify(a[key]) !== JSON.stringify(b[key])) {
      changes.push({ path: fullPath, type: 'changed', oldValue: a[key], newValue: b[key] });
    }
  }
  return changes;
}

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
    const { tenantId } = req.user!;
    const rows = await db.select().from(agents).where(and(eq(agents.id, req.params.id), eq(agents.tenantId, tenantId)));
    if (!rows[0]) throw Object.assign(new Error('Agent not found'), { status: 404, code: 'AGENT_NOT_FOUND' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

export const updateAgent: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { name, description, enabled, draftGraphJson } = req.body as {
      name?: string;
      description?: string;
      enabled?: boolean;
      draftGraphJson?: string;
    };

    const [updated] = await db
      .update(agents)
      .set({
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(enabled !== undefined && { enabled }),
        ...(draftGraphJson !== undefined && { draftGraphJson }),
        updatedAt: new Date(),
      })
      .where(and(eq(agents.id, req.params.id), eq(agents.tenantId, tenantId)))
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
    const { userId, tenantId } = req.user!;
    const { graphJson, publishNotes } = req.body as { graphJson: string; publishNotes?: string };

    if (!graphJson) {
      throw Object.assign(new Error('graphJson is required'), { status: 400 });
    }

    const agentRows = await db.select().from(agents).where(and(eq(agents.id, id), eq(agents.tenantId, tenantId)));
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

    // Wire up cron scheduling if trigger type is 'cron'
    let triggerConfigJson: Record<string, unknown> = {};
    try {
      const parsedGraph = JSON.parse(graphJson) as { config?: { trigger?: Record<string, unknown> } };
      triggerConfigJson = parsedGraph.config?.trigger ?? {};
    } catch { /* ignore parse errors */ }

    const responseExtras: Record<string, unknown> = {
      versionId: version.id,
      versionNumber: version.versionNumber,
    };

    if (triggerConfigJson.type === 'cron' && typeof triggerConfigJson.expression === 'string') {
      // Schedule cron job via engine's scheduled queue (fire-and-forget; engine handles repeat)
      await engineClient.post('/internal/agents/schedule', {
        agentId: id,
        tenantId,
        cronExpression: triggerConfigJson.expression,
      }).catch((err) => {
        // Non-fatal — log but don't fail publish
        console.warn('Could not schedule cron job:', err.message);
      });
    }

    if (triggerConfigJson.type === 'webhook') {
      const baseUrl = config.publicBaseUrl;
      responseExtras.webhookUrl = getWebhookUrl(id, baseUrl);
    }

    res.json(responseExtras);
  } catch (err) {
    next(err);
  }
};

export const draftAgent: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const [updated] = await db
      .update(agents)
      .set({ status: 'draft', updatedAt: new Date() })
      .where(and(eq(agents.id, req.params.id), eq(agents.tenantId, tenantId)))
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

export const getAgentConfig: RequestHandler = async (req, res, next) => {
  try {
    const rows = await db
      .select()
      .from(agentConfig)
      .where(eq(agentConfig.agentId, req.params.id));
    if (!rows[0]) {
      throw Object.assign(new Error('Agent config not found'), { status: 404 });
    }
    const row = rows[0];
    res.json({
      triggerConfig: JSON.parse(row.triggerConfig ?? '{}'),
      timeoutMs: row.timeoutMs,
    });
  } catch (err) {
    next(err);
  }
};

export const getVersionDiff: RequestHandler = async (req, res, next) => {
  try {
    const { id, vId } = req.params;
    const { tenantId } = req.user!;
    const { compareWith } = req.query as { compareWith?: string };

    const agentCheck = await db.select({ tenantId: agents.tenantId }).from(agents).where(eq(agents.id, id));
    if (!agentCheck[0] || agentCheck[0].tenantId !== tenantId) {
      throw Object.assign(new Error('Agent not found'), { status: 404 });
    }

    const versions = await db
      .select()
      .from(agentVersions)
      .where(eq(agentVersions.agentId, id));

    const targetVersion = versions.find((v) => v.id === vId);
    if (!targetVersion) {
      throw Object.assign(new Error('Version not found'), { status: 404 });
    }

    // Compare with previous version by default
    const compareVersionId = compareWith ?? versions[versions.indexOf(targetVersion) - 1]?.id;
    const compareVersion = compareVersionId ? versions.find((v) => v.id === compareVersionId) : null;

    const targetGraph = JSON.parse(targetVersion.graphJson) as Record<string, unknown>;
    const compareGraph = compareVersion ? (JSON.parse(compareVersion.graphJson) as Record<string, unknown>) : {};

    const diff = diffObjects(compareGraph, targetGraph);

    res.json({
      targetVersionId: vId,
      compareVersionId: compareVersion?.id ?? null,
      changes: diff,
      targetVersion: { versionNumber: targetVersion.versionNumber, createdAt: targetVersion.createdAt },
      compareVersion: compareVersion ? { versionNumber: compareVersion.versionNumber, createdAt: compareVersion.createdAt } : null,
    });
  } catch (err) {
    next(err);
  }
};

export const rollbackVersion: RequestHandler = async (req, res, next) => {
  try {
    const { id, vId } = req.params;
    const { userId } = req.user!;

    const versions = await db
      .select()
      .from(agentVersions)
      .where(eq(agentVersions.agentId, id));

    const targetVersion = versions.find((v) => v.id === vId);
    if (!targetVersion) {
      throw Object.assign(new Error('Version not found'), { status: 404 });
    }

    const agentRows = await db.select().from(agents).where(and(eq(agents.id, id), eq(agents.tenantId, req.user!.tenantId)));
    if (!agentRows[0]) throw Object.assign(new Error('Agent not found'), { status: 404 });

    const nextVersionNumber = versions.length + 1;
    const now = new Date();
    const contentHash = crypto.createHash('sha256').update(targetVersion.graphJson).digest('hex');

    const [newVersion] = await db
      .insert(agentVersions)
      .values({
        id: newId(),
        agentId: id,
        versionNumber: nextVersionNumber,
        graphJson: targetVersion.graphJson,
        contentHash,
        publishNotes: `Rollback to version ${targetVersion.versionNumber}`,
        createdBy: userId,
        createdAt: now,
      })
      .returning();

    // Set as new draft (not active yet — user must republish)
    await db
      .update(agents)
      .set({ draftGraphJson: targetVersion.graphJson, status: 'draft', updatedAt: now })
      .where(eq(agents.id, id));

    res.json({ versionId: newVersion.id, versionNumber: newVersion.versionNumber, rolledBackFrom: vId });
  } catch (err) {
    next(err);
  }
};

export const updateAgentConfig: RequestHandler = async (req, res, next) => {
  try {
    const { triggerConfig, timeoutMs } = req.body as {
      triggerConfig?: Record<string, unknown>;
      timeoutMs?: number;
    };

    const [updated] = await db
      .update(agentConfig)
      .set({
        ...(triggerConfig !== undefined && { triggerConfig: JSON.stringify(triggerConfig) }),
        ...(timeoutMs !== undefined && { timeoutMs }),
        updatedAt: new Date(),
      })
      .where(eq(agentConfig.agentId, req.params.id))
      .returning();

    if (!updated) {
      throw Object.assign(new Error('Agent config not found'), { status: 404 });
    }

    await engineClient.post(`/internal/agents/${req.params.id}/deploy`).catch(() => {});

    res.json({
      triggerConfig: JSON.parse(updated.triggerConfig ?? '{}'),
      timeoutMs: updated.timeoutMs,
    });
  } catch (err) {
    next(err);
  }
};

interface AgentGraphDefinition {
  nodes: Record<string, { type: string; config: Record<string, unknown> }>;
}

async function getAgentGraph(agentId: string, tenantId: string): Promise<AgentGraphDefinition> {
  const agentRows = await db.select().from(agents).where(and(eq(agents.id, agentId), eq(agents.tenantId, tenantId)));
  const agent = agentRows[0];
  if (!agent) throw Object.assign(new Error('Agent not found'), { status: 404 });
  if (!agent.currentVersionId) throw Object.assign(new Error('Agent has no published version'), { status: 404 });
  const versionRows = await db.select().from(agentVersions).where(eq(agentVersions.id, agent.currentVersionId));
  if (!versionRows[0]) throw Object.assign(new Error('Version not found'), { status: 404 });
  return JSON.parse(versionRows[0].graphJson) as AgentGraphDefinition;
}

export const getSchemaInput: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const graph = await getAgentGraph(req.params.id, tenantId);
    const startNode = Object.values(graph.nodes).find((n) => n.type === 'core:start');
    const inputSchema = (startNode?.config?.inputSchema as object | null | undefined) ?? null;
    if (!inputSchema) {
      return res.status(404).json({ error: 'No input schema defined on this agent' });
    }
    res.json({ inputSchema });
  } catch (err) {
    next(err);
  }
};

export const getSchemaOutput: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const graph = await getAgentGraph(req.params.id, tenantId);
    const endNode = Object.values(graph.nodes).find((n) => n.type === 'core:end');
    const outputSchema = (endNode?.config?.outputSchema as object | null | undefined) ?? null;
    if (!outputSchema) {
      return res.status(404).json({ error: 'No output schema defined on this agent' });
    }
    res.json({ outputSchema });
  } catch (err) {
    next(err);
  }
};

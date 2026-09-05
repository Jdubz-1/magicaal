import type { RequestHandler } from 'express';
import { eq, and, ne, inArray, count } from 'drizzle-orm';
import * as crypto from 'node:crypto';
import { db } from '../db/client';
import {
  agents,
  agentVersions,
  agentConfig,
  tenants,
  invocationPolicies,
  invocationKeys,
  invocationLog,
  integrationTriggers,
  testCases,
  workspaces,
  sessions,
  sessionContext,
  sessionRunLinks,
} from '../db/schema';
import { parseResourceLimits } from './tenants.controller';
import { engineClient } from '../lib/engine-client';
import { parseAndValidateGraph } from '../lib/graph-validator';
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
    // Archived agents are hidden by default — an archive that still shows up in
    // Studio and Admin is not an archive as far as the user is concerned.
    const includeArchived = req.query.includeArchived === 'true';
    const scope =
      role === 'platform_admin' ? undefined : eq(agents.tenantId, tenantId);
    const notArchived = includeArchived ? undefined : ne(agents.status, 'archived');
    const filters = [scope, notArchived].filter((f) => f !== undefined);

    const rows = filters.length
      ? await db.select().from(agents).where(and(...filters))
      : await db.select().from(agents);
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

    // §14.2 (ALIGN-018): tenants.resource_limits.maxAgents caps agent creation
    const tenantRows = await db.select().from(tenants).where(eq(tenants.id, tenantId));
    const limits = parseResourceLimits(tenantRows[0]?.resourceLimits);
    if (limits.maxAgents !== undefined) {
      const [{ value: agentCount }] = await db
        .select({ value: count() })
        .from(agents)
        .where(eq(agents.tenantId, tenantId));
      if (agentCount >= limits.maxAgents) {
        throw Object.assign(
          new Error(`Tenant agent limit reached (${limits.maxAgents})`),
          { status: 422, code: 'TENANT_LIMIT_EXCEEDED' },
        );
      }
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
    const { tenantId, role } = req.user!;
    // Mirrors listAgents' platform_admin bypass — without it, platform-tenant
    // agents (e.g. Caal, tenantId '_platform') 404 for any admin whose own
    // tenant differs, even though listAgents already lets that same admin see
    // the agent in the list they clicked it from.
    const rows =
      role === 'platform_admin'
        ? await db.select().from(agents).where(eq(agents.id, req.params.id))
        : await db.select().from(agents).where(and(eq(agents.id, req.params.id), eq(agents.tenantId, tenantId)));
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

/**
 * Archive an agent, or hard-delete it with `?purge=true`.
 *
 * Archive is the default and is what the published API reference has always
 * documented. Purge exists because archiving leaves every row in place and
 * keeps the UNIQUE handle taken, so it cannot serve the "remove this test
 * agent" case — that previously required opening the SQLite file by hand.
 */
export const deleteAgent: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId, role } = req.user!;
    const { id } = req.params;
    const purge = req.query.purge === 'true';

    // Same platform_admin bypass as getAgent: without it, platform-tenant
    // agents 404 for an admin whose own tenant differs, even though listAgents
    // shows them the agent in the first place.
    const rows =
      role === 'platform_admin'
        ? await db.select().from(agents).where(eq(agents.id, id))
        : await db.select().from(agents).where(and(eq(agents.id, id), eq(agents.tenantId, tenantId)));

    const agent = rows[0];
    if (!agent) {
      throw Object.assign(new Error('Agent not found'), { status: 404, code: 'AGENT_NOT_FOUND' });
    }

    // Boot-time sync looks agents up by handle and re-inserts any manifest
    // entry it cannot find, so deleting a code-defined agent would undo itself
    // at the next API boot. The convention for "no longer in code" is the
    // stale flag, set by the sync itself.
    if (agent.authoringMode === 'code-defined') {
      throw Object.assign(
        new Error(
          `Agent "${agent.handle}" is code-defined and owned by agents.manifest.json — ` +
            'remove it from the manifest and rebuild instead of deleting it here.',
        ),
        { status: 409, code: 'AGENT_CODE_DEFINED' },
      );
    }

    // Purge is irreversible and takes the run history with it, so it needs more
    // than the developer role the router already gates on.
    if (purge && role !== 'tenant_admin' && role !== 'platform_admin') {
      throw Object.assign(
        new Error('Purging an agent requires the tenant_admin role'),
        { status: 403, code: 'FORBIDDEN' },
      );
    }

    // Engine first, before a single row changes: it owns the active-run check,
    // and its 409 is the authoritative answer. Deliberately not swallowed the
    // way publishAgent's deploy/schedule calls are — if the engine is
    // unreachable we cannot verify in-flight runs or purge telemetry, so the
    // delete has to fail rather than half-happen.
    try {
      await engineClient.delete(`/internal/agents/${id}`, { params: { purge: String(purge) } });
    } catch (err) {
      // engineClient's response interceptor has already flattened an engine
      // error response into a plain Error carrying `status` and `code` (and
      // dropped `err.response`), so branch on those rather than on the axios
      // shape. Anything without a status never reached the engine.
      const { status, message, code } = err as { status?: number; message?: string; code?: string };
      if (status === 409) {
        throw Object.assign(new Error(message ?? 'Agent has runs in flight'), {
          status: 409,
          code: code ?? 'AGENT_HAS_ACTIVE_RUNS',
        });
      }
      throw Object.assign(
        new Error('Engine unavailable — agent not deleted'),
        { status: 502, code: 'ENGINE_UNAVAILABLE' },
      );
    }

    if (!purge) {
      await db
        .update(agents)
        .set({ status: 'archived', enabled: false, updatedAt: new Date() })
        .where(eq(agents.id, id));
      res.status(204).end();
      return;
    }

    // No schema declares ON DELETE CASCADE and foreign_keys is ON, so children
    // go first. One transaction: a failure part-way through would otherwise
    // strand orphans across nine tables. Drizzle's better-sqlite3 transaction
    // is synchronous, hence .run() rather than await on each statement.
    const sessionIds = (
      await db.select({ id: sessions.id }).from(sessions).where(eq(sessions.agentId, id))
    ).map((r) => r.id);

    db.transaction((tx) => {
      if (sessionIds.length > 0) {
        tx.delete(sessionContext).where(inArray(sessionContext.sessionId, sessionIds)).run();
        tx.delete(sessionRunLinks).where(inArray(sessionRunLinks.sessionId, sessionIds)).run();
      }
      tx.delete(sessions).where(eq(sessions.agentId, id)).run();
      tx.delete(invocationLog).where(eq(invocationLog.agentId, id)).run();
      tx.delete(invocationKeys).where(eq(invocationKeys.agentId, id)).run();
      tx.delete(invocationPolicies).where(eq(invocationPolicies.agentId, id)).run();
      tx.delete(integrationTriggers).where(eq(integrationTriggers.agentId, id)).run();
      tx.delete(testCases).where(eq(testCases.agentId, id)).run();
      tx.delete(workspaces).where(eq(workspaces.agentId, id)).run();
      tx.delete(agentConfig).where(eq(agentConfig.agentId, id)).run();
      tx.delete(agentVersions).where(eq(agentVersions.agentId, id)).run();
      tx.delete(agents).where(eq(agents.id, id)).run();
    });

    res.status(204).end();
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

    // Publishing is the gate: a malformed graph must be refused here rather
    // than accepted and left to fail (or half-run) at execution.
    parseAndValidateGraph(graphJson);

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

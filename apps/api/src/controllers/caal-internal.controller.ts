import type { RequestHandler } from 'express';
import { and, eq, ne } from 'drizzle-orm';
import { db } from '../db/client';
import { agents, integrationConnections } from '../db/schema';
import { engineClient } from '../lib/engine-client';
import { entitledPackages } from './system.controller';

/**
 * Reads for Caal's platform tools, which run inside the engine and therefore
 * hold no user session. They previously called the tenant-facing `/v1` routes
 * with `X-Internal-Auth`, which only guards `/internal/*` — so every call 401'd
 * (and `/v1/nodes/:type` never existed at all). These are the internal
 * equivalents: engine-authenticated, scoped by the tenant the engine names.
 *
 * Read-only by design. Credentials are never included — a connection is
 * described by id, service and status so Caal can reference it in a graph.
 */

interface EngineNode {
  type: string;
  meta: Record<string, unknown>;
  schema: Record<string, unknown>;
  packageId?: string;
}

/** The tenant the engine is acting for; required, and never inferred. */
function tenantFromHeader(req: Parameters<RequestHandler>[0]): string {
  const header = req.headers['x-tenant-id'];
  const tenantId = Array.isArray(header) ? header[0] : header;
  if (!tenantId) {
    throw Object.assign(new Error('X-Tenant-Id header is required'), { status: 400 });
  }
  return tenantId;
}

async function entitledNodes(tenantId: string): Promise<EngineNode[]> {
  const response = await engineClient.get('/internal/nodes');
  const nodes = response.data as EngineNode[];
  const entitled = await entitledPackages(tenantId);
  return nodes.filter((n) => !n.packageId || entitled.has(n.packageId));
}

export const internalCaalListNodes: RequestHandler = async (req, res, next) => {
  try {
    res.json(await entitledNodes(tenantFromHeader(req)));
  } catch (err) {
    next(err);
  }
};

export const internalCaalGetNode: RequestHandler = async (req, res, next) => {
  try {
    const nodes = await entitledNodes(tenantFromHeader(req));
    const node = nodes.find((n) => n.type === req.params.type);
    if (!node) {
      throw Object.assign(new Error(`Node type "${req.params.type}" not found`), {
        status: 404,
        code: 'NODE_TYPE_NOT_FOUND',
      });
    }
    res.json(node);
  } catch (err) {
    next(err);
  }
};

export const internalCaalListConnections: RequestHandler = async (req, res, next) => {
  try {
    const tenantId = tenantFromHeader(req);
    const rows = await db
      .select({
        id: integrationConnections.id,
        service: integrationConnections.service,
        displayName: integrationConnections.displayName,
        authType: integrationConnections.authType,
        status: integrationConnections.status,
      })
      .from(integrationConnections)
      .where(eq(integrationConnections.tenantId, tenantId));
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const internalCaalListAgents: RequestHandler = async (req, res, next) => {
  try {
    const tenantId = tenantFromHeader(req);
    const rows = await db
      .select({
        id: agents.id,
        name: agents.name,
        handle: agents.handle,
        description: agents.description,
        status: agents.status,
        authoringMode: agents.authoringMode,
      })
      .from(agents)
      .where(and(eq(agents.tenantId, tenantId), ne(agents.status, 'archived')));
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq, and } from 'drizzle-orm';
import { db } from '../db/client';
import { namedRouterPolicies } from '../db/schema';
import { engineClient } from '../lib/engine-client';

function newId(): string {
  return crypto.randomUUID();
}

export const getProviderHealth: RequestHandler = async (_req, res, next) => {
  try {
    const engineResponse = await engineClient.get('/health');
    res.json(engineResponse.data);
  } catch (err) {
    next(err);
  }
};

export const listRouterPolicies: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const rows = await db
      .select()
      .from(namedRouterPolicies)
      .where(eq(namedRouterPolicies.tenantId, tenantId));

    res.json(
      rows.map((r) => ({
        id: r.id,
        name: r.name,
        config: JSON.parse(r.configJson) as Record<string, unknown>,
        overridable: r.overridable,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      })),
    );
  } catch (err) {
    next(err);
  }
};

export const createRouterPolicy: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { name, config, overridable = true } = req.body as {
      name?: string;
      config?: Record<string, unknown>;
      overridable?: boolean;
    };

    if (!name || !config) {
      throw Object.assign(new Error('name and config are required'), { status: 400 });
    }

    const now = new Date();
    const [created] = await db
      .insert(namedRouterPolicies)
      .values({
        id: newId(),
        tenantId,
        name,
        configJson: JSON.stringify(config),
        overridable,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    res.status(201).json({
      id: created.id,
      name: created.name,
      config: JSON.parse(created.configJson) as Record<string, unknown>,
      overridable: created.overridable,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  } catch (err) {
    next(err);
  }
};

export const updateRouterPolicy: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params;
    const { name, config, overridable } = req.body as {
      name?: string;
      config?: Record<string, unknown>;
      overridable?: boolean;
    };

    const existing = await db
      .select()
      .from(namedRouterPolicies)
      .where(and(eq(namedRouterPolicies.id, id), eq(namedRouterPolicies.tenantId, tenantId)));

    if (!existing[0]) {
      throw Object.assign(new Error('Router policy not found'), { status: 404 });
    }

    const now = new Date();
    const [updated] = await db
      .update(namedRouterPolicies)
      .set({
        ...(name !== undefined && { name }),
        ...(config !== undefined && { configJson: JSON.stringify(config) }),
        ...(overridable !== undefined && { overridable }),
        updatedAt: now,
      })
      .where(eq(namedRouterPolicies.id, id))
      .returning();

    res.json({
      id: updated.id,
      name: updated.name,
      config: JSON.parse(updated.configJson) as Record<string, unknown>,
      overridable: updated.overridable,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteRouterPolicy: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params;

    const existing = await db
      .select()
      .from(namedRouterPolicies)
      .where(and(eq(namedRouterPolicies.id, id), eq(namedRouterPolicies.tenantId, tenantId)));

    if (!existing[0]) {
      throw Object.assign(new Error('Router policy not found'), { status: 404 });
    }

    await db.delete(namedRouterPolicies).where(eq(namedRouterPolicies.id, id));
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

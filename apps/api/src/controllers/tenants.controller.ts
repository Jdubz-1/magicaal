import type { RequestHandler } from 'express';
import { eq } from 'drizzle-orm';
import * as crypto from 'node:crypto';
import { db } from '../db/client';
import { tenants } from '../db/schema';

export const listTenants: RequestHandler = async (_req, res, next) => {
  try {
    const rows = await db.select().from(tenants);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const createTenant: RequestHandler = async (req, res, next) => {
  try {
    const { name, slug } = req.body as { name: string; slug: string };
    if (!name || !slug) {
      throw Object.assign(new Error('name and slug are required'), { status: 400 });
    }

    const now = new Date();
    const [tenant] = await db
      .insert(tenants)
      .values({
        id: crypto.randomUUID(),
        name,
        slug,
        enabled: true,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    res.status(201).json(tenant);
  } catch (err) {
    next(err);
  }
};

export const getTenant: RequestHandler = async (req, res, next) => {
  try {
    const rows = await db.select().from(tenants).where(eq(tenants.id, req.params.id));
    if (!rows[0]) throw Object.assign(new Error('Tenant not found'), { status: 404 });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

export const updateTenant: RequestHandler = async (req, res, next) => {
  try {
    const { name, enabled, resourceLimits } = req.body as {
      name?: string;
      enabled?: boolean;
      resourceLimits?: string;
    };

    if (resourceLimits !== undefined) {
      try { JSON.parse(resourceLimits); } catch {
        throw Object.assign(new Error('resourceLimits must be valid JSON'), { status: 400 });
      }
    }

    const [updated] = await db
      .update(tenants)
      .set({
        ...(name !== undefined && { name }),
        ...(enabled !== undefined && { enabled }),
        ...(resourceLimits !== undefined && { resourceLimits }),
        updatedAt: new Date(),
      })
      .where(eq(tenants.id, req.params.id))
      .returning();

    if (!updated) throw Object.assign(new Error('Tenant not found'), { status: 404 });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

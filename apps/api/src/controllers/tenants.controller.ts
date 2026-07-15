import type { RequestHandler } from 'express';
import { eq } from 'drizzle-orm';
import * as crypto from 'node:crypto';
import type { TenantResourceLimits } from '@magicaal/core';
import { db } from '../db/client';
import { tenants } from '../db/schema';

const RESOURCE_LIMIT_KEYS = ['maxConcurrentRuns', 'maxAgents', 'defaultInvocationStrategy'];

/**
 * Validate resource_limits against TenantResourceLimits (§14.2 / ALIGN-018).
 * Unknown keys are rejected rather than stored — a typo like `maxAgent`
 * would otherwise sit in the column silently enforcing nothing.
 */
function validateResourceLimits(raw: string): void {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw Object.assign(new Error('resourceLimits must be valid JSON'), { status: 400 });
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw Object.assign(new Error('resourceLimits must be a JSON object'), { status: 400 });
  }

  const limits = parsed as Record<string, unknown>;
  const unknown = Object.keys(limits).filter((k) => !RESOURCE_LIMIT_KEYS.includes(k));
  if (unknown.length > 0) {
    throw Object.assign(
      new Error(`Unknown resource limit keys: ${unknown.join(', ')} (supported: ${RESOURCE_LIMIT_KEYS.join(', ')})`),
      { status: 422, code: 'INVALID_RESOURCE_LIMITS' },
    );
  }
  for (const key of ['maxConcurrentRuns', 'maxAgents'] as const) {
    const v = limits[key];
    if (v !== undefined && (typeof v !== 'number' || !Number.isInteger(v) || v < 1)) {
      throw Object.assign(
        new Error(`${key} must be a positive integer`),
        { status: 422, code: 'INVALID_RESOURCE_LIMITS' },
      );
    }
  }
  const strategy = limits.defaultInvocationStrategy;
  if (strategy !== undefined && strategy !== 'api-key' && strategy !== 'public') {
    throw Object.assign(
      new Error("defaultInvocationStrategy must be 'api-key' or 'public'"),
      { status: 422, code: 'INVALID_RESOURCE_LIMITS' },
    );
  }
}

/** Parse a tenant's resource_limits column, tolerating legacy/blank values. */
export function parseResourceLimits(raw: string | null | undefined): TenantResourceLimits {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
      ? (parsed as TenantResourceLimits)
      : {};
  } catch {
    return {};
  }
}

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
      validateResourceLimits(resourceLimits);
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

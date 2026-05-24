import type { RequestHandler } from 'express';
import { eq, and } from 'drizzle-orm';
import * as crypto from 'node:crypto';
import { db } from '@/db/client';
import { users } from '@/db/schema';
import { hashPassword } from '@/lib/password';

export const listUsers: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId, role } = req.user!;
    const rows =
      role === 'platform_admin'
        ? await db.select().from(users)
        : await db.select().from(users).where(eq(users.tenantId, tenantId));

    res.json(rows.map((u) => ({ id: u.id, name: u.name, email: u.email, role: u.role, active: u.active, tenantId: u.tenantId })));
  } catch (err) {
    next(err);
  }
};

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId: callerTenantId } = req.user!;
    const { name, email, password, role, tenantId: bodyTenantId } = req.body as {
      name: string;
      email: string;
      password: string;
      role: string;
      tenantId?: string;
    };

    if (!name || !email || !password || !role) {
      throw Object.assign(new Error('name, email, password, and role are required'), { status: 400 });
    }

    const targetTenantId = bodyTenantId ?? callerTenantId;
    const passwordHash = await hashPassword(password);
    const now = new Date();

    const [user] = await db
      .insert(users)
      .values({
        id: crypto.randomUUID(),
        tenantId: targetTenantId,
        name,
        email: email.toLowerCase(),
        passwordHash,
        role: role as 'platform_admin' | 'tenant_admin' | 'developer' | 'viewer',
        active: true,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role, tenantId: user.tenantId });
  } catch (err) {
    next(err);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const rows = await db.select().from(users).where(eq(users.id, req.params.id));
    const user = rows[0];
    if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role, active: user.active, tenantId: user.tenantId });
  } catch (err) {
    next(err);
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { name, role } = req.body as { name?: string; role?: string };
    const now = new Date();

    const [updated] = await db
      .update(users)
      .set({
        ...(name !== undefined && { name }),
        ...(role !== undefined && { role: role as 'platform_admin' | 'tenant_admin' | 'developer' | 'viewer' }),
        updatedAt: now,
      })
      .where(eq(users.id, req.params.id))
      .returning();

    if (!updated) throw Object.assign(new Error('User not found'), { status: 404 });
    res.json({ id: updated.id, name: updated.name, email: updated.email, role: updated.role });
  } catch (err) {
    next(err);
  }
};

export const deactivateUser: RequestHandler = async (req, res, next) => {
  try {
    const [updated] = await db
      .update(users)
      .set({ active: false, updatedAt: new Date() })
      .where(eq(users.id, req.params.id))
      .returning();

    if (!updated) throw Object.assign(new Error('User not found'), { status: 404 });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

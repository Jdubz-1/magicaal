import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq, and, max } from 'drizzle-orm';
import { db } from '../db/client';
import { promptVersions } from '../db/schema';

function newId(): string {
  return crypto.randomUUID();
}

export const listPrompts: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const rows = await db
      .select()
      .from(promptVersions)
      .where(and(eq(promptVersions.tenantId, tenantId), eq(promptVersions.isActive, true)));
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const createPromptVersion: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId, userId } = req.user!;
    const { name, content, packNamespace } = req.body as {
      name: string;
      content: string;
      packNamespace?: string;
    };

    if (!name || !content) {
      throw Object.assign(new Error('name and content are required'), { status: 400 });
    }

    // Get next version number
    const maxResult = await db
      .select({ maxVersion: max(promptVersions.versionNumber) })
      .from(promptVersions)
      .where(and(eq(promptVersions.tenantId, tenantId), eq(promptVersions.name, name)));

    const nextVersion = (maxResult[0]?.maxVersion ?? 0) + 1;

    const id = newId();
    await db.insert(promptVersions).values({
      id,
      tenantId,
      name,
      content,
      versionNumber: nextVersion,
      createdBy: userId,
      isActive: false,
      packNamespace: packNamespace ?? null,
      createdAt: new Date(),
    });

    const rows = await db.select().from(promptVersions).where(eq(promptVersions.id, id));
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
};

export const getPromptVersions: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { name } = req.params;

    const rows = await db
      .select()
      .from(promptVersions)
      .where(and(eq(promptVersions.tenantId, tenantId), eq(promptVersions.name, name)))
      .orderBy(promptVersions.versionNumber);

    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const promotePromptVersion: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { name, vid } = req.params;

    const versionRows = await db
      .select()
      .from(promptVersions)
      .where(
        and(
          eq(promptVersions.id, vid),
          eq(promptVersions.tenantId, tenantId),
          eq(promptVersions.name, name),
        ),
      );

    if (!versionRows[0]) {
      throw Object.assign(new Error('Prompt version not found'), { status: 404 });
    }

    // Deactivate all other versions for this name
    await db
      .update(promptVersions)
      .set({ isActive: false })
      .where(and(eq(promptVersions.tenantId, tenantId), eq(promptVersions.name, name)));

    // Activate the target version
    await db.update(promptVersions).set({ isActive: true }).where(eq(promptVersions.id, vid));

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

export const diffPromptVersions: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { name, vid } = req.params;
    const { compareWith } = req.query as { compareWith?: string };

    const [v1Rows, v2Rows] = await Promise.all([
      db.select().from(promptVersions).where(and(eq(promptVersions.id, vid), eq(promptVersions.tenantId, tenantId))),
      compareWith
        ? db.select().from(promptVersions).where(and(eq(promptVersions.id, compareWith), eq(promptVersions.tenantId, tenantId)))
        : Promise.resolve([]),
    ]);

    if (!v1Rows[0]) {
      throw Object.assign(new Error('Prompt version not found'), { status: 404 });
    }

    res.json({
      name,
      version1: { id: v1Rows[0].id, versionNumber: v1Rows[0].versionNumber, content: v1Rows[0].content },
      version2: v2Rows[0]
        ? { id: v2Rows[0].id, versionNumber: v2Rows[0].versionNumber, content: v2Rows[0].content }
        : null,
    });
  } catch (err) {
    next(err);
  }
};

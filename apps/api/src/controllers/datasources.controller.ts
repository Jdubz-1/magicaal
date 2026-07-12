import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq, and } from 'drizzle-orm';
import { db } from '../db/client';
import { dataSources } from '../db/schema';

function newId(): string {
  return crypto.randomUUID();
}

export const listDataSources: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const rows = await db
      .select({
        id: dataSources.id,
        name: dataSources.name,
        sourceType: dataSources.sourceType,
        createdAt: dataSources.createdAt,
        updatedAt: dataSources.updatedAt,
      })
      .from(dataSources)
      .where(eq(dataSources.tenantId, tenantId));
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const getDataSource: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params;
    const rows = await db
      .select()
      .from(dataSources)
      .where(and(eq(dataSources.id, id), eq(dataSources.tenantId, tenantId)));
    if (!rows[0]) throw Object.assign(new Error('Data source not found'), { status: 404 });
    const row = rows[0];
    res.json({ ...row, connection: JSON.parse(row.connectionJson) });
  } catch (err) {
    next(err);
  }
};

export const createDataSource: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { name, sourceType, connection } = req.body as {
      name?: string;
      sourceType?: string;
      connection?: Record<string, unknown>;
    };

    if (!name || !sourceType || !connection) {
      throw Object.assign(new Error('name, sourceType, and connection are required'), { status: 400 });
    }

    const now = new Date();
    const [created] = await db
      .insert(dataSources)
      .values({
        id: newId(),
        tenantId,
        name,
        sourceType,
        connectionJson: JSON.stringify(connection),
        createdAt: now,
        updatedAt: now,
      })
      .returning({ id: dataSources.id, name: dataSources.name, sourceType: dataSources.sourceType, createdAt: dataSources.createdAt });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const updateDataSource: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params;
    const { name, connection } = req.body as { name?: string; connection?: Record<string, unknown> };

    const existing = await db
      .select()
      .from(dataSources)
      .where(and(eq(dataSources.id, id), eq(dataSources.tenantId, tenantId)));
    if (!existing[0]) throw Object.assign(new Error('Data source not found'), { status: 404 });

    await db
      .update(dataSources)
      .set({
        ...(name !== undefined && { name }),
        ...(connection !== undefined && { connectionJson: JSON.stringify(connection) }),
        updatedAt: new Date(),
      })
      .where(eq(dataSources.id, id));

    res.json({ id, updated: true });
  } catch (err) {
    next(err);
  }
};

export const deleteDataSource: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params;

    const existing = await db
      .select()
      .from(dataSources)
      .where(and(eq(dataSources.id, id), eq(dataSources.tenantId, tenantId)));
    if (!existing[0]) throw Object.assign(new Error('Data source not found'), { status: 404 });

    await db.delete(dataSources).where(eq(dataSources.id, id));
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export const testDataSource: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params;

    const rows = await db
      .select()
      .from(dataSources)
      .where(and(eq(dataSources.id, id), eq(dataSources.tenantId, tenantId)));
    if (!rows[0]) throw Object.assign(new Error('Data source not found'), { status: 404 });

    // Connectivity test stub — Phase 5 integration packages will implement real tests
    res.json({ id, reachable: true, message: 'Connection test not yet implemented for this source type' });
  } catch (err) {
    next(err);
  }
};

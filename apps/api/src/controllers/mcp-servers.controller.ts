import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq, and } from 'drizzle-orm';
import { db } from '../db/client';
import { mcpServers } from '../db/schema';
import { engineClient } from '../lib/engine-client';

function newId(): string {
  return crypto.randomUUID();
}

export const listMcpServers: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const rows = await db
      .select()
      .from(mcpServers)
      .where(eq(mcpServers.tenantId, tenantId));
    res.json(rows.map(formatServer));
  } catch (err) {
    next(err);
  }
};

export const getMcpServer: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const rows = await db
      .select()
      .from(mcpServers)
      .where(and(eq(mcpServers.id, req.params.id), eq(mcpServers.tenantId, tenantId)));
    if (!rows[0]) throw Object.assign(new Error('MCP server not found'), { status: 404 });
    res.json(formatServer(rows[0]));
  } catch (err) {
    next(err);
  }
};

export const createMcpServer: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { name, transport, url, command, args, env } = req.body as {
      name: string;
      transport: 'stdio' | 'http';
      url?: string;
      command?: string;
      args?: string[];
      env?: Record<string, string>;
    };

    if (!name || !transport) throw Object.assign(new Error('name and transport are required'), { status: 400 });
    if (transport === 'http' && !url) throw Object.assign(new Error('url required for http transport'), { status: 400 });
    if (transport === 'stdio' && !command) throw Object.assign(new Error('command required for stdio transport'), { status: 400 });

    const id = newId();
    const now = new Date();
    await db.insert(mcpServers).values({
      id,
      tenantId,
      name,
      transport,
      url: url ?? null,
      command: command ?? null,
      argsJson: args ? JSON.stringify(args) : null,
      envJson: env ? JSON.stringify(env) : null,
      enabled: true,
      createdAt: now,
      updatedAt: now,
    });

    const rows = await db.select().from(mcpServers).where(eq(mcpServers.id, id));
    res.status(201).json(formatServer(rows[0]));
  } catch (err) {
    next(err);
  }
};

export const deleteMcpServer: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const rows = await db
      .select()
      .from(mcpServers)
      .where(and(eq(mcpServers.id, req.params.id), eq(mcpServers.tenantId, tenantId)));
    if (!rows[0]) throw Object.assign(new Error('MCP server not found'), { status: 404 });
    await db.delete(mcpServers).where(eq(mcpServers.id, req.params.id));
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export const testMcpServer: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const rows = await db
      .select()
      .from(mcpServers)
      .where(and(eq(mcpServers.id, req.params.id), eq(mcpServers.tenantId, tenantId)));
    if (!rows[0]) throw Object.assign(new Error('MCP server not found'), { status: 404 });

    const server = rows[0];
    const response = await engineClient.post('/internal/mcp-servers/test', {
      id: server.id,
      transport: server.transport,
      url: server.url,
      command: server.command,
      args: server.argsJson ? JSON.parse(server.argsJson) : undefined,
      env: server.envJson ? JSON.parse(server.envJson) : undefined,
    });

    // Update last tested timestamp
    await db.update(mcpServers).set({ lastTestedAt: new Date(), updatedAt: new Date() }).where(eq(mcpServers.id, server.id));

    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

function formatServer(row: typeof mcpServers.$inferSelect) {
  return {
    id: row.id,
    tenantId: row.tenantId,
    name: row.name,
    transport: row.transport,
    url: row.url,
    command: row.command,
    args: row.argsJson ? JSON.parse(row.argsJson) : null,
    enabled: row.enabled,
    lastTestedAt: row.lastTestedAt?.toISOString() ?? null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

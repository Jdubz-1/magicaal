import { McpClient, type McpServerConfig } from './mcp-client';
import { logger } from '../lib/logger';

// Minimal DB read (read-only; avoids importing the full Drizzle client)
import Database from 'better-sqlite3';
import { config as appConfig } from '../config';

interface McpServerRow {
  id: string;
  transport: 'stdio' | 'http';
  url: string | null;
  command: string | null;
  args_json: string | null;
  env_json: string | null;
}

function getServerConfig(serverId: string): McpServerConfig {
  const dbPath = appConfig.databasePath.replace(/^file:/, '');
  const db = new Database(dbPath, { readonly: true });
  try {
    const row = db.prepare('SELECT * FROM mcp_servers WHERE id = ?').get(serverId) as McpServerRow | undefined;
    if (!row) throw new Error(`MCP server not found: ${serverId}`);
    return {
      id: row.id,
      transport: row.transport,
      url: row.url ?? undefined,
      command: row.command ?? undefined,
      args: row.args_json ? (JSON.parse(row.args_json) as string[]) : undefined,
      env: row.env_json ? (JSON.parse(row.env_json) as Record<string, string>) : undefined,
    };
  } finally {
    db.close();
  }
}

class McpRegistry {
  // Key: `${nodeId}:${runId}` → connected McpClient
  private _clients = new Map<string, McpClient>();

  private _key(nodeId: string, runId: string): string {
    return `${nodeId}:${runId}`;
  }

  // Called by tool-executor when a core:mcp-client node is encountered
  async getClient(nodeId: string, serverId: string, runId: string): Promise<McpClient> {
    const key = this._key(nodeId, runId);
    if (this._clients.has(key)) return this._clients.get(key)!;

    const serverConfig = getServerConfig(serverId);
    const client = new McpClient(serverConfig);
    await client.connect();
    await client.initialize();
    this._clients.set(key, client);
    logger.debug({ nodeId, serverId, runId }, 'MCP client connected');
    return client;
  }

  async callTool(nodeId: string, runId: string, toolName: string, args: Record<string, unknown>): Promise<unknown> {
    const key = this._key(nodeId, runId);
    const client = this._clients.get(key);
    if (!client) throw new Error(`No MCP client found for node ${nodeId} in run ${runId}`);
    return client.callTool(toolName, args);
  }

  async releaseForRun(runId: string): Promise<void> {
    const toRemove: string[] = [];
    for (const [key, client] of this._clients) {
      if (key.endsWith(`:${runId}`)) {
        try {
          await client.disconnect();
        } catch (err) {
          logger.warn({ key, err }, 'Error disconnecting MCP client');
        }
        toRemove.push(key);
      }
    }
    for (const key of toRemove) this._clients.delete(key);
  }
}

export const mcpRegistry = new McpRegistry();

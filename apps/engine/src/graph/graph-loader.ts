import Database from 'better-sqlite3';
import type { AgentGraphDefinition } from '@magicaal/core';
import { config } from '../config';
import { logger } from '../lib/logger';

let sqlite: Database.Database | null = null;

function getDb(): Database.Database {
  if (!sqlite) {
    const dbPath = config.databasePath.replace(/^file:/, '');
    sqlite = new Database(dbPath, { readonly: true });
    sqlite.pragma('journal_mode = WAL');
  }
  return sqlite;
}

class GraphLoader {
  private cache = new Map<string, AgentGraphDefinition>();

  async load(agentId: string): Promise<AgentGraphDefinition> {
    const cached = this.cache.get(agentId);
    if (cached) return cached;

    const db = getDb();
    const row = db
      .prepare(
        `SELECT av.graph_json
         FROM agent_versions av
         JOIN agents a ON a.current_version_id = av.id
         WHERE a.id = ? AND a.status = 'active' AND a.enabled = 1`,
      )
      .get(agentId) as { graph_json: string } | undefined;

    if (!row) {
      throw Object.assign(
        new Error(`Agent ${agentId} not found or not active`),
        { status: 404, code: 'AGENT_NOT_FOUND' },
      );
    }

    const graph = JSON.parse(row.graph_json) as AgentGraphDefinition;
    this.cache.set(agentId, graph);
    logger.debug({ agentId }, 'Graph loaded from database');
    return graph;
  }

  invalidate(agentId: string): void {
    this.cache.delete(agentId);
    logger.debug({ agentId }, 'Graph cache invalidated');
  }

  invalidateAll(): void {
    this.cache.clear();
  }
}

export const graphLoader = new GraphLoader();

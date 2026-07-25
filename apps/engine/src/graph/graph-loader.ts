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

/**
 * Verify an agent exists and belongs to the given tenant (ARCHITECTURE §14.3).
 * Internal callers supply both IDs from request payloads whose agentId may be
 * graph-author-controlled (sub-graph/handoff node config), so ownership must
 * be checked at the engine boundary, not assumed. Answers 404 either way so
 * agent IDs stay non-enumerable across tenants.
 */
export function assertAgentInTenant(agentId: string, tenantId: string): void {
  const row = getDb()
    .prepare('SELECT tenant_id FROM agents WHERE id = ?')
    .get(agentId) as { tenant_id: string } | undefined;

  if (!row || row.tenant_id !== tenantId) {
    throw Object.assign(
      new Error(`Agent ${agentId} not found`),
      { status: 404, code: 'AGENT_NOT_FOUND' },
    );
  }
}

class GraphLoader {
  private cache = new Map<string, { graph: AgentGraphDefinition; tenantId: string; versionId: string }>();

  async load(agentId: string, tenantId: string): Promise<AgentGraphDefinition> {
    const cached = this.cache.get(agentId);
    if (cached) {
      // The agent→tenant mapping is immutable, so a cached entry is safe to
      // serve — but only to the tenant it belongs to.
      if (cached.tenantId !== tenantId) {
        throw Object.assign(
          new Error(`Agent ${agentId} not found or not active`),
          { status: 404, code: 'AGENT_NOT_FOUND' },
        );
      }
      return cached.graph;
    }

    const db = getDb();
    const row = db
      .prepare(
        `SELECT av.graph_json, av.id AS version_id
         FROM agent_versions av
         JOIN agents a ON a.current_version_id = av.id
         WHERE a.id = ? AND a.tenant_id = ? AND a.status = 'active' AND a.enabled = 1`,
      )
      .get(agentId, tenantId) as { graph_json: string; version_id: string } | undefined;

    if (!row) {
      throw Object.assign(
        new Error(`Agent ${agentId} not found or not active`),
        { status: 404, code: 'AGENT_NOT_FOUND' },
      );
    }

    const graph = JSON.parse(row.graph_json) as AgentGraphDefinition;
    this.cache.set(agentId, { graph, tenantId, versionId: row.version_id });
    logger.debug({ agentId, versionId: row.version_id }, 'Graph loaded from database');
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

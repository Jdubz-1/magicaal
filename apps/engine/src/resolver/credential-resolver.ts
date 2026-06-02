import * as crypto from 'node:crypto';
import Database from 'better-sqlite3';
import type { AgentGraphDefinition } from '@magicaal/core';
import type { ExecutionContextImpl } from '../execution/context';
import type { ResolvedCredentials } from '@magicaal/sdk-node';
import { config } from '../config';
import { logger } from '../lib/logger';

// Shared read-only connection to the primary DB (same pattern as graph-loader)
let sqlite: Database.Database | null = null;

function getDb(): Database.Database {
  if (!sqlite) {
    const dbPath = config.databasePath.replace(/^file:/, '');
    sqlite = new Database(dbPath, { readonly: true });
    sqlite.pragma('journal_mode = WAL');
  }
  return sqlite;
}

interface StoredConnection {
  credentials_enc: string;
  auth_type: 'oauth2' | 'api_key';
  status: string;
  expires_at: number | null;
}

function deriveKey(masterKey: string): Buffer {
  return crypto.createHash('sha256').update(masterKey).digest();
}

function decrypt(encryptedBase64: string, masterKey: string): string {
  const buf = Buffer.from(encryptedBase64, 'base64');
  // Format: [12 bytes IV][16 bytes authTag][...ciphertext]
  const iv = buf.subarray(0, 12);
  const authTag = buf.subarray(12, 28);
  const ciphertext = buf.subarray(28);

  const key = deriveKey(masterKey);
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.toString('utf8');
}

function collectConnectionIds(graph: AgentGraphDefinition): Set<string> {
  const ids = new Set<string>();
  for (const node of Object.values(graph.nodes)) {
    const cfg = node.config as Record<string, unknown>;
    if (typeof cfg.connectionId === 'string') {
      ids.add(cfg.connectionId);
    }
    if (typeof cfg.router === 'object' && cfg.router !== null) {
      const targets = (cfg.router as { targets?: Array<{ connectionId: string }> }).targets ?? [];
      for (const t of targets) {
        if (t.connectionId) ids.add(t.connectionId);
      }
    }
  }
  return ids;
}

export async function resolveCredentials(
  graph: AgentGraphDefinition,
  ctx: ExecutionContextImpl,
): Promise<void> {
  if (!config.masterKey) {
    logger.debug('MAGICAAL_MASTER_KEY not set — skipping credential resolution');
    return;
  }

  const connectionIds = collectConnectionIds(graph);
  if (connectionIds.size === 0) return;

  const db = getDb();

  for (const connectionId of connectionIds) {
    try {
      const row = db
        .prepare(
          `SELECT credentials_enc, auth_type, status, expires_at
           FROM integration_connections
           WHERE id = ? AND tenant_id = ?`,
        )
        .get(connectionId, ctx.tenantId) as StoredConnection | undefined;

      if (!row) {
        logger.warn({ connectionId }, 'Integration connection not found for tenant');
        continue;
      }

      if (row.status !== 'active') {
        logger.warn({ connectionId, status: row.status }, 'Integration connection is not active');
        continue;
      }

      let rawJson: string;
      try {
        rawJson = decrypt(row.credentials_enc, config.masterKey);
      } catch (err) {
        logger.error({ connectionId, err }, 'Failed to decrypt credentials');
        continue;
      }

      const rawCreds = JSON.parse(rawJson) as Record<string, unknown>;

      const resolved: ResolvedCredentials = {
        type: row.auth_type === 'oauth2' ? 'oauth' : 'apikey',
        apiKey: rawCreds.api_key as string | undefined,
        accessToken: rawCreds.access_token as string | undefined,
        expiresAt: row.expires_at ?? undefined,
        extra: rawCreds,
      };

      // Mutable assignment to credentials map (ctx.credentials is declared readonly but the Map itself is mutable)
      (ctx.credentials as Record<string, ResolvedCredentials>)[connectionId] = resolved;

      logger.debug({ connectionId, type: resolved.type }, 'Credentials resolved');
    } catch (err) {
      logger.error({ connectionId, err }, 'Credential resolution error — skipping');
    }
  }
}

export function encryptCredentials(plaintext: string, masterKey: string): string {
  const key = deriveKey(masterKey);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, encrypted]).toString('base64');
}

import * as crypto from 'node:crypto';
import Database from 'better-sqlite3';
import type { AgentGraphDefinition } from '@magicaal/core';
import type { ExecutionContextImpl } from '../execution/context';
import type { ResolvedCredentials } from '@magicaal/sdk-node';
import { isExpired, refreshOAuthToken } from '@magicaal/integration-core';
import { integrationRegistry } from '../registry/integration-registry';
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
  service: string;
}

/** Connection rows store epoch seconds; ResolvedCredentials carries epoch ms. */
function toEpochMs(value: number | null): number | undefined {
  if (value === null) return undefined;
  return value < 1_000_000_000_000 ? value * 1000 : value;
}

/**
 * Refresh an expired OAuth credential mid-run using the integration
 * package's token endpoint and the connection's stored refresh_token +
 * client credentials. The refreshed token is used for this run immediately;
 * persistence back to the primary DB goes through the API (the engine's
 * connection is read-only) and is best-effort.
 */
export async function maybeRefreshOAuth(
  connectionId: string,
  service: string,
  rawCreds: Record<string, unknown>,
  resolved: ResolvedCredentials,
): Promise<ResolvedCredentials> {
  if (resolved.type !== 'oauth' || !isExpired(resolved)) return resolved;

  const refreshToken = rawCreds.refresh_token;
  const clientId = rawCreds.client_id;
  if (typeof refreshToken !== 'string' || typeof clientId !== 'string') {
    logger.warn(
      { connectionId, service },
      'OAuth token expired but connection has no refresh_token/client_id — using stale token',
    );
    return resolved;
  }

  const oauth = integrationRegistry.has(service)
    ? integrationRegistry.get(service).authSchema.oauth
    : undefined;
  if (!oauth) {
    logger.warn({ connectionId, service }, 'OAuth token expired but service declares no token endpoint');
    return resolved;
  }

  const refreshed = await refreshOAuthToken(
    {
      service,
      tokenUrl: oauth.tokenUrl,
      clientId,
      clientSecret: typeof rawCreds.client_secret === 'string' ? rawCreds.client_secret : undefined,
    },
    refreshToken,
  );

  const updatedRaw: Record<string, unknown> = {
    ...rawCreds,
    access_token: refreshed.accessToken,
    refresh_token: refreshed.refreshToken ?? refreshToken,
  };

  // Best-effort persist via the API layer so the next run starts fresh
  void fetch(`${config.apiBaseUrl}/internal/integrations/connections/${connectionId}/credentials`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credentials: updatedRaw, expiresAt: refreshed.expiresAt ?? null }),
  }).catch((err) => {
    logger.warn({ connectionId, err }, 'Failed to persist refreshed OAuth credentials');
  });

  logger.info({ connectionId, service }, 'OAuth token refreshed at expiry');
  return {
    ...resolved,
    accessToken: refreshed.accessToken,
    expiresAt: refreshed.expiresAt,
    extra: updatedRaw,
  };
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
          `SELECT credentials_enc, auth_type, status, expires_at, service
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

      let resolved: ResolvedCredentials = {
        type: row.auth_type === 'oauth2' ? 'oauth' : 'apikey',
        apiKey: rawCreds.api_key as string | undefined,
        accessToken: rawCreds.access_token as string | undefined,
        expiresAt: toEpochMs(row.expires_at),
        extra: rawCreds,
      };

      try {
        resolved = await maybeRefreshOAuth(connectionId, row.service, rawCreds, resolved);
      } catch (err) {
        logger.error({ connectionId, err }, 'OAuth refresh failed — using stale token');
      }

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

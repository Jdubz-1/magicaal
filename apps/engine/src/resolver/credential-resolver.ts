import * as crypto from 'node:crypto';
import Database from 'better-sqlite3';
import type { AgentGraphDefinition } from '@magicaal/core';
import type { ExecutionContextImpl } from '../execution/context';
import type { ResolvedCredentials } from '@magicaal/sdk-node';
import { isExpired, refreshOAuthToken } from '@magicaal/integration-core';
import { integrationRegistry } from '../registry/integration-registry';
import { config } from '../config';
import { logger } from '../lib/logger';
import { PLATFORM_TENANT_ID } from '../lib/platform';

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

/**
 * Which tenant's connections this run resolves credentials against.
 *
 * Normally the run's own tenant. The one exception is a platform-tenant agent
 * (Caal) invoked by a tenant user: it executes as `_platform`, but the router
 * policy that selected its model is the invoker's and points at the invoker's
 * connection, so `_platform` owns no credential to run with. The API sets
 * `credentialTenantId` to the authenticated caller's tenant for those
 * dispatches.
 *
 * Deliberately narrow: honored only when the run itself belongs to the platform
 * tenant, so an ordinary tenant's run can never read another tenant's
 * credentials even if the field reaches the queue.
 */
function credentialTenantFor(ctx: ExecutionContextImpl): string {
  if (ctx.tenantId === PLATFORM_TENANT_ID && ctx.credentialTenantId) {
    return ctx.credentialTenantId;
  }
  return ctx.tenantId;
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
  tenantId: string,
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
      clientAuth: oauth.clientAuth,
      extraParams: oauth.extraParams,
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
    headers: {
      'Content-Type': 'application/json',
      'X-Internal-Auth': config.masterKey,
    },
    body: JSON.stringify({
      credentials: updatedRaw,
      expiresAt: refreshed.expiresAt ?? null,
      tenantId,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        logger.warn(
          { connectionId, status: res.status },
          'Failed to persist refreshed OAuth credentials',
        );
      }
    })
    .catch((err) => {
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

function addRouterTargets(ids: Set<string>, router: unknown): void {
  if (typeof router !== 'object' || router === null) return;
  const targets = (router as { targets?: Array<{ connectionId: string }> }).targets ?? [];
  for (const t of targets) {
    if (t.connectionId) ids.add(t.connectionId);
  }
}

/**
 * Every connection a run might need credentials for.
 *
 * router-engine's resolveRouterConfig picks a router from four levels — locked
 * tenant policy, per-dispatch override, node, graph — so collection has to
 * cover all four. Collecting only the graph ones is how a Caal run reached its
 * LLM node with an empty credential map: its policy arrives per-dispatch
 * (ctx.runRouterOverride), never in the compiled graph, so nothing was fetched
 * and every target was skipped as uncredentialed.
 */
function collectConnectionIds(
  graph: AgentGraphDefinition,
  ctx: ExecutionContextImpl,
): Set<string> {
  const ids = new Set<string>();
  for (const node of Object.values(graph.nodes)) {
    const cfg = node.config as Record<string, unknown>;
    if (typeof cfg.connectionId === 'string') {
      ids.add(cfg.connectionId);
    }
    addRouterTargets(ids, cfg.router);
  }
  // Graph-level router declarations also carry connection references; an LLM
  // node with no node-level router resolves to these at call time and would
  // otherwise find no credentials injected.
  addRouterTargets(ids, graph.config?.defaultRouter);
  for (const policy of Object.values(graph.routerPolicies ?? {})) {
    addRouterTargets(ids, policy);
  }
  // Dispatch-level routers, which live on the run rather than the graph:
  // the caller's override (Caal's caal_configuration.routerPolicyId) and a
  // tenant policy, which outranks the override when locked. Nothing populates
  // tenantRouterPolicy yet — collected here so wiring it cannot reintroduce
  // this same gap.
  addRouterTargets(ids, ctx.runRouterOverride);
  addRouterTargets(ids, ctx.tenantRouterPolicy);
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

  const connectionIds = collectConnectionIds(graph, ctx);
  if (connectionIds.size === 0) return;

  const db = getDb();
  const tenantId = credentialTenantFor(ctx);

  for (const connectionId of connectionIds) {
    try {
      const row = db
        .prepare(
          `SELECT credentials_enc, auth_type, status, expires_at, service
           FROM integration_connections
           WHERE id = ? AND tenant_id = ?`,
        )
        .get(connectionId, tenantId) as StoredConnection | undefined;

      if (!row) {
        logger.warn({ connectionId, tenantId }, 'Integration connection not found for tenant');
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
        resolved = await maybeRefreshOAuth(
          connectionId,
          row.service,
          // The connection's owner, so the API's ownership check accepts the
          // refreshed token written back for it.
          tenantId,
          rawCreds,
          resolved,
        );
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

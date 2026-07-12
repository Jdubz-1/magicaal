import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { tenants } from './auth';

export const integrationConnections = sqliteTable('integration_connections', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id),
  service: text('service').notNull(),
  displayName: text('display_name').notNull(),
  authType: text('auth_type', { enum: ['oauth2', 'api_key'] }).notNull(),
  credentialsEnc: text('credentials_enc').notNull(),
  status: text('status', { enum: ['active', 'expired', 'error'] })
    .notNull()
    .default('active'),
  lastUsedAt: integer('last_used_at', { mode: 'timestamp' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const integrationTriggers = sqliteTable('integration_triggers', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id),
  service: text('service').notNull(),
  tenantSlug: text('tenant_slug').notNull(),
  agentId: text('agent_id').notNull(),
  eventFilter: text('event_filter'),
  secret: text('secret').notNull(),
  enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

/**
 * Per-tenant OAuth client application (the app registered with the service:
 * Slack app, GitHub OAuth app, ...). Holds the client credentials used for the
 * authorization-code exchange; the resulting per-user tokens live in
 * integration_connections.
 */
export const integrationOauthApps = sqliteTable(
  'integration_oauth_apps',
  {
    id: text('id').primaryKey(),
    tenantId: text('tenant_id')
      .notNull()
      .references(() => tenants.id),
    service: text('service').notNull(),
    clientId: text('client_id').notNull(),
    clientSecretEnc: text('client_secret_enc').notNull(),
    /** JSON array overriding the package's default scopes. */
    scopes: text('scopes'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  },
  (table) => ({
    tenantServiceUnique: uniqueIndex('integration_oauth_apps_tenant_service_idx').on(
      table.tenantId,
      table.service,
    ),
  }),
);

export const integrationOauthStates = sqliteTable('integration_oauth_states', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id),
  service: text('service').notNull(),
  stateToken: text('state_token').notNull().unique(),
  redirectUri: text('redirect_uri').notNull(),
  codeVerifier: text('code_verifier'),
  /**
   * SHA-256 of the nonce placed in the initiating browser's cookie. The
   * callback must present the matching cookie, so an authorization code cannot
   * be redeemed by a browser other than the one that started the flow.
   */
  nonceHash: text('nonce_hash'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
});

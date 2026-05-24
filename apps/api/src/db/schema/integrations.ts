import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
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

export const integrationOauthStates = sqliteTable('integration_oauth_states', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id),
  service: text('service').notNull(),
  stateToken: text('state_token').notNull().unique(),
  redirectUri: text('redirect_uri').notNull(),
  codeVerifier: text('code_verifier'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
});

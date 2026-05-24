import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { agents, agentVersions } from './agents';
import { tenants } from './auth';

export const invocationPolicies = sqliteTable('invocation_policies', {
  agentId: text('agent_id')
    .primaryKey()
    .references(() => agents.id),
  strategy: text('strategy', { enum: ['api-key', 'jwt', 'public'] }).notNull(),
  jwtConfig: text('jwt_config'),
  rateLimit: text('rate_limit'),
  overrideFlags: text('override_flags').notNull().default('{}'),
});

export const invocationKeys = sqliteTable('invocation_keys', {
  id: text('id').primaryKey(),
  agentId: text('agent_id')
    .notNull()
    .references(() => agents.id),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id),
  label: text('label').notNull(),
  keyHash: text('key_hash').notNull().unique(),
  lastUsedAt: integer('last_used_at', { mode: 'timestamp' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }),
  revoked: integer('revoked', { mode: 'boolean' }).default(false).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const invocationLog = sqliteTable('invocation_log', {
  id: text('id').primaryKey(),
  agentId: text('agent_id')
    .notNull()
    .references(() => agents.id),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id),
  invocationKeyId: text('invocation_key_id').references(() => invocationKeys.id),
  strategy: text('strategy').notNull(),
  requestIp: text('request_ip'),
  runId: text('run_id'),
  status: text('status').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

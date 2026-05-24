import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { tenants } from './auth';
import { agents } from './agents';

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id),
  agentId: text('agent_id')
    .notNull()
    .references(() => agents.id),
  externalId: text('external_id'),
  schemaVersion: integer('schema_version').notNull().default(1),
  lastActiveAt: integer('last_active_at', { mode: 'timestamp' }).notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const sessionContext = sqliteTable('session_context', {
  id: text('id').primaryKey(),
  sessionId: text('session_id')
    .notNull()
    .references(() => sessions.id),
  key: text('key').notNull(),
  valueJson: text('value_json').notNull(),
  accumulatedCount: integer('accumulated_count').notNull().default(0),
  tokenEstimate: integer('token_estimate'),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const sessionRunLinks = sqliteTable('session_run_links', {
  id: text('id').primaryKey(),
  sessionId: text('session_id')
    .notNull()
    .references(() => sessions.id),
  runId: text('run_id').notNull(),
  position: integer('position').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

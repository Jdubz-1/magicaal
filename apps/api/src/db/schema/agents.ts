import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { tenants } from './auth';

export const agents = sqliteTable('agents', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  description: text('description'),
  currentVersionId: text('current_version_id'),
  status: text('status', { enum: ['draft', 'active', 'archived'] })
    .notNull()
    .default('draft'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const agentVersions = sqliteTable('agent_versions', {
  id: text('id').primaryKey(),
  agentId: text('agent_id')
    .notNull()
    .references(() => agents.id),
  version: integer('version').notNull(),
  graphDefinition: text('graph_definition').notNull(),
  changeNotes: text('change_notes'),
  createdBy: text('created_by').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const agentConfig = sqliteTable('agent_config', {
  agentId: text('agent_id')
    .primaryKey()
    .references(() => agents.id),
  triggerConfig: text('trigger_config').notNull().default('{}'),
  concurrencyConfig: text('concurrency_config').notNull().default('{}'),
  retryConfig: text('retry_config').notNull().default('{}'),
  sessionConfig: text('session_config').notNull().default('{}'),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

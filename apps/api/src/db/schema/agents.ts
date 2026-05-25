import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { tenants } from './auth';

export const agents = sqliteTable('agents', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id),
  name: text('name').notNull(),
  handle: text('handle').notNull().unique(),
  description: text('description'),
  currentVersionId: text('current_version_id'),
  status: text('status', { enum: ['draft', 'active', 'archived'] })
    .notNull()
    .default('draft'),
  authoringMode: text('authoring_mode', { enum: ['studio', 'code-defined'] })
    .notNull()
    .default('studio'),
  templateSourceId: text('template_source_id'),
  draftGraphJson: text('draft_graph_json'),
  stale: integer('stale', { mode: 'boolean' }).notNull().default(false),
  enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const agentVersions = sqliteTable('agent_versions', {
  id: text('id').primaryKey(),
  agentId: text('agent_id')
    .notNull()
    .references(() => agents.id),
  versionNumber: integer('version_number').notNull(),
  graphJson: text('graph_json').notNull(),
  publishNotes: text('publish_notes'),
  contentHash: text('content_hash').notNull().default(''),
  syncEventId: text('sync_event_id'),
  createdBy: text('created_by').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const agentConfig = sqliteTable('agent_config', {
  agentId: text('agent_id')
    .primaryKey()
    .references(() => agents.id),
  triggerConfig: text('trigger_config').notNull().default('{}'),
  concurrency: text('concurrency').notNull().default('{}'),
  retry: text('retry').notNull().default('{}'),
  timeoutMs: integer('timeout_ms'),
  overrideMap: text('override_map').notNull().default('{}'),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

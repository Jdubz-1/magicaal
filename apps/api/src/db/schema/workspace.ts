import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { tenants } from './auth';
import { agents } from './agents';
import { sessions } from './sessions';

export const workspaces = sqliteTable('workspaces', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id),
  agentId: text('agent_id')
    .notNull()
    .references(() => agents.id),
  sessionId: text('session_id').references(() => sessions.id),
  containerId: text('container_id'),
  status: text('status', {
    enum: ['provisioning', 'ready', 'error', 'torn_down'],
  })
    .notNull()
    .default('provisioning'),
  repositoryUrl: text('repository_url'),
  ref: text('ref'),
  volumeName: text('volume_name'),
  image: text('image'),
  resourceJson: text('resource_json'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const dataSources = sqliteTable('data_sources', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id),
  name: text('name').notNull(),
  sourceType: text('source_type').notNull(),
  connectionJson: text('connection_json').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

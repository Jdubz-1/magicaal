import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { tenants, users } from './auth';
import { agents } from './agents';

export const promptVersions = sqliteTable('prompt_versions', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id),
  name: text('name').notNull(),
  versionNumber: integer('version_number').notNull(),
  content: text('content').notNull(),
  createdBy: text('created_by')
    .notNull()
    .references(() => users.id),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(false),
  packNamespace: text('pack_namespace'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const testCases = sqliteTable('test_cases', {
  id: text('id').primaryKey(),
  agentId: text('agent_id')
    .notNull()
    .references(() => agents.id),
  tenantId: text('tenant_id').references(() => tenants.id),
  name: text('name').notNull(),
  inputJson: text('input_json').notNull(),
  assertionsJson: text('assertions_json').notNull(),
  lastResult: text('last_result'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const usageCounters = sqliteTable('usage_counters', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id),
  counterKey: text('counter_key').notNull().unique(),
  value: integer('value').notNull().default(0),
  windowStart: integer('window_start'),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

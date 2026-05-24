import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { tenants } from './auth';

export const syncEvents = sqliteTable('sync_events', {
  id: text('id').primaryKey(),
  trigger: text('trigger', { enum: ['boot', 'manual'] }).notNull(),
  startedAt: integer('started_at', { mode: 'timestamp' }).notNull(),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  agentsProcessed: integer('agents_processed').notNull().default(0),
  changesApplied: integer('changes_applied').notNull().default(0),
  errorCount: integer('error_count').notNull().default(0),
  summaryJson: text('summary_json'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const namedRouterPolicies = sqliteTable('named_router_policies', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id),
  name: text('name').notNull(),
  configJson: text('config_json').notNull(),
  overridable: integer('overridable', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const providerPricing = sqliteTable('provider_pricing', {
  id: text('id').primaryKey(),
  provider: text('provider').notNull(),
  model: text('model').notNull(),
  promptTokensPerMillion: real('prompt_tokens_per_million').notNull(),
  completionTokensPerMillion: real('completion_tokens_per_million').notNull(),
  currency: text('currency').notNull().default('USD'),
  effectiveAt: integer('effective_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

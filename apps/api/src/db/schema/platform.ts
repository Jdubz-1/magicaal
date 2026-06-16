import { sqliteTable, text, integer, real, uniqueIndex } from 'drizzle-orm/sqlite-core';
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

export const caalConfiguration = sqliteTable(
  'caal_configuration',
  {
    id: text('id').primaryKey(),
    tenantId: text('tenant_id')
      .notNull()
      .references(() => tenants.id),
    enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
    modelOverride: text('model_override'),
    routerPolicyId: text('router_policy_id'),
    generationMode: text('generation_mode', { enum: ['complete', 'skeleton'] })
      .notNull()
      .default('complete'),
    confirmationMode: text('confirmation_mode', {
      enum: ['always_confirm', 'confirm_structural', 'apply_directly'],
    })
      .notNull()
      .default('confirm_structural'),
    showReasoning: integer('show_reasoning', { mode: 'boolean' }).notNull().default(false),
    systemPromptSuffix: text('system_prompt_suffix'),
    preferredConnections: text('preferred_connections'),
    allowedOperations: text('allowed_operations'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  },
  (t) => [uniqueIndex('caal_configuration_tenant_id_unique').on(t.tenantId)],
);

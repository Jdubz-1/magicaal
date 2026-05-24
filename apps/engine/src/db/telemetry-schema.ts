import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const telemetryRuns = sqliteTable('runs', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').notNull(),
  agentId: text('agent_id').notNull(),
  agentVersionId: text('agent_version_id'),
  triggerType: text('trigger_type').notNull(),
  status: text('status').notNull(),
  startedAt: integer('started_at', { mode: 'timestamp' }).notNull(),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  inputJson: text('input_json'),
  outputJson: text('output_json'),
  errorJson: text('error_json'),
  durationMs: integer('duration_ms'),
  totalPromptTokens: integer('total_prompt_tokens').notNull().default(0),
  totalCompletionTokens: integer('total_completion_tokens').notNull().default(0),
  estimatedCostUsd: real('estimated_cost_usd').notNull().default(0),
});

export const telemetrySteps = sqliteTable('steps', {
  id: text('id').primaryKey(),
  runId: text('run_id').notNull(),
  tenantId: text('tenant_id').notNull(),
  nodeId: text('node_id').notNull(),
  nodeType: text('node_type').notNull(),
  status: text('status').notNull(),
  startedAt: integer('started_at', { mode: 'timestamp' }).notNull(),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  inputSnapshotJson: text('input_snapshot_json'),
  outputSnapshotJson: text('output_snapshot_json'),
  errorJson: text('error_json'),
  durationMs: integer('duration_ms'),
  promptTokens: integer('prompt_tokens').notNull().default(0),
  completionTokens: integer('completion_tokens').notNull().default(0),
  estimatedCostUsd: real('estimated_cost_usd').notNull().default(0),
  routingMetaJson: text('routing_meta_json'),
  routerTargetUsed: text('router_target_used'),
});

export const telemetryTrajectories = sqliteTable('trajectories', {
  id: text('id').primaryKey(),
  runId: text('run_id').notNull(),
  stepId: text('step_id').notNull(),
  iteration: integer('iteration').notNull(),
  thought: text('thought'),
  action: text('action'),
  observation: text('observation'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const telemetryEvaluateScores = sqliteTable('evaluate_scores', {
  id: text('id').primaryKey(),
  runId: text('run_id').notNull(),
  stepId: text('step_id').notNull(),
  nodeId: text('node_id').notNull(),
  scorerType: text('scorer_type').notNull(),
  score: real('score').notNull(),
  rubricJson: text('rubric_json'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const telemetryMetricsSnapshots = sqliteTable('metrics_snapshots', {
  id: text('id').primaryKey(),
  runId: text('run_id').notNull(),
  stepId: text('step_id'),
  key: text('key').notNull(),
  value: real('value').notNull(),
  labelsJson: text('labels_json'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

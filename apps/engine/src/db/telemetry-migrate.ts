import { telemetryDb } from './telemetry-client';
import { logger } from '../lib/logger';
import { sql } from 'drizzle-orm';

export async function runTelemetryMigrations(): Promise<void> {
  logger.info('Running telemetry database migrations');

  telemetryDb.run(sql`CREATE TABLE IF NOT EXISTS runs (
    id TEXT PRIMARY KEY NOT NULL,
    tenant_id TEXT NOT NULL,
    agent_id TEXT NOT NULL,
    agent_version_id TEXT,
    trigger_type TEXT NOT NULL,
    status TEXT NOT NULL,
    started_at INTEGER NOT NULL,
    completed_at INTEGER,
    input_json TEXT,
    output_json TEXT,
    error_json TEXT,
    duration_ms INTEGER,
    total_prompt_tokens INTEGER NOT NULL DEFAULT 0,
    total_completion_tokens INTEGER NOT NULL DEFAULT 0,
    estimated_cost_usd REAL NOT NULL DEFAULT 0,
    review_id TEXT,
    suspended_node_id TEXT,
    checkpoint_json TEXT
  )`);

  // Add checkpoint columns to existing runs table (safe on existing DBs)
  try {
    telemetryDb.run(sql`ALTER TABLE runs ADD COLUMN review_id TEXT`);
  } catch { /* column already exists */ }
  try {
    telemetryDb.run(sql`ALTER TABLE runs ADD COLUMN suspended_node_id TEXT`);
  } catch { /* column already exists */ }
  try {
    telemetryDb.run(sql`ALTER TABLE runs ADD COLUMN checkpoint_json TEXT`);
  } catch { /* column already exists */ }

  telemetryDb.run(sql`CREATE TABLE IF NOT EXISTS steps (
    id TEXT PRIMARY KEY NOT NULL,
    run_id TEXT NOT NULL,
    tenant_id TEXT NOT NULL,
    node_id TEXT NOT NULL,
    node_type TEXT NOT NULL,
    status TEXT NOT NULL,
    started_at INTEGER NOT NULL,
    completed_at INTEGER,
    input_snapshot_json TEXT,
    output_snapshot_json TEXT,
    error_json TEXT,
    duration_ms INTEGER,
    prompt_tokens INTEGER NOT NULL DEFAULT 0,
    completion_tokens INTEGER NOT NULL DEFAULT 0,
    estimated_cost_usd REAL NOT NULL DEFAULT 0,
    routing_meta_json TEXT,
    router_target_used TEXT
  )`);

  telemetryDb.run(sql`CREATE TABLE IF NOT EXISTS trajectories (
    id TEXT PRIMARY KEY NOT NULL,
    run_id TEXT NOT NULL,
    step_id TEXT NOT NULL,
    iteration INTEGER NOT NULL,
    thought TEXT,
    action TEXT,
    observation TEXT,
    created_at INTEGER NOT NULL
  )`);

  telemetryDb.run(sql`CREATE TABLE IF NOT EXISTS evaluate_scores (
    id TEXT PRIMARY KEY NOT NULL,
    run_id TEXT NOT NULL,
    step_id TEXT NOT NULL,
    node_id TEXT NOT NULL,
    scorer_type TEXT NOT NULL,
    score REAL NOT NULL,
    rubric_json TEXT,
    created_at INTEGER NOT NULL
  )`);

  telemetryDb.run(sql`CREATE TABLE IF NOT EXISTS metrics_snapshots (
    id TEXT PRIMARY KEY NOT NULL,
    run_id TEXT NOT NULL,
    step_id TEXT,
    key TEXT NOT NULL,
    value REAL NOT NULL,
    labels_json TEXT,
    created_at INTEGER NOT NULL
  )`);

  logger.info('Telemetry database migrations complete');
}

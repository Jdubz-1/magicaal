import { buildTestApp } from '../../helpers/app';
import { telemetryDb } from '@/db/telemetry-client';
import {
  telemetryRuns,
  telemetrySteps,
  telemetryEvaluateScores,
} from '@/db/telemetry-schema';
import { sweepTelemetry, purgeAgentTelemetry, countActiveRuns } from '@/db/telemetry-retention';
import { eq, inArray } from 'drizzle-orm';

const NOW = new Date('2026-07-15T12:00:00Z');
const DAYS = 86_400_000;

async function seedRun(
  id: string,
  status: string,
  ageDays: number,
  withChildren = false,
  agentId = 'agent-ret',
): Promise<void> {
  await telemetryDb.insert(telemetryRuns).values({
    id,
    tenantId: 'tenant-ret',
    agentId,
    triggerType: 'api',
    status,
    startedAt: new Date(NOW.getTime() - ageDays * DAYS),
    totalPromptTokens: 0,
    totalCompletionTokens: 0,
    estimatedCostUsd: 0,
  });
  if (withChildren) {
    await telemetryDb.insert(telemetrySteps).values({
      id: `step-${id}`,
      runId: id,
      tenantId: 'tenant-ret',
      nodeId: 'n1',
      nodeType: 'core:start',
      status: 'completed',
      startedAt: new Date(NOW.getTime() - ageDays * DAYS),
      promptTokens: 0,
      completionTokens: 0,
      estimatedCostUsd: 0,
    });
    await telemetryDb.insert(telemetryEvaluateScores).values({
      id: `score-${id}`,
      runId: id,
      stepId: `step-${id}`,
      nodeId: 'n1',
      scorerType: 'llm-judge',
      score: 0.5,
      createdAt: new Date(NOW.getTime() - ageDays * DAYS),
    });
  }
}

describe('telemetry retention sweep (ALIGN-032)', () => {
  beforeAll(async () => {
    await buildTestApp(); // runs telemetry migrations
  });

  it('deletes old terminal runs with their children; keeps fresh and non-terminal runs', async () => {
    await seedRun('ret-old-done', 'completed', 120, true);
    await seedRun('ret-old-failed', 'failed', 120);
    await seedRun('ret-old-suspended', 'suspended', 120, true);
    await seedRun('ret-fresh-done', 'completed', 5);

    const result = await sweepTelemetry(NOW);
    expect(result.runsDeleted).toBe(2);

    const survivors = await telemetryDb
      .select({ id: telemetryRuns.id })
      .from(telemetryRuns)
      .where(inArray(telemetryRuns.id, ['ret-old-done', 'ret-old-failed', 'ret-old-suspended', 'ret-fresh-done']));
    expect(survivors.map((r) => r.id).sort()).toEqual(['ret-fresh-done', 'ret-old-suspended']);

    // Children of the deleted run are gone; the suspended run's remain
    const steps = await telemetryDb
      .select()
      .from(telemetrySteps)
      .where(inArray(telemetrySteps.runId, ['ret-old-done', 'ret-old-suspended']));
    expect(steps.map((s) => s.runId)).toEqual(['ret-old-suspended']);

    const scores = await telemetryDb
      .select()
      .from(telemetryEvaluateScores)
      .where(eq(telemetryEvaluateScores.runId, 'ret-old-done'));
    expect(scores).toHaveLength(0);
  });

  it('reports zero when nothing is old enough', async () => {
    await seedRun('ret-recent', 'completed', 1);
    const result = await sweepTelemetry(NOW);
    expect(result.runsDeleted).toBe(0);
  });
});

describe('purgeAgentTelemetry', () => {
  beforeAll(async () => {
    await buildTestApp();
  });

  it('deletes every run for the agent with its children, and leaves other agents alone', async () => {
    await seedRun('purge-a', 'completed', 1, true, 'agent-purge');
    await seedRun('purge-b', 'failed', 400, true, 'agent-purge');
    await seedRun('keep-a', 'completed', 1, true, 'agent-keep');

    const result = await purgeAgentTelemetry('agent-purge');
    expect(result.runsDeleted).toBe(2);

    const remaining = await telemetryDb
      .select({ id: telemetryRuns.id })
      .from(telemetryRuns)
      .where(inArray(telemetryRuns.id, ['purge-a', 'purge-b', 'keep-a']));
    expect(remaining.map((r) => r.id)).toEqual(['keep-a']);

    const steps = await telemetryDb
      .select()
      .from(telemetrySteps)
      .where(inArray(telemetrySteps.runId, ['purge-a', 'purge-b', 'keep-a']));
    expect(steps.map((s) => s.runId)).toEqual(['keep-a']);

    const scores = await telemetryDb
      .select()
      .from(telemetryEvaluateScores)
      .where(inArray(telemetryEvaluateScores.runId, ['purge-a', 'purge-b']));
    expect(scores).toHaveLength(0);
  });

  it('deletes non-terminal runs too, unlike the retention sweep', async () => {
    // The sweep deliberately refuses to touch a suspended run. A purge has
    // already been gated on there being none, so it must not leave one behind
    // with its steps deleted.
    await seedRun('purge-suspended', 'suspended', 1, true, 'agent-purge-2');

    const result = await purgeAgentTelemetry('agent-purge-2');
    expect(result.runsDeleted).toBe(1);
    expect(
      await telemetryDb.select().from(telemetryRuns).where(eq(telemetryRuns.id, 'purge-suspended')),
    ).toHaveLength(0);
  });

  it('chunks past SQLite’s parameter limit', async () => {
    for (let i = 0; i < 520; i++) {
      await seedRun(`bulk-${i}`, 'completed', 1, false, 'agent-bulk');
    }
    const result = await purgeAgentTelemetry('agent-bulk');
    expect(result.runsDeleted).toBe(520);
    expect(
      await telemetryDb.select().from(telemetryRuns).where(eq(telemetryRuns.agentId, 'agent-bulk')),
    ).toHaveLength(0);
  });

  it('reports zero for an agent with no telemetry', async () => {
    expect(await purgeAgentTelemetry('agent-never-ran')).toEqual({ runsDeleted: 0 });
  });
});

describe('countActiveRuns', () => {
  beforeAll(async () => {
    await buildTestApp();
  });

  it('counts only pending, running, and suspended runs', async () => {
    await seedRun('act-pending', 'pending', 1, false, 'agent-active');
    await seedRun('act-running', 'running', 1, false, 'agent-active');
    await seedRun('act-suspended', 'suspended', 1, false, 'agent-active');
    await seedRun('act-done', 'completed', 1, false, 'agent-active');
    await seedRun('act-failed', 'failed', 1, false, 'agent-active');

    expect(await countActiveRuns('agent-active')).toBe(3);
  });

  it('returns zero for an agent with nothing in flight', async () => {
    await seedRun('idle-done', 'completed', 1, false, 'agent-idle');
    expect(await countActiveRuns('agent-idle')).toBe(0);
  });
});

import { buildTestApp } from '../../helpers/app';
import { telemetryDb } from '@/db/telemetry-client';
import {
  telemetryRuns,
  telemetrySteps,
  telemetryEvaluateScores,
} from '@/db/telemetry-schema';
import { sweepTelemetry } from '@/db/telemetry-retention';
import { eq, inArray } from 'drizzle-orm';

const NOW = new Date('2026-07-15T12:00:00Z');
const DAYS = 86_400_000;

async function seedRun(
  id: string,
  status: string,
  ageDays: number,
  withChildren = false,
): Promise<void> {
  await telemetryDb.insert(telemetryRuns).values({
    id,
    tenantId: 'tenant-ret',
    agentId: 'agent-ret',
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

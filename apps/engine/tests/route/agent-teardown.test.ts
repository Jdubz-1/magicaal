import request from 'supertest';
import type { Application } from 'express';
import { buildTestApp, internalAuthHeader } from '../helpers/app';
import { telemetryDb } from '@/db/telemetry-client';
import { telemetryRuns } from '@/db/telemetry-schema';
import { eq } from 'drizzle-orm';

// The teardown touches BullMQ and Redis pub/sub; stub both so the route can be
// exercised without either running.
jest.mock('@/controllers/schedule.controller', () => {
  const actual = jest.requireActual('@/controllers/schedule.controller');
  return { ...actual, removeAgentSchedule: jest.fn().mockResolvedValue(1) };
});
jest.mock('@/graph/graph-invalidate', () => ({
  publishGraphInvalidate: jest.fn().mockResolvedValue(undefined),
  startGraphInvalidateSubscriber: jest.fn(),
  GRAPH_INVALIDATE_CHANNEL: 'magicaal:graph-invalidate',
}));

const { removeAgentSchedule } = jest.requireMock('@/controllers/schedule.controller') as {
  removeAgentSchedule: jest.Mock;
};
const { publishGraphInvalidate } = jest.requireMock('@/graph/graph-invalidate') as {
  publishGraphInvalidate: jest.Mock;
};

async function seedRun(id: string, agentId: string, status: string): Promise<void> {
  await telemetryDb.insert(telemetryRuns).values({
    id,
    tenantId: 'tenant-td',
    agentId,
    triggerType: 'api',
    status,
    startedAt: new Date(),
    totalPromptTokens: 0,
    totalCompletionTokens: 0,
    estimatedCostUsd: 0,
  });
}

describe('DELETE /internal/agents/:id — teardown', () => {
  let app: Application;

  beforeAll(async () => {
    app = await buildTestApp();
  });

  beforeEach(() => {
    removeAgentSchedule.mockClear();
    publishGraphInvalidate.mockClear();
  });

  it('unschedules and invalidates, keeping telemetry when not purging', async () => {
    await seedRun('td-done', 'agent-td-1', 'completed');

    const res = await request(app)
      .delete('/internal/agents/agent-td-1')
      .set(internalAuthHeader());

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ agentId: 'agent-td-1', unscheduled: 1, invalidated: true });
    expect(res.body.telemetryRunsDeleted).toBe(0);
    expect(removeAgentSchedule).toHaveBeenCalledWith('agent-td-1');
    expect(publishGraphInvalidate).toHaveBeenCalled();

    // Archive keeps history.
    expect(
      await telemetryDb.select().from(telemetryRuns).where(eq(telemetryRuns.id, 'td-done')),
    ).toHaveLength(1);
  });

  it('purges telemetry when asked', async () => {
    await seedRun('td-purge', 'agent-td-2', 'completed');

    const res = await request(app)
      .delete('/internal/agents/agent-td-2?purge=true')
      .set(internalAuthHeader());

    expect(res.status).toBe(200);
    expect(res.body.telemetryRunsDeleted).toBe(1);
    expect(
      await telemetryDb.select().from(telemetryRuns).where(eq(telemetryRuns.id, 'td-purge')),
    ).toHaveLength(0);
  });

  it.each(['pending', 'running', 'suspended'])(
    '409s while a %s run is in flight, without tearing anything down',
    async (status) => {
      const agentId = `agent-busy-${status}`;
      await seedRun(`td-${status}`, agentId, status);

      const res = await request(app)
        .delete(`/internal/agents/${agentId}?purge=true`)
        .set(internalAuthHeader());

      expect(res.status).toBe(409);
      expect(res.body.code).toBe('AGENT_HAS_ACTIVE_RUNS');
      expect(removeAgentSchedule).not.toHaveBeenCalled();
      expect(publishGraphInvalidate).not.toHaveBeenCalled();
      // The run it refused over is still there.
      expect(
        await telemetryDb.select().from(telemetryRuns).where(eq(telemetryRuns.id, `td-${status}`)),
      ).toHaveLength(1);
    },
  );

  it('invalidates the graph cache even for an agent that never ran', async () => {
    const res = await request(app)
      .delete('/internal/agents/agent-never')
      .set(internalAuthHeader());

    expect(res.status).toBe(200);
    expect(publishGraphInvalidate).toHaveBeenCalled();
  });
});

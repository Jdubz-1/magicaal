import request from 'supertest';
import type { Application } from 'express';
import { buildTestApp, internalAuthHeader } from '../helpers/app';
import { telemetryDb } from '@/db/telemetry-client';
import { telemetryRuns, telemetrySteps, telemetryTrajectories, telemetryEvaluateScores } from '@/db/telemetry-schema';

describe('/internal/telemetry', () => {
  let app: Application;

  beforeAll(async () => {
    app = await buildTestApp();
  });

  async function seedRun(overrides: Partial<typeof telemetryRuns.$inferInsert>) {
    const id = overrides.id ?? `run_${Math.random().toString(36).slice(2)}`;
    await telemetryDb.insert(telemetryRuns).values({
      tenantId: 'tenant-a',
      agentId: 'agent-a',
      triggerType: 'api',
      status: 'completed',
      startedAt: new Date(),
      totalPromptTokens: 10,
      totalCompletionTokens: 5,
      estimatedCostUsd: 0.01,
      ...overrides,
      id,
    });
    return id;
  }

  describe('GET /internal/telemetry', () => {
    it('scopes runs to the requested tenant — a run belonging to another tenant never leaks in', async () => {
      const mine = await seedRun({ tenantId: 'tenant-scope-a' });
      const theirs = await seedRun({ tenantId: 'tenant-scope-b' });

      const res = await request(app)
        .get('/internal/telemetry')
        .query({ tenantId: 'tenant-scope-a' })
        .set(internalAuthHeader());

      expect(res.status).toBe(200);
      const ids = res.body.runs.map((r: { id: string }) => r.id);
      expect(ids).toContain(mine);
      expect(ids).not.toContain(theirs);
    });

    it('filters by agentId and status on top of the tenant scope', async () => {
      const tenantId = 'tenant-filter';
      await seedRun({ tenantId, agentId: 'agent-x', status: 'completed' });
      const failedRun = await seedRun({ tenantId, agentId: 'agent-x', status: 'failed' });
      await seedRun({ tenantId, agentId: 'agent-y', status: 'failed' });

      const res = await request(app)
        .get('/internal/telemetry')
        .query({ tenantId, agentId: 'agent-x', status: 'failed' })
        .set(internalAuthHeader());

      expect(res.body.runs.map((r: { id: string }) => r.id)).toEqual([failedRun]);
    });

    it('400s when tenantId is missing', async () => {
      const res = await request(app).get('/internal/telemetry').set(internalAuthHeader());
      expect(res.status).toBe(400);
    });
  });

  describe('GET /internal/telemetry/tokens', () => {
    it('aggregates totals and a per-agent breakdown, scoped to the tenant', async () => {
      const tenantId = 'tenant-tokens';
      await seedRun({ tenantId, agentId: 'agent-x', totalPromptTokens: 100, totalCompletionTokens: 20, estimatedCostUsd: 0.5 });
      await seedRun({ tenantId, agentId: 'agent-x', totalPromptTokens: 50, totalCompletionTokens: 10, estimatedCostUsd: 0.25 });
      await seedRun({ tenantId: 'other-tenant', agentId: 'agent-x', totalPromptTokens: 999, totalCompletionTokens: 999, estimatedCostUsd: 999 });

      const res = await request(app)
        .get('/internal/telemetry/tokens')
        .query({ tenantId })
        .set(internalAuthHeader());

      expect(res.status).toBe(200);
      expect(res.body.totals).toEqual({
        promptTokens: 150,
        completionTokens: 30,
        estimatedCostUsd: 0.75,
        runCount: 2,
      });
      expect(res.body.byAgent['agent-x'].runCount).toBe(2);
    });
  });

  describe('GET /internal/telemetry/trajectory/:runId', () => {
    it('404s when the run belongs to a different tenant than requested', async () => {
      const runId = await seedRun({ tenantId: 'tenant-owner' });

      const res = await request(app)
        .get(`/internal/telemetry/trajectory/${runId}`)
        .query({ tenantId: 'tenant-intruder' })
        .set(internalAuthHeader());

      expect(res.status).toBe(404);
    });

    it('returns trajectory steps in iteration order for the owning tenant', async () => {
      const runId = await seedRun({ tenantId: 'tenant-owner-2' });
      await telemetryDb.insert(telemetrySteps).values({
        id: 'step-1',
        runId,
        tenantId: 'tenant-owner-2',
        nodeId: 'n1',
        nodeType: 'core:agent-loop',
        status: 'complete',
        startedAt: new Date(),
      });
      await telemetryDb.insert(telemetryTrajectories).values([
        { id: 't2', runId, stepId: 'step-1', iteration: 2, createdAt: new Date() },
        { id: 't1', runId, stepId: 'step-1', iteration: 1, createdAt: new Date() },
      ]);

      const res = await request(app)
        .get(`/internal/telemetry/trajectory/${runId}`)
        .query({ tenantId: 'tenant-owner-2' })
        .set(internalAuthHeader());

      expect(res.status).toBe(200);
      expect(res.body.trajectories.map((t: { iteration: number }) => t.iteration)).toEqual([1, 2]);
    });
  });

  describe('GET /internal/telemetry/routing-events', () => {
    it('only surfaces steps where a router fallback occurred, scoped to the tenant', async () => {
      const tenantId = 'tenant-routing';
      const runId = await seedRun({ tenantId, agentId: 'agent-r' });
      await telemetryDb.insert(telemetrySteps).values([
        {
          id: 'step-fallback',
          runId,
          tenantId,
          nodeId: 'llm-1',
          nodeType: 'core:llm-call',
          status: 'complete',
          startedAt: new Date(),
          routingMetaJson: JSON.stringify({ attemptCount: 2, targetUsed: { id: 'fallback-model' } }),
        },
        {
          id: 'step-primary',
          runId,
          tenantId,
          nodeId: 'llm-2',
          nodeType: 'core:llm-call',
          status: 'complete',
          startedAt: new Date(),
          routingMetaJson: JSON.stringify({ attemptCount: 1, targetUsed: { id: 'primary-model' } }),
        },
      ]);

      const res = await request(app)
        .get('/internal/telemetry/routing-events')
        .query({ tenantId })
        .set(internalAuthHeader());

      expect(res.status).toBe(200);
      expect(res.body.events).toHaveLength(1);
      expect(res.body.events[0]).toMatchObject({ nodeId: 'llm-1', agentId: 'agent-r', attemptCount: 2 });
    });
  });

  describe('GET /internal/telemetry/evaluate-scores (ALIGN-014)', () => {
    async function seedScore(runId: string, overrides: Partial<typeof telemetryEvaluateScores.$inferInsert> = {}) {
      await telemetryDb.insert(telemetryEvaluateScores).values({
        id: `score_${Math.random().toString(36).slice(2)}`,
        runId,
        stepId: 'step-1',
        nodeId: 'evaluate-1',
        scorerType: 'llm-judge',
        score: 0.8,
        createdAt: new Date(),
        ...overrides,
      });
    }

    it('400s without a tenantId', async () => {
      const res = await request(app)
        .get('/internal/telemetry/evaluate-scores')
        .set(internalAuthHeader());
      expect(res.status).toBe(400);
    });

    it('scopes scores to the tenant via the owning run', async () => {
      const mine = await seedRun({ tenantId: 'tenant-eval-a' });
      const theirs = await seedRun({ tenantId: 'tenant-eval-b' });
      await seedScore(mine, { score: 0.9 });
      await seedScore(theirs, { score: 0.1 });

      const res = await request(app)
        .get('/internal/telemetry/evaluate-scores')
        .query({ tenantId: 'tenant-eval-a' })
        .set(internalAuthHeader());

      expect(res.status).toBe(200);
      expect(res.body.events).toHaveLength(1);
      expect(res.body.events[0]).toMatchObject({
        runId: mine,
        nodeId: 'evaluate-1',
        scorerType: 'llm-judge',
        score: 0.9,
        agentId: 'agent-a',
      });
    });

    it('filters by agentId and parses the rubric', async () => {
      const tenantId = 'tenant-eval-filter';
      const runX = await seedRun({ tenantId, agentId: 'agent-x' });
      const runY = await seedRun({ tenantId, agentId: 'agent-y' });
      await seedScore(runX, { rubricJson: JSON.stringify({ criteria: ['clarity'] }) });
      await seedScore(runY);

      const res = await request(app)
        .get('/internal/telemetry/evaluate-scores')
        .query({ tenantId, agentId: 'agent-x' })
        .set(internalAuthHeader());

      expect(res.body.events).toHaveLength(1);
      expect(res.body.events[0].rubric).toEqual({ criteria: ['clarity'] });
    });
  });

  describe('GET /internal/telemetry/usage', () => {
    it('returns a deployment-wide count with no tenant identifiers', async () => {
      const since = new Date(Date.now() - 60_000).toISOString();
      await seedRun({ tenantId: 'tenant-usage-a' });
      await seedRun({ tenantId: 'tenant-usage-b' });

      const res = await request(app)
        .get('/internal/telemetry/usage')
        .query({ since })
        .set(internalAuthHeader());

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('totalRuns');
      expect(res.body.totalRuns).toBeGreaterThanOrEqual(2);
      expect(res.body).not.toHaveProperty('tenantId');
    });

    it('400s on an unparsable since value', async () => {
      const res = await request(app)
        .get('/internal/telemetry/usage')
        .query({ since: 'not-a-date' })
        .set(internalAuthHeader());
      expect(res.status).toBe(400);
    });
  });
});

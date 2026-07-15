import request from 'supertest';
import Database from 'better-sqlite3';
import type { Application } from 'express';
import { buildTestApp, internalAuthHeader, dbFile, queueMocks, resetQueueMocks } from '../helpers/app';
import { seedAgent } from '../helpers/primary-db';
import { telemetryDb } from '@/db/telemetry-client';
import { telemetryRuns } from '@/db/telemetry-schema';
import { sseManager } from '@/sse/sse-manager';
import { eq } from 'drizzle-orm';

describe('/internal/runs', () => {
  let app: Application;
  let db: Database.Database;

  beforeAll(async () => {
    app = await buildTestApp();
    db = new Database(dbFile);
  });

  afterAll(() => {
    db.close();
  });

  beforeEach(() => {
    resetQueueMocks();
  });

  async function seedRun(overrides: Partial<typeof telemetryRuns.$inferInsert> = {}) {
    const id = overrides.id ?? `run_${Math.random().toString(36).slice(2)}`;
    await telemetryDb.insert(telemetryRuns).values({
      tenantId: 'tenant-a',
      agentId: 'agent-a',
      triggerType: 'api',
      status: 'pending',
      startedAt: new Date(),
      totalPromptTokens: 0,
      totalCompletionTokens: 0,
      estimatedCostUsd: 0,
      ...overrides,
      id,
    });
    return id;
  }

  describe('POST /internal/runs — dispatchRun', () => {
    // Payload mirrors apps/api/src/controllers/runs.controller.ts's dispatchInvocation
    // and caal.controller.ts's invokeCaal call sites exactly.
    it('dispatches for a platform caller and enqueues the run job', async () => {
      const agentId = seedAgent(db, { tenantId: 'tenant-a' });

      const res = await request(app)
        .post('/internal/runs')
        .set(internalAuthHeader())
        .send({
          agentId,
          tenantId: 'tenant-a',
          triggerType: 'api',
          input: { hello: 'world' },
          caller: { kind: 'platform', strategy: 'platform' },
        });

      expect(res.status).toBe(202);
      expect(res.body.runId).toMatch(/^run_/);
      expect(queueMocks.runTriggerQueue.add).toHaveBeenCalledTimes(1);
      const [, job] = queueMocks.runTriggerQueue.add.mock.calls[0];
      expect(job).toMatchObject({ agentId, tenantId: 'tenant-a', triggerType: 'api' });
    });

    it('dispatches for an invocation caller', async () => {
      const agentId = seedAgent(db, { tenantId: 'tenant-a' });

      const res = await request(app)
        .post('/internal/runs')
        .set(internalAuthHeader())
        .send({
          agentId,
          tenantId: 'tenant-a',
          triggerType: 'api',
          input: {},
          caller: { kind: 'invocation', strategy: 'api-key', keyId: 'ik_1' },
        });

      expect(res.status).toBe(202);
      expect(queueMocks.runTriggerQueue.add).toHaveBeenCalledTimes(1);
    });

    // ISS-063: dispatchRun must require caller.kind, not validate invocation auth
    // itself — every legitimate caller (Studio, Caal, sub-graph, invocation-auth-
    // already-validated) was 401ing before this was fixed at the route level.
    it('400s with CALLER_REQUIRED when caller is absent', async () => {
      const agentId = seedAgent(db, { tenantId: 'tenant-a' });

      const res = await request(app)
        .post('/internal/runs')
        .set(internalAuthHeader())
        .send({ agentId, tenantId: 'tenant-a', input: {} });

      expect(res.status).toBe(400);
      expect(res.body.code).toBe('CALLER_REQUIRED');
      expect(queueMocks.runTriggerQueue.add).not.toHaveBeenCalled();
    });

    it('400s with CALLER_REQUIRED when caller.kind is an unrecognized value', async () => {
      const agentId = seedAgent(db, { tenantId: 'tenant-a' });

      const res = await request(app)
        .post('/internal/runs')
        .set(internalAuthHeader())
        .send({ agentId, tenantId: 'tenant-a', input: {}, caller: { kind: 'bogus' } });

      expect(res.status).toBe(400);
      expect(res.body.code).toBe('CALLER_REQUIRED');
    });

    it('404s when agentId does not belong to tenantId', async () => {
      const agentId = seedAgent(db, { tenantId: 'tenant-a' });

      const res = await request(app)
        .post('/internal/runs')
        .set(internalAuthHeader())
        .send({
          agentId,
          tenantId: 'a-different-tenant',
          input: {},
          caller: { kind: 'platform', strategy: 'platform' },
        });

      expect(res.status).toBe(404);
      expect(res.body.code).toBe('AGENT_NOT_FOUND');
      expect(queueMocks.runTriggerQueue.add).not.toHaveBeenCalled();
    });

    it('400s when agentId or tenantId is missing', async () => {
      const res = await request(app)
        .post('/internal/runs')
        .set(internalAuthHeader())
        .send({ input: {}, caller: { kind: 'platform', strategy: 'platform' } });

      expect(res.status).toBe(400);
    });
  });

  describe('GET /internal/runs/:id', () => {
    it('returns the run in the shape apps/api/src/controllers/runs.controller.ts expects', async () => {
      const runId = await seedRun({ status: 'completed', outputJson: JSON.stringify({ ok: true }) });

      const res = await request(app).get(`/internal/runs/${runId}`).set(internalAuthHeader());

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        id: runId,
        agentId: 'agent-a',
        tenantId: 'tenant-a',
        status: 'completed',
        output: { ok: true },
      });
    });

    it('404s for an unknown run id', async () => {
      const res = await request(app).get('/internal/runs/does-not-exist').set(internalAuthHeader());
      expect(res.status).toBe(404);
      expect(res.body.code).toBe('RUN_NOT_FOUND');
    });
  });

  describe('GET /internal/runs/:id/steps', () => {
    it('returns an empty array for a run with no steps', async () => {
      const runId = await seedRun();
      const res = await request(app).get(`/internal/runs/${runId}/steps`).set(internalAuthHeader());
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('POST /internal/runs/:id/review', () => {
    it('approve re-enqueues the run and resumes from the suspended node', async () => {
      const runId = await seedRun({
        status: 'suspended',
        suspendedNodeId: 'human-review-1',
        checkpointJson: JSON.stringify({ partial: true }),
      });

      const res = await request(app)
        .post(`/internal/runs/${runId}/review`)
        .set(internalAuthHeader())
        .send({ action: 'approve' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ runId, action: 'approve', resumed: true, rejected: false });
      expect(queueMocks.runTriggerQueue.add).toHaveBeenCalledTimes(1);
      const [, job] = queueMocks.runTriggerQueue.add.mock.calls[0];
      expect(job).toMatchObject({ runId, resumeFromNodeId: 'human-review-1' });
    });

    it('reject fails the run immediately without re-enqueuing', async () => {
      const runId = await seedRun({ status: 'suspended' });

      const res = await request(app)
        .post(`/internal/runs/${runId}/review`)
        .set(internalAuthHeader())
        .send({ action: 'reject', reason: 'not good' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ runId, action: 'reject', resumed: false, rejected: true });
      expect(queueMocks.runTriggerQueue.add).not.toHaveBeenCalled();

      const [row] = await telemetryDb.select().from(telemetryRuns).where(eq(telemetryRuns.id, runId));
      expect(row.status).toBe('failed');
    });

    it('400s on an invalid action', async () => {
      const runId = await seedRun({ status: 'suspended' });
      const res = await request(app)
        .post(`/internal/runs/${runId}/review`)
        .set(internalAuthHeader())
        .send({ action: 'maybe' });
      expect(res.status).toBe(400);
    });

    it('409s when the run is not suspended', async () => {
      const runId = await seedRun({ status: 'running' });
      const res = await request(app)
        .post(`/internal/runs/${runId}/review`)
        .set(internalAuthHeader())
        .send({ action: 'approve' });
      expect(res.status).toBe(409);
      expect(res.body.code).toBe('RUN_NOT_SUSPENDED');
    });
  });

  describe('DELETE /internal/runs/:id — cancelRun', () => {
    it('sets the abort flag and answers 202 for a running run (worker owns the terminal state)', async () => {
      const runId = await seedRun({ status: 'running' });

      const res = await request(app).delete(`/internal/runs/${runId}`).set(internalAuthHeader());

      expect(res.status).toBe(202);
      expect(res.body).toEqual({ runId, cancelling: true });
      expect(queueMocks.redis.set).toHaveBeenCalledWith(
        `run:abort:${runId}`,
        'cancelled',
        'EX',
        expect.any(Number),
      );
    });

    it('marks a pending run cancelled directly — no worker owns it yet', async () => {
      const runId = await seedRun({ status: 'pending' });

      const res = await request(app).delete(`/internal/runs/${runId}`).set(internalAuthHeader());

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ runId, status: 'cancelled' });
    });

    it('409s a run that is already terminal', async () => {
      const runId = await seedRun({ status: 'completed' });
      const res = await request(app).delete(`/internal/runs/${runId}`).set(internalAuthHeader());
      expect(res.status).toBe(409);
      expect(res.body.code).toBe('RUN_ALREADY_TERMINAL');
    });

    it('404s for an unknown run', async () => {
      const res = await request(app).delete('/internal/runs/nope').set(internalAuthHeader());
      expect(res.status).toBe(404);
    });
  });

  describe('GET /internal/runs/:id/stream', () => {
    it('sends the terminal event immediately and closes for a completed run', async () => {
      const runId = await seedRun({ status: 'completed', outputJson: JSON.stringify({ x: 1 }) });

      const res = await request(app).get(`/internal/runs/${runId}/stream`).set(internalAuthHeader());

      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toContain('text/event-stream');
      expect(res.text).toContain('event: run.completed');
      expect(res.text).toContain(runId);
    });

    it('sends the terminal event for a failed run', async () => {
      const runId = await seedRun({
        status: 'failed',
        errorJson: JSON.stringify({ code: 'BOOM', message: 'it broke' }),
      });

      const res = await request(app).get(`/internal/runs/${runId}/stream`).set(internalAuthHeader());

      expect(res.text).toContain('event: run.failed');
    });

    it('404s for an unknown run', async () => {
      const res = await request(app).get('/internal/runs/nope/stream').set(internalAuthHeader());
      expect(res.status).toBe(404);
    });

    // Bounded check per the route-test plan: a non-terminal run's stream never
    // closes on its own (it waits for lifecycle events), so we only assert the
    // route reaches sseManager.subscribe with the right runId and abort the
    // socket ourselves rather than holding an open connection for the suite.
    it('subscribes to live events for a non-terminal run instead of closing immediately', async () => {
      const runId = await seedRun({ status: 'running' });
      const subscribeSpy = jest.spyOn(sseManager, 'subscribe');

      await expect(
        request(app)
          .get(`/internal/runs/${runId}/stream`)
          .set(internalAuthHeader())
          .timeout({ deadline: 300 }),
      ).rejects.toThrow();

      expect(subscribeSpy).toHaveBeenCalledWith(runId, expect.anything());
      subscribeSpy.mockRestore();
      sseManager.close(runId);
    });
  });
});

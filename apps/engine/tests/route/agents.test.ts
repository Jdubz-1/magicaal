import request from 'supertest';
import Database from 'better-sqlite3';
import type { Application } from 'express';
import { buildTestApp, internalAuthHeader, dbFile, queueMocks, resetQueueMocks } from '../helpers/app';
import { seedAgent, seedAgentVersion } from '../helpers/primary-db';
import { graphLoader } from '@/graph/graph-loader';

describe('/internal/agents', () => {
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

  describe('POST /internal/agents/:id/deploy — graph-loader cache bust', () => {
    it('invalidates the cached graph so a republished agent is re-read from the DB', async () => {
      const agentId = seedAgent(db, { tenantId: 'tenant-a' });
      seedAgentVersion(db, agentId, { entry: 'start', nodes: { start: { id: 'start', type: 'core:start' } } });

      // Prime the cache directly, the way the scheduler does on first dispatch.
      const first = await graphLoader.load(agentId, 'tenant-a');
      expect(first.entry).toBe('start');

      // Simulate a republish: a new version, still cached under the old graph.
      seedAgentVersion(db, agentId, { entry: 'v2', nodes: { v2: { id: 'v2', type: 'core:start' } } });
      const stillCached = await graphLoader.load(agentId, 'tenant-a');
      expect(stillCached.entry).toBe('start');

      const res = await request(app).post(`/internal/agents/${agentId}/deploy`).set(internalAuthHeader());
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ agentId, invalidated: true });

      const afterDeploy = await graphLoader.load(agentId, 'tenant-a');
      expect(afterDeploy.entry).toBe('v2');
    });

    it('publishes a Redis invalidation event so other instances follow suit (ALIGN-030)', async () => {
      const agentId = seedAgent(db, { tenantId: 'tenant-a' });
      seedAgentVersion(db, agentId, { entry: 'start', nodes: { start: { id: 'start', type: 'core:start' } } });

      await request(app).post(`/internal/agents/${agentId}/deploy`).set(internalAuthHeader());

      expect(queueMocks.redis.publish).toHaveBeenCalledWith(
        'magicaal:graph-invalidate',
        expect.stringContaining(agentId),
      );
    });
  });

  describe('POST /internal/agents/schedule', () => {
    // Payload mirrors apps/api/src/controllers/agents.controller.ts's publishAgent.
    it('schedules a repeating cron job', async () => {
      const res = await request(app)
        .post('/internal/agents/schedule')
        .set(internalAuthHeader())
        .send({ agentId: 'agent-1', tenantId: 'tenant-a', cronExpression: '0 * * * *' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ agentId: 'agent-1', cronExpression: '0 * * * *', scheduled: true });
      expect(queueMocks.runScheduledQueue.add).toHaveBeenCalledWith(
        'cron:agent-1',
        expect.objectContaining({ agentId: 'agent-1', tenantId: 'tenant-a', triggerType: 'cron' }),
        expect.objectContaining({ repeat: { pattern: '0 * * * *' } }),
      );
    });

    it('removes an existing repeatable job for the same agent before adding the new one', async () => {
      queueMocks.runScheduledQueue.getRepeatableJobs.mockResolvedValueOnce([
        { name: 'cron:agent-1', key: 'old-key' },
        { name: 'cron:agent-2', key: 'other-agent-key' },
      ]);

      await request(app)
        .post('/internal/agents/schedule')
        .set(internalAuthHeader())
        .send({ agentId: 'agent-1', tenantId: 'tenant-a', cronExpression: '*/5 * * * *' });

      expect(queueMocks.runScheduledQueue.removeRepeatableByKey).toHaveBeenCalledWith('old-key');
      expect(queueMocks.runScheduledQueue.removeRepeatableByKey).not.toHaveBeenCalledWith('other-agent-key');
    });

    it('400s when cronExpression is missing', async () => {
      const res = await request(app)
        .post('/internal/agents/schedule')
        .set(internalAuthHeader())
        .send({ agentId: 'agent-1', tenantId: 'tenant-a' });
      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /internal/agents/:agentId/schedule', () => {
    it('removes every repeatable job registered for the agent', async () => {
      queueMocks.runScheduledQueue.getRepeatableJobs.mockResolvedValueOnce([
        { name: 'cron:agent-1', key: 'k1' },
        { name: 'cron:agent-1', key: 'k2' },
        { name: 'cron:agent-2', key: 'k3' },
      ]);

      const res = await request(app).delete('/internal/agents/agent-1/schedule').set(internalAuthHeader());

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ agentId: 'agent-1', removed: 2 });
      expect(queueMocks.runScheduledQueue.removeRepeatableByKey).toHaveBeenCalledTimes(2);
    });
  });

  describe('POST /internal/agents/:agentId/webhook', () => {
    // Payload mirrors apps/api/src/controllers/webhook.controller.ts's
    // handleWebhook — the API validates the webhook secret and forwards the
    // raw body with the resolved tenant as an x-tenant-id header, not a body field.
    it('dispatches a run using the tenant from x-tenant-id', async () => {
      const agentId = seedAgent(db, { tenantId: 'tenant-a' });

      const res = await request(app)
        .post(`/internal/agents/${agentId}/webhook`)
        .set(internalAuthHeader())
        .set('x-tenant-id', 'tenant-a')
        .send({ event: 'payment.succeeded' });

      expect(res.status).toBe(202);
      expect(res.body.runId).toMatch(/^run_/);
      expect(queueMocks.runTriggerQueue.add).toHaveBeenCalledTimes(1);
      const [, job] = queueMocks.runTriggerQueue.add.mock.calls[0];
      expect(job).toMatchObject({ agentId, tenantId: 'tenant-a', triggerType: 'webhook' });
    });

    it('400s with MISSING_TENANT_ID when the header is absent', async () => {
      const agentId = seedAgent(db, { tenantId: 'tenant-a' });
      const res = await request(app)
        .post(`/internal/agents/${agentId}/webhook`)
        .set(internalAuthHeader())
        .send({});
      expect(res.status).toBe(400);
      expect(res.body.code).toBe('MISSING_TENANT_ID');
    });

    it('404s when the agent does not belong to the tenant in the header', async () => {
      const agentId = seedAgent(db, { tenantId: 'tenant-a' });
      const res = await request(app)
        .post(`/internal/agents/${agentId}/webhook`)
        .set(internalAuthHeader())
        .set('x-tenant-id', 'a-different-tenant')
        .send({});
      expect(res.status).toBe(404);
    });
  });
});

import * as crypto from 'node:crypto';
import request from 'supertest';
import type { Application } from 'express';
import { buildTestApp, internalAuthHeader, queueMocks, resetQueueMocks } from '../helpers/app';

const SECRET = 'signing-secret';
const NOW_S = Math.floor(Date.now() / 1000);

function slackSign(rawBody: string, secret: string = SECRET): Record<string, string> {
  const sig = crypto
    .createHmac('sha256', secret)
    .update(`v0:${NOW_S}:${rawBody}`)
    .digest('hex');
  return {
    'x-slack-request-timestamp': String(NOW_S),
    'x-slack-signature': `v0=${sig}`,
  };
}

describe('/internal/integrations + /internal/triggers/integrations', () => {
  let app: Application;

  beforeAll(async () => {
    app = await buildTestApp();
  });

  beforeEach(() => {
    resetQueueMocks();
  });

  describe('GET /internal/integrations', () => {
    it('exposes the built-in slack package with trigger support', async () => {
      const res = await request(app).get('/internal/integrations').set(internalAuthHeader());
      expect(res.status).toBe(200);
      const slack = res.body.find((p: { service: string }) => p.service === 'slack');
      expect(slack).toBeDefined();
      expect(slack.hasTrigger).toBe(true);
      expect(slack.nodeTypes).toContain('integration:slack:post-message');
    });
  });

  describe('POST /internal/triggers/integrations/:service', () => {
    // Payload mirrors apps/api/src/controllers/integration-triggers.controller.ts's
    // handleTriggerDispatch: { tenantId, rawBody, headers, triggers }.
    const eventBody = JSON.stringify({ type: 'event_callback', event: { type: 'app_mention' } });

    it('enqueues a run for a validly signed event', async () => {
      const res = await request(app)
        .post('/internal/triggers/integrations/slack')
        .set(internalAuthHeader())
        .send({
          tenantId: 't-1',
          rawBody: eventBody,
          headers: slackSign(eventBody),
          triggers: [{ id: 'tr-1', agentId: 'agent-1', eventFilter: null, secret: SECRET }],
        });

      expect(res.status).toBe(202);
      expect(res.body.eventType).toBe('app_mention');
      expect(queueMocks.runTriggerQueue.add).toHaveBeenCalledTimes(1);
      const [, job] = queueMocks.runTriggerQueue.add.mock.calls[0];
      expect(job).toMatchObject({ agentId: 'agent-1', tenantId: 't-1', triggerType: 'integration' });
    });

    it('401s an invalid signature and dispatches nothing', async () => {
      const res = await request(app)
        .post('/internal/triggers/integrations/slack')
        .set(internalAuthHeader())
        .send({
          tenantId: 't-1',
          rawBody: eventBody,
          headers: slackSign(eventBody, 'wrong-secret'),
          triggers: [{ id: 'tr-1', agentId: 'agent-1', eventFilter: null, secret: SECRET }],
        });

      expect(res.status).toBe(401);
      expect(res.body.code).toBe('INVALID_SIGNATURE');
      expect(queueMocks.runTriggerQueue.add).not.toHaveBeenCalled();
    });

    it('answers the Slack url_verification handshake without dispatching anything', async () => {
      const handshakeBody = JSON.stringify({ type: 'url_verification', challenge: 'ch-123' });

      const res = await request(app)
        .post('/internal/triggers/integrations/slack')
        .set(internalAuthHeader())
        .send({
          tenantId: 't-1',
          rawBody: handshakeBody,
          headers: slackSign(handshakeBody),
          triggers: [{ id: 'tr-1', agentId: 'agent-1', eventFilter: null, secret: SECRET }],
        });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ challenge: 'ch-123' });
      expect(queueMocks.runTriggerQueue.add).not.toHaveBeenCalled();
    });

    it('applies each registration event filter and dispatches to every match', async () => {
      const res = await request(app)
        .post('/internal/triggers/integrations/slack')
        .set(internalAuthHeader())
        .send({
          tenantId: 't-1',
          rawBody: eventBody,
          headers: slackSign(eventBody),
          triggers: [
            { id: 'tr-1', agentId: 'agent-mention', eventFilter: 'app_mention', secret: SECRET },
            { id: 'tr-2', agentId: 'agent-message', eventFilter: 'message', secret: SECRET },
            { id: 'tr-3', agentId: 'agent-all', eventFilter: null, secret: SECRET },
          ],
        });

      expect(res.status).toBe(202);
      const dispatchedAgents = queueMocks.runTriggerQueue.add.mock.calls.map(
        ([, job]: [string, { agentId: string }]) => job.agentId,
      );
      expect(dispatchedAgents.sort()).toEqual(['agent-all', 'agent-mention']);
    });

    it('404s an unregistered integration service', async () => {
      const res = await request(app)
        .post('/internal/triggers/integrations/not-a-real-service')
        .set(internalAuthHeader())
        .send({ tenantId: 't-1', rawBody: '{}', headers: {}, triggers: [] });

      expect(res.status).toBe(404);
    });
  });
});

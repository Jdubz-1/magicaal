import * as crypto from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';

jest.mock('@/db/telemetry-client', () => ({
  telemetryDb: {
    insert: jest.fn().mockReturnValue({ values: jest.fn().mockResolvedValue(undefined) }),
  },
}));

jest.mock('@/queue/client', () => ({
  runTriggerQueue: { add: jest.fn().mockResolvedValue(undefined) },
}));

import { registerIntegrations } from '@/registry/startup';
import {
  listIntegrations,
  integrationTriggerDispatch,
} from '@/controllers/integrations.controller';
import { runTriggerQueue } from '@/queue/client';

const NOW_S = Math.floor(Date.now() / 1000);
const SECRET = 'signing-secret';

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

function mockRes() {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res as Response & { status: jest.Mock; json: jest.Mock };
}

async function dispatch(body: Record<string, unknown>) {
  const req = { params: { service: 'slack' }, body } as unknown as Request;
  const res = mockRes();
  const next = jest.fn() as NextFunction & jest.Mock;
  await (integrationTriggerDispatch(req, res, next) as unknown as Promise<void>);
  return { res, next };
}

beforeAll(() => {
  registerIntegrations();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('listIntegrations', () => {
  it('exposes the slack package with trigger support', () => {
    const res = mockRes();
    listIntegrations({} as Request, res, jest.fn());
    const payload = res.json.mock.calls[0][0];
    const slack = payload.find((p: { service: string }) => p.service === 'slack');
    expect(slack).toBeDefined();
    expect(slack.hasTrigger).toBe(true);
    expect(slack.nodeTypes).toContain('integration:slack:post-message');
  });
});

describe('integrationTriggerDispatch', () => {
  const eventBody = JSON.stringify({ type: 'event_callback', event: { type: 'app_mention' } });

  it('enqueues a run for a valid signed event', async () => {
    const { res } = await dispatch({
      tenantId: 't-1',
      rawBody: eventBody,
      headers: slackSign(eventBody),
      triggers: [{ id: 'tr-1', agentId: 'agent-1', eventFilter: null, secret: SECRET }],
    });

    expect(res.status).toHaveBeenCalledWith(202);
    expect(runTriggerQueue.add).toHaveBeenCalledTimes(1);
    const [, job] = (runTriggerQueue.add as jest.Mock).mock.calls[0];
    expect(job.agentId).toBe('agent-1');
    expect(job.triggerType).toBe('integration');
    expect(job.input.eventType).toBe('app_mention');
  });

  it('rejects an invalid signature with 401 and enqueues nothing', async () => {
    const { next } = await dispatch({
      tenantId: 't-1',
      rawBody: eventBody,
      headers: slackSign(eventBody, 'wrong-secret'),
      triggers: [{ id: 'tr-1', agentId: 'agent-1', eventFilter: null, secret: SECRET }],
    });

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].status).toBe(401);
    expect(runTriggerQueue.add).not.toHaveBeenCalled();
  });

  it('rejects a tampered payload', async () => {
    const headers = slackSign(eventBody);
    const tampered = eventBody.replace('app_mention', 'message');

    const { next } = await dispatch({
      tenantId: 't-1',
      rawBody: tampered,
      headers,
      triggers: [{ id: 'tr-1', agentId: 'agent-1', eventFilter: null, secret: SECRET }],
    });

    expect(next.mock.calls[0][0].status).toBe(401);
    expect(runTriggerQueue.add).not.toHaveBeenCalled();
  });

  it('answers the Slack url_verification handshake without dispatching', async () => {
    const handshakeBody = JSON.stringify({ type: 'url_verification', challenge: 'ch-123' });

    const { res } = await dispatch({
      tenantId: 't-1',
      rawBody: handshakeBody,
      headers: slackSign(handshakeBody),
      triggers: [{ id: 'tr-1', agentId: 'agent-1', eventFilter: null, secret: SECRET }],
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ challenge: 'ch-123' });
    expect(runTriggerQueue.add).not.toHaveBeenCalled();
  });

  it('applies event filters and dispatches to every matching registration', async () => {
    const { res } = await dispatch({
      tenantId: 't-1',
      rawBody: eventBody,
      headers: slackSign(eventBody),
      triggers: [
        { id: 'tr-1', agentId: 'agent-mention', eventFilter: 'app_mention', secret: SECRET },
        { id: 'tr-2', agentId: 'agent-message', eventFilter: 'message', secret: SECRET },
        { id: 'tr-3', agentId: 'agent-all', eventFilter: null, secret: SECRET },
      ],
    });

    expect(res.status).toHaveBeenCalledWith(202);
    const dispatchedAgents = (runTriggerQueue.add as jest.Mock).mock.calls.map(
      ([, job]) => job.agentId,
    );
    expect(dispatchedAgents.sort()).toEqual(['agent-all', 'agent-mention']);
  });

  it('400s for a service without trigger support', async () => {
    const req = {
      params: { service: 'nonexistent' },
      body: { tenantId: 't-1', rawBody: '{}', headers: {}, triggers: [] },
    } as unknown as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction & jest.Mock;

    await (integrationTriggerDispatch(req, res, next) as unknown as Promise<void>);
    expect(next.mock.calls[0][0].status).toBe(404);
  });
});

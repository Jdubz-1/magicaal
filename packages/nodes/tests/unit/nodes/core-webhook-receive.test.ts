import { coreWebhookReceive } from '../../../src/nodes/core-webhook-receive';
import { makeMockContext } from '../../helpers/mock-context';

describe('core:webhook-receive', () => {
  it('reads webhook payload and writes normalised result to outputKey', async () => {
    const ctx = makeMockContext({ _webhook_payload: { event: 'push', repo: 'my-repo' } });

    const result = await coreWebhookReceive.execute(ctx, { outputKey: 'webhookData' });

    expect(result.status).toBe('complete');
    const data = ctx.get<{ body: { event: string }; receivedAt: string }>('webhookData');
    expect(data?.body).toEqual({ event: 'push', repo: 'my-repo' });
    expect(data?.receivedAt).toBeTruthy();
    expect(ctx.get('_webhook_received_at')).toBeTruthy();
  });

  it('uses custom payloadKey when provided', async () => {
    const ctx = makeMockContext({ githubPayload: { action: 'opened' } });

    const result = await coreWebhookReceive.execute(ctx, {
      payloadKey: 'githubPayload',
      outputKey: 'out',
    });

    expect(result.status).toBe('complete');
    const data = ctx.get<{ body: { action: string } }>('out');
    expect(data?.body.action).toBe('opened');
  });

  it('includes headers when headersKey is provided', async () => {
    const ctx = makeMockContext({
      _webhook_payload: { data: 1 },
      whHeaders: { 'x-signature': 'abc123' },
    });

    const result = await coreWebhookReceive.execute(ctx, {
      headersKey: 'whHeaders',
      outputKey: 'out',
    });

    expect(result.status).toBe('complete');
    const data = ctx.get<{ headers: { 'x-signature': string } }>('out');
    expect(data?.headers?.['x-signature']).toBe('abc123');
  });

  it('returns WEBHOOK_PAYLOAD_MISSING when payload is not in context', async () => {
    const ctx = makeMockContext({});

    const result = await coreWebhookReceive.execute(ctx, { outputKey: 'out' });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('WEBHOOK_PAYLOAD_MISSING');
  });
});

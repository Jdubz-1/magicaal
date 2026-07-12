import * as crypto from 'node:crypto';
import { zendeskCreateTicket, zendeskAddComment, verifyZendeskSignature, zendeskTrigger } from '../../src/index';
import { makeMockContext } from '../helpers/mock-context';

const CREDS = {
  'conn-1': {
    type: 'apikey' as const,
    extra: { base_url: 'https://acme.zendesk.com', email: 'agent@acme.com', api_token: 'zd-token' },
  },
};
const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('integration:zendesk:create-ticket', () => {
  it('creates a ticket with email/token Basic auth', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ ticket: { id: 42, url: 'https://acme.zendesk.com/api/v2/tickets/42.json' } }), {
        status: 201,
      }),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await zendeskCreateTicket.execute(ctx, {
      connectionId: 'conn-1',
      subject: 'Help',
      comment: 'It broke',
      priority: 'high',
      outputKey: 'ticket',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('ticket')).toEqual({
      id: 42,
      url: 'https://acme.zendesk.com/api/v2/tickets/42.json',
    });

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe('https://acme.zendesk.com/api/v2/tickets.json');
    const expectedBasic = Buffer.from('agent@acme.com/token:zd-token').toString('base64');
    expect(init.headers.Authorization).toBe(`Basic ${expectedBasic}`);
    expect(JSON.parse(init.body).ticket.priority).toBe('high');
  });
});

describe('integration:zendesk:add-comment', () => {
  it('PUTs a comment onto the ticket', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ ticket: { id: 42 } }), { status: 200 }),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    await zendeskAddComment.execute(ctx, {
      connectionId: 'conn-1',
      ticketId: '42',
      comment: 'On it',
      isPublic: false,
      outputKey: 'comment',
    });

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe('https://acme.zendesk.com/api/v2/tickets/42.json');
    expect(init.method).toBe('PUT');
    expect(JSON.parse(init.body).ticket.comment.public).toBe(false);
  });
});

describe('verifyZendeskSignature', () => {
  const SECRET = 'zd-signing-secret';
  const TS = '2026-07-11T00:00:00Z';
  const body = JSON.stringify({ type: 'zen:event-type:ticket.created' });

  function sign(payload: string, ts: string = TS, secret: string = SECRET): string {
    return crypto.createHmac('sha256', secret).update(`${ts}${payload}`).digest('base64');
  }

  function headersFor(payload: string) {
    return {
      'x-zendesk-webhook-signature': sign(payload),
      'x-zendesk-webhook-signature-timestamp': TS,
    };
  }

  it('accepts a valid base64 HMAC over timestamp+body', () => {
    expect(verifyZendeskSignature(body, headersFor(body), SECRET)).toBe(true);
  });

  it('rejects a tampered payload, wrong secret, and missing headers', () => {
    expect(verifyZendeskSignature(body.replace('created', 'deleted'), headersFor(body), SECRET)).toBe(false);
    expect(
      verifyZendeskSignature(body, { ...headersFor(body), 'x-zendesk-webhook-signature': sign(body, TS, 'other') }, SECRET),
    ).toBe(false);
    expect(verifyZendeskSignature(body, {}, SECRET)).toBe(false);
  });

  it('extracts the event type', () => {
    expect(zendeskTrigger.eventType({ type: 'zen:event-type:ticket.created' }, {})).toBe(
      'zen:event-type:ticket.created',
    );
  });
});

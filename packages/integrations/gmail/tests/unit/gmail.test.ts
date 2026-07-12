import { gmailSendEmail, gmailListMessages, gmailTrigger } from '../../src/index';
import { makeMockContext } from '../helpers/mock-context';

const CREDS = { 'conn-1': { type: 'oauth' as const, accessToken: 'ya29.token' } };
const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('integration:gmail:send-email', () => {
  it('sends a base64url RFC822 message', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: 'm1', threadId: 't1' }), { status: 200 }),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await gmailSendEmail.execute(ctx, {
      connectionId: 'conn-1',
      to: 'a@b.com',
      subject: 'Hi',
      body: 'Hello there',
      outputKey: 'sent',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('sent')).toEqual({ id: 'm1', threadId: 't1' });

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toContain('/users/me/messages/send');
    expect(init.headers.Authorization).toBe('Bearer ya29.token');
    const raw = JSON.parse(init.body).raw as string;
    const decoded = Buffer.from(raw, 'base64url').toString();
    expect(decoded).toContain('To: a@b.com');
    expect(decoded).toContain('Subject: Hi');
    expect(decoded).toContain('Hello there');
  });

  it('fails without calling Gmail when the connection is missing', async () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch as typeof fetch;
    const ctx = makeMockContext({}, {});
    const result = await gmailSendEmail.execute(ctx, {
      connectionId: 'nope',
      to: 'a@b.com',
      subject: 's',
      body: 'b',
      outputKey: 'out',
    });
    expect(result.status).toBe('failed');
    expect(mockFetch).not.toHaveBeenCalled();
  });
});

describe('integration:gmail:list-messages', () => {
  it('follows pageToken pagination', async () => {
    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({ messages: [{ id: 'm1', threadId: 't1' }], nextPageToken: 'p2' }),
          { status: 200 },
        ),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ messages: [{ id: 'm2', threadId: 't2' }] }), { status: 200 }),
      );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    await gmailListMessages.execute(ctx, { connectionId: 'conn-1', outputKey: 'msgs' });

    expect(ctx.get<unknown[]>('msgs')).toHaveLength(2);
    expect(mockFetch.mock.calls[1][0]).toContain('pageToken=p2');
  });
});

describe('gmailTrigger', () => {
  it('accepts a matching channel token and rejects mismatches', () => {
    expect(gmailTrigger.verifySignature('{}', { 'x-goog-channel-token': 'secret-1' }, 'secret-1')).toBe(true);
    expect(gmailTrigger.verifySignature('{}', { 'x-goog-channel-token': 'wrong' }, 'secret-1')).toBe(false);
    expect(gmailTrigger.verifySignature('{}', {}, 'secret-1')).toBe(false);
  });

  it('reads the resource state as the event type', () => {
    expect(gmailTrigger.eventType({}, { 'x-goog-resource-state': 'exists' })).toBe('exists');
  });
});

import { slackPostMessage } from '../../src/nodes/slack-post-message';
import { makeMockContext } from '../helpers/mock-context';

const CREDS = {
  'conn-1': { type: 'oauth' as const, accessToken: 'xoxb-token' },
};

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('integration:slack:post-message', () => {
  it('posts a message and writes {ts, channel} to outputKey', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true, ts: '123.456', channel: 'C0AAA' }), {
        status: 200,
      }),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await slackPostMessage.execute(ctx, {
      connectionId: 'conn-1',
      channel: 'C0AAA',
      text: 'hello world',
      outputKey: 'slackResult',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('slackResult')).toEqual({ ts: '123.456', channel: 'C0AAA' });

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe('https://slack.com/api/chat.postMessage');
    expect(init.headers.Authorization).toBe('Bearer xoxb-token');
    expect(JSON.parse(init.body)).toEqual({ channel: 'C0AAA', text: 'hello world' });
  });

  it('includes thread_ts when configured', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true, ts: '2.0', channel: 'C0AAA' }), { status: 200 }),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    await slackPostMessage.execute(ctx, {
      connectionId: 'conn-1',
      channel: 'C0AAA',
      text: 'reply',
      threadTs: '1.0',
      outputKey: 'out',
    });

    expect(JSON.parse(mockFetch.mock.calls[0][1].body).thread_ts).toBe('1.0');
  });

  it('fails with the Slack error code on ok:false responses', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: false, error: 'channel_not_found' }), { status: 200 }),
    ) as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await slackPostMessage.execute(ctx, {
      connectionId: 'conn-1',
      channel: 'C0BAD',
      text: 'x',
      outputKey: 'out',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('channel_not_found');
    expect(result.error?.retryable).toBe(false);
  });

  it('fails without calling Slack when the connection is missing', async () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, {});
    const result = await slackPostMessage.execute(ctx, {
      connectionId: 'missing',
      channel: 'C0AAA',
      text: 'x',
      outputKey: 'out',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('CONNECTION_NOT_RESOLVED');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('resolves JSONata expressions in channel and text', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true, ts: '1.0', channel: 'C0EXPR' }), { status: 200 }),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    (ctx.evaluate as jest.Mock).mockImplementation(async (expr: string) => {
      if (expr === '$.targetChannel') return 'C0EXPR';
      if (expr === '$.summary') return 'computed text';
      return undefined;
    });

    await slackPostMessage.execute(ctx, {
      connectionId: 'conn-1',
      channel: '$.targetChannel',
      text: '$.summary',
      outputKey: 'out',
    });

    expect(JSON.parse(mockFetch.mock.calls[0][1].body)).toEqual({
      channel: 'C0EXPR',
      text: 'computed text',
    });
  });
});

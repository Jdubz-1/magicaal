import { slackListChannels } from '../../src/nodes/slack-list-channels';
import { makeMockContext } from '../helpers/mock-context';

const CREDS = {
  'conn-1': { type: 'oauth' as const, accessToken: 'xoxb-token' },
};

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

function channelPage(ids: string[], nextCursor: string): Response {
  return new Response(
    JSON.stringify({
      ok: true,
      channels: ids.map((id) => ({
        id,
        name: `chan-${id}`,
        is_private: false,
        is_archived: false,
        num_members: 3,
      })),
      response_metadata: { next_cursor: nextCursor },
    }),
    { status: 200 },
  );
}

describe('integration:slack:list-channels', () => {
  it('follows cursor pagination across pages', async () => {
    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce(channelPage(['C1', 'C2'], 'cursor-2'))
      .mockResolvedValueOnce(channelPage(['C3'], ''));
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await slackListChannels.execute(ctx, {
      connectionId: 'conn-1',
      outputKey: 'channels',
    });

    expect(result.status).toBe('complete');
    const channels = ctx.get<Array<{ id: string }>>('channels')!;
    expect(channels.map((c) => c.id)).toEqual(['C1', 'C2', 'C3']);

    expect(mockFetch).toHaveBeenCalledTimes(2);
    const secondBody = JSON.parse(mockFetch.mock.calls[1][1].body);
    expect(secondBody.cursor).toBe('cursor-2');
  });

  it('respects maxChannels', async () => {
    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce(channelPage(['C1', 'C2', 'C3'], 'more'));
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    await slackListChannels.execute(ctx, {
      connectionId: 'conn-1',
      maxChannels: 2,
      outputKey: 'channels',
    });

    expect(ctx.get<unknown[]>('channels')).toHaveLength(2);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('fails with the Slack error code on ok:false', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: false, error: 'invalid_auth' }), { status: 200 }),
    ) as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await slackListChannels.execute(ctx, {
      connectionId: 'conn-1',
      outputKey: 'channels',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('invalid_auth');
  });
});

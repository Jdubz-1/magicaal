import { coreWebSearch } from '../../../src/nodes/core-web-search';
import { makeMockContext } from '../../helpers/mock-context';

const mockFetch = jest.fn();
global.fetch = mockFetch;

function makeBraveResponse(results: { title: string; url: string; description: string }[]) {
  return {
    ok: true,
    status: 200,
    json: jest.fn().mockResolvedValue({ web: { results } }),
  } as unknown as Response;
}

beforeEach(() => jest.clearAllMocks());

describe('core:web-search', () => {
  it('calls Brave Search API and returns normalised results', async () => {
    const ctx = makeMockContext({ q: 'TypeScript tips' });
    ctx.credentials['conn-search'] = { type: 'apikey', apiKey: 'brave-key' };
    mockFetch.mockResolvedValue(
      makeBraveResponse([{ title: 'TS Guide', url: 'https://ts.dev', description: 'A guide' }]),
    );

    const result = await coreWebSearch.execute(ctx, {
      queryKey: 'q',
      connectionId: 'conn-search',
      maxResults: 5,
      outputKey: 'results',
    });

    expect(result.status).toBe('complete');
    const results = ctx.get<{ title: string; url: string }[]>('results');
    expect(results).toHaveLength(1);
    expect(results?.[0].title).toBe('TS Guide');
    expect(ctx.get('_search_result_count')).toBe(1);
  });

  it('calls Tavily when provider is tavily', async () => {
    const ctx = makeMockContext({ q: 'AI news' });
    ctx.credentials['conn-tavily'] = {
      type: 'apikey',
      apiKey: 'tav-key',
      extra: { provider: 'tavily' },
    };
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({
        results: [{ title: 'AI Article', url: 'https://ai.com', content: 'Summary here' }],
      }),
    } as unknown as Response);

    const result = await coreWebSearch.execute(ctx, {
      queryKey: 'q',
      connectionId: 'conn-tavily',
      outputKey: 'results',
    });

    expect(result.status).toBe('complete');
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.tavily.com/search',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('returns failed when queryKey is missing', async () => {
    const ctx = makeMockContext({});
    ctx.credentials['conn'] = { type: 'apikey', apiKey: 'key' };

    const result = await coreWebSearch.execute(ctx, {
      queryKey: 'missing',
      connectionId: 'conn',
      outputKey: 'results',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('SEARCH_INVALID_QUERY');
  });

  it('returns failed when connection is not found', async () => {
    const ctx = makeMockContext({ q: 'hello' });

    const result = await coreWebSearch.execute(ctx, {
      queryKey: 'q',
      connectionId: 'nonexistent',
      outputKey: 'results',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('SEARCH_NO_CONNECTION');
  });

  it('returns SEARCH_API_ERROR on fetch failure', async () => {
    const ctx = makeMockContext({ q: 'test' });
    ctx.credentials['conn'] = { type: 'apikey', apiKey: 'key' };
    mockFetch.mockRejectedValue(new Error('Network error'));

    const result = await coreWebSearch.execute(ctx, {
      queryKey: 'q',
      connectionId: 'conn',
      outputKey: 'results',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('SEARCH_API_ERROR');
  });
});

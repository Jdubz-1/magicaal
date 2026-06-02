import { coreWebScrape } from '../../../src/nodes/core-web-scrape';
import { makeMockContext } from '../../helpers/mock-context';

const mockFetch = jest.fn();
global.fetch = mockFetch;

function makeHtmlResponse(html: string, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: jest.fn().mockResolvedValue(html),
    headers: { get: () => 'text/html' },
  } as unknown as Response;
}

beforeEach(() => jest.clearAllMocks());

describe('core:web-scrape', () => {
  it('fetches a page and extracts text', async () => {
    const ctx = makeMockContext({ pageUrl: 'https://example.com' });
    mockFetch.mockResolvedValue(
      makeHtmlResponse('<html><head><title>Example</title></head><body><p>Hello world</p></body></html>'),
    );

    const result = await coreWebScrape.execute(ctx, {
      urlKey: 'pageUrl',
      outputKey: 'page',
    });

    expect(result.status).toBe('complete');
    const page = ctx.get<{ title: string; text: string }>('page');
    expect(page?.title).toBe('Example');
    expect(page?.text).toContain('Hello world');
  });

  it('scopes extraction to a CSS selector', async () => {
    const ctx = makeMockContext({ pageUrl: 'https://example.com' });
    mockFetch.mockResolvedValue(
      makeHtmlResponse('<html><body><nav>nav text</nav><article>article content</article></body></html>'),
    );

    const result = await coreWebScrape.execute(ctx, {
      urlKey: 'pageUrl',
      selector: 'article',
      outputKey: 'page',
    });

    expect(result.status).toBe('complete');
    const page = ctx.get<{ text: string }>('page');
    expect(page?.text).toBe('article content');
  });

  it('extracts links when extractLinks is true', async () => {
    const ctx = makeMockContext({ url: 'https://example.com' });
    mockFetch.mockResolvedValue(
      makeHtmlResponse('<html><body><a href="/about">About</a><a href="/contact">Contact</a></body></html>'),
    );

    const result = await coreWebScrape.execute(ctx, {
      urlKey: 'url',
      extractLinks: true,
      outputKey: 'page',
    });

    expect(result.status).toBe('complete');
    const page = ctx.get<{ links: { href: string; text: string }[] }>('page');
    expect(page?.links).toHaveLength(2);
    expect(page?.links?.[0].text).toBe('About');
  });

  it('returns SCRAPE_INVALID_URL when context key is not a URL', async () => {
    const ctx = makeMockContext({ url: 'not-a-url' });

    const result = await coreWebScrape.execute(ctx, {
      urlKey: 'url',
      outputKey: 'page',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('SCRAPE_INVALID_URL');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('returns SCRAPE_FETCH_FAILED on non-2xx response', async () => {
    const ctx = makeMockContext({ url: 'https://example.com/404' });
    mockFetch.mockResolvedValue(makeHtmlResponse('Not Found', 404));

    const result = await coreWebScrape.execute(ctx, {
      urlKey: 'url',
      outputKey: 'page',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('SCRAPE_FETCH_FAILED');
  });

  it('returns SCRAPE_TIMEOUT on AbortError', async () => {
    const ctx = makeMockContext({ url: 'https://slow.example.com' });
    const abortErr = Object.assign(new Error('aborted'), { name: 'AbortError' });
    mockFetch.mockRejectedValue(abortErr);

    const result = await coreWebScrape.execute(ctx, {
      urlKey: 'url',
      outputKey: 'page',
      timeoutMs: 100,
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('SCRAPE_TIMEOUT');
  });
});

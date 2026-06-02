import { coreHttpRequest } from '../../../src/nodes/core-http-request';
import { makeMockContext } from '../../helpers/mock-context';

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

function makeResponse(
  status: number,
  body: unknown,
  contentType = 'application/json',
): Response {
  return {
    status,
    ok: status >= 200 && status < 300,
    headers: {
      get: (key: string) => (key === 'content-type' ? contentType : null),
      forEach: (cb: (v: string, k: string) => void) => cb(contentType, 'content-type'),
    },
    json: jest.fn().mockResolvedValue(body),
    text: jest.fn().mockResolvedValue(String(body)),
  } as unknown as Response;
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('core:http-request', () => {
  it('makes a GET request and writes response to outputKey', async () => {
    const ctx = makeMockContext({});
    mockFetch.mockResolvedValue(makeResponse(200, { hello: 'world' }));

    const result = await coreHttpRequest.execute(ctx, {
      url: 'https://api.example.com/data',
      outputKey: 'response',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('_http_status')).toBe(200);
    expect(ctx.get('_http_ok')).toBe(true);
    const resp = ctx.get<{ body: { hello: string } }>('response');
    expect(resp?.body).toEqual({ hello: 'world' });
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.example.com/data',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('makes a POST request with JSON body', async () => {
    const ctx = makeMockContext({});
    mockFetch.mockResolvedValue(makeResponse(201, { id: 1 }));

    await coreHttpRequest.execute(ctx, {
      method: 'POST',
      url: 'https://api.example.com/items',
      body: { name: 'test' },
      outputKey: 'created',
    });

    const [, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe('POST');
    expect(init.body).toBe('{"name":"test"}');
    expect((init.headers as Record<string, string>)['Content-Type']).toBe('application/json');
  });

  it('injects Bearer token from apikey connection', async () => {
    const ctx = makeMockContext({});
    ctx.credentials['conn-1'] = { type: 'apikey', apiKey: 'secret123' };
    mockFetch.mockResolvedValue(makeResponse(200, {}));

    await coreHttpRequest.execute(ctx, {
      url: 'https://api.example.com/secure',
      connectionId: 'conn-1',
      outputKey: 'result',
    });

    const [, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect((init.headers as Record<string, string>)['Authorization']).toBe('Bearer secret123');
  });

  it('returns failed with HTTP_TIMEOUT on AbortError', async () => {
    const ctx = makeMockContext({});
    const abortError = new Error('The operation was aborted');
    abortError.name = 'AbortError';
    mockFetch.mockRejectedValue(abortError);

    const result = await coreHttpRequest.execute(ctx, {
      url: 'https://api.example.com/slow',
      outputKey: 'result',
      timeoutMs: 100,
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('HTTP_TIMEOUT');
  });

  it('returns failed on network error', async () => {
    const ctx = makeMockContext({});
    mockFetch.mockRejectedValue(new Error('Network error'));

    const result = await coreHttpRequest.execute(ctx, {
      url: 'https://api.example.com/fail',
      outputKey: 'result',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('HTTP_REQUEST_FAILED');
  });

  it('returns failed on invalid URL', async () => {
    const ctx = makeMockContext({});

    const result = await coreHttpRequest.execute(ctx, {
      url: 'not-a-url',
      outputKey: 'result',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('HTTP_INVALID_URL');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('handles text/plain response body', async () => {
    const ctx = makeMockContext({});
    mockFetch.mockResolvedValue(makeResponse(200, 'plain text', 'text/plain'));

    const result = await coreHttpRequest.execute(ctx, {
      url: 'https://api.example.com/text',
      outputKey: 'result',
    });

    expect(result.status).toBe('complete');
    const resp = ctx.get<{ body: string }>('result');
    expect(resp?.body).toBe('plain text');
  });
});

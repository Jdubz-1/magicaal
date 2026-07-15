import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { AxiosError } from 'axios';
import { createHttpClient } from '../../src/http';
import { NetworkError } from '../../src/errors';

/**
 * Scripted transport: each entry is either a status (+ optional headers/data)
 * or 'network' for a connection failure. Rejects non-2xx the way axios's
 * settle() does, so the interceptor sees real AxiosErrors.
 */
function scriptedAdapter(
  script: Array<{ status: number; headers?: Record<string, string>; data?: unknown } | 'network'>,
): { adapter: AxiosAdapter; calls: () => number } {
  let call = 0;
  const adapter: AxiosAdapter = async (config: InternalAxiosRequestConfig) => {
    const step = script[Math.min(call, script.length - 1)];
    call += 1;
    if (step === 'network') {
      throw new AxiosError('socket hang up', 'ECONNRESET', config);
    }
    const response: AxiosResponse = {
      status: step.status,
      statusText: '',
      data: step.data ?? {},
      headers: step.headers ?? {},
      config,
    };
    if (step.status >= 400) {
      throw new AxiosError(`Request failed with status code ${step.status}`, 'ERR_BAD_REQUEST', config, {}, response);
    }
    return response;
  };
  return { adapter, calls: () => call };
}

const BASE = { baseUrl: 'http://api.test' };

describe('http client retry integration (ALIGN-023)', () => {
  it('retries 503s and succeeds within maxAttempts', async () => {
    const { adapter, calls } = scriptedAdapter([
      { status: 503 },
      { status: 503 },
      { status: 200, data: { ok: true } },
    ]);
    const client = createHttpClient(
      { ...BASE, retry: { maxAttempts: 3, backoff: 'fixed', delayMs: 1 } },
      { adapter },
    );

    const res = await client.get('/v1/runs/r1');
    expect(res.data).toEqual({ ok: true });
    expect(calls()).toBe(3);
  });

  it('recovers from a network error', async () => {
    const { adapter, calls } = scriptedAdapter(['network', { status: 200, data: { ok: 1 } }]);
    const client = createHttpClient(
      { ...BASE, retry: { maxAttempts: 2, backoff: 'fixed', delayMs: 1 } },
      { adapter },
    );

    const res = await client.get('/x');
    expect(res.data).toEqual({ ok: 1 });
    expect(calls()).toBe(2);
  });

  it('surfaces the typed error once attempts are exhausted', async () => {
    const { adapter, calls } = scriptedAdapter([{ status: 503 }]);
    const client = createHttpClient(
      { ...BASE, retry: { maxAttempts: 2, backoff: 'fixed', delayMs: 1 } },
      { adapter },
    );

    await expect(client.get('/x')).rejects.toBeInstanceOf(NetworkError);
    expect(calls()).toBe(2);
  });

  it('never retries a 400', async () => {
    const { adapter, calls } = scriptedAdapter([{ status: 400 }]);
    const client = createHttpClient(
      { ...BASE, retry: { maxAttempts: 3, backoff: 'fixed', delayMs: 1 } },
      { adapter },
    );

    await expect(client.get('/x')).rejects.toBeInstanceOf(NetworkError);
    expect(calls()).toBe(1);
  });

  it('makes exactly one attempt when retry is not configured', async () => {
    const { adapter, calls } = scriptedAdapter([{ status: 503 }]);
    const client = createHttpClient(BASE, { adapter });

    await expect(client.get('/x')).rejects.toBeInstanceOf(NetworkError);
    expect(calls()).toBe(1);
  });

  it('honours Retry-After on 429 instead of the configured backoff', async () => {
    const { adapter, calls } = scriptedAdapter([
      { status: 429, headers: { 'retry-after': '0' } },
      { status: 200, data: { ok: true } },
    ]);
    const client = createHttpClient(
      // A huge configured delay: if Retry-After (0s) were ignored, this test would time out
      { ...BASE, retry: { maxAttempts: 2, backoff: 'fixed', delayMs: 60_000 } },
      { adapter },
    );

    const res = await client.get('/x');
    expect(res.data).toEqual({ ok: true });
    expect(calls()).toBe(2);
  }, 5000);
});

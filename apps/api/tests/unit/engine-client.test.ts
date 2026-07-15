import { AxiosError } from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { engineClient } from '@/lib/engine-client';

/**
 * ALIGN-010: proxied engine errors must surface the engine's message and
 * machine-readable code (e.g. SESSION_CONFLICT), not axios's generic
 * "Request failed with status code NNN" / ERR_BAD_REQUEST.
 *
 * The stub adapter rejects non-2xx the way axios's settle() does — a custom
 * adapter that merely resolves with a 4xx response would bypass the error
 * interceptor entirely.
 */
function stubEngineResponse(status: number, data: unknown): void {
  engineClient.defaults.adapter = async (
    config: InternalAxiosRequestConfig,
  ): Promise<AxiosResponse> => {
    const response: AxiosResponse = { status, statusText: '', data, headers: {}, config };
    if (status >= 400) {
      throw new AxiosError(
        `Request failed with status code ${status}`,
        'ERR_BAD_REQUEST',
        config,
        {},
        response,
      );
    }
    return response;
  };
}

describe('engineClient error normalization', () => {
  it('rethrows engine error bodies with their status, message, and code', async () => {
    stubEngineResponse(409, { error: 'Session is in use by an active run', code: 'SESSION_CONFLICT' });

    await expect(engineClient.get('/internal/runs')).rejects.toMatchObject({
      message: 'Session is in use by an active run',
      status: 409,
      code: 'SESSION_CONFLICT',
    });
  });

  it('keeps working for engine errors without a code', async () => {
    stubEngineResponse(404, { error: 'Run nope not found' });

    await expect(engineClient.get('/internal/runs/nope')).rejects.toMatchObject({
      message: 'Run nope not found',
      status: 404,
    });
  });

  it('passes successful responses through untouched', async () => {
    stubEngineResponse(200, { ok: true });

    const res = await engineClient.get('/internal/health');
    expect(res.data).toEqual({ ok: true });
  });

  it('leaves non-engine-shaped errors (no body) as axios errors', async () => {
    stubEngineResponse(500, 'plain text');

    await expect(engineClient.get('/internal/x')).rejects.toMatchObject({
      isAxiosError: true,
    });
  });
});

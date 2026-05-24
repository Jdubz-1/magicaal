import axios, { type AxiosInstance, type AxiosError } from 'axios';
import type { MagiCaalClientConfig } from './types';
import { AuthError, RateLimitError, AgentNotFoundError, NetworkError } from './errors';

export function createHttpClient(config: MagiCaalClientConfig): AxiosInstance {
  const headers: Record<string, string> = {};
  if (config.apiKey) {
    headers['Authorization'] = `Bearer ${config.apiKey}`;
  } else if (config.bearer) {
    headers['Authorization'] = `Bearer ${config.bearer}`;
  }

  const instance = axios.create({
    baseURL: config.baseUrl,
    timeout: config.timeout ?? 30000,
    headers,
  });

  instance.interceptors.response.use(
    (res) => res,
    (err: AxiosError) => {
      if (!err.response) {
        throw new NetworkError(err.message, err);
      }

      const { status, headers: resHeaders } = err.response;

      if (status === 401) {
        throw new AuthError();
      }

      if (status === 404) {
        const data = err.response.data as { error?: { code?: string } } | undefined;
        if (data?.error?.code === 'AGENT_NOT_FOUND') {
          throw new AgentNotFoundError('unknown');
        }
        throw new NetworkError('Not found');
      }

      if (status === 429) {
        const resetHeader = resHeaders['x-ratelimit-reset'];
        const retryAfterMs = resetHeader
          ? Math.max(0, Number(resetHeader) * 1000 - Date.now())
          : undefined;
        throw new RateLimitError('Rate limit exceeded', retryAfterMs);
      }

      throw new NetworkError(
        `HTTP ${status}: ${(err.response.data as { error?: { message?: string } })?.error?.message ?? err.message}`,
        err,
      );
    },
  );

  return instance;
}

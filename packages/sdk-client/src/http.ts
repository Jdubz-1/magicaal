import axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosAdapter,
  type InternalAxiosRequestConfig,
} from 'axios';
import type { MagiCaalClientConfig } from './types.js';
import { AuthError, RateLimitError, AgentNotFoundError, NetworkError } from './errors.js';
import { computeRetryPlan, parseRetryAfterMs } from './retry.js';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Build the shared axios client.
 *
 * Retry (ALIGN-023): when `config.retry` is set, failed requests are retried
 * per RetryConfig — network errors, 429, and 5xx by default (override with
 * `retryOn`), honouring Retry-After / x-ratelimit-reset on 429s. Without
 * `retry`, behaviour is exactly one attempt per request.
 *
 * Caveats: `POST /v1/agents/:id/runs` is not idempotent — retrying after an
 * ambiguous network failure may double-dispatch a run. Streaming
 * (`stream-client.ts`, native fetch) is never retried here.
 *
 * `overrides.adapter` exists for tests: inject a scripted transport instead
 * of mocking HTTP.
 */
export function createHttpClient(
  config: MagiCaalClientConfig,
  overrides?: { adapter?: AxiosAdapter },
): AxiosInstance {
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
    ...(overrides?.adapter && { adapter: overrides.adapter }),
  });

  instance.interceptors.response.use(
    (res) => res,
    async (err: AxiosError) => {
      const status = err.response?.status;

      // Retry before the typed-error mapping so a recovered request never
      // surfaces an error at all.
      if (config.retry) {
        const reqConfig = err.config as
          | (InternalAxiosRequestConfig & { __retryCount?: number })
          | undefined;
        const attempt = (reqConfig?.__retryCount ?? 0) + 1;
        const resHeaders = err.response?.headers as Record<string, string> | undefined;
        const resetHeader = resHeaders?.['x-ratelimit-reset'];
        const retryAfterMs =
          parseRetryAfterMs(resHeaders?.['retry-after']) ??
          (resetHeader ? Math.max(0, Number(resetHeader) * 1000 - Date.now()) : undefined);

        const plan = computeRetryPlan({ status, attempt, config: config.retry, retryAfterMs });
        if (plan.retry && reqConfig) {
          reqConfig.__retryCount = attempt;
          await sleep(plan.delayMs);
          return instance.request(reqConfig);
        }
      }

      if (!err.response) {
        throw new NetworkError(err.message, err);
      }

      const { headers: resHeaders } = err.response;

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

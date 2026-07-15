import axios, { AxiosError } from 'axios';
import { config } from '../config';

export const engineClient = axios.create({
  baseURL: config.engineBaseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    // The engine's /internal API requires the shared master key on every call
    'X-Internal-Auth': config.masterKey,
  },
});

/**
 * Normalize engine error responses so callers (and errorHandler) see the
 * engine's real message and code — without this, a proxied engine 409 like
 * SESSION_CONFLICT surfaces as axios's "Request failed with status code 409"
 * with code ERR_BAD_REQUEST.
 */
engineClient.interceptors.response.use(undefined, (err: AxiosError) => {
  const data = err.response?.data as { error?: string; code?: string } | undefined;
  if (err.response && data?.error) {
    throw Object.assign(new Error(data.error), {
      status: err.response.status,
      code: data.code,
    });
  }
  throw err;
});

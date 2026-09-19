import axios from 'axios';
import { config } from '../config';

export function createApiClient(accessToken?: string, timeoutMs?: number) {
  return axios.create({
    baseURL: config.apiBaseUrl,
    timeout: timeoutMs ?? config.apiTimeoutMs,
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
}

/**
 * How long the proxy waits for a given API path.
 *
 * Everything is a quick read or write except a Caal invoke, which holds the
 * request open for the whole agent run — commonly 10-25s, and longer once the
 * model reaches for tools. The flat 15s budget aborted those mid-run and the
 * proxy reported 502 "API unreachable" for work that then completed
 * server-side, losing the answer.
 */
export function proxyTimeoutFor(path: string): number {
  return path === '/caal' || path.startsWith('/caal/')
    ? config.caalTimeoutMs
    : config.apiTimeoutMs;
}

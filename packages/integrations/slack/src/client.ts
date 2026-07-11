import type { ExecutionContext, ResolvedCredentials } from '@magicaal/sdk-node';
import {
  IntegrationError,
  errorFromResponse,
  parseRateLimitHeaders,
  resolveField,
} from '@magicaal/integration-core';

export { resolveField };

export const SLACK_API_BASE = 'https://slack.com/api';

/** Resolve the bot token from an integration connection's credentials. */
export function resolveToken(ctx: ExecutionContext, connectionId: string): string {
  const creds: ResolvedCredentials | undefined = ctx.credentials[connectionId];
  if (!creds) {
    throw new IntegrationError({
      service: 'slack',
      message: `slack: no credentials resolved for connection "${connectionId}"`,
      code: 'CONNECTION_NOT_RESOLVED',
      retryable: false,
    });
  }
  const token =
    creds.accessToken ??
    creds.apiKey ??
    (typeof creds.extra?.bot_token === 'string' ? creds.extra.bot_token : undefined);
  if (!token) {
    throw new IntegrationError({
      service: 'slack',
      message: `slack: connection "${connectionId}" has no usable token`,
      code: 'CONNECTION_MISSING_TOKEN',
      retryable: false,
    });
  }
  return token;
}

/**
 * Call a Slack Web API method. Slack returns HTTP 200 with `ok: false` on
 * most errors, so both the transport status and the body flag are checked.
 */
export async function slackCall(
  token: string,
  method: string,
  args: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const response = await fetch(`${SLACK_API_BASE}/${method}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(args),
  });

  if (!response.ok) {
    const info = parseRateLimitHeaders(response.headers);
    const err = await errorFromResponse('slack', response);
    if (response.status === 429 && info.retryAfterMs !== undefined) {
      throw new IntegrationError({
        service: 'slack',
        message: `slack: rate limited on ${method}; retry after ${info.retryAfterMs}ms`,
        status: 429,
        code: 'rate_limited',
        retryable: true,
      });
    }
    throw err;
  }

  const body = (await response.json()) as Record<string, unknown>;
  if (body.ok !== true) {
    const code = typeof body.error === 'string' ? body.error : 'unknown_error';
    throw new IntegrationError({
      service: 'slack',
      message: `slack: ${method} failed: ${code}`,
      status: response.status,
      code,
      retryable: code === 'ratelimited' || code === 'service_unavailable',
      raw: body,
    });
  }
  return body;
}

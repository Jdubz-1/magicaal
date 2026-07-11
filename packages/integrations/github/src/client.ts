import type { ExecutionContext, ResolvedCredentials } from '@magicaal/sdk-node';
import { IntegrationError, errorFromResponse } from '@magicaal/integration-core';

export const GITHUB_API_BASE = 'https://api.github.com';

/** Resolve the token (PAT or OAuth access token) from an integration connection. */
export function resolveToken(ctx: ExecutionContext, connectionId: string): string {
  const creds: ResolvedCredentials | undefined = ctx.credentials[connectionId];
  if (!creds) {
    throw new IntegrationError({
      service: 'github',
      message: `github: no credentials resolved for connection "${connectionId}"`,
      code: 'CONNECTION_NOT_RESOLVED',
      retryable: false,
    });
  }
  const token =
    creds.accessToken ??
    creds.apiKey ??
    (typeof creds.extra?.token === 'string' ? creds.extra.token : undefined);
  if (!token) {
    throw new IntegrationError({
      service: 'github',
      message: `github: connection "${connectionId}" has no usable token`,
      code: 'CONNECTION_MISSING_TOKEN',
      retryable: false,
    });
  }
  return token;
}

/** Call the GitHub REST API; returns the parsed JSON body and the response for header access. */
export async function githubCall(
  token: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  path: string,
  body?: Record<string, unknown>,
): Promise<{ data: unknown; response: Response }> {
  const response = await fetch(`${GITHUB_API_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw await errorFromResponse('github', response);
  }

  const data = response.status === 204 ? null : await response.json();
  return { data, response };
}

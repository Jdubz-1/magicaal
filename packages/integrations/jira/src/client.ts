import type { ExecutionContext, ResolvedCredentials } from '@magicaal/sdk-node';
import { IntegrationError, errorFromResponse } from '@magicaal/integration-core';

export interface JiraAuth {
  baseUrl: string;
  authHeader: string;
}

/**
 * Resolve Jira auth from an integration connection. Jira Cloud uses Basic
 * auth with email + API token; the connection's credentials must carry
 * base_url, email, and api_token.
 */
export function resolveAuth(ctx: ExecutionContext, connectionId: string): JiraAuth {
  const creds: ResolvedCredentials | undefined = ctx.credentials[connectionId];
  if (!creds) {
    throw new IntegrationError({
      service: 'jira',
      message: `jira: no credentials resolved for connection "${connectionId}"`,
      code: 'CONNECTION_NOT_RESOLVED',
      retryable: false,
    });
  }

  const extra = creds.extra ?? {};
  const baseUrl = typeof extra.base_url === 'string' ? extra.base_url.replace(/\/$/, '') : undefined;
  const email = typeof extra.email === 'string' ? extra.email : undefined;
  const apiToken =
    creds.apiKey ?? (typeof extra.api_token === 'string' ? extra.api_token : undefined);

  if (creds.accessToken && baseUrl) {
    return { baseUrl, authHeader: `Bearer ${creds.accessToken}` };
  }

  if (!baseUrl || !email || !apiToken) {
    throw new IntegrationError({
      service: 'jira',
      message: `jira: connection "${connectionId}" is missing base_url, email, or api_token`,
      code: 'CONNECTION_MISSING_FIELDS',
      retryable: false,
    });
  }

  const basic = Buffer.from(`${email}:${apiToken}`).toString('base64');
  return { baseUrl, authHeader: `Basic ${basic}` };
}

/** Call the Jira Cloud REST API (v3). */
export async function jiraCall(
  auth: JiraAuth,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  body?: Record<string, unknown>,
): Promise<unknown> {
  const response = await fetch(`${auth.baseUrl}${path}`, {
    method,
    headers: {
      Authorization: auth.authHeader,
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw await errorFromResponse('jira', response);
  }

  if (response.status === 204) return null;
  return response.json();
}

/** Wrap plain text in the minimal Atlassian Document Format Jira v3 requires. */
export function textToAdf(text: string): Record<string, unknown> {
  return {
    type: 'doc',
    version: 1,
    content: [
      {
        type: 'paragraph',
        content: [{ type: 'text', text }],
      },
    ],
  };
}

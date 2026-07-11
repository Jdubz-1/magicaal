import type { ResolvedCredentials } from '@magicaal/sdk-node';
import { errorFromResponse, IntegrationError } from './errors';

export interface OAuthRefreshConfig {
  service: string;
  tokenUrl: string;
  clientId: string;
  clientSecret?: string;
  /** Extra body parameters some providers require (e.g. Salesforce format). */
  extraParams?: Record<string, string>;
  /**
   * How to send client credentials: 'body' (default, most providers) or
   * 'basic' (HTTP Basic auth header — required by e.g. Zendesk, some Atlassian flows).
   */
  clientAuth?: 'body' | 'basic';
}

export interface RefreshedToken {
  accessToken: string;
  /** Some providers rotate the refresh token — persist this when present. */
  refreshToken?: string;
  /** Epoch milliseconds when the new access token expires, if reported. */
  expiresAt?: number;
  /** Full token endpoint response for provider-specific fields. */
  raw: Record<string, unknown>;
}

/**
 * True when the credential is expired or expires within `skewMs`
 * (default 60s — refresh before expiry, not at it).
 */
export function isExpired(
  creds: Pick<ResolvedCredentials, 'expiresAt'>,
  skewMs = 60_000,
  nowMs: number = Date.now(),
): boolean {
  if (creds.expiresAt === undefined) return false;
  return creds.expiresAt - skewMs <= nowMs;
}

/**
 * Standard OAuth2 refresh_token grant. Returns the new token material for
 * the caller to persist back via the API's connection update path — this
 * function does not write anything itself.
 */
export async function refreshOAuthToken(
  config: OAuthRefreshConfig,
  refreshToken: string,
): Promise<RefreshedToken> {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    ...config.extraParams,
  });

  const headers: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  if (config.clientAuth === 'basic') {
    const basic = Buffer.from(`${config.clientId}:${config.clientSecret ?? ''}`).toString('base64');
    headers.Authorization = `Basic ${basic}`;
  } else {
    body.set('client_id', config.clientId);
    if (config.clientSecret) body.set('client_secret', config.clientSecret);
  }

  const response = await fetch(config.tokenUrl, { method: 'POST', headers, body });

  if (!response.ok) {
    throw await errorFromResponse(config.service, response);
  }

  const raw = (await response.json()) as Record<string, unknown>;

  if (typeof raw.access_token !== 'string') {
    throw new IntegrationError({
      service: config.service,
      message: `${config.service}: token endpoint response missing access_token`,
      raw,
    });
  }

  return {
    accessToken: raw.access_token,
    refreshToken: typeof raw.refresh_token === 'string' ? raw.refresh_token : undefined,
    expiresAt:
      typeof raw.expires_in === 'number' ? Date.now() + raw.expires_in * 1000 : undefined,
    raw,
  };
}

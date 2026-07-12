import type { ResolvedCredentials } from '@magicaal/sdk-node';

jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

import { maybeRefreshOAuth } from '@/resolver/credential-resolver';
import { registerIntegrations } from '@/registry/startup';

const NOW = Date.now();
const originalFetch = global.fetch;

beforeAll(() => {
  registerIntegrations(); // slack's oauth token endpoint backs the refresh
});

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

function expiredCreds(): { raw: Record<string, unknown>; resolved: ResolvedCredentials } {
  const raw = {
    access_token: 'stale-token',
    refresh_token: 'refresh-1',
    client_id: 'client-1',
    client_secret: 'secret-1',
  };
  return {
    raw,
    resolved: {
      type: 'oauth',
      accessToken: 'stale-token',
      expiresAt: NOW - 60_000, // expired a minute ago — synthetic expiry
      extra: raw,
    },
  };
}

describe('maybeRefreshOAuth (synthetic token expiry)', () => {
  it('refreshes an expired token via the service token endpoint and persists via the API', async () => {
    const mockFetch = jest.fn().mockImplementation(async (url: string) => {
      if (String(url).includes('/internal/integrations/connections/')) {
        return new Response(JSON.stringify({ updated: true }), { status: 200 });
      }
      return new Response(
        JSON.stringify({ access_token: 'fresh-token', refresh_token: 'refresh-2', expires_in: 3600 }),
        { status: 200 },
      );
    });
    global.fetch = mockFetch as typeof fetch;

    const { raw, resolved } = expiredCreds();
    const result = await maybeRefreshOAuth('conn-1', 'slack', 'tenant-1', raw, resolved);

    expect(result.accessToken).toBe('fresh-token');
    expect(result.expiresAt).toBeGreaterThan(NOW);
    expect(result.extra?.refresh_token).toBe('refresh-2'); // rotated token captured

    // Token endpoint call used the slack package's declared tokenUrl
    const tokenCall = mockFetch.mock.calls.find(([u]) => String(u).includes('slack.com'));
    expect(tokenCall).toBeDefined();
    const body = tokenCall![1].body as URLSearchParams;
    expect(body.get('grant_type')).toBe('refresh_token');
    expect(body.get('refresh_token')).toBe('refresh-1');

    // Refreshed credentials persisted through the API internal endpoint
    await new Promise((r) => setImmediate(r)); // let the fire-and-forget persist run
    const persistCall = mockFetch.mock.calls.find(([u]) =>
      String(u).includes('/internal/integrations/connections/conn-1/credentials'),
    );
    expect(persistCall).toBeDefined();
    const persisted = JSON.parse(persistCall![1].body);
    expect(persisted.credentials.access_token).toBe('fresh-token');
    expect(persisted.tenantId).toBe('tenant-1');
    // The API's /internal route is gated — the persist must authenticate
    expect(persistCall![1].headers['X-Internal-Auth']).toBeTruthy();
  });

  it('does nothing for non-expired tokens', async () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch as typeof fetch;

    const { raw, resolved } = expiredCreds();
    resolved.expiresAt = NOW + 3_600_000;

    const result = await maybeRefreshOAuth('conn-1', 'slack', 'tenant-1', raw, resolved);
    expect(result.accessToken).toBe('stale-token');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('does nothing for api-key credentials', async () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch as typeof fetch;

    const result = await maybeRefreshOAuth('conn-1', 'github', 'tenant-1', {}, { type: 'apikey', apiKey: 'k' });
    expect(result.apiKey).toBe('k');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('keeps the stale token when no refresh_token is stored', async () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch as typeof fetch;

    const { resolved } = expiredCreds();
    const result = await maybeRefreshOAuth('conn-1', 'slack', 'tenant-1', { access_token: 'stale-token' }, resolved);
    expect(result.accessToken).toBe('stale-token');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('keeps the stale token for services without an OAuth token endpoint', async () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch as typeof fetch;

    const { raw, resolved } = expiredCreds();
    // sendgrid is api_key-only — no authSchema.oauth
    const result = await maybeRefreshOAuth('conn-1', 'sendgrid', 'tenant-1', raw, resolved);
    expect(result.accessToken).toBe('stale-token');
    expect(mockFetch).not.toHaveBeenCalled();
  });
});

import { refreshOAuthToken, isExpired } from '../../src/oauth';
import { IntegrationError } from '../../src/errors';

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('isExpired', () => {
  const NOW = 1_700_000_000_000;

  it('false when no expiresAt is set', () => {
    expect(isExpired({}, 60_000, NOW)).toBe(false);
  });

  it('true when already expired', () => {
    expect(isExpired({ expiresAt: NOW - 1000 }, 60_000, NOW)).toBe(true);
  });

  it('true within the skew window before expiry', () => {
    expect(isExpired({ expiresAt: NOW + 30_000 }, 60_000, NOW)).toBe(true);
  });

  it('false when expiry is beyond the skew window', () => {
    expect(isExpired({ expiresAt: NOW + 120_000 }, 60_000, NOW)).toBe(false);
  });
});

describe('refreshOAuthToken', () => {
  const config = {
    service: 'slack',
    tokenUrl: 'https://slack.com/api/oauth.v2.access',
    clientId: 'client-1',
    clientSecret: 'secret-1',
  };

  it('POSTs a refresh_token grant with body credentials and returns token material', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          access_token: 'new-access',
          refresh_token: 'new-refresh',
          expires_in: 3600,
        }),
        { status: 200 },
      ),
    );
    global.fetch = mockFetch as typeof fetch;

    const before = Date.now();
    const result = await refreshOAuthToken(config, 'old-refresh');

    expect(result.accessToken).toBe('new-access');
    expect(result.refreshToken).toBe('new-refresh');
    expect(result.expiresAt).toBeGreaterThanOrEqual(before + 3_599_000);

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe(config.tokenUrl);
    const body = init.body as URLSearchParams;
    expect(body.get('grant_type')).toBe('refresh_token');
    expect(body.get('refresh_token')).toBe('old-refresh');
    expect(body.get('client_id')).toBe('client-1');
    expect(body.get('client_secret')).toBe('secret-1');
  });

  it('sends HTTP Basic auth when clientAuth is basic', async () => {
    const mockFetch = jest
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ access_token: 'tok' }), { status: 200 }));
    global.fetch = mockFetch as typeof fetch;

    await refreshOAuthToken({ ...config, clientAuth: 'basic' }, 'r');

    const [, init] = mockFetch.mock.calls[0];
    const expected = Buffer.from('client-1:secret-1').toString('base64');
    expect(init.headers.Authorization).toBe(`Basic ${expected}`);
    expect((init.body as URLSearchParams).get('client_id')).toBeNull();
  });

  it('throws IntegrationError on a failed refresh', async () => {
    global.fetch = jest.fn().mockImplementation(async () => {
      return new Response(JSON.stringify({ error: 'invalid_grant' }), { status: 400 });
    }) as typeof fetch;

    await expect(refreshOAuthToken(config, 'bad')).rejects.toThrow(IntegrationError);
    await expect(
      refreshOAuthToken(config, 'bad'),
    ).rejects.toMatchObject({ code: 'invalid_grant', status: 400, retryable: false });
  });

  it('throws when the response has no access_token', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 })) as typeof fetch;

    await expect(refreshOAuthToken(config, 'r')).rejects.toThrow(/missing access_token/);
  });
});

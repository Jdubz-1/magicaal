import request from 'supertest';
import { eq } from 'drizzle-orm';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { db } from '@/db/client';
import { integrationConnections, integrationOauthStates } from '@/db/schema';
import { decryptCredentials } from '@/lib/credentials';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: { post: jest.fn(), get: jest.fn() },
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { engineClient } = require('../../src/lib/engine-client') as {
  engineClient: { post: jest.Mock; get: jest.Mock };
};

const app = createApp();
const originalFetch = global.fetch;

/** The engine's integration registry, as the API sees it over /internal/integrations. */
function mockRegistry(): void {
  engineClient.get.mockResolvedValue({
    data: [
      {
        service: 'slack',
        authSchema: {
          fields: [],
          oauth: {
            authorizationUrl: 'https://slack.com/oauth/v2/authorize',
            tokenUrl: 'https://slack.com/api/oauth.v2.access',
            scopes: ['chat:write'],
          },
        },
      },
    ],
  });
}

beforeAll(async () => {
  await runMigrations();
});

beforeEach(() => {
  jest.clearAllMocks();
  mockRegistry();
});

afterEach(() => {
  global.fetch = originalFetch;
});

async function addOAuthApp(token: string): Promise<void> {
  const res = await request(app)
    .put('/v1/integrations/oauth-apps')
    .set('Authorization', `Bearer ${token}`)
    .send({ service: 'slack', clientId: 'client-123', clientSecret: 'shhh' });
  expect(res.status).toBe(201);
}

describe('OAuth apps CRUD', () => {
  it('stores the client secret encrypted and never returns it', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    await addOAuthApp(token);

    const list = await request(app)
      .get('/v1/integrations/oauth-apps')
      .set('Authorization', `Bearer ${token}`);

    expect(list.status).toBe(200);
    expect(list.body[0].clientId).toBe('client-123');
    expect(JSON.stringify(list.body)).not.toContain('shhh');
  });

  it('refuses a developer-role caller', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .put('/v1/integrations/oauth-apps')
      .set('Authorization', `Bearer ${token}`)
      .send({ service: 'slack', clientId: 'c', clientSecret: 's' });
    expect(res.status).toBe(403);
  });
});

describe('POST /v1/integrations/oauth/initiate', () => {
  it('returns a provider authorization URL and sets the nonce cookie', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    await addOAuthApp(token);

    const res = await request(app)
      .post('/v1/integrations/oauth/initiate')
      .set('Authorization', `Bearer ${token}`)
      .send({ service: 'slack', redirectUri: 'http://localhost:3000/admin/integrations' });

    expect(res.status).toBe(200);
    const url = new URL(res.body.authorizationUrl as string);
    expect(url.origin + url.pathname).toBe('https://slack.com/oauth/v2/authorize');
    expect(url.searchParams.get('client_id')).toBe('client-123');
    expect(url.searchParams.get('response_type')).toBe('code');
    expect(url.searchParams.get('scope')).toBe('chat:write');
    expect(url.searchParams.get('code_challenge_method')).toBe('S256');
    expect(url.searchParams.get('code_challenge')).toBeTruthy();

    const cookies = res.headers['set-cookie'] as unknown as string[];
    expect(cookies.some((c) => c.startsWith('magicaal_oauth_nonce='))).toBe(true);
  });

  it('rejects an off-origin redirectUri (ISS-052 open redirect)', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    await addOAuthApp(token);

    const res = await request(app)
      .post('/v1/integrations/oauth/initiate')
      .set('Authorization', `Bearer ${token}`)
      .send({ service: 'slack', redirectUri: 'https://evil.example.com/steal' });

    expect(res.status).toBe(400);
    expect(res.body.code ?? res.body.error).toBeDefined();
  });

  it('400s when no OAuth app is configured for the service', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');

    const res = await request(app)
      .post('/v1/integrations/oauth/initiate')
      .set('Authorization', `Bearer ${token}`)
      .send({ service: 'slack', redirectUri: 'http://localhost:3000/admin/integrations' });

    expect(res.status).toBe(400);
  });
});

describe('GET /v1/integrations/oauth/:service/callback', () => {
  /** Drive initiate and return the state token + the browser's nonce cookie. */
  async function startFlow(token: string): Promise<{ state: string; cookie: string }> {
    const res = await request(app)
      .post('/v1/integrations/oauth/initiate')
      .set('Authorization', `Bearer ${token}`)
      .send({ service: 'slack', redirectUri: 'http://localhost:3000/admin/integrations' });

    const cookies = res.headers['set-cookie'] as unknown as string[];
    const nonceCookie = cookies.find((c) => c.startsWith('magicaal_oauth_nonce='))!.split(';')[0];
    return { state: res.body.stateToken as string, cookie: nonceCookie };
  }

  it('exchanges the code and stores a real token (ISS-051)', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');
    await addOAuthApp(token);
    const { state, cookie } = await startFlow(token);

    global.fetch = jest.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          access_token: 'xoxb-real-token',
          refresh_token: 'refresh-1',
          expires_in: 3600,
        }),
        { status: 200 },
      ),
    ) as unknown as typeof fetch;

    const res = await request(app)
      .get('/v1/integrations/oauth/slack/callback')
      .query({ code: 'auth-code-1', state })
      .set('Cookie', cookie);

    expect(res.status).toBe(302);
    expect(res.headers.location).toContain('connected=true');

    // Token endpoint received an authorization_code grant with PKCE
    const body = (global.fetch as jest.Mock).mock.calls[0][1].body as URLSearchParams;
    expect(body.get('grant_type')).toBe('authorization_code');
    expect(body.get('code')).toBe('auth-code-1');
    expect(body.get('code_verifier')).toBeTruthy();
    expect(body.get('redirect_uri')).toContain('/v1/integrations/oauth/slack/callback');

    const rows = await db
      .select()
      .from(integrationConnections)
      .where(eq(integrationConnections.tenantId, tenantId));
    expect(rows).toHaveLength(1);
    expect(rows[0].status).toBe('active');
    expect(rows[0].expiresAt).not.toBeNull();

    const creds = JSON.parse(decryptCredentials(rows[0].credentialsEnc)) as Record<string, string>;
    expect(creds.access_token).toBe('xoxb-real-token');
    expect(creds.refresh_token).toBe('refresh-1');
    // client credentials ride along so the engine can refresh mid-run
    expect(creds.client_id).toBe('client-123');
    expect(creds.client_secret).toBe('shhh');
  });

  it('rejects a callback from a different browser (ISS-052 nonce binding)', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    await addOAuthApp(token);
    const { state } = await startFlow(token);

    global.fetch = jest.fn() as unknown as typeof fetch;

    // No nonce cookie — a victim's browser walked into the attacker's flow
    const res = await request(app)
      .get('/v1/integrations/oauth/slack/callback')
      .query({ code: 'auth-code-1', state });

    expect(res.status).toBe(400);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('does not create an active connection when the exchange fails', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');
    await addOAuthApp(token);
    const { state, cookie } = await startFlow(token);

    global.fetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ error: 'invalid_grant' }), { status: 400 }),
    ) as unknown as typeof fetch;

    const res = await request(app)
      .get('/v1/integrations/oauth/slack/callback')
      .query({ code: 'bad-code', state })
      .set('Cookie', cookie);

    expect(res.status).toBe(302);
    expect(res.headers.location).toContain('error=');

    const rows = await db
      .select()
      .from(integrationConnections)
      .where(eq(integrationConnections.tenantId, tenantId));
    expect(rows).toHaveLength(0);
  });

  it('consumes the state token — a replayed callback is rejected', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    await addOAuthApp(token);
    const { state, cookie } = await startFlow(token);

    global.fetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ access_token: 'tok' }), { status: 200 }),
    ) as unknown as typeof fetch;

    await request(app)
      .get('/v1/integrations/oauth/slack/callback')
      .query({ code: 'c1', state })
      .set('Cookie', cookie);

    const replay = await request(app)
      .get('/v1/integrations/oauth/slack/callback')
      .query({ code: 'c1', state })
      .set('Cookie', cookie);

    expect(replay.status).toBe(400);

    const remaining = await db
      .select()
      .from(integrationOauthStates)
      .where(eq(integrationOauthStates.stateToken, state));
    expect(remaining).toHaveLength(0);
  });

  it('is reachable without a bearer token', async () => {
    // The provider redirects the browser here with no Authorization header;
    // a 401 would mean the route is still behind requireAuth.
    const res = await request(app)
      .get('/v1/integrations/oauth/slack/callback')
      .query({ code: 'x', state: 'unknown-state' });

    expect(res.status).not.toBe(401);
    expect(res.status).toBe(400);
  });
});

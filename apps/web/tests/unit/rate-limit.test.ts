import { createServer, type Server } from 'node:http';

// Budgets small enough to reach in a test. Everything else runs on the real
// ones, so this is the only place the limiter's behaviour is asserted.
jest.mock('../../src/config', () => {
  const actual = jest.requireActual('../../src/config') as { config: Record<string, unknown> };
  return {
    ...actual,
    config: { ...actual.config, rateLimitWindowMs: 60_000, rateLimitLoginMax: 3, rateLimitMax: 6 },
  };
});

jest.mock('../../src/lib/api-client', () => ({
  createApiClient: () => ({
    post: async () => {
      throw Object.assign(new Error('bad creds'), { response: { data: {} } });
    },
    get: async () => ({ data: [] }),
    request: async () => ({ status: 200, data: {} }),
  }),
  proxyTimeoutFor: () => 1000,
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createApp } = require('../../src/app') as typeof import('../../src/app');

/**
 * The web app proxies to an API that is already rate-limited, which looks like
 * it makes a limiter here redundant. It does not: `createApiClient` calls the
 * API server-side with no `X-Forwarded-For`, so the API's per-IP limiter counts
 * every browser as this one container — its strict /v1/auth budget is ten
 * attempts in total, shared by everyone, not ten per attacker. This app is the
 * only layer that sees the real client address.
 */

let server: Server;
let origin: string;

beforeAll(async () => {
  server = createServer(createApp());
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const addr = server.address();
  if (typeof addr === 'string' || addr === null) throw new Error('no port');
  origin = `http://127.0.0.1:${addr.port}`;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) =>
    server.close((err) => (err ? reject(err) : resolve())),
  );
});

const login = (): Promise<Response> =>
  fetch(`${origin}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'email=nobody@example.com&password=wrong',
    redirect: 'manual',
  });

describe('rate limiting', () => {
  it('returns 429 once the sign-in budget is spent', async () => {
    // A failed attempt still costs budget — that is the entire point.
    for (let i = 0; i < 3; i++) expect((await login()).status).not.toBe(429);

    expect((await login()).status).toBe(429);
  });

  /**
   * A monitor must not be able to rate-limit itself out of observing the
   * service, so /health is registered ahead of both limiters.
   */
  it('never throttles /health', async () => {
    for (let i = 0; i < 12; i++) {
      expect((await fetch(`${origin}/health`)).status).toBe(200);
    }
  });

  it('emits the standard RateLimit headers rather than the legacy ones', async () => {
    const res = await fetch(`${origin}/health`).then(() => login());

    expect(res.headers.get('ratelimit')).toBeTruthy();
    expect(res.headers.get('x-ratelimit-limit')).toBeNull();
  });
});

import { readFileSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import { join } from 'node:path';

/**
 * `access_token` is the web app's session, and its SameSite attribute is the
 * only thing standing between an admin form and a cross-site POST. CodeQL
 * reports `js/missing-token-validation` on `cookieParser` here for that reason
 * — it cannot see a runtime cookie attribute.
 *
 * Lax, not Strict, and the difference matters: the cookie has to survive the
 * provider's top-level redirect back from an OAuth connect, which Strict would
 * suppress — the operator would land on /admin/integrations logged out. Lax
 * still refuses to travel on a cross-site form POST, which is the attack the
 * admin panel actually has.
 *
 * That reasoning only holds while no GET route changes state, so this file
 * asserts that too.
 */

jest.mock('../../src/lib/api-client', () => ({
  createApiClient: () => ({
    post: async () => ({ data: { accessToken: 'test-access-token' } }),
    get: async () => ({ data: [] }),
    request: async () => ({ status: 200, data: {} }),
  }),
  proxyTimeoutFor: () => 1000,
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createApp } = require('../../src/app') as typeof import('../../src/app');

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

async function loginCookie(): Promise<string> {
  const res = await fetch(`${origin}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'email=someone@example.com&password=whatever',
    redirect: 'manual',
  });

  const found = res.headers.getSetCookie().find((c) => c.startsWith('access_token='));
  if (!found) throw new Error(`no access_token cookie: ${JSON.stringify(res.headers.getSetCookie())}`);
  return found;
}

describe('access_token cookie', () => {
  it('is set on login, HttpOnly and SameSite=Lax', async () => {
    const cookie = await loginCookie();

    expect(cookie).toMatch(/;\s*HttpOnly/i);
    expect(cookie).toMatch(/;\s*SameSite=Lax/i);
  });

  /**
   * None would attach the session to any cross-site request that asks, which
   * is exactly the CSRF this app is relying on SameSite to prevent. Strict
   * would break the OAuth return. Both directions are wrong, so both are
   * asserted.
   */
  it('is neither None nor Strict', async () => {
    const cookie = await loginCookie();

    expect(cookie).not.toMatch(/SameSite=None/i);
    expect(cookie).not.toMatch(/SameSite=Strict/i);
  });
});

describe('what makes Lax sufficient', () => {
  const ROUTES = ['admin', 'studio', 'auth'].map((n) => ({
    name: n,
    src: readFileSync(join(__dirname, `../../src/routes/${n}.ts`), 'utf8'),
  }));

  /**
   * Lax permits the cookie on a cross-site top-level GET. It is a CSRF control
   * only while every state change is a POST. A GET handler that calls
   * api.post/patch/delete would quietly reopen the hole this test exists to
   * keep closed.
   */
  it('has no GET handler that changes state through the API', () => {
    const offenders: string[] = [];

    for (const { name, src } of ROUTES) {
      const parts = src.split(/^(?:admin|studio|auth)Router\.(get|post)\((['"`])([^'"`]+)\2/m);
      for (let i = 1; i + 3 <= parts.length; i += 4) {
        const [method, , path, body] = [parts[i], parts[i + 1], parts[i + 2], parts[i + 3]];
        if (method === 'get' && /\bapi\.(post|patch|put|delete)\b/.test(body)) {
          offenders.push(`${name}.ts GET ${path}`);
        }
      }
    }

    expect(offenders).toEqual([]);
  });
});

import * as crypto from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import request from 'supertest';
import { createApp } from '../../src/app';
import { db } from '../../src/db/client';
import { runMigrations } from '../../src/db/migrate';
import { tenants, users } from '../../src/db/schema';
import { hashPassword } from '../../src/lib/password';

/**
 * The SameSite attribute is this API's CSRF control, and it is the only one.
 *
 * CodeQL reports `js/missing-token-validation` on `cookieParser` in front of
 * state-changing handlers because it cannot see a runtime cookie attribute. The
 * defence is real, but nothing failed if someone changed `sameSite` to `'none'`
 * — the alert would have stayed exactly as loud and the protection would have
 * been gone. These tests are what makes the control visible.
 *
 * `refresh_token` is Strict: it is only ever presented by this origin's own
 * fetch to /v1/auth/refresh, so it never needs to survive a cross-site
 * navigation. The OAuth nonce cookie is Lax by necessity — it has to come back
 * on the provider's top-level redirect to the callback — and is additionally
 * scoped to that one path.
 */

const app = createApp();
const PASSWORD = 'Test1234!';

beforeAll(async () => {
  await runMigrations();
});

async function register(): Promise<string> {
  const tenantId = crypto.randomUUID();
  const userId = crypto.randomUUID();
  const email = `samesite+${userId.slice(0, 8)}@example.com`;
  const now = new Date();

  await db.insert(tenants).values({
    id: tenantId,
    name: 'SameSite Tenant',
    slug: `slug-${tenantId.slice(0, 8)}`,
    enabled: true,
    createdAt: now,
    updatedAt: now,
  });
  await db.insert(users).values({
    id: userId,
    tenantId,
    name: 'SameSite User',
    email,
    passwordHash: await hashPassword(PASSWORD),
    role: 'developer',
    active: true,
    createdAt: now,
    updatedAt: now,
  });

  return email;
}

function cookie(res: request.Response, name: string): string {
  const all = res.headers['set-cookie'] as unknown as string[] | undefined;
  const found = (all ?? []).find((c) => c.startsWith(`${name}=`));
  if (!found) throw new Error(`no ${name} cookie in ${JSON.stringify(all)}`);
  return found;
}

describe('refresh_token cookie', () => {
  it('is SameSite=Strict and HttpOnly on login', async () => {
    const email = await register();
    const res = await request(app).post('/v1/auth/login').send({ email, password: PASSWORD });

    expect(res.status).toBe(200);
    expect(cookie(res, 'refresh_token')).toMatch(/;\s*HttpOnly/i);
    expect(cookie(res, 'refresh_token')).toMatch(/;\s*SameSite=Strict/i);
  });

  /**
   * Refresh re-issues the cookie. An attribute weakened only on this path
   * would be invisible until a session had been alive for 15 minutes.
   */
  it('is still SameSite=Strict when re-issued by refresh', async () => {
    const email = await register();
    const login = await request(app).post('/v1/auth/login').send({ email, password: PASSWORD });

    const refreshed = await request(app)
      .post('/v1/auth/refresh')
      .set('Cookie', cookie(login, 'refresh_token').split(';')[0]);

    expect(refreshed.status).toBe(200);
    expect(cookie(refreshed, 'refresh_token')).toMatch(/;\s*SameSite=Strict/i);
  });

  it('is never SameSite=None', async () => {
    const email = await register();
    const res = await request(app).post('/v1/auth/login').send({ email, password: PASSWORD });

    expect(cookie(res, 'refresh_token')).not.toMatch(/SameSite=None/i);
  });
});

describe('the OAuth nonce cookie', () => {
  /**
   * Lax rather than Strict is correct here and must stay that way: the cookie
   * has to be presented on the provider's top-level redirect back to the
   * callback, which Strict would suppress, leaving every OAuth connect
   * failing to verify. Asserted from source because reaching the handler
   * requires a registered provider app and a live authorization URL.
   */
  it('is Lax, HttpOnly, and scoped to the callback path', () => {
    const src = readFileSync(
      join(__dirname, '../../src/controllers/integrations.controller.ts'),
      'utf8',
    );

    const setCookie = src.slice(src.indexOf('res.cookie(OAUTH_NONCE_COOKIE'));
    const block = setCookie.slice(0, setCookie.indexOf('});') + 3);

    expect(block).toContain('httpOnly: true');
    expect(block).toContain("sameSite: 'lax'");
    expect(block).toContain("path: '/v1/integrations/oauth'");
    expect(block).not.toContain("sameSite: 'none'");
  });
});

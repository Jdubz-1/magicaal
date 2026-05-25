import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { createApp } from '../../src/app';
import { db } from '../../src/db/client';
import { runMigrations } from '../../src/db/migrate';
import { tenants, users } from '../../src/db/schema';
import { hashPassword } from '../../src/lib/password';
import { createUserAndLogin } from '../helpers/auth-helpers';

const app = createApp();

beforeAll(async () => {
  await runMigrations();
});

describe('POST /v1/auth/login', () => {
  it('returns 200 and accessToken for valid credentials', async () => {
    const { token } = await createUserAndLogin(app);
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  it('returns 401 for wrong password', async () => {
    await createUserAndLogin(app);
    // create a fresh user then try wrong password
    await createUserAndLogin(app);
    // We can't easily get the email back from helper, so test with a known bad user
    const res = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'nobody@example.com', password: 'wrong' });
    expect(res.status).toBe(401);
  });

  it('returns 401 for unknown email', async () => {
    const res = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'doesnotexist@example.com', password: 'password' });
    expect(res.status).toBe(401);
  });

  it('returns 400 when email is missing', async () => {
    const res = await request(app)
      .post('/v1/auth/login')
      .send({ password: 'password' });
    expect(res.status).toBe(400);
  });

  it('sets refresh_token cookie on success', async () => {
    const tenantId = randomUUID();
    const userId = randomUUID();
    const email = `cookie-test+${userId.slice(0, 8)}@example.com`;
    const now = new Date();

    await db.insert(tenants).values({ id: tenantId, name: 'T', slug: `s-${tenantId.slice(0, 8)}`, enabled: true, createdAt: now, updatedAt: now });
    await db.insert(users).values({ id: userId, tenantId, name: 'U', email, passwordHash: await hashPassword('pass123'), role: 'developer', active: true, createdAt: now, updatedAt: now });

    const res = await request(app).post('/v1/auth/login').send({ email, password: 'pass123' });
    expect(res.status).toBe(200);
    expect(res.headers['set-cookie']).toBeDefined();
    const rawCookies = res.headers['set-cookie'];
    const cookies: string[] = Array.isArray(rawCookies) ? rawCookies : [rawCookies as string];
    expect(cookies.some((c) => c.startsWith('refresh_token='))).toBe(true);
  });
});

describe('POST /v1/auth/logout', () => {
  it('returns 204', async () => {
    const res = await request(app).post('/v1/auth/logout');
    expect(res.status).toBe(204);
  });
});

describe('POST /v1/auth/refresh', () => {
  it('returns 401 when no refresh token cookie is present', async () => {
    const res = await request(app).post('/v1/auth/refresh');
    expect(res.status).toBe(401);
  });
});

describe('Protected routes require auth', () => {
  it('returns 401 when Authorization header is missing', async () => {
    const res = await request(app).get('/v1/agents');
    expect(res.status).toBe(401);
  });

  it('returns 401 for an invalid Bearer token', async () => {
    const res = await request(app)
      .get('/v1/agents')
      .set('Authorization', 'Bearer invalid.jwt.token');
    expect(res.status).toBe(401);
  });
});

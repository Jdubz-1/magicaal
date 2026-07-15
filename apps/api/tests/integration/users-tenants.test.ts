import request from 'supertest';
import { eq } from 'drizzle-orm';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { db } from '@/db/client';
import { users } from '@/db/schema';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: { post: jest.fn(), get: jest.fn() },
}));

const app = createApp();

beforeAll(async () => {
  await runMigrations();
});

function uniqueEmail(): string {
  return `u-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;
}

describe('users', () => {
  it('creates a user in the caller tenant and lists it', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'tenant_admin');
    const email = uniqueEmail();

    const created = await request(app)
      .post('/v1/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'New Dev', email, password: 'Passw0rd!', role: 'developer' });

    expect(created.status).toBe(201);
    expect(created.body.tenantId).toBe(tenantId);
    // the email is normalised, and the hash never leaves the server
    expect(created.body.email).toBe(email.toLowerCase());
    expect(created.body.passwordHash).toBeUndefined();

    const list = await request(app)
      .get('/v1/users')
      .set('Authorization', `Bearer ${token}`);
    expect(list.status).toBe(200);
    // the tenant_admin plus the user just created
    expect(list.body.map((u: { email: string }) => u.email)).toContain(email.toLowerCase());
    expect(list.body.every((u: { tenantId: string }) => u.tenantId === tenantId)).toBe(true);
  });

  it('lowercases a mixed-case email on create', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const email = `MiXeD-${Date.now()}@Example.COM`;

    const res = await request(app)
      .post('/v1/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Mixed', email, password: 'Passw0rd!', role: 'viewer' });

    expect(res.body.email).toBe(email.toLowerCase());
  });

  it('400s when a required field is missing', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const res = await request(app)
      .post('/v1/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'No Email', password: 'x', role: 'viewer' });
    expect(res.status).toBe(400);
  });

  it('a platform_admin sees users across every tenant', async () => {
    const other = await createUserAndLogin(app, 'developer');
    const platform = await createUserAndLogin(app, 'platform_admin');

    const res = await request(app)
      .get('/v1/users')
      .set('Authorization', `Bearer ${platform.token}`);

    const tenantIds = new Set(res.body.map((u: { tenantId: string }) => u.tenantId));
    expect(tenantIds.has(other.tenantId)).toBe(true);
    expect(tenantIds.size).toBeGreaterThan(1);
  });

  it('gets, updates, and deactivates a user', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const created = await request(app)
      .post('/v1/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Target', email: uniqueEmail(), password: 'Passw0rd!', role: 'viewer' });
    const id = created.body.id as string;

    const got = await request(app).get(`/v1/users/${id}`).set('Authorization', `Bearer ${token}`);
    expect(got.status).toBe(200);
    expect(got.body.role).toBe('viewer');

    const updated = await request(app)
      .patch(`/v1/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ role: 'developer' });
    expect(updated.status).toBe(200);
    expect(updated.body.role).toBe('developer');
    // name untouched by a role-only patch
    expect(updated.body.name).toBe('Target');

    const del = await request(app)
      .delete(`/v1/users/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(del.status).toBe(204);

    // deactivated, not deleted
    const rows = await db.select().from(users).where(eq(users.id, id));
    expect(rows).toHaveLength(1);
    expect(rows[0].active).toBe(false);
  });

  it('404s for an unknown user on get, patch, and delete', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const auth = { Authorization: `Bearer ${token}` };

    expect((await request(app).get('/v1/users/ghost').set(auth)).status).toBe(404);
    expect((await request(app).patch('/v1/users/ghost').set(auth).send({ name: 'x' })).status).toBe(404);
    expect((await request(app).delete('/v1/users/ghost').set(auth)).status).toBe(404);
  });

  it('refuses a developer creating users', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .post('/v1/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'x', email: uniqueEmail(), password: 'p', role: 'viewer' });
    expect(res.status).toBe(403);
  });
});

describe('tenants', () => {
  it('a platform_admin can create, list, read, and update a tenant', async () => {
    const { token } = await createUserAndLogin(app, 'platform_admin');
    const slug = `acme-${Date.now()}`;

    const created = await request(app)
      .post('/v1/tenants')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Acme', slug });
    expect(created.status).toBe(201);
    expect(created.body.enabled).toBe(true);

    const list = await request(app)
      .get('/v1/tenants')
      .set('Authorization', `Bearer ${token}`);
    expect(list.status).toBe(200);
    expect(list.body.some((t: { slug: string }) => t.slug === slug)).toBe(true);

    const got = await request(app)
      .get(`/v1/tenants/${created.body.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(got.status).toBe(200);
    expect(got.body.name).toBe('Acme');

    const updated = await request(app)
      .patch(`/v1/tenants/${created.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Acme Renamed' });
    expect(updated.status).toBe(200);
    expect(updated.body.name).toBe('Acme Renamed');
  });

  it('400s without name or slug', async () => {
    const { token } = await createUserAndLogin(app, 'platform_admin');
    const res = await request(app)
      .post('/v1/tenants')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'No Slug' });
    expect(res.status).toBe(400);
  });

  describe('resource limits (ALIGN-018)', () => {
    async function makeTenant(token: string): Promise<string> {
      const created = await request(app)
        .post('/v1/tenants')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Limits Co', slug: `limits-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` });
      return created.body.id as string;
    }

    it('accepts the supported keys', async () => {
      const { token } = await createUserAndLogin(app, 'platform_admin');
      const id = await makeTenant(token);

      const res = await request(app)
        .patch(`/v1/tenants/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          resourceLimits: JSON.stringify({
            maxConcurrentRuns: 5,
            maxAgents: 3,
            defaultInvocationStrategy: 'public',
          }),
        });

      expect(res.status).toBe(200);
      expect(JSON.parse(res.body.resourceLimits)).toEqual({
        maxConcurrentRuns: 5,
        maxAgents: 3,
        defaultInvocationStrategy: 'public',
      });
    });

    it('422s unknown keys (typos must not be stored silently)', async () => {
      const { token } = await createUserAndLogin(app, 'platform_admin');
      const id = await makeTenant(token);

      const res = await request(app)
        .patch(`/v1/tenants/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ resourceLimits: JSON.stringify({ maxAgent: 3 }) });

      expect(res.status).toBe(422);
      expect(res.body.code).toBe('INVALID_RESOURCE_LIMITS');
    });

    it('422s bad value types and an invalid strategy', async () => {
      const { token } = await createUserAndLogin(app, 'platform_admin');
      const id = await makeTenant(token);

      const badNumber = await request(app)
        .patch(`/v1/tenants/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ resourceLimits: JSON.stringify({ maxAgents: 0 }) });
      expect(badNumber.status).toBe(422);

      const badStrategy = await request(app)
        .patch(`/v1/tenants/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ resourceLimits: JSON.stringify({ defaultInvocationStrategy: 'jwt' }) });
      expect(badStrategy.status).toBe(422);
    });
  });

  it('404s for an unknown tenant', async () => {
    const { token } = await createUserAndLogin(app, 'platform_admin');
    const res = await request(app)
      .get('/v1/tenants/ghost')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });

  it('refuses a tenant_admin listing all tenants', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const res = await request(app).get('/v1/tenants').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
  });

  it('refuses a developer entirely', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app).get('/v1/tenants/any').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
  });
});

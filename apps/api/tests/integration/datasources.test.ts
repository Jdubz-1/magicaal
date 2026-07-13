import request from 'supertest';
import { eq } from 'drizzle-orm';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { db } from '@/db/client';
import { dataSources } from '@/db/schema';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: { post: jest.fn(), get: jest.fn() },
}));

const app = createApp();

beforeAll(async () => {
  await runMigrations();
});

async function create(token: string, name = 'Postgres'): Promise<string> {
  const res = await request(app)
    .post('/v1/datasources')
    .set('Authorization', `Bearer ${token}`)
    .send({ name, sourceType: 'postgres', connection: { host: 'db', port: 5432 } });
  expect(res.status).toBe(201);
  return res.body.id as string;
}

describe('data sources CRUD', () => {
  it('creates, lists, and reads back a source with its parsed connection', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const id = await create(token);

    const list = await request(app)
      .get('/v1/datasources')
      .set('Authorization', `Bearer ${token}`);
    expect(list.status).toBe(200);
    expect(list.body).toHaveLength(1);
    // the list projection deliberately omits the connection blob
    expect(list.body[0].connectionJson).toBeUndefined();

    const got = await request(app)
      .get(`/v1/datasources/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(got.status).toBe(200);
    expect(got.body.connection).toEqual({ host: 'db', port: 5432 });
  });

  it('400s when a required field is missing', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .post('/v1/datasources')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'incomplete' });
    expect(res.status).toBe(400);
  });

  it('updates name and connection independently', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const id = await create(token);

    await request(app)
      .patch(`/v1/datasources/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Renamed' });

    let rows = await db.select().from(dataSources).where(eq(dataSources.id, id));
    expect(rows[0].name).toBe('Renamed');
    expect(JSON.parse(rows[0].connectionJson)).toEqual({ host: 'db', port: 5432 });

    await request(app)
      .patch(`/v1/datasources/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ connection: { host: 'other' } });

    rows = await db.select().from(dataSources).where(eq(dataSources.id, id));
    expect(rows[0].name).toBe('Renamed'); // untouched
    expect(JSON.parse(rows[0].connectionJson)).toEqual({ host: 'other' });
  });

  it('deletes a source', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const id = await create(token);

    const res = await request(app)
      .delete(`/v1/datasources/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
    expect(await db.select().from(dataSources).where(eq(dataSources.id, id))).toHaveLength(0);
  });

  it('reports a connectivity test result', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const id = await create(token);

    const res = await request(app)
      .post(`/v1/datasources/${id}/test`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.reachable).toBe(true);
  });

  it("404s on every route for another tenant's source", async () => {
    const alice = await createUserAndLogin(app, 'developer');
    const bob = await createUserAndLogin(app, 'developer');
    const id = await create(alice.token);

    const auth = { Authorization: `Bearer ${bob.token}` };

    expect((await request(app).get(`/v1/datasources/${id}`).set(auth)).status).toBe(404);
    expect(
      (await request(app).patch(`/v1/datasources/${id}`).set(auth).send({ name: 'x' })).status,
    ).toBe(404);
    expect((await request(app).delete(`/v1/datasources/${id}`).set(auth)).status).toBe(404);
    expect((await request(app).post(`/v1/datasources/${id}/test`).set(auth)).status).toBe(404);

    // ...and it survives
    expect(await db.select().from(dataSources).where(eq(dataSources.id, id))).toHaveLength(1);
  });

  it('refuses a viewer', async () => {
    const { token } = await createUserAndLogin(app, 'viewer');
    const res = await request(app).get('/v1/datasources').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
  });

  it('requires auth', async () => {
    expect((await request(app).get('/v1/datasources')).status).toBe(401);
  });
});

import request from 'supertest';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';

// engineClient.post is called non-fatally on publish/deploy — mock it to avoid real HTTP
jest.mock('../../src/lib/engine-client', () => ({
  engineClient: {
    post: jest.fn().mockResolvedValue({ data: {} }),
    get: jest.fn().mockResolvedValue({ data: {} }),
  },
}));

const app = createApp();

beforeAll(async () => {
  await runMigrations();
});

describe('Agents CRUD', () => {
  let token: string;

  beforeAll(async () => {
    ({ token } = await createUserAndLogin(app, 'developer'));
  });

  it('returns 401 without auth', async () => {
    const res = await request(app).get('/v1/agents');
    expect(res.status).toBe(401);
  });

  it('creates an agent', async () => {
    const res = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'My Agent', handle: 'my-agent' });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('My Agent');
    expect(res.body.handle).toBe('my-agent');
    expect(res.body.status).toBe('draft');
  });

  it('returns 400 when name is missing', async () => {
    const res = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ handle: 'no-name' });
    expect(res.status).toBe(400);
  });

  it('gets an agent by id', async () => {
    const create = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Agent Get', handle: 'agent-get' });

    const res = await request(app)
      .get(`/v1/agents/${create.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(create.body.id);
  });

  it('returns 404 for unknown agent id', async () => {
    const res = await request(app)
      .get('/v1/agents/nonexistent-id')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });

  it('updates agent name', async () => {
    const create = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Original', handle: 'orig' });

    const res = await request(app)
      .patch(`/v1/agents/${create.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Name' });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated Name');
  });

  it('publishes an agent and creates a version', async () => {
    const create = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Publishable', handle: 'publishable' });

    const graphJson = JSON.stringify({ entry: 'start', nodes: {}, edges: [] });
    const res = await request(app)
      .post(`/v1/agents/${create.body.id}/publish`)
      .set('Authorization', `Bearer ${token}`)
      .send({ graphJson });

    expect(res.status).toBe(200);
    expect(res.body.versionNumber).toBe(1);
  });

  it('returns 400 on publish when graphJson is missing', async () => {
    const create = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'No Graph', handle: 'no-graph' });

    const res = await request(app)
      .post(`/v1/agents/${create.body.id}/publish`)
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(400);
  });

  it('reverts agent to draft', async () => {
    const create = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Draft Me', handle: 'draft-me' });

    const graphJson = JSON.stringify({ entry: 'start', nodes: {}, edges: [] });
    await request(app)
      .post(`/v1/agents/${create.body.id}/publish`)
      .set('Authorization', `Bearer ${token}`)
      .send({ graphJson });

    const res = await request(app)
      .post(`/v1/agents/${create.body.id}/draft`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('draft');
  });

  it('lists agent versions', async () => {
    const create = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Versioned', handle: 'versioned' });

    const graphJson = JSON.stringify({ entry: 's', nodes: {}, edges: [] });
    await request(app)
      .post(`/v1/agents/${create.body.id}/publish`)
      .set('Authorization', `Bearer ${token}`)
      .send({ graphJson });

    const res = await request(app)
      .get(`/v1/agents/${create.body.id}/versions`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(1);
  });

  it('lists agents for the tenant', async () => {
    const res = await request(app)
      .get('/v1/agents')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

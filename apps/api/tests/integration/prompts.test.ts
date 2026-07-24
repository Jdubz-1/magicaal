import request from 'supertest';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: { post: jest.fn(), get: jest.fn() },
}));

const app = createApp();

beforeAll(async () => {
  await runMigrations();
});

describe('prompt version CRUD (ALIGN-026)', () => {
  it('creates a version, lists only active versions, and lists full history', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const name = `sys-prompt-${Date.now()}`;

    const created = await request(app)
      .post('/v1/prompts')
      .set('Authorization', `Bearer ${token}`)
      .send({ name, content: 'v1 content' });
    expect(created.status).toBe(201);
    expect(created.body.versionNumber).toBe(1);
    expect(created.body.isActive).toBe(false);

    // Not active yet — listPrompts (active-only) should not include it
    const listBeforePromote = await request(app)
      .get('/v1/prompts')
      .set('Authorization', `Bearer ${token}`);
    expect(listBeforePromote.body.find((p: { name: string }) => p.name === name)).toBeUndefined();

    await request(app)
      .post(`/v1/prompts/${name}/versions/${created.body.id}/promote`)
      .set('Authorization', `Bearer ${token}`);

    const listAfterPromote = await request(app)
      .get('/v1/prompts')
      .set('Authorization', `Bearer ${token}`);
    const active = listAfterPromote.body.find((p: { name: string }) => p.name === name);
    expect(active).toMatchObject({ versionNumber: 1, isActive: true });

    const v2 = await request(app)
      .post('/v1/prompts')
      .set('Authorization', `Bearer ${token}`)
      .send({ name, content: 'v2 content' });
    expect(v2.body.versionNumber).toBe(2);

    const versions = await request(app)
      .get(`/v1/prompts/${name}/versions`)
      .set('Authorization', `Bearer ${token}`);
    expect(versions.body).toHaveLength(2);
    expect(versions.body.map((v: { versionNumber: number }) => v.versionNumber)).toEqual([1, 2]);
  });

  it('diffs two versions', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const name = `diff-prompt-${Date.now()}`;

    const v1 = await request(app)
      .post('/v1/prompts')
      .set('Authorization', `Bearer ${token}`)
      .send({ name, content: 'first' });
    const v2 = await request(app)
      .post('/v1/prompts')
      .set('Authorization', `Bearer ${token}`)
      .send({ name, content: 'second' });

    const diff = await request(app)
      .get(`/v1/prompts/${name}/versions/${v1.body.id}/diff?compareWith=${v2.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(diff.status).toBe(200);
    expect(diff.body.version1.content).toBe('first');
    expect(diff.body.version2.content).toBe('second');
  });

  it('promoting deactivates all other versions for the same name', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const name = `promote-prompt-${Date.now()}`;

    const v1 = await request(app).post('/v1/prompts').set('Authorization', `Bearer ${token}`).send({ name, content: 'a' });
    const v2 = await request(app).post('/v1/prompts').set('Authorization', `Bearer ${token}`).send({ name, content: 'b' });

    await request(app).post(`/v1/prompts/${name}/versions/${v1.body.id}/promote`).set('Authorization', `Bearer ${token}`);
    await request(app).post(`/v1/prompts/${name}/versions/${v2.body.id}/promote`).set('Authorization', `Bearer ${token}`);

    const versions = await request(app)
      .get(`/v1/prompts/${name}/versions`)
      .set('Authorization', `Bearer ${token}`);
    const active = versions.body.filter((v: { isActive: boolean }) => v.isActive);
    expect(active).toHaveLength(1);
    expect(active[0].id).toBe(v2.body.id);
  });

  it('400s without name or content', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .post('/v1/prompts')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'x' });
    expect(res.status).toBe(400);
  });

  it('has no PUT/update route — prompt versions are immutable by design (ALIGN-022)', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .put('/v1/prompts/some-name/versions/some-id')
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'edited' });
    expect(res.status).toBe(404);
  });
});

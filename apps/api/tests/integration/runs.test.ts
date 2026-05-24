import request from 'supertest';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { engineClient } = require('../../src/lib/engine-client') as {
  engineClient: { post: jest.Mock; get: jest.Mock };
};

const mockEnginePost = engineClient.post;
const mockEngineGet = engineClient.get;

const app = createApp();

beforeAll(async () => {
  await runMigrations();
});

beforeEach(() => {
  jest.clearAllMocks();
});

async function createAndPublishAgent(token: string, handle: string) {
  const create = await request(app)
    .post('/v1/agents')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'Run Agent', handle });

  const graphJson = JSON.stringify({ entry: 'start', nodes: {}, edges: [] });
  await request(app)
    .post(`/v1/agents/${create.body.id}/publish`)
    .set('Authorization', `Bearer ${token}`)
    .send({ graphJson });

  return create.body.id as string;
}

describe('POST /v1/agents/:id/runs (async mode)', () => {
  let token: string;

  beforeAll(async () => {
    ({ token } = await createUserAndLogin(app, 'developer'));
  });

  it('returns 202 and runId for async dispatch', async () => {
    mockEnginePost.mockResolvedValue({ data: { runId: 'run-abc' } });

    const agentId = await createAndPublishAgent(token, `async-agent-${Date.now()}`);
    const res = await request(app)
      .post(`/v1/agents/${agentId}/runs`)
      .set('Authorization', `Bearer ${token}`)
      .send({ input: { msg: 'hello' }, mode: 'async' });

    expect(res.status).toBe(202);
    expect(res.body.runId).toBe('run-abc');
  });

  it('returns 404 when agent does not exist', async () => {
    const res = await request(app)
      .post('/v1/agents/nonexistent/runs')
      .set('Authorization', `Bearer ${token}`)
      .send({ input: {} });
    expect(res.status).toBe(404);
  });

  it('returns 409 when agent is in draft status', async () => {
    const create = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Draft Agent', handle: `draft-${Date.now()}` });

    const res = await request(app)
      .post(`/v1/agents/${create.body.id}/runs`)
      .set('Authorization', `Bearer ${token}`)
      .send({ input: {} });

    expect(res.status).toBe(409);
  });
});

describe('POST /v1/agents/:id/runs (sync mode)', () => {
  let token: string;

  beforeAll(async () => {
    ({ token } = await createUserAndLogin(app, 'developer'));
  });

  it('returns 200 with run result for sync mode', async () => {
    mockEnginePost.mockResolvedValue({ data: { runId: 'run-sync' } });
    mockEngineGet.mockResolvedValue({
      data: { id: 'run-sync', status: 'completed', output: { result: 42 }, error: null },
    });

    const agentId = await createAndPublishAgent(token, `sync-agent-${Date.now()}`);
    const res = await request(app)
      .post(`/v1/agents/${agentId}/runs`)
      .set('Authorization', `Bearer ${token}`)
      .send({ input: {}, mode: 'sync' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('completed');
    expect(res.body.output).toEqual({ result: 42 });
  });
});

describe('GET /v1/agents/:id/runs/:runId', () => {
  let token: string;

  beforeAll(async () => {
    ({ token } = await createUserAndLogin(app, 'developer'));
  });

  it('proxies run status from engine', async () => {
    const agentId = await createAndPublishAgent(token, `status-agent-${Date.now()}`);
    mockEngineGet.mockResolvedValue({
      data: { id: 'run-xyz', status: 'running', output: null, error: null },
    });

    const res = await request(app)
      .get(`/v1/agents/${agentId}/runs/run-xyz`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('running');
  });
});

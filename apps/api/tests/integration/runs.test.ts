import request from 'supertest';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: {
    post: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
  },
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { engineClient } = require('../../src/lib/engine-client') as {
  engineClient: { post: jest.Mock; get: jest.Mock; delete: jest.Mock };
};

const mockEnginePost = engineClient.post;
const mockEngineGet = engineClient.get;
const mockEngineDelete = engineClient.delete;

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

  const graphJson = JSON.stringify({ entry: 'start', nodes: { start: { id: 'start', type: 'core:start', config: {} } }, edges: [] });
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
  let tenantId: string;

  beforeAll(async () => {
    ({ token, tenantId } = await createUserAndLogin(app, 'developer'));
  });

  it('proxies run status from engine', async () => {
    const agentId = await createAndPublishAgent(token, `status-agent-${Date.now()}`);
    mockEngineGet.mockResolvedValue({
      data: { id: 'run-xyz', tenantId, agentId, status: 'running', output: null, error: null },
    });

    const res = await request(app)
      .get(`/v1/agents/${agentId}/runs/run-xyz`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('running');
  });
});

describe('run access is scoped to the caller (ISS-049)', () => {
  it('404s when the run belongs to another tenant', async () => {
    const victim = await createUserAndLogin(app, 'developer');
    const attacker = await createUserAndLogin(app, 'developer');

    const attackerAgentId = await createAndPublishAgent(attacker.token, `atk-${Date.now()}`);

    // Engine holds the victim's run; the attacker pairs it with their own agent
    mockEngineGet.mockResolvedValue({
      data: {
        id: 'victim-run',
        tenantId: victim.tenantId,
        agentId: 'victim-agent',
        status: 'suspended',
        output: { secret: 'confidential' },
        error: null,
      },
    });

    const get = await request(app)
      .get(`/v1/agents/${attackerAgentId}/runs/victim-run`)
      .set('Authorization', `Bearer ${attacker.token}`);
    expect(get.status).toBe(404);
    expect(get.body.error ?? '').not.toContain('confidential');

    const steps = await request(app)
      .get(`/v1/agents/${attackerAgentId}/runs/victim-run/steps`)
      .set('Authorization', `Bearer ${attacker.token}`);
    expect(steps.status).toBe(404);

    // Resolving another tenant's human-review gate must be refused
    const review = await request(app)
      .post(`/v1/agents/${attackerAgentId}/runs/victim-run/review`)
      .set('Authorization', `Bearer ${attacker.token}`)
      .send({ decision: 'approve' });
    expect(review.status).toBe(404);
    expect(mockEnginePost).not.toHaveBeenCalledWith(
      expect.stringContaining('/review'),
      expect.anything(),
    );

    const direct = await request(app)
      .get('/v1/runs/victim-run')
      .set('Authorization', `Bearer ${attacker.token}`);
    expect(direct.status).toBe(404);
  });

  it("404s when the runId belongs to a different agent in the caller's own tenant", async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAndPublishAgent(token, `own-${Date.now()}`);

    mockEngineGet.mockResolvedValue({
      data: { id: 'other-run', tenantId, agentId: 'a-different-agent', status: 'completed' },
    });

    const res = await request(app)
      .get(`/v1/agents/${agentId}/runs/other-run`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });

  it('allows the owning tenant through GET /v1/runs/:runId', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    mockEngineGet.mockResolvedValue({
      data: { id: 'mine', tenantId, agentId: 'agent-1', status: 'completed' },
    });

    const res = await request(app)
      .get('/v1/runs/mine')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe('mine');
  });
});

describe('DELETE /v1/agents/:id/runs/:runId (ALIGN-001)', () => {
  it('cancels a tenant-owned run via the engine', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAndPublishAgent(token, `cancel-agent-${Date.now()}`);

    mockEngineGet.mockResolvedValue({
      data: { id: 'run-1', tenantId, agentId, status: 'running' },
    });
    mockEngineDelete.mockResolvedValue({ status: 202, data: { runId: 'run-1', cancelling: true } });

    const res = await request(app)
      .delete(`/v1/agents/${agentId}/runs/run-1`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(202);
    expect(res.body.cancelling).toBe(true);
    expect(mockEngineDelete).toHaveBeenCalledWith('/internal/runs/run-1');
  });

  it("404s cancelling another tenant's run", async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAndPublishAgent(token, `cancel-x-${Date.now()}`);

    mockEngineGet.mockResolvedValue({
      data: { id: 'run-2', tenantId: 'someone-else', agentId, status: 'running' },
    });

    const res = await request(app)
      .delete(`/v1/agents/${agentId}/runs/run-2`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(mockEngineDelete).not.toHaveBeenCalled();
  });
});

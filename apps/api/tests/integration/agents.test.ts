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

    const graphJson = JSON.stringify({ entry: 'start', nodes: { start: { id: 'start', type: 'core:start', config: {} } }, edges: [] });
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

  describe('graph validation at publish (ISS-054)', () => {
    async function publish(handle: string, graph: unknown): Promise<request.Response> {
      const create = await request(app)
        .post('/v1/agents')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: handle, handle });

      return request(app)
        .post(`/v1/agents/${create.body.id}/publish`)
        .set('Authorization', `Bearer ${token}`)
        .send({ graphJson: JSON.stringify(graph) });
    }

    it('refuses a graph whose entry node does not exist', async () => {
      const res = await publish(`bad-entry-${Date.now()}`, {
        entry: 'nope',
        nodes: { start: { id: 'start', type: 'core:start', config: {} } },
        edges: [],
      });
      expect(res.status).toBe(400);
      expect(res.body.code).toBe('INVALID_GRAPH_ENTRY');
    });

    it('refuses a graph with no core:start node', async () => {
      const res = await publish(`no-start-${Date.now()}`, {
        entry: 'x',
        nodes: { x: { id: 'x', type: 'core:end', config: {} } },
        edges: [],
      });
      expect(res.status).toBe(400);
      expect(res.body.code).toBe('INVALID_GRAPH_NO_START');
    });

    it('refuses an edge pointing at a node that does not exist', async () => {
      const res = await publish(`bad-edge-${Date.now()}`, {
        entry: 'start',
        nodes: { start: { id: 'start', type: 'core:start', config: {} } },
        edges: [{ id: 'e1', from: 'start', to: 'ghost', type: 'unconditional' }],
      });
      expect(res.status).toBe(400);
      expect(res.body.code).toBe('INVALID_GRAPH_EDGE');
    });

    it('refuses a node unreachable from the entry', async () => {
      const res = await publish(`orphan-${Date.now()}`, {
        entry: 'start',
        nodes: {
          start: { id: 'start', type: 'core:start', config: {} },
          orphan: { id: 'orphan', type: 'core:end', config: {} },
        },
        edges: [],
      });
      expect(res.status).toBe(400);
      expect(res.body.code).toBe('INVALID_GRAPH_DISCONNECTED');
    });

    it('refuses malformed JSON', async () => {
      const create = await request(app)
        .post('/v1/agents')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'bad-json', handle: `bad-json-${Date.now()}` });

      const res = await request(app)
        .post(`/v1/agents/${create.body.id}/publish`)
        .set('Authorization', `Bearer ${token}`)
        .send({ graphJson: '{"entry": "start", oops' });

      expect(res.status).toBe(400);
      expect(res.body.code).toBe('INVALID_GRAPH_JSON');
    });
  });

  it('reverts agent to draft', async () => {
    const create = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Draft Me', handle: 'draft-me' });

    const graphJson = JSON.stringify({ entry: 'start', nodes: { start: { id: 'start', type: 'core:start', config: {} } }, edges: [] });
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

    const graphJson = JSON.stringify({
      entry: 's',
      nodes: { s: { id: 's', type: 'core:start', config: {} } },
      edges: [],
    });
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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { engineClient } = require('../../src/lib/engine-client') as {
  engineClient: { post: jest.Mock; get: jest.Mock };
};

const START_ONLY = {
  entry: 'start',
  nodes: { start: { id: 'start', type: 'core:start', config: {} } },
  edges: [],
};

function graphWithSchemas(): string {
  return JSON.stringify({
    entry: 'start',
    nodes: {
      start: {
        id: 'start',
        type: 'core:start',
        config: { inputSchema: { type: 'object', required: ['q'] } },
      },
      end: {
        id: 'end',
        type: 'core:end',
        config: { outputSchema: { type: 'object', required: ['a'] } },
      },
    },
    edges: [{ id: 'e1', from: 'start', to: 'end', type: 'unconditional' }],
  });
}

describe('agent config', () => {
  let token: string;
  let agentId: string;

  beforeEach(async () => {
    ({ token } = await createUserAndLogin(app, 'developer'));
    const create = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Cfg', handle: `cfg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` });
    agentId = create.body.id as string;
  });

  it('returns the config created alongside the agent', async () => {
    const res = await request(app)
      .get(`/v1/agents/${agentId}/config`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('triggerConfig');
    expect(res.body).toHaveProperty('timeoutMs');
  });

  it('updates trigger config and timeout, and redeploys', async () => {
    const res = await request(app)
      .patch(`/v1/agents/${agentId}/config`)
      .set('Authorization', `Bearer ${token}`)
      .send({ triggerConfig: { type: 'cron', expression: '0 * * * *' }, timeoutMs: 9000 });

    expect(res.status).toBe(200);
    expect(res.body.triggerConfig).toEqual({ type: 'cron', expression: '0 * * * *' });
    expect(res.body.timeoutMs).toBe(9000);
    expect(engineClient.post).toHaveBeenCalledWith(`/internal/agents/${agentId}/deploy`);
  });

  it('applies a partial update without clobbering the other field', async () => {
    await request(app)
      .patch(`/v1/agents/${agentId}/config`)
      .set('Authorization', `Bearer ${token}`)
      .send({ timeoutMs: 1234 });

    const res = await request(app)
      .patch(`/v1/agents/${agentId}/config`)
      .set('Authorization', `Bearer ${token}`)
      .send({ triggerConfig: { type: 'rest' } });

    expect(res.body.timeoutMs).toBe(1234);
    expect(res.body.triggerConfig).toEqual({ type: 'rest' });
  });

  it('404s on config for an unknown agent', async () => {
    const get = await request(app)
      .get('/v1/agents/ghost/config')
      .set('Authorization', `Bearer ${token}`);
    expect(get.status).toBe(404);

    const patch = await request(app)
      .patch('/v1/agents/ghost/config')
      .set('Authorization', `Bearer ${token}`)
      .send({ timeoutMs: 1 });
    expect(patch.status).toBe(404);
  });
});

describe('publish trigger wiring', () => {
  it('schedules a cron job on the engine when the graph declares one', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const create = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Cron', handle: `cron-${Date.now()}` });

    const graphJson = JSON.stringify({
      ...START_ONLY,
      config: { trigger: { type: 'cron', expression: '*/5 * * * *' } },
    });

    const res = await request(app)
      .post(`/v1/agents/${create.body.id}/publish`)
      .set('Authorization', `Bearer ${token}`)
      .send({ graphJson });

    expect(res.status).toBe(200);
    expect(engineClient.post).toHaveBeenCalledWith('/internal/agents/schedule', {
      agentId: create.body.id,
      tenantId,
      cronExpression: '*/5 * * * *',
    });
  });

  it('returns a webhook URL when the graph declares a webhook trigger', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const create = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Hook', handle: `hook-${Date.now()}` });

    const graphJson = JSON.stringify({
      ...START_ONLY,
      config: { trigger: { type: 'webhook' } },
    });

    const res = await request(app)
      .post(`/v1/agents/${create.body.id}/publish`)
      .set('Authorization', `Bearer ${token}`)
      .send({ graphJson });

    expect(res.status).toBe(200);
    expect(res.body.webhookUrl).toContain(`/v1/agents/${create.body.id}/webhook/`);
  });
});

describe('version diff and rollback', () => {
  let token: string;
  let agentId: string;
  let v1: string;
  let v2: string;

  beforeAll(async () => {
    ({ token } = await createUserAndLogin(app, 'developer'));
    const create = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Versioned', handle: `ver-${Date.now()}` });
    agentId = create.body.id as string;

    const first = await request(app)
      .post(`/v1/agents/${agentId}/publish`)
      .set('Authorization', `Bearer ${token}`)
      .send({ graphJson: JSON.stringify(START_ONLY) });
    v1 = first.body.versionId as string;

    const second = await request(app)
      .post(`/v1/agents/${agentId}/publish`)
      .set('Authorization', `Bearer ${token}`)
      .send({ graphJson: graphWithSchemas() });
    v2 = second.body.versionId as string;
  });

  it('diffs a version against its predecessor by default', async () => {
    const res = await request(app)
      .get(`/v1/agents/${agentId}/versions/${v2}/diff`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.targetVersionId).toBe(v2);
    expect(res.body.compareVersionId).toBe(v1);
    expect(res.body.changes.length).toBeGreaterThan(0);
  });

  it('diffs against an explicitly requested version', async () => {
    const res = await request(app)
      .get(`/v1/agents/${agentId}/versions/${v2}/diff?compareWith=${v1}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.compareVersion.versionNumber).toBe(1);
  });

  it('diffs the first version against an empty graph', async () => {
    const res = await request(app)
      .get(`/v1/agents/${agentId}/versions/${v1}/diff`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.compareVersionId).toBeNull();
    expect(res.body.compareVersion).toBeNull();
  });

  it('404s diffing an unknown version', async () => {
    const res = await request(app)
      .get(`/v1/agents/${agentId}/versions/ghost/diff`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });

  it("404s diffing another tenant's agent", async () => {
    const bob = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .get(`/v1/agents/${agentId}/versions/${v2}/diff`)
      .set('Authorization', `Bearer ${bob.token}`);
    expect(res.status).toBe(404);
  });

  it('rolls back to an earlier version as a new draft', async () => {
    const res = await request(app)
      .post(`/v1/agents/${agentId}/versions/${v1}/rollback`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.rolledBackFrom).toBe(v1);
    expect(res.body.versionNumber).toBe(3);

    // rollback stages a draft rather than going live
    const agent = await request(app)
      .get(`/v1/agents/${agentId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(agent.body.status).toBe('draft');
  });

  it('404s rolling back an unknown version', async () => {
    const res = await request(app)
      .post(`/v1/agents/${agentId}/versions/ghost/rollback`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });
});

describe('schema discovery', () => {
  it('returns the input and output schemas from the published graph', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const create = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Schemas', handle: `sch-${Date.now()}` });
    const agentId = create.body.id as string;

    await request(app)
      .post(`/v1/agents/${agentId}/publish`)
      .set('Authorization', `Bearer ${token}`)
      .send({ graphJson: graphWithSchemas() });

    const input = await request(app)
      .get(`/v1/agents/${agentId}/schema/input`)
      .set('Authorization', `Bearer ${token}`);
    expect(input.status).toBe(200);
    expect(input.body.inputSchema.required).toEqual(['q']);

    const output = await request(app)
      .get(`/v1/agents/${agentId}/schema/output`)
      .set('Authorization', `Bearer ${token}`);
    expect(output.status).toBe(200);
    expect(output.body.outputSchema.required).toEqual(['a']);
  });

  it('404s when the graph declares no schema', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const create = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'NoSchema', handle: `nosch-${Date.now()}` });
    const agentId = create.body.id as string;

    await request(app)
      .post(`/v1/agents/${agentId}/publish`)
      .set('Authorization', `Bearer ${token}`)
      .send({ graphJson: JSON.stringify(START_ONLY) });

    const input = await request(app)
      .get(`/v1/agents/${agentId}/schema/input`)
      .set('Authorization', `Bearer ${token}`);
    expect(input.status).toBe(404);

    const output = await request(app)
      .get(`/v1/agents/${agentId}/schema/output`)
      .set('Authorization', `Bearer ${token}`);
    expect(output.status).toBe(404);
  });

  it('404s when the agent has never been published', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const create = await request(app)
      .post('/v1/agents')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Unpublished', handle: `unpub-${Date.now()}` });

    const res = await request(app)
      .get(`/v1/agents/${create.body.id}/schema/input`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });
});

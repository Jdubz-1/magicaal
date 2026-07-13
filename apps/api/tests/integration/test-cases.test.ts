import request from 'supertest';
import { eq } from 'drizzle-orm';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { db } from '@/db/client';
import { testCases } from '@/db/schema';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: { post: jest.fn(), get: jest.fn() },
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { engineClient } = require('../../src/lib/engine-client') as {
  engineClient: { post: jest.Mock; get: jest.Mock };
};

const app = createApp();

beforeAll(async () => {
  await runMigrations();
});

beforeEach(() => {
  jest.clearAllMocks();
});

async function createAgent(token: string, handle: string): Promise<string> {
  const res = await request(app)
    .post('/v1/agents')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'TC Agent', handle });
  return res.body.id as string;
}

async function addCase(
  token: string,
  agentId: string,
  name: string,
  assertions: unknown[],
  input: Record<string, unknown> = {},
): Promise<string> {
  const res = await request(app)
    .post(`/v1/agents/${agentId}/test-cases`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      name,
      inputJson: JSON.stringify(input),
      assertionsJson: JSON.stringify(assertions),
    });
  expect(res.status).toBe(201);
  return res.body.id as string;
}

/** Engine reports a run that completes immediately with `output`. */
function mockRunCompleting(output: Record<string, unknown>): void {
  engineClient.post.mockResolvedValue({ data: { runId: 'run-tc' } });
  engineClient.get.mockResolvedValue({ data: { status: 'completed', output } });
}

describe('test case CRUD', () => {
  it('creates, lists, updates, and deletes a case', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `tc-crud-${Date.now()}`);

    const cid = await addCase(token, agentId, 'happy', [{ type: 'exact_match', expected: {} }]);

    const list = await request(app)
      .get(`/v1/agents/${agentId}/test-cases`)
      .set('Authorization', `Bearer ${token}`);
    expect(list.status).toBe(200);
    expect(list.body).toHaveLength(1);
    expect(list.body[0].name).toBe('happy');

    const updated = await request(app)
      .put(`/v1/agents/${agentId}/test-cases/${cid}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'renamed' });
    expect(updated.status).toBe(200);
    expect(updated.body.name).toBe('renamed');
    // untouched fields survive a partial update
    expect(updated.body.inputJson).toBe('{}');

    const del = await request(app)
      .delete(`/v1/agents/${agentId}/test-cases/${cid}`)
      .set('Authorization', `Bearer ${token}`);
    expect(del.status).toBe(204);
    expect(await db.select().from(testCases).where(eq(testCases.id, cid))).toHaveLength(0);
  });

  it('400s when required fields are missing', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `tc-missing-${Date.now()}`);

    const res = await request(app)
      .post(`/v1/agents/${agentId}/test-cases`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'no input' });

    expect(res.status).toBe(400);
  });

  it('400s when assertionsJson is not valid JSON', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `tc-badjson-${Date.now()}`);

    const res = await request(app)
      .post(`/v1/agents/${agentId}/test-cases`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'x', inputJson: '{}', assertionsJson: '[{oops' });

    expect(res.status).toBe(400);
  });

  it("404s creating against another tenant's agent", async () => {
    const alice = await createUserAndLogin(app, 'developer');
    const bob = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(alice.token, `tc-xt-${Date.now()}`);

    const res = await request(app)
      .post(`/v1/agents/${agentId}/test-cases`)
      .set('Authorization', `Bearer ${bob.token}`)
      .send({ name: 'x', inputJson: '{}', assertionsJson: '[]' });

    expect(res.status).toBe(404);
  });

  it('404s updating or deleting an unknown case', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `tc-unknown-${Date.now()}`);

    const put = await request(app)
      .put(`/v1/agents/${agentId}/test-cases/nope`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'x' });
    expect(put.status).toBe(404);

    const del = await request(app)
      .delete(`/v1/agents/${agentId}/test-cases/nope`)
      .set('Authorization', `Bearer ${token}`);
    expect(del.status).toBe(404);
  });

  it('refuses a viewer', async () => {
    const { token } = await createUserAndLogin(app, 'viewer');
    const res = await request(app)
      .post('/v1/agents/any/test-cases')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'x', inputJson: '{}', assertionsJson: '[]' });

    expect(res.status).toBe(403);
  });
});

describe('POST /v1/agents/:id/test-cases/run', () => {
  it('reports an empty suite without calling the engine', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `tc-empty-${Date.now()}`);

    const res = await request(app)
      .post(`/v1/agents/${agentId}/test-cases/run`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ total: 0, passed: 0, failed: 0, results: [] });
    expect(engineClient.post).not.toHaveBeenCalled();
  });

  it('404s for an agent in another tenant', async () => {
    const alice = await createUserAndLogin(app, 'developer');
    const bob = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(alice.token, `tc-runxt-${Date.now()}`);

    const res = await request(app)
      .post(`/v1/agents/${agentId}/test-cases/run`)
      .set('Authorization', `Bearer ${bob.token}`);

    expect(res.status).toBe(404);
  });

  it('evaluates every assertion type against the run output', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `tc-assert-${Date.now()}`);

    // One case, many assertions — each exercises a different branch
    const cid = await addCase(token, agentId, 'mixed', [
      { type: 'exact_match', key: 'answer', expected: 42 }, // passes
      { type: 'exact_match', key: 'answer', expected: 7 }, // fails
      { type: 'schema', schema: { type: 'object', required: ['answer'] } }, // passes
      { type: 'schema', schema: { type: 'object', required: ['missing'] } }, // fails
      { type: 'schema' }, // no schema — object check only
      { type: 'evaluate_score', threshold: 0.8 }, // not implemented → fails
    ]);

    mockRunCompleting({ answer: 42 });

    const res = await request(app)
      .post(`/v1/agents/${agentId}/test-cases/run`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    const [result] = res.body.results;
    expect(result.assertions.map((a: { passed: boolean }) => a.passed)).toEqual([
      true,
      false,
      true,
      false,
      true,
      false,
    ]);
    // any failing assertion fails the case
    expect(result.passed).toBe(false);
    expect(res.body).toMatchObject({ total: 1, passed: 0, failed: 1 });

    // the failing assertions carry an explanation
    expect(result.assertions[1].message).toContain('Expected');
    expect(result.assertions[3].message).toBeTruthy();

    // and the outcome is written back to the row
    const rows = await db.select().from(testCases).where(eq(testCases.id, cid));
    expect(JSON.parse(rows[0].lastResult!).passed).toBe(false);
  }, 20_000);

  it('passes a case whose assertions all hold', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `tc-pass-${Date.now()}`);
    await addCase(token, agentId, 'ok', [{ type: 'exact_match', key: 'v', expected: 'x' }]);

    mockRunCompleting({ v: 'x' });

    const res = await request(app)
      .post(`/v1/agents/${agentId}/test-cases/run`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.body).toMatchObject({ total: 1, passed: 1, failed: 0 });
    expect(res.body.results[0].passed).toBe(true);
  }, 20_000);

  it('records a failed run as a case error rather than evaluating assertions', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `tc-runfail-${Date.now()}`);
    await addCase(token, agentId, 'boom', [{ type: 'exact_match', expected: {} }]);

    engineClient.post.mockResolvedValue({ data: { runId: 'run-x' } });
    engineClient.get.mockResolvedValue({ data: { status: 'failed' } });

    const res = await request(app)
      .post(`/v1/agents/${agentId}/test-cases/run`)
      .set('Authorization', `Bearer ${token}`);

    const [result] = res.body.results;
    expect(result.passed).toBe(false);
    expect(result.error).toContain('failed');
    expect(result.assertions).toHaveLength(0);
  }, 20_000);

  it('surfaces an engine dispatch error as the case error', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `tc-dispatch-${Date.now()}`);
    await addCase(token, agentId, 'nodispatch', [{ type: 'exact_match', expected: {} }]);

    engineClient.post.mockRejectedValue(new Error('engine unreachable'));

    const res = await request(app)
      .post(`/v1/agents/${agentId}/test-cases/run`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.body.results[0].error).toContain('engine unreachable');
    expect(res.body.failed).toBe(1);
  }, 20_000);
});

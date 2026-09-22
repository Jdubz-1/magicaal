import request from 'supertest';
import * as crypto from 'node:crypto';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { ensurePlatformTenant, PLATFORM_TENANT_ID } from '../../src/platform/bootstrap';
import { eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { agents, caalConfiguration, namedRouterPolicies } from '@/db/schema';
import {
  CAAL_INVOKE_BODY,
  expectedDispatch,
  expectedSessionId,
} from '../../../../tests/fixtures/caal-wire/run-job-input';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: { post: jest.fn(), get: jest.fn() },
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { engineClient } = require('../../src/lib/engine-client') as {
  engineClient: { post: jest.Mock; get: jest.Mock };
};

const app = createApp();

/**
 * What invokeCaal dispatches, and what it hands back.
 *
 * The engine side of this is covered by apps/engine/tests/caal, which starts
 * from the same fixture — so the graph and the endpoint that calls it cannot
 * drift into separately-true, jointly-wrong shapes.
 */

// agents.handle is globally unique, so the row is created once and reused —
// every test in this file needs the same platform-tenant Caal agent.
async function seedCaalAgent(): Promise<string> {
  await ensurePlatformTenant();

  const existing = await db
    .select({ id: agents.id })
    .from(agents)
    .where(eq(agents.handle, 'caal-assistant'));
  if (existing[0]) return existing[0].id;

  const id = crypto.randomUUID();
  await db.insert(agents).values({
    id,
    tenantId: PLATFORM_TENANT_ID,
    name: 'Caal',
    handle: 'caal-assistant',
    status: 'active',
    authoringMode: 'code-defined',
    enabled: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return id;
}

function completesWith(output: Record<string, unknown>): void {
  engineClient.post.mockResolvedValue({ data: { runId: 'run_caal_1' } });
  engineClient.get.mockResolvedValue({ data: { status: 'completed', output } });
}

beforeAll(async () => {
  await runMigrations();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('POST /v1/caal/invoke', () => {
  it('dispatches exactly the payload the engine-side corpus starts from', async () => {
    const { token, userId, tenantId } = await createUserAndLogin(app, 'developer');
    const caalAgentId = await seedCaalAgent();
    completesWith({ content: 'Some advice.' });

    const res = await request(app)
      .post('/v1/caal/invoke')
      .set('Authorization', `Bearer ${token}`)
      .send(CAAL_INVOKE_BODY);

    expect(res.status).toBe(200);
    const [path, payload] = engineClient.post.mock.calls[0];
    expect(path).toBe('/internal/runs');
    expect(payload).toEqual(
      expectedDispatch({ caalAgentId, tenantId, userId, agentId: CAAL_INVOKE_BODY.agentId }),
    );
  });

  describe('intent', () => {
    it.each(['explain', 'question', 'suggest', 'modify'])('passes %p through untouched', async (intent) => {
      const { token } = await createUserAndLogin(app, 'developer');
      await seedCaalAgent();
      completesWith({ content: 'ok' });

      await request(app)
        .post('/v1/caal/invoke')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...CAAL_INVOKE_BODY, intent });

      expect(engineClient.post.mock.calls[0][1].input.intent).toBe(intent);
    });

    it.each([['chitchat'], [undefined], [42]])(
      'coerces %p to question rather than sending it into the graph',
      async (intent) => {
        const { token } = await createUserAndLogin(app, 'developer');
        await seedCaalAgent();
        completesWith({ content: 'ok' });

        await request(app)
          .post('/v1/caal/invoke')
          .set('Authorization', `Bearer ${token}`)
          .send({ ...CAAL_INVOKE_BODY, intent });

        expect(engineClient.post.mock.calls[0][1].input.intent).toBe('question');
      },
    );
  });

  describe('session id', () => {
    it('namespaces per tenant, user and target agent', async () => {
      const { token, userId, tenantId } = await createUserAndLogin(app, 'developer');
      await seedCaalAgent();
      completesWith({ content: 'ok' });

      const res = await request(app)
        .post('/v1/caal/invoke')
        .set('Authorization', `Bearer ${token}`)
        .send(CAAL_INVOKE_BODY);

      const expected = expectedSessionId({ tenantId, userId, agentId: CAAL_INVOKE_BODY.agentId });
      expect(res.body.sessionId).toBe(expected);
      expect(engineClient.post.mock.calls[0][1].sessionId).toBe(expected);
    });

    /**
     * ISS-069: the field is a *client* id and is namespaced again here, so
     * echoing the server's own value back nested it one wrapper deeper on every
     * turn and started a fresh session with each message.
     */
    it('does not re-wrap a session id the client echoed back', async () => {
      const { token, userId, tenantId } = await createUserAndLogin(app, 'developer');
      await seedCaalAgent();
      completesWith({ content: 'ok' });

      const first = await request(app)
        .post('/v1/caal/invoke')
        .set('Authorization', `Bearer ${token}`)
        .send(CAAL_INVOKE_BODY);

      const second = await request(app)
        .post('/v1/caal/invoke')
        .set('Authorization', `Bearer ${token}`)
        .send(CAAL_INVOKE_BODY);

      expect(second.body.sessionId).toBe(first.body.sessionId);
      expect(second.body.sessionId).toBe(
        expectedSessionId({ tenantId, userId, agentId: CAAL_INVOKE_BODY.agentId }),
      );
      expect(second.body.sessionId).not.toContain(`:${first.body.sessionId}`);
    });

    it('keeps two agents in the same tenant on separate sessions', async () => {
      const { token } = await createUserAndLogin(app, 'developer');
      await seedCaalAgent();
      completesWith({ content: 'ok' });

      const a = await request(app)
        .post('/v1/caal/invoke')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...CAAL_INVOKE_BODY, agentId: 'agent-a' });
      const b = await request(app)
        .post('/v1/caal/invoke')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...CAAL_INVOKE_BODY, agentId: 'agent-b' });

      expect(a.body.sessionId).not.toBe(b.body.sessionId);
    });

    it('reads History back from the id the invoke wrote to', async () => {
      const { token, userId, tenantId } = await createUserAndLogin(app, 'developer');
      await seedCaalAgent();
      completesWith({ content: 'ok' });

      const invoked = await request(app)
        .post('/v1/caal/invoke')
        .set('Authorization', `Bearer ${token}`)
        .send(CAAL_INVOKE_BODY);

      const history = await request(app)
        .get(`/v1/caal/sessions/${CAAL_INVOKE_BODY.agentId}`)
        .set('Authorization', `Bearer ${token}`);

      // A rename on either side would silently empty the History panel.
      expect(history.status).toBe(200);
      expect(history.body.sessionId).toBe(invoked.body.sessionId);
      expect(history.body.sessionId).toBe(
        expectedSessionId({ tenantId, userId, agentId: CAAL_INVOKE_BODY.agentId }),
      );
    });
  });

  describe('the response shape Studio reads', () => {
    /**
     * response-assembler nests proposal/options/canvas* under caalResult,
     * because core:transform can only write one context key. The controller
     * flattens it back out; without that, CaalPanel sees none of them.
     */
    it('flattens caalResult to the top level', async () => {
      const { token } = await createUserAndLogin(app, 'developer');
      await seedCaalAgent();
      completesWith({
        content: 'Some advice.',
        caalResult: {
          nodeReferences: ['llm'],
          proposal: { id: 'prop_1', patches: [{ op: 'add_node' }] },
          options: { question: 'Draft one?', options: [{ label: 'Yes', value: 'create_proposal' }] },
          canvasHighlight: { nodeIds: ['llm'], color: '#F59E0B', durationMs: 2000 },
          canvasFocus: { nodeId: 'llm', zoom: 1.5 },
        },
      });

      const res = await request(app)
        .post('/v1/caal/invoke')
        .set('Authorization', `Bearer ${token}`)
        .send(CAAL_INVOKE_BODY);

      expect(res.body.output).toMatchObject({
        content: 'Some advice.',
        nodeReferences: ['llm'],
        proposal: { id: 'prop_1' },
        options: { question: 'Draft one?' },
        canvasHighlight: { nodeIds: ['llm'] },
        canvasFocus: { nodeId: 'llm' },
      });
      expect(res.body.output.caalResult).toBeUndefined();
    });

    it('passes a run with no caalResult through unchanged', async () => {
      const { token } = await createUserAndLogin(app, 'developer');
      await seedCaalAgent();
      completesWith({ content: 'Some advice.' });

      const res = await request(app)
        .post('/v1/caal/invoke')
        .set('Authorization', `Bearer ${token}`)
        .send(CAAL_INVOKE_BODY);

      expect(res.body.output).toEqual({ content: 'Some advice.' });
    });
  });

  describe('router override', () => {
    it('attaches the tenant router policy when one is configured', async () => {
      const { token, tenantId } = await createUserAndLogin(app, 'developer');
      await seedCaalAgent();
      completesWith({ content: 'ok' });

      const policyId = crypto.randomUUID();
      const policy = {
        name: 'cheap',
        strategy: 'priority',
        targets: [{ id: 't1', connectionId: 'conn-1', provider: 'anthropic', model: 'claude-haiku-4-5-20251001' }],
        triggers: [],
      };
      await db.insert(namedRouterPolicies).values({
        id: policyId,
        tenantId,
        name: 'cheap',
        configJson: JSON.stringify(policy),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await db.insert(caalConfiguration).values({
        id: crypto.randomUUID(),
        tenantId,
        enabled: true,
        routerPolicyId: policyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await request(app)
        .post('/v1/caal/invoke')
        .set('Authorization', `Bearer ${token}`)
        .send(CAAL_INVOKE_BODY);

      expect(engineClient.post.mock.calls[0][1].routerOverride).toEqual(policy);
    });

    /**
     * ISS-073: modelOverride is a bare model name with no provider or
     * connection, so there is no valid ModelRouterTarget to build from it.
     * Sending a half-built one would fail the run at the router instead of
     * falling through to the graph policy.
     */
    it('does not invent a target from a bare model override', async () => {
      const { token, tenantId } = await createUserAndLogin(app, 'developer');
      await seedCaalAgent();
      completesWith({ content: 'ok' });

      await db.insert(caalConfiguration).values({
        id: crypto.randomUUID(),
        tenantId,
        enabled: true,
        modelOverride: 'claude-opus-5',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await request(app)
        .post('/v1/caal/invoke')
        .set('Authorization', `Bearer ${token}`)
        .send(CAAL_INVOKE_BODY);

      expect(engineClient.post.mock.calls[0][1].routerOverride).toBeUndefined();
    });
  });

  describe('refusals', () => {
    it('400s an empty message before dispatching a run', async () => {
      const { token } = await createUserAndLogin(app, 'developer');
      await seedCaalAgent();

      for (const message of ['', undefined]) {
        const res = await request(app)
          .post('/v1/caal/invoke')
          .set('Authorization', `Bearer ${token}`)
          .send({ ...CAAL_INVOKE_BODY, message });

        expect(res.status).toBe(400);
      }
      expect(engineClient.post).not.toHaveBeenCalled();
    });

    it('403s with CAAL_DISABLED when the tenant turned Caal off', async () => {
      const { token, tenantId } = await createUserAndLogin(app, 'developer');
      await seedCaalAgent();

      await db.insert(caalConfiguration).values({
        id: crypto.randomUUID(),
        tenantId,
        enabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const res = await request(app)
        .post('/v1/caal/invoke')
        .set('Authorization', `Bearer ${token}`)
        .send(CAAL_INVOKE_BODY);

      expect(res.status).toBe(403);
      expect(engineClient.post).not.toHaveBeenCalled();
    });

    it('401s without a token', async () => {
      const res = await request(app).post('/v1/caal/invoke').send(CAAL_INVOKE_BODY);
      expect(res.status).toBe(401);
    });

    it('500s with the engine error when the run fails', async () => {
      const { token } = await createUserAndLogin(app, 'developer');
      await seedCaalAgent();
      engineClient.post.mockResolvedValue({ data: { runId: 'run_caal_1' } });
      engineClient.get.mockResolvedValue({
        data: { status: 'failed', error: { code: 'AGENT_LOOP_ERROR', message: 'boom' } },
      });

      const res = await request(app)
        .post('/v1/caal/invoke')
        .set('Authorization', `Bearer ${token}`)
        .send(CAAL_INVOKE_BODY);

      expect(res.status).toBe(500);
    });
  });
});

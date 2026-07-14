import request from 'supertest';
import * as crypto from 'node:crypto';
import { eq, and } from 'drizzle-orm';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { db } from '@/db/client';
import { sessions, sessionContext, sessionRunLinks } from '@/db/schema';
import { config } from '@/config';

jest.mock('../../src/lib/engine-client', () => ({
  engineClient: {
    post: jest.fn().mockResolvedValue({ data: {} }),
    get: jest.fn().mockResolvedValue({ data: {} }),
  },
}));

const app = createApp();
const INTERNAL = config.masterKey;

beforeAll(async () => {
  await runMigrations();
});

async function createAgent(token: string, handle: string): Promise<string> {
  const res = await request(app)
    .post('/v1/agents')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'Session Agent', handle });
  return res.body.id as string;
}

async function seedSession(
  agentId: string,
  tenantId: string,
  overrides: Partial<{ status: 'active' | 'stale_schema' | 'expired'; expiresAt: Date }> = {},
): Promise<string> {
  const id = crypto.randomUUID();
  const now = new Date();
  await db.insert(sessions).values({
    id,
    agentId,
    tenantId,
    schemaVersion: 1,
    status: overrides.status ?? 'active',
    lastActiveAt: now,
    expiresAt: overrides.expiresAt ?? new Date(now.getTime() + 86_400_000),
    createdAt: now,
  });
  return id;
}

async function contextOf(sessionId: string, key: string): Promise<unknown> {
  const rows = await db
    .select()
    .from(sessionContext)
    .where(and(eq(sessionContext.sessionId, sessionId), eq(sessionContext.key, key)));
  return rows[0] ? JSON.parse(rows[0].valueJson) : undefined;
}

describe('GET /v1/agents/:id/sessions', () => {
  it('lists only this tenant + agent, newest active first', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `sess-list-${Date.now()}`);
    await seedSession(agentId, tenantId);
    await seedSession(agentId, tenantId, { status: 'expired' });

    const res = await request(app)
      .get(`/v1/agents/${agentId}/sessions`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it('filters by status', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `sess-filter-${Date.now()}`);
    await seedSession(agentId, tenantId);
    await seedSession(agentId, tenantId, { status: 'stale_schema' });

    const res = await request(app)
      .get(`/v1/agents/${agentId}/sessions?status=stale_schema`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.body).toHaveLength(1);
    expect(res.body[0].status).toBe('stale_schema');
  });

  it('ignores an unknown status filter rather than erroring', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `sess-badfilter-${Date.now()}`);
    await seedSession(agentId, tenantId);

    const res = await request(app)
      .get(`/v1/agents/${agentId}/sessions?status=bogus`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  it('requires auth', async () => {
    const res = await request(app).get('/v1/agents/x/sessions');
    expect(res.status).toBe(401);
  });
});

describe('GET /v1/agents/:id/sessions/:sid', () => {
  it('returns the session with its parsed context entries', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `sess-get-${Date.now()}`);
    const sid = await seedSession(agentId, tenantId);

    await db.insert(sessionContext).values({
      id: crypto.randomUUID(),
      sessionId: sid,
      key: 'messages',
      valueJson: JSON.stringify([{ role: 'user', content: 'hi' }]),
      accumulatedCount: 1,
      accumulationType: 'append',
      schemaVersion: 1,
      updatedAt: new Date(),
    });

    const res = await request(app)
      .get(`/v1/agents/${agentId}/sessions/${sid}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.session.id).toBe(sid);
    expect(res.body.contextEntries.messages).toEqual([{ role: 'user', content: 'hi' }]);
  });

  it("404s on another tenant's session", async () => {
    const alice = await createUserAndLogin(app, 'developer');
    const bob = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(alice.token, `sess-xt-${Date.now()}`);
    const sid = await seedSession(agentId, alice.tenantId);

    const res = await request(app)
      .get(`/v1/agents/${agentId}/sessions/${sid}`)
      .set('Authorization', `Bearer ${bob.token}`);

    expect(res.status).toBe(404);
  });
});

describe('GET /v1/agents/:id/sessions/:sid/runs', () => {
  it('lists run links in position order', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `sess-runs-${Date.now()}`);
    const sid = await seedSession(agentId, tenantId);

    for (const [i, runId] of ['run-a', 'run-b'].entries()) {
      await db.insert(sessionRunLinks).values({
        id: crypto.randomUUID(),
        sessionId: sid,
        runId,
        position: i + 1,
        createdAt: new Date(),
      });
    }

    const res = await request(app)
      .get(`/v1/agents/${agentId}/sessions/${sid}/runs`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.map((r: { runId: string }) => r.runId)).toEqual(['run-a', 'run-b']);
  });

  it('404s for an unknown session', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .get('/v1/agents/a/sessions/nope/runs')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });
});

describe('DELETE /v1/agents/:id/sessions/:sid', () => {
  it('removes the session and its context and run links', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `sess-del-${Date.now()}`);
    const sid = await seedSession(agentId, tenantId);

    await db.insert(sessionContext).values({
      id: crypto.randomUUID(),
      sessionId: sid,
      key: 'k',
      valueJson: '"v"',
      accumulatedCount: 1,
      accumulationType: 'replace',
      schemaVersion: 1,
      updatedAt: new Date(),
    });

    const res = await request(app)
      .delete(`/v1/agents/${agentId}/sessions/${sid}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
    expect(await db.select().from(sessions).where(eq(sessions.id, sid))).toHaveLength(0);
    expect(
      await db.select().from(sessionContext).where(eq(sessionContext.sessionId, sid)),
    ).toHaveLength(0);
  });

  it("404s on another tenant's session", async () => {
    const alice = await createUserAndLogin(app, 'developer');
    const bob = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(alice.token, `sess-delxt-${Date.now()}`);
    const sid = await seedSession(agentId, alice.tenantId);

    const res = await request(app)
      .delete(`/v1/agents/${agentId}/sessions/${sid}`)
      .set('Authorization', `Bearer ${bob.token}`);

    expect(res.status).toBe(404);
    // ...and the session survives
    expect(await db.select().from(sessions).where(eq(sessions.id, sid))).toHaveLength(1);
  });
});

describe('POST /v1/agents/:id/sessions/:sid/reset', () => {
  it('clears context but keeps the session', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `sess-reset-${Date.now()}`);
    const sid = await seedSession(agentId, tenantId);

    await db.insert(sessionContext).values({
      id: crypto.randomUUID(),
      sessionId: sid,
      key: 'k',
      valueJson: '"v"',
      accumulatedCount: 1,
      accumulationType: 'replace',
      schemaVersion: 1,
      updatedAt: new Date(),
    });

    const res = await request(app)
      .post(`/v1/agents/${agentId}/sessions/${sid}/reset`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(
      await db.select().from(sessionContext).where(eq(sessionContext.sessionId, sid)),
    ).toHaveLength(0);
    expect(await db.select().from(sessions).where(eq(sessions.id, sid))).toHaveLength(1);
  });

  it('404s for an unknown session', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .post('/v1/agents/a/sessions/nope/reset')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });
});

// Session config declaring schema v2 with a v1→v2 rename (messages → history)
const V2_SESSION_CONFIG = {
  enabled: true,
  ttlSeconds: 3600,
  schemaVersion: 2,
  contextSchema: { history: { type: 'append' } },
  migrations: [{ fromVersion: 1, toVersion: 2, transform: { history: '$.messages' } }],
};

async function publishAgentWithSessionConfig(token: string, agentId: string): Promise<void> {
  const graphJson = JSON.stringify({
    version: '1.0',
    name: 'Session Migration Agent',
    entry: 'start',
    nodes: {
      start: { id: 'start', type: 'core:start', config: {} },
      end: { id: 'end', type: 'core:end', config: {} },
    },
    edges: [{ id: 'e1', from: 'start', to: 'end', type: 'unconditional' }],
    toolEdges: [],
    workspaceEdges: [],
    config: { trigger: { type: 'rest', mode: 'async' }, session: V2_SESSION_CONFIG },
  });
  const res = await request(app)
    .post(`/v1/agents/${agentId}/publish`)
    .set('Authorization', `Bearer ${token}`)
    .send({ graphJson });
  if (res.status >= 300) throw new Error(`publish failed: ${res.status} ${JSON.stringify(res.body)}`);
}

async function seedContextRow(sid: string, key: string, value: unknown): Promise<void> {
  await db.insert(sessionContext).values({
    id: crypto.randomUUID(),
    sessionId: sid,
    key,
    valueJson: JSON.stringify(value),
    accumulatedCount: Array.isArray(value) ? value.length : 1,
    accumulationType: 'append',
    schemaVersion: 1,
    updatedAt: new Date(),
  });
}

describe('POST /v1/agents/:id/sessions/migrate (ALIGN-008)', () => {
  it('applies the migration chain to behind-schema sessions', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `sess-mig-${Date.now()}`);
    await publishAgentWithSessionConfig(token, agentId);

    const v1Session = await seedSession(agentId, tenantId, { status: 'stale_schema' });
    await seedContextRow(v1Session, 'messages', [{ role: 'user', content: 'hi' }]);

    const res = await request(app)
      .post(`/v1/agents/${agentId}/sessions/migrate`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ migrated: 1, skipped: 0, failed: 0 });

    const rows = await db.select().from(sessions).where(eq(sessions.id, v1Session));
    expect(rows[0].status).toBe('active');
    expect(rows[0].schemaVersion).toBe(2);
    expect(await contextOf(v1Session, 'history')).toEqual([{ role: 'user', content: 'hi' }]);
  });

  it('400s when the agent has no session configuration', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `sess-mig-nocfg-${Date.now()}`);

    const res = await request(app)
      .post(`/v1/agents/${agentId}/sessions/migrate`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(400);
  });

  it("404s for an agent in another tenant", async () => {
    const alice = await createUserAndLogin(app, 'developer');
    const bob = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(alice.token, `sess-migxt-${Date.now()}`);

    const res = await request(app)
      .post(`/v1/agents/${agentId}/sessions/migrate`)
      .set('Authorization', `Bearer ${bob.token}`);

    expect(res.status).toBe(404);
  });
});

describe('internal session endpoints (engine → API)', () => {
  it('rejects a caller without the internal auth header', async () => {
    const res = await request(app).get('/internal/sessions/anything');
    expect(res.status).toBe(401);
  });

  it('creates a session, is idempotent, and reads it back', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `sess-int-${Date.now()}`);
    const sessionId = `sess-${Date.now()}`;

    const created = await request(app)
      .post('/internal/sessions')
      .set('X-Internal-Auth', INTERNAL)
      .send({ sessionId, agentId, tenantId, sessionConfig: { ttlSeconds: 60 } });
    expect(created.status).toBe(201);

    // Second create is a no-op, not an error
    const again = await request(app)
      .post('/internal/sessions')
      .set('X-Internal-Auth', INTERNAL)
      .send({ sessionId, agentId, tenantId, sessionConfig: {} });
    expect(again.status).toBe(409);
    expect(again.body.existing).toBe(true);

    const got = await request(app)
      .get(`/internal/sessions/${sessionId}`)
      .set('X-Internal-Auth', INTERNAL);
    expect(got.status).toBe(200);
    expect(got.body.session.id).toBe(sessionId);
    expect(got.body.contextEntries).toEqual({});
  });

  it('404s reading an unknown session', async () => {
    const res = await request(app)
      .get('/internal/sessions/does-not-exist')
      .set('X-Internal-Auth', INTERNAL);
    expect(res.status).toBe(404);
  });

  it('404s saving to an unknown session', async () => {
    const res = await request(app)
      .post('/internal/sessions/does-not-exist/save')
      .set('X-Internal-Auth', INTERNAL)
      .send({ runId: 'r1', contextData: {}, sessionConfig: {} });
    expect(res.status).toBe(404);
  });

  describe('save + context accumulation', () => {
    let agentId: string;
    let tenantId: string;
    let sid: string;

    beforeEach(async () => {
      const auth = await createUserAndLogin(app, 'developer');
      tenantId = auth.tenantId;
      agentId = await createAgent(auth.token, `sess-acc-${crypto.randomUUID().slice(0, 8)}`);
      sid = await seedSession(agentId, tenantId);
    });

    async function save(
      contextData: Record<string, unknown>,
      contextSchema: Record<string, unknown>,
      runId = 'run-1',
    ): Promise<request.Response> {
      return request(app)
        .post(`/internal/sessions/${sid}/save`)
        .set('X-Internal-Auth', INTERNAL)
        .send({ runId, contextData, sessionConfig: { contextSchema } });
    }

    it('append: creates then grows an array', async () => {
      await save({ messages: 'a' }, { messages: { type: 'append' } });
      expect(await contextOf(sid, 'messages')).toEqual(['a']);

      await save({ messages: 'b' }, { messages: { type: 'append' } });
      expect(await contextOf(sid, 'messages')).toEqual(['a', 'b']);
    });

    it('append: evicts oldest past maxItems by default', async () => {
      const schema = { m: { type: 'append', maxItems: 2 } };
      await save({ m: 'a' }, schema);
      await save({ m: 'b' }, schema);
      await save({ m: 'c' }, schema);

      expect(await contextOf(sid, 'm')).toEqual(['b', 'c']);
    });

    it('append: truncate overflow keeps the oldest instead', async () => {
      const schema = { m: { type: 'append', maxItems: 2, overflow: 'truncate' } };
      await save({ m: 'a' }, schema);
      await save({ m: 'b' }, schema);
      await save({ m: 'c' }, schema);

      expect(await contextOf(sid, 'm')).toEqual(['a', 'b']);
    });

    it('replace: overwrites the prior value', async () => {
      const schema = { k: { type: 'replace' } };
      await save({ k: 'first' }, schema);
      await save({ k: 'second' }, schema);

      expect(await contextOf(sid, 'k')).toBe('second');
    });

    it('merge: shallow-merges objects', async () => {
      const schema = { prefs: { type: 'merge' } };
      await save({ prefs: { a: 1 } }, schema);
      await save({ prefs: { b: 2 } }, schema);

      expect(await contextOf(sid, 'prefs')).toEqual({ a: 1, b: 2 });
    });

    it('merge: falls back to replace when a side is not an object', async () => {
      const schema = { p: { type: 'merge' } };
      await save({ p: { a: 1 } }, schema);
      await save({ p: 'scalar' }, schema);

      expect(await contextOf(sid, 'p')).toBe('scalar');
    });

    it('skips keys absent from the payload, and keys absent from the schema', async () => {
      await save({ known: 'v', unknown: 'ignored' }, { known: { type: 'replace' }, other: { type: 'replace' } });

      expect(await contextOf(sid, 'known')).toBe('v');
      expect(await contextOf(sid, 'unknown')).toBeUndefined();
      expect(await contextOf(sid, 'other')).toBeUndefined();
    });

    it('_session_clear_all wipes every entry', async () => {
      await save({ k: 'v' }, { k: { type: 'replace' } });
      await save({ _session_clear_all: true }, {});

      expect(await contextOf(sid, 'k')).toBeUndefined();
    });

    it('_session_clear_keys wipes only the named entries', async () => {
      const schema = { a: { type: 'replace' }, b: { type: 'replace' } };
      await save({ a: '1', b: '2' }, schema);
      await save({ _session_clear_keys: ['a'] }, {});

      expect(await contextOf(sid, 'a')).toBeUndefined();
      expect(await contextOf(sid, 'b')).toBe('2');
    });

    it('records rootRunId from the first run only', async () => {
      await save({}, {}, 'run-first');
      await save({}, {}, 'run-second');

      const rows = await db.select().from(sessions).where(eq(sessions.id, sid));
      expect(rows[0].rootRunId).toBe('run-first');
    });
  });

  it('records run links with increasing positions', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `sess-link-${Date.now()}`);
    const sid = await seedSession(agentId, tenantId);

    for (const runId of ['r1', 'r2', 'r3']) {
      const res = await request(app)
        .post(`/internal/sessions/${sid}/run-link`)
        .set('X-Internal-Auth', INTERNAL)
        .send({ runId });
      expect(res.status).toBe(200);
    }

    const links = await db
      .select()
      .from(sessionRunLinks)
      .where(eq(sessionRunLinks.sessionId, sid));
    expect(links.map((l) => l.position).sort()).toEqual([1, 2, 3]);
  });

  it('expires only active sessions past their expiry', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `sess-exp-${Date.now()}`);

    const past = await seedSession(agentId, tenantId, { expiresAt: new Date(Date.now() - 1000) });
    const future = await seedSession(agentId, tenantId, {
      expiresAt: new Date(Date.now() + 3_600_000),
    });

    const res = await request(app)
      .post('/internal/sessions/expire')
      .set('X-Internal-Auth', INTERNAL);
    expect(res.status).toBe(200);

    const expired = await db.select().from(sessions).where(eq(sessions.id, past));
    const alive = await db.select().from(sessions).where(eq(sessions.id, future));
    expect(expired[0].status).toBe('expired');
    expect(alive[0].status).toBe('active');
  });
});

describe('POST /internal/sessions/:sid/load (ALIGN-008)', () => {
  it('migrates a behind-schema session on load and returns the new context', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `sess-load-${Date.now()}`);
    const sid = await seedSession(agentId, tenantId); // schemaVersion 1
    await seedContextRow(sid, 'messages', [{ role: 'user', content: 'v1 message' }]);

    const res = await request(app)
      .post(`/internal/sessions/${sid}/load`)
      .set('X-Internal-Auth', INTERNAL)
      .send({ agentId, tenantId, sessionConfig: V2_SESSION_CONFIG });

    expect(res.status).toBe(200);
    expect(res.body.session.schemaVersion).toBe(2);
    expect(res.body.session.status).toBe('active');
    expect(res.body.contextEntries.history).toEqual([{ role: 'user', content: 'v1 message' }]);
  });

  it('marks the session stale_schema when no migration path exists', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `sess-stale-${Date.now()}`);
    const sid = await seedSession(agentId, tenantId); // schemaVersion 1
    await seedContextRow(sid, 'messages', ['unchanged']);

    const res = await request(app)
      .post(`/internal/sessions/${sid}/load`)
      .set('X-Internal-Auth', INTERNAL)
      .send({
        agentId,
        tenantId,
        sessionConfig: { ...V2_SESSION_CONFIG, schemaVersion: 3, migrations: [] },
      });

    expect(res.status).toBe(200);
    expect(res.body.session.status).toBe('stale_schema');
    expect(res.body.session.schemaVersion).toBe(1);
    // context is returned as-is so the session keeps functioning (§14.5)
    expect(res.body.contextEntries.messages).toEqual(['unchanged']);
  });

  it('404s when agent or tenant do not own the session (§14.7)', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `sess-own-${Date.now()}`);
    const sid = await seedSession(agentId, tenantId);

    const res = await request(app)
      .post(`/internal/sessions/${sid}/load`)
      .set('X-Internal-Auth', INTERNAL)
      .send({ agentId: 'someone-elses-agent', tenantId, sessionConfig: V2_SESSION_CONFIG });

    expect(res.status).toBe(404);
  });

  it('does not re-migrate an up-to-date session', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `sess-utd-${Date.now()}`);
    const sid = await seedSession(agentId, tenantId);
    await db.update(sessions).set({ schemaVersion: 2 }).where(eq(sessions.id, sid));
    await seedContextRow(sid, 'history', ['already v2']);

    const res = await request(app)
      .post(`/internal/sessions/${sid}/load`)
      .set('X-Internal-Auth', INTERNAL)
      .send({ agentId, tenantId, sessionConfig: V2_SESSION_CONFIG });

    expect(res.status).toBe(200);
    expect(res.body.session.schemaVersion).toBe(2);
    expect(res.body.contextEntries.history).toEqual(['already v2']);
  });
});

describe('POST /internal/sessions/:sid/run-link (ALIGN-009)', () => {
  it('records ordered run links and the child-run flag', async () => {
    const { token, tenantId } = await createUserAndLogin(app, 'developer');
    const agentId = await createAgent(token, `sess-link-${Date.now()}`);
    const sid = await seedSession(agentId, tenantId);

    const first = await request(app)
      .post(`/internal/sessions/${sid}/run-link`)
      .set('X-Internal-Auth', INTERNAL)
      .send({ runId: 'run-parent' });
    expect(first.status).toBe(200);

    const second = await request(app)
      .post(`/internal/sessions/${sid}/run-link`)
      .set('X-Internal-Auth', INTERNAL)
      .send({ runId: 'run-child', isChildRun: true });
    expect(second.status).toBe(200);

    const links = await db
      .select()
      .from(sessionRunLinks)
      .where(eq(sessionRunLinks.sessionId, sid));

    expect(links).toHaveLength(2);
    const parent = links.find((l) => l.runId === 'run-parent')!;
    const child = links.find((l) => l.runId === 'run-child')!;
    expect(parent.position).toBe(1);
    expect(parent.isChildRun).toBe(false);
    expect(child.position).toBe(2);
    expect(child.isChildRun).toBe(true);
  });
});

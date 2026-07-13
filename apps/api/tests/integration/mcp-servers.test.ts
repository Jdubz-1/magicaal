import request from 'supertest';
import { eq } from 'drizzle-orm';
import { createApp } from '../../src/app';
import { runMigrations } from '../../src/db/migrate';
import { createUserAndLogin } from '../helpers/auth-helpers';
import { db } from '@/db/client';
import { mcpServers } from '@/db/schema';

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

async function createStdio(token: string): Promise<string> {
  const res = await request(app)
    .post('/v1/mcp-servers')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'local-tools',
      transport: 'stdio',
      command: 'node',
      args: ['server.js'],
      env: { API_KEY: 'secret' },
    });
  expect(res.status).toBe(201);
  return res.body.id as string;
}

describe('MCP server registration', () => {
  it('registers a stdio server and returns args and env', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const id = await createStdio(token);

    const got = await request(app)
      .get(`/v1/mcp-servers/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(got.status).toBe(200);
    expect(got.body.transport).toBe('stdio');
    expect(got.body.command).toBe('node');
    expect(got.body.args).toEqual(['server.js']);
    expect(got.body.env).toEqual({ API_KEY: 'secret' });
    expect(got.body.url).toBeNull();

    const list = await request(app)
      .get('/v1/mcp-servers')
      .set('Authorization', `Bearer ${token}`);
    expect(list.body).toHaveLength(1);
  });

  it('registers an http server', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const res = await request(app)
      .post('/v1/mcp-servers')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'remote', transport: 'http', url: 'https://mcp.example.com' });

    expect(res.status).toBe(201);
    expect(res.body.url).toBe('https://mcp.example.com');
    // no args/env supplied — stored as null rather than "[]"
    expect(res.body.args).toBeNull();
    expect(res.body.env).toBeNull();
    expect(res.body.command).toBeNull();
  });

  it('400s without name or transport', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const res = await request(app)
      .post('/v1/mcp-servers')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'nameless' });
    expect(res.status).toBe(400);
  });

  it('400s when http transport has no url', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const res = await request(app)
      .post('/v1/mcp-servers')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'x', transport: 'http' });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('url');
  });

  it('400s when stdio transport has no command', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const res = await request(app)
      .post('/v1/mcp-servers')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'x', transport: 'stdio' });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('command');
  });

  it('deletes a server', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const id = await createStdio(token);

    const res = await request(app)
      .delete(`/v1/mcp-servers/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
    expect(await db.select().from(mcpServers).where(eq(mcpServers.id, id))).toHaveLength(0);
  });

  it('404s reading, deleting, or testing an unknown server', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const auth = { Authorization: `Bearer ${token}` };

    expect((await request(app).get('/v1/mcp-servers/ghost').set(auth)).status).toBe(404);
    expect((await request(app).delete('/v1/mcp-servers/ghost').set(auth)).status).toBe(404);
    expect((await request(app).post('/v1/mcp-servers/ghost/test').set(auth)).status).toBe(404);
  });

  it("404s on another tenant's server", async () => {
    const alice = await createUserAndLogin(app, 'tenant_admin');
    const bob = await createUserAndLogin(app, 'tenant_admin');
    const id = await createStdio(alice.token);

    const res = await request(app)
      .get(`/v1/mcp-servers/${id}`)
      .set('Authorization', `Bearer ${bob.token}`);
    expect(res.status).toBe(404);
  });

  it('requires tenant_admin to register (SSRF surface)', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .post('/v1/mcp-servers')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'x', transport: 'http', url: 'http://internal' });
    expect(res.status).toBe(403);
  });
});

describe('POST /v1/mcp-servers/:id/test', () => {
  it('proxies the connectivity test to the engine and records the timestamp', async () => {
    const { token } = await createUserAndLogin(app, 'tenant_admin');
    const id = await createStdio(token);

    engineClient.post.mockResolvedValue({ data: { ok: true, tools: ['search'] } });

    const res = await request(app)
      .post(`/v1/mcp-servers/${id}/test`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.tools).toEqual(['search']);

    // the stored args/env are parsed back out for the engine
    expect(engineClient.post).toHaveBeenCalledWith(
      '/internal/mcp-servers/test',
      expect.objectContaining({
        transport: 'stdio',
        command: 'node',
        args: ['server.js'],
        env: { API_KEY: 'secret' },
      }),
    );

    const rows = await db.select().from(mcpServers).where(eq(mcpServers.id, id));
    expect(rows[0].lastTestedAt).not.toBeNull();
  });

  it('requires tenant_admin', async () => {
    const { token } = await createUserAndLogin(app, 'developer');
    const res = await request(app)
      .post('/v1/mcp-servers/any/test')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
  });
});

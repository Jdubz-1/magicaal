import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import Database from 'better-sqlite3';

const dbFile = path.join(
  fs.mkdtempSync(path.join(os.tmpdir(), 'magicaal-invauth-')),
  'primary.db',
);

jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

jest.mock('@/config', () => ({
  config: { databasePath: `file:${dbFile}` },
}));

// The rate limiter is Redis-backed; count the increments so we can assert a
// request is limited exactly once.
const incr = jest.fn<Promise<number>, [string]>().mockResolvedValue(1);
jest.mock('@/queue/client', () => ({
  redis: {
    incr: (k: string) => incr(k),
    expire: jest.fn().mockResolvedValue(1),
  },
}));

import { validateInvocationRequest } from '@/auth/invocation-auth';

const AGENT = 'agent-1';
const TENANT = 'tenant-1';

function sha256(v: string): string {
  return crypto.createHash('sha256').update(v).digest('hex');
}

/** Minimal slice of the primary schema that invocation auth reads. */
function seed(): Database.Database {
  const db = new Database(dbFile);
  // The engine opens this DB read-only and asserts WAL; a read-only connection
  // can only do that if the mode is already set (in production the API sets it).
  db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE agents (id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, enabled INTEGER NOT NULL DEFAULT 1);
    CREATE TABLE invocation_keys (
      id TEXT PRIMARY KEY,
      agent_id TEXT NOT NULL,
      tenant_id TEXT NOT NULL,
      key_hash TEXT NOT NULL,
      revoked INTEGER NOT NULL DEFAULT 0,
      expires_at INTEGER
    );
    CREATE TABLE invocation_policies (
      agent_id TEXT PRIMARY KEY,
      strategy TEXT NOT NULL,
      jwt_config TEXT,
      rate_limit TEXT
    );
  `);
  db.prepare('INSERT INTO agents (id, tenant_id, enabled) VALUES (?, ?, 1)').run(AGENT, TENANT);
  db.prepare('INSERT INTO agents (id, tenant_id, enabled) VALUES (?, ?, 1)').run('agent-2', TENANT);
  return db;
}

let db: Database.Database;

beforeAll(() => {
  db = seed();
});

afterAll(() => {
  db.close();
  fs.rmSync(path.dirname(dbFile), { recursive: true, force: true });
});

beforeEach(() => {
  incr.mockClear().mockResolvedValue(1);
  db.exec('DELETE FROM invocation_keys; DELETE FROM invocation_policies;');
});

function addKey(
  key: string,
  opts: { agentId?: string; revoked?: boolean; expiresAt?: number | null } = {},
): string {
  const id = crypto.randomUUID();
  db.prepare(
    `INSERT INTO invocation_keys (id, agent_id, tenant_id, key_hash, revoked, expires_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(
    id,
    opts.agentId ?? AGENT,
    TENANT,
    sha256(key),
    opts.revoked ? 1 : 0,
    opts.expiresAt ?? null,
  );
  return id;
}

function setPolicy(strategy: 'api-key' | 'jwt' | 'public', jwtConfig?: object): void {
  db.prepare(
    'INSERT INTO invocation_policies (agent_id, strategy, jwt_config) VALUES (?, ?, ?)',
  ).run(AGENT, strategy, jwtConfig ? JSON.stringify(jwtConfig) : null);
}

describe('api-key strategy (the default when no policy is set)', () => {
  it('accepts a valid key and resolves the agent and tenant', async () => {
    const key = 'ik_valid';
    const keyId = addKey(key);

    const result = await validateInvocationRequest(AGENT, `Bearer ${key}`);

    expect(result).toEqual({
      keyId,
      agentId: AGENT,
      tenantId: TENANT,
      strategy: 'api-key',
    });
    expect(incr).toHaveBeenCalledTimes(1); // rate-limited exactly once
  });

  it('is case-insensitive about the Bearer scheme', async () => {
    const key = 'ik_case';
    addKey(key);
    await expect(validateInvocationRequest(AGENT, `bearer ${key}`)).resolves.toMatchObject({
      strategy: 'api-key',
    });
  });

  it('rejects a key issued for a different agent', async () => {
    const key = 'ik_other_agent';
    addKey(key, { agentId: 'agent-2' });

    await expect(validateInvocationRequest(AGENT, `Bearer ${key}`)).rejects.toMatchObject({
      status: 401,
      code: 'INVALID_KEY',
    });
  });

  it('rejects a revoked key', async () => {
    const key = 'ik_revoked';
    addKey(key, { revoked: true });

    await expect(validateInvocationRequest(AGENT, `Bearer ${key}`)).rejects.toMatchObject({
      code: 'INVALID_KEY',
    });
  });

  it('rejects an expired key', async () => {
    const key = 'ik_expired';
    addKey(key, { expiresAt: Math.floor(Date.now() / 1000) - 60 });

    await expect(validateInvocationRequest(AGENT, `Bearer ${key}`)).rejects.toMatchObject({
      status: 401,
      code: 'KEY_EXPIRED',
    });
  });

  it('accepts a key whose expiry is still ahead', async () => {
    const key = 'ik_future';
    addKey(key, { expiresAt: Math.floor(Date.now() / 1000) + 3600 });

    await expect(validateInvocationRequest(AGENT, `Bearer ${key}`)).resolves.toMatchObject({
      strategy: 'api-key',
    });
  });

  it('rejects an unknown key', async () => {
    await expect(validateInvocationRequest(AGENT, 'Bearer ik_nope')).rejects.toMatchObject({
      code: 'INVALID_KEY',
    });
  });

  it('rejects a missing Authorization header', async () => {
    await expect(validateInvocationRequest(AGENT, undefined)).rejects.toMatchObject({
      status: 401,
      code: 'MISSING_AUTH',
    });
  });

  it('does not consume rate-limit budget on a rejected credential', async () => {
    await expect(validateInvocationRequest(AGENT, 'Bearer ik_nope')).rejects.toThrow();
    expect(incr).not.toHaveBeenCalled();
  });

  it('429s once the per-agent limit is exceeded', async () => {
    const key = 'ik_ratelimited';
    addKey(key);
    incr.mockResolvedValue(1001); // over RATE_LIMIT_RPM

    await expect(validateInvocationRequest(AGENT, `Bearer ${key}`)).rejects.toMatchObject({
      status: 429,
      code: 'RATE_LIMITED',
    });
  });
});

describe('public strategy', () => {
  it('authenticates with no credential at all', async () => {
    setPolicy('public');

    const result = await validateInvocationRequest(AGENT, undefined);

    expect(result).toEqual({
      keyId: 'public',
      agentId: AGENT,
      tenantId: TENANT,
      strategy: 'public',
    });
    expect(incr).toHaveBeenCalledTimes(1); // still rate-limited
  });

  it('404s for a disabled agent', async () => {
    setPolicy('public');
    db.prepare('UPDATE agents SET enabled = 0 WHERE id = ?').run(AGENT);

    await expect(validateInvocationRequest(AGENT, undefined)).rejects.toMatchObject({
      status: 404,
      code: 'AGENT_NOT_FOUND',
    });

    db.prepare('UPDATE agents SET enabled = 1 WHERE id = ?').run(AGENT);
  });
});

describe('jwt strategy', () => {
  it('500s when the strategy is set but no jwtConfig was stored', async () => {
    setPolicy('jwt');

    await expect(validateInvocationRequest(AGENT, 'Bearer some.jwt.token')).rejects.toMatchObject({
      status: 500,
      code: 'JWT_CONFIG_MISSING',
    });
  });

  it('rejects a malformed token before reaching the IdP', async () => {
    setPolicy('jwt', { jwksUrl: 'https://idp.example.com/.well-known/jwks.json' });

    await expect(validateInvocationRequest(AGENT, 'Bearer not-a-jwt')).rejects.toMatchObject({
      status: 401,
    });
  });

  it('still requires a credential', async () => {
    setPolicy('jwt', { jwksUrl: 'https://idp.example.com/.well-known/jwks.json' });

    await expect(validateInvocationRequest(AGENT, undefined)).rejects.toMatchObject({
      code: 'MISSING_AUTH',
    });
  });
});

import * as crypto from 'node:crypto';
import Database from 'better-sqlite3';
import { config } from '../config';
import { redis } from '../queue/client';

let sqlite: Database.Database | null = null;

function getDb(): Database.Database {
  if (!sqlite) {
    const dbPath = config.databasePath.replace(/^file:/, '');
    sqlite = new Database(dbPath, { readonly: true });
    sqlite.pragma('journal_mode = WAL');
  }
  return sqlite;
}

function sha256hex(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

interface InvocationKeyRow {
  id: string;
  agent_id: string;
  tenant_id: string;
  expires_at: number | null;
}

export interface ValidatedKey {
  keyId: string;
  agentId: string;
  tenantId: string;
}

const RATE_LIMIT_RPM = 1000;

export async function validateInvocationKey(
  agentId: string,
  rawKey: string,
): Promise<ValidatedKey> {
  const keyHash = sha256hex(rawKey);
  const db = getDb();

  const row = db
    .prepare(
      `SELECT id, agent_id, tenant_id, expires_at
       FROM invocation_keys
       WHERE agent_id = ? AND key_hash = ? AND revoked = 0`,
    )
    .get(agentId, keyHash) as InvocationKeyRow | undefined;

  if (!row) {
    throw Object.assign(new Error('Invalid or revoked invocation key'), {
      status: 401,
      code: 'INVALID_KEY',
    });
  }

  if (row.expires_at && row.expires_at < Math.floor(Date.now() / 1000)) {
    throw Object.assign(new Error('Invocation key expired'), {
      status: 401,
      code: 'KEY_EXPIRED',
    });
  }

  const window = Math.floor(Date.now() / 60000);
  const rateLimitKey = `ratelimit:${agentId}:${window}`;
  const count = await redis.incr(rateLimitKey);
  if (count === 1) {
    await redis.expire(rateLimitKey, 60);
  }
  if (count > RATE_LIMIT_RPM) {
    throw Object.assign(new Error('Rate limit exceeded'), {
      status: 429,
      code: 'RATE_LIMITED',
    });
  }

  return { keyId: row.id, agentId: row.agent_id, tenantId: row.tenant_id };
}

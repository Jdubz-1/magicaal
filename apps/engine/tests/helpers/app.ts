import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { createPrimaryDb } from './primary-db';

/**
 * Computed once per test file, before any mock factory runs — this is the
 * `databasePath` every engine module's lazy read-only connection resolves
 * against (see tests/unit/marketplace/startup-reload.test.ts and
 * tests/unit/auth/invocation-auth.test.ts for the same pattern).
 */
export const dbFile = createPrimaryDb();

/** Package installs write here instead of the production /data/packages. */
export const packagesDir = fs.mkdtempSync(path.join(os.tmpdir(), 'magicaal-engine-packages-'));

jest.mock('@/lib/logger', () => ({
  logger: {
    info: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

// pino-http wraps @/lib/logger with real pino internals (levels, child(), …)
// that a plain jest.fn() stub can't satisfy — swap the whole middleware for a
// pass-through instead of trying to fake pino's shape.
jest.mock('@/middleware/requestLogger', () => ({
  requestLogger: (_req: unknown, _res: unknown, next: () => void) => next(),
}));

jest.mock('@/config', () => {
  const actual = jest.requireActual('@/config') as { config: Record<string, unknown> };
  return {
    config: {
      ...actual.config,
      databasePath: `file:${dbFile}`,
      packagesDir,
      marketplaceAllowUnverified: false,
    },
  };
});

/**
 * queue/client.ts opens a real Redis connection and three BullMQ Queues at
 * import time — merely importing the app under Jest would open sockets and
 * leave open handles. Every route the queue backs (dispatch, schedule,
 * cancel, install) asserts against these fakes instead of a live broker.
 */
/**
 * Map-backed so key semantics (SET NX, GET after SET) behave like ioredis —
 * the ALIGN-010 session lock depends on them. Still jest.fn()s so route tests
 * can assert on calls.
 */
export const redisStore = new Map<string, string>();

export const queueMocks = {
  redis: {
    incr: jest.fn(async (key: string) => {
      const next = Number(redisStore.get(key) ?? '0') + 1;
      redisStore.set(key, String(next));
      return next;
    }),
    expire: jest.fn().mockResolvedValue(1),
    decr: jest.fn(async (key: string) => {
      const next = Number(redisStore.get(key) ?? '0') - 1;
      redisStore.set(key, String(next));
      return next;
    }),
    set: jest.fn(async (key: string, value: string, ...args: unknown[]) => {
      if (args.includes('NX') && redisStore.has(key)) return null;
      redisStore.set(key, value);
      return 'OK';
    }),
    get: jest.fn(async (key: string) => redisStore.get(key) ?? null),
    del: jest.fn(async (key: string) => (redisStore.delete(key) ? 1 : 0)),
    publish: jest.fn().mockResolvedValue(1),
  },
  runTriggerQueue: { add: jest.fn().mockResolvedValue(undefined) },
  runScheduledQueue: {
    add: jest.fn().mockResolvedValue(undefined),
    getRepeatableJobs: jest.fn().mockResolvedValue([]),
    removeRepeatableByKey: jest.fn().mockResolvedValue(undefined),
  },
  runRetryQueue: { add: jest.fn().mockResolvedValue(undefined) },
};

jest.mock('@/queue/client', () => queueMocks);

import { createApp } from '@/app';
import { config } from '@/config';
import { runTelemetryMigrations } from '@/db/telemetry-migrate';
import { registerNodes, registerIntegrations, registerAdapters } from '@/registry/startup';
import type { Application } from 'express';

let bootstrapped = false;

/**
 * Mirrors src/index.ts's boot sequence up to app.listen() — createApp() alone
 * wires only the HTTP layer. Without this, /internal/nodes and
 * /internal/integrations answer empty, and telemetry routes 500 because the
 * telemetry DB has no tables yet.
 */
export async function buildTestApp(): Promise<Application> {
  if (!bootstrapped) {
    await runTelemetryMigrations();
    registerNodes();
    registerIntegrations();
    registerAdapters();
    bootstrapped = true;
  }
  return createApp();
}

export function internalAuthHeader(): Record<string, string> {
  return { 'X-Internal-Auth': config.masterKey };
}

export function resetQueueMocks(): void {
  redisStore.clear();
  Object.values(queueMocks.redis).forEach((fn) => (fn as jest.Mock).mockClear());
  queueMocks.runTriggerQueue.add.mockClear();
  queueMocks.runScheduledQueue.add.mockClear();
  queueMocks.runScheduledQueue.getRepeatableJobs.mockClear().mockResolvedValue([]);
  queueMocks.runScheduledQueue.removeRepeatableByKey.mockClear();
  queueMocks.runRetryQueue.add.mockClear();
}

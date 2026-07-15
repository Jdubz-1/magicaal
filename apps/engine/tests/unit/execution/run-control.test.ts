const redisStore = new Map<string, string>();

jest.mock('@/queue/client', () => ({
  redis: {
    set: jest.fn(async (key: string, value: string, ...args: unknown[]) => {
      // Mirror ioredis semantics for the NX flag: no-op returning null when
      // the key already exists.
      if (args.includes('NX') && redisStore.has(key)) return null;
      redisStore.set(key, value);
      return 'OK';
    }),
    get: jest.fn(async (key: string) => redisStore.get(key) ?? null),
    del: jest.fn(async (key: string) => {
      redisStore.delete(key);
    }),
    incr: jest.fn(async (key: string) => {
      const next = Number(redisStore.get(key) ?? '0') + 1;
      redisStore.set(key, String(next));
      return next;
    }),
    decr: jest.fn(async (key: string) => {
      const next = Number(redisStore.get(key) ?? '0') - 1;
      redisStore.set(key, String(next));
      return next;
    }),
    expire: jest.fn(async () => 1),
  },
  runTriggerQueue: { add: jest.fn() },
  runScheduledQueue: { add: jest.fn() },
  runRetryQueue: { add: jest.fn() },
}));

import {
  requestAbort,
  checkAbort,
  clearAbort,
  abortError,
  startRunDeadline,
  planRetry,
  acquireRunSlot,
  releaseRunSlot,
  admissionDecision,
  acquireSessionLock,
  stealSessionLock,
  releaseSessionLock,
} from '@/execution/run-control';

beforeEach(() => {
  redisStore.clear();
});

describe('run-control abort flag (ALIGN-001/002)', () => {
  it('round-trips the abort reason and clears', async () => {
    expect(await checkAbort('r1')).toBeNull();

    await requestAbort('r1', 'cancelled');
    expect(await checkAbort('r1')).toBe('cancelled');

    await clearAbort('r1');
    expect(await checkAbort('r1')).toBeNull();
  });

  it('builds typed abort errors', () => {
    expect(abortError('cancelled')).toMatchObject({ code: 'RUN_CANCELLED', retryable: false });
    expect(abortError('timeout')).toMatchObject({ code: 'RUN_TIMEOUT', retryable: false });
  });
});

describe('startRunDeadline (ALIGN-002)', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('sets the timeout abort flag when the deadline fires', async () => {
    startRunDeadline('r-timeout', 5_000);

    jest.advanceTimersByTime(5_001);
    // let the async requestAbort settle
    await Promise.resolve();

    expect(await checkAbort('r-timeout')).toBe('timeout');
  });

  it('does not fire once disarmed', async () => {
    const disarm = startRunDeadline('r-ok', 5_000);
    disarm();

    jest.advanceTimersByTime(10_000);
    await Promise.resolve();

    expect(await checkAbort('r-ok')).toBeNull();
  });
});

describe('planRetry (ALIGN-004)', () => {
  const retryable = { retryable: true, failedNodeId: 'node-x' };

  it('declines when the error is not retryable or the node is unknown', () => {
    expect(planRetry({ retryable: false, failedNodeId: 'node-x' }, { maxAttempts: 3 }, {})).toBeNull();
    expect(planRetry({ retryable: true }, { maxAttempts: 3 }, {})).toBeNull();
  });

  it('declines with no retry config (default maxAttempts 1)', () => {
    expect(planRetry(retryable, undefined, {})).toBeNull();
  });

  it('plans attempts until maxAttempts is exhausted', () => {
    expect(planRetry(retryable, { maxAttempts: 3, backoff: 'fixed', delayMs: 100 }, {})).toEqual({
      failedNodeId: 'node-x',
      attemptsMade: 1,
      delayMs: 100,
    });
    expect(
      planRetry(retryable, { maxAttempts: 3, backoff: 'fixed', delayMs: 100 }, { 'node-x': 1 }),
    ).toEqual({ failedNodeId: 'node-x', attemptsMade: 2, delayMs: 100 });
    // third execution of a maxAttempts:3 node — no further retry
    expect(
      planRetry(retryable, { maxAttempts: 3, backoff: 'fixed', delayMs: 100 }, { 'node-x': 2 }),
    ).toBeNull();
  });

  it('doubles the delay per attempt with exponential backoff', () => {
    const cfg = { maxAttempts: 4, backoff: 'exponential' as const, delayMs: 200 };
    expect(planRetry(retryable, cfg, {})?.delayMs).toBe(200);
    expect(planRetry(retryable, cfg, { 'node-x': 1 })?.delayMs).toBe(400);
    expect(planRetry(retryable, cfg, { 'node-x': 2 })?.delayMs).toBe(800);
  });

  it('tracks attempts per node independently', () => {
    const cfg = { maxAttempts: 2, backoff: 'fixed' as const, delayMs: 50 };
    expect(planRetry(retryable, cfg, { 'other-node': 5 })).toEqual({
      failedNodeId: 'node-x',
      attemptsMade: 1,
      delayMs: 50,
    });
  });
});

describe('session lock (ALIGN-010)', () => {
  it('grants the lock to the first run and reports the holder on conflict', async () => {
    expect(await acquireSessionLock('s1', 'run-a')).toEqual({ acquired: true });
    expect(await acquireSessionLock('s1', 'run-b')).toEqual({
      acquired: false,
      holderRunId: 'run-a',
    });
  });

  it('re-acquires for the same run (resume re-dispatch)', async () => {
    await acquireSessionLock('s1', 'run-a');
    expect(await acquireSessionLock('s1', 'run-a')).toEqual({ acquired: true });
  });

  it('release is value-checked — another run cannot free the holder', async () => {
    await acquireSessionLock('s1', 'run-a');
    await releaseSessionLock('s1', 'run-b');
    expect(await acquireSessionLock('s1', 'run-c')).toEqual({
      acquired: false,
      holderRunId: 'run-a',
    });

    await releaseSessionLock('s1', 'run-a');
    expect(await acquireSessionLock('s1', 'run-c')).toEqual({ acquired: true });
  });

  it('steal overwrites a stale holder', async () => {
    await acquireSessionLock('s1', 'run-dead');
    await stealSessionLock('s1', 'run-new');
    expect(await acquireSessionLock('s1', 'run-other')).toEqual({
      acquired: false,
      holderRunId: 'run-new',
    });
  });

  it('locks are per-session', async () => {
    await acquireSessionLock('s1', 'run-a');
    expect(await acquireSessionLock('s2', 'run-b')).toEqual({ acquired: true });
  });
});

describe('concurrency slots + admission (ALIGN-003)', () => {
  it('counts tenant and agent occupancy across acquire/release', async () => {
    expect(await acquireRunSlot('t1', 'a1')).toEqual({ tenant: 1, agent: 1 });
    expect(await acquireRunSlot('t1', 'a2')).toEqual({ tenant: 2, agent: 1 });
    expect(await acquireRunSlot('t1', 'a1')).toEqual({ tenant: 3, agent: 2 });

    await releaseRunSlot('t1', 'a1');
    expect(await acquireRunSlot('t1', 'a1')).toEqual({ tenant: 3, agent: 2 });
  });

  it('admits runs under both limits', () => {
    expect(
      admissionDecision({
        slots: { tenant: 3, agent: 1 },
        tenantCap: 10,
        maxParallel: 2,
        enqueuedAt: Date.now(),
      }),
    ).toBe('run');
  });

  it('defers when over the tenant cap or agent maxParallel', () => {
    expect(
      admissionDecision({
        slots: { tenant: 11, agent: 1 },
        tenantCap: 10,
        enqueuedAt: Date.now(),
      }),
    ).toBe('defer');
    expect(
      admissionDecision({
        slots: { tenant: 2, agent: 3 },
        tenantCap: 10,
        maxParallel: 2,
        enqueuedAt: Date.now(),
      }),
    ).toBe('defer');
  });

  it('fails with queue_timeout once the wait exceeds queueTimeout', () => {
    const now = Date.now();
    expect(
      admissionDecision({
        slots: { tenant: 11, agent: 1 },
        tenantCap: 10,
        enqueuedAt: now - 31_000,
        queueTimeoutMs: 30_000,
        now,
      }),
    ).toBe('queue_timeout');
    // Still within the allowed wait — keep deferring
    expect(
      admissionDecision({
        slots: { tenant: 11, agent: 1 },
        tenantCap: 10,
        enqueuedAt: now - 10_000,
        queueTimeoutMs: 30_000,
        now,
      }),
    ).toBe('defer');
  });
});

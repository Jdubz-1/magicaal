const redisStore = new Map<string, string>();

jest.mock('@/queue/client', () => ({
  redis: {
    set: jest.fn(async (key: string, value: string) => {
      redisStore.set(key, value);
    }),
    get: jest.fn(async (key: string) => redisStore.get(key) ?? null),
    del: jest.fn(async (key: string) => {
      redisStore.delete(key);
    }),
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

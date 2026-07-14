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

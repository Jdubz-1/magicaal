import { computeRetryPlan, parseRetryAfterMs } from '../../src/retry';
import type { RetryConfig } from '../../src/types';

const FIXED: RetryConfig = { maxAttempts: 3, backoff: 'fixed', delayMs: 100 };
const EXPO: RetryConfig = { maxAttempts: 4, backoff: 'exponential', delayMs: 200 };

describe('computeRetryPlan (ALIGN-023)', () => {
  it('retries network errors and 429/5xx by default', () => {
    expect(computeRetryPlan({ status: undefined, attempt: 1, config: FIXED }).retry).toBe(true);
    expect(computeRetryPlan({ status: 429, attempt: 1, config: FIXED }).retry).toBe(true);
    expect(computeRetryPlan({ status: 503, attempt: 1, config: FIXED }).retry).toBe(true);
    expect(computeRetryPlan({ status: 500, attempt: 1, config: FIXED }).retry).toBe(true);
  });

  it('never retries 4xx client errors by default', () => {
    expect(computeRetryPlan({ status: 400, attempt: 1, config: FIXED }).retry).toBe(false);
    expect(computeRetryPlan({ status: 404, attempt: 1, config: FIXED }).retry).toBe(false);
    expect(computeRetryPlan({ status: 409, attempt: 1, config: FIXED }).retry).toBe(false);
  });

  it('stops once maxAttempts is exhausted', () => {
    expect(computeRetryPlan({ status: 503, attempt: 2, config: FIXED }).retry).toBe(true);
    expect(computeRetryPlan({ status: 503, attempt: 3, config: FIXED }).retry).toBe(false);
  });

  it('retryOn overrides the default set', () => {
    const cfg: RetryConfig = { ...FIXED, retryOn: ['503'] };
    expect(computeRetryPlan({ status: 503, attempt: 1, config: cfg }).retry).toBe(true);
    expect(computeRetryPlan({ status: 429, attempt: 1, config: cfg }).retry).toBe(false);
    expect(computeRetryPlan({ status: undefined, attempt: 1, config: cfg }).retry).toBe(false);

    const withNetwork: RetryConfig = { ...FIXED, retryOn: ['network'] };
    expect(computeRetryPlan({ status: undefined, attempt: 1, config: withNetwork }).retry).toBe(true);
  });

  it('computes fixed and exponential backoff delays', () => {
    expect(computeRetryPlan({ status: 503, attempt: 1, config: FIXED }).delayMs).toBe(100);
    expect(computeRetryPlan({ status: 503, attempt: 2, config: FIXED }).delayMs).toBe(100);

    expect(computeRetryPlan({ status: 503, attempt: 1, config: EXPO }).delayMs).toBe(200);
    expect(computeRetryPlan({ status: 503, attempt: 2, config: EXPO }).delayMs).toBe(400);
    expect(computeRetryPlan({ status: 503, attempt: 3, config: EXPO }).delayMs).toBe(800);
  });

  it('a server-provided retryAfterMs beats the configured backoff', () => {
    expect(
      computeRetryPlan({ status: 429, attempt: 1, config: EXPO, retryAfterMs: 1234 }).delayMs,
    ).toBe(1234);
  });
});

describe('parseRetryAfterMs', () => {
  it('parses delta-seconds', () => {
    expect(parseRetryAfterMs('2')).toBe(2000);
    expect(parseRetryAfterMs('0')).toBe(0);
  });

  it('parses an HTTP-date relative to now', () => {
    const now = Date.parse('2026-07-15T00:00:00Z');
    expect(parseRetryAfterMs('Wed, 15 Jul 2026 00:00:05 GMT', now)).toBe(5000);
  });

  it('returns undefined for absent or garbage values', () => {
    expect(parseRetryAfterMs(undefined)).toBeUndefined();
    expect(parseRetryAfterMs('soon')).toBeUndefined();
  });
});

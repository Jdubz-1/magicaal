import { parseRateLimitHeaders, isRateLimited } from '../../src/rate-limit';

const NOW = 1_700_000_000_000; // fixed epoch ms

describe('parseRateLimitHeaders', () => {
  it('parses X-RateLimit-* with an epoch-seconds reset (GitHub style)', () => {
    const headers = new Headers({
      'X-RateLimit-Limit': '5000',
      'X-RateLimit-Remaining': '4999',
      'X-RateLimit-Reset': '1700000060',
    });
    const info = parseRateLimitHeaders(headers, NOW);
    expect(info.limit).toBe(5000);
    expect(info.remaining).toBe(4999);
    expect(info.resetAt).toBe(1_700_000_060_000);
  });

  it('parses RateLimit-* (IETF draft) with a delta-seconds reset', () => {
    const headers = new Headers({
      'RateLimit-Limit': '100',
      'RateLimit-Remaining': '0',
      'RateLimit-Reset': '30',
    });
    const info = parseRateLimitHeaders(headers, NOW);
    expect(info.limit).toBe(100);
    expect(info.remaining).toBe(0);
    expect(info.resetAt).toBe(NOW + 30_000);
  });

  it('parses Retry-After delta seconds (Slack style)', () => {
    const headers = new Headers({ 'Retry-After': '12' });
    const info = parseRateLimitHeaders(headers, NOW);
    expect(info.retryAfterMs).toBe(12_000);
  });

  it('parses Retry-After HTTP-date form', () => {
    const headers = new Headers({ 'Retry-After': new Date(NOW + 45_000).toUTCString() });
    const info = parseRateLimitHeaders(headers, NOW);
    // toUTCString truncates milliseconds — allow 1s tolerance
    expect(info.retryAfterMs).toBeGreaterThanOrEqual(44_000);
    expect(info.retryAfterMs).toBeLessThanOrEqual(45_000);
  });

  it('returns empty info when no headers are present', () => {
    const info = parseRateLimitHeaders(new Headers(), NOW);
    expect(info).toEqual({});
  });
});

describe('isRateLimited', () => {
  it('true on 429 regardless of headers', () => {
    expect(isRateLimited(429, {})).toBe(true);
  });

  it('true when remaining is 0 with a known reset', () => {
    expect(isRateLimited(200, { remaining: 0, resetAt: NOW + 1000 })).toBe(true);
  });

  it('false for a normal response', () => {
    expect(isRateLimited(200, { remaining: 10 })).toBe(false);
  });
});

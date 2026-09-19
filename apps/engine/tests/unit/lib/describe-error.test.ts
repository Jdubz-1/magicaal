import { describeError } from '@/lib/describe-error';

/**
 * `fetch` reports every transport failure as the bare string "fetch failed"
 * and puts the reason in `err.cause`, so a Caal turn that died before reaching
 * the provider logged nothing but "fetch failed" — unattributable to DNS, a
 * refused socket or an unreachable address family.
 */
describe('describeError', () => {
  it("names the cause undici hides behind 'fetch failed'", () => {
    const aggregate = new AggregateError([
      Object.assign(new Error('connect ENETUNREACH 2607:6bc0::10:443'), { code: 'ENETUNREACH' }),
      Object.assign(new Error('connect ECONNREFUSED 160.79.104.10:443'), { code: 'ECONNREFUSED' }),
    ]);
    const err = Object.assign(new TypeError('fetch failed'), { cause: aggregate });

    const described = describeError(err);

    expect(described).toContain('fetch failed');
    expect(described).toContain('ENETUNREACH');
    expect(described).toContain('ECONNREFUSED');
  });

  it('follows a chain of causes', () => {
    const root = Object.assign(new Error('getaddrinfo EAI_AGAIN api.anthropic.com'), {
      code: 'EAI_AGAIN',
    });
    const err = Object.assign(new TypeError('fetch failed'), { cause: root });

    expect(describeError(err)).toBe('fetch failed: getaddrinfo EAI_AGAIN api.anthropic.com: EAI_AGAIN');
  });

  it('stops following a cycle rather than looping', () => {
    const a: Error & { cause?: unknown } = new Error('a');
    const b: Error & { cause?: unknown } = new Error('b');
    a.cause = b;
    b.cause = a;

    expect(describeError(a)).toBe('a: b');
  });

  it('keeps the shapes the tool path already relied on', () => {
    expect(describeError(new Error('Node type "core:nope" not found'))).toBe(
      'Node type "core:nope" not found',
    );
    expect(describeError(Object.assign(new Error('read failed'), { code: 'ETIMEDOUT' }))).toBe(
      'read failed: ETIMEDOUT',
    );
    expect(describeError(Object.assign(new Error('ECONNREFUSED'), { code: 'ECONNREFUSED' }))).toBe(
      'ECONNREFUSED',
    );
    expect(describeError('boom')).toBe('boom');
  });
});

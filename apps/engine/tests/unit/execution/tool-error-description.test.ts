jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

import { describeToolError } from '@/execution/tool-executor';

describe('describeToolError', () => {
  it('names the cause of a refused connection', () => {
    // Node wraps a failed localhost connect (::1 and 127.0.0.1) in an
    // AggregateError whose own message is empty — this logged as `err: ""`
    // and told the model nothing, so it just retried until the loop ran out.
    const aggregate = Object.assign(new AggregateError([
      Object.assign(new Error('connect ECONNREFUSED ::1:3000'), { code: 'ECONNREFUSED' }),
      Object.assign(new Error('connect ECONNREFUSED 127.0.0.1:3000'), { code: 'ECONNREFUSED' }),
    ]), { code: undefined });

    expect(describeToolError(aggregate)).toContain('ECONNREFUSED');
  });

  it('keeps an ordinary message', () => {
    expect(describeToolError(new Error('Node type "core:nope" not found'))).toBe(
      'Node type "core:nope" not found',
    );
  });

  it('appends an error code when one is present', () => {
    const err = Object.assign(new Error('read failed'), { code: 'ETIMEDOUT' });
    expect(describeToolError(err)).toBe('read failed: ETIMEDOUT');
  });

  it('does not repeat a code that is already in the message', () => {
    const err = Object.assign(new Error('ECONNREFUSED'), { code: 'ECONNREFUSED' });
    expect(describeToolError(err)).toBe('ECONNREFUSED');
  });

  it('stringifies a non-Error throw', () => {
    expect(describeToolError('boom')).toBe('boom');
  });
});

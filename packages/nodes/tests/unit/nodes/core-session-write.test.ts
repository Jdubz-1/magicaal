import { coreSessionWrite } from '../../../src/nodes/core-session-write';
import { makeMockContext } from '../../helpers/mock-context';

describe('core:session-write', () => {
  it('evaluates a value that starts with $ as an expression', async () => {
    const ctx = makeMockContext({ message: 'hi', content: 'hello' });

    await coreSessionWrite.execute(ctx, {
      writes: {
        messages:
          '$append([], [{"role": "user", "content": $.message}, {"role": "assistant", "content": $.content}])',
      },
    });

    expect(ctx.get('messages')).toEqual([
      { role: 'user', content: 'hi' },
      { role: 'assistant', content: 'hello' },
    ]);
  });

  it('stores a value that does not start with $ verbatim', async () => {
    // The $-prefix heuristic is the whole contract: a bare array literal is
    // template text, not an expression. Caal's message write regressed exactly
    // this way — the stored session filled with copies of the template string,
    // which core:llm-call then dropped, leaving the assistant with no memory.
    const ctx = makeMockContext({ message: 'hi' });

    await coreSessionWrite.execute(ctx, {
      writes: { messages: '[{"role": "user", "content": $.message}]' },
    });

    expect(ctx.get('messages')).toBe('[{"role": "user", "content": $.message}]');
  });

  it('falls back to the literal when evaluation throws', async () => {
    const ctx = makeMockContext({});

    await coreSessionWrite.execute(ctx, { writes: { broken: '$this is not( valid' } });

    expect(ctx.get('broken')).toBe('$this is not( valid');
  });

  it('writes non-string values through untouched', async () => {
    const ctx = makeMockContext({});

    await coreSessionWrite.execute(ctx, { writes: { flag: true, count: 3 } });

    expect(ctx.get('flag')).toBe(true);
    expect(ctx.get('count')).toBe(3);
  });
});

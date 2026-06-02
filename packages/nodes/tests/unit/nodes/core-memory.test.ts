import { coreMemoryRead } from '../../../src/nodes/core-memory-read';
import { coreMemoryWrite } from '../../../src/nodes/core-memory-write';
import { makeMockContext } from '../../helpers/mock-context';

describe('core:memory-read', () => {
  it('reads existing keys from context', async () => {
    const ctx = makeMockContext({ greeting: 'hello', count: 42 });
    const result = await coreMemoryRead.execute(ctx, { keys: ['greeting', 'count'] });

    expect(result.status).toBe('complete');
    expect(ctx.get('_memory_keys_read')).toEqual(['greeting', 'count']);
    expect(ctx.get('_memory_missing_keys')).toEqual([]);
  });

  it('applies defaultValues when key is missing', async () => {
    const ctx = makeMockContext({});
    await coreMemoryRead.execute(ctx, {
      keys: ['missingKey'],
      defaultValues: { missingKey: 'default-value' },
    });

    expect(ctx.get('missingKey')).toBe('default-value');
    expect(ctx.get('_memory_keys_read')).toContain('missingKey');
    expect(ctx.get('_memory_missing_keys')).toEqual([]);
  });

  it('tracks missing keys without defaults', async () => {
    const ctx = makeMockContext({});
    await coreMemoryRead.execute(ctx, { keys: ['a', 'b'] });

    expect(ctx.get('_memory_missing_keys')).toEqual(['a', 'b']);
  });

  it('fails when failIfMissing is true and a key is absent', async () => {
    const ctx = makeMockContext({});
    const result = await coreMemoryRead.execute(ctx, {
      keys: ['required'],
      failIfMissing: true,
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('MEMORY_KEYS_MISSING');
    expect(result.error?.message).toContain('required');
  });

  it('does not fail when failIfMissing is true but defaults cover the gap', async () => {
    const ctx = makeMockContext({});
    const result = await coreMemoryRead.execute(ctx, {
      keys: ['needed'],
      defaultValues: { needed: 0 },
      failIfMissing: true,
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('needed')).toBe(0);
  });
});

describe('core:memory-write', () => {
  it('writes a value using replace mode (default)', async () => {
    const ctx = makeMockContext({ x: 10 });
    const result = await coreMemoryWrite.execute(ctx, {
      writes: [{ key: 'result', valueExpression: 'x * 2' }],
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('result')).toBe(20);
    expect(ctx.get('_memory_keys_written')).toEqual(['result']);
  });

  it('appends to an array with mode "append"', async () => {
    const ctx = makeMockContext({ log: ['first'] });
    await coreMemoryWrite.execute(ctx, {
      writes: [{ key: 'log', valueExpression: '"second"', mode: 'append' }],
    });

    expect(ctx.get('log')).toEqual(['first', 'second']);
  });

  it('creates a new array when appending to a non-array key', async () => {
    const ctx = makeMockContext({});
    await coreMemoryWrite.execute(ctx, {
      writes: [{ key: 'items', valueExpression: '"first"', mode: 'append' }],
    });

    expect(ctx.get('items')).toEqual(['first']);
  });

  it('increments a counter with mode "increment"', async () => {
    const ctx = makeMockContext({ visits: 5 });
    await coreMemoryWrite.execute(ctx, {
      writes: [{ key: 'visits', valueExpression: '1', mode: 'increment' }],
    });

    expect(ctx.get('visits')).toBe(6);
  });

  it('starts increment at 0 when key does not exist', async () => {
    const ctx = makeMockContext({});
    await coreMemoryWrite.execute(ctx, {
      writes: [{ key: 'counter', valueExpression: '1', mode: 'increment' }],
    });

    expect(ctx.get('counter')).toBe(1);
  });

  it('executes multiple writes atomically', async () => {
    const ctx = makeMockContext({ a: 5, b: 10 });
    await coreMemoryWrite.execute(ctx, {
      writes: [
        { key: 'sum', valueExpression: 'a + b' },
        { key: 'product', valueExpression: 'a * b' },
      ],
    });

    expect(ctx.get('sum')).toBe(15);
    expect(ctx.get('product')).toBe(50);
    expect(ctx.get('_memory_keys_written')).toEqual(['sum', 'product']);
  });

  it('fails with a clear error when expression is invalid', async () => {
    const ctx = makeMockContext({});
    const result = await coreMemoryWrite.execute(ctx, {
      writes: [{ key: 'x', valueExpression: '$$$invalid%%%' }],
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('MEMORY_WRITE_EXPRESSION_ERROR');
  });
});

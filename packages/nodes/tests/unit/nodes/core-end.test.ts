import { coreEnd } from '../../../src/nodes/core-end';
import { makeMockContext } from '../../helpers/mock-context';

describe('core:end', () => {
  it('returns only specified outputKeys when configured', async () => {
    const ctx = makeMockContext({ result: 'done', internal: 'hidden', score: 99 });
    const result = await coreEnd.execute(ctx, { outputKeys: ['result', 'score'] });
    expect(result.status).toBe('complete');
    expect(result.outputs).toEqual({ result: 'done', score: 99 });
    expect(result.outputs).not.toHaveProperty('internal');
  });

  it('returns all context data when outputKeys is empty', async () => {
    const ctx = makeMockContext({ a: 1, b: 2 });
    const result = await coreEnd.execute(ctx, {});
    expect(result.outputs).toEqual({ a: 1, b: 2 });
  });

  it('returns all context data when outputKeys is an empty array', async () => {
    const ctx = makeMockContext({ a: 1 });
    const result = await coreEnd.execute(ctx, { outputKeys: [] });
    expect(result.outputs).toEqual({ a: 1 });
  });

  it('returns undefined for missing output keys', async () => {
    const ctx = makeMockContext({ a: 1 });
    const result = await coreEnd.execute(ctx, { outputKeys: ['missing'] });
    expect(result.outputs).toEqual({ missing: undefined });
  });

  it('strips engine-internal underscore keys when outputKeys is omitted', async () => {
    const ctx = makeMockContext({
      total: 42,
      _transform_result: 42,
      _sub_run_id: 'run_x',
      _loop_continue: false,
    });
    const result = await coreEnd.execute(ctx, {});
    expect(result.outputs).toEqual({ total: 42 });
  });

  it('keeps an internal key when it is explicitly listed in outputKeys', async () => {
    const ctx = makeMockContext({ total: 42, _sub_run_id: 'run_x' });
    const result = await coreEnd.execute(ctx, { outputKeys: ['total', '_sub_run_id'] });
    expect(result.outputs).toEqual({ total: 42, _sub_run_id: 'run_x' });
  });

  it('does not mutate the context while filtering', async () => {
    const ctx = makeMockContext({ total: 42, _transform_result: 42 });
    await coreEnd.execute(ctx, {});
    expect(ctx.data).toEqual({ total: 42, _transform_result: 42 });
  });

  it('has the correct node type', () => {
    expect(coreEnd.type).toBe('core:end');
  });
});

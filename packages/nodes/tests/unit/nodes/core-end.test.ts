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

  it('has the correct node type', () => {
    expect(coreEnd.type).toBe('core:end');
  });
});

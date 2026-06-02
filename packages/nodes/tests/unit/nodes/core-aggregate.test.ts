import { coreAggregate } from '../../../src/nodes/core-aggregate';
import { makeMockContext } from '../../helpers/mock-context';

describe('core:aggregate', () => {
  it('counts array elements', async () => {
    const ctx = makeMockContext({ nums: [1, 2, 3, 4, 5] });
    const result = await coreAggregate.execute(ctx, {
      inputKey: 'nums',
      operation: 'count',
      outputKey: 'total',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('total')).toBe(5);
  });

  it('sums array of numbers', async () => {
    const ctx = makeMockContext({ nums: [10, 20, 30] });
    await coreAggregate.execute(ctx, { inputKey: 'nums', operation: 'sum', outputKey: 'sum' });
    expect(ctx.get('sum')).toBe(60);
  });

  it('finds min and max', async () => {
    const ctx = makeMockContext({ nums: [3, 1, 4, 1, 5] });
    await coreAggregate.execute(ctx, { inputKey: 'nums', operation: 'min', outputKey: 'minVal' });
    expect(ctx.get('minVal')).toBe(1);

    await coreAggregate.execute(ctx, { inputKey: 'nums', operation: 'max', outputKey: 'maxVal' });
    expect(ctx.get('maxVal')).toBe(5);
  });

  it('collects array unchanged', async () => {
    const ctx = makeMockContext({ items: ['a', 'b'] });
    await coreAggregate.execute(ctx, { inputKey: 'items', operation: 'collect', outputKey: 'all' });
    expect(ctx.get('all')).toEqual(['a', 'b']);
  });

  it('sums using valueKey from objects', async () => {
    const ctx = makeMockContext({ orders: [{ total: 10 }, { total: 20 }, { total: 30 }] });
    await coreAggregate.execute(ctx, {
      inputKey: 'orders',
      operation: 'sum',
      outputKey: 'revenue',
      valueKey: 'total',
    });
    expect(ctx.get('revenue')).toBe(60);
  });

  it('fails when input is not an array', async () => {
    const ctx = makeMockContext({ bad: 'string' });
    const result = await coreAggregate.execute(ctx, {
      inputKey: 'bad',
      operation: 'sum',
      outputKey: 'result',
    });
    expect(result.status).toBe('failed');
  });
});

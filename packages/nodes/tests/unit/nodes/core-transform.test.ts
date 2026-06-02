import { coreTransform } from '../../../src/nodes/core-transform';
import { makeMockContext } from '../../helpers/mock-context';

describe('core:transform', () => {
  it('evaluates expression and writes to outputKey', async () => {
    const ctx = makeMockContext({ items: [1, 2, 3] });
    const result = await coreTransform.execute(ctx, {
      expression: 'items[0]',
      outputKey: 'firstItem',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('firstItem')).toBe(1);
    expect(result.outputs.firstItem).toBe(1);
  });

  it('sets _transform_result', async () => {
    const ctx = makeMockContext({ x: 10 });
    await coreTransform.execute(ctx, { expression: 'x * 2', outputKey: 'doubled' });

    expect(ctx.get('_transform_result')).toBe(20);
  });
});

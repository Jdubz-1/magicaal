import { coreRouter } from '../../../src/nodes/core-router';
import { makeMockContext } from '../../helpers/mock-context';

describe('core:router', () => {
  it('evaluates expression and sets _route in outputs', async () => {
    const ctx = makeMockContext({ category: 'high' });
    const result = await coreRouter.execute(ctx, {
      expression: '$.category',
      cases: ['low', 'medium', 'high'],
    });
    expect(result.status).toBe('complete');
    expect(result.outputs._route).toBe('high');
  });

  it('writes _route to context', async () => {
    const ctx = makeMockContext({ tier: 'premium' });
    await coreRouter.execute(ctx, { expression: '$.tier', cases: ['free', 'premium'] });
    expect(ctx._data._route).toBe('premium');
  });

  it('stores the route even when it does not match any declared case', async () => {
    const ctx = makeMockContext({ status: 'unknown' });
    const result = await coreRouter.execute(ctx, {
      expression: '$.status',
      cases: ['active', 'inactive'],
    });
    expect(result.outputs._route).toBe('unknown');
  });

  it('coerces numeric expression result to string', async () => {
    const ctx = makeMockContext({ code: 3 });
    const result = await coreRouter.execute(ctx, { expression: '$.code', cases: ['1', '2', '3'] });
    expect(result.outputs._route).toBe('3');
  });

  it('has the correct node type', () => {
    expect(coreRouter.type).toBe('core:router');
  });
});

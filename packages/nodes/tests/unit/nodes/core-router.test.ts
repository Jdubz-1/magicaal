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

  it('throws when config uses a field the node does not recognize instead of expression (ISS-080 regression)', async () => {
    const ctx = makeMockContext({ intent: 'question' });
    // agents/caal.agent.ts once configured this node with `routeKey` instead
    // of `expression` — jsonata(undefined) throws at construction, so this
    // node failed on every single invocation, before any downstream node
    // ever ran. Asserting the throw here documents the exact failure mode a
    // future config-name typo on this node would reproduce.
    await expect(
      coreRouter.execute(ctx, { routeKey: '$.intent' } as unknown as { expression: string; cases: string[] }),
    ).rejects.toThrow();
  });
});

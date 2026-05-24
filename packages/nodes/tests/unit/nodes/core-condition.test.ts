import { coreCondition } from '../../../src/nodes/core-condition';
import { makeMockContext } from '../../helpers/mock-context';

describe('core:condition', () => {
  it('sets _condition to true when expression evaluates truthy', async () => {
    const ctx = makeMockContext({ score: 10 });
    const result = await coreCondition.execute(ctx, { expression: '$.score > 5' });
    expect(result.status).toBe('complete');
    expect(result.outputs._condition).toBe(true);
    expect(ctx.get('_condition')).toBe(true);
  });

  it('sets _condition to false when expression evaluates falsy', async () => {
    const ctx = makeMockContext({ score: 1 });
    const result = await coreCondition.execute(ctx, { expression: '$.score > 5' });
    expect(result.outputs._condition).toBe(false);
    expect(ctx.get('_condition')).toBe(false);
  });

  it('evaluates boolean literal true', async () => {
    const ctx = makeMockContext({});
    const result = await coreCondition.execute(ctx, { expression: 'true' });
    expect(result.outputs._condition).toBe(true);
  });

  it('evaluates boolean literal false', async () => {
    const ctx = makeMockContext({});
    const result = await coreCondition.execute(ctx, { expression: 'false' });
    expect(result.outputs._condition).toBe(false);
  });

  it('writes _condition to context', async () => {
    const ctx = makeMockContext({ active: true });
    await coreCondition.execute(ctx, { expression: '$.active' });
    expect(ctx._data._condition).toBe(true);
  });

  it('has the correct node type', () => {
    expect(coreCondition.type).toBe('core:condition');
  });
});

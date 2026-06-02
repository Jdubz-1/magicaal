import { coreValidate } from '../../../src/nodes/core-validate';
import { makeMockContext } from '../../helpers/mock-context';

describe('core:validate', () => {
  const schema = {
    type: 'object',
    required: ['name', 'age'],
    properties: {
      name: { type: 'string', minLength: 1 },
      age: { type: 'number', minimum: 0, maximum: 150 },
    },
  };

  it('passes valid input', async () => {
    const ctx = makeMockContext({ user: { name: 'Alice', age: 30 } });
    const result = await coreValidate.execute(ctx, { inputKey: 'user', schema });

    expect(result.status).toBe('complete');
    expect(ctx.get('_valid')).toBe(true);
    expect(ctx.get('_errors')).toEqual([]);
  });

  it('reports missing required field', async () => {
    const ctx = makeMockContext({ user: { name: 'Bob' } });
    await coreValidate.execute(ctx, { inputKey: 'user', schema });

    expect(ctx.get('_valid')).toBe(false);
    const errors = ctx.get<{ path: string; message: string }[]>('_errors') ?? [];
    expect(errors.some((e) => e.path.includes('age'))).toBe(true);
  });

  it('reports type mismatch', async () => {
    const ctx = makeMockContext({ user: { name: 123, age: 30 } });
    await coreValidate.execute(ctx, { inputKey: 'user', schema });

    expect(ctx.get('_valid')).toBe(false);
  });

  it('reports minimum violation', async () => {
    const ctx = makeMockContext({ user: { name: 'Eve', age: -5 } });
    await coreValidate.execute(ctx, { inputKey: 'user', schema });

    expect(ctx.get('_valid')).toBe(false);
  });
});

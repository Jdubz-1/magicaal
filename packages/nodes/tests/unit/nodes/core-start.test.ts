import { coreStart } from '../../../src/nodes/core-start';
import { makeMockContext } from '../../helpers/mock-context';

describe('core:start', () => {
  it('returns all input context keys as outputs', async () => {
    const ctx = makeMockContext({ message: 'hello', count: 3 });
    const result = await coreStart.execute(ctx, {});
    expect(result.status).toBe('complete');
    expect(result.outputs).toEqual({ message: 'hello', count: 3 });
  });

  it('returns an empty outputs object when context is empty', async () => {
    const ctx = makeMockContext({});
    const result = await coreStart.execute(ctx, {});
    expect(result.status).toBe('complete');
    expect(result.outputs).toEqual({});
  });

  it('does not mutate context data', async () => {
    const ctx = makeMockContext({ x: 1 });
    await coreStart.execute(ctx, {});
    expect(ctx.data).toEqual({ x: 1 });
  });

  it('has the correct node type', () => {
    expect(coreStart.type).toBe('core:start');
  });
});

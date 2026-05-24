import { coreStop } from '../../../src/nodes/core-stop';
import { makeMockContext } from '../../helpers/mock-context';

describe('core:stop', () => {
  it('returns complete status with _terminated: true', async () => {
    const ctx = makeMockContext({});
    const result = await coreStop.execute(ctx, {});
    expect(result.status).toBe('complete');
    expect(result.outputs._terminated).toBe(true);
  });

  it('includes the default reason in outputs', async () => {
    const ctx = makeMockContext({});
    const result = await coreStop.execute(ctx, {});
    expect(result.outputs.reason).toBe('Stopped');
  });

  it('includes a custom reason when configured', async () => {
    const ctx = makeMockContext({});
    const result = await coreStop.execute(ctx, { reason: 'Limit exceeded' });
    expect(result.outputs.reason).toBe('Limit exceeded');
  });

  it('has the correct node type', () => {
    expect(coreStop.type).toBe('core:stop');
  });
});

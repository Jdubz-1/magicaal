import { coreWait } from '../../../src/nodes/core-wait';
import { makeMockContext } from '../../helpers/mock-context';

function setCurrentNodeId(ctx: ReturnType<typeof makeMockContext>, nodeId: string): void {
  (ctx as unknown as Record<string, unknown>)._currentNodeId = nodeId;
}

describe('core:wait — delay mode', () => {
  it('sleeps in-process for a delay at or below the suspend threshold', async () => {
    const ctx = makeMockContext({});
    const result = await coreWait.execute(ctx, { mode: 'delay', delayMs: 10 });

    expect(result.status).toBe('complete');
    expect(result.outputs._wait_timed_out).toBe(false);
    expect(ctx.suspend).not.toHaveBeenCalled();
  });

  it('suspends instead of blocking above the threshold, with a wait_-prefixed token and a resumeAt hint', async () => {
    const ctx = makeMockContext({});
    setCurrentNodeId(ctx, 'wait1');

    const result = await coreWait.execute(ctx, { mode: 'delay', delayMs: 60_000 });

    expect(result.status).toBe('suspended');
    expect(ctx.suspend).toHaveBeenCalledTimes(1);
    const [reviewId, opts] = (ctx.suspend as jest.Mock).mock.calls[0] as [string, { resumeAt: number }];
    expect(reviewId).toMatch(/^wait_/);
    expect(opts.resumeAt).toBeGreaterThan(Date.now() + 59_000);
    expect(opts.resumeAt).toBeLessThanOrEqual(Date.now() + 60_000);
  });

  it('completes without re-suspending when resumed (node-scoped resume flag already set)', async () => {
    const ctx = makeMockContext({});
    setCurrentNodeId(ctx, 'wait1');

    // First execution suspends and stamps the resume markers.
    await coreWait.execute(ctx, { mode: 'delay', delayMs: 60_000 });
    (ctx.suspend as jest.Mock).mockClear();

    // Resumed execution: same node, resume flag already in ctx.data.
    const result = await coreWait.execute(ctx, { mode: 'delay', delayMs: 60_000 });

    expect(result.status).toBe('complete');
    expect(ctx.suspend).not.toHaveBeenCalled();
    expect(typeof result.outputs._wait_elapsed_ms).toBe('number');
  });

  it('scopes the resume flag per node — two Wait nodes suspend independently', async () => {
    const ctxA = makeMockContext({});
    setCurrentNodeId(ctxA, 'waitA');
    await coreWait.execute(ctxA, { mode: 'delay', delayMs: 60_000 });

    // Share the same underlying data object the way a real resumed run would
    // (checkpointed ctx.data carried into the next execution), but this time
    // as node "waitB" — must suspend again, not skip straight to complete.
    const ctxB = makeMockContext(ctxA.data);
    setCurrentNodeId(ctxB, 'waitB');
    const result = await coreWait.execute(ctxB, { mode: 'delay', delayMs: 60_000 });

    expect(result.status).toBe('suspended');
  });
});

describe('core:wait — condition mode (unchanged)', () => {
  it('polls in-process and completes once the condition is met', async () => {
    const ctx = makeMockContext({ ready: true });
    const result = await coreWait.execute(ctx, {
      mode: 'condition',
      condition: 'ready',
      pollIntervalMs: 5,
      timeoutMs: 1000,
    });

    expect(result.status).toBe('complete');
    expect(result.outputs._wait_timed_out).toBe(false);
    expect(ctx.suspend).not.toHaveBeenCalled();
  });

  it('times out and reports _wait_timed_out without suspending', async () => {
    const ctx = makeMockContext({ ready: false });
    const result = await coreWait.execute(ctx, {
      mode: 'condition',
      condition: 'ready',
      pollIntervalMs: 5,
      timeoutMs: 20,
    });

    expect(result.status).toBe('complete');
    expect(result.outputs._wait_timed_out).toBe(true);
    expect(ctx.suspend).not.toHaveBeenCalled();
  });
});

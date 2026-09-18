import { ExecutionContextImpl } from '@/execution/context';

function ctxWith(input: Record<string, unknown> = {}): ExecutionContextImpl {
  return new ExecutionContextImpl({
    runId: 'run-1',
    agentId: 'agent-1',
    tenantId: '_platform',
    triggerType: 'caal',
    input,
  });
}

describe('ExecutionContextImpl.sessionWrites', () => {
  it('excludes loaded session values once the baseline is reset', () => {
    // The scheduler loads stored session keys through set(); posting those back
    // appended every list onto itself for a run that never rewrote them.
    const ctx = ctxWith();
    ctx.set('messages', [{ role: 'user', content: 'stored' }]);
    ctx.resetWriteTracking();

    expect(ctx.sessionWrites()).toEqual({});
    expect(ctx.get('messages')).toEqual([{ role: 'user', content: 'stored' }]);
  });

  it('includes only keys written after the baseline', () => {
    const ctx = ctxWith();
    ctx.set('messages', ['stored']);
    ctx.resetWriteTracking();

    ctx.set('messages', ['new turn']);
    ctx.set('lastProposal', { id: 'p1' });

    expect(ctx.sessionWrites()).toEqual({
      messages: ['new turn'],
      lastProposal: { id: 'p1' },
    });
  });

  it('counts a rewrite to an identical value as a write', () => {
    // session-write may legitimately store the same value again; only the
    // loader's baseline is exempt.
    const ctx = ctxWith();
    ctx.set('counter', 1);
    ctx.resetWriteTracking();
    ctx.set('counter', 1);

    expect(ctx.sessionWrites()).toEqual({ counter: 1 });
  });

  it('excludes keys seeded from the run input', () => {
    // A resumed run starts from its checkpoint; re-saving it would double the
    // stored lists a second time.
    const ctx = ctxWith({ messages: ['restored'], userPrompt: 'hi' });

    expect(ctx.sessionWrites()).toEqual({});

    ctx.set('content', 'answer');
    expect(ctx.sessionWrites()).toEqual({ content: 'answer' });
  });

  it('reports written keys for the worker to carry back from a fork branch', () => {
    const ctx = ctxWith({ seeded: true });
    ctx.set('loaded', 'baseline');
    ctx.resetWriteTracking();
    ctx.set('branchResult', 42);

    expect(ctx.writtenKeys()).toEqual(['branchResult']);
  });

  it('omits a written key that was later deleted from the context', () => {
    const ctx = ctxWith();
    ctx.set('scratch', 'value');
    delete (ctx.data as Record<string, unknown>).scratch;

    expect(ctx.sessionWrites()).toEqual({});
  });
});

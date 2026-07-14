jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

import { ExecutionContextImpl } from '@/execution/context';

function makeCtx(sessionId?: string): ExecutionContextImpl {
  return new ExecutionContextImpl({
    runId: 'run-parent',
    agentId: 'agent-parent',
    tenantId: 'tenant-1',
    triggerType: 'api',
    input: {},
    sessionId,
  });
}

describe('dispatchSubRun session propagation (ALIGN-009)', () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ runId: 'run-child' }),
    });
  });

  it('forwards the parent sessionId to the child dispatch', async () => {
    const ctx = makeCtx('tenant-1:agent-parent:thread-42');
    await ctx.dispatchSubRun('agent-child', { q: 1 }, { await: false });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const body = JSON.parse((fetchMock.mock.calls[0][1] as { body: string }).body) as Record<string, unknown>;
    expect(body.sessionId).toBe('tenant-1:agent-parent:thread-42');
    expect(body.agentId).toBe('agent-child');
    expect(body.parentRunId).toBe('run-parent');
    expect(body.caller).toEqual({ kind: 'platform', strategy: 'sub-graph' });
  });

  it('omits sessionId for sessionless parents', async () => {
    const ctx = makeCtx(undefined);
    await ctx.dispatchSubRun('agent-child', {}, { await: false });

    const body = JSON.parse((fetchMock.mock.calls[0][1] as { body: string }).body) as Record<string, unknown>;
    expect('sessionId' in body).toBe(false);
  });
});

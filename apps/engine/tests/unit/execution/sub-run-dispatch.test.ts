jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

import type { ModelRouterConfig } from '@magicaal/core';
import { ExecutionContextImpl } from '@/execution/context';

const ROUTER: ModelRouterConfig = {
  strategy: 'priority',
  targets: [{ id: 'primary', connectionId: 'conn-1', provider: 'anthropic', model: 'claude-sonnet-5' }],
  triggers: [],
};

const originalFetch = global.fetch;
let fetchMock: jest.Mock;

beforeEach(() => {
  fetchMock = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ runId: 'child-run' }),
  });
  global.fetch = fetchMock as unknown as typeof fetch;
});

afterEach(() => {
  global.fetch = originalFetch;
});

function ctxFor(tenantId: string): ExecutionContextImpl {
  return new ExecutionContextImpl({
    runId: 'run-1',
    agentId: 'agent-1',
    tenantId,
    triggerType: 'caal',
    input: {},
    credentialTenantId: 'tenant-a',
    runRouterOverride: ROUTER,
  });
}

function postedBody(): Record<string, unknown> {
  const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
  return JSON.parse(init.body as string) as Record<string, unknown>;
}

describe('dispatchSubRun dispatch fields', () => {
  it('forwards the credential tenant and router override for a platform run', async () => {
    const ctx = ctxFor('_platform');

    await ctx.dispatchSubRun('child-agent', { x: 1 }, { await: false });

    expect(postedBody()).toMatchObject({
      credentialTenantId: 'tenant-a',
      routerOverride: ROUTER,
    });
  });

  it("forwards neither from an ordinary tenant's run", async () => {
    // A run override outranks a node's own inline router, so inheriting one
    // would silently replace a child agent's deliberate model choice — and the
    // credential substitution is only honoured for platform runs anyway.
    const ctx = ctxFor('tenant-b');

    await ctx.dispatchSubRun('child-agent', { x: 1 }, { await: false });

    const body = postedBody();
    expect(body.credentialTenantId).toBeUndefined();
    expect(body.routerOverride).toBeUndefined();
    expect(body.tenantId).toBe('tenant-b');
  });
});

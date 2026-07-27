import { routedLLMCall, initPricingCache, resolveRouterConfig } from '../../../src/router/router-engine';
import { providerAdapterRegistry } from '../../../src/router/provider-adapter-registry';
import type { ProviderAdapter } from '@magicaal/sdk-node';
import type { ResolvedCredentials } from '@magicaal/sdk-node';
import type {
  CanonicalLLMRequest,
  CanonicalLLMResponse,
  ModelRouterConfig,
  ModelRouterTarget,
} from '@magicaal/core';
import type { ExecutionContextImpl } from '../../../src/execution/context';

const MOCK_TARGET_A: ModelRouterTarget = {
  id: 'target-a',
  connectionId: 'conn-a',
  provider: 'mock',
  model: 'mock-model-a',
};

const MOCK_TARGET_B: ModelRouterTarget = {
  id: 'target-b',
  connectionId: 'conn-b',
  provider: 'mock',
  model: 'mock-model-b',
};

const MOCK_CREDENTIALS: ResolvedCredentials = { type: 'apikey', apiKey: 'test-key' };

function makeResponse(target: ModelRouterTarget): CanonicalLLMResponse {
  return {
    content: `Response from ${target.id}`,
    stopReason: 'end_turn',
    usage: { promptTokens: 10, completionTokens: 20, estimatedCostUsd: 0 },
    routingMeta: { targetUsed: target, attemptCount: 1, triggerHistory: [] },
  };
}

function makeCtx(connCredentials: Record<string, ResolvedCredentials>): ExecutionContextImpl {
  return {
    runId: 'test-run',
    agentId: 'test-agent',
    tenantId: 'test-tenant',
    triggerType: 'api',
    credentials: connCredentials,
    emit: jest.fn(),
    log: jest.fn(),
  } as unknown as ExecutionContextImpl;
}

describe('routedLLMCall', () => {
  beforeEach(() => {
    initPricingCache();
    // Register a mock provider
    if (!providerAdapterRegistry.has('mock')) {
      const mockAdapter: ProviderAdapter = {
        provider: 'mock',
        call: jest.fn().mockResolvedValue(makeResponse(MOCK_TARGET_A)),
        stream: jest.fn() as unknown as ProviderAdapter['stream'],
        translateError: jest.fn().mockReturnValue(null),
      };
      providerAdapterRegistry.register(mockAdapter);
    }
  });

  const mockAdapter = () => providerAdapterRegistry.get('mock') as jest.Mocked<ProviderAdapter>;

  const baseRequest: CanonicalLLMRequest = {
    messages: [{ role: 'user', content: 'Hello' }],
  };

  it('calls the first target with priority strategy', async () => {
    const config: ModelRouterConfig = {
      strategy: 'priority',
      targets: [MOCK_TARGET_A, MOCK_TARGET_B],
      triggers: [],
    };

    const ctx = makeCtx({ 'conn-a': MOCK_CREDENTIALS });
    const result = await routedLLMCall(baseRequest, config, ctx);

    expect(result.content).toContain('target-a');
    expect(result.routingMeta.attemptCount).toBe(1);
    expect(result.routingMeta.targetUsed.id).toBe('target-a');
  });

  it('falls back to target-b when target-a 429s and trigger is configured', async () => {
    const adapter = mockAdapter();
    const rateLimitError = Object.assign(new Error('rate limited'), {
      status: 429,
      _providerError: true,
    });

    (adapter.call as jest.Mock)
      .mockRejectedValueOnce(rateLimitError)
      .mockResolvedValueOnce(makeResponse(MOCK_TARGET_B));
    (adapter.translateError as jest.Mock).mockReturnValue({ type: 'rate_limit' });

    const config: ModelRouterConfig = {
      strategy: 'priority',
      targets: [MOCK_TARGET_A, MOCK_TARGET_B],
      triggers: [{ condition: { type: 'rate_limit' }, action: 'next_in_chain' }],
    };

    const ctx = makeCtx({ 'conn-a': MOCK_CREDENTIALS, 'conn-b': MOCK_CREDENTIALS });
    const result = await routedLLMCall(baseRequest, config, ctx);

    expect(result.routingMeta.targetUsed.id).toBe('target-b');
    expect(result.routingMeta.attemptCount).toBe(2);
    expect(result.routingMeta.triggerHistory).toHaveLength(1);
    expect(result.routingMeta.triggerHistory[0].trigger.type).toBe('rate_limit');
  });

  it('throws ROUTER_ALL_TARGETS_FAILED when all targets fail and triggers fire', async () => {
    const adapter = mockAdapter();
    const err = Object.assign(new Error('5xx'), { status: 503, _providerError: true });
    (adapter.call as jest.Mock).mockRejectedValue(err);
    (adapter.translateError as jest.Mock).mockReturnValue({ type: 'provider_error' });

    const config: ModelRouterConfig = {
      strategy: 'priority',
      targets: [MOCK_TARGET_A, MOCK_TARGET_B],
      triggers: [{ condition: { type: 'provider_error' }, action: 'next_in_chain' }],
    };

    const ctx = makeCtx({ 'conn-a': MOCK_CREDENTIALS, 'conn-b': MOCK_CREDENTIALS });
    await expect(routedLLMCall(baseRequest, config, ctx)).rejects.toMatchObject({
      code: 'ROUTER_ALL_TARGETS_FAILED',
    });
  });

  it('does NOT fall back when no matching trigger is configured', async () => {
    const adapter = mockAdapter();
    const err = Object.assign(new Error('5xx'), { status: 503, _providerError: true });
    (adapter.call as jest.Mock).mockRejectedValue(err);
    (adapter.translateError as jest.Mock).mockReturnValue({ type: 'provider_error' });

    const config: ModelRouterConfig = {
      strategy: 'priority',
      targets: [MOCK_TARGET_A, MOCK_TARGET_B],
      triggers: [], // No triggers configured
    };

    const ctx = makeCtx({ 'conn-a': MOCK_CREDENTIALS, 'conn-b': MOCK_CREDENTIALS });
    await expect(routedLLMCall(baseRequest, config, ctx)).rejects.toMatchObject({
      status: 503,
    });
  });

  it('calculates estimatedCostUsd from pricing cache', async () => {
    const adapter = mockAdapter();
    const response = makeResponse(MOCK_TARGET_A);
    response.usage.promptTokens = 1_000_000;
    response.usage.completionTokens = 1_000_000;
    (adapter.call as jest.Mock).mockResolvedValue(response);

    // Register pricing for mock provider
    initPricingCache([{
      provider: 'mock',
      model: 'mock-model-a',
      promptTokensPerMillion: 3.0,
      completionTokensPerMillion: 15.0,
    }]);

    const config: ModelRouterConfig = {
      strategy: 'priority',
      targets: [MOCK_TARGET_A],
      triggers: [],
    };

    const ctx = makeCtx({ 'conn-a': MOCK_CREDENTIALS });
    const result = await routedLLMCall(baseRequest, config, ctx);

    // 1M prompt tokens * $3/M + 1M completion tokens * $15/M = $18
    expect(result.usage.estimatedCostUsd).toBeCloseTo(18.0);
  });

  it('skips target when credentials are missing', async () => {
    const adapter = mockAdapter();
    (adapter.call as jest.Mock).mockResolvedValue(makeResponse(MOCK_TARGET_B));

    const config: ModelRouterConfig = {
      strategy: 'priority',
      targets: [MOCK_TARGET_A, MOCK_TARGET_B], // conn-a has no credentials
      triggers: [],
    };

    const ctx = makeCtx({ 'conn-b': MOCK_CREDENTIALS }); // only conn-b
    const result = await routedLLMCall(baseRequest, config, ctx);

    // Should skip target-a and use target-b
    expect(result.routingMeta.targetUsed.id).toBe('target-b');
  });
});

describe('resolveRouterConfig', () => {
  const nodeRouter: ModelRouterConfig = { strategy: 'priority', targets: [MOCK_TARGET_A], triggers: [] };
  const graphDefault: ModelRouterConfig = { strategy: 'round-robin', targets: [MOCK_TARGET_B], triggers: [] };
  const overridableTenantPolicy = { strategy: 'weighted' as const, targets: [MOCK_TARGET_A], triggers: [], overridable: true };
  const lockedTenantPolicy = { strategy: 'weighted' as const, targets: [MOCK_TARGET_B], triggers: [], overridable: false };
  const runOverride: ModelRouterConfig = { strategy: 'cost-optimized', targets: [MOCK_TARGET_A, MOCK_TARGET_B], triggers: [] };

  it('prefers node config over graph default and tenant policy when nothing else outranks it', () => {
    expect(resolveRouterConfig({ router: nodeRouter }, graphDefault, overridableTenantPolicy)).toBe(nodeRouter);
  });

  it('falls back to graph default when no node config is set', () => {
    expect(resolveRouterConfig({}, graphDefault, overridableTenantPolicy)).toBe(graphDefault);
  });

  it('falls back to an overridable tenant policy when nothing else is set', () => {
    expect(resolveRouterConfig({}, undefined, overridableTenantPolicy)).toBe(overridableTenantPolicy);
  });

  it('returns null when nothing is configured at any level', () => {
    expect(resolveRouterConfig({})).toBeNull();
  });

  it('a locked tenant policy wins over everything, including node config and a run override', () => {
    expect(resolveRouterConfig({ router: nodeRouter }, graphDefault, lockedTenantPolicy, runOverride)).toBe(
      lockedTenantPolicy,
    );
  });

  it('a per-dispatch run override wins over node config and graph default, but not a locked tenant policy', () => {
    expect(resolveRouterConfig({ router: nodeRouter }, graphDefault, overridableTenantPolicy, runOverride)).toBe(
      runOverride,
    );
  });
});

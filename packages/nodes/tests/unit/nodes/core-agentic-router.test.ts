import { coreAgenticRouter } from '../../../src/nodes/core-agentic-router';
import { makeMockContext } from '../../helpers/mock-context';
import type { CanonicalLLMResponse, ModelRouterTarget } from '@magicaal/core';

const MOCK_TARGET: ModelRouterTarget = {
  id: 'target-a',
  connectionId: 'conn-a',
  provider: 'openai',
  model: 'gpt-4o',
};

const CASES = [
  { key: 'billing', label: 'Billing', description: 'Questions about invoices or payments' },
  { key: 'technical', label: 'Technical', description: 'Technical support questions' },
  { key: 'general', label: 'General', description: 'All other questions' },
];

function mockLLMResponse(route: string, confidence: number): CanonicalLLMResponse {
  return {
    content: JSON.stringify({ route, confidence, reasoning: `Classified as ${route}` }),
    stopReason: 'end_turn',
    usage: { promptTokens: 100, completionTokens: 50, estimatedCostUsd: 0.001 },
    routingMeta: { targetUsed: MOCK_TARGET, attemptCount: 1, triggerHistory: [] },
  };
}

describe('core:agentic-router', () => {
  it('classifies input and writes route to routeOutputKey', async () => {
    const ctx = makeMockContext({ userInput: 'My invoice is wrong' });
    (ctx.llmCall as jest.Mock).mockResolvedValue(mockLLMResponse('billing', 0.95));

    const result = await coreAgenticRouter.execute(ctx, {
      inputKey: 'userInput',
      cases: CASES,
      routeOutputKey: '_route',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('_route')).toBe('billing');
    expect(ctx.get('_route_confidence')).toBeCloseTo(0.95);
  });

  it('writes to optional confidenceOutputKey and reasoningOutputKey', async () => {
    const ctx = makeMockContext({ msg: 'Server is down' });
    (ctx.llmCall as jest.Mock).mockResolvedValue(mockLLMResponse('technical', 0.88));

    await coreAgenticRouter.execute(ctx, {
      inputKey: 'msg',
      cases: CASES,
      routeOutputKey: '_route',
      confidenceOutputKey: 'confidence',
      reasoningOutputKey: 'reasoning',
    });

    expect(ctx.get('confidence')).toBeCloseTo(0.88);
    expect(typeof ctx.get('reasoning')).toBe('string');
  });

  it('overrides route to _human_review when confidence below threshold', async () => {
    const ctx = makeMockContext({ msg: 'Something' });
    (ctx.llmCall as jest.Mock).mockResolvedValue(mockLLMResponse('general', 0.4));

    await coreAgenticRouter.execute(ctx, {
      inputKey: 'msg',
      cases: CASES,
      routeOutputKey: '_route',
      confidenceThreshold: 0.7,
    });

    expect(ctx.get('_route')).toBe('_human_review');
    expect(ctx.log).toHaveBeenCalledWith('info', expect.stringContaining('human review'));
  });

  it('falls back to first case when LLM returns unknown route key', async () => {
    const ctx = makeMockContext({ msg: 'Hello' });
    (ctx.llmCall as jest.Mock).mockResolvedValue(mockLLMResponse('unknown_key', 0.9));

    await coreAgenticRouter.execute(ctx, {
      inputKey: 'msg',
      cases: CASES,
      routeOutputKey: '_route',
    });

    // Falls back to first case key
    expect(ctx.get('_route')).toBe('billing');
  });

  it('fails when inputKey is empty', async () => {
    const ctx = makeMockContext({ msg: '' });
    const result = await coreAgenticRouter.execute(ctx, {
      inputKey: 'msg',
      cases: CASES,
      routeOutputKey: '_route',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('AGENTIC_ROUTER_EMPTY_INPUT');
  });

  it('fails when no cases declared', async () => {
    const ctx = makeMockContext({ msg: 'Hello' });
    const result = await coreAgenticRouter.execute(ctx, {
      inputKey: 'msg',
      cases: [],
      routeOutputKey: '_route',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('AGENTIC_ROUTER_NO_CASES');
  });
});

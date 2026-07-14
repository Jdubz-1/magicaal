import type { Request, Response, NextFunction } from 'express';
import type { CanonicalLLMRequest, ModelRouterConfig } from '@magicaal/core';

jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

const mockRoutedLLMCall = jest.fn();
jest.mock('@/router/router-engine', () => ({
  routedLLMCall: (...args: unknown[]) => mockRoutedLLMCall(...args),
  resolveRouterConfig: jest.fn(),
  initPricingCache: jest.fn(),
}));

jest.mock('@/resolver/credential-resolver', () => ({
  resolveCredentials: jest.fn().mockResolvedValue(undefined),
}));

import { summarizeItems } from '@/controllers/llm.controller';

const ROUTER: ModelRouterConfig = {
  strategy: 'priority',
  targets: [{ id: 't1', connectionId: 'conn-1', provider: 'anthropic', model: 'base-model' }],
  triggers: [],
};

function mockRes() {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res as Response & { status: jest.Mock; json: jest.Mock };
}

async function call(body: Record<string, unknown>) {
  const req = { body } as unknown as Request;
  const res = mockRes();
  const next = jest.fn() as NextFunction & jest.Mock;
  await summarizeItems(req, res, next);
  return { res, next };
}

beforeEach(() => {
  jest.clearAllMocks();
  mockRoutedLLMCall.mockResolvedValue({ content: 'the summary' });
});

describe('POST /internal/llm/summarize (ALIGN-007)', () => {
  it('400s without tenantId or items', async () => {
    const { next } = await call({ items: [], tenantId: 't1', routerConfig: ROUTER });
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ status: 400, code: 'INVALID_SUMMARIZE_REQUEST' }),
    );
  });

  it('422s without a router config', async () => {
    const { next } = await call({ tenantId: 't1', items: ['a'] });
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ status: 422, code: 'ROUTER_NOT_CONFIGURED' }),
    );
  });

  it('routes the summarization call and returns the summary', async () => {
    const { res } = await call({ tenantId: 't1', items: ['a', 'b'], routerConfig: ROUTER });

    expect(res.json).toHaveBeenCalledWith({ summary: 'the summary' });
    const [request, config] = mockRoutedLLMCall.mock.calls[0] as [CanonicalLLMRequest, ModelRouterConfig];
    expect(request.messages[0].content).toBe(JSON.stringify(['a', 'b']));
    expect(config.targets[0].model).toBe('base-model');
  });

  it('overrides the target model with summarizeWith.model', async () => {
    await call({ tenantId: 't1', items: ['a'], model: 'summary-model', routerConfig: ROUTER });

    const [, config] = mockRoutedLLMCall.mock.calls[0] as [CanonicalLLMRequest, ModelRouterConfig];
    expect(config.targets[0].model).toBe('summary-model');
  });

  it('passes a custom prompt through as the system prompt', async () => {
    await call({ tenantId: 't1', items: ['a'], prompt: 'Custom summarizer', routerConfig: ROUTER });

    const [request] = mockRoutedLLMCall.mock.calls[0] as [CanonicalLLMRequest];
    expect(request.system).toBe('Custom summarizer');
  });
});

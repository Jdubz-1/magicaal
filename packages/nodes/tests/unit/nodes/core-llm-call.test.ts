import { coreLLMCall } from '../../../src/nodes/core-llm-call';
import { makeMockContext } from '../../helpers/mock-context';
import type { CanonicalLLMResponse, ModelRouterTarget } from '@magicaal/core';

const mockTarget: ModelRouterTarget = {
  id: 'target-a',
  connectionId: 'conn-a',
  provider: 'openai',
  model: 'gpt-4o',
};

function makeMockResponse(content: string): CanonicalLLMResponse {
  return {
    content,
    stopReason: 'end_turn',
    usage: { promptTokens: 10, completionTokens: 20, estimatedCostUsd: 0.001 },
    routingMeta: { targetUsed: mockTarget, attemptCount: 1, triggerHistory: [] },
  };
}

describe('core:llm-call', () => {
  it('calls ctx.llmCall and writes response to outputKey', async () => {
    const ctx = makeMockContext({ question: 'What is 2+2?' });
    (ctx.llmCall as jest.Mock).mockResolvedValue(makeMockResponse('4'));

    const result = await coreLLMCall.execute(ctx, {
      userMessage: 'What is 2+2?',
      outputKey: 'answer',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('answer')).toBe('4');
    expect(ctx.get('_llm_response')).toBe('4');
    expect(ctx.llmCall).toHaveBeenCalled();
  });

  it('parses JSON when outputSchema is set', async () => {
    const ctx = makeMockContext({});
    (ctx.llmCall as jest.Mock).mockResolvedValue(
      makeMockResponse('{"name":"Alice","age":30}'),
    );

    const result = await coreLLMCall.execute(ctx, {
      userMessage: 'Give me a user',
      outputKey: 'user',
      outputSchema: { type: 'object', properties: { name: {}, age: {} } },
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('user')).toEqual({ name: 'Alice', age: 30 });
  });

  it('retries on malformed JSON and fails after retryOnMalformed attempts', async () => {
    const ctx = makeMockContext({});
    (ctx.llmCall as jest.Mock).mockResolvedValue(makeMockResponse('not-json'));

    const result = await coreLLMCall.execute(ctx, {
      userMessage: 'Give me JSON',
      outputKey: 'data',
      outputSchema: { type: 'object' },
      retryOnMalformed: 1,
    });

    // Called once for first attempt + once for retry = 2 total
    expect(ctx.llmCall).toHaveBeenCalledTimes(2);
    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('LLM_MALFORMED_JSON');
  });

  it('uses messagesKey when provided instead of userMessage', async () => {
    const ctx = makeMockContext({
      history: [{ role: 'user', content: 'Hello' }, { role: 'assistant', content: 'Hi' }],
    });
    (ctx.llmCall as jest.Mock).mockResolvedValue(makeMockResponse('Response'));

    await coreLLMCall.execute(ctx, { messagesKey: 'history', outputKey: 'out' });

    const callArgs = (ctx.llmCall as jest.Mock).mock.calls[0][0];
    expect(callArgs.messages).toHaveLength(2);
  });

  it('returns failed when llmCall throws', async () => {
    const ctx = makeMockContext({});
    (ctx.llmCall as jest.Mock).mockRejectedValue(new Error('Provider error'));

    const result = await coreLLMCall.execute(ctx, { userMessage: 'Hi', outputKey: 'out' });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('LLM_CALL_FAILED');
  });
});

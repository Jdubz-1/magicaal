import type { ProviderAdapter } from '@magicaal/sdk-node';
import type { ResolvedCredentials } from '@magicaal/sdk-node';
import type {
  CanonicalLLMRequest,
  CanonicalLLMResponse,
  CanonicalTool,
  CanonicalToolCall,
  ModelRouterTarget,
  RouterTriggerCondition,
} from '@magicaal/core';

const BASE_URL = 'https://api.openai.com/v1';

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content?: string | null;
  tool_call_id?: string;
  tool_calls?: Array<{
    id: string;
    type: 'function';
    function: { name: string; arguments: string };
  }>;
}

interface OpenAIResponse {
  id: string;
  choices: Array<{
    message: {
      role: string;
      content: string | null;
      tool_calls?: Array<{
        id: string;
        type: 'function';
        function: { name: string; arguments: string };
      }>;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

function toOpenAIMessages(request: CanonicalLLMRequest): OpenAIMessage[] {
  const messages: OpenAIMessage[] = [];

  if (request.system) {
    messages.push({ role: 'system', content: request.system });
  }

  for (const msg of request.messages) {
    if (msg.role === 'tool_result') {
      messages.push({
        role: 'tool',
        content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content),
        tool_call_id: msg.toolCallId ?? '',
      });
    } else {
      messages.push({
        role: msg.role as 'user' | 'assistant',
        content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content),
      });
    }
  }

  return messages;
}

function toOpenAITools(tools: CanonicalTool[]) {
  return tools.map((t) => ({
    type: 'function' as const,
    function: {
      name: t.name,
      description: t.description,
      parameters: t.inputSchema,
    },
  }));
}

function finishReasonToStopReason(
  reason: string,
): CanonicalLLMResponse['stopReason'] {
  switch (reason) {
    case 'tool_calls':
      return 'tool_use';
    case 'length':
      return 'max_tokens';
    case 'content_filter':
      return 'content_filter';
    case 'stop':
    default:
      return 'end_turn';
  }
}

export const openAIAdapter: ProviderAdapter = {
  provider: 'openai',

  async call(
    request: CanonicalLLMRequest,
    target: ModelRouterTarget,
    credentials: ResolvedCredentials,
  ): Promise<CanonicalLLMResponse> {
    const apiKey = credentials.apiKey ?? credentials.accessToken;
    if (!apiKey) {
      throw Object.assign(new Error('OpenAI adapter: no API key in credentials'), {
        code: 'MISSING_CREDENTIALS',
      });
    }

    const body: Record<string, unknown> = {
      model: target.model,
      messages: toOpenAIMessages(request),
      ...(request.maxTokens !== undefined && { max_tokens: target.maxTokensOverride ?? request.maxTokens }),
      ...(request.temperature !== undefined && { temperature: request.temperature }),
    };

    if (request.tools?.length) {
      body.tools = toOpenAITools(request.tools);
      body.tool_choice = 'auto';
    }

    if (request.outputSchema) {
      body.response_format = {
        type: 'json_schema',
        json_schema: {
          name: 'output',
          schema: request.outputSchema,
          strict: true,
        },
      };
    }

    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = Object.assign(new Error(`OpenAI error ${response.status}`), {
        status: response.status,
        _providerError: true,
      });
      throw err;
    }

    const data = (await response.json()) as OpenAIResponse;
    const choice = data.choices[0];
    const msg = choice.message;

    const toolCalls: CanonicalToolCall[] | undefined = msg.tool_calls?.map((tc) => ({
      id: tc.id,
      name: tc.function.name,
      input: JSON.parse(tc.function.arguments) as Record<string, unknown>,
    }));

    return {
      content: msg.content ?? '',
      toolCalls: toolCalls?.length ? toolCalls : undefined,
      stopReason: finishReasonToStopReason(choice.finish_reason),
      usage: {
        promptTokens: data.usage.prompt_tokens,
        completionTokens: data.usage.completion_tokens,
        estimatedCostUsd: 0, // populated by router engine from pricing table
      },
      routingMeta: {
        targetUsed: target,
        attemptCount: 1,
        triggerHistory: [],
      },
    };
  },

  // eslint-disable-next-line require-yield
  async *stream(
    _request: CanonicalLLMRequest,
    _target: ModelRouterTarget,
    _credentials: ResolvedCredentials,
  ): AsyncGenerator<CanonicalLLMResponse> {
    throw new Error('OpenAI streaming not yet implemented');
  },

  translateError(error: unknown): RouterTriggerCondition | null {
    if (typeof error !== 'object' || error === null) return null;
    const e = error as { status?: number; _providerError?: boolean };
    if (!e._providerError) return null;

    if (e.status === 429) return { type: 'rate_limit' };
    if (e.status === 400) return { type: 'content_policy' };
    if (e.status && e.status >= 500) return { type: 'provider_error' };
    return null;
  },
};

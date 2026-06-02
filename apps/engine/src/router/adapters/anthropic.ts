import type { ProviderAdapter } from '@magicaal/sdk-node';
import type { ResolvedCredentials } from '@magicaal/sdk-node';
import type {
  CanonicalLLMRequest,
  CanonicalLLMResponse,
  CanonicalMessage,
  CanonicalTool,
  CanonicalToolCall,
  ModelRouterTarget,
  RouterTriggerCondition,
} from '@magicaal/core';

const BASE_URL = 'https://api.anthropic.com/v1';
const ANTHROPIC_VERSION = '2023-06-01';

interface AnthropicMessage {
  role: 'user' | 'assistant';
  content:
    | string
    | Array<{
        type: string;
        text?: string;
        id?: string;
        name?: string;
        input?: Record<string, unknown>;
        tool_use_id?: string;
        content?: string;
      }>;
}

interface AnthropicResponse {
  id: string;
  type: 'message';
  role: 'assistant';
  content: Array<{
    type: 'text' | 'tool_use';
    text?: string;
    id?: string;
    name?: string;
    input?: Record<string, unknown>;
  }>;
  stop_reason: 'end_turn' | 'max_tokens' | 'tool_use' | 'stop_sequence';
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

function toAnthropicMessages(request: CanonicalLLMRequest): AnthropicMessage[] {
  const messages: AnthropicMessage[] = [];

  for (const msg of request.messages) {
    if (msg.role === 'tool_result') {
      messages.push({
        role: 'user',
        content: [
          {
            type: 'tool_result',
            tool_use_id: msg.toolCallId ?? '',
            content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content),
          },
        ],
      });
    } else {
      const content =
        typeof msg.content === 'string'
          ? msg.content
          : (msg.content as Array<{ type: string; text?: string; id?: string; name?: string; input?: Record<string, unknown> }>).map((block) => {
              if (block.type === 'text') return { type: 'text', text: block.text ?? '' };
              if (block.type === 'tool_use') {
                return {
                  type: 'tool_use',
                  id: block.id ?? '',
                  name: block.name ?? '',
                  input: block.input ?? {},
                };
              }
              return { type: 'text', text: '' };
            });
      messages.push({ role: msg.role as 'user' | 'assistant', content });
    }
  }

  return messages;
}

function toAnthropicTools(tools: CanonicalTool[]) {
  return tools.map((t) => ({
    name: t.name,
    description: t.description,
    input_schema: t.inputSchema,
  }));
}

function stopReasonFromAnthropic(
  reason: string,
): CanonicalLLMResponse['stopReason'] {
  switch (reason) {
    case 'tool_use':
      return 'tool_use';
    case 'max_tokens':
      return 'max_tokens';
    case 'end_turn':
    default:
      return 'end_turn';
  }
}

export const anthropicAdapter: ProviderAdapter = {
  provider: 'anthropic',

  async call(
    request: CanonicalLLMRequest,
    target: ModelRouterTarget,
    credentials: ResolvedCredentials,
  ): Promise<CanonicalLLMResponse> {
    const apiKey = credentials.apiKey ?? credentials.accessToken;
    if (!apiKey) {
      throw Object.assign(new Error('Anthropic adapter: no API key in credentials'), {
        code: 'MISSING_CREDENTIALS',
      });
    }

    const body: Record<string, unknown> = {
      model: target.model,
      max_tokens: target.maxTokensOverride ?? request.maxTokens ?? 4096,
      messages: toAnthropicMessages(request),
      ...(request.system && { system: request.system }),
      ...(request.temperature !== undefined && { temperature: request.temperature }),
    };

    if (request.tools?.length) {
      body.tools = toAnthropicTools(request.tools);
    }

    // Structured output via a dedicated tool
    if (request.outputSchema && !request.tools?.length) {
      body.tools = [
        {
          name: 'structured_output',
          description: 'Return your response in this exact JSON format.',
          input_schema: request.outputSchema,
        },
      ];
      body.tool_choice = { type: 'tool', name: 'structured_output' };
    }

    const response = await fetch(`${BASE_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': ANTHROPIC_VERSION,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = Object.assign(new Error(`Anthropic error ${response.status}`), {
        status: response.status,
        _providerError: true,
      });
      throw err;
    }

    const data = (await response.json()) as AnthropicResponse;

    let contentText = '';
    const toolCalls: CanonicalToolCall[] = [];

    for (const block of data.content) {
      if (block.type === 'text') {
        contentText += block.text ?? '';
      } else if (block.type === 'tool_use') {
        if (block.name === 'structured_output') {
          // Structured output — serialize the input as the response content
          contentText = JSON.stringify(block.input ?? {});
        } else {
          toolCalls.push({
            id: block.id ?? '',
            name: block.name ?? '',
            input: (block.input ?? {}) as Record<string, unknown>,
          });
        }
      }
    }

    return {
      content: contentText,
      toolCalls: toolCalls.length ? toolCalls : undefined,
      stopReason: stopReasonFromAnthropic(data.stop_reason),
      usage: {
        promptTokens: data.usage.input_tokens,
        completionTokens: data.usage.output_tokens,
        estimatedCostUsd: 0,
      },
      routingMeta: {
        targetUsed: target,
        attemptCount: 1,
        triggerHistory: [],
      },
    };
  },

  async *stream(
    _request: CanonicalLLMRequest,
    _target: ModelRouterTarget,
    _credentials: ResolvedCredentials,
  ): AsyncGenerator<CanonicalLLMResponse> {
    throw new Error('Anthropic streaming not yet implemented');
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

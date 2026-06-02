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

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

interface GeminiContent {
  role: 'user' | 'model';
  parts: Array<{ text?: string; functionCall?: { name: string; args: Record<string, unknown> }; functionResponse?: { name: string; response: Record<string, unknown> } }>;
}

interface GeminiFunctionDeclaration {
  name: string;
  description: string;
  parameters: object;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      role: string;
      parts: Array<{
        text?: string;
        functionCall?: {
          name: string;
          args: Record<string, unknown>;
        };
      }>;
    };
    finishReason: string;
  }>;
  usageMetadata: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
}

function toGeminiContents(request: CanonicalLLMRequest): GeminiContent[] {
  const contents: GeminiContent[] = [];

  for (const msg of request.messages) {
    if (msg.role === 'tool_result') {
      const lastContent = contents[contents.length - 1];
      // Tool results are appended to the previous user message or as a new user message
      if (lastContent?.role === 'user') {
        lastContent.parts.push({
          functionResponse: {
            name: '',
            response: { content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content) },
          },
        });
      } else {
        contents.push({
          role: 'user',
          parts: [{
            functionResponse: {
              name: '',
              response: { content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content) },
            },
          }],
        });
      }
    } else {
      const role = msg.role === 'assistant' ? 'model' : 'user';
      const text = typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content);
      contents.push({ role, parts: [{ text }] });
    }
  }

  return contents;
}

function toGeminiFunctionDeclarations(tools: CanonicalTool[]): GeminiFunctionDeclaration[] {
  return tools.map((t) => ({
    name: t.name,
    description: t.description,
    parameters: t.inputSchema,
  }));
}

function finishReasonToStopReason(reason: string): CanonicalLLMResponse['stopReason'] {
  switch (reason) {
    case 'STOP':
      return 'end_turn';
    case 'MAX_TOKENS':
      return 'max_tokens';
    case 'SAFETY':
      return 'content_filter';
    default:
      return 'end_turn';
  }
}

export const googleAdapter: ProviderAdapter = {
  provider: 'google',

  async call(
    request: CanonicalLLMRequest,
    target: ModelRouterTarget,
    credentials: ResolvedCredentials,
  ): Promise<CanonicalLLMResponse> {
    const apiKey = credentials.apiKey ?? credentials.accessToken;
    if (!apiKey) {
      throw Object.assign(new Error('Google adapter: no API key in credentials'), {
        code: 'MISSING_CREDENTIALS',
      });
    }

    const body: Record<string, unknown> = {
      contents: toGeminiContents(request),
    };

    if (request.system) {
      body.systemInstruction = { parts: [{ text: request.system }] };
    }

    const genConfig: Record<string, unknown> = {};
    if (request.maxTokens !== undefined) {
      genConfig.maxOutputTokens = target.maxTokensOverride ?? request.maxTokens;
    }
    if (request.temperature !== undefined) {
      genConfig.temperature = request.temperature;
    }
    if (request.outputSchema) {
      genConfig.responseMimeType = 'application/json';
      genConfig.responseSchema = request.outputSchema;
    }
    if (Object.keys(genConfig).length > 0) {
      body.generationConfig = genConfig;
    }

    if (request.tools?.length) {
      body.tools = [{ functionDeclarations: toGeminiFunctionDeclarations(request.tools) }];
    }

    const url = `${BASE_URL}/${target.model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = Object.assign(new Error(`Google error ${response.status}`), {
        status: response.status,
        _providerError: true,
      });
      throw err;
    }

    const data = (await response.json()) as GeminiResponse;
    const candidate = data.candidates[0];
    const parts = candidate?.content?.parts ?? [];

    let contentText = '';
    const toolCalls: CanonicalToolCall[] = [];

    for (const part of parts) {
      if (part.text) {
        contentText += part.text;
      } else if (part.functionCall) {
        toolCalls.push({
          id: `${part.functionCall.name}-${Date.now()}`,
          name: part.functionCall.name,
          input: part.functionCall.args,
        });
      }
    }

    return {
      content: contentText,
      toolCalls: toolCalls.length ? toolCalls : undefined,
      stopReason: finishReasonToStopReason(candidate?.finishReason ?? 'STOP'),
      usage: {
        promptTokens: data.usageMetadata?.promptTokenCount ?? 0,
        completionTokens: data.usageMetadata?.candidatesTokenCount ?? 0,
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
    throw new Error('Google streaming not yet implemented');
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

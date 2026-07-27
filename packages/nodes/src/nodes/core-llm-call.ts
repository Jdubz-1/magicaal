import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';
import type { CanonicalMessage, ModelRouterConfig } from '@magicaal/core';

interface LLMCallConfig {
  // Prompt
  systemPrompt?: string;
  userMessage?: string;
  userMessageKey?: string;
  messagesKey?: string;

  // Session history injection — prepend stored CanonicalMessage[] from this context key
  injectSessionHistory?: string;

  // Router
  router?: ModelRouterConfig;

  // Output
  outputKey: string;

  // Options
  maxTokens?: number;
  temperature?: number;
  outputSchema?: object;
  retryOnMalformed?: number;
}

export const coreLLMCall: NodeModule<LLMCallConfig> = {
  type: 'core:llm-call',
  meta: {
    name: 'LLM Call',
    description:
      'Calls a language model via the configured router. Accepts a user message (string) or a full message array from context. Writes the response text to outputKey. Supports structured output via outputSchema with automatic retry on malformed JSON.',
    category: 'ai-llm',
    icon: 'cpu',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['outputKey'],
      properties: {
        systemPrompt: {
          type: 'string',
          description: 'System prompt injected before the user message',
        },
        userMessage: {
          type: 'string',
          description: 'Literal user message text, sent to the LLM exactly as written (no templating).',
        },
        userMessageKey: {
          type: 'string',
          description: 'Context key holding a pre-assembled user message string (e.g. built by an upstream core:transform node). Takes precedence over userMessage when set.',
        },
        messagesKey: {
          type: 'string',
          description: 'Context key containing a CanonicalMessage[] for multi-turn conversations (overrides userMessage)',
        },
        router: {
          type: 'object',
          description: 'Inline ModelRouterConfig. Overrides the graph defaultRouter.',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write the LLM response text (or parsed JSON object if outputSchema is set)',
        },
        maxTokens: { type: 'number' },
        temperature: { type: 'number' },
        outputSchema: {
          type: 'object',
          description: 'JSON Schema for structured output. The response is validated and auto-retried on malformed JSON.',
        },
        retryOnMalformed: {
          type: 'number',
          description: 'Number of retries when outputSchema is set and the response is invalid JSON (default: 2)',
        },
        injectSessionHistory: {
          type: 'string',
          description: 'Context key holding a CanonicalMessage[] from a prior session; prepended before the current user message to provide conversation continuity.',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _llm_response: {},
        _llm_usage: { type: 'object' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: LLMCallConfig) {
    let messages: CanonicalMessage[];

    if (config.messagesKey) {
      messages = ctx.get<CanonicalMessage[]>(config.messagesKey) ?? [];
    } else {
      const text = (config.userMessageKey ? ctx.get<string>(config.userMessageKey) : undefined) ?? config.userMessage ?? '';
      messages = [{ role: 'user', content: text }];
    }

    // Prepend stored session history as prior conversation turns
    if (config.injectSessionHistory) {
      const history = ctx.get<CanonicalMessage[]>(config.injectSessionHistory) ?? [];
      if (history.length > 0) {
        messages = [...history, ...messages];
      }
    }

    // A tenant-level Caal system prompt suffix (or any other caller-supplied
    // addendum) rides in on ctx.data rather than static node config, since it
    // varies per invocation, not per compiled graph.
    const promptSuffix = ctx.get<string>('systemPromptSuffix');
    const system = [config.systemPrompt, promptSuffix].filter(Boolean).join('\n\n') || undefined;

    const request = {
      messages,
      ...(system && { system }),
      ...(config.maxTokens !== undefined && { maxTokens: config.maxTokens }),
      ...(config.temperature !== undefined && { temperature: config.temperature }),
      ...(config.outputSchema && { outputSchema: config.outputSchema }),
    };

    const maxRetries = config.outputSchema ? (config.retryOnMalformed ?? 2) : 0;
    let lastError: unknown;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await ctx.llmCall(request, config.router ?? null);

        let output: unknown = response.content;

        if (config.outputSchema) {
          try {
            output = JSON.parse(response.content);
          } catch {
            if (attempt < maxRetries) {
              // Append correction message and retry
              messages = [
                ...messages,
                { role: 'assistant', content: response.content },
                {
                  role: 'user',
                  content: 'Your previous response was not valid JSON. Please respond with only valid JSON matching the required schema.',
                },
              ];
              lastError = new Error('Response was not valid JSON');
              continue;
            }
            return {
              status: 'failed' as const,
              outputs: {},
              error: {
                code: 'LLM_MALFORMED_JSON',
                message: `LLM response could not be parsed as JSON after ${maxRetries + 1} attempts`,
                retryable: true,
              },
            };
          }
        }

        ctx.set(config.outputKey, output);
        ctx.set('_llm_response', output);
        ctx.set('_llm_usage', response.usage);

        ctx.emit('node.llm_call', {
          provider: response.routingMeta.targetUsed.provider,
          model: response.routingMeta.targetUsed.model,
          usage: response.usage,
          attemptCount: response.routingMeta.attemptCount,
        });

        return {
          status: 'complete' as const,
          outputs: {
            [config.outputKey]: output,
            _llm_response: output,
            _llm_usage: response.usage,
          },
          routingMeta: response.routingMeta,
        };
      } catch (err) {
        lastError = err;
        if (attempt < maxRetries) continue;
      }
    }

    return {
      status: 'failed' as const,
      outputs: {},
      error: {
        code: 'LLM_CALL_FAILED',
        message: lastError instanceof Error ? lastError.message : 'LLM call failed',
        retryable: true,
      },
    };
  },
};

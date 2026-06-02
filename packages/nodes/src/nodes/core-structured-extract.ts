import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';
import type { CanonicalMessage, ModelRouterConfig } from '@magicaal/core';

interface StructuredExtractConfig {
  systemPrompt?: string;
  userMessage?: string;
  messagesKey?: string;
  outputSchema: object;
  outputKey: string;
  router?: ModelRouterConfig;
  maxTokens?: number;
  temperature?: number;
  retryOnMalformed?: number;
}

export const coreStructuredExtract: NodeModule<StructuredExtractConfig> = {
  type: 'core:structured-extract',
  meta: {
    name: 'Structured Extract',
    description:
      'Calls an LLM with mandatory structured output validation. outputSchema is required and enforced. The parsed JSON object is written to outputKey. Equivalent to core:llm-call with outputSchema always active.',
    category: 'ai-llm',
    icon: 'brackets',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['outputSchema', 'outputKey'],
      properties: {
        systemPrompt: { type: 'string' },
        userMessage: { type: 'string' },
        messagesKey: { type: 'string' },
        outputSchema: {
          type: 'object',
          description: 'Required JSON Schema for structured output',
        },
        outputKey: { type: 'string' },
        router: { type: 'object' },
        maxTokens: { type: 'number' },
        temperature: { type: 'number' },
        retryOnMalformed: { type: 'number' },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: { _extract_result: {} },
    },
  },

  async execute(ctx: ExecutionContext, config: StructuredExtractConfig) {
    let messages: CanonicalMessage[];

    if (config.messagesKey) {
      messages = ctx.get<CanonicalMessage[]>(config.messagesKey) ?? [];
    } else {
      messages = [{ role: 'user', content: config.userMessage ?? '' }];
    }

    const maxRetries = config.retryOnMalformed ?? 2;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      const response = await ctx.llmCall(
        {
          messages,
          ...(config.systemPrompt && { system: config.systemPrompt }),
          outputSchema: config.outputSchema,
          ...(config.maxTokens !== undefined && { maxTokens: config.maxTokens }),
          ...(config.temperature !== undefined && { temperature: config.temperature }),
        },
        config.router ?? null,
      );

      try {
        const parsed = JSON.parse(response.content) as unknown;
        ctx.set(config.outputKey, parsed);
        ctx.set('_extract_result', parsed);

        return {
          status: 'complete' as const,
          outputs: { [config.outputKey]: parsed, _extract_result: parsed },
          routingMeta: response.routingMeta,
        };
      } catch {
        if (attempt < maxRetries) {
          messages = [
            ...messages,
            { role: 'assistant', content: response.content },
            { role: 'user', content: 'That was not valid JSON. Reply with only the JSON object.' },
          ];
          continue;
        }
      }
    }

    return {
      status: 'failed' as const,
      outputs: {},
      error: {
        code: 'STRUCTURED_EXTRACT_FAILED',
        message: `Could not extract valid JSON after ${maxRetries + 1} attempts`,
        retryable: true,
      },
    };
  },
};

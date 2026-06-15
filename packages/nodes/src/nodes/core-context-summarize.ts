import type { NodeModule } from '@magicaal/sdk-node';
import type { ModelRouterConfig } from '@magicaal/core';

interface ContextSummarizeConfig {
  inputKey: string;
  outputKey: string;
  systemPrompt?: string;
  router?: ModelRouterConfig;
}

export const coreContextSummarize: NodeModule<ContextSummarizeConfig> = {
  type: 'core:context-summarize',
  meta: {
    name: 'Context Summarize',
    description: 'Summarizes a message array or text value with an LLM call to reduce token volume.',
    category: 'ai-llm',
    icon: 'compress',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['inputKey', 'outputKey'],
      properties: {
        inputKey:     { type: 'string', description: 'Context key containing messages array or text to summarize' },
        outputKey:    { type: 'string', description: 'Context key to write the summary' },
        systemPrompt: { type: 'string' },
        router:       { type: 'object' },
      },
    },
    input:  {},
    output: {},
  },
  async execute(ctx, config) {
    const input = ctx.get(config.inputKey);
    const text = Array.isArray(input)
      ? input.map((m) => (typeof m === 'object' && m !== null ? JSON.stringify(m) : String(m))).join('\n')
      : String(input ?? '');

    try {
      const response = await ctx.llmCall(
        {
          system: config.systemPrompt ?? 'Summarize the following content concisely, preserving all key information.',
          messages: [{ role: 'user' as const, content: text }],
        },
        config.router ?? null,
      );
      ctx.set(config.outputKey, response.content);
      return { status: 'complete', outputs: { [config.outputKey]: response.content }, routingMeta: response.routingMeta };
    } catch (err) {
      return { status: 'failed', outputs: {}, error: { code: 'LLM_CALL_FAILED', message: err instanceof Error ? err.message : String(err), retryable: true } };
    }
  },
};

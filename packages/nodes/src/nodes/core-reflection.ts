import type { NodeModule } from '@magicaal/sdk-node';
import type { ModelRouterConfig } from '@magicaal/core';
import { evaluateBoolean } from '../utils/jsonata';

interface ReflectionConfig {
  inputKey: string;
  outputKey: string;
  systemPrompt: string;
  acceptanceExpression: string;
  maxIterations?: number;
  router?: ModelRouterConfig;
}

export const coreReflection: NodeModule<ReflectionConfig> = {
  type: 'core:reflection',
  meta: {
    name: 'Reflection',
    description: 'Routes a context value through an iterative LLM critique loop until the acceptance condition is met.',
    category: 'ai-llm',
    icon: 'refresh-cw',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['inputKey', 'outputKey', 'systemPrompt', 'acceptanceExpression'],
      properties: {
        inputKey:             { type: 'string' },
        outputKey:            { type: 'string' },
        systemPrompt:         { type: 'string', description: 'Critique prompt — LLM should return improved version' },
        acceptanceExpression: { type: 'string', description: 'JSONata boolean evaluated against context after each iteration' },
        maxIterations:        { type: 'number', description: 'Max critique cycles (default 5)' },
        router:               { type: 'object' },
      },
    },
    input:  {},
    output: {},
  },
  async execute(ctx, config) {
    const maxIter = config.maxIterations ?? 5;
    let current = ctx.get(config.inputKey) ?? '';

    for (let i = 1; i <= maxIter; i++) {
      let response;
      try {
        response = await ctx.llmCall(
          {
            system: config.systemPrompt,
            messages: [{ role: 'user' as const, content: String(current) }],
          },
          config.router ?? null,
        );
      } catch (err) {
        return { status: 'failed', outputs: {}, error: { code: 'LLM_CALL_FAILED', message: err instanceof Error ? err.message : String(err), retryable: true } };
      }
      current = response.content;
      ctx.set(config.outputKey, current);

      const accepted = await evaluateBoolean(config.acceptanceExpression, ctx.data);
      if (accepted) {
        return { status: 'complete', outputs: { [config.outputKey]: current }, routingMeta: response.routingMeta };
      }
    }

    ctx.set(config.outputKey, current);
    return { status: 'complete', outputs: { [config.outputKey]: current } };
  },
};

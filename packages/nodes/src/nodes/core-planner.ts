import type { NodeModule } from '@magicaal/sdk-node';
import type { ModelRouterConfig } from '@magicaal/core';

interface PlannerConfig {
  goalKey: string;
  outputKey: string;
  systemPrompt?: string;
  planSchema?: object;
  router?: ModelRouterConfig;
}

export const corePlanner: NodeModule<PlannerConfig> = {
  type: 'core:planner',
  meta: {
    name: 'Planner',
    description: 'LLM decomposes a goal into a structured plan consumed by downstream nodes. Trajectory recorded.',
    category: 'ai-llm',
    icon: 'list-checks',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['goalKey', 'outputKey'],
      properties: {
        goalKey:      { type: 'string' },
        outputKey:    { type: 'string' },
        systemPrompt: { type: 'string' },
        planSchema:   { type: 'object', description: 'JSON Schema for the expected plan structure' },
        router:       { type: 'object' },
      },
    },
    input:  {},
    output: {},
  },
  async execute(ctx, config) {
    const goal = ctx.get<string>(config.goalKey) ?? '';
    const systemPrompt = config.systemPrompt ??
      'You are a planning assistant. Decompose the goal into a clear, ordered list of steps. ' +
      'Return a JSON object matching the provided schema.';

    const request = {
      system: systemPrompt,
      messages: [{ role: 'user' as const, content: `Goal: ${goal}\n\nCreate a detailed plan.` }],
      outputSchema: config.planSchema,
    };

    const response = await ctx.llmCall(request, config.router ?? null);

    let plan: unknown = response.content;
    if (config.planSchema) {
      try { plan = JSON.parse(response.content); } catch { /* keep as string */ }
    }

    ctx.recordTrajectoryStep({ iteration: 1, reasoning: response.content, llmResponse: response.content });
    ctx.set(config.outputKey, plan);
    return { status: 'complete', outputs: { [config.outputKey]: plan }, routingMeta: response.routingMeta };
  },
};

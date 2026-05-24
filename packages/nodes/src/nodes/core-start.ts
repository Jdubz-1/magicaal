import type { NodeModule } from '@magicaal/sdk-node';

interface StartConfig {
  inputSchema?: Record<string, unknown>;
}

export const coreStart: NodeModule<StartConfig> = {
  type: 'core:start',
  meta: {
    name: 'Start',
    description: 'Entry point of the agent graph. Declares the input schema and writes input values to context.',
    category: 'control-flow',
    icon: 'play',
    canTrigger: true,
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      properties: {
        inputSchema: {
          type: 'object',
          description: 'JSON Schema for the expected input payload',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      description: 'All input keys written to context',
    },
  },
  async execute(ctx, _config) {
    return {
      status: 'complete',
      outputs: { ...ctx.data },
    };
  },
};

import type { NodeModule } from '@magicaal/sdk-node';

interface EndConfig {
  outputKeys?: string[];
}

export const coreEnd: NodeModule<EndConfig> = {
  type: 'core:end',
  meta: {
    name: 'End',
    description: 'Terminal node of the agent graph. Collects configured output keys from context as the run result.',
    category: 'control-flow',
    icon: 'stop-circle',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      properties: {
        outputKeys: {
          type: 'array',
          items: { type: 'string' },
          description: 'Context keys to include in the run output. If omitted, all context data is returned.',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      description: 'Selected context values as the run result',
    },
  },
  async execute(ctx, config) {
    const keys = config.outputKeys;
    const outputs: Record<string, unknown> = {};

    if (keys && keys.length > 0) {
      for (const key of keys) {
        outputs[key] = ctx.get(key);
      }
    } else {
      Object.assign(outputs, ctx.data);
    }

    return { status: 'complete', outputs };
  },
};

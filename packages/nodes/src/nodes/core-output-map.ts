import type { NodeModule } from '@magicaal/sdk-node';

interface OutputMapConfig {
  mapping: Record<string, string>;
}

export const coreOutputMap: NodeModule<OutputMapConfig> = {
  type: 'core:output-map',
  meta: {
    name: 'Output Map',
    description: 'Remaps context keys after a sub-graph returns. Maps parent context key → source key from sub-graph output.',
    category: 'composition',
    icon: 'arrow-left-right',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['mapping'],
      properties: {
        mapping: {
          type: 'object',
          description: 'Parent context key → source key in context (from sub-graph output)',
          additionalProperties: { type: 'string' },
        },
      },
    },
    input:  {},
    output: {},
  },
  async execute(ctx, config) {
    const outputs: Record<string, unknown> = {};
    for (const [targetKey, sourceKey] of Object.entries(config.mapping)) {
      const value = ctx.get(sourceKey);
      ctx.set(targetKey, value);
      outputs[targetKey] = value;
    }
    return { status: 'complete', outputs };
  },
};

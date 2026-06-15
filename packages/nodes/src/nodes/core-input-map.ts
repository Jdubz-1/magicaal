import type { NodeModule } from '@magicaal/sdk-node';
import { evaluate } from '../utils/jsonata';

interface InputMapConfig {
  mapping: Record<string, string>;
}

export const coreInputMap: NodeModule<InputMapConfig> = {
  type: 'core:input-map',
  meta: {
    name: 'Input Map',
    description: 'Maps context keys into a sub-graph input namespace using JSONata expressions. Place before core:sub-graph.',
    category: 'composition',
    icon: 'arrow-right-left',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['mapping'],
      properties: {
        mapping: {
          type: 'object',
          description: 'Output context key → JSONata expression evaluated against current context',
          additionalProperties: { type: 'string' },
        },
      },
    },
    input:  {},
    output: {},
  },
  async execute(ctx, config) {
    const outputs: Record<string, unknown> = {};
    for (const [key, expression] of Object.entries(config.mapping)) {
      const value = await evaluate(expression, ctx.data);
      ctx.set(key, value);
      outputs[key] = value;
    }
    return { status: 'complete', outputs };
  },
};

import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';
import { evaluate } from '../utils/jsonata';

interface TransformConfig {
  expression: string;
  outputKey: string;
}

export const coreTransform: NodeModule<TransformConfig> = {
  type: 'core:transform',
  meta: {
    name: 'Transform',
    description: 'Evaluates a JSONata expression and writes the result to a context key',
    category: 'data',
    icon: 'shuffle',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['expression', 'outputKey'],
      properties: {
        expression: {
          type: 'string',
          description: 'JSONata expression evaluated against the current context data',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write the transformed result to',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _transform_result: {},
      },
    },
  },
  async execute(ctx: ExecutionContext, config: TransformConfig) {
    const result = await evaluate(config.expression, ctx.data);
    ctx.set(config.outputKey, result);
    ctx.set('_transform_result', result);

    return {
      status: 'complete' as const,
      outputs: { [config.outputKey]: result, _transform_result: result },
    };
  },
};

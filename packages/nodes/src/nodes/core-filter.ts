import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';
import { evaluateBoolean } from '../utils/jsonata';

interface FilterConfig {
  expression: string;
}

export const coreFilter: NodeModule<FilterConfig> = {
  type: 'core:filter',
  meta: {
    name: 'Filter',
    description:
      'Evaluates a boolean JSONata expression. Passes context through when true; the fallback edge fires when false, allowing downstream filtering without branching nodes.',
    category: 'data',
    icon: 'filter',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['expression'],
      properties: {
        expression: {
          type: 'string',
          description: 'JSONata expression that must evaluate to true to pass',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _filter_pass: { type: 'boolean' },
      },
    },
  },
  async execute(ctx: ExecutionContext, config: FilterConfig) {
    const pass = await evaluateBoolean(config.expression, ctx.data);
    ctx.set('_filter_pass', pass);

    return {
      status: 'complete' as const,
      outputs: { _filter_pass: pass },
    };
  },
};

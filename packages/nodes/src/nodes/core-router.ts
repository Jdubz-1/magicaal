import type { NodeModule } from '@magicaal/sdk-node';
import { evaluateString } from '../utils/jsonata';

interface RouterConfig {
  expression: string;
  cases: string[];
}

export const coreRouter: NodeModule<RouterConfig> = {
  type: 'core:router',
  meta: {
    name: 'Router',
    description: 'Evaluates a JSONata expression that returns a case key string. Writes the result to _route. Connect outbound conditional edges with conditions like: $._route == "case-name".',
    category: 'control-flow',
    icon: 'shuffle',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['expression', 'cases'],
      properties: {
        expression: {
          type: 'string',
          description: 'JSONata expression that returns a case key string',
        },
        cases: {
          type: 'array',
          items: { type: 'string' },
          description: 'Declared case keys; each must have a matching outbound conditional edge',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _route: { type: 'string' },
      },
    },
  },
  async execute(ctx, config) {
    const route = await evaluateString(config.expression, ctx.data);
    ctx.set('_route', route);
    return { status: 'complete', outputs: { _route: route } };
  },
};

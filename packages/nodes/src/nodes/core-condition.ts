import type { NodeModule } from '@magicaal/sdk-node';
import { evaluateBoolean } from '../utils/jsonata';

interface ConditionConfig {
  expression: string;
}

export const coreCondition: NodeModule<ConditionConfig> = {
  type: 'core:condition',
  meta: {
    name: 'Condition',
    description: 'Evaluates a JSONata boolean expression against context data. Writes the result to _condition. Connect outbound edges with conditions: $._condition == true and $._condition == false.',
    category: 'control-flow',
    icon: 'git-branch',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['expression'],
      properties: {
        expression: {
          type: 'string',
          description: 'JSONata expression that evaluates to a boolean',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _condition: { type: 'boolean' },
      },
    },
  },
  async execute(ctx, config) {
    const result = await evaluateBoolean(config.expression, ctx.data);
    ctx.set('_condition', result);
    return { status: 'complete', outputs: { _condition: result } };
  },
};

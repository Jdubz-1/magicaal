import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';

type AggregateOperation = 'sum' | 'count' | 'collect' | 'min' | 'max' | 'average' | 'first' | 'last';

interface AggregateConfig {
  inputKey: string;
  operation: AggregateOperation;
  outputKey: string;
  valueKey?: string;
}

export const coreAggregate: NodeModule<AggregateConfig> = {
  type: 'core:aggregate',
  meta: {
    name: 'Aggregate',
    description: 'Reduces an array at a context key using a specified aggregation operation',
    category: 'data',
    icon: 'sigma',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['inputKey', 'operation', 'outputKey'],
      properties: {
        inputKey: {
          type: 'string',
          description: 'Context key containing the array to aggregate',
        },
        operation: {
          type: 'string',
          enum: ['sum', 'count', 'collect', 'min', 'max', 'average', 'first', 'last'],
          description: 'Aggregation operation to perform',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write the aggregated result to',
        },
        valueKey: {
          type: 'string',
          description: 'For sum/min/max/average: the property key to use from each array item (omit to use item directly as a number)',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _aggregate_result: {},
      },
    },
  },
  async execute(ctx: ExecutionContext, config: AggregateConfig) {
    const arr = ctx.get(config.inputKey);
    if (!Array.isArray(arr)) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'AGGREGATE_NOT_ARRAY',
          message: `Context key "${config.inputKey}" is not an array`,
          retryable: false,
        },
      };
    }

    let result: unknown;
    const nums = (): number[] =>
      arr.map((item) => {
        const v = config.valueKey
          ? (item as Record<string, unknown>)[config.valueKey]
          : item;
        return Number(v);
      }).filter((n) => !isNaN(n));

    switch (config.operation) {
      case 'count':
        result = arr.length;
        break;
      case 'collect':
        result = arr;
        break;
      case 'first':
        result = arr[0] ?? null;
        break;
      case 'last':
        result = arr[arr.length - 1] ?? null;
        break;
      case 'sum':
        result = nums().reduce((a, b) => a + b, 0);
        break;
      case 'min':
        result = nums().length > 0 ? Math.min(...nums()) : null;
        break;
      case 'max':
        result = nums().length > 0 ? Math.max(...nums()) : null;
        break;
      case 'average': {
        const n = nums();
        result = n.length > 0 ? n.reduce((a, b) => a + b, 0) / n.length : null;
        break;
      }
    }

    ctx.set(config.outputKey, result);
    ctx.set('_aggregate_result', result);

    return {
      status: 'complete' as const,
      outputs: { [config.outputKey]: result, _aggregate_result: result },
    };
  },
};

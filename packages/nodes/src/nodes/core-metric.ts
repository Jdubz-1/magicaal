import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';
import { evaluateString } from '../utils/jsonata';

interface MetricConfig {
  name: string;
  valueKey?: string;
  value?: number;
}

export const coreMetric: NodeModule<MetricConfig> = {
  type: 'core:metric',
  meta: {
    name: 'Metric',
    description: 'Emits a named numeric metric for the current run. Recorded in telemetry and visible in the Admin telemetry dashboard.',
    category: 'observability',
    icon: 'bar-chart',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
          description: 'Metric name (e.g. "tokens_used", "items_processed")',
        },
        value: {
          type: 'number',
          description: 'Static numeric value to record (used if valueKey is not set)',
        },
        valueKey: {
          type: 'string',
          description: 'JSONata expression to resolve the metric value from context (overrides value)',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _metric_recorded: { type: 'boolean' },
      },
    },
  },
  async execute(ctx: ExecutionContext, config: MetricConfig) {
    let numValue: number;

    if (config.valueKey) {
      const resolved = await evaluateString(config.valueKey, ctx.data);
      numValue = parseFloat(resolved);
      if (isNaN(numValue)) {
        return {
          status: 'failed' as const,
          outputs: {},
          error: {
            code: 'METRIC_VALUE_NOT_NUMBER',
            message: `Expression "${config.valueKey}" did not resolve to a number`,
            retryable: false,
          },
        };
      }
    } else {
      numValue = config.value ?? 1;
    }

    ctx.metric(config.name, numValue);
    ctx.set('_metric_recorded', true);

    return {
      status: 'complete' as const,
      outputs: { _metric_recorded: true },
    };
  },
};

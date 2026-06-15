import type { NodeModule } from '@magicaal/sdk-node';

interface FanOutConfig {
  arrayKey: string;
  itemKey?: string;
}

export const coreFanOut: NodeModule<FanOutConfig> = {
  type: 'core:fan-out',
  meta: {
    name: 'Fan-Out',
    description: 'Spawns a parallel branch per item in a named array. Pair with core:reduce to collect results.',
    category: 'composition',
    icon: 'split',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['arrayKey'],
      properties: {
        arrayKey: { type: 'string', description: 'Context key containing the array to fan out over' },
        itemKey:  { type: 'string', description: 'Context key for each item in each branch (default: _fanout_item)' },
      },
    },
    input:  {},
    output: {
      type: 'object',
      properties: {
        _fanout_count: { type: 'number' },
      },
    },
  },
  async execute(ctx, config) {
    // Validate the array exists
    const items = ctx.get<unknown[]>(config.arrayKey);
    if (!Array.isArray(items)) {
      return {
        status: 'failed',
        outputs: {},
        error: {
          code: 'FAN_OUT_INVALID_INPUT',
          message: `Expected an array at context key "${config.arrayKey}", got ${typeof items}`,
          retryable: false,
        },
      };
    }
    // Actual parallel execution is handled by the engine worker's fan-out special case
    ctx.set('_fanout_count', items.length);
    return { status: 'complete', outputs: { _fanout_count: items.length } };
  },
};

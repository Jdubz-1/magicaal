import type { NodeModule } from '@magicaal/sdk-node';
import { stripInternalKeys } from '../utils/internal-keys';

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
          description:
            'Context keys to include in the run output. If omitted, all context data is returned except engine-internal `_`-prefixed keys.',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      description:
        'Selected context values as the run result. Without outputKeys, the full context minus engine-internal `_`-prefixed keys.',
    },
  },
  async execute(ctx, config) {
    const keys = config.outputKeys;
    const outputs: Record<string, unknown> = {};

    if (keys && keys.length > 0) {
      // An explicit selection is honoured verbatim — including an internal key,
      // if the author deliberately asked for one.
      for (const key of keys) {
        outputs[key] = ctx.get(key);
      }
    } else {
      Object.assign(outputs, stripInternalKeys(ctx.data));
    }

    return { status: 'complete', outputs };
  },
};

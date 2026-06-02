import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';
import { evaluateBoolean } from '../utils/jsonata';

interface LoopConfig {
  condition: string;
  maxIterations?: number;
  iterationKey?: string;
}

export const coreLoop: NodeModule<LoopConfig> = {
  type: 'core:loop',
  meta: {
    name: 'Loop',
    description:
      'Controls a cycle in the graph. On each pass it evaluates the condition: true continues the loop (back edge fires), false exits to the next unconditional edge. The engine tracks iteration count and enforces maxIterations.',
    category: 'control-flow',
    icon: 'repeat',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['condition'],
      properties: {
        condition: {
          type: 'string',
          description: 'JSONata boolean — true continues the loop, false exits',
        },
        maxIterations: {
          type: 'number',
          description: 'Hard cap on loop iterations (default: 50). The engine enforces this independently.',
        },
        iterationKey: {
          type: 'string',
          description: 'Context key to write the current iteration index to (0-based)',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _loop_continue: { type: 'boolean' },
        _loop_iteration: { type: 'number' },
      },
    },
  },
  async execute(ctx: ExecutionContext, config: LoopConfig) {
    const iteration = (ctx.get<number>('_loop_iteration') ?? -1) + 1;
    ctx.set('_loop_iteration', iteration);

    if (config.iterationKey) {
      ctx.set(config.iterationKey, iteration);
    }

    const continueLoop = await evaluateBoolean(config.condition, ctx.data);
    ctx.set('_loop_continue', continueLoop);

    return {
      status: 'complete' as const,
      outputs: { _loop_continue: continueLoop, _loop_iteration: iteration },
    };
  },
};

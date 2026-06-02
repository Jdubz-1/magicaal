import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';
import { evaluateBoolean } from '../utils/jsonata';

interface WaitConfig {
  mode: 'delay' | 'condition';
  delayMs?: number;
  condition?: string;
  pollIntervalMs?: number;
  timeoutMs?: number;
}

const DEFAULT_POLL_INTERVAL = 500;
const DEFAULT_TIMEOUT = 30_000;

export const coreWait: NodeModule<WaitConfig> = {
  type: 'core:wait',
  meta: {
    name: 'Wait',
    description:
      'Pauses execution for a fixed delay or until a JSONata condition resolves to true. Times out and routes to the fallback edge if the condition is never met.',
    category: 'control-flow',
    icon: 'clock',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['mode'],
      properties: {
        mode: {
          type: 'string',
          enum: ['delay', 'condition'],
          description: '"delay": pause for delayMs milliseconds. "condition": poll until expression is true.',
        },
        delayMs: {
          type: 'number',
          description: 'Delay in milliseconds (mode: delay)',
        },
        condition: {
          type: 'string',
          description: 'JSONata boolean expression to poll (mode: condition)',
        },
        pollIntervalMs: {
          type: 'number',
          description: 'Polling interval in milliseconds (default: 500)',
        },
        timeoutMs: {
          type: 'number',
          description: 'Maximum wait time in milliseconds before timing out (default: 30000)',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _wait_elapsed_ms: { type: 'number' },
        _wait_timed_out: { type: 'boolean' },
      },
    },
  },
  async execute(ctx: ExecutionContext, config: WaitConfig) {
    const start = Date.now();

    if (config.mode === 'delay') {
      const delayMs = config.delayMs ?? 0;
      await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
      const elapsed = Date.now() - start;
      ctx.set('_wait_elapsed_ms', elapsed);
      ctx.set('_wait_timed_out', false);
      return {
        status: 'complete' as const,
        outputs: { _wait_elapsed_ms: elapsed, _wait_timed_out: false },
      };
    }

    // condition mode
    const pollInterval = config.pollIntervalMs ?? DEFAULT_POLL_INTERVAL;
    const timeout = config.timeoutMs ?? DEFAULT_TIMEOUT;
    const expression = config.condition ?? 'true';

    while (true) {
      const met = await evaluateBoolean(expression, ctx.data);
      if (met) {
        const elapsed = Date.now() - start;
        ctx.set('_wait_elapsed_ms', elapsed);
        ctx.set('_wait_timed_out', false);
        return {
          status: 'complete' as const,
          outputs: { _wait_elapsed_ms: elapsed, _wait_timed_out: false },
        };
      }

      if (Date.now() - start >= timeout) {
        const elapsed = Date.now() - start;
        ctx.set('_wait_elapsed_ms', elapsed);
        ctx.set('_wait_timed_out', true);
        return {
          status: 'complete' as const,
          outputs: { _wait_elapsed_ms: elapsed, _wait_timed_out: true },
        };
      }

      await new Promise<void>((resolve) => setTimeout(resolve, pollInterval));
    }
  },
};

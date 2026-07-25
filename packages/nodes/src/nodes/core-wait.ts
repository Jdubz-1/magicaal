import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';
import * as crypto from 'node:crypto';
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

/**
 * Waits at or below this stay an in-process sleep (negligible worker-slot
 * cost); longer waits suspend and resume via a delayed BullMQ job instead of
 * holding a worker slot for the whole duration (ALIGN-031).
 */
const WAIT_SUSPEND_THRESHOLD_MS = 5_000;

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

      if (delayMs > WAIT_SUSPEND_THRESHOLD_MS) {
        // Same self-identification pattern core:mcp-client uses: the engine
        // worker sets _currentNodeId synchronously before this call. The
        // resume flag is node-scoped (unlike core-human-review's global
        // _review_approved) so a graph with more than one Wait node resumes
        // each independently instead of the second silently skipping suspend.
        const nodeId = (ctx as unknown as Record<string, unknown>)._currentNodeId as string | undefined;
        const resumedKey = `_wait_resumed__${nodeId ?? 'unknown'}`;
        const startedAtKey = `_wait_started_at__${nodeId ?? 'unknown'}`;

        if (ctx.get<boolean>(resumedKey) === true) {
          const elapsed = Date.now() - (ctx.get<number>(startedAtKey) ?? start);
          ctx.set('_wait_elapsed_ms', elapsed);
          ctx.set('_wait_timed_out', false);
          return {
            status: 'complete' as const,
            outputs: { _wait_elapsed_ms: elapsed, _wait_timed_out: false },
          };
        }

        ctx.set(startedAtKey, start);
        ctx.set(resumedKey, true);
        ctx.suspend(`wait_${crypto.randomUUID()}`, { resumeAt: start + delayMs });
        return { status: 'suspended' as const, outputs: {} };
      }

      await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
      const elapsed = Date.now() - start;
      ctx.set('_wait_elapsed_ms', elapsed);
      ctx.set('_wait_timed_out', false);
      return {
        status: 'complete' as const,
        outputs: { _wait_elapsed_ms: elapsed, _wait_timed_out: false },
      };
    }

    // condition mode — always in-process. Repeated re-evaluation doesn't fit
    // the single-delayed-resume model a suspend/resume needs, so long
    // condition polls intentionally keep holding a worker slot for their
    // full duration (ALIGN-031 covers delay mode only).
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

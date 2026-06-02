import { Worker } from 'bullmq';
import { redis, runTriggerQueue, runScheduledQueue } from '../queue/client';
import { graphLoader } from '../graph/graph-loader';
import { ExecutionContextImpl } from './context';
import { lifecycle } from './lifecycle';
import { executeGraph } from './worker';
import { resolveCredentials } from '../resolver/credential-resolver';
import { logger } from '../lib/logger';
import type { ModelRouterConfig } from '@magicaal/core';

interface RunJobData {
  runId: string;
  agentId: string;
  tenantId: string;
  triggerType: string;
  input: Record<string, unknown>;
  resumeFromNodeId?: string;
}

export function startScheduler(): void {
  const worker = new Worker<RunJobData>(
    'runs.trigger',
    async (job) => {
      const { runId, agentId, tenantId, triggerType, input, resumeFromNodeId } = job.data;

      let graph = await graphLoader.load(agentId);

      const graphDefaultRouter =
        graph.config?.defaultRouter && typeof graph.config.defaultRouter === 'object'
          ? (graph.config.defaultRouter as ModelRouterConfig)
          : null;

      const ctx = new ExecutionContextImpl({ runId, agentId, tenantId, triggerType, input, graphDefaultRouter });

      await lifecycle.markRunStarted(runId, agentId);

      try {
        // Resolve integration credentials inside the error-handled block
        await resolveCredentials(graph, ctx);

        // For resumed runs, override graph entry with the suspended node so execution
        // continues from where it left off (the human-review node's successors)
        if (resumeFromNodeId) {
          graph = { ...graph, entry: resumeFromNodeId };
        }

        await executeGraph(runId, graph, ctx);

        if (ctx.isSuspended) {
          await lifecycle.markRunSuspended(runId, ctx.suspendReviewId ?? '', ctx, ctx.suspendedNodeId);
        } else {
          await lifecycle.markRunComplete(runId, ctx.data, ctx);
        }
      } catch (err) {
        const error = {
          code: 'EXECUTION_ERROR',
          message: err instanceof Error ? err.message : String(err),
          retryable: false,
        };
        await lifecycle.markRunFailed(runId, error, ctx);
        throw err;
      }
    },
    { connection: redis, concurrency: 10 },
  );

  worker.on('failed', (job, err) => {
    logger.error({ jobId: job?.id, error: err.message }, 'Run job failed');
  });

  // Scheduled (cron) queue — same processor, BullMQ handles repeat scheduling
  const scheduledWorker = new Worker<RunJobData>(
    'runs.scheduled',
    async (job) => {
      // Re-enqueue to the trigger queue so the same processor handles execution
      const { agentId, tenantId, input } = job.data;
      await runTriggerQueue.add('run', {
        runId: `run_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`,
        agentId,
        tenantId,
        triggerType: 'cron',
        input: input ?? {},
      });
    },
    { connection: redis, concurrency: 5 },
  );

  scheduledWorker.on('failed', (job, err) => {
    logger.error({ jobId: job?.id, error: err.message }, 'Scheduled run job failed');
  });

  logger.info('Run scheduler started (trigger + scheduled queues)');
}

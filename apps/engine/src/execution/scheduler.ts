import { Worker } from 'bullmq';
import { redis } from '../queue/client';
import { graphLoader } from '../graph/graph-loader';
import { ExecutionContextImpl } from './context';
import { lifecycle } from './lifecycle';
import { executeGraph } from './worker';
import { logger } from '../lib/logger';

interface RunJobData {
  runId: string;
  agentId: string;
  tenantId: string;
  triggerType: string;
  input: Record<string, unknown>;
}

export function startScheduler(): void {
  const worker = new Worker<RunJobData>(
    'runs.trigger',
    async (job) => {
      const { runId, agentId, tenantId, triggerType, input } = job.data;

      const graph = await graphLoader.load(agentId);
      const ctx = new ExecutionContextImpl({ runId, agentId, tenantId, triggerType, input });

      await lifecycle.markRunStarted(runId);

      try {
        await executeGraph(runId, graph, ctx);

        if (ctx.isSuspended) {
          await lifecycle.markRunSuspended(runId, ctx.suspendReviewId ?? '', ctx);
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

  logger.info('Run scheduler started');
}

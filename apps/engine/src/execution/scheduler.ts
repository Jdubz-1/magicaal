import { Worker } from 'bullmq';
import * as crypto from 'node:crypto';
import { redis, runTriggerQueue } from '../queue/client';
import { graphLoader } from '../graph/graph-loader';
import { ExecutionContextImpl } from './context';
import { lifecycle } from './lifecycle';
import { executeGraph } from './worker';
import { resolveCredentials } from '../resolver/credential-resolver';
import { logger } from '../lib/logger';
import { sessionManager } from '../session/session-manager';
import { checkAbort, clearAbort, startRunDeadline } from './run-control';
import { config } from '../config';
import type { ModelRouterConfig, SessionConfig } from '@magicaal/core';

interface RunJobData {
  runId: string;
  agentId: string;
  tenantId: string;
  triggerType: string;
  input: Record<string, unknown>;
  resumeFromNodeId?: string;
  sessionId?: string;
}

export function startScheduler(): void {
  const worker = new Worker<RunJobData>(
    'runs.trigger',
    async (job) => {
      const { runId, agentId, tenantId, triggerType, input, resumeFromNodeId, sessionId } = job.data;

      // Cancelled while still queued — the cancel endpoint already marked the
      // run; consume the flag and never start executing.
      if (await checkAbort(runId)) {
        await clearAbort(runId);
        return;
      }

      let graph = await graphLoader.load(agentId, tenantId);

      const graphDefaultRouter =
        graph.config?.defaultRouter && typeof graph.config.defaultRouter === 'object'
          ? (graph.config.defaultRouter as ModelRouterConfig)
          : null;

      const ctx = new ExecutionContextImpl({ runId, agentId, tenantId, triggerType, input, graphDefaultRouter, sessionId });

      await lifecycle.markRunStarted(runId, agentId);

      // Run timeout (ALIGN-002): AgentConfig.timeout, else the platform
      // default. Fires the cooperative abort flag; the worker fails the run
      // with RUN_TIMEOUT at its next node boundary.
      const timeoutMs =
        typeof graph.config?.timeout === 'number' && graph.config.timeout > 0
          ? graph.config.timeout
          : config.defaultRunTimeoutMs;
      const disarmDeadline = startRunDeadline(runId, timeoutMs);

      try {
        // Resolve integration credentials inside the error-handled block
        await resolveCredentials(graph, ctx);

        // Load session context before graph execution
        const sessionConfig = graph.config?.session as SessionConfig | undefined;
        if (sessionId && sessionConfig?.enabled) {
          try {
            const loaded = await sessionManager.loadSession(sessionId, agentId, tenantId, sessionConfig);
            for (const [key, value] of loaded.contextEntries) {
              ctx.set(key, value);
            }
            const isChildRun = triggerType === 'sub-graph' || triggerType === 'handoff';
            await sessionManager.recordRunLink(sessionId, runId, isChildRun);
          } catch (err) {
            const code = (err as { code?: string }).code;
            if (code === 'SESSION_EXPIRED') throw err;
            // Non-fatal: log and continue without session
            logger.warn({ sessionId, runId, err }, 'Session load failed — running without session context');
          }
        }

        // For resumed runs, override graph entry with the suspended node so execution
        // continues from where it left off (the human-review node's successors)
        if (resumeFromNodeId) {
          graph = { ...graph, entry: resumeFromNodeId };
        }

        await executeGraph(runId, graph, ctx);

        // Save session context after graph execution
        if (sessionId && sessionConfig?.enabled) {
          await sessionManager.saveSession(sessionId, runId, ctx.data, sessionConfig);
        }

        if (ctx.isSuspended) {
          await lifecycle.markRunSuspended(runId, ctx.suspendReviewId ?? '', ctx, ctx.suspendedNodeId);
        } else {
          await lifecycle.markRunComplete(runId, ctx.data, ctx);
        }
      } catch (err) {
        // Still attempt session save on non-session errors so partial progress is preserved
        const code = (err as { code?: string }).code;
        if (sessionId && graph.config?.session && code !== 'SESSION_EXPIRED' && code !== 'SESSION_LOAD_ERROR') {
          await sessionManager.saveSession(sessionId, runId, ctx.data, graph.config.session as SessionConfig).catch(() => {});
        }

        // Cooperative aborts are outcomes, not job failures — record the
        // terminal state and swallow so BullMQ does not count a retry.
        if (code === 'RUN_CANCELLED') {
          await lifecycle.markRunCancelled(runId, ctx);
          return;
        }
        if (code === 'RUN_TIMEOUT') {
          await lifecycle.markRunFailed(
            runId,
            { code: 'RUN_TIMEOUT', message: 'Run exceeded its configured timeout', retryable: false },
            ctx,
          );
          return;
        }

        const error = {
          code: 'EXECUTION_ERROR',
          message: err instanceof Error ? err.message : String(err),
          retryable: false,
        };
        await lifecycle.markRunFailed(runId, error, ctx);
        throw err;
      } finally {
        disarmDeadline();
        await clearAbort(runId).catch(() => {});
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
        runId: `run_${crypto.randomUUID()}`,
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

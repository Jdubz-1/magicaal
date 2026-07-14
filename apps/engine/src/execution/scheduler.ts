import { Worker } from 'bullmq';
import * as crypto from 'node:crypto';
import { redis, runTriggerQueue, runRetryQueue } from '../queue/client';
import { graphLoader } from '../graph/graph-loader';
import { ExecutionContextImpl } from './context';
import { lifecycle } from './lifecycle';
import { executeGraph } from './worker';
import { resolveCredentials } from '../resolver/credential-resolver';
import { logger } from '../lib/logger';
import { sessionManager } from '../session/session-manager';
import {
  checkAbort,
  clearAbort,
  startRunDeadline,
  planRetry,
  acquireRunSlot,
  releaseRunSlot,
  admissionDecision,
} from './run-control';
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
  /** Per-node execution counts, carried across retry re-enqueues (ALIGN-004). */
  nodeAttempts?: Record<string, number>;
  /** First-dispatch timestamp, preserved across admission deferrals (ALIGN-003). */
  enqueuedAt?: number;
}

export function startScheduler(): void {
  const worker = new Worker<RunJobData>(
    'runs.trigger',
    async (job) => {
      const { runId, agentId, tenantId, triggerType, input, resumeFromNodeId, sessionId, nodeAttempts = {} } = job.data;

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

      // Concurrency admission (ALIGN-003): per-tenant cap (env, until tenant
      // DB limits are enforced) and per-agent ConcurrencyConfig.maxParallel.
      // Over-limit jobs are re-queued with a short jittered delay; jobs that
      // out-wait ConcurrencyConfig.queueTimeout fail with QUEUE_TIMEOUT.
      const concurrency = graph.config?.concurrency;
      const enqueuedAt = job.data.enqueuedAt ?? job.timestamp;
      const slots = await acquireRunSlot(tenantId, agentId);
      const decision = admissionDecision({
        slots,
        tenantCap: config.maxConcurrentRunsPerTenant,
        maxParallel: concurrency?.maxParallel,
        enqueuedAt,
        queueTimeoutMs: concurrency?.queueTimeout,
      });
      if (decision !== 'run') {
        await releaseRunSlot(tenantId, agentId);
        if (decision === 'queue_timeout') {
          await lifecycle.markRunFailed(
            runId,
            { code: 'QUEUE_TIMEOUT', message: 'Run exceeded its concurrency queue timeout', retryable: false },
            ctx,
          );
          return;
        }
        await runTriggerQueue.add(
          'run-defer',
          { ...job.data, enqueuedAt },
          { delay: 1_000 + Math.floor(Math.random() * 500) },
        );
        return;
      }

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
          await sessionManager.saveSession(sessionId, runId, ctx.data, sessionConfig, graphDefaultRouter);
        }

        if (ctx.isSuspended) {
          await lifecycle.markRunSuspended(runId, ctx.suspendReviewId ?? '', ctx, ctx.suspendedNodeId);
        } else {
          await lifecycle.markRunComplete(runId, ctx.data, ctx);
        }
      } catch (err) {
        const code = (err as { code?: string }).code;

        // Node-level retry with backoff (ALIGN-004): a retryable node failure
        // with attempts remaining re-enqueues the run through runs.retry,
        // resuming from the failed node with the checkpointed context. Checked
        // before the session save — the retry carries ctx.data in its job
        // input, and saving here would double-accumulate append keys when the
        // retried run saves again. (Abort errors are never retryable.)
        const plan = planRetry(
          err as { retryable?: boolean; failedNodeId?: string },
          graph.config?.retry,
          nodeAttempts,
        );
        if (plan) {
          await lifecycle.markRunRetrying(runId, plan.failedNodeId, plan.attemptsMade + 1, plan.delayMs);
          await runRetryQueue.add(
            'run-retry',
            {
              ...job.data,
              input: ctx.data,
              resumeFromNodeId: plan.failedNodeId,
              nodeAttempts: { ...nodeAttempts, [plan.failedNodeId]: plan.attemptsMade },
            },
            { delay: plan.delayMs },
          );
          logger.info(
            { runId, nodeId: plan.failedNodeId, attempt: plan.attemptsMade + 1, delayMs: plan.delayMs },
            'Retryable node failure — run requeued with backoff',
          );
          return;
        }

        // Still attempt session save on non-session errors so partial progress is preserved
        if (sessionId && graph.config?.session && code !== 'SESSION_EXPIRED' && code !== 'SESSION_LOAD_ERROR') {
          await sessionManager
            .saveSession(sessionId, runId, ctx.data, graph.config.session as SessionConfig, graphDefaultRouter)
            .catch(() => {});
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
          code: (err as { code?: string }).code ?? 'EXECUTION_ERROR',
          message: err instanceof Error ? err.message : String(err),
          retryable: false,
        };
        await lifecycle.markRunFailed(runId, error, ctx);
        throw err;
      } finally {
        disarmDeadline();
        await releaseRunSlot(tenantId, agentId).catch(() => {});
        await clearAbort(runId).catch(() => {});
      }
    },
    { connection: redis, concurrency: config.workerConcurrency },
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

  // Retry queue (ALIGN-004) — jobs arrive here with their backoff delay
  // already applied; pass through to the trigger queue for normal execution.
  const retryWorker = new Worker<RunJobData>(
    'runs.retry',
    async (job) => {
      await runTriggerQueue.add('run-retry', job.data);
    },
    { connection: redis, concurrency: 5 },
  );

  retryWorker.on('failed', (job, err) => {
    logger.error({ jobId: job?.id, error: err.message }, 'Retry run job failed');
  });

  logger.info('Run scheduler started (trigger + scheduled + retry queues)');
}

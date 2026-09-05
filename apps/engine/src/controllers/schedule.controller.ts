import type { RequestHandler } from 'express';
import { runScheduledQueue } from '../queue/client';
import { logger } from '../lib/logger';

/**
 * Remove the repeatable job for an agent, if one is registered. Shared by the
 * unschedule route and by agent teardown — BullMQ keys repeatables by an opaque
 * key, so the only way to target one is to scan for the job name.
 */
export async function removeAgentSchedule(agentId: string): Promise<number> {
  const existingJobs = await runScheduledQueue.getRepeatableJobs();
  let removed = 0;
  for (const job of existingJobs) {
    if (job.name === `cron:${agentId}`) {
      await runScheduledQueue.removeRepeatableByKey(job.key);
      removed++;
    }
  }
  return removed;
}

export const scheduleCronAgent: RequestHandler = async (req, res, next) => {
  try {
    const { agentId, tenantId, cronExpression } = req.body as {
      agentId?: string;
      tenantId?: string;
      cronExpression?: string;
    };

    if (!agentId || !tenantId || !cronExpression) {
      throw Object.assign(
        new Error('agentId, tenantId, and cronExpression are required'),
        { status: 400 },
      );
    }

    // Remove existing repeating job for this agent if any
    await removeAgentSchedule(agentId);

    // Add new repeating job
    await runScheduledQueue.add(
      `cron:${agentId}`,
      { agentId, tenantId, triggerType: 'cron', input: {} },
      { repeat: { pattern: cronExpression } },
    );

    logger.info({ agentId, cronExpression }, 'Cron job scheduled');
    res.json({ agentId, cronExpression, scheduled: true });
  } catch (err) {
    next(err);
  }
};

export const unscheduleCronAgent: RequestHandler = async (req, res, next) => {
  try {
    const { agentId } = req.params;

    const removed = await removeAgentSchedule(agentId);

    logger.info({ agentId, removed }, 'Cron job removed');
    res.json({ agentId, removed });
  } catch (err) {
    next(err);
  }
};

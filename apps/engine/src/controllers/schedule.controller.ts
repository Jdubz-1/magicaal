import type { RequestHandler } from 'express';
import { runScheduledQueue } from '../queue/client';
import { logger } from '../lib/logger';

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
    const existingJobs = await runScheduledQueue.getRepeatableJobs();
    for (const job of existingJobs) {
      if (job.name === `cron:${agentId}`) {
        await runScheduledQueue.removeRepeatableByKey(job.key);
      }
    }

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

    const existingJobs = await runScheduledQueue.getRepeatableJobs();
    let removed = 0;
    for (const job of existingJobs) {
      if (job.name === `cron:${agentId}`) {
        await runScheduledQueue.removeRepeatableByKey(job.key);
        removed++;
      }
    }

    logger.info({ agentId, removed }, 'Cron job removed');
    res.json({ agentId, removed });
  } catch (err) {
    next(err);
  }
};

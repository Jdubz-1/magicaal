import { Redis } from 'ioredis';
import { Queue } from 'bullmq';
import { config } from '../config';

export const redis = new Redis(config.redisUrl, {
  maxRetriesPerRequest: null,
});

export const runTriggerQueue = new Queue('runs.trigger', { connection: redis });
export const runScheduledQueue = new Queue('runs.scheduled', { connection: redis });
export const runRetryQueue = new Queue('runs.retry', { connection: redis });

import type { Redis } from 'ioredis';
import { logger } from '../lib/logger';
import { ENGINE_INSTANCE_ID } from '../lib/instance-id';
import { graphLoader } from './graph-loader';

/**
 * Redis pub/sub graph cache invalidation (ALIGN-030), mirroring the working
 * package hot-load pattern in ../marketplace/hot-load.ts. graphLoader's
 * in-memory Map was previously invalidated only in-process — a deployAgent
 * call on one engine instance never reached the cache on any other, so a
 * horizontally scaled deployment would keep serving a stale graph from every
 * instance except the one that happened to receive the deploy request.
 */
export const GRAPH_INVALIDATE_CHANNEL = 'magicaal:graph-invalidate';

interface GraphInvalidateEvent {
  agentId: string;
  instanceId: string;
}

/** Invalidate locally and broadcast so every other engine instance follows suit. */
export async function publishGraphInvalidate(redis: Redis, agentId: string): Promise<void> {
  graphLoader.invalidate(agentId);
  const event: GraphInvalidateEvent = { agentId, instanceId: ENGINE_INSTANCE_ID };
  await redis.publish(GRAPH_INVALIDATE_CHANNEL, JSON.stringify(event));
}

/**
 * Subscribe to invalidation events from other instances. Uses a dedicated
 * connection (duplicate()) since a subscriber connection cannot issue normal
 * commands — same reasoning as startHotLoadSubscriber.
 */
export function startGraphInvalidateSubscriber(baseConnection: Redis): Redis {
  const subscriber = baseConnection.duplicate();

  subscriber.subscribe(GRAPH_INVALIDATE_CHANNEL, (err) => {
    if (err) {
      logger.error({ err }, 'Failed to subscribe to graph invalidate channel');
      return;
    }
    logger.info({ channel: GRAPH_INVALIDATE_CHANNEL }, 'Graph invalidate subscriber active');
  });

  subscriber.on('message', (channel, message) => {
    if (channel !== GRAPH_INVALIDATE_CHANNEL) return;
    try {
      const event = JSON.parse(message) as GraphInvalidateEvent;
      if (event.instanceId === ENGINE_INSTANCE_ID) return; // already invalidated locally
      graphLoader.invalidate(event.agentId);
      logger.debug({ agentId: event.agentId }, 'Graph cache invalidated via Redis event');
    } catch (err) {
      logger.error({ err, message }, 'Failed to apply graph invalidate event');
    }
  });

  return subscriber;
}

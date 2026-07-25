import * as crypto from 'node:crypto';

/**
 * Identifies this engine process for Redis pub/sub self-filtering — an
 * instance publishes an event after applying a change locally, and every
 * subscriber (including itself) receives it; comparing against this lets a
 * publisher's own subscriber ignore the event it just caused.
 *
 * Shared by every pub/sub consumer (package hot-load, graph cache
 * invalidation) so one engine process has one identity, not one per channel.
 */
export const ENGINE_INSTANCE_ID = crypto.randomUUID();

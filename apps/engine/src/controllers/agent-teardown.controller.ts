import type { RequestHandler } from 'express';
import { redis } from '../queue/client';
import { publishGraphInvalidate } from '../graph/graph-invalidate';
import { countActiveRuns, purgeAgentTelemetry } from '../db/telemetry-retention';
import { removeAgentSchedule } from './schedule.controller';
import { logger } from '../lib/logger';

/**
 * Engine-side teardown for an agent the API is archiving or purging.
 *
 * The API cannot do any of this itself: the telemetry database belongs to the
 * engine, the repeatable cron jobs live in BullMQ, and graphLoader's cache is
 * in engine process memory. Doing it in one call also keeps the ordering in a
 * single place — the active-run check has to happen before the API mutates a
 * single row, which is why the API calls this first and treats a 409 here as
 * its own answer.
 *
 * Tenant ownership is the API layer's responsibility, per the existing
 * internal-route convention — this endpoint trusts the agentId it is given.
 */
export const teardownAgent: RequestHandler = async (req, res, next) => {
  try {
    const { id: agentId } = req.params;
    const purge = req.query.purge === 'true';

    // Nothing is torn down while work is still in flight. A suspended run's
    // checkpoint is its only resume state, and pending/running rows are owned
    // by live workers — the same three statuses the retention sweep refuses to
    // touch for the same reason.
    const activeRuns = await countActiveRuns(agentId);
    if (activeRuns > 0) {
      throw Object.assign(
        new Error(`Agent has ${activeRuns} run(s) in flight`),
        { status: 409, code: 'AGENT_HAS_ACTIVE_RUNS', activeRuns },
      );
    }

    const unscheduled = await removeAgentSchedule(agentId);

    // Required for archive as much as for purge: graphLoader.load serves a
    // cached graph without re-reading the row, so an archived agent would keep
    // executing on any instance still holding a warm entry.
    await publishGraphInvalidate(redis, agentId);

    const telemetry = purge ? await purgeAgentTelemetry(agentId) : { runsDeleted: 0 };

    logger.info(
      { agentId, purge, unscheduled, runsDeleted: telemetry.runsDeleted },
      'Agent torn down',
    );

    res.json({
      agentId,
      unscheduled,
      invalidated: true,
      telemetryRunsDeleted: telemetry.runsDeleted,
    });
  } catch (err) {
    next(err);
  }
};

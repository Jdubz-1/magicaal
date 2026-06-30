import type { RequestHandler } from 'express';
import { engineClient } from '../lib/engine-client';
import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { agents } from '../db/schema';


export const getTelemetry: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { agentId, limit = '50', status } = req.query as {
      agentId?: string;
      limit?: string;
      status?: string;
    };

    // Verify agent belongs to tenant if filtering by agentId
    if (agentId) {
      const agentRows = await db
        .select()
        .from(agents)
        .where(eq(agents.id, agentId));
      const agent = agentRows[0];
      if (!agent || agent.tenantId !== tenantId) {
        throw Object.assign(new Error('Agent not found'), { status: 404 });
      }
    }

    // Proxy to engine's telemetry endpoint
    const params: Record<string, string> = { tenantId, limit };
    if (agentId) params.agentId = agentId;
    if (status) params.status = status;

    const response = await engineClient.get('/internal/telemetry', { params });
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

export const getTokenUsage: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { agentId, period = 'day' } = req.query as {
      agentId?: string;
      period?: 'hour' | 'day' | 'week' | 'month';
    };

    const params: Record<string, string> = { tenantId, period };
    if (agentId) params.agentId = agentId;

    const response = await engineClient.get('/internal/telemetry/tokens', { params });
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

export const getTrajectory: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { runId } = req.params;
    const response = await engineClient.get(`/internal/telemetry/trajectory/${runId}`, {
      params: { tenantId },
    });
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

export const getRoutingEvents: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { agentId, limit = '100' } = req.query as { agentId?: string; limit?: string };
    const params: Record<string, string> = { tenantId, limit };
    if (agentId) params.agentId = agentId;
    const response = await engineClient.get('/internal/telemetry/routing-events', { params });
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

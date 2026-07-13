import type { RequestHandler } from 'express';
import { eq, and } from 'drizzle-orm';
import { db } from '../db/client';
import { agents, sessions, sessionContext } from '../db/schema';
import { engineClient } from '../lib/engine-client';
import { PLATFORM_TENANT_ID } from '../platform/bootstrap';

const CAAL_AGENT_HANDLE = 'caal-assistant';

export const invokeCaal: RequestHandler = async (req, res, next) => {
  try {
    const { userId, tenantId } = req.user!;
    const { message, graphState, selectedNodeIds, lastRunResult, agentId, sessionId: clientSessionId } = req.body as {
      message: string;
      graphState?: unknown;
      selectedNodeIds?: string[];
      lastRunResult?: unknown;
      agentId?: string;
      sessionId?: string;
    };

    if (!message) {
      throw Object.assign(new Error('message is required'), { status: 400 });
    }

    // Look up the Caal agent in the _platform tenant
    const caalAgentRows = await db
      .select({ id: agents.id })
      .from(agents)
      .where(and(eq(agents.handle, CAAL_AGENT_HANDLE), eq(agents.tenantId, PLATFORM_TENANT_ID)));

    if (!caalAgentRows[0]) {
      throw Object.assign(new Error('Caal assistant agent not available'), { status: 503 });
    }

    // Namespace the session ID so each user+agent context is isolated
    const sessionId = `_platform:caal-assistant:${tenantId}:${userId}:${clientSessionId ?? agentId ?? 'global'}`;

    const dispatchRes = await engineClient.post('/internal/runs', {
      agentId: caalAgentRows[0].id,
      tenantId: PLATFORM_TENANT_ID,
      triggerType: 'caal',
      // Studio-only, already authenticated by the platform JWT on this request:
      // a §11.4 exemption from the target agent's invocation policy.
      caller: { kind: 'platform', strategy: 'caal' },
      sessionId,
      input: {
        message,
        graphState: graphState ?? null,
        selectedNodeIds: selectedNodeIds ?? [],
        lastRunResult: lastRunResult ?? null,
        _invokerTenantId: tenantId,
        _invokerUserId: userId,
        _agentId: agentId ?? null,
      },
    });

    const { runId } = dispatchRes.data as { runId: string };

    // Poll for run completion and stream result back
    const start = Date.now();
    while (Date.now() - start < 30000) {
      await new Promise((r) => setTimeout(r, 500));
      const statusRes = await engineClient.get(`/internal/runs/${runId}`);
      const run = statusRes.data as { status: string; output?: Record<string, unknown>; error?: unknown };

      if (run.status === 'completed') {
        res.json({ runId, sessionId, output: run.output ?? {} });
        return;
      }

      if (run.status === 'failed' || run.status === 'cancelled') {
        throw Object.assign(
          new Error(`Caal run ${run.status}: ${JSON.stringify(run.error)}`),
          { status: 500 },
        );
      }
    }

    throw Object.assign(new Error('Caal invocation timed out'), { status: 504 });
  } catch (err) {
    next(err);
  }
};

export const getCaalSession: RequestHandler = async (req, res, next) => {
  try {
    const { userId, tenantId } = req.user!;
    const { agentId } = req.params;

    const sessionId = `_platform:caal-assistant:${tenantId}:${userId}:${agentId}`;

    const sessionRows = await db.select().from(sessions).where(eq(sessions.id, sessionId));
    if (!sessionRows[0]) {
      res.json({ sessionId, messages: [], proposalHistory: [] });
      return;
    }

    const contextRows = await db.select().from(sessionContext).where(eq(sessionContext.sessionId, sessionId));
    const context = Object.fromEntries(contextRows.map((r) => [r.key, JSON.parse(r.valueJson)]));

    res.json({
      sessionId,
      messages: context['messages'] ?? [],
      proposalHistory: context['proposalHistory'] ?? [],
      lastProposal: context['lastProposal'] ?? null,
    });
  } catch (err) {
    next(err);
  }
};

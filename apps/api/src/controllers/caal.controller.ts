import type { RequestHandler } from 'express';
import type { ModelRouterConfig } from '@magicaal/core';
import { eq, and } from 'drizzle-orm';
import { db } from '../db/client';
import { agents, sessions, sessionContext, caalConfiguration, namedRouterPolicies } from '../db/schema';
import { engineClient } from '../lib/engine-client';
import { PLATFORM_TENANT_ID } from '../platform/bootstrap';
import { config } from '../config';

const CAAL_AGENT_HANDLE = 'caal-assistant';

/**
 * Resolves the calling tenant's caal_configuration row into the pieces
 * invokeCaal needs: whether Caal is enabled, a routerOverride (only
 * buildable from routerPolicyId today — modelOverride is a bare model-name
 * string with no accompanying provider/connectionId, so there's no valid
 * ModelRouterTarget to build from it alone; see ISS-073), and the system
 * prompt suffix. Returns permissive defaults (enabled, no override) when no
 * row exists yet, matching upsertCaalConfig's own defaults.
 */
async function resolveCaalConfig(
  tenantId: string,
): Promise<{ enabled: boolean; routerOverride: ModelRouterConfig | null; systemPromptSuffix: string | null }> {
  const rows = await db.select().from(caalConfiguration).where(eq(caalConfiguration.tenantId, tenantId));
  const cfg = rows[0];
  if (!cfg) {
    return { enabled: true, routerOverride: null, systemPromptSuffix: null };
  }

  let routerOverride: ModelRouterConfig | null = null;
  if (cfg.routerPolicyId) {
    const policyRows = await db
      .select({ configJson: namedRouterPolicies.configJson })
      .from(namedRouterPolicies)
      .where(and(eq(namedRouterPolicies.id, cfg.routerPolicyId), eq(namedRouterPolicies.tenantId, tenantId)));
    if (policyRows[0]) {
      routerOverride = JSON.parse(policyRows[0].configJson) as ModelRouterConfig;
    }
  }

  return { enabled: cfg.enabled, routerOverride, systemPromptSuffix: cfg.systemPromptSuffix ?? null };
}

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

    const caalConfig = await resolveCaalConfig(tenantId);
    if (!caalConfig.enabled) {
      throw Object.assign(new Error('Caal is disabled for this tenant'), { status: 403, code: 'CAAL_DISABLED' });
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
      ...(caalConfig.routerOverride && { routerOverride: caalConfig.routerOverride }),
      input: {
        message,
        graphState: graphState ?? null,
        selectedNodeIds: selectedNodeIds ?? [],
        lastRunResult: lastRunResult ?? null,
        systemPromptSuffix: caalConfig.systemPromptSuffix,
        _invokerTenantId: tenantId,
        _invokerUserId: userId,
        _agentId: agentId ?? null,
      },
    });

    const { runId } = dispatchRes.data as { runId: string };

    // Poll for run completion and stream result back
    const start = Date.now();
    while (Date.now() - start < config.caalInvokeTimeoutMs) {
      await new Promise((r) => setTimeout(r, 500));
      const statusRes = await engineClient.get(`/internal/runs/${runId}`);
      const run = statusRes.data as { status: string; output?: Record<string, unknown>; error?: unknown };

      if (run.status === 'completed') {
        // response-assembler nests proposal/canvasHighlight/canvasFocus/
        // nodeReferences under "caalResult" (core:transform can only write
        // one context key — ISS-081); flatten it back out here so this
        // endpoint's response shape (output.proposal, output.canvasHighlight,
        // ...) stays what CaalPanel.svelte already expects.
        const output = run.output ?? {};
        const { caalResult, ...rest } = output as { caalResult?: Record<string, unknown> };
        res.json({ runId, sessionId, output: { ...rest, ...(caalResult ?? {}) } });
        return;
      }

      if (run.status === 'failed' || run.status === 'cancelled') {
        throw Object.assign(
          new Error(`Caal run ${run.status}: ${JSON.stringify(run.error)}`),
          { status: 500 },
        );
      }
    }

    // The engine's own run timeout is much longer than this poll ceiling —
    // the run may well still complete server-side (session-write included).
    // Report that honestly rather than implying the request outright failed
    // (ISS-068); no SSE/status-check path exists yet to let the client keep
    // watching this specific run (ISS-067). Written directly (not thrown)
    // since the generic errorHandler only surfaces {error, code} and this
    // response needs runId/sessionId too.
    res.status(202).json({
      code: 'CAAL_STILL_RUNNING',
      message: 'Caal is taking longer than expected; it may still complete in the background',
      runId,
      sessionId,
    });
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

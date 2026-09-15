import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import type { AgentGraphDefinition, CanonicalLLMRequest, ModelRouterConfig } from '@magicaal/core';
import { routedLLMCall } from '../router/router-engine';
import { resolveCredentials } from '../resolver/credential-resolver';
import { ExecutionContextImpl } from '../execution/context';
import { healthTracker } from '../router/health-tracker';
import { circuitBreaker } from '../router/circuit-breaker';
import { providerAdapterRegistry } from '../router/provider-adapter-registry';

/**
 * GET /internal/llm/providers. The model provider catalog — one descriptor
 * per registered adapter — used for Admin presets and the Studio model picker.
 */
export const listProviders: RequestHandler = (_req, res, next) => {
  try {
    res.json(providerAdapterRegistry.listDescriptors());
  } catch (err) {
    next(err);
  }
};

/**
 * POST /internal/llm/providers/:provider/validate. Checks credentials against
 * the provider before the API stores them. Credentials are never logged or
 * echoed back.
 */
export const validateProviderCredentials: RequestHandler = async (req, res, next) => {
  try {
    const { provider } = req.params;
    if (!providerAdapterRegistry.has(provider)) {
      throw Object.assign(new Error(`Unknown model provider "${provider}"`), {
        status: 404,
        code: 'PROVIDER_NOT_FOUND',
      });
    }

    const { credentials } = req.body as { credentials?: Record<string, unknown> };
    const apiKey = credentials?.api_key;
    if (typeof apiKey !== 'string' || apiKey.length === 0) {
      throw Object.assign(new Error('credentials.api_key is required'), { status: 400 });
    }

    const adapter = providerAdapterRegistry.get(provider);
    if (!adapter.validateCredentials) {
      res.json({ ok: true });
      return;
    }

    // Same shape credential-resolver.ts builds for api_key connections
    const result = await adapter.validateCredentials({ type: 'apikey', apiKey, extra: credentials });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /internal/llm/provider-health (ALIGN-024). Per-target router health:
 * circuit state, rolling P50 latency, error rate, and sample count — sourced
 * from the Health Tracker's in-memory rings and the circuit breaker. Targets
 * appear once they have routed at least one call (or tripped the breaker)
 * since engine start.
 */
export const getProviderHealth: RequestHandler = (_req, res, next) => {
  try {
    const breakerStates = circuitBreaker.snapshot();
    const targetIds = new Set([...healthTracker.trackedTargets(), ...Object.keys(breakerStates)]);

    const targets = [...targetIds].map((targetId) => {
      const stats = healthTracker.getStats(targetId);
      return {
        targetId,
        circuitState: breakerStates[targetId] ?? 'CLOSED',
        p50Ms: stats.p50,
        errorRate: stats.errorRate,
        sampleCount: stats.sampleCount,
      };
    });

    res.json({ targets, timestamp: new Date().toISOString() });
  } catch (err) {
    next(err);
  }
};

const DEFAULT_SUMMARIZE_PROMPT =
  'Summarize the following conversation/context entries into one concise record that preserves ' +
  'the facts, decisions, and open questions needed to continue the conversation. Respond with ' +
  'the summary text only.';

/**
 * POST /internal/llm/summarize (ALIGN-007). Session overflow summarization for
 * the API's Session Manager, which owns session persistence but has no LLM
 * path — the router engine, provider adapters, and credential resolution all
 * live here. Stateless: no run or step telemetry is recorded.
 */
export const summarizeItems: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId, items, model, prompt, routerConfig } = req.body as {
      tenantId?: string;
      items?: unknown[];
      model?: string;
      prompt?: string;
      routerConfig?: ModelRouterConfig;
    };

    if (!tenantId || !Array.isArray(items) || items.length === 0) {
      throw Object.assign(
        new Error('tenantId and a non-empty items array are required'),
        { status: 400, code: 'INVALID_SUMMARIZE_REQUEST' },
      );
    }
    if (!routerConfig || !Array.isArray(routerConfig.targets) || routerConfig.targets.length === 0) {
      throw Object.assign(
        new Error('No router config available for summarization'),
        { status: 422, code: 'ROUTER_NOT_CONFIGURED' },
      );
    }

    // summarizeWith.model overrides the target model; the caller's router
    // determines provider and credentials.
    const effective: ModelRouterConfig = model
      ? { ...routerConfig, targets: routerConfig.targets.map((t) => ({ ...t, model })) }
      : routerConfig;

    const ctx = new ExecutionContextImpl({
      runId: `summarize_${crypto.randomUUID()}`,
      agentId: '_session-summarize',
      tenantId,
      triggerType: 'internal',
      input: {},
    });

    // Credential resolution walks a graph definition — hand it a minimal one
    // carrying the router config so the targets' connections resolve.
    const syntheticGraph = {
      version: '1.0',
      name: '_session-summarize',
      entry: '_summarize',
      nodes: {
        _summarize: { id: '_summarize', type: 'core:llm-call', config: { router: effective } },
      },
      edges: [],
      toolEdges: [],
      workspaceEdges: [],
      config: { trigger: { type: 'rest', mode: 'async' } },
    } as unknown as AgentGraphDefinition;
    await resolveCredentials(syntheticGraph, ctx);

    const request: CanonicalLLMRequest = {
      system: prompt ?? DEFAULT_SUMMARIZE_PROMPT,
      messages: [{ role: 'user', content: JSON.stringify(items) }],
      maxTokens: 1024,
      metadata: { purpose: 'session-summarize', tenantId },
    };

    const response = await routedLLMCall(request, effective, ctx);
    res.json({ summary: response.content });
  } catch (err) {
    next(err);
  }
};

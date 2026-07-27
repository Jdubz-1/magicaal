import type {
  CanonicalLLMRequest,
  CanonicalLLMResponse,
  ModelRouterConfig,
  ModelRouterTarget,
  RouterTrigger,
  RouterTriggerCondition,
  RouterTriggerEvent,
} from '@magicaal/core';
import type { ExecutionContextImpl } from '../execution/context';
import { providerAdapterRegistry } from './provider-adapter-registry';
import { healthTracker } from './health-tracker';
import { circuitBreaker } from './circuit-breaker';
import { logger } from '../lib/logger';

// In-memory round-robin counters keyed by sorted target-id hash
const rrCounters = new Map<string, number>();

function rrKey(targets: ModelRouterTarget[]): string {
  return targets
    .map((t) => t.id)
    .sort()
    .join('|');
}

function selectTarget(
  config: ModelRouterConfig,
  _ctx: ExecutionContextImpl,
): ModelRouterTarget[] {
  const { strategy, targets, circuitBreaker: cbConfig } = config;

  const healthy = targets.filter((t) =>
    circuitBreaker.canAttempt(t.id, cbConfig),
  );

  if (healthy.length === 0) {
    // All circuits open — try all targets anyway (circuit will block individual calls)
    return targets;
  }

  switch (strategy) {
    case 'round-robin': {
      // Key on all targets (stable regardless of circuit state)
      const key = rrKey(config.targets);
      const idx = (rrCounters.get(key) ?? 0) % healthy.length;
      rrCounters.set(key, (rrCounters.get(key) ?? 0) + 1);
      // Rotate so the selected target is first, rest follow as fallbacks
      return [...healthy.slice(idx), ...healthy.slice(0, idx)];
    }

    case 'weighted': {
      const totalWeight = healthy.reduce((sum, t) => sum + (t.weight ?? 1), 0);
      let rand = Math.random() * totalWeight;
      let selected = healthy[0];
      for (const t of healthy) {
        rand -= t.weight ?? 1;
        if (rand <= 0) { selected = t; break; }
      }
      return [selected, ...healthy.filter((t) => t.id !== selected.id)];
    }

    case 'least-latency': {
      const sorted = [...healthy].sort((a, b) => {
        const pa = healthTracker.getP50(a.id) ?? Infinity;
        const pb = healthTracker.getP50(b.id) ?? Infinity;
        return pa - pb;
      });
      return sorted;
    }

    case 'cost-optimized': {
      const sorted = [...healthy].sort((a, b) => {
        const pa = pricingCache.get(`${a.provider}:${a.model}`);
        const pb = pricingCache.get(`${b.provider}:${b.model}`);
        // Blended cost: sum of prompt + completion rates; rewards models cheap on both sides
        const costA = pa ? pa.promptTokensPerMillion + pa.completionTokensPerMillion : Infinity;
        const costB = pb ? pb.promptTokensPerMillion + pb.completionTokensPerMillion : Infinity;
        return costA - costB;
      });
      return sorted;
    }

    case 'priority':
    default:
      return healthy;
  }
}

function checkProactiveTriggers(
  config: ModelRouterConfig,
  target: ModelRouterTarget,
): { triggered: boolean; condition: RouterTriggerCondition | null } {
  for (const trigger of config.triggers) {
    const cond = trigger.condition;
    if (cond.type === 'latency_degraded') {
      const p50 = healthTracker.getP50(target.id);
      if (p50 !== null && p50 > (cond as { p50ThresholdMs: number }).p50ThresholdMs) {
        return { triggered: true, condition: cond };
      }
    }
    if (cond.type === 'error_rate') {
      const c = cond as { threshold: number; windowMs: number };
      const rate = healthTracker.getErrorRate(target.id, c.windowMs);
      if (rate > c.threshold) {
        return { triggered: true, condition: cond };
      }
    }
  }
  return { triggered: false, condition: null };
}

function isReactiveTriggerMet(
  trigger: RouterTrigger,
  error: unknown,
  durationMs: number,
  _targetId: string,
): boolean {
  const cond = trigger.condition;
  const e = error as { status?: number; _providerError?: boolean } | null;

  switch (cond.type) {
    case 'rate_limit':
      return e?._providerError === true && e.status === 429;
    case 'provider_error': {
      if (!e?._providerError) return false;
      const codes = (cond as { statusCodes?: number[] }).statusCodes ?? [500, 502, 503, 504];
      return codes.includes(e.status ?? 0);
    }
    case 'timeout':
      return durationMs > (cond as { thresholdMs: number }).thresholdMs;
    case 'context_overflow':
      return e?._providerError === true && e.status === 400; // provider returns 400 on context overflow
    case 'content_policy':
      return e?._providerError === true && e.status === 400;
    default:
      return false;
  }
}

export async function routedLLMCall(
  request: CanonicalLLMRequest,
  config: ModelRouterConfig,
  ctx: ExecutionContextImpl,
): Promise<CanonicalLLMResponse> {
  const orderedTargets = selectTarget(config, ctx);
  const triggerHistory: RouterTriggerEvent[] = [];
  let attemptCount = 0;

  for (const target of orderedTargets) {
    if (!circuitBreaker.canAttempt(target.id, config.circuitBreaker)) {
      logger.debug({ targetId: target.id }, 'Skipping target: circuit open');
      continue;
    }

    // Check proactive triggers before attempting this target
    const proactive = checkProactiveTriggers(config, target);
    if (proactive.triggered) {
      triggerHistory.push({ target, trigger: proactive.condition!, skipped: true });
      logger.info({ targetId: target.id, trigger: proactive.condition }, 'Proactive trigger fired — skipping target');
      continue;
    }

    const credentials = ctx.credentials[target.connectionId];
    if (!credentials) {
      logger.warn({ targetId: target.id, connectionId: target.connectionId }, 'No credentials for target, skipping');
      continue;
    }

    const adapter = providerAdapterRegistry.get(target.provider);
    const start = Date.now();
    attemptCount++;

    try {
      const response = await adapter.call(request, target, credentials);
      const durationMs = Date.now() - start;

      healthTracker.record(target.id, durationMs, false);
      circuitBreaker.recordSuccess(target.id, config.circuitBreaker);

      // Attach routing metadata
      response.routingMeta = {
        targetUsed: target,
        attemptCount,
        triggerHistory,
      };

      // Estimate cost from pricing cache (populated at startup)
      const pricing = pricingCache.get(`${target.provider}:${target.model}`);
      if (pricing) {
        response.usage.estimatedCostUsd =
          (response.usage.promptTokens / 1_000_000) * pricing.promptTokensPerMillion +
          (response.usage.completionTokens / 1_000_000) * pricing.completionTokensPerMillion;
      }

      logger.debug(
        { targetId: target.id, provider: target.provider, durationMs, attemptCount },
        'LLM call succeeded',
      );

      return response;
    } catch (err) {
      const durationMs = Date.now() - start;
      healthTracker.record(target.id, durationMs, true);
      circuitBreaker.recordFailure(target.id, config.circuitBreaker);

      const triggerCondition = adapter.translateError(err) as RouterTriggerCondition | null;

      logger.warn(
        { targetId: target.id, error: (err as Error).message, triggerCondition },
        'LLM call failed — checking triggers',
      );

      // Check if any trigger fires for this error
      let shouldFallback = false;
      for (const trigger of config.triggers) {
        if (isReactiveTriggerMet(trigger, err, durationMs, target.id)) {
          triggerHistory.push({ target, trigger: trigger.condition });
          shouldFallback = true;
          logger.info({ targetId: target.id, trigger: trigger.condition }, 'Reactive trigger fired, falling back');
          break;
        }
      }

      if (!shouldFallback) {
        // No trigger fired — this is a hard failure, don't fall back
        throw err;
      }

      // Continue to next target
    }
  }

  // If every target was proactively skipped (no actual LLM calls were made), try the first
  // target as a last resort rather than throwing. This prevents all-skip deadlock when
  // latency_degraded or error_rate triggers fire on every target simultaneously.
  if (attemptCount === 0 && orderedTargets.length > 0) {
    const lastResort = orderedTargets[0];
    const credentials = ctx.credentials[lastResort.connectionId];
    if (credentials) {
      const adapter = providerAdapterRegistry.get(lastResort.provider);
      const start = Date.now();
      const response = await adapter.call(request, lastResort, credentials);
      const durationMs = Date.now() - start;
      healthTracker.record(lastResort.id, durationMs, false);
      circuitBreaker.recordSuccess(lastResort.id, config.circuitBreaker);
      response.routingMeta = { targetUsed: lastResort, attemptCount: 1, triggerHistory };
      const pricing = pricingCache.get(`${lastResort.provider}:${lastResort.model}`);
      if (pricing) {
        response.usage.estimatedCostUsd =
          (response.usage.promptTokens / 1_000_000) * pricing.promptTokensPerMillion +
          (response.usage.completionTokens / 1_000_000) * pricing.completionTokensPerMillion;
      }
      return response;
    }
  }

  throw Object.assign(new Error('All router targets exhausted — no successful LLM response'), {
    code: 'ROUTER_ALL_TARGETS_FAILED',
    retryable: true,
  });
}

// ── Pricing Cache ─────────────────────────────────────────────────────────────

interface PricingEntry {
  promptTokensPerMillion: number;
  completionTokensPerMillion: number;
}

// In-memory cache, seeded at startup from DB and refreshed on admin updates
export const pricingCache = new Map<string, PricingEntry>();

// Built-in defaults (USD per million tokens, as of mid-2025)
const BUILT_IN_PRICING: Record<string, PricingEntry> = {
  'openai:gpt-4o':              { promptTokensPerMillion: 2.50,  completionTokensPerMillion: 10.00 },
  'openai:gpt-4o-mini':         { promptTokensPerMillion: 0.15,  completionTokensPerMillion: 0.60  },
  'openai:gpt-4-turbo':         { promptTokensPerMillion: 10.00, completionTokensPerMillion: 30.00 },
  'openai:o3-mini':             { promptTokensPerMillion: 1.10,  completionTokensPerMillion: 4.40  },
  'anthropic:claude-opus-4-8':  { promptTokensPerMillion: 15.00, completionTokensPerMillion: 75.00 },
  'anthropic:claude-sonnet-4-6':{ promptTokensPerMillion: 3.00,  completionTokensPerMillion: 15.00 },
  'anthropic:claude-haiku-4-5': { promptTokensPerMillion: 0.80,  completionTokensPerMillion: 4.00  },
  'google:gemini-2.5-pro':      { promptTokensPerMillion: 1.25,  completionTokensPerMillion: 10.00 },
  'google:gemini-2.0-flash':    { promptTokensPerMillion: 0.075, completionTokensPerMillion: 0.30  },
};

export function initPricingCache(
  overrides: Array<{ provider: string; model: string; promptTokensPerMillion: number; completionTokensPerMillion: number }> = [],
): void {
  // Load built-in defaults
  for (const [key, entry] of Object.entries(BUILT_IN_PRICING)) {
    pricingCache.set(key, entry);
  }
  // Apply DB overrides (take precedence over built-ins)
  for (const o of overrides) {
    pricingCache.set(`${o.provider}:${o.model}`, {
      promptTokensPerMillion: o.promptTokensPerMillion,
      completionTokensPerMillion: o.completionTokensPerMillion,
    });
  }
}

// ── Config Resolution ─────────────────────────────────────────────────────────

export function resolveRouterConfig(
  nodeConfig: { router?: string | ModelRouterConfig },
  graphDefaultRouter?: string | ModelRouterConfig,
  tenantPolicy?: (ModelRouterConfig & { overridable?: boolean }) | null,
  // A per-dispatch override supplied by the caller rather than baked into the
  // compiled graph — e.g. Caal's per-tenant modelOverride/routerPolicyId
  // (caal_configuration), threaded through via RunParams.runRouterOverride.
  // Deliberately ranked below a locked tenant policy (governance still wins)
  // but above the node/graph level, since it represents an explicit runtime
  // choice by the tenant, not the graph author's default.
  runOverride?: ModelRouterConfig | null,
): ModelRouterConfig | null {
  // If tenant policy is locked, it cannot be overridden at node, graph, or
  // per-dispatch level
  if (tenantPolicy && tenantPolicy.overridable === false) {
    return tenantPolicy;
  }

  if (runOverride) {
    return runOverride;
  }

  // Node-level inline config
  if (nodeConfig.router && typeof nodeConfig.router === 'object') {
    return nodeConfig.router;
  }

  // Graph-level defaultRouter
  if (graphDefaultRouter && typeof graphDefaultRouter === 'object') {
    return graphDefaultRouter;
  }

  // Overridable tenant policy (or no policy)
  if (tenantPolicy) {
    return tenantPolicy;
  }

  return null;
}

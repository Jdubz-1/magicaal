# Model Router

The Model Router (`apps/engine/src/router/`) is the provider-agnostic layer every LLM/agentic node calls through — nodes never talk to OpenAI/Anthropic/Google directly.

## Provider Adapters

`src/router/adapters/` — one file per provider (`openai.ts`, `anthropic.ts`, `google.ts`), each implementing the `ProviderAdapter` interface from `@magicaal/sdk-node` to translate a canonical request/response shape to/from that provider's API. `src/router/provider-adapter-registry.ts` holds the active set; new providers register here (a new `ProviderAdapter` is one of the changes that requires an RFC — see [CONTRIBUTING.md](../../../CONTRIBUTING.md#what-requires-an-rfc)).

## Routing Strategies

A `ModelRouterConfig`'s `strategy` (from `@magicaal/core`'s `ModelRouterStrategy`) is one of:

| Strategy | Behavior |
|---|---|
| `priority` | Always prefer the first healthy target in declared order |
| `round-robin` | Rotate evenly across targets (`src/router/router-engine.ts`'s `rrCounters`) |
| `weighted` | Distribute by configured weight |
| `least-latency` | Route to the target with the lowest recent p50, per `health-tracker.ts` |
| `cost-optimized` | Prefer the cheapest target that meets health constraints |

## Circuit Breaker

`src/router/circuit-breaker.ts` tracks per-target state (`CLOSED` → `OPEN` → `HALF_OPEN`) with a configurable `failureThreshold`, `errorRateThreshold`, `windowMs`, `cooldownMs`, and `halfOpenProbeCount` (defaults: 5 failures, 50% error rate, 60s window, 30s cooldown, 1 half-open probe). An `OPEN` target is skipped by target selection until it half-opens and passes a probe.

## Reactive Triggers

A `ModelRouterConfig` can declare triggers (`RouterTriggerCondition` in `@magicaal/core`) that reroute mid-flight on:

- `rate_limit`
- `provider_error` (optionally scoped to specific status codes)
- `timeout`
- `context_overflow`
- `content_policy`
- `latency_degraded` (above a configured p50 threshold)
- `error_rate` (above a threshold within a window)

## Health Tracking

`src/router/health-tracker.ts` records latency and success/failure per target, feeding both `least-latency` routing and the circuit breaker's error-rate calculation. Aggregate provider health is exposed at `GET /v1/llm/health`.

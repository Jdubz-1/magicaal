# Engine Architecture

`apps/engine` (port 4000) is the graph execution runtime. It has no UI and is never called directly by the browser — `apps/api` proxies all engine-bound traffic and is the only service holding user-facing auth.

## Execution Pipeline

| Module | Role |
|---|---|
| `src/graph/graph-loader.ts` | Loads and caches compiled `AgentGraphDefinition` JSON (from boot-time sync or Marketplace-installed templates) |
| `src/execution/scheduler.ts` | BullMQ `Worker` consuming the run-trigger queue; resolves credentials, starts run deadlines, acquires per-tenant run slots |
| `src/execution/worker.ts` | `executeGraph` — walks the graph's `nodes`/`edges`, resolving fan-out/join/fork points, dispatching each node to its `NodeModule` |
| `src/execution/context.ts` | `ExecutionContextImpl` — the object passed into every node's `execute()`, exposing config, session, credentials, and control signals |
| `src/execution/lifecycle.ts` | Run state transitions (pending → running → suspended/completed/failed/cancelled) |
| `src/execution/resume.ts` | Resumes a suspended run (e.g. after a `core:human-review` pause) |
| `src/execution/run-control.ts` | Abort signals, run deadlines, retry planning, per-tenant admission control (`MAX_CONCURRENT_RUNS_PER_TENANT`) |
| `src/execution/tool-executor.ts` | Runs the agentic tool-call loop for LLM/tool nodes |
| `src/execution/usage-tally.ts` | Per-run token/package usage accounting, flushed to `apps/api` for Marketplace billing |

## Node Registry

`src/registry/node-registry.ts` holds every available `NodeModule` — built-in `core:*` types from `packages/nodes`, plus any installed Marketplace package nodes. `src/registry/entitlements.ts` enforces that package-sourced node types are only usable by tenants that installed them; built-ins are available to everyone. `src/registry/startup.ts` builds the initial registry snapshot at boot; `src/graph/graph-invalidate.ts` invalidates cached graphs when a package is hot-loaded or updated.

## Model Router

Provider-agnostic LLM dispatch with routing strategies, health tracking, and a circuit breaker. See **[Model Router →](model-router.md)**.

## MCP Client

Connects agents to external MCP servers (stdio or Streamable HTTP transport). See **[MCP →](../mcp.md)**.

## Marketplace (Engine Side)

`src/marketplace/` — `package-loader.ts` and `hot-load.ts` install and activate `.mpack` packages without a redeploy; `package-verifier.ts` checks the MagiCaal countersignature (or, if `MARKETPLACE_ALLOW_UNVERIFIED=true`, skips it — package code otherwise runs with full engine privileges); `usage-flush.ts` reports per-run package usage back to `apps/api`. See **[Marketplace →](../marketplace.md)**.

## Session Management

`src/session/session-manager.ts` — see **[Sessions →](../sessions.md)**.

## Auth

`src/auth/invocation-auth.ts` validates invocation-plane callers (JWT or `ik_` key) for agent runs; `src/auth/tenant-limits.ts` enforces per-tenant resource caps. See **[Auth & RBAC →](../auth-rbac.md)**.

## Internal API

`src/routes/internal.ts` — engine-side endpoints called only by `apps/api` (credential refresh persistence, marketplace usage flush, internal session sync), gated by `requireInternalAuth`. Not part of the public API surface documented in [developer-guide/api/](../api/README.md).

## Real-Time Updates

`src/sse/sse-manager.ts` streams run-lifecycle events back through `apps/api` to the browser as Server-Sent Events (`GET /v1/agents/{id}/runs/{runId}/stream`).

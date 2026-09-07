# Changelog

All notable changes to MagiCaal are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html). Entries are generated from conventional commits with curated highlights added by maintainers.

---

## [0.6.0] — 2026-09-07

Phase 5 (Integrations & Marketplace), the hardening passes that followed it, and
the platform-launch sign-off driven against a real Docker stack.

### Added — Phase 5: Integrations & Marketplace

- **14 first-wave integration packages** — Slack, GitHub, Jira, Gmail, Google Workspace, SendGrid, Stripe, Salesforce, HubSpot, Zendesk, Twilio, QuickBooks, BambooHR, Shopify — each shipping typed nodes, an auth schema, and a webhook signature verifier
- **Integration trigger dispatch**: public `POST /v1/triggers/integrations/:service/:tenantSlug` receiver; authenticity established by the service's own webhook signature, verified in the engine
- **Marketplace**: gated catalog/install API, Ed25519 package signature verification, Redis pub/sub hot-load with no restart, per-tenant entitlement gating on package node execution (`PACKAGE_NOT_ENTITLED`, failing closed), and per-package usage metering
- **Air-gapped install**: `POST /v1/marketplace/licenses/bundle` accepts a signed `.mpack` bundle directly, for deployments with no Marketplace connectivity
- **OAuth**: real `authorization_code` exchange with PKCE, a per-tenant `integration_oauth_apps` table, same-origin `redirectUri` validation, a browser-binding nonce, and engine-side token refresh persisted back through the API
- **`@magicaal/sdk` Phase 4**: opt-in retry with backoff and `Retry-After` support, `listRuns()`, run cancellation
- **Agent lifecycle**: `DELETE /v1/agents/:id` archives an agent; `?purge=true` removes it and every row referencing it, including its telemetry history

### Fixed

- **`core:end` outputKeys never reached the run output** — the scheduler completed runs with the whole execution context, so an agent declaring `outputKeys` still returned every intermediate key. Engine-internal `_`-prefixed keys were exposed to run callers over both the REST result and the SSE `run.completed` event, including to third parties holding only an agent-scoped invocation key.
- **Edge `type` was unvalidated at publish and silently dropped at runtime** — a missing or misspelled type produced a run that reported `completed` having executed only the entry node, with no error anywhere. Publish now rejects invalid types; the engine reads a missing type as unconditional, which also repairs graphs already stored.
- **Credentials were written to logs in plaintext** — both request loggers used a bare `pinoHttp({ logger })`, so pino-http's default serializer logged `Authorization: Bearer …`, `cookie`, and the internal engine↔API shared secret on every request.
- **Untenanted telemetry route removed** (ISS-066) — dead code that would have returned another tenant's run and step data if ever wired up.

### Changed

- **CI runs across every workspace.** The previous matrix covered `apps/api` and `apps/engine` only, leaving 339 tests — `packages/nodes`, the 15 integration packages, `cli`, `sdk-client`, `web` — outside the merge gate entirely.
- **npm packages are publishable.** `@magicaal/core`, `@magicaal/sdk-node`, and `@magicaal/nodes` are published alongside `@magicaal/sdk`, `@magicaal/compiler`, and `@magicaal/cli`. The SDK workspace is now named `@magicaal/sdk` directly rather than relying on `publishConfig.name`, which requires pnpm 11.15+ while this repo pins pnpm 9.
- **The OpenAPI document is contract-tested** against the registered routes in both directions, closing 24 undocumented paths and one documented endpoint that no route served.

---

## [0.5.0] — 2026-06-30

This is the first public release of MagiCaal, covering the work completed across Phases 0–4. It establishes the full platform foundation: monorepo infrastructure, core execution engine, all built-in nodes, Model Router, Tool System, MCP integration, Graph-as-Code compiler and CLI, Session Manager, and the Caal AI assistant (Phase 1).

### Added — Phase 0: Foundation

- Monorepo scaffold: pnpm workspaces, TypeScript project references (`tsconfig.base.json`), ESLint, Prettier, CI pipeline (lint, typecheck, test, build on PR; Docker image builds on merge)
- Docker Compose stack: `api`, `engine`, `web`, `redis` services with shared volume mounts and health checks
- `packages/core` (`@magicaal/core`) — all foundational shared TypeScript types: `AgentGraphDefinition`, `NodeDefinition`, `EdgeDefinition`, `ToolEdgeDefinition`, `WorkspaceEdgeDefinition`, `AgentConfig`, `TriggerConfig`, `SessionConfig`, `WorkspaceConfig`, `WorkspacePermissions`, canonical LLM types (`CanonicalLLMRequest`, `CanonicalLLMResponse`, `CanonicalMessage`, `CanonicalTool`, `CanonicalToolCall`), Model Router types (`ModelRouterConfig`, `ModelRouterTarget`, `RouterTrigger`, `CircuitBreakerConfig`, `ModelRouterStrategy`, `NamedRouterPolicy`)
- `packages/sdk` (`@magicaal/sdk-node`) — `NodeModule<TConfig>`, `ExecutionContext`, `ProviderAdapter` interfaces for node authors
- `packages/sdk-client` (`@magicaal/sdk`) — scaffold with typed error hierarchy (7 subclasses), dual ESM/CJS build, TypeScript declarations
- `packages/integrations/caal` — package structure and build config; empty tool stubs establishing the integration contract
- Primary database schema (SQLite + Drizzle ORM): `users`, `tenants`, `permissions`, `api_keys`, `auth_sessions`, `agents`, `agent_versions`, `agent_config`, `invocation_policies`, `invocation_keys`, `invocation_log`
- `devbox.json` — pins Node.js 22 LTS + pnpm 9; `pnpm install` runs automatically on shell entry

### Added — Phase 1: Core Engine & Minimal Studio

- **Engine**: Node Registry (startup scan of `packages/nodes`), Graph Loader (read/parse/validate graph JSON, in-memory cache with Redis pub/sub invalidation), Execution Worker (BFS traversal, `resolveEdges()`, three-phase `executeNode()` lifecycle: Prepare → Execute → Finalize), Run Scheduler, Lifecycle Manager, Invocation Auth Validator (`api-key` strategy, rate limiting with Redis counters)
- **Engine internal API**: `POST /runs`, `GET /runs/:id`, `GET /runs/:id/steps`, `DELETE /runs/:id`, `POST /agents/:id/deploy`, `GET /health`
- **Core nodes (Phase 1)**: `core:start`, `core:end`, `core:condition` (JSONata), `core:router` (N-case JSONata), `core:stop`
- **BFF API**: JWT + API key auth; User CRUD, Tenant CRUD, Agent CRUD (with version snapshots), run invocation (`POST /agents/:id/runs`, sync + async), run status, node types list (`GET /v1/nodes`), system health
- **Studio (Phase 1)**: Datastar app shell, auth pages, Studio canvas (pan/zoom, node palette, node placement, edge connection via ports, node selection), Node Configuration Panel, Agent Configuration Panel, basic test run with per-node status display, agent publish/draft toggle
- **Admin (Phase 1)**: user management, tenant management, agent registry, system health panel
- **`@magicaal/sdk` Phase 1**: `MagiCaalClient` initialisation, `AgentClient.invoke()` and `.start()`, `RunHandle` (`wait()`, `cancel()`, `status()`, `steps()`), `RateLimitInfo`, typed error hierarchy, zero mandatory runtime dependencies, dual ESM/CJS
- **Remaining DB tables**: `prompt_versions`, `test_cases`, `integration_connections`, `package_registry`, `marketplace_catalog_cache`, `marketplace_account`, `asset_licenses`, `usage_counters`, `mcp_servers`, `sync_events`, `data_sources`, `workspaces`, `sessions`, `session_context`, `session_run_links`, `named_router_policies`, `provider_pricing`; Telemetry Store (separate SQLite): `runs`, `steps`, `trajectories`, `evaluate_scores`, `metrics_snapshots`; BullMQ + Redis queues

### Added — Phase 2: Full Node Set, Production Readiness & Model Router

- **Engine**: SSE Stream Manager, Loop Manager, Fork/Join parallel execution, Scheduler integration (cron trigger dispatch), Webhook trigger, Human Review durability (SUSPEND state with engine-restart resumption), Integration Credential Resolver
- **Model Router**: Provider Adapter Registry with built-in `openai`, `anthropic`, `google` adapters; Router Engine (`routedLLMCall()`, `resolveRouterConfig()`); Health Tracker (rolling P50 and error rate per instance); Circuit Breaker (CLOSED → OPEN → HALF-OPEN state machine); `priority` and `round-robin` proactive strategies; `rate_limit`, `provider_error`, `timeout`, `context_overflow`, `content_policy` reactive triggers; `routingMeta` on every LLM step telemetry record
- **AI/LLM nodes**: `core:llm-call` (structured output + auto-retry), `core:prompt-builder`, `core:structured-extract`, `core:embedding`, `core:vector-search`, `core:memory-read`, `core:memory-write`
- **Data nodes**: `core:transform`, `core:filter`, `core:aggregate`, `core:validate`, `core:parse`
- **Integration nodes**: `core:http-request`, `core:webhook-receive`, `core:db-query`, `core:file-read`, `core:file-write`, `core:web-search`, `core:web-scrape`
- **Code node**: `core:code` (isolated-vm sandbox, configurable timeout + memory)
- **Control flow additions**: `core:fork`, `core:join`, `core:loop`, `core:wait`, `core:agentic-router` (LLM-powered classification, confidence-threshold HITL escalation)
- **Guardrails**: `core:guardrail` (block-and-fail, reroute-to-fallback, redact-and-continue), `core:human-review` (SUSPEND state, resume via API)
- **Observability nodes**: `core:log`, `core:metric`, `core:annotation`
- **BFF API additions**: run SSE stream, version diff and rollback, Human Review response, rate limiting, invocation audit log, telemetry routes, data sources CRUD, Integration Connections (OAuth flows built), Model Router routes (`/v1/llm/health`, `/v1/llm/router-policies`, `/v1/system/provider-pricing`)
- **Studio additions**: Canvas Value Picker, SSE-driven live test run panel (per-node input/output, timing), scheduled trigger config, agent version history with diff and rollback, graph lint panel, Agentic Router node config
- **Admin additions**: telemetry dashboard, run detail view with routing trace, Human Review queue, Invocation Auth panel, Data Sources panel, Integration Connections panel (OAuth), Named Router Policies panel, Provider Pricing table
- **`@magicaal/sdk` Phase 2**: `agent.stream()` (async iterator of typed run events), `HumanReviewClient`, `RunSuspendedError.reviewId`

### Added — Phase 3: Tool System & Advanced Agent Nodes

- **Engine**: Tool Executor (`runAgentLoop()`, `assembleTools()`, `invokeTool()` routing for graph/MCP/workspace sources, sub-context forking, trajectory recording); MCP Client subsystem (JSON-RPC 2.0, stdio and Streamable HTTP transports, `initialize`/`tools/list`/`tools/call`, `notifications/tools/list_changed` handling); `least-latency` and `cost-optimized` routing strategies; `latency_degraded` and `error_rate` reactive triggers; `ProviderAdapter` extensibility for community-contributed adapters
- **AI/LLM nodes**: `core:tool-call` (native function calling, parallel tool execution, configurable `maxIterations`), `core:react` (Thought/Action/Observation, serial, trajectory recording), `core:planner`, `core:reflection`, `core:context-summarize`, `core:token-budget`
- **Tool nodes**: `core:tool` (LLM-facing contract + input/output mapping), `core:mcp-client` (direct and funnel modes)
- **Composition nodes**: `core:sub-graph`, `core:handoff`, `core:fan-out`, `core:reduce`, `core:input-map`, `core:output-map`
- **Evaluation**: `core:evaluate` (rule-based, LLM-as-judge, expected output comparison); Evaluate scores table in Telemetry Store
- **BFF API additions**: MCP server CRUD, JWT invocation auth (JWKS), input/output schema discovery, trajectory telemetry
- **Studio additions**: tool canvas panel region, Expression Editor (JSONata with syntax highlighting + autocomplete), ReAct/Planner trajectory display, MCP Client node config, provider health dashboard
- **Admin additions**: MCP server management panel, JWT invocation auth config, per-node performance + token usage + trajectory evaluation + routing event log telemetry

### Added — Phase 4: Graph-as-Code, Session Management & Caal Phase 1

- **`packages/compiler`** (`@magicaal/compiler`): `AgentGraph` base class (`node()`, `connect()`, `when()`, `otherwise()`, `tool()`, `workspace()`), `@Agent` decorator (Reflect.metadata), typed node classes (auto-generated from config schemas), `compile()` function (metadata extraction, connectivity validation, schema validation)
- **`packages/cli`** (`@magicaal/cli`): `magicaal build`, `magicaal validate`, `magicaal list`, `magicaal sessions migrate --agent {handle}`
- **Session Manager**: `loadSession()`, `saveSession()`, `expireSessions()`; per-key accumulation (`append`/`replace`/`merge`); `evict_oldest`, `summarize`, `truncate` overflow strategies; schema migration chain application; session propagation to child runs via `core:sub-graph` and `core:handoff`; session conflict detection (409 on concurrent top-level runs sharing a session ID)
- **Session nodes**: `core:session-read`, `core:session-write`, `core:session-clear`
- **API boot-time sync**: `bootTimeSync()` — manifest scan, hash comparison, insert/update/stale-flag, `syncConfig()` override map, sync event log; runs before `app.listen()`
- **BFF API additions**: Session management routes, `session_id` on run invocation, Prompt Version CRUD and promote, Test Case CRUD and suite execution
- **Studio additions**: code-defined agent read-only canvas with code-source banner; Session Context Inspector (live key values, entry counts, token estimates); Prompt Version panel; Test Case Library; Caal panel
- **Admin additions**: Session Management panel, Prompt Version Management, Sync Event Log, Sessions view in Telemetry
- **Caal Phase 1**: `_platform` pseudo-tenant initialization; `caal.agent.ts` graph compiled at build time; `POST /v1/caal/invoke` (Studio-only, SSE response); session scoping to `{userId}:{agentId}`; 15+ `caal.*` tools (graph inspection, graph modification, proposal creation, platform context, canvas UI); Studio Caal panel with conversation thread, quick actions, targeted proposal review UI (inline diff, accept/reject), undo integration, TypeScript suggestion display, Caal History panel
- **`@magicaal/sdk` Phase 3**: `SessionClient`, `WorkspaceContextBuilder` (fluent builder for coding assistant context), `session` parameter on `invoke()`/`start()`/`stream()`, `agent.sessions.list()`

---

*Versions prior to 0.5.0 were internal development releases and are not documented here.*

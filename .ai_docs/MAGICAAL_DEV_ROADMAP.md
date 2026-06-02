# MagiCaal — Development Roadmap

**Version**: 0.2
**Based on**: Architecture v9, PRD v0.4

---

## Assumptions & Conventions

**Team size**: 3–6 engineers. Phases are designed so that a small team can make meaningful parallel progress across workstreams. Single-engineer phases are noted where work is inherently sequential.

**Duration estimates**: Conservative. Each estimate assumes a team spending most of its time on MagiCaal, not a fraction. Adjust to your actual capacity.

**Workstream labels**:
- **Infra** — monorepo, CI/CD, Docker, database migrations
- **Engine** — agent execution runtime (`apps/engine`)
- **API** — backend-for-frontend (`apps/api`)
- **Frontend** — Studio + Admin web app (`apps/web`)
- **Packages** — shared packages (`packages/core`, `sdk`, `compiler`, `cli`, `nodes`, `integrations`)
- **SDK** — client SDK (`@magicaal/sdk`)

**Definition of "done" for each phase**: The phase milestone is a runnable, testable checkpoint — not a feature flag or a partial implementation.

**Dependency notation**: `←` means "requires completion of."

---

## Phase 0 — Foundation
**Theme**: Everything engineers need to start building. No user-facing features.
**Duration**: 2–3 weeks
**Team**: All engineers; primarily sequential.

### Workstreams

**Infra**
- Monorepo scaffold — pnpm workspaces, TypeScript project references, ESLint, Prettier, `tsconfig` hierarchy
- CI/CD pipeline — lint, typecheck, test, build on PR; Docker image builds on merge
- Docker Compose — `web-api`, `engine`, `redis`, `db` services with shared volume mounts
- Database setup — SQLite + Drizzle ORM; migration tooling; seed scripts for local dev
- Environment variable conventions — `.env.example`, `MAGICAAL_MASTER_KEY` pattern

**Packages**
- `packages/core` — all foundational shared TypeScript types: `AgentGraphDefinition`, `NodeDefinition`, `EdgeDefinition`, `ToolEdgeDefinition`, `WorkspaceEdgeDefinition`, `Run`, `Step`, `TokenUsage`, `AgentConfig`, `TriggerConfig`, `SessionConfig`, `WorkspaceConfig`, `WorkspacePermissions`, canonical LLM types (`CanonicalLLMRequest`, `CanonicalLLMResponse`, `CanonicalMessage`, `CanonicalTool`, `CanonicalToolCall`), model router types (`ModelRouterConfig`, `ModelRouterTarget`, `RouterTrigger`, `RouterTriggerCondition`, `CircuitBreakerConfig`, `ModelRouterStrategy`, `NamedRouterPolicy`)
- `packages/sdk` — `NodeModule<TConfig>` interface, `ExecutionContext` interface, `ProviderAdapter` interface (needed before Phase 2 LLM nodes)
- `packages/sdk-client` — scaffold only in Phase 0: build config (dual ESM/CJS, `exports` field, TypeScript declarations), `errors.ts` (full typed error hierarchy — all 7 subclasses), `types.ts` (all public-facing types and interfaces). Implementation of working client methods is the Phase 1 SDK workstream. Kept entirely separate from `packages/sdk` (the node authoring SDK) to avoid conflating platform developer and API consumer concerns.
- `packages/integrations/caal` — scaffold only: package structure, build config, correct SDK interface conformance, empty tool function stubs for all `caal.*` tools. No tool logic yet — establishes the package shape so Phases 4 and 5 implement against a stable contract.

**Database Schema** (initial migration — primary tables only)
- `users`, `tenants`, `permissions`, `api_keys`, `auth_sessions`
- `agents`, `agent_versions`, `agent_config`
- `invocation_policies`, `invocation_keys`, `invocation_log`

### ✅ Phase 0 Milestone
- `docker compose up` starts all services without errors
- Drizzle migrations run cleanly; database schema matches the spec
- `packages/core`, `packages/sdk`, and `packages/sdk-client` compile with strict TypeScript; all produce correct `.d.ts` declarations
- `packages/sdk-client` dual ESM/CJS build verified in CI (both module formats importable; type declarations valid)
- CI pipeline is green on a trivial commit

---

## Phase 1 — Core Engine & Minimal Studio
**Theme**: A working end-to-end loop. Build a simple agent graph in the Studio, run it, see the result. No LLM, no integrations — just the execution engine and the bare minimum UI to drive it. Alongside this, ship the initial SDK so API consumers can start integrating from day one.
**Duration**: 6–7 weeks
**Team**: All engineers; parallel workstreams possible from week 2.
**Prerequisites**: ← Phase 0

### Workstreams

**Infra**
- Remaining primary database tables: `prompt_versions`, `test_cases`, `integration_connections`, `integration_oauth_states`, `package_registry`, `marketplace_catalog_cache`, `marketplace_account`, `asset_licenses`, `usage_counters`, `mcp_servers`, `sync_events`, `data_sources`, `workspaces`, `sessions`, `session_context`, `session_run_links`, `named_router_policies`, `provider_pricing`
- Telemetry Store setup (separate SQLite file): `runs`, `steps` (with routing columns), `trajectories`, `evaluate_scores`, `metrics_snapshots`
- BullMQ + Redis queue setup; `runs.trigger`, `runs.scheduled`, `runs.retry` queues

**Engine**
- Node Registry — startup scan of `packages/nodes`; type → module map
- Graph Loader — read/parse/validate graph JSON from DB; in-memory cache with Redis pub/sub invalidation
- Execution Worker — graph traversal (BFS), `resolveEdges()` (conditional + fallback logic), `executeNode()` three-phase lifecycle (Prepare → Execute → Finalize)
- Run Scheduler — queue consumer; per-tenant concurrency enforcement
- Lifecycle Manager — run state transitions; cancellation signal handling; timeout enforcement
- Invocation Auth Validator — `api-key` strategy only (JWT in Phase 3); rate limiting with Redis counters; `X-RateLimit-*` response headers
- Internal REST API: `POST /runs`, `GET /runs/:id`, `GET /runs/:id/steps`, `DELETE /runs/:id`, `POST /agents/:id/deploy`, `GET /health`

**Packages — `packages/nodes` (Phase 1 core nodes)**
- `core:start`, `core:end` — graph entry/exit; input schema declaration
- `core:condition` — JSONata boolean expression evaluation
- `core:router` — N-case JSONata expression routing
- `core:stop` — explicit run termination
- JSONata evaluation utility (used by Condition, Router, and config resolution)

**API**
- Auth: local login/logout/refresh (JWT + HttpOnly refresh token); password hashing; auth sessions table
- Auth middleware: JWT + `mk_`-prefixed API key validation; RBAC enforcement; tenant context resolution
- User CRUD: create, update, deactivate, role assignment
- Tenant CRUD: create, configure, resource limits
- Agent CRUD: create, read, update; version snapshots on publish; `GET /agents/:id/versions`
- Run invocation: `POST /agents/:id/runs` — proxied to engine; sync and async modes; `api-key` invocation auth only
- Run status: `GET /agents/:id/runs/:runId`
- Node types: `GET /v1/nodes` — list available types with schemas
- System health: `GET /v1/system`
- Structured error response shape enforced on all routes
- API versioning: all routes under `/v1/`

**Frontend (Studio)**
- Datastar app shell: navigation, auth pages (login/logout), session management
- Studio canvas (client-side island): pan/zoom, node palette (Phase 1 nodes only), node placement, flow edge connection via ports, node selection
- Node Configuration Panel: static value entry; fields generated from node's config schema
- Agent Configuration Panel: name, description, REST API trigger config
- Basic test run: execute with input payload; per-node status display via polling
- Agent publish/draft state toggle

**Frontend (Admin — minimal)**
- Dashboard: placeholder
- User management: list, create, edit, deactivate, role assignment
- Tenant management: create, configure resource limits
- Agent registry: list agents, enable/disable
- System health panel

**SDK — Phase 1**
- `MagiCaalClient` initialisation: `baseUrl`, `apiKey`/`bearer`, `timeout`, `retry` config (maxAttempts, backoff, retryOn)
- `client.agent<TIn, TOut>(id)` — returns an `AgentClient`
- `AgentClient.invoke(input, opts?)` — sync + async polling modes; returns typed output
- `AgentClient.start(input, opts?)` — returns `RunHandle` immediately
- `RunHandle`: `id`, `wait()`, `cancel()`, `status()`, `steps()`
- `RateLimitInfo` on all results (from `X-RateLimit-*` headers)
- Typed error hierarchy: `MagiCaalError`, `AuthError`, `RateLimitError`, `RunFailedError`, `RunSuspendedError`, `ValidationError`, `AgentNotFoundError`, `NetworkError`
- Zero mandatory runtime dependencies; dual ESM/CJS build; TypeScript declarations included
- Published to npm as `@magicaal/sdk`

### ✅ Phase 1 Milestone
- A developer can log in, create a Condition → Router → End graph, publish it, and invoke it via the REST API with an API key
- The run result is visible in the Studio test run panel
- An admin can create users and tenants
- An API consumer can invoke the same agent using `@magicaal/sdk`, poll for completion with `RunHandle.wait()`, and receive a typed `RunFailedError` when the run fails

---

## Phase 2 — Full Node Set, Production Readiness & Model Router
**Theme**: Make the platform trustworthy in production. Add all core node types, LLM integration with the full model router infrastructure (provider adapters, Router Engine, circuit breaker, round-robin and priority strategies, all reactive triggers), the Agentic Router, safety controls (guardrails, human review), scheduling, telemetry, agent versioning, Integration Connections admin panel and OAuth flows, Named Router Policies, provider pricing table, and streaming SDK support (SDK Phases 1 and 2).
**Duration**: 8–10 weeks
**Team**: Full team; strong parallel opportunity once Phase 1 is solid.
**Prerequisites**: ← Phase 1

### Workstreams

**Engine**
- SSE Stream Manager — per-run event broadcasting; Studio client and API consumer subscriptions; Redis fan-out for horizontal scaling
- Loop Manager — cycle-edge traversal; max iteration enforcement
- Fork/Join parallel execution — `Promise.all` branch coordination
- Scheduler integration — cron trigger dispatch via `runs.scheduled` queue
- Webhook trigger — unique inbound URL per agent; signature passthrough
- Human Review durability — suspend state persisted before review request emission; engine-restart resumption
- **Model Router (Phase 2 core)** — Provider Adapter Registry with built-in `openai`, `anthropic`, `google` adapters (system prompt placement, tool calling, structured output, content policy, rate limit header translation); Router Engine (`routedLLMCall()`, `resolveRouterConfig()`); Health Tracker (per-instance rolling P50 and error rate); Circuit Breaker (CLOSED → OPEN → HALF-OPEN state machine; auto-applied default config on multi-target routers); `priority` and `round-robin` proactive strategies; `rate_limit`, `provider_error`, `timeout`, `context_overflow`, `content_policy` reactive triggers; `routingMeta` populated on every LLM step telemetry record
- Integration Credential Resolver — decrypt and inject credentials; OAuth refresh on expiry; per-run isolation

**Packages — `packages/nodes` (Phase 2 additions)**

*AI/LLM*: `core:llm-call` (structured output mode + auto-retry; builds `CanonicalLLMRequest`; accepts `router` field), `core:prompt-builder`, `core:structured-extract`, `core:embedding`, `core:vector-search`, `core:memory-read`, `core:memory-write`

*Data*: `core:transform`, `core:filter`, `core:aggregate`, `core:validate`, `core:parse`

*Integration (core)*: `core:http-request`, `core:webhook-receive`, `core:db-query`, `core:file-read`, `core:file-write`, `core:web-search`, `core:web-scrape`

*Code*: `core:code` — isolated-vm sandbox; configurable timeout + memory

*Control Flow additions*: `core:fork`, `core:join`, `core:loop`, `core:wait`; **`core:agentic-router`** (LLM-powered classification; structured output; confidence-threshold HITL escalation; auto-generated edge conditions in Studio)

*Guardrails & Control*: `core:guardrail` (block-and-fail, reroute-to-fallback, redact-and-continue), `core:human-review` (SUSPEND state; resume via API; confidence-based escalation)

*Observability*: `core:log`, `core:metric`, `core:annotation`

**API (Phase 2 additions)**
- Run SSE stream: `GET /agents/:id/runs/:runId/stream`
- Version diff and rollback: `GET /agents/:id/versions/:vId/diff`, `POST /agents/:id/versions/:vId/rollback`
- Human Review response: `POST /runs/:id/review`
- Rate limiting: per-agent and tenant-level config; `limitBy` options
- Invocation audit log routes
- Telemetry routes: `GET /v1/telemetry` (run metrics, token usage, routing event log, provider health)
- Data sources CRUD: `POST /v1/datasources`, `GET`, `DELETE`, connection test
- Integration Connections infrastructure: `POST/GET/PATCH/DELETE /v1/integrations/connections`, OAuth callback handler (`GET /v1/integrations/oauth/:service/callback`), reconnect endpoint — built now so integration packages in Phase 5 have the plumbing ready
- Model Router routes: `GET /v1/llm/health`, `GET/POST/PATCH/DELETE /v1/llm/router-policies`, `GET/POST /v1/system/provider-pricing`

**Frontend (Studio additions)**
- Canvas Value Picker: upstream node output reference dropdown → auto-generated JSONata
- Detailed test run panel: per-node input/output inspection, timing, SSE-driven live updates
- Scheduled trigger config in Agent Configuration Panel
- Agent version history panel with diff view and rollback
- Graph lint panel: pre-publish static analysis; blocking errors vs. acknowledgeable warnings
- Agentic Router node config: case declaration UI, confidence threshold, auto-generated edge labels

**Frontend (Admin additions)**
- Basic telemetry dashboard and run history
- Run detail view: step-by-step timeline, per-node inputs/outputs, routing trace
- Human Review queue
- Invocation Auth panel: strategy config, invocation key management, rate limit settings
- Data Sources panel
- **Integration Connections panel**: OAuth connect button, API key entry, status indicators, reconnect, revoke, platform-wide toggle (admin panel and OAuth flows built now; integration packages use them in Phase 5)
- **Named Router Policies panel**: create, edit, delete; overridable flag config; view agent references
- **Provider Pricing table**: CRUD for provider/model pricing; ships with built-in provider defaults

**SDK — Phase 2**
- `agent.stream(input, opts?)` — async iterator of typed run events (`run.started`, `node.started`, `node.completed`, `node.failed`, `run.suspended`, `run.completed`, `run.failed`); `stream.withSignal(abortSignal)`
- `HumanReviewClient`: `approve()`, `reject(reason)`, `modify({ key, value })`, `details()`; `client.onPendingReview(handler, opts)` polling subscription
- `RunSuspendedError.reviewId` for handling suspensions from `invoke()`

### ✅ Phase 2 Milestone
- A developer can build a graph with LLM nodes, guardrails, and a human review gate; publish and invoke it via REST; watch it execute live via SSE
- Model Router correctly round-robins two OpenAI API keys; 429 on the first key triggers fallback to the second; `routingMeta.attemptCount == 2` visible in step telemetry
- Agentic Router correctly classifies intent and routes to the matching branch; low-confidence routing triggers Human Review escalation
- `agent.stream()` delivers typed node-level events in real time
- `HumanReviewClient.approve()` resumes a suspended run; `client.onPendingReview()` fires when a run suspends

---

## Phase 3 — Tool System & Advanced Agent Nodes
**Theme**: Full agentic capability. Tool edges, Tool Call, ReAct, MCP, parallel composition, and advanced routing strategies.
**Duration**: 5–6 weeks
**Team**: Can split into engine/package track and frontend track.
**Prerequisites**: ← Phase 2 (node registry, execution worker, graph loader, Router Engine must be stable)

### Workstreams

**Engine**
- Tool Executor — `runAgentLoop()`, `assembleTools()`, `invokeTool()` routing for graph/MCP/workspace sources; sub-context forking for graph tool invocations; trajectory recording for ReAct
- MCP Client subsystem — JSON-RPC 2.0 client; stdio and Streamable HTTP transports; `initialize`/`tools/list`/`tools/call`; `notifications/tools/list_changed` handling
- **Model Router (Phase 3 advanced)** — `least-latency` and `cost-optimized` proactive strategies; `latency_degraded` and `error_rate` proactive triggers (require sufficient traffic history); provider health dashboard sourced from Health Tracker via `GET /v1/llm/health`; routing event log queryable in telemetry
- **Provider Adapter extensibility** — `ProviderAdapter` interface in `packages/sdk` is the extension point for community-contributed provider adapters (Mistral, Cohere, Azure OpenAI, Ollama, AWS Bedrock, etc.); third-party packages can register adapters without engine changes; documented as part of the public SDK guide

**Packages — `packages/nodes` (Phase 3 additions)**

*AI/LLM*: `core:tool-call` (native function calling, parallel tool execution, configurable maxIterations; builds `CanonicalLLMRequest` per iteration; accepts `router` field), `core:react` (Thought/Action/Observation, serial, trajectory recording; builds `CanonicalLLMRequest` per iteration; accepts `router` field), `core:planner`, `core:reflection`, `core:context-summarize`, `core:token-budget`

*Tool*: `core:tool` (LLM-facing contract + input/output mapping), `core:mcp-client` (direct and funnel modes)

*Composition*: `core:sub-graph`, `core:handoff`, `core:fan-out`, `core:reduce`, `core:input-map`, `core:output-map`

*Evaluation*: `core:evaluate` (rule-based, LLM-as-judge, expected output comparison); Evaluate scores table in Telemetry Store

**API (Phase 3 additions)**
- MCP server CRUD: `POST /v1/mcp-servers`, `GET`, `DELETE`, connectivity test
- Invocation JWT auth strategy: JWKS validation, issuer/audience/claims config
- Input/output schema discovery: `GET /agents/:id/schema/input`, `GET /agents/:id/schema/output`
- Telemetry additions: `GET /v1/telemetry/tokens`, `GET /v1/telemetry/trajectory/:runId`

**Frontend (Studio additions)**
- Tool canvas panel region: floating tool nodes, dashed amber tool edges, agent node tool badge
- Expression Editor: raw JSONata with syntax highlighting, autocomplete, inline evaluation preview
- ReAct/Planner trajectory inline display in test run panel; token usage per LLM node
- MCP Client node configuration: server selector, mode (direct/funnel)
- Provider health dashboard in Admin and Telemetry

**Frontend (Admin additions)**
- MCP server management panel
- JWT invocation auth configuration
- Telemetry additions: per-node performance, token usage tracking, trajectory evaluation view, Evaluate score history, routing event log

### ✅ Phase 3 Milestone
- A Tool Call agent with 3+ tools (including one MCP tool) executes correctly; trajectories appear in telemetry; `routingMeta` shows which provider responded on each iteration
- ReAct agent reasons over multiple iterations with trajectory recorded per step
- `cost-optimized` routing selects the cheapest healthy provider based on the pricing table
- Fan-Out/Reduce across a 10-item array executes in parallel and merges results correctly

---

## Phase 4 — Graph-as-Code & Session Management
**Theme**: Developer power tools. Code-defined agents, the session system (including explicit session nodes), prompt versioning, and the SDK session + workspace context utilities.
**Duration**: 6–7 weeks
**Team**: Compiler/CLI work is largely independent and can proceed in parallel with session management engine work.
**Prerequisites**: ← Phase 2 (stable agent CRUD, boot-time DB); ← Phase 3 (execution context shape must be stable before the session layer is added)

### Workstreams

**Packages — `packages/compiler`**
- `AgentGraph` base class: `node()`, `connect()`, `when()`, `otherwise()`, `tool()`, `workspace()` builder methods; `defaultRouter` field on `@Agent` meta
- `@Agent` decorator: Reflect.metadata attachment for all `AgentMeta` fields including `session` and `defaultRouter`
- Typed node classes: auto-generated from each node type's config schema; LLM node classes expose `router` field
- `compile()` function: metadata extraction, connectivity validation, `toolEdges`, `workspaceEdges`, `routerPolicies` serialisation, schema validation

**Packages — `packages/cli`**
- `magicaal build`, `magicaal validate`, `magicaal list`
- `magicaal sessions migrate --agent {handle}`

**Engine — Session Manager**
- `loadSession()`, `saveSession()`, `expireSessions()`
- Per-key accumulation: `append`/`replace`/`merge` types; `evict_oldest`, `summarize`, `truncate` overflow strategies
- Schema migration chain application
- Session propagation to child runs via `core:sub-graph` and `core:handoff`
- Session conflict detection: reject concurrent top-level runs sharing a session ID (409)

**Packages — `packages/nodes` (session nodes)**
- `core:session-read` — explicitly load session keys into execution context mid-graph
- `core:session-write` — explicitly write context values to session keys at any graph position
- `core:session-clear` — reset specific session keys or entire session context

**API — Boot-Time Sync**
- `bootTimeSync()`: manifest scan, hash comparison, insert/update/stale-flag logic, `syncConfig()` with override map respect, sync event log insert
- Runs before HTTP server begins accepting traffic

**API (Phase 4 additions)**
- Session management: `GET /agents/:id/sessions`, `GET /agents/:id/sessions/:sid`, `GET /agents/:id/sessions/:sid/runs`, `DELETE`, `POST /reset`
- `session_id` and `session_metadata` on `POST /agents/:id/runs`
- Prompt Version CRUD: `POST /v1/prompts`, `GET`, `PUT`, promote endpoint
- Test case CRUD and suite execution: `POST /agents/:id/test-cases`, `GET`, `PUT`, `DELETE`, `POST /run`

**Frontend (Studio additions)**
- Code-defined agents rendered as read-only canvas; code-source banner; locked controls
- Session Context Inspector panel: live session key values, entry counts, token estimates
- Prompt Version panel: version list, create/compare/promote
- Test Case Library panel: named cases, assertion types, suite runner, pass/fail drill-down
- AI Studio Assistant: graph-aware panel; modifications (Studio-built), TypeScript equivalents (code-defined), run debug, node explanation

**Frontend (Admin additions)**
- Session Management panel: session list, context snapshot, reset/delete, stale-schema warnings
- Prompt Version Management (tenant-wide)
- Sync Event Log panel
- Sessions view in Telemetry: session list, session detail with run sequence, context growth chart, cumulative token usage, overflow events

**SDK — Phase 3**
- `SessionClient`: reference (`client.session(id)`) or create (`agent.sessions.create(opts)`); context snapshot; `reset()`, `clear(keys)`, `destroy()`; `session` parameter on `invoke()`, `start()`, `stream()`
- `WorkspaceContextBuilder`: fluent builder for coding assistant session context; `addMessage(role, content)`, `setCurrentFile(path, content)`, `addDocument(doc)`, `set(key, value)`; schema-aware validation when constructed with `agent.schema.contextSchema`
- `agent.sessions.list(opts)` — list active sessions for an agent

**Caal — Phase 1 (Basic: explain, targeted modify, TypeScript suggestions)**

*Database*
- `caal_configuration` table migration — tenant-level Caal settings: enabled, LLM model override, router policy ID, generation mode, confirmation mode, system prompt suffix, show reasoning flag, preferred connections, allowed operations

*Engine*
- `_platform` pseudo-tenant initialization at engine and API startup — bootstraps Caal as a platform-owned agent graph compiled from `caal.agent.ts` at build time
- Caal invocation path — `POST /v1/caal/invoke` endpoint (Studio-only, platform session JWT auth, SSE response stream); session scoping to `{userId}:{agentId}`; push-on-message graph state strategy (full `AgentGraphDefinition` sent with every request, no delta tracking)
- Caal session management — uses existing Session Manager subsystem; session context stores `messages`, `lastProposal`, `graphSnapshot`, `userPreferences`

*Packages — `packages/integrations/caal` (Phase 1 tools)*
- **Graph inspection**: `caal.graph.read`, `caal.graph.getNode`, `caal.graph.getSelectedNodes`, `caal.graph.summarize`
- **Graph modification** (accumulate into `CaalProposal` — no direct DB writes): `caal.graph.addNode`, `caal.graph.updateNode`, `caal.graph.deleteNode`, `caal.graph.addEdge`, `caal.graph.deleteEdge`, `caal.graph.addToolEdge`
- **Proposal**: `caal.proposal.create` (targeted complexity tier only in Phase 1)
- **Platform context**: `caal.platform.listNodeTypes`, `caal.platform.getNodeSchema`, `caal.platform.listConnections`, `caal.platform.listAgents`
- **Canvas UI**: `caal.canvas.highlight`, `caal.canvas.focus`

*Packages — `caal.agent.ts` (Phase 1 graph — basic paths)*
- Context Assembler node (Transform): assembles graph summary, selected node details, available node types, tenant connection status, last run errors, system prompt suffix, user preferences from session
- Explainer path: LLM Call node for `explain`/`question` intents — no tools, uses assembled context directly
- Suggester path: Tool Call node for quick single-operation suggestions
- Modify path: Tool Call node for targeted modifications; reads current graph, applies staged patches, calls `caal.proposal.create` (targeted tier)
- Phase 1 graph uses a simple Condition/Router for intent routing (Agentic Router replaces this in Phase 2)
- TypeScript suggestion generation: when graphState is from a code-defined agent, the modify path generates a `TypeScriptSuggestion` (unified diff) instead of staging `GraphPatch` operations

*API*
- `POST /v1/caal/invoke` — Studio-only invocation; not in public OpenAPI spec; JWT auth only
- `GET /v1/caal/sessions/:sid` — conversation and proposal history; scoped to `{userId}:{agentId}`

*Frontend (Studio — Phase 1)*
- Caal panel scaffold: collapsible side panel (≈30% width); conversation thread with user/Caal message attribution; input area with send button
- Context bar: current graph node count, selected node name (live), last run status indicator
- Quick actions row: "Explain graph", "Debug last run", "Add error handling", "Suggest router policy", "Generate tests"
- Node reference chip rendering: Caal responses parsed for node references; rendered as clickable amber chips; clicking fires `caal.canvas.highlight` + `caal.canvas.focus`
- Targeted proposal review UI: inline diff list; per-change accept/reject toggles; "Accept All / Reject All" buttons
- Undo integration: all Caal-applied changes pushed to Studio undo/redo stack as a single labelled entry "Caal: [description]"; undo acknowledgement message appended to conversation
- TypeScript suggestion display: unified diff rendered as a copyable code block with a prominent read-only notice ("apply manually to source file, then recompile")
- Code-defined agent mode: TypeScript diff path active; no staging controls shown; panel indicates read-only modification mode
- Caal History panel: accessible from panel header; full prior conversation, proposals (with accepted/rejected status), and TypeScript suggestions for the current agent's Caal session

### ✅ Phase 4 Milestone
- A code-defined `*.agent.ts` is compiled via `magicaal build`, deployed, and syncs to the DB on API boot; visible as read-only in the Studio
- A conversational agent maintains message history across 5 sequential invocations; `summarize` overflow triggers correctly at `maxItems`; schema migration between v1 and v2 applies correctly to existing sessions
- `core:session-write` mid-graph persists a value that is visible on the next invocation
- `SessionClient` in the SDK maintains session ID across calls; `WorkspaceContextBuilder.toInput()` produces a valid agent input payload
- A developer can open the Caal panel, ask "explain this graph", and receive an explanation with clickable node reference chips that pan and highlight nodes on the canvas
- Caal makes a targeted modification ("add a guardrail after the LLM node"), the developer reviews the inline diff, accepts it, and the change appears on the canvas and in the undo stack as "Caal: Added Guardrail node"
- For a code-defined agent, Caal produces a TypeScript unified diff suggestion instead of staging graph patches; the read-only notice is displayed correctly
- Caal History panel shows all prior conversations and proposal outcomes for the current agent

---

## Phase 5 — Integrations & Marketplace
**Theme**: Connect the platform to the real world. First-wave integration packages (OAuth flows and connection management infrastructure was already built in Phase 2), marketplace panel, and SDK codegen.
**Duration**: 7–8 weeks
**Team**: Integration packages are highly parallelisable — multiple engineers can work on different services simultaneously.
**Prerequisites**: ← Phase 2 (Integration Connections infrastructure and OAuth flows already built); ← Phase 3 (tool edge + node SDK must be stable before integration nodes are built)

### Workstreams

**Packages — `packages/integrations/core`**
- OAuth token refresh utility
- Pagination cursor handling
- Standardised error formatting
- Rate limit header parsing
- Idempotency key management

**Packages — `packages/integrations` (Phase 5 — first wave)**
Build in this order (highest value / broadest applicability first):

| Package | Priority | Trigger? |
|---|---|---|
| `slack` | Critical | Yes |
| `github` | Critical | Yes |
| `gmail` + `sendgrid` | Critical | Yes (Gmail) |
| `stripe` | Critical | Yes |
| `google-workspace` (Sheets, Drive, Docs, Calendar) | Critical | Yes (Calendar) |
| `jira` | Critical | Yes |
| `twilio` | Important | No |
| `salesforce` | Critical | Yes |
| `hubspot` | Critical | Yes |
| `zendesk` | Critical | Yes |
| `quickbooks` | Important | No |
| `bamboohr` | Important | Yes |
| `shopify` | Important | Yes |

Each package: all node types, auth schema, node type manifests, trigger handler (if applicable) with service-specific signature validation, integration tests.

**Engine**
- Integration Trigger Registration — `/v1/triggers/integrations/[service]/[tenant-slug]` endpoint registration; multi-agent event routing
- Package Signature Verifier — publisher sig + content hash + MagiCaal countersig (official packages)
- Redis pub/sub hot-load: package install event → node registry update
- License Validator background process (hourly heartbeat; 72-hour grace period)
- Usage Reporter background process (daily aggregate counts)

**API (Phase 5 additions)**
- Integration types list: `GET /v1/integrations`
- Marketplace Account: `POST /v1/marketplace/account`, `GET`
- Marketplace Catalog: `GET /v1/marketplace/catalog`
- Package install/update/remove: `POST /v1/marketplace/packages/:id/install`, update, `DELETE`
- License management: `GET /v1/marketplace/licenses`, `POST /v1/marketplace/licenses/bundle`
- Template import: `POST /v1/marketplace/templates/import`
- Prompt pack import: `POST /v1/marketplace/prompt-packs/import`
- OpenAPI spec: `GET /v1/openapi.json`

**Frontend (Studio additions)**
- Integration node connection selector in Node Configuration Panel
- Integration trigger config in Agent Configuration Panel
- Node palette: newly installed nodes appear without page reload; "Browse Marketplace" per category

**Frontend (Admin additions)**
- Node & Integration Marketplace panel: MagiCaal Account linking, Installed tab, Browse Official/Community tabs, install/update/remove, paid asset purchase flow (link-out), license management, air-gapped bundle upload, community package policy

**SDK — Phase 4**
- `magicaal generate` CLI subcommand: fetch agent schema → generate `*.types.ts` + `*.descriptor.ts`; stale schema runtime warning; `magicaal generate --check` for drift detection; `magicaal generate --all` for all accessible agents
- `client.agent(agentDescriptor)` — fully typed input/output from generated descriptor; no manual type parameters needed
- `WebhookVerifier(secret)` — HMAC-SHA256 signature verification for outbound webhook notifications; throws `WebhookVerificationError` on invalid signature
- `agent.validate(input)` — pre-flight input validation against fetched schema; returns typed issues array
- `client.runs.get(runId)` — direct run status check utility

### ✅ Phase 5 Milestone
- A Slack + GitHub + Jira integration agent (triggered by a GitHub push event) executes end-to-end
- A node package is installed from the marketplace: signature verified, hot-loaded, new node appears in Studio palette without restart
- An air-gapped license bundle is uploaded and the included package activates
- `magicaal generate --agent my-agent` produces typed descriptor; `client.agent(descriptor)` gives compile-time errors on incorrect input
- `WebhookVerifier` correctly rejects a webhook with a tampered payload

---

## Phase 6 — Workspace & Coding Environment
**Theme**: Full coding agent capability. Docker-based development environments, lifecycle hooks, dual-mode tool execution, and workspace permission enforcement.
**Duration**: 6–7 weeks
**Team**: Docker integration work requires dedicated focus; frontend workspace canvas can proceed in parallel.
**Prerequisites**: ← Phase 3 (tool system complete; workspace tools are a variant of the tool system); ← Phase 4 (workspace is session-scoped; session system must be stable)

### Workstreams

**Infra**
- Docker socket mount in Docker Compose (`/var/run/docker.sock`) for DooD
- Workspace volume storage path configuration (`/workspaces`)
- Standard Docker images: `magicaal/env:node`, `magicaal/env:python`, `magicaal/env:fullstack`, `magicaal/env:base`
- Workspace-related engine environment variables (`DOCKER_SOCKET`, `WORKSPACE_VOLUME_PATH`, resource defaults)

**Engine — Workspace Container Manager**
- `provisionWorkspace()`: image resolution, volume creation, container start, git clone via credential helper sidecar, `setupCommands`, devcontainer.json application, lifecycle hooks (`afterClone`, `afterBoot`)
- Credential helper sidecar: intercepts git's credential-helper protocol; credentials in-memory only
- `executeTool()`: bash, file, git, process dispatch; timeout enforcement
- `teardownWorkspace()`: `beforeTeardown` hooks, auto-commit, push, container + volume removal
- `onSessionResume` hook execution at start of each subsequent run in the same session
- Auto-registration: publish `workspace.ready` event when READY; agent nodes with workspace-registration edges update assembled tool list
- `workspaces` database table management

**Engine — Permission Enforcer (complete)**
- `check()`: three-tier hierarchy (tenant → workspace → agent node); deny-wins; condition matching
- Predefined profiles: `full-access`, `sandboxed-dev`, `no-network-bash`, `code-analysis`, `read-only`, `deny-all`
- `workspace_permission_denied` step event recording

**Packages — `packages/nodes` (workspace nodes)**
- `core:workspace` — resource declaration; `WorkspaceConfig` validation
- `core:workspace-provision` — explicit provisioning; runtime-resolved URL/ref from context
- `core:workspace-bash` — dual-mode; bash execution; stdout/stderr/exitCode/timedOut
- `core:workspace-file` — dual-mode; all operations including `patch_file` (unified diff application)
- `core:workspace-git` — dual-mode; structured parsed output
- `core:workspace-process` — dual-mode; background process management

**Frontend (Studio additions)**
- Workspace canvas panel: third canvas region; workspace resource card with live status; workspace tool nodes; workspace edges and tool edges
- Workspace node configuration: repository, environment, lifecycle hooks editor, permissions editor, teardown config
- `core:workspace-provision` in main flow palette with JSONata-resolved URL/ref fields
- Dual-mode workspace tool nodes in main flow palette (direct mode)

**Frontend (Admin additions)**
- Active Workspaces panel: live container list, resource usage, force-stop
- Tenant workspace resource limits and allowed image list
- Tenant-level workspace permission policy editor

**Note**: `WorkspaceContextBuilder` (from `@magicaal/sdk` Phase 3, available since Phase 4) enables API consumers to construct structured session context for coding assistant agents from this phase onwards.

### ✅ Phase 6 Milestone
- A coding assistant with a session-scoped workspace clones a repository, runs `npm install`, executes `npm test`, and reports results via Slack — all within one session
- Lifecycle hooks: `afterBoot` creates an agent-specific branch; `onSessionResume` pulls latest; `beforeTeardown` commits and pushes
- Permission rule denies `git push`; denial message returned to LLM; `workspace_permission_denied` in run trace
- `patch_file` correctly applies a unified diff; git credentials confirmed absent from `docker inspect`
- `core:workspace-bash` in direct mode (main graph flow) branches a Condition node on exit code

---

## Phase 7 — Scale, Ecosystem & Remaining Integrations
**Theme**: Production scale, external auth, A2A interoperability, remaining integrations, and framework SDK bindings.
**Duration**: 5–6 weeks
**Team**: Largely parallelisable by track.
**Prerequisites**: ← Phase 5 (marketplace and integration infrastructure); ← Phase 6 (workspace complete)

### Workstreams

**Infra**
- Horizontal engine scaling validation: multi-instance Docker Compose; Redis pub/sub fan-out correctness; BullMQ distributed consumer behaviour; rate limit counter consistency across instances
- Health Tracker Redis coordination: publish circuit state changes to Redis on open/close transitions; engine instances subscribe and merge — ensures consistent circuit state under horizontal scale
- Database upgrade path validation: test Drizzle migration from SQLite to PostgreSQL

**Engine (Phase 7 additions)**
- Dry Run Executor: `dry_run: true` run flag; stub responses for LLM, HTTP, and integration nodes; full step-level trace without real API calls
- Episodic Memory: `core:episodic-memory-read`/`core:episodic-memory-write` — semantic similarity store; embedding + vector comparison on recall
- A2A inbound endpoint: A2A-compliant endpoint for agents with `a2a: true` flag; `core:a2a-client` outbound node

**Packages — `packages/nodes` (Phase 7 additions)**
- `core:episodic-memory-read`, `core:episodic-memory-write`
- `core:a2a-client`

**Packages — `packages/integrations` (Phase 7 — remaining)**

| Package | Priority |
|---|---|
| `microsoft-365` (Outlook, Excel, SharePoint, Teams) | Important |
| `notion` | Important |
| `asana` | Important |
| `pagerduty` | Important |
| `datadog` | Important |
| `aws` (S3, SES, SNS, SQS) | Important |
| `docusign` | Important |
| `workday` | Notable |
| `rippling` / `gusto` | Notable |
| `gitlab` | Important |
| `linear` | Notable |
| `klaviyo` / `mailchimp` | Notable |
| `pipedrive` | Notable |
| `freshdesk` | Notable |
| `sentry` | Notable |
| `square` | Notable |
| `calendly` | Notable |
| `hellosign` | Notable |
| `monday` | Notable |

**API (Phase 7 additions)**
- External IdP (OAuth 2.0 / OIDC): extensible identity provider interface; Google Workspace as first integration
- A2A endpoint registration

**SDK — Phase 5 (framework bindings)**
- `@magicaal/react`: `useAgentInvoke(agentId, opts?)`, `useAgentStream(agentId, input, opts?)`, `useSession(sessionId)` hooks
- `@magicaal/next`: server action helpers (`agentAction(agentId)`), route handler utilities (`agentStreamHandler(agentId)`)
- `@magicaal/express`: webhook middleware (`magicaalWebhook(secret, handler)`), human review handler middleware

**Frontend (Phase 7 additions)**
- External IdP configuration in Admin → Auth & Security
- Dry run mode toggle in test run panel
- Cross-run comparison in telemetry
- Telemetry data export (CSV / JSON)
- Alerting rules panel: threshold-based for error rate, duration, Evaluate score
- Episodic Memory node configuration

### ✅ Phase 7 Milestone
- Two engine instances process runs from the same queue without duplication; circuit state converges across instances via Redis
- Dry run of a 5-node agent with LLM + integration nodes produces a full step-level trace with no outbound API calls
- An A2A-enabled MagiCaal agent is invoked from a third-party A2A-compatible framework
- External IdP login works end-to-end with Google Workspace
- `useAgentStream()` React hook streams node-level events correctly in a test Next.js application

---

## Summary Timeline

| Phase | Theme | Duration | Cumulative |
|---|---|---|---|
| 0 | Foundation | 2–3 weeks | 2–3 weeks |
| 1 | Core Engine, Minimal Studio & SDK Phase 1 | 6–7 weeks | 8–10 weeks |
| 2 | Full Node Set, Production Readiness & Model Router | 8–10 weeks | 16–20 weeks |
| 3 | Tool System & Advanced Agent Nodes | 5–6 weeks | 21–26 weeks |
| 4 | Graph-as-Code, Session Management, SDK Phase 3 & Caal Phase 1 | 6–7 weeks | 27–33 weeks |
| 5 | Integrations, Marketplace, SDK Phase 4 & Caal Phase 2 | 7–8 weeks | 34–41 weeks |
| 6 | Workspace & Coding Environment | 6–7 weeks | 40–48 weeks |
| 7 | Scale, Ecosystem & SDK Phase 5 | 5–6 weeks | 45–54 weeks |

**Total estimated range**: 45–54 weeks (~11–13 months) for a team of 3–6 engineers.

---

## Cross-Cutting Concerns (Every Phase)

- **Testing**: Unit tests for every node implementation; integration tests for engine subsystems (including Router Engine per-adapter); E2E tests for critical user journeys. Target: new code ships with tests; no phase milestone is reached without the test suite green.
- **Documentation**: Architecture doc and PRD kept in sync with implementation decisions. Node type reference, `@magicaal/sdk` API reference, and `ProviderAdapter` SDK guide updated with each phase. OpenAPI spec auto-generated from route definitions.
- **Security review**: Each phase introducing a new execution boundary warrants a focused security review before milestone sign-off: Phase 2 (Code node sandbox, Model Router provider credentials), Phase 3 (MCP client), Phase 5 (marketplace package signing), Phase 6 (workspace Docker containers).
- **Performance baselines**: After Phase 1, establish P95 latency baselines for run dispatch and `routedLLMCall()` overhead. Re-measure after each phase. Address regressions before proceeding.
- **Database migrations**: Every schema change ships with a Drizzle migration file. Migration rollback tested in CI.

---

## Key Risks & Mitigations

| Risk | Phase | Mitigation |
|---|---|---|
| Graph traversal edge cases (cycles, disconnected subgraphs) | 1 | Dedicated traversal test suite with adversarial graph inputs before Phase 1 milestone |
| LLM provider API surface changes | 2+ | `ProviderAdapter` interface isolates provider specifics; swap without node implementation changes |
| JSONata expression evaluation performance at scale | 2+ | Benchmark under 100+ concurrent runs; cache compiled expressions |
| Tool loop infinite iteration / runaway token spend | 3 | `maxIterations` enforced at engine level; token budget node available; per-agent timeout |
| Router Engine adding latency to every LLM call | 2+ | Benchmark `routedLLMCall()` overhead; target < 5ms per call; cache `resolveRouterConfig()` result per run |
| Session context store growth | 4 | Overflow strategies tested with large append arrays; `maxTokens` per key enforced in summarize path |
| Docker socket security (DooD) | 6 | Workspace containers run as non-root, no extra capabilities, no internal network access; documented risks |
| Workspace container resource leaks | 6 | Lifecycle Manager triggers teardown on run timeout/cancellation; periodic orphan container cleanup job |
| Integration OAuth token expiry mid-run | 5+ | Token refresh tested under expiry conditions; grace period window tested |
| Provider pricing table staleness | 2+ | Admin panel surfaces last-updated timestamp; pricing drift causes suboptimal cost-optimized routing, not failures |
| `@magicaal/sdk` breaking changes affecting consumers | 1+ | Semver enforced; breaking changes in major version only; deprecation warnings in minor versions |
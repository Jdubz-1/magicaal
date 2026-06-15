# MagiCaal — Development Progress

**Last updated:** 2026-06-15  
**Tracks against:** `MAGICAAL_DEV_ROADMAP.md` v0.2  
**Current branch:** `DEV-main`

---

## Status Overview

| Phase | Theme | Status | Notes |
|---|---|---|---|
| 0 | Foundation | ✅ Complete | |
| 1 | Core Engine & Minimal Studio | ✅ Complete | |
| 2 | Full Node Set, Production Readiness & Model Router | ✅ Complete | All 35 nodes built; routingMeta persisted; Invocation Auth admin panel added |
| 3 | Tool System & Advanced Agent Nodes | ✅ Complete | 15 new nodes; Tool Executor; MCP client; cost-optimized router; JWT auth; Studio tool panel |
| 4 | Graph-as-Code & Session Management | ❌ Not started | |
| 5 | Integrations & Marketplace | ❌ Not started | |
| 6 | Workspace & Coding Environment | ❌ Not started | |
| 7 | Scale, Ecosystem & Remaining Integrations | ❌ Not started | |

---

## Phase 0 — Foundation ✅ Complete

All milestone requirements met.

**Delivered:**
- pnpm workspace monorepo with TypeScript project references, ESLint, Prettier, `tsconfig` hierarchy
- CI/CD pipeline (lint, type-check, test, build on PR; Docker image builds on merge)
- Docker Compose — `api`, `engine`, `web`, `redis` services with shared volume mounts
- SQLite + Drizzle ORM; migration tooling; seed script
- `packages/core` — all Phase 0 foundational types (~80 interfaces across 8 domain modules)
- `packages/sdk` — `NodeModule<TConfig>`, `ExecutionContext`, `ProviderAdapter` interfaces
- `packages/sdk-client` — scaffold (dual ESM/CJS build, error hierarchy, types)
- `packages/integrations/caal` — stub NodeModule implementations for all `caal.*` tools
- Initial DB schema migration (users, tenants, permissions, api_keys, auth_sessions, agents, agent_versions, agent_config, invocation_policies, invocation_keys, invocation_log)
- Devbox environment pinning Node.js 22 LTS + pnpm 9

---

## Phase 1 — Core Engine & Minimal Studio ✅ Complete

All milestone requirements met. Docker-verified (`docker compose up --build`).

**Delivered:**

*Infra*
- All remaining primary DB tables (17 new tables including sessions, mcp_servers, workspaces, marketplace, integrations, platform, prompt-test tables)
- Telemetry Store (separate SQLite): `runs`, `steps` tables
- BullMQ + Redis queue setup — `runs.trigger`, `runs.scheduled`, `runs.retry` queues

*Engine*
- Node Registry — startup scan of `packages/nodes`; type → module map
- Graph Loader — read/parse/validate graph JSON from DB; in-memory cache
- Execution Worker — BFS graph traversal, `resolveEdges()` (conditional + fallback)
- Run Scheduler — BullMQ consumer; concurrency-10 worker
- Lifecycle Manager — run state transitions, telemetry writes
- Invocation Auth — SHA-256 hashed API key validation; rate limiting
- Internal REST API: `POST /runs`, `GET /runs/:id`, `GET /runs/:id/steps`, `DELETE /runs/:id`, `POST /agents/:id/deploy`, `GET /health`

*Packages — nodes (Phase 1)*
- `core:start`, `core:end`, `core:stop`, `core:condition`, `core:router`
- JSONata evaluation utility

*API*
- JWT auth (argon2 + jose), RBAC middleware (4 roles), auth sessions
- Users CRUD, Tenants CRUD, Agents CRUD, publish/draft/version snapshots
- Run invocation (sync + async proxy to engine)
- Run status, run steps, node types list, system health
- Invocation key management, agent config GET/PATCH

*Frontend — Studio*
- SVG canvas: pan/zoom, node palette, node placement, edge drag-to-connect, edge type picker
- Node Configuration Panel (schema-driven field rendering)
- Agent Configuration Panel (name, description, trigger config, Save Draft)
- Test Run Panel (per-node step output with timing)
- Publish/draft state toggle

*Frontend — Admin*
- Users, Tenants, Agents management panels
- System health panel

*SDK*
- `MagiCaalClient`, `AgentClient.invoke()`, `AgentClient.start()`
- `RunHandleImpl` (wait, cancel, status, steps)
- Typed error hierarchy (7 subclasses)
- Rate limit info from `X-RateLimit-*` headers

*Test coverage:* 83 tests (35 nodes, 17 engine, 31 API)

---

## Phase 2 — Full Node Set, Production Readiness & Model Router ✅ Complete

Phase 2 milestone requirements are met. Post-completion security review identified and fixed 10 bugs (5 critical, 5 high/medium). All 9 previously deferred nodes, routingMeta telemetry persistence, and Invocation Auth admin panel delivered 2026-06-02. See DEVLOG for details.

### ✅ Delivered

**Engine**
- SSE Stream Manager — per-run event broadcasting (`run.started`, `node.started`, `node.completed`, `node.failed`, `run.completed`, `run.failed`, `run.suspended`); single-instance in-memory
- Loop Manager — cycle-edge traversal; `maxIterations` enforcement
- Fork/Join parallel execution — `Promise.all` branch coordination; per-branch deep-cloned context; configurable merge strategies (collect, merge, last-wins)
- Scheduler integration — cron trigger dispatch via `runs.scheduled` BullMQ queue
- Webhook trigger — per-agent HMAC-SHA256 signed URL; validation in API layer
- Human Review durability — suspend state + checkpoint JSON persisted before review emission; `resumeRun()` approve/reject path; startup re-queue of orphaned suspended runs
- Model Router — Provider Adapter Registry (OpenAI, Anthropic, Google adapters); Router Engine (`routedLLMCall()`, `resolveRouterConfig()`); Health Tracker (rolling P50 + error rate per target); Circuit Breaker (CLOSED → OPEN → HALF-OPEN); `priority`, `round-robin`, `weighted`, `least-latency` strategies; `rate_limit`, `provider_error`, `timeout`, `context_overflow`, `content_policy` reactive triggers; tenant policy `overridable: false` enforcement; built-in provider pricing cache
- Integration Credential Resolver — AES-256-GCM decrypt from primary DB; inject into `ctx.credentials` before execution

**Packages — nodes (Phase 2)**

| Node | Category | Status |
|---|---|---|
| `core:log` | Observability | ✅ |
| `core:metric` | Observability | ✅ |
| `core:annotation` | Observability | ✅ |
| `core:transform` | Data | ✅ |
| `core:filter` | Data | ✅ |
| `core:validate` | Data | ✅ |
| `core:parse` | Data | ✅ |
| `core:aggregate` | Data | ✅ |
| `core:loop` | Control Flow | ✅ |
| `core:fork` | Control Flow | ✅ |
| `core:join` | Control Flow | ✅ |
| `core:wait` | Control Flow | ✅ |
| `core:agentic-router` | Control Flow | ✅ |
| `core:prompt-builder` | AI/LLM | ✅ |
| `core:llm-call` | AI/LLM | ✅ |
| `core:structured-extract` | AI/LLM | ✅ |
| `core:embedding` | AI/LLM | ✅ |
| `core:memory-read` | AI/LLM | ✅ |
| `core:memory-write` | AI/LLM | ✅ |
| `core:guardrail` | Guardrails | ✅ |
| `core:human-review` | Guardrails | ✅ |
| `core:vector-search` | AI/LLM | ✅ |
| `core:http-request` | Integration | ✅ |
| `core:webhook-receive` | Integration | ✅ |
| `core:db-query` | Integration | ✅ |
| `core:file-read` | Integration | ✅ |
| `core:file-write` | Integration | ✅ |
| `core:web-search` | Integration | ✅ |
| `core:web-scrape` | Integration | ✅ |
| `core:code` | Code | ✅ (isolated-vm; optional dep — native build required) |

**Total registered: 35 nodes** (5 Phase 1 + 30 Phase 2).

**API additions**
- Run SSE stream proxy: `GET /agents/:id/runs/:runId/stream`
- Version diff: `GET /agents/:id/versions/:vId/diff`
- Version rollback: `POST /agents/:id/versions/:vId/rollback`
- Human Review response: `POST /agents/:id/runs/:runId/review`
- Rate limiting (in-memory): `X-RateLimit-*` headers on run invocation
- Invocation audit log (DB write on dispatch)
- Telemetry: `GET /v1/telemetry`, `GET /v1/telemetry/tokens`
- Data Sources CRUD + connection test stub
- Integration Connections: full CRUD + OAuth initiation stub
- Named Router Policies: CRUD
- Provider Pricing: `GET/POST /v1/system/provider-pricing`
- Webhook: `POST /v1/agents/:id/webhook/:secret` (public, no auth)
- LLM health: `GET /v1/llm/health`

**Frontend — Studio additions**
- Canvas Value Picker — upstream node output reference dropdown → auto-generated JSONata
- Test Run Panel — SSE-driven live node status updates (replaced polling)
- Scheduled trigger config — cron expression input in Agent Configuration Panel
- Webhook trigger config — webhook URL display after publish
- Graph Lint Panel — static analysis; blocking errors vs. acknowledgeable warnings; pre-publish gate
- Version history panel via Studio routes (diff view, rollback)

**Frontend — Admin additions**
- Telemetry dashboard (KPI cards + recent runs table)
- Run detail view (step timeline, token usage, routing trace)
- Human Review queue (approve/reject UI)
- Integration Connections panel
- Named Router Policies panel
- Provider Pricing table (CRUD)
- Data Sources panel

**SDK Phase 2**
- `AgentClient.stream()` — async generator of typed `RunStreamEvent` values
- `HumanReviewClient` — `approve()`, `reject()`, `modify()`, `details()`, `onPendingReview()`
- `RunSuspendedError.reviewId` populated from run response

**Test coverage:** 197 tests (126 nodes, 40 engine, 31 API)

---

### ✅ Phase 2 Gap Closure (2026-06-02)

All high/medium priority gaps closed. Remaining deferred items are low priority and do not block Phase 3.

| Gap | Status |
|---|---|
| All 9 deferred nodes | ✅ Built and registered |
| `routingMeta` not persisted to telemetry steps | ✅ Fixed — `NodeOutput.routingMeta` now written to `routing_meta_json` + `router_target_used` on every LLM step |
| Invocation Auth admin panel | ✅ Built — `/admin/invocation-auth` with policy + key management; new `GET/PATCH /:id/invocation-policy` API routes |

### ⚠️ Phase 2 Deliberately Deferred

| Gap | Roadmap reference | Decision |
|---|---|---|
| SSE Redis fan-out | "Redis fan-out for horizontal scaling" | Deferred to Phase 7 — single-instance is fine until horizontal scaling work begins |
| Agentic Router node config UI | Case declaration UI, confidence threshold, auto-generated edge labels | Deferred — node functions correctly; Studio config via generic JSON editor is acceptable |
| OAuth callback handler (complete) | Integration Connections OAuth flow is a stub | Deferred to Phase 5 when integration packages exist |

---

## Phase 3 — Tool System & Advanced Agent Nodes ✅ Complete

### ✅ Delivered (2026-06-15)

**Engine**
- Tool Executor (`tool-executor.ts`) — `assembleTools`, `runAgentLoop` (tool-call + react modes), `invokeGraphTool`, `invokeMcpTool`, `runSubGraph`
- Graph utils (`graph-utils.ts`) — `resolveEdges` extracted to avoid circular imports
- Worker — `core:tool-call` and `core:react` special cases (delegate to Tool Executor); `core:fan-out` and `core:reduce` special cases with `findReduceNode` helper
- Context — `clearTrajectorySteps`, `dispatchSubRun`, `_callMcpTool`
- Lifecycle — `writeTrajectorySteps`, `writeEvaluateScore`; MCP cleanup on run end
- MCP Client (`mcp/mcp-client.ts`) — JSON-RPC 2.0, stdio + HTTP transports, `initialize`, `listTools`, `callTool`, `disconnect`
- MCP Registry (`mcp/mcp-registry.ts`) — per-run client pool with `releaseForRun`
- Router Engine — `cost-optimized` strategy; proactive `checkProactiveTriggers` for `latency_degraded`/`error_rate`
- Health Tracker — timestamps on samples; `getErrorRate(targetId, windowMs?)`
- Invocation Auth — full JWT strategy via `jose` (JWKS fetch, issuer/audience validation, required claims, error codes)

**Packages — nodes (Phase 3, 15 new = 50 total)**

| Node | Category | Track |
|---|---|---|
| `core:tool` | tool | A |
| `core:tool-call` | ai-llm | A |
| `core:react` | ai-llm | A |
| `core:mcp-client` | integration | A |
| `core:planner` | ai-llm | B |
| `core:reflection` | ai-llm | B |
| `core:context-summarize` | ai-llm | B |
| `core:token-budget` | ai-llm | B |
| `core:sub-graph` | composition | C |
| `core:handoff` | composition | C |
| `core:fan-out` | composition | C |
| `core:reduce` | composition | C |
| `core:input-map` | composition | C |
| `core:output-map` | composition | C |
| `core:evaluate` | composition | D |

**SDK** — added `'tool'` to node category union

**API**
- `GET/POST/DELETE /v1/mcp-servers` + `POST /v1/mcp-servers/:id/test` — MCP server CRUD
- `GET /v1/agents/:id/schema/input|output` — schema discovery
- `GET /v1/telemetry/trajectory/:runId` — trajectory proxy
- `GET /v1/telemetry/routing-events` — routing fallback event log
- Engine-internal: `/internal/telemetry/trajectory/:runId`, `/internal/telemetry/routing-events`, `/internal/mcp-servers/test`

**Frontend — Studio**
- Canvas: tool edges (dashed amber), tool node amber borders, agent tool badge (count)
- `ToolPanel.svelte` — new sidebar panel for tool inspection
- `ExpressionEditor.svelte` — raw JSONata editor (monospace, amber caret)
- `NodeConfigPanel.svelte` — expression editor toggle per string field
- `TestRunPanel.svelte` — collapsible trajectory display for ReAct/Planner steps
- `LintPanel.svelte` — tool node validation rules (error on missing tool edge / missing flow edge; warning on agent node without tools)
- `App.svelte` — ToolPanel in right sidebar

**Frontend — Admin**
- `/admin/mcp-servers` — MCP server management (list, register, test, delete)
- `/admin/invocation-auth/:agentId/policy` — JWT config form (JWKS URL, issuer, audience, required claims)
- `/admin/telemetry/evaluate-scores` — Evaluate Score History
- `/admin/telemetry/routing-events` — Routing Event Log

**Test coverage:** all existing 206 tests pass (135 nodes + 40 engine + 31 API)

---

## Phase 4 — Graph-as-Code & Session Management ❌ Not started

**Prerequisites:** Phase 2 stable agent CRUD ✅; Phase 3 execution context shape ✅

---

**What needs to be built:**
- Tool Executor — `runAgentLoop()`, sub-context forking for graph tool invocations, trajectory recording
- MCP Client subsystem — JSON-RPC 2.0 client; stdio + Streamable HTTP transports
- Model Router Phase 3 additions — `least-latency`, `cost-optimized` strategies; `latency_degraded`, `error_rate` proactive triggers; routing event log queryable in telemetry
- Phase 3 nodes: `core:tool-call`, `core:react`, `core:planner`, `core:reflection`, `core:context-summarize`, `core:token-budget`, `core:tool`, `core:mcp-client`, `core:sub-graph`, `core:handoff`, `core:fan-out`, `core:reduce`, `core:input-map`, `core:output-map`, `core:evaluate`
- API additions: MCP server CRUD, JWT invocation auth, input/output schema discovery, telemetry trajectory endpoint
- Frontend: tool canvas panel, Expression Editor, ReAct trajectory display, provider health dashboard
- Admin: MCP server management, JWT auth config, Evaluate score history, routing event log

---

## Phase 4 — Graph-as-Code & Session Management ❌ Not started

**Prerequisites:** Phase 2 stable agent CRUD; Phase 3 execution context shape must be stable.

**What needs to be built:**
- `packages/compiler` — `AgentGraph` base class, `@Agent` decorator, typed node classes, `compile()` function
- `packages/cli` — `magicaal build`, `magicaal validate`, `magicaal list`
- Engine Session Manager — session load/save/expire, per-key accumulation, overflow strategies, schema migration chain
- Session nodes: `core:session-read`, `core:session-write`, `core:session-clear`
- API boot-time sync (`bootTimeSync()`)
- API additions: session management, `session_id` on run dispatch, Prompt Version CRUD, Test Case CRUD/suite runner
- Frontend: code-defined agent read-only canvas, Session Context Inspector, Prompt Version panel, Test Case Library, AI Studio Assistant (Caal Phase 1 integration)
- Admin: Session Management panel, Sync Event Log, Sessions telemetry view
- SDK Phase 3: `SessionClient`, `WorkspaceContextBuilder`
- Caal Phase 1: basic explain/modify/suggest tooling, `_platform` pseudo-tenant, Studio Caal panel

---

## Phase 5 — Integrations & Marketplace ❌ Not started

**Prerequisites:** Phase 2 Integration Connections infrastructure (built); Phase 3 tool system (not yet built).

**What needs to be built:**
- `packages/integrations/core` — shared OAuth refresh, pagination, rate-limit handling
- First-wave integration packages: Slack, GitHub, Gmail+SendGrid, Stripe, Google Workspace, Jira, Twilio, Salesforce, HubSpot, Zendesk, QuickBooks, BambooHR, Shopify
- Engine: Integration Trigger Registration, package signature verifier, Redis hot-load, license/usage background processes
- API: marketplace account/catalog/install/license/template endpoints, OpenAPI spec generation
- Frontend: integration node connector selector, marketplace panel
- SDK Phase 4: `magicaal generate` CLI, typed descriptors, `WebhookVerifier`, `agent.validate()`

---

## Phase 6 — Workspace & Coding Environment ❌ Not started

**Prerequisites:** Phase 3 tool system; Phase 4 session system.

---

## Phase 7 — Scale, Ecosystem & Remaining Integrations ❌ Not started

**Prerequisites:** Phase 5, Phase 6.

---

## What to Build Next

Phase 2 is complete. Phase 3 is the next milestone.

**Phase 3 — Tool System & Advanced Agent Nodes** (5–6 weeks)

The Phase 2 node registry, execution worker, and Model Router are stable — the prerequisites for Phase 3 are met. Recommended sequencing within Phase 3:

1. **Tool Executor + `core:tool-call`** — the foundational agentic loop; everything else in Phase 3 builds on this
   - `runAgentLoop()` in the engine; `assembleTools()`; `invokeTool()` routing; sub-context forking for graph tool invocations
   - `core:tool` node (LLM-facing contract + input/output mapping)

2. **`core:react`** — ReAct agent with trajectory recording; depends on Tool Executor being stable

3. **MCP Client subsystem** — JSON-RPC 2.0 client; stdio + Streamable HTTP transports; `core:mcp-client` node
   - Can proceed in parallel with `core:react` once Tool Executor is done

4. **Advanced Model Router additions** — `least-latency` and `cost-optimized` proactive strategies; `latency_degraded` and `error_rate` triggers; routing event log queryable in telemetry

5. **Composition nodes** — `core:sub-graph`, `core:handoff`, `core:fan-out`, `core:reduce`, `core:input-map`, `core:output-map`

6. **Remaining AI/LLM nodes** — `core:planner`, `core:reflection`, `core:context-summarize`, `core:token-budget`

7. **Evaluation** — `core:evaluate` (rule-based, LLM-as-judge, expected output comparison); Evaluate scores in Telemetry Store

8. **API additions** — MCP server CRUD, JWT invocation auth strategy, `GET /agents/:id/schema/input|output`, `GET /v1/telemetry/trajectory/:runId`

9. **Frontend** — tool canvas panel region (floating tool nodes + dashed amber tool edges); Expression Editor (raw JSONata with syntax highlighting); ReAct trajectory inline display in test run panel; MCP Client node config; provider health dashboard

10. **Admin** — MCP server management panel; JWT invocation auth config; Evaluate score history; routing event log in telemetry

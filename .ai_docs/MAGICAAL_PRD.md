# MagiCaal — Product Requirements Document

**Version**: 0.5 (Draft)
**Status**: In Review

---

## 1. Product Overview

MagiCaal is a self-hosted platform for building, deploying, and operating production-ready AI agents. Its unifying design philosophy is **agent-as-a-graph**: every agent is modeled as a directed graph of typed nodes connected by conditional edges. This model handles single-agent pipelines, multi-agent compositions, and complex branching logic within a unified mental model.

Agents can be authored visually in the Studio canvas editor or defined as TypeScript code and compiled to the same graph format at build time. The platform ships with a rich built-in node set, a library of integration nodes for external services, and a Node & Integration Marketplace that allows new node packages — as well as agent graph templates, workflow bundles, and prompt packs — to be installed at runtime without redeployment.

---

## 2. Goals & Non-Goals

### Goals
- Provide an intuitive, visual interface for designing and testing agent graphs without requiring code.
- Provide a code-first authoring path for teams that prefer source-controlled, reviewable agent definitions.
- Deliver a production-grade execution engine capable of running hundreds of concurrent agent graphs reliably.
- Give operators full visibility into agent behavior through structured telemetry and run history.
- Allow agents to be invoked securely by external systems via a well-defined, authenticated API.
- Support logical multi-tenancy so isolated teams or workloads can share a single deployment.
- Be self-hostable with a minimal operational footprint, including support for air-gapped deployments.
- Provide a rich, modern node vocabulary informed by current agent framework best practices.
- Offer a curated set of built-in integration nodes for common external services, with a marketplace for runtime extension.

### Non-Goals
- MagiCaal is not a SaaS product and does not manage cloud infrastructure on behalf of users.
- MagiCaal does not provide a consumer-facing UI for end-users to interact with agents directly.
- MagiCaal does not build or train LLM models.
- MagiCaal does not manage LLM provider billing or usage quotas on behalf of tenants.

---

## 3. User Personas

### 3.1 Platform Admin
Operates and maintains the MagiCaal deployment. Manages tenants, users, system configuration, security settings, integration connections, and the node marketplace.
**Primary concerns**: Platform stability, security, access control, resource governance, integration health, and marketplace management.

### 3.2 Agent Developer
Designs, builds, tests, and publishes agent graphs via Studio or TypeScript code.
**Primary concerns**: Productive agent authoring, accurate testing, predictable deployment, and a clear understanding of runtime behavior.

### 3.3 Telemetry Viewer
Monitors deployed agents. May be an operator, QA engineer, data analyst, or product manager.
**Primary concerns**: Run status visibility, failure alerting, performance trends, and accessible diagnostic information.

### 3.4 Agent API Consumer
A developer or technical operator who invokes agents from an external system via the REST API.
**Primary concerns**: Reliable invocation API, clear auth setup, predictable request/response contracts, actionable errors.

---

## 4. Success Metrics

| Metric | Description |
|---|---|
| **Time to first agent deployed** | New Developer account → first published, invokable agent. Target: under 30 minutes. |
| **Agent execution success rate** | Runs completing without unhandled engine error. Target: ≥ 99.5%. |
| **P95 invocation latency** | Invocation receipt → run dispatched to worker. Target: under 500ms. |
| **Mean time to surface a failure** | Run enters FAILED state → visible in telemetry. Target: < 5 seconds. |
| **Concurrent run capacity** | Simultaneous graph executions without degraded scheduling. Target: 200+. |
| **Studio time to complete a graph** | Canvas open → first successful test run. Target: under 15 minutes for a simple graph. |
| **API consumer time to first invocation** | Key issuance → successful external call. Target: under 10 minutes with documentation. |
| **Platform uptime** | Backend API and engine availability. Target: ≥ 99.9%. |
| **Integration connection health** | Active Integration Connections without expired or broken status. Target: ≥ 99%. |
| **Marketplace install success rate** | Package installs completing without error. Target: ≥ 99%. |

---

## 5. Release Phases

The PRD uses a four-phase system. The development roadmap subdivides these into eight engineering phases (0–7); the mapping is: PRD Phase 1 ≈ Roadmap 0–1; PRD Phase 2 ≈ Roadmap 2; PRD Phase 3 ≈ Roadmap 3–5; PRD Phase 4 ≈ Roadmap 6–7.

### Phase 1 — Foundation
Core platform: Studio canvas with essential nodes, functional execution engine, basic admin controls, local authentication. A single tenant can build, test, and manually invoke a simple agent graph.

**Unlocks**: Developer can build and test an agent. Admin can manage users. API Consumer can invoke a published agent with an API key. SDK Phase 1 (`MagiCaalClient`, `invoke()`, `RunHandle`, typed error hierarchy) ships alongside the platform.

---

### Phase 2 — Production Platform
Expands the platform to production-readiness. Adds the full built-in node set (LLM, data, integration, code), guardrails, human review with confidence-based escalation, structured output validation, scheduled and webhook triggers, invocation auth policies and rate limiting, run history and telemetry dashboards, agent versioning, the Agentic Router, the full model router infrastructure (provider adapters, Router Engine, circuit breaker, priority and round-robin strategies, all reactive triggers), Integration Connections admin panel and OAuth flows, Named Router Policies, provider pricing table, and SDK Phases 1 and 2 (streaming and `HumanReviewClient`).

**Unlocks**: Agents trusted in production with safety controls and oversight. Telemetry Viewers have a meaningful dashboard. Invocation auth configurable per agent. Model Router provides resilient multi-provider routing from day one. Integration Connection infrastructure ready for Phase 3 integration packages.

---

### Phase 3 — Developer Power & Integration Ecosystem
Adds the graph-as-code authoring path, AI Studio Assistant, advanced agent nodes (ReAct, Tool Call, Planner, Reflection, Evaluate, Fan-Out/Reduce, MCP Client, Handoff), tool system (Tool nodes, tool edges, workspace panel), full JSONata expression editor, prompt version management, test case library, graph templates, trajectory telemetry, advanced model router strategies (least-latency, cost-optimized, proactive triggers), Session & Context Management, the full integration library (Slack, GitHub, Salesforce, HubSpot, Zendesk, and all Phase 3 integration packages), the Node & Integration Marketplace with MagiCaal Account linking, and SDK Phase 3 (`SessionClient`, `WorkspaceContextBuilder`, `magicaal generate`, `WebhookVerifier`).

**Unlocks**: Developers can define agents in TypeScript. Complex self-improving multi-agent graphs fully supported. Agents maintain conversational state across invocations via session context. Marketplace connected to the live catalog with paid assets, graph templates, workflow bundles, and prompt packs. Air-gapped license bundle support.

---

### Phase 4 — Ecosystem & Scale
Adds the Workspace & Coding Environment (Docker-based dev environments, workspace nodes, lifecycle hooks, permission system), public custom node SDK for external publishers, community marketplace support, external IdP (OAuth/OIDC), horizontal engine scaling hardening, A2A protocol, Episodic Memory, dry run mode, advanced telemetry aggregations, and SDK Phase 4 framework bindings (`@magicaal/react`, `@magicaal/next`, `@magicaal/express`).

**Unlocks**: Full coding agent capability — agents can clone, edit, run, and commit to real codebases. Teams build and publish custom node packages. Large deployments scale horizontally. Enterprise auth integrations available. SDK framework bindings for React and Next.js.

---

## 6. Framework Research & Feature Translation

| Pattern | Source Frameworks | MagiCaal Translation |
|---|---|---|
| Human-in-the-Loop | LangGraph, AutoGen, MAF | Human Review node |
| Guardrails | OpenAI Agents SDK, LangGraph | Guardrail node |
| Structured output with self-correction | PydanticAI, LangChain | LLM Call structured output mode; Structured Extract node |
| ReAct loop | LangGraph, Google ADK | ReAct node |
| Task decomposition / planning | Google ADK, LangGraph | Planner node |
| Reflection / self-critique | Self-Refine patterns, PydanticAI | Reflection node |
| LLM-as-judge evaluation | PydanticAI Evals, LangSmith | Evaluate node |
| MCP tool integration | Google ADK, LangGraph, PydanticAI | MCP Client node |
| Agent handoff / delegation | OpenAI Agents SDK, Google ADK | Handoff node |
| Fan-out / map-reduce | LangGraph, Google ADK Parallel | Fan-Out + Reduce nodes |
| Context window management | Google ADK, LangGraph | Context Summarize node; Token Budget node |
| Conversation memory hierarchy | LangGraph, PydanticAI | Enhanced Memory nodes; Episodic Memory (Phase 4) |
| Web search as first-class tool | Google ADK, OpenAI tools | Web Search node; Web Scrape node |
| Prompt versioning | Vellum, LangSmith prompt hub | Prompt Version management |
| Graph templates / starter patterns | Google ADK, CrewAI, LangGraph prebuilt | Graph Templates library |

---

## 7. Feature Requirements

### 7.1 Platform Admin

#### Core Administration

| Feature | Description | Phase | Priority |
|---|---|---|---|
| **Local user management** | Create, edit, deactivate users. Assign platform and tenant roles. Reset passwords. | 1 | Critical |
| **Tenant creation & configuration** | Create tenants with name, slug, initial admin. Configure resource limits. | 1 | Critical |
| **Platform API key management** | Issue, label, scope, and revoke platform-level API keys. | 1 | Critical |
| **Agent enable/disable** | Enable and disable published agents. Disabled agents reject all invocations. | 1 | Critical |
| **System health dashboard** | Engine health, worker pool status, queue depth, database status. | 1 | Important |
| **Role-based access control** | Enforce per-tenant roles: Platform Admin, Tenant Admin, Developer, Viewer. | 1 | Critical |
| **Basic audit log** | Record significant admin actions with timestamp, actor, and detail. | 1 | Important |
| **Invocation auth configuration** | Configure invocation auth strategy (`api-key`, `jwt`, `public`) per agent and as tenant default. | 2 | Critical |
| **Per-agent invocation key management** | Generate, label, revoke per-agent invocation keys scoped exclusively to invoking a specific agent. | 2 | Critical |
| **Rate limit configuration** | Set tenant-level default and per-agent rate limit overrides. | 2 | Critical |
| **JWT invocation auth setup** | Configure trusted issuer, JWKS endpoint, audience, and required claims. | 2 | Important |
| **Invocation audit log** | Queryable log of external invocation attempts: timestamp, caller, strategy, outcome. | 2 | Important |
| **Guardrail policy admin** | View agents with Guardrail nodes. Emergency override or disable per agent. | 2 | Notable |
| **Human Review queue** | View all runs suspended at a Human Review node. Action them from the Admin panel. | 2 | Important |

#### Integration Connections

| Feature | Description | Phase | Priority |
|---|---|---|---|
| **Integration Connections management** | Central panel for managing OAuth and API key connections. View connection type, display name, status, last-used timestamp. Includes current health state from the Health Tracker: circuit state, P50 latency, error rate, rate limit status. Force-reset open circuits. | 2 | Critical |
| **OAuth connection flow** | Browser-based OAuth 2.0 authorization flow. Tokens stored encrypted on successful callback. | 2 | Critical |
| **API key connection entry** | Enter and store API keys for key-based integrations. Stored encrypted; displayed redacted. | 2 | Critical |
| **Connection reconnect** | One-click reconnect for expired OAuth tokens. | 2 | Important |
| **Connection revocation** | Revoke a connection entirely. Agents referencing the revoked connection are flagged. | 2 | Important |
| **Platform-wide connections** | Platform Admin can mark a connection as platform-wide, available to all tenants. | 2 | Notable |
| **Integration connection health summary** | Dashboard widget showing count of expired or broken connections. | 2 | Important |

#### Node & Integration Marketplace

| Feature | Description | Phase | Priority |
|---|---|---|---|
| **Installed packages view** | List all installed packages with version, publisher, enabled status, license type, expiry, version pin settings. | 3 | Critical |
| **MagiCaal Account linking** | Enter and validate an Account API Key to link to the MagiCaal Marketplace. Unlink at any time. | 3 | Critical |
| **Browse official catalog** | Live catalog from Marketplace API. Browse by asset type. Filter by category, price, rating. | 3 | Critical |
| **Browse community catalog** | Third-party community packages. Requires per-tenant opt-in. | 3 | Important |
| **Install node / integration package** | Download, verify signature and content hash, register node types via engine hot-load. | 3 | Critical |
| **Agent graph template install** | Install triggers the Template Import Wizard: dependency check, parameterization form, canvas preview, new DRAFT agent. | 3 | Critical |
| **Workflow bundle install** | Installs constituent packages then triggers the Template Import Wizard. | 3 | Important |
| **Prompt pack import** | Imports all Prompt Version records under a named pack namespace. | 3 | Important |
| **Paid asset purchase flow** | Initiate purchase from within Admin; platform links out to Marketplace website for payment. License syncs on next heartbeat. | 3 | Critical |
| **License management** | View all asset licenses: type, scope, expiry, last validated, grace period status. | 3 | Important |
| **Update package** | Update to newer version. Running executions on old version are uninterrupted. | 3 | Important |
| **Remove package** | Remove an installed package. Deregisters node types; agents referencing them are flagged. | 3 | Important |
| **Enable / disable package per tenant** | Enable or disable an installed package per tenant without removing it platform-wide. | 3 | Important |
| **Air-gapped license bundle upload** | Upload a signed license bundle for offline deployments. | 3 | Important |
| **Community package policy** | Per-tenant opt-in for community packages. Platform-wide allowlist. | 3 | Important |
| **Offline catalog mode** | Serve the marketplace from a locally mounted `catalog.json` when no account is linked. | 3 | Important |
| **Package security review** | View declared capabilities before installing: network domains, node types, SDK version, publisher identity. | 3 | Important |
| **Marketplace activity log** | Log of all marketplace actions with actor identity and timestamp. | 3 | Notable |

#### Extended Administration

| Feature | Description | Phase | Priority |
|---|---|---|---|
| **Named Router Policies panel** | Create, edit, delete named router policies. Each policy declares the full `ModelRouterConfig` and an `overridable` flag. View which agents and nodes reference each policy. Non-overridable policies act as a compliance-floor routing posture. | 2 | Important |
| **Provider health in Integration Connections** | Each LLM provider connection displays circuit state, rolling P50 latency, recent error rate, rate limit status, and estimated spend. Force-reset open circuits. | 2 | Important |
| **Provider pricing table management** | Configure token pricing per provider and model. Ships with defaults. Update without a deploy. | 2 | Important |
| **MCP server management** | Register and manage MCP servers. Test connectivity. View agent references. Configure SSRF allowlist. | 3 | Important |
| **Prompt version management** | Tenant-wide view of all named Prompt Versions. Create, compare, promote without graph republish. | 3 | Important |
| **Stale agent management** | Surface code-defined agents missing from `/agents` directory. Provide deprecate or delete actions. | 3 | Important |
| **Sync event log** | Boot-time sync log: timestamp, agents processed, changes, errors. | 3 | Important |
| **Data source management** | Configure relational databases, vector stores, and object storage connections. | 3 | Important |
| **Active Workspaces panel** | Lists live workspace containers: status, resource usage (CPU, memory, disk), session and agent association. Actions: force-stop, view container logs, navigate to session. | 4 | Important |
| **Tenant workspace resource limits** | Configure per-tenant limits: max active workspaces, max CPU/memory/disk per workspace, allowed Docker image list. | 4 | Important |
| **Container image management** | Pre-pull standard MagiCaal images, configure allowed image list, view image cache status. | 4 | Notable |
| **Tenant-level workspace permission policy** | Compliance-floor permission policy per tenant. Cannot be overridden by workspace or agent-node policies. Surfaced read-only in the Studio workspace config editor. | 4 | Important |
| **External IdP configuration** | Configure OAuth 2.0 / OIDC identity providers for platform login. | 4 | Important |
| **Advanced tenant isolation controls** | Per-tenant node type whitelists. | 4 | Notable |
| **Multi-tenant overview dashboard** | Aggregate resource utilization, run volume, error rates across all tenants. | 4 | Notable |
| **Horizontal scaling configuration** | Configure and monitor multiple engine instances. View per-instance health. | 4 | Important |

---

### 7.2 Agent Developer

#### Core Studio & Authoring

| Feature | Description | Phase | Priority |
|---|---|---|---|
| **Studio canvas editor** | Pan/zoom canvas. Drag nodes from palette, connect via ports, multi-select, minimap. | 1 | Critical |
| **Core control flow nodes** | Start, End, Condition, Router, Stop nodes. | 1 | Critical |
| **Core integration node (HTTP Request)** | Available in Phase 1 to enable basic outbound calls. | 1 | Critical |
| **Node configuration panel** | Context-sensitive panel. Fields generated from node's input schema. Static value entry. | 1 | Critical |
| **Agent configuration panel** | Name, description, trigger type, deployment metadata. | 1 | Critical |
| **Basic test run** | Execute current graph with test input payload. View per-node status and output. | 1 | Critical |
| **Agent publish / draft state** | Save as draft; explicitly publish to make invokable. | 1 | Critical |
| **REST API trigger** | Invoke via HTTP POST. Sync or async response mode. | 1 | Critical |
| **Full data node set** | Transform, Filter, Aggregate, Validate, Parse with JSONata expression support. | 2 | Critical |
| **Full integration node set (core)** | Webhook Receive, Database Query, File Read, File Write, Web Search, Web Scrape. | 2 | Important |
| **Full observability node set** | Log, Metric, Annotation nodes. | 2 | Important |
| **Scheduled trigger** | Run on a cron schedule. | 2 | Critical |
| **Webhook trigger** | Run when a request arrives at the agent's inbound webhook URL. | 2 | Important |
| **Integration trigger** | Run when an event arrives from a connected external service. | 2 | Important |
| **Agent versioning** | Each publish creates an immutable version snapshot. View version history. | 2 | Important |
| **Version diff view** | Compare graph JSON between any two versions. | 2 | Notable |
| **Canvas value picker** | Reference upstream node outputs via a structured dropdown. Generates JSONata automatically. | 2 | Critical |
| **Detailed test run panel** | Per-node status, input/output inspection, timing, full execution log. SSE-driven live updates. | 2 | Important |
| **Fork, Join, Loop, Wait nodes** | Parallel branches, synchronization, collection iteration, timed delays. | 2 | Important |
| **Graph lint / static validation** | Pre-publish static analysis: unreachable nodes, missing connections, cycles without Loop nodes, unresolved node types. | 3 | Important |
| **Sub-graph, Input Map, Output Map nodes** | Invoke child agents; map context in/out. | 3 | Important |
| **JSONata expression editor** | Raw JSONata with syntax highlighting, autocomplete, inline evaluation preview. Togglable per field. | 3 | Important |
| **Graph-as-code: compiler library** | `AgentGraph` base class, typed node classes, `@Agent` decorator, `compile()` function. | 3 | Critical |
| **Graph-as-code: CLI** | `magicaal build`, `magicaal validate`, `magicaal list`. Convention-based file discovery. | 3 | Critical |
| **Graph-as-code: boot-time sync** | Automatic sync of compiled agent JSON to the database on API startup. | 3 | Critical |
| **Code-defined agents in Studio** | Read-only canvas view. Admin-overridable fields editable. Code-source banner. | 3 | Important |
| **Override flag declarations** | Per-agent or per-field override flags in `@Agent` decorator. | 3 | Important |
| **AI Studio Assistant** | Graph-aware AI panel. Suggests/applies modifications, explains behavior, debugs runs, generates TypeScript equivalents, recommends integration nodes. | 3 | Important |
| **Looping / persistent agents** | Configure a graph to loop indefinitely as a continuously running agent. | 3 | Notable |
| **Node grouping / visual collapse** | Group nodes into a named collapsible region. No effect on execution. | 3 | Notable |
| **Node grouping / visual collapse** | Group nodes into a named collapsible region on the canvas. No effect on execution. Persisted as layout metadata in the graph definition. | 3 | Notable |

#### Caal — Platform Agenteer

Caal is MagiCaal's built-in platform agenteer — a first-class agent graph owned by the platform, pre-deployed, and versioned alongside the platform itself. It is not editable by users. Caal dogfoods the platform: it is itself a MagiCaal agent using the Agentic Router, ReAct, Tool Call, LLM Call, and Transform nodes to serve developers building graphs in the Studio.

| Feature | Description | Phase | Priority |
|---|---|---|---|
| **Caal panel in Studio** | A collapsible side panel (≈30% of canvas width when open) providing the full Caal experience. Persistent across Studio sessions. Houses the conversation thread, context bar, quick actions, and proposal review UI. | 3 | Critical |
| **Caal conversation thread** | Full conversation history between the developer and Caal with clear message attribution. Caal responses include **node reference chips** — clickable amber chips that pan the canvas to and briefly highlight the referenced node. Persists across browser sessions via the platform's session management (scoped to `{userId}:{agentId}`). | 3 | Critical |
| **Caal context bar** | A status bar in the panel showing what Caal currently knows: current graph node count, currently selected node name (updates live as the developer selects nodes on the canvas), and last run status. Gives developers confidence in the context Caal is using before asking a question. | 3 | Important |
| **Caal quick actions** | Pre-formed request shortcuts below the text input: "Explain graph", "Debug last run", "Add error handling", "Suggest router policy", "Generate tests". Each fires a typed intent request to Caal, bypassing the Agentic Router's classification step. | 3 | Important |
| **Caal intent routing** | Caal classifies each developer request into one of five paths: `generate` (build a new graph from scratch), `modify` (change an existing graph), `explain` (describe the graph or a node), `debug` (analyze a failed run), `suggest` (quick targeted recommendation). Different paths use different execution models: `generate`/`modify` use ReAct for multi-step reasoning; `explain`/`question` use a direct LLM Call; `debug`/`suggest` use Tool Call for lighter-weight operations. | 3 | Critical |
| **Full graph generation from natural language** | From a description like "create a customer support agent that responds to tickets via email or Slack", Caal reads the tenant's available integration connections, selects appropriate node types, configures integration nodes against active connections (or leaves labeled placeholders for unconfigured ones), applies the tenant's default router policy to LLM nodes, and proposes a complete, ready-to-run graph. | 3 | Critical |
| **Targeted graph modification** | From a request like "add a guardrail before the LLM node" or "change the Slack channel to #support", Caal reads the current graph, identifies the correct insertion point or target node, and proposes the minimal set of changes required. Uses the context bar's selected node information for context-sensitive operations. | 3 | Critical |
| **Targeted proposal review (1–3 changes)** | Inline diff list in the Caal panel showing operation type, target node name, and before/after config diff for each change. Accept/reject toggles per change and an "Accept All / Reject All" button. Accepted changes applied immediately to the canvas. | 3 | Critical |
| **Structural proposal review (4–10 changes)** | Canvas overlay review: new nodes appear semi-transparent with an amber border; modified nodes amber-highlighted; deletions shown with a strike-through overlay. A confirmation bar at the top of the canvas: "[N] changes proposed — [Apply All] [Review Each] [Dismiss]". "Review Each" steps through changes one at a time. | 3 | Critical |
| **Full graph replacement — Preview Canvas** | For complete graph proposals, a full-screen canvas overlay renders the proposed graph as read-only. Header bar: "[Accept & Replace] [Accept as New Agent] [Dismiss]". "Accept as New Agent" creates a new DRAFT from the proposal without modifying the current agent — preserves existing work for comparison. | 3 | Critical |
| **Caal undo integration** | All Caal-applied changes (regardless of complexity) are pushed to the Studio's undo/redo stack as a single labelled entry: "Caal: [proposal description]". A Caal undo reverses all patches in that proposal atomically. When a developer undoes a Caal change, the panel appends an acknowledgment message. | 3 | Important |
| **Configurable confirmation mode** | Developer-level preference (overrides tenant default): `"always_confirm"` — all proposals require confirmation; `"confirm_structural"` — targeted changes apply immediately, structural and replacements confirm; `"apply_directly"` — all changes apply with undo support only. Tenant Admin sets the default; individual developers override for their own sessions. | 3 | Important |
| **Configurable generation completeness** | Developer-level preference (overrides tenant default): `"complete"` (default) — Caal auto-configures from available connections; `"skeleton"` — Caal generates structure with all config as labeled placeholders regardless of available connections. | 3 | Important |
| **Code-defined agent mode (explain, debug, TypeScript suggestions)** | When a code-defined agent is open, Caal operates in read-only-aware mode. It can explain the graph, debug runs, and answer questions. For suggested modifications, Caal generates a **TypeScript diff** in unified diff format against the `*.agent.ts` source file with a description of what the change does. A notice informs the developer that diffs must be applied manually to the source file and recompiled. Caal cannot stage, write, or commit code-defined agent source files. | 3 | Critical |
| **"Show Reasoning" mode** | An opt-in toggle in Caal preferences (configurable by Tenant Admin whether to make it available). When enabled, Caal's ReAct trajectory is shown as a collapsible section before its response — the Thought/Action/Observation steps that produced the proposal. Off by default. | 3 | Notable |
| **Caal History panel** | Accessible from the Caal panel header. Displays the full conversation and proposal history for the current agent's Caal session: all prior messages, proposals (with accepted/rejected status), and TypeScript suggestions. Developers can scroll back to any prior proposal and re-examine its patches or diff. History persists via the platform's session management. | 3 | Important |
| **Caal system prompt customization** | Tenant Admins can append tenant-specific instructions to Caal's system prompt via Admin → Caal Configuration: preferred integration connections, code style conventions for Code nodes, language preferences, organizational naming conventions, or prohibited patterns. | 3 | Important |
| **Marketplace node discovery in Studio** | Node palette shows "Browse Marketplace" per category. Newly installed packages appear without page reload. | 3 | Important |
| **Custom node SDK** | Public SDK with Node interface, lifecycle contract, context API, and testing utilities. | 4 | Important |
| **Custom node registration** | Register external node packages. Custom nodes appear in the palette. | 4 | Important |
| **Version rollback** | Roll back a Studio-built agent to a prior snapshot. | 4 | Notable |

#### Model Router

| Feature | Description | Phase | Priority |
|---|---|---|---|
| **Model router config on LLM nodes** | LLM Call, Tool Call, ReAct, Planner, Reflection, Structured Extract, and Context Summarize nodes accept a `router` field: inline `ModelRouterConfig` or named policy reference. Node-level overrides graph default; graph default overrides tenant-level named policy. | 2 | Critical |
| **Graph-level default router** | An agent graph can declare a `defaultRouter` in its `AgentConfig` and a `routerPolicies` map. All LLM nodes inherit the default unless they declare their own. | 2 | Critical |
| **Proactive routing: Priority strategy** | `strategy: "priority"` — always routes to `targets[0]`; others used only on trigger. Default strategy. | 2 | Critical |
| **Proactive routing: Round-robin** | `strategy: "round-robin"` — distributes requests evenly across targets. Primary use: multiple API keys to multiply rate limits. | 2 | Critical |
| **Proactive routing: Weighted** | `strategy: "weighted"` — probabilistic selection by configured `weight` values. | 2 | Important |
| **Proactive routing: Least-latency** | `strategy: "least-latency"` — routes to target with lowest current rolling P50 latency. | 3 | Important |
| **Proactive routing: Cost-optimized** | `strategy: "cost-optimized"` — routes to target with lowest estimated cost per token. | 3 | Important |
| **Reactive trigger: Rate limit** | `{ type: "rate_limit" }` — detects 429 and routes to the next target. | 2 | Critical |
| **Reactive trigger: Provider error** | `{ type: "provider_error" }` — detects 5xx responses and routes to the next target. | 2 | Critical |
| **Reactive trigger: Timeout** | `{ type: "timeout", thresholdMs }` — detects responses exceeding the threshold. | 2 | Important |
| **Reactive trigger: Context overflow** | `{ type: "context_overflow" }` — pre-flight token count check; skips to next target. | 2 | Important |
| **Reactive trigger: Content policy** | `{ type: "content_policy" }` — detects provider content policy refusals; routes to next target. | 2 | Important |
| **Proactive trigger: Latency degraded** | `{ type: "latency_degraded", p50ThresholdMs }` — reroutes before hard failures occur. | 3 | Important |
| **Proactive trigger: Error rate** | `{ type: "error_rate", threshold, windowMs }` — proactively reroutes when error rate exceeds threshold. | 3 | Important |
| **Trigger actions** | Three actions: `next_in_chain`, `least_latency`, `cheapest`. | 2 | Important |
| **Circuit breaker** | Per-target circuit breaker with configurable thresholds. Auto-applied default config on multi-target routers. State machine: CLOSED → OPEN → HALF-OPEN → CLOSED. | 2 | Critical |
| **Stream failure behavior** | `streamFailureBehavior: "restart_with_next" | "fail"`. Default: restart. | 2 | Important |
| **Named router policies (graph-level)** | Named `ModelRouterConfig` entries in `AgentGraphDefinition.routerPolicies`. Referenced by name from node `router` fields. | 2 | Important |
| **Named router policies (tenant-level)** | Platform Admins create `NamedRouterPolicy` records in Admin → Named Router Policies. `overridable: false` locks the policy as a compliance floor. | 2 | Important |
| **Provider pricing table** | Admin-configurable token pricing per provider and model. Drives cost-optimized routing and `estimatedCostUsd` telemetry. Update without a deploy. | 2 | Important |
| **Routing trace in telemetry** | Every LLM node step record includes `routingMeta`: provider/model/key used, attempt count, full trigger history. | 2 | Critical |
| **Provider health dashboard** | Per-target health state: circuit state, P50 latency, error rate, rate limit status, estimated spend. Admins can force-reset open circuits. | 2 | Important |
| **Routing event log** | Queryable log of all routing fallback events: agent, node, trigger, source target, destination target, timestamp, link to run. | 2 | Important |
| **Code-defined agent router config** | `@Agent` decorator accepts `defaultRouter`. All LLM node typed classes expose a `router` field. | 3 | Critical |
| **GET /v1/llm/health endpoint** | Public read endpoint returning current health state per provider/connection. Available to Admin panel, SDK, and external dashboards. | 2 | Important |

#### AI & LLM Nodes

| Feature | Description | Phase | Priority |
|---|---|---|---|
| **LLM Call node** | Calls a configured LLM provider. Not a tool-using node — for direct, single LLM calls without an agent loop. Accepts a `router` field; builds a `CanonicalLLMRequest`; Router Engine handles provider selection and fallback. Token usage and `routingMeta` recorded per call. | 2 | Critical |
| **LLM Call — structured output mode** | Declare a JSON Schema for the expected response. Auto-retry with correction prompt on non-conformant output. Configurable retry limit. | 2 | Critical |
| **Prompt Builder node** | Construct a prompt from a template with context variable interpolation. References named Prompt Versions. | 2 | Critical |
| **Structured Extract node** | LLM-based extraction of a structured JSON document from arbitrary text. Built-in retry-on-failure. | 2 | Important |
| **Embedding node** | Generate a vector embedding via a configured provider. | 2 | Important |
| **Vector Search node** | Query a configured vector store with an embedding or text query. | 2 | Important |
| **Memory Read / Write nodes** | Key-value persistent memory scoped to agent and tenant, cross-run. | 2 | Important |
| **Tool Call node** | LLM-driven tool invocation using the model's native function calling API — structured JSON tool calls with no explicit chain-of-thought. Receives tools via tool edges. Configurable `maxIterations`: parallel tool calls per iteration or a final answer. No trajectory recorded. Accepts a `router` field; builds a `CanonicalLLMRequest` per iteration. | 3 | Critical |
| **ReAct node** | Prompt-engineered Reason-Act loop using explicit Thought / Action / Observation cycles. Receives tools via tool edges. Serial tool execution per iteration. Full trajectory recorded. Accepts a `router` field; builds a `CanonicalLLMRequest` per iteration. | 3 | Critical |
| **Planner node** | LLM decomposes a goal into a structured plan consumed by downstream nodes. Trajectory recorded. | 3 | Important |
| **Reflection node** | Routes a context value through a configurable LLM critique prompt iteratively. Configurable acceptance condition. | 3 | Important |
| **Context Summarize node** | Summarizes a named message/record array with an LLM call to manage token volume. | 3 | Important |
| **Token Budget node** | Estimates token count for a context value; routes to trim branch if over budget. | 3 | Notable |
| **MCP Client node** | Connects to a registered MCP server (stdio or Streamable HTTP). Two modes: **direct** — executes a single named tool call in graph flow; **funnel** — connects via tool edge, calls `tools/list`, exposes all MCP tools as flat individual entries in the agent's unified tool list. | 3 | Critical |
| **Prompt Version management** | Extract prompts into named, versioned strings. Reference by name in LLM nodes. Promote without republishing the graph. | 3 | Important |
| **Episodic Memory node** | Write timestamped experience records; read back relevant records via embedding similarity search. Cross-run semantic memory. | 4 | Notable |

#### Tool Nodes

| Feature | Description | Phase | Priority |
|---|---|---|---|
| **Tool node** | The interface between an LLM agent node and any action node used as a tool. Declares the LLM-facing contract (`name`, `description`, `inputSchema`) alongside `inputMapping` and `outputMapping`. Any existing node type can be wrapped. Tool invocations run in an isolated sub-context — cannot mutate parent graph state. | 3 | Critical |
| **Tool edge** | Visually distinct edge type (dashed, amber) connecting Tool nodes and MCP Client nodes to agent nodes (Tool Call, ReAct). Declares tool availability rather than data flow. Stored separately from flow edges. Graph Linter validates every Tool node has exactly one outbound flow edge and one inbound tool edge. | 3 | Critical |

#### Session Management

| Feature | Description | Phase | Priority |
|---|---|---|---|
| **Session configuration** | Declare session support per agent: enable/disable, TTL, and the context schema — a map of named keys with accumulation type (append/replace/merge), overflow strategy, max items, token budget, deduplication field, and optional key-level TTL. Configurable in the Agent Configuration Panel and via `@Agent` decorator. | 3 | Critical |
| **Context schema — append type** | An append key accumulates new values into an array. Supports `maxItems` with three overflow strategies: `evict_oldest`, `summarize` (LLM compression of oldest N entries), and `truncate`. Optional `deduplicateBy` field. | 3 | Critical |
| **Context schema — replace type** | A replace key is overwritten with the latest value each run. For active state: current file, active task, last user preference update. | 3 | Critical |
| **Context schema — merge type** | A merge key deep-merges the new value into the existing stored object each run. | 3 | Important |
| **LLM node session history injection** | LLM Call, Tool Call, and ReAct nodes support an `injectSessionHistory` config field. When set, the stored history is automatically prepended as prior conversation turns — no explicit Session Read node required. | 3 | Critical |
| **Session Configuration Panel (Studio)** | Dedicated section in the Studio's Agent Configuration Panel: enable/disable toggle, TTL input, context schema editor (visual table per key). | 3 | Important |
| **Session Context Inspector (Studio)** | During test runs with an active `session_id`, an inspector panel shows the live session context: key values, entry counts, estimated token counts. | 3 | Important |
| **Session Read node** | Explicitly load one or more session keys into the execution context at any graph position. | 3 | Important |
| **Session Write node** | Explicitly write a context value to a session key at any graph position, bypassing end-of-run accumulation. | 3 | Important |
| **Session Clear node** | Reset one or more session keys or the entire session context without deleting the session ID. | 3 | Notable |
| **Context schema versioning** | `schemaVersion` integer on context schemas. Non-breaking changes apply immediately. Breaking changes require a `migrations` entry with JSONata transform expressions. Sessions without a migration path are marked `stale_schema`. | 3 | Important |
| **Session migration CLI** | `magicaal sessions migrate --agent {handle}` batch-applies pending schema migrations. | 3 | Notable |
| **Session Management (Admin)** | Admin panel listing all sessions: namespaced ID, run count, creation date, last activity, status, accumulated context size, schema version. Actions: view context snapshot, reset context, delete session, migrate or reset stale-schema sessions. | 3 | Important |
| **Caller-supplied session IDs** | API consumers provide their own `session_id` in the invocation request, namespaced internally by the platform. | 3 | Critical |
| **Platform-generated session IDs** | If no `session_id` is provided and sessions are enabled, the platform generates and returns a namespaced session ID in the run response. | 3 | Critical |
| **Session management API endpoints** | `GET /sessions` (list), `GET /sessions/:sid` (snapshot), `GET /sessions/:sid/runs` (run history), `DELETE /sessions/:sid`, `POST /sessions/:sid/reset`. | 3 | Important |

#### Guardrails, Safety & Control

| Feature | Description | Phase | Priority |
|---|---|---|---|
| **Guardrail node** | Validates a context value against configurable rules (content policy, PII patterns, JSON Schema, JSONata expressions). Routes to pass or fail branch. Strategies: block-and-fail, reroute-to-fallback, redact-and-continue. Not bypassable by graph misconfiguration. | 2 | Critical |
| **Human Review node** | Pauses run (SUSPENDED), emits a review request via a configured notification channel, waits for human response. Reviewer can approve, reject, or supply a modified context value. Resumable via Admin UI, Human Review Queue, or `/v1/runs/:id/review` endpoint. Suspend state persisted before the review request is emitted. | 2 | Critical |
| **Confidence-based HITL escalation** | LLM Call and ReAct nodes configurable with a confidence threshold. When the LLM's self-reported confidence falls below the threshold, execution auto-routes to a Human Review node. | 3 | Important |

#### Composition Nodes

| Feature | Description | Phase | Priority |
|---|---|---|---|
| **Sub-graph node** | Invoke another agent as a child run. Awaitable or fire-and-forget. | 3 | Important |
| **Handoff node** | Invoke a target agent with an explicit handoff message. Models agent delegation; visible as a named delegation event in the run trace. | 3 | Important |
| **Fan-Out node** | Spawn a parallel branch per item in a named array. | 3 | Important |
| **Reduce node** | Collect Fan-Out outputs; merge via configurable strategy. | 3 | Important |
| **Evaluate node** | Assess a context value via rule-based scoring, LLM-as-judge, or expected output comparison. Emits score to a named context key and to the Telemetry Store. | 3 | Important |
| **Code node** | Sandboxed JavaScript. Scoped context access. Configurable timeout and memory limits. | 2 | Important |
| **Agentic Router node** | LLM-powered classification router. Developer declares N cases, each with a key and plain-language description. The LLM returns a structured output — selected route, confidence score, optional reasoning — and the node routes accordingly. Outbound edge conditions auto-generated by Studio. Supports confidence-threshold-based Human Review escalation. | 2 | Important |

#### Integration Nodes

Integration nodes are provided by built-in integration packages (pre-installed) and marketplace packages (installed at runtime). Each service is listed with its phase, key operation types, trigger capability, and priority.

| Integration | Key Operations | Has Trigger | Phase | Priority |
|---|---|---|---|---|
| **Slack** | Post Message, Post to Thread, Send DM, Upload File, Get/Search Messages, Create Channel, Invite User, Add Reaction | Yes | 3 | Critical |
| **Gmail** | Send Email, Reply to Thread, Search/Get Emails, Create Draft, Add Label, Move to Trash | Yes | 3 | Critical |
| **GitHub** | Create/Get/Update/Close Issue, Add Comment, Create/Get/Merge PR, Request Review, Create Branch, Get/Create File, Trigger/Get Workflow Run, Search Code | Yes | 3 | Critical |
| **Stripe** | Create/Get/Update Customer, Create/Confirm Payment Intent, Create/Cancel/Update Subscription, Create/Finalize Invoice, Issue Refund, Get Balance, Search Payments | Yes | 3 | Critical |
| **Google Sheets** | Read Range, Append Row, Update Range, Clear Range, Get Metadata, Create Spreadsheet, Find Row | No | 3 | Critical |
| **Google Drive** | Upload/Download File, List Files, Create Folder, Share File, Get Metadata, Move/Delete File | No | 3 | Important |
| **Jira** | Create/Get/Update Issue, Transition Issue, Add Comment, Assign Issue, Search Issues (JQL), Get Sprint, Link Issues | Yes | 3 | Critical |
| **Twilio** | Send SMS, Send WhatsApp, Make Voice Call, Send/Check Verification | No | 3 | Important |
| **SendGrid / SMTP** | Send Email, Send Bulk Email, Get Send Stats; SMTP Send Email | No | 3 | Important |
| **Salesforce** | Get/Create/Update/Delete Record, SOQL Query, Create Contact/Lead/Opportunity/Task, Convert Lead, Log Call | Yes | 3 | Critical |
| **HubSpot** | Create/Get/Update Contact, Create/Update Deal, Create Note/Task, Enroll in Workflow, Search CRM | Yes | 3 | Critical |
| **Google Workspace (Docs, Calendar)** | Create/Get/Update/Export Docs; Create/Get/List/Update/Delete Calendar Events, Check Availability | Yes | 3 | Important |
| **Microsoft 365 (Outlook, Excel, SharePoint, Teams)** | Send/Get/Search Outlook Email; Read/Append/Update Excel Range; Upload/Get/List SharePoint Files; Post Teams Message | Yes | 3 | Important |
| **Zendesk** | Create/Get/Update/Close Ticket, Add Comment, Assign Ticket, Search Tickets, Create User | Yes | 3 | Critical |
| **Intercom** | Create/Get/Update Contact, Create/Reply to Conversation, Close Conversation, Tag Contact, Send In-App Message | No | 3 | Important |
| **QuickBooks Online** | Create/Get/Send/Void Invoice, Create/Get Customer, Create Payment/Bill, Run P&L and Balance Sheet queries | No | 3 | Important |
| **Xero** | Create/Get/Update/Email Invoice, Create Contact, Create Bill, Get Account Balances | No | 3 | Important |
| **BambooHR** | Get/List/Update Employee, Get Time Off Balance, Submit/Approve/Deny Time Off, Get Org Chart | Yes | 3 | Important |
| **Shopify** | Get/List/Update/Cancel/Fulfill Order, Create Refund, Get/Create/Update Product, Update Inventory, Create Discount | Yes | 3 | Important |
| **Notion** | Create/Get/Update Page, Append Block, Query Database, Create Database Entry, Search | No | 3 | Important |
| **Asana** | Create/Get/Update/Complete Task, Add Comment, Create Project, List Tasks | Yes | 3 | Important |
| **PagerDuty** | Create/Get/Resolve/Acknowledge Incident, Add Note, List Incidents | Yes | 3 | Important |
| **Datadog** | Send Event, Query Metrics, Create/Mute Monitor, Post Log | Yes | 3 | Important |
| **AWS S3** | Upload/Download File, List Objects, Delete Object, Generate Presigned URL, Copy Object | No | 3 | Important |
| **AWS SES / SNS / SQS** | Send Email, Send Templated Email; Publish Message; Send/Receive/Delete Message | No | 3 | Important |
| **DocuSign** | Send Envelope, Get Envelope Status, Get Signed Document, Void Envelope | Yes | 3 | Important |
| **Workday** | Get/List Workers, Get Job Requisition, Create Position, Initiate Business Process | No | 4 | Important |
| **Rippling / Gusto** | Get/List Employees, Get Payroll, List Pay Periods | No | 4 | Notable |
| **GitLab** | Create/Get/Update Issue, Create MR, Trigger Pipeline, Get Pipeline Status | Yes | 4 | Important |
| **Linear** | Create/Get/Update Issue, Comment, Move to Cycle, Get Project | Yes | 4 | Notable |
| **Klaviyo / Mailchimp** | Create/Update Profile, Track Event, Add/Remove from List, Send Campaign, Get Stats | No | 4 | Notable |
| **Pipedrive** | Get/Create/Update Person, Deal, Activity; Pipeline Stage transition | Yes | 4 | Notable |
| **Freshdesk** | Create/Get/Update/Close Ticket, Add Note, Assign Ticket | Yes | 4 | Notable |
| **Sentry** | Get/Resolve/Assign Issue, Create Note, Search Issues | Yes | 4 | Notable |
| **Square** | Create Payment, Issue Refund, Create Customer, Create Order, Create Catalog Item | Yes | 4 | Notable |
| **Calendly** | Get Scheduled Events, Get Event Details, Cancel Event, Get Availability | Yes | 4 | Notable |
| **HelloSign (Dropbox Sign)** | Create/Send Signature Request, Get Status, Download Document, Cancel Request | Yes | 4 | Notable |
| **Monday.com** | Create/Update/Get Item, Move Item, Change Column Value, Create Update | No | 4 | Notable |

#### DX & Tooling

| Feature | Description | Phase | Priority |
|---|---|---|---|
| **Template Import Wizard** | When installing an agent graph template or workflow bundle, a guided wizard: (1) checks for missing node package dependencies; (2) presents a parameterization form for declared template variables; (3) shows a read-only canvas preview; (4) creates a new DRAFT agent. Imported templates become independent Studio-editable agents. | 3 | Critical |
| **Template forking** | Any imported template can be forked into a fully independent Studio-built agent. Severs any reference to the marketplace source version. | 3 | Notable |
| **Prompt pack import** | Import a prompt pack from the marketplace into the Prompt Version management system under a named namespace. | 3 | Important |
| **Test case library** | Save and manage named test cases per agent: input payload + output assertions (exact match, schema conformance, or Evaluate-based). Run full suite; view pass/fail per case. | 3 | Important |
| **Token budget configuration** | Per-LLM-node token limits and cost budget alerts. Costs estimated against the provider pricing table. | 3 | Notable |
| **Dry run mode** | Execute graph logic without invoking external APIs. LLM, integration, and HTTP nodes return configurable stub responses. Useful for structural testing and CI. | 4 | Important |
| **A2A protocol support** | Agents expose themselves as A2A-compliant endpoints. An A2A Client node invokes any A2A-compatible external agent. | 4 | Important |

#### Workspace & Coding Environment

| Feature | Description | Phase | Priority |
|---|---|---|---|
| **Workspace node (`core:workspace`)** | Resource declaration node in the Studio Workspace canvas panel. Configures a session-scoped Docker development environment: repository, environment (standard image, devcontainer.json, or custom Dockerfile), resource limits, network policy (none by default), lifecycle, lifecycle hooks, permission policy, and teardown actions. Not placed in the main graph flow. | 4 | Critical |
| **Workspace canvas panel** | A third distinct canvas region alongside the main DAG and Tool panel. Contains `core:workspace` resource cards and their associated workspace tool nodes. Workspace edges render as solid lines within the region; tool edges to the agent render as dashed amber lines. Agent node tool badge includes auto-registered workspace tools. | 4 | Critical |
| **Workspace tool auto-registration** | When a `core:workspace` node is connected to an agent node via a workspace-registration edge, all workspace tool nodes auto-register into the agent's flat tool list when the workspace enters READY state. No manual wiring required. | 4 | Critical |
| **Workspace Shell node (`core:workspace-bash`)** | Dual-mode node. In tool mode: exposes bash execution to the LLM agent under a configurable tool contract. In direct mode (main graph flow): executes a configured command string. Returns `stdout`, `stderr`, `exitCode`, `timedOut`. Subject to workspace permission policy. | 4 | Critical |
| **Workspace File node (`core:workspace-file`)** | Dual-mode node. File operations against the workspace working tree. Key operations: `read_file`, `write_file`, `patch_file` (apply unified diff — the primary LLM edit operation), `delete_file`, `move_file`, `list_directory`, `directory_tree`, `search_files`, `grep`. | 4 | Critical |
| **Workspace Git node (`core:workspace-git`)** | Dual-mode node. Real git operations (`status`, `diff`, `log`, `add`, `commit`, `checkout`, `push`, `pull`, `create_branch`, `stash`). Returns structured parsed output. Subject to permission policy. | 4 | Critical |
| **Workspace Provision node (`core:workspace-provision`)** | Explicit provisioning node placed in the main graph flow. Provisions the referenced workspace node at a specific execution point. Repository URL and branch resolved at runtime from execution context. | 4 | Important |
| **Workspace Process node (`core:workspace-process`)** | Dual-mode node. Manages long-running background processes: `start`, `stop`, `get_output`, `list`. Useful for dev servers, watch processes, and test runners. | 4 | Important |
| **devcontainer.json support** | When `useDevContainer: true` is set, the engine reads the repo's `.devcontainer/devcontainer.json` after clone and applies the specified image, `postCreateCommand`, and environment variables. | 4 | Important |
| **Workspace lifecycle hooks** | Structured hooks in workspace config (separate from `devcontainer.json`) that run at specific lifecycle points: `afterClone`, `afterBoot`, `onSessionResume`, `beforeTeardown`, `onError`. Each hook declares type (bash, git, http), command or operation, and `onFailure` behavior. Supports `{{session_id}}`, `{{agent_handle}}`, `{{tenant_id}}` template tokens. | 4 | Important |
| **Workspace MCP sidecar** | The workspace container starts a local MCP server (sidecar) at boot, accessible to the engine's MCP Client node (funnel mode) for extensibility. | 4 | Notable |
| **Workspace teardown actions** | Configurable actions at session end: `autoCommit`, `push`, `createPR`. Subject to workspace permission policy. | 4 | Important |
| **Dual-mode workspace tools (direct flow)** | Any workspace tool node can be placed in the main graph flow for non-agent programmatic execution. Mode determined by canvas placement. Enables CI-style patterns: clone → run tests → branch on exit code — without an LLM node. | 4 | Important |

#### Workspace Permissions

| Feature | Description | Phase | Priority |
|---|---|---|---|
| **Permission policy on workspace** | Declare a permission policy in the workspace config: `defaultPosture` (allow/deny), an optional named starting `profile`, and a list of `PermissionRule` entries. | 4 | Critical |
| **Predefined permission profiles** | Named starting profiles: `full-access`, `sandboxed-dev` (recommended default), `no-network-bash`, `code-analysis`, `read-only`, `deny-all`. Profile rules evaluated first; additional workspace rules appended. | 4 | Critical |
| **Operation-level deny rules** | Deny specific operations within a tool (e.g. deny `git push`, deny file writes outside `src/`). Rules support conditions: `command_deny`, `path_scope`, `branch_match`, `arg_match`. | 4 | Important |
| **Pattern-based bash restriction** | `command_deny` conditions — regex patterns matched against the full shell command string. Enables blocking dangerous patterns (`rm -rf`, `sudo`, `curl`) while allowing other bash execution. | 4 | Critical |
| **Permission denials as LLM feedback** | When a permission rule denies a tool call, a structured error response is returned to the LLM: `PERMISSION_DENIED` code, developer-authored message explaining why and suggesting alternatives. Denials recorded in the run trace as `workspace_permission_denied` step events. | 4 | Critical |
| **Three-tier permission hierarchy** | Tenant-level policy (floor set by Platform Admin) → workspace-level policy → agent-node-level policy (additional restrictions only). Deny-wins at all tiers. | 4 | Important |
| **Agent-node-level permission overrides** | Individual Tool Call or ReAct nodes in multi-agent graphs can declare additional permission restrictions on top of the workspace policy. Can only add deny rules, never expand permissions. | 4 | Notable |
| **Tenant-level workspace permission policy** | Platform Admins configure a compliance-floor permission policy per tenant. Cannot be overridden by workspace or agent-level config. Surfaced read-only in the Studio workspace config editor. | 4 | Important |
| **Caal Configuration panel** | Admin → System Settings → Caal (or per-tenant in Tenant Management). Controls all tenant-level Caal behavior. | 3 | Important |
| **Caal enable/disable** | Platform-wide or per-tenant toggle. When disabled for a tenant, the Caal panel is hidden from all developers in that tenant. | 3 | Important |
| **Caal LLM model and router policy** | Configure which model and named router policy Caal uses for its own LLM calls. Defaults to the platform's highest-capability model and its own router policy (independent of the tenant's default router). Tenant Admins can override. | 3 | Important |
| **Caal generation mode default** | Set the tenant default generation completeness: `"complete"` (auto-configure from available connections) or `"skeleton"` (structure with labeled placeholders). Developers can override for their own sessions. | 3 | Important |
| **Caal confirmation mode default** | Set the tenant default confirmation behavior: `"always_confirm"`, `"confirm_structural"`, or `"apply_directly"`. Developers can override for their own sessions. | 3 | Important |
| **Caal system prompt suffix** | A free-text field appended to Caal's system prompt for all developers in the tenant. Used to encode organizational conventions, preferred patterns, integration preferences, or prohibited operations. | 3 | Important |
| **Caal preferred connections** | Configure which Integration Connection to prefer per service when multiple exist (e.g., two Slack workspaces). Caal uses this preference when auto-configuring integration nodes during graph generation. | 3 | Notable |
| **Caal allowed operations** | Optionally restrict which graph operations Caal may propose (e.g., disallow creating Code nodes, disallow full graph replacements). Operations not on the allowed list are excluded from Caal's tool set for that tenant. | 3 | Notable |
| **Show Reasoning availability** | Enable or disable the "Show Reasoning" toggle for developers in this tenant. When disabled at tenant level, developers cannot enable it in their preferences. | 3 | Notable |

---

### 7.3 Telemetry Viewer

| Feature | Description | Phase | Priority |
|---|---|---|---|
| **Run history list** | Paginated, filterable list of runs: ID, trigger type, status, duration, timestamp. | 2 | Critical |
| **Run detail view** | Step-by-step timeline with per-node inputs/outputs, error messages, duration. | 2 | Critical |
| **Agent status overview** | Per-agent summary: deployment state, recent run success/failure counts, last run. | 2 | Critical |
| **Basic telemetry dashboard** | Total runs over time, runs by status, average duration, top agents by volume. | 2 | Important |
| **Error drill-down** | Failed runs in a time window, grouped by error type or failing node. | 2 | Important |
| **Run cancellation** | Cancel an active or pending run from the run detail view. | 2 | Important |
| **Human Review queue** | Viewer-level visibility into runs suspended at Human Review. Action requires Tenant Admin or higher. | 2 | Important |
| **Guardrail event log** | All Guardrail node evaluations: rule triggered, branch taken, redacted/blocked value. | 2 | Notable |
| **Integration node activity** | Per-run view of integration node calls: service, operation, duration, status, response summary. | 2 | Important |
| **Invocation audit log access** | Viewer-level access to the invocation audit log for tenant's agents. | 2 | Notable |
| **Routing trace in run detail** | Every LLM node step displays its `routingMeta`: provider, model, and connection key that responded; targets attempted; trigger event history. | 2 | Critical |
| **Provider health dashboard** | Per-target health state: circuit state, P50 latency, error rate, rate limit status, estimated spend, request volume. | 2 | Important |
| **Routing event log** | Queryable log of routing fallback events: agent, node, trigger condition, source target, destination target, timestamp, link to run. | 2 | Important |
| **Run status SSE feed** | Live run status updates via SSE. Node-level state changes streamed to browser. | 3 | Important |
| **Per-node performance metrics** | Average duration, error frequency, most common failure modes per node across runs. | 3 | Important |
| **Token usage tracking** | LLM token consumption per node per run. Aggregate across runs. Estimated cost per run and agent. | 3 | Important |
| **Trajectory evaluation view** | Execution trajectory for ReAct, Planner, multi-step LLM runs: reasoning steps, tool invocations, decisions. Compare trajectories across runs. | 3 | Important |
| **Evaluate node score history** | Chart Evaluate node scores over time. Track quality trends across prompt or model changes. | 3 | Important |
| **Prompt version attribution** | Run detail shows which Prompt Version was active for each LLM node at time of run. | 3 | Important |
| **Metric node aggregations** | Query and chart values emitted by Metric nodes over time. | 3 | Notable |
| **Tenant-level telemetry summary** | Aggregate run volume, success rate, duration, error rates across all agents in a tenant. | 3 | Important |
| **Integration health per agent** | Flag runs that failed due to expired or broken Integration Connections. Link to the Integration Connections admin panel. | 3 | Important |
| **Sessions view (Telemetry)** | First-class Sessions view showing session list, session detail with run sequence, context state snapshot after each run, cumulative token usage, overflow/summarization events. Context growth chart per key. | 3 | Important |
| **Cross-run comparison** | Compare step-level execution of two runs of the same agent side by side. | 4 | Notable |
| **Telemetry data export** | Export run and step telemetry as CSV or JSON. | 4 | Notable |
| **Alerting rules** | Threshold-based alerts (error rate, run duration, Evaluate score thresholds) surfaced in the Admin dashboard. | 4 | Important |

---

### 7.4 Agent API Consumer

| Feature | Description | Phase | Priority |
|---|---|---|---|
| **REST invocation API** | HTTP POST to invoke a published agent. Returns run ID (async) or run result (sync). | 1 | Critical |
| **API key invocation auth** | Per-agent invocation key as Bearer token. Clear `401` on invalid or revoked keys. | 1 | Critical |
| **Run status endpoint** | HTTP GET to retrieve current status and metadata of a run. | 1 | Critical |
| **Structured error responses** | Consistent JSON error body: machine-readable code, human-readable message, relevant context. | 1 | Critical |
| **API reference documentation** | Hosted documentation: endpoints, schemas, auth requirements, error codes, examples. | 1 | Critical |
| **Run step result endpoint** | HTTP GET for step-level execution detail of a completed run. | 2 | Important |
| **Rate limit response headers** | `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` in all invocation responses. | 2 | Important |
| **Webhook invocation** | Invoke an agent via its assigned inbound webhook URL. | 2 | Important |
| **Invocation key rotation** | Documentation and API support for zero-downtime key rotation. | 2 | Important |
| **Sync vs. async mode control** | Caller controls response mode per request via header or query parameter. | 2 | Notable |
| **Human Review response endpoint** | HTTP POST to respond to a Human Review request (approve, reject, or supply modified value) and resume a suspended run. Enables programmatic HITL workflows. | 2 | Important |
| **JWT invocation auth** | Signed JWT from a trusted issuer as Bearer token. Clear errors for expired, invalid, or claim-failing tokens. | 3 | Important |
| **Run cancellation endpoint** | HTTP DELETE to cancel an active or pending run by run ID. | 3 | Important |
| **Input / output schema discovery** | HTTP GET returning the declared input and output JSON Schemas for an agent. | 3 | Important |
| **OpenAPI spec** | Machine-readable OpenAPI 3.x spec for the invocation API. Enables SDK generation. | 3 | Important |
| **Streaming response (SSE)** | Server-Sent Events streaming of intermediate outputs and final result during a run. | 3 | Important |
| **A2A endpoint exposure** | Agents with A2A enabled expose an A2A-compliant endpoint for cross-framework invocation. | 4 | Important |

#### Client SDK (`@magicaal/sdk`)

The client SDK is a separately published npm package (`@magicaal/sdk`) maintained in the monorepo at `packages/sdk-client` (distinct from `packages/sdk`, the node authoring SDK). It wraps the platform's `/v1/` invocation API. Zero mandatory runtime dependencies. Dual ESM/CJS build. Node.js 18+, modern browsers, edge runtimes.

| Feature | Description | Phase | Priority |
|---|---|---|---|
| **SDK: MagiCaalClient init** | `new MagiCaalClient({ baseUrl, apiKey, timeout, retry })`. Stateless; safe to share across requests. Supports `apiKey` (Bearer) and `bearer` (JWT) auth. Injectable `fetch` for edge runtimes and testing. | 1 | Critical |
| **SDK: `agent.invoke()`** | `client.agent<TIn, TOut>(id).invoke(input, opts?)` — awaits completion; SDK polls internally. Returns typed `InvokeResult` with `output`, `runId`, `duration`, `rateLimit` (`limit`, `remaining`, `resetAt`). | 1 | Critical |
| **SDK: `RunHandle`** | `agent.start(input)` returns a `RunHandle` immediately. Exposes `id`, `wait()`, `cancel()`, `status()`, `steps()`, `stream()` (convert in-flight run to streaming view). | 1 | Important |
| **SDK: Typed error hierarchy** | All errors extend `MagiCaalError`. Subclasses: `AuthError` (401), `RateLimitError` (429; includes `retryAfter`), `ValidationError` (400; includes `issues[]`), `RunFailedError` (includes `failedNodeId`, `errorCode`, `steps`), `RunSuspendedError` (includes `reviewId`), `AgentNotFoundError` (404), `NetworkError`. | 1 | Critical |
| **SDK: `agent.stream()` async event iterator** | `StreamHandle<TOut>` implementing `AsyncIterable<RunEvent<TOut>>`. Typed event union: `run.started`, `node.started`, `node.completed` (includes `tokenUsage`), `node.failed`, `run.suspended` (includes `reviewId`), `run.completed` (includes typed `output`), `run.failed`. `stream.withSignal(abortSignal)` for cancellation. | 2 | Critical |
| **SDK: `HumanReviewClient`** | `client.humanReview(runId)` — `approve()`, `reject(reason)`, `modify({ key, value })`, `details()` (context snapshot, review message, suspended timestamp). | 2 | Important |
| **SDK: `client.onPendingReview()`** | Server-side polling subscription. Fires handler when any run suspends for Human Review. Returns an unsubscribe function. For automated approval workflows and supervisor agents. | 2 | Notable |
| **SDK: `SessionClient`** | `client.session(id)` or `agent.sessions.create(opts?)`. `session` parameter on `invoke()`, `start()`, `stream()`. Exposes `context()`, `reset()`, `clear(keys)`, `destroy()`. `agent.sessions.list(opts?)`. | 3 | Critical |
| **SDK: `WorkspaceContextBuilder`** | Fluent builder for coding assistant session context. `addMessage(role, content)`, `setCurrentFile(path, content)`, `addDocument(doc)`, `set(key, value)`. Schema-aware when constructed with `agent.schema.contextSchema`. `.toInput()` returns the assembled agent input payload. | 3 | Important |
| **SDK: `magicaal generate` codegen** | Fetches agent schemas and produces `{handle}.types.ts` + `{handle}.descriptor.ts`. `client.agent(descriptor)` gives compile-time type checking. Stale schema runtime warning. `--all`, `--check` flags. | 3 | Important |
| **SDK: `WebhookVerifier`** | `new WebhookVerifier(secret)` — `verify(rawBody, signatureHeader)` validates HMAC-SHA256 signature on inbound webhook notifications. Throws `WebhookVerificationError` on invalid signature. | 3 | Important |
| **SDK: `agent.validate()`** | Pre-flight input validation against fetched schema. Returns `ValidationIssue[]` (empty on success). | 3 | Notable |
| **SDK: Framework bindings** | `@magicaal/react`: `useAgentInvoke`, `useAgentStream`, `useSession` hooks. `@magicaal/next`: `agentAction`, `agentStreamHandler`. `@magicaal/express`: webhook and human review handler middleware. Published as separate packages with `@magicaal/sdk` as peer dependency. | 4 | Notable |

---

## 8. Non-Functional Requirements

| Requirement | Description | Phase |
|---|---|---|
| **Concurrent run throughput** | ≥ 200 concurrent graph executions without scheduling latency degradation. | 2 |
| **Invocation API latency** | P95 time from invocation receipt to run dispatch ≤ 500ms. | 2 |
| **Router Engine overhead** | `routedLLMCall()` overhead (provider selection + translation) must be < 5ms P95 under normal load. Measured independently of provider response time. | 2 |
| **Canonical LLM request format** | All LLM-using nodes must build a `CanonicalLLMRequest` and call the Router Engine. No node may call an LLM provider directly, bypassing provider adapter translation and routing logic. Enforced at the engine level. | 2 |
| **Router Engine as single enforcement point** | `routingMeta` must be populated on every LLM response — including single-target configurations. `router_target_used` must be non-null for any completed LLM step in the telemetry store. | 2 |
| **Circuit breaker required on multi-target routers** | Any `ModelRouterConfig` with more than one target must include circuit breaker config. Default config auto-applied if omitted. Enforced at graph publish via Graph Linter. | 2 |
| **Secret encryption** | All credentials, secrets, and Integration Connection tokens at rest AES-256 encrypted. Master key externally injectable. | 1 |
| **Code node isolation** | Code nodes in sandboxed VM with no host filesystem, network, or cross-tenant context access. | 2 |
| **Community package isolation** | Community marketplace packages execute in an isolated VM. Network access limited to declared service domain. | 3 |
| **Tenant data isolation** | All queries and engine operations scoped to authenticated tenant. No cross-tenant access via normal API usage. | 1 |
| **Integration credential isolation** | Integration Connection credentials only resolved for the run's own tenant. Never written to telemetry or logs. | 2 |
| **Guardrail enforcement integrity** | Guardrail nodes must not be bypassable by graph misconfiguration or malformed inputs. Failures always route to fail branch. | 2 |
| **Human Review durability** | Run suspended at Human Review must survive engine restarts. Suspend state persisted before review request is emitted. | 2 |
| **Package install integrity** | Content hash and publisher signature verified before any marketplace package is registered. | 3 |
| **Workspace container isolation** | Workspace containers must run as a non-root user with no extra Linux capabilities. No access to the MagiCaal internal network (engine, database, Redis). Network policy defaults to `none`. | 4 |
| **Workspace credential security** | Git credentials for workspace containers must never be written to the container environment, filesystem, or Docker labels. Credential helper sidecar serves from the encrypted Integration Connection store with in-memory lifetime only. | 4 |
| **Workspace permission enforcement integrity** | The Permission Enforcer must evaluate the full three-tier hierarchy before every workspace tool invocation. Deny rules must not be bypassable. All denials recorded in the run trace. | 4 |
| **Workspace resource quota enforcement** | Docker resource limits enforced at the container level. Containers exceeding disk quota stopped immediately and flagged as errored. | 4 |
| **Graceful sync failure** | Failed boot-time sync for a subset of code-defined agents must not prevent the API from starting or serving other agents. | 3 |
| **Horizontal scalability** | Multiple engine instances consume from the same queue and share the database without run duplication or state corruption. | 4 |
| **API versioning** | Public invocation API versioned (`/v1/`). Breaking changes in `/v2/` with deprecation period. | 2 |
| **Audit trail completeness** | All significant admin actions, auth events, guardrail events, Human Review events, invocation attempts, and marketplace actions recorded with timestamp, actor, and detail. | 2 |
| **Self-hosted minimal footprint** | Default single-node deployment runs with Docker Compose. No mandatory external dependencies beyond Redis and SQLite. | 1 |
| **Air-gapped deployment support** | Marketplace fully operational with a locally mounted catalog file and pre-downloaded packages, without outbound internet access. | 3 |
| **ORM-abstracted database layer** | All database access through Drizzle ORM supporting dialect switching to PostgreSQL. | 1 |
| **TypeScript throughout** | All services, packages, and tooling authored in TypeScript with strict mode enabled. | 1 |

---

## 9. Out of Scope

The following are explicitly not in scope for any currently planned phase:

- A consumer-facing UI for non-technical end-users to interact with agents directly.
- MagiCaal managing cloud infrastructure (VMs, containers, DNS) on behalf of users.
- Built-in LLM model hosting or fine-tuning.
- LLM usage billing, quota enforcement, or cost tracking on behalf of tenants.
- Mobile application.
- Real-time collaborative Studio editing (multiple users editing the same graph simultaneously).
- Cross-tenant agent invocation or sharing.
- Audio or video multi-modal LLM inputs (text and image inputs via LLM Call node are in scope from Phase 2).
# MagiCaal — Architecture

---

## 1. Overview & Design Philosophy

MagiCaal is a self-hosted platform for building, deploying, and managing production-ready AI agents. Its core philosophy is **agent-as-a-graph**: every agent is represented as a directed graph of typed nodes connected by conditional edges. This model handles single-agent pipelines, multi-agent compositions via sub-graphs, and complex branching logic within a unified mental model.

Agent graphs can be authored visually in the Studio canvas editor or defined as TypeScript code and compiled to the same graph format at build time. Both approaches are first-class citizens. The graph representation is inspired by [PocketFlow-Typescript](https://github.com/The-Pocket/PocketFlow-Typescript) and visually by [Rivet](https://github.com/Ironclad/rivet), but MagiCaal implements a custom engine tailored to its scale, lifecycle, and multi-tenant requirements.

The node set is the platform's extensibility surface. Beyond built-in core nodes, integration nodes connect agents to external services, and the Node & Integration Marketplace allows new node packages — as well as agent graph templates, workflow bundles, and prompt packs — to be installed at runtime without redeployment.

---

## 2. System Architecture

### 2.1 Core Components

| Component | Technology | Role |
|---|---|---|
| **Web App** | Datastar, Node.js | Unified Studio + Admin frontend |
| **Backend API** | Express, TypeScript | BFF: auth, data, engine gateway, boot-time sync, OAuth callbacks, marketplace operations |
| **Agent Engine** | Express, TypeScript | Graph execution runtime |
| **Primary Database** | SQLite (WAL mode) | App data, agent definitions, integration connections, package registry, licenses, prompt versions, test cases |
| **Telemetry Store** | SQLite (WAL mode) | Run/step telemetry, token usage, trajectory records — separate DB file |
| **Job Queue** | BullMQ + Redis | Trigger dispatch, concurrency control, rate limit counters |

### 2.2 Communication Patterns

```
Browser ──HTTP/SSE──► Web App / Backend API ──internal REST──► Agent Engine
                              │                                       │
                              ▼                                       ▼
                         Primary DB                         Telemetry Store
                              │
                         Job Queue ◄──────────────────────── Engine (consumer)

/agents dir ──boot-time sync──► Backend API ──────────────────► Primary DB
(compiled JSON)

Backend API ──HTTPS──► MagiCaal Marketplace API (catalog, licenses, downloads)
Engine ──HTTPS──► MagiCaal Marketplace API (license heartbeat, usage reporting)
Engine ──SSE──► Browser (live run status — Studio test runs and API consumer streaming)
Engine ──pub/sub──► Redis ──package install event──► Engine (hot-load)
```

---

## 3. Core Type Definitions

These are the foundational TypeScript types shared via `packages/core`. Every other package — the compiler, the engine, the SDK — imports from here. Defining them first establishes the shared language of the platform.

### 3.1 Agent Graph Definition

The canonical in-memory and on-disk representation of an agent. Both the compiler's `compile()` output and the Studio's save format produce this structure.

```typescript
// packages/core/src/graph.ts

interface AgentGraphDefinition {
  version:         string;          // schema version, e.g. "1.0"
  handle?:         string;          // set for code-defined agents; null for studio-built
  name:            string;
  description?:    string;
  entry:           string;          // node ID of the Start node
  nodes:           Record<string, NodeDefinition>;
  edges:           EdgeDefinition[];          // execution flow edges only
  toolEdges:       ToolEdgeDefinition[];      // tool availability edges; never traversed
  workspaceEdges:  WorkspaceEdgeDefinition[]; // workspace resource + registration edges; never traversed
  routerPolicies?: Record<string, ModelRouterConfig>;
  // named router configs declared at the graph level; referenced by string key from node router fields
  // e.g. { "primary": { strategy: "priority", ... }, "cost-efficient": { strategy: "cost-optimized", ... } }
  config:          AgentConfig;
  layout?:         GraphLayout;     // canvas position metadata; ignored by engine
}

interface NodeDefinition {
  id:       string;
  type:     string;             // e.g. "core:condition", "integration:slack:post-message"
  label?:   string;
  config:   Record<string, unknown>;   // node-type-specific; validated against node's config schema
  group?:   string;            // canvas group ID; ignored by engine
}

interface EdgeDefinition {
  id:        string;
  from:      string;           // source node ID
  to:        string;           // target node ID
  type:      "unconditional" | "conditional" | "fallback";
  condition?: string;          // JSONata expression; only present when type == "conditional"
  label?:    string;
}

// Tool edges connect Tool nodes or MCP Client nodes to agent nodes (ReAct, Tool Call).
// Direction: tool source → agent node ("this tool is available to this agent").
// Not in EdgeDefinition — kept separate to preserve clean flow semantics.
interface ToolEdgeDefinition {
  id:   string;
  from: string;   // core:tool node ID or core:mcp-client node ID
  to:   string;   // core:react or core:tool-call node ID
}

// Workspace edges have two roles, distinguished by edgeRole:
// "tool-source":        workspace tool node → workspace node (this tool belongs to this workspace)
// "agent-registration": workspace node → agent node (auto-register all workspace tools to this agent)
interface WorkspaceEdgeDefinition {
  id:       string;
  from:     string;
  to:       string;
  edgeRole: "tool-source" | "agent-registration";
}
```

### 3.2 Tool Contract

The LLM-facing description of a tool. Declared in the `core:tool` node's configuration and generated at runtime for MCP tools from their server's `tools/list` response.

```typescript
// packages/core/src/tool.ts

interface ToolContract {
  name:        string;       // LLM-facing tool name — must be unique within an agent's tool list
                             // e.g. "search_web", "query_knowledge_base", "post_slack_message"
  description: string;       // Explains what the tool does and when to use it
                             // The LLM uses this to decide whether and when to call the tool
  inputSchema: JSONSchema7;  // Parameters the LLM may pass; validated before invocation
}

// Configuration for a core:tool node
interface ToolNodeConfig extends ToolContract {
  // Maps LLM tool call argument names → context keys injected into the tool sub-context
  // e.g. { "query": "searchQuery", "maxResults": "resultLimit" }
  inputMapping:  Record<string, string>;
  // The context.data key written by the downstream action node to use as the tool result
  // This value is serialised and returned to the LLM as the tool call result
  outputMapping: string;
}

// Assembled tool entry used internally by the engine during an agent node's execution loop
interface AssembledTool {
  name:        string;
  description: string;
  inputSchema: JSONSchema7;
  source:      "graph" | "mcp";
  nodeId:      string;       // core:tool node ID (graph) or core:mcp-client node ID (mcp)
  mcpToolName?: string;      // Only set for source == "mcp"; the tool name on the MCP server
}

### 3.3 Agentic Router Configuration

```typescript
// packages/core/src/agentic-router.ts

interface AgenticRouterCase {
  key:         string;  // machine-readable identifier matching an outbound conditional edge label
                        // e.g. "billing", "technical_support", "general"
  label:       string;  // human-readable name displayed on the canvas edge
  description: string;  // passed verbatim to the LLM to explain when to select this route
                        // the quality of this description directly determines routing accuracy
}

interface AgenticRouterConfig {
  model:                string;               // LLM provider and model
  systemPrompt?:        string | PromptRef;   // optional override; augments the auto-generated
                                              // classification prompt rather than replacing it
  inputKey:             string;               // context key containing the value to classify
  cases:                AgenticRouterCase[];  // declared routes; each must have a matching outbound edge
  routeOutputKey:       string;              // context key to write the selected route key to
                                             // defaults to "_route"; used by auto-generated edge conditions
  confidenceOutputKey?: string;              // optional context key to write the 0.0–1.0 confidence score
  reasoningOutputKey?:  string;              // optional context key to write the LLM's reasoning text
  confidenceThreshold?: number;              // if confidence < threshold, route to Human Review
                                             // instead of the selected case branch
}
```

**Runtime behaviour**: The node constructs a classification prompt from the case descriptions and the configured `systemPrompt`, calls the LLM using structured output mode with the schema `{ route: string, confidence: number, reasoning: string }`, and writes each field to its configured context key. Outbound edges are standard conditional edges whose conditions check `routeOutputKey` (e.g. `$._route == "billing"`). The Studio auto-generates and manages these edge conditions from the declared cases — developers connect cases to downstream nodes visually and never author the JSONata directly. A fallback edge handles any unexpected output that does not match a declared case key (which should not occur under normal structured output but serves as a safety net). If `confidenceThreshold` is set and the returned confidence falls below it, the node routes to a connected Human Review node instead of taking the LLM's routing decision at face value.

### 3.4 Workspace Types

```typescript
// packages/core/src/workspace.ts

type WorkspaceTool = "bash" | "file" | "git" | "process" | "*";

// Permission conditions — evaluated against the actual invocation arguments
type PermissionCondition =
  | { type: "command_match"; pattern: string }  // bash: regex match on full command string
  | { type: "command_deny";  pattern: string }  // bash: deny if regex matches (convenience inverse)
  | { type: "path_scope";    glob: string }      // file/git: restrict ops to paths matching glob
  | { type: "branch_match";  pattern: string }  // git: regex match on current branch name
  | { type: "arg_match";     arg: string; pattern: string }; // any: match a specific arg value

interface PermissionRule {
  effect:      "allow" | "deny";
  tool:        WorkspaceTool;
  operations?: string[];              // specific operations within the tool; omit to match all
  conditions?: PermissionCondition[];
  message?:    string;                // returned to the LLM on denial; should explain the alternative
}

interface WorkspacePermissions {
  // Named starting profiles: full-access | sandboxed-dev | no-network-bash | code-analysis | read-only | deny-all
  // Profile rules are evaluated first; workspace rules are appended and evaluated after.
  profile?:       string;
  defaultPosture: "allow" | "deny";  // default: "allow"
  rules:          PermissionRule[];
}

type GitHookOperation =
  | { op: "fetch";    remote?: string; args?: string[] }
  | { op: "checkout"; branch: string;  create?: boolean }
  | { op: "config";   key: string;     value: string }
  | { op: "tag";      name: string;    message?: string };

interface WorkspaceHook {
  name:            string;
  type:            "bash" | "git" | "http";
  command?:        string;           // bash type: shell command string; supports {{session_id}},
                                     // {{agent_handle}}, {{tenant_id}} template tokens
  gitOp?:          GitHookOperation;
  workingDir?:     string;           // relative to repo root; defaults to repo root
  timeoutSeconds?: number;
  onFailure:       "abort" | "warn" | "continue";
  // "abort" halts workspace provisioning; "warn" logs and continues; "continue" silently proceeds
}

interface WorkspaceLifecycleHooks {
  afterClone?:      WorkspaceHook[];  // after git clone, before container start
  afterBoot?:       WorkspaceHook[];  // after container starts, devcontainer applied, setupCommands run
  onSessionResume?: WorkspaceHook[];  // at start of each subsequent run in the same session
  beforeTeardown?:  WorkspaceHook[];  // before container stops; always runs
  onError?:         WorkspaceHook[];  // if workspace enters error state
}

interface WorkspaceConfig {
  repository: {
    url:     string;        // git remote URL; may be a JSONata expression resolved from context
    ref?:    string;        // branch, tag, or commit SHA; may be a JSONata expression
    depth?:  number;        // shallow clone depth; omit for full history
    sparse?: string[];      // sparse checkout paths; useful for monorepos
  };
  gitCredentials?: string;  // Integration Connection ID (GitHub, GitLab, Bitbucket, etc.)

  environment: {
    image?:          string;   // MagiCaal standard image (magicaal/env:node, python, fullstack, base)
                               // or any fully qualified Docker image reference
    useDevContainer?: boolean; // read and apply the repo's devcontainer.json (VS Code Dev Containers spec)
    dockerfile?:     string;   // path to a Dockerfile in the repo; resolved after clone
    env?:            Record<string, string>; // environment variables injected into the container
    setupCommands?:  string[]; // shell commands run after clone and container start
    resources: {
      cpuLimit:    string;     // e.g. "2.0"
      memoryLimit: string;     // e.g. "4g"
      diskLimit:   string;     // e.g. "10g"; enforced via Docker volume quota
    };
    networkPolicy:   "none" | "allowlist"; // "none" = no outbound access (default)
    allowedDomains?: string[];             // outbound domains permitted when policy == "allowlist"
  };

  lifecycle: "session" | "run";
  // "session": container persists across all runs in the same session (recommended)
  // "run": container torn down after each run; workspace is re-cloned on next run

  hooks?: WorkspaceLifecycleHooks;

  // Three-tier hierarchy: tenant (floor) → workspace → agent node (can only restrict further)
  permissions?: WorkspacePermissions;

  onTeardown?: {
    autoCommit?: string;      // auto-stage and commit with this message template on teardown
    push?:       boolean;     // push to origin remote after autoCommit
    createPR?: {
      titleTemplate: string;  // may reference context keys via JSONata
      bodyTemplate:  string;
      targetBranch:  string;
    };
  };
}

// Assembled workspace tool entry — produced by Workspace Container Manager at auto-registration
interface AssembledWorkspaceTool {
  name:        string;       // LLM-facing tool name
  description: string;
  inputSchema: JSONSchema7;
  source:      "workspace";
  workspaceId: string;       // runtime workspace instance ID
  wsToolType:  WorkspaceTool;
}

### 3.5 Canonical LLM & Model Router Types

Every LLM-using node builds a `CanonicalLLMRequest` and receives a `CanonicalLLMResponse`. The Router Engine and Provider Adapter Registry translate to and from each provider's wire format. No node implementation knows which provider it will call.

```typescript
// packages/core/src/llm.ts

// ── Canonical LLM Types ────────────────────────────────────────────────────

interface CanonicalLLMRequest {
  system?:       string;          // system prompt; adapter places per provider convention
  messages:      CanonicalMessage[];
  tools?:        CanonicalTool[];
  outputSchema?: JSONSchema7;     // structured output; adapter translates to provider mechanism
  maxTokens?:    number;
  temperature?:  number;
  metadata?:     Record<string, unknown>; // written to telemetry; not sent to provider
}

interface CanonicalMessage {
  role:        "user" | "assistant" | "tool_result";
  content:     string | CanonicalContentBlock[];
  toolCallId?: string;   // present on tool_result messages
}

type CanonicalContentBlock =
  | { type: "text";     text: string }
  | { type: "image";    data: string; mimeType: string }
  | { type: "tool_use"; id: string; name: string; input: Record<string, unknown> };

interface CanonicalTool {
  name:        string;
  description: string;
  inputSchema: JSONSchema7;
}

interface CanonicalLLMResponse {
  content:    string;
  toolCalls?: CanonicalToolCall[];
  stopReason: "end_turn" | "tool_use" | "max_tokens" | "content_filter" | "error";
  usage: {
    promptTokens:     number;
    completionTokens: number;
    estimatedCostUsd: number;   // calculated by Router Engine from provider pricing table
  };
  // Written to step telemetry record for every LLM call
  routingMeta: {
    targetUsed:     ModelRouterTarget;
    attemptCount:   number;
    triggerHistory: RouterTriggerEvent[];
  };
}

interface CanonicalToolCall {
  id:    string;
  name:  string;
  input: Record<string, unknown>;
}

// ── Model Router Types ─────────────────────────────────────────────────────

type ModelRouterStrategy =
  | "priority"        // always use target[0]; fallback to others only on trigger
  | "round-robin"     // cycle through targets in sequence; weight ignored
  | "weighted"        // probabilistic selection by target.weight values
  | "least-latency"   // select target with lowest rolling P50 latency
  | "cost-optimized"; // select target with lowest estimated cost per token for this request

type RouterTriggerCondition =
  | { type: "rate_limit" }                              // 429 from provider
  | { type: "provider_error"; statusCodes?: number[] }  // 5xx; defaults to [500,502,503,504]
  | { type: "timeout";          thresholdMs: number }   // response exceeds threshold
  | { type: "context_overflow" }                        // input tokens > model context window
  | { type: "content_policy" }                          // provider refuses prompt
  | { type: "latency_degraded"; p50ThresholdMs: number }// proactive: rolling P50 > threshold
  | { type: "error_rate"; threshold: number;            // proactive: error rate over window
      windowMs: number };

interface RouterTrigger {
  condition: RouterTriggerCondition;
  action:    "next_in_chain" | "least_latency" | "cheapest";
  // "next_in_chain": move to next available target in ordered list
  // "least_latency": jump to healthy target with lowest current P50
  // "cheapest": jump to healthy target with lowest estimated cost
}

interface RouterTriggerEvent {
  target:   ModelRouterTarget;
  trigger:  RouterTriggerCondition;
  skipped?: boolean;  // true if skipped pre-flight (e.g. context overflow detected before call)
}

interface CircuitBreakerConfig {
  failureThreshold:   number;  // consecutive failures before opening (default: 5)
  errorRateThreshold: number;  // 0.0–1.0 error rate before opening (default: 0.5)
  windowMs:           number;  // observation window for error rate (default: 60_000)
  cooldownMs:         number;  // how long to keep circuit open (default: 30_000)
  halfOpenProbeCount: number;  // requests in half-open before closing (default: 1)
}

interface ModelRouterTarget {
  id:                     string;  // stable reference within the router config
  connectionId:           string;  // Integration Connection ID (the LLM provider API key)
  provider:               string;  // "openai" | "anthropic" | "google" | "mistral" | "cohere" | ...
  model:                  string;  // provider-specific model identifier
  weight?:                number;  // for "weighted" strategy; relative weight
  maxTokensOverride?:     number;
  contextWindowOverride?: number;  // override known context window for overflow detection
}

interface ModelRouterConfig {
  name?:                  string;  // if set, nodes and policies can reference by name
  strategy:               ModelRouterStrategy;
  targets:                ModelRouterTarget[];
  triggers:               RouterTrigger[];
  circuitBreaker?:        CircuitBreakerConfig;
  streamFailureBehavior?: "restart_with_next" | "fail";  // default: "restart_with_next"
}

// Stored in named_router_policies table; tenant-level reusable policies
interface NamedRouterPolicy extends ModelRouterConfig {
  name:        string;   // required; unique within tenant
  overridable: boolean;  // if false, agents cannot override at graph or node level;
                         // enforced by the Router Engine at call time
}
```

`AgentGraphDefinition` gains a `routerPolicies?: Record<string, ModelRouterConfig>` field — a map of named router configs declared at the graph level and referenceable by node `router` fields. `AgentConfig` gains `defaultRouter?: string | ModelRouterConfig` — applied to all LLM nodes in the graph unless a node declares its own. Node-level `router` config takes precedence over graph default; graph default takes precedence over tenant-level named policy.

### 3.6 Caal Types

The following types are defined in `packages/core/src/caal.ts` and imported by the Studio frontend, Backend API, and the `packages/integrations/caal` tool package.

```typescript
// packages/core/src/caal.ts

interface CaalInvokeRequest {
  message:         string;
  graphState:      AgentGraphDefinition | null; // null when generating a new graph
  selectedNodeIds: string[];
  lastRunResult?:  RunSummary;
  sessionId:       string;                      // scoped to {userId}:{agentId}
}

interface CaalResponse {
  message:        string;
  proposal?:      CaalProposal;          // present when Caal proposes graph changes
  nodeReferences: NodeReference[];       // nodes mentioned; drives canvas highlighting
  tsChanges?:     TypeScriptSuggestion;  // code-defined agents only; never auto-applied
}

interface NodeReference {
  nodeId:   string;
  nodeType: string;
  label?:   string;
}

// For code-defined agents — Caal suggests; the developer applies manually to source
interface TypeScriptSuggestion {
  description:  string;   // what the change does
  diff:         string;   // unified diff format against the *.agent.ts source file
  targetHandle: string;   // which code-defined agent handle this applies to
}

interface CaalProposal {
  id:          string;
  description: string;                                    // developer-facing summary
  complexity:  "targeted" | "structural" | "replacement"; // drives Studio review UI tier
  patches:     GraphPatch[];
  preview?:    AgentGraphDefinition;  // present for "replacement" complexity
  reasoning?:  string;                // shown when "Show Reasoning" mode is enabled
}

interface GraphPatch {
  op:      "add_node" | "update_node" | "delete_node"
         | "add_edge" | "delete_edge" | "add_tool_edge";
  target?: string;                          // node/edge ID (update/delete)
  data?:   NodeDefinition | EdgeDefinition; // payload (add/update)
  reason?: string;                          // per-change reasoning
}
```
```
```

interface AgentConfig {
  trigger:         TriggerConfig;
  concurrency:     ConcurrencyConfig;
  retry:           RetryConfig;
  timeout?:        number;              // max run duration in ms
  invocationAuth?: InvocationAuthConfig;
  rateLimit?:      RateLimitConfig;
  session?:        SessionConfig;       // see Section 14: Session & Context Management
  defaultRouter?:  string | ModelRouterConfig;
  // string: name of a policy in routerPolicies or a tenant-level NamedRouterPolicy
  // ModelRouterConfig: inline declaration applied to all LLM nodes unless node-level config overrides
  // absent: nodes call their configured provider directly (single-model, no routing)
}

type TriggerConfig =
  | { type: "rest";        mode: "sync" | "async" }
  | { type: "cron";        expression: string }
  | { type: "webhook" }
  | { type: "integration"; service: string; event: string };

interface ConcurrencyConfig {
  maxParallel:  number;         // max simultaneous runs of this agent
  queueTimeout: number;         // ms to wait in queue before failing
}

interface RetryConfig {
  maxAttempts: number;
  backoff:     "fixed" | "exponential";
  delayMs:     number;
}
```

### 3.2 Run and Step

```typescript
// packages/core/src/run.ts

type RunStatus = "pending" | "running" | "completed" | "suspended" | "failed" | "cancelled";
type StepStatus = "pending" | "running" | "complete" | "suspended" | "failed";

interface Run {
  id:                 string;
  agentId:            string;
  tenantId:           string;
  versionId:          string;
  triggerType:        TriggerConfig["type"] | "manual";
  status:             RunStatus;
  input:              Record<string, unknown>;
  output?:            Record<string, unknown>;
  suspendedAtNodeId?: string;    // set when status == "suspended"
  startedAt?:         number;    // unix ms
  completedAt?:       number;
  createdAt:          number;
}

interface Step {
  id:               string;
  runId:            string;
  nodeId:           string;
  nodeType:         string;
  status:           StepStatus;
  inputs?:          Record<string, unknown>;
  outputs?:         Record<string, unknown>;
  tokenUsage?:      TokenUsage;   // present for LLM-family nodes
  error?:           StepError;
  startedAt:        number;
  completedAt?:     number;
}

interface TokenUsage {
  promptTokens:     number;
  completionTokens: number;
  estimatedCostUsd: number;
}

interface StepError {
  code:      string;
  message:   string;
  retryable: boolean;
}
```

---

## 4. Monorepo Structure

```
magicaal/
├── apps/
│   ├── web/              # Datastar frontend (Studio + Admin)
│   ├── api/              # Backend-for-frontend Express server
│   └── engine/           # Agent engine Express server
├── packages/
│   ├── core/             # Shared types, graph schema, validation
│   ├── nodes/            # Built-in core node implementations
│   ├── sdk/              # Public SDK for custom node + integration development
│   ├── compiler/         # Graph-as-code: TS class/decorator → JSON translation
│   ├── cli/              # Build-time CLI tool
│   └── integrations/     # Built-in integration node packages
│       ├── core/         # Shared utilities (auth, pagination, error handling)
│       ├── slack/
│       ├── github/
│       ├── google-workspace/
│       ├── microsoft-365/
│       ├── stripe/
│       ├── salesforce/
│       ├── hubspot/
│       ├── jira/
│       ├── zendesk/
│       ├── quickbooks/
│       ├── bamboohr/
│       ├── shopify/
│       ├── twilio/
│       ├── sendgrid/
│       ├── aws/
│       ├── notion/
│       ├── asana/
│       ├── datadog/
│       ├── pagerduty/
│       ├── docusign/
│       └── ...
├── docker/
├── docs/
└── scripts/
```

### Package Responsibilities

**`packages/core`**
Shared foundation: graph type definitions and JSON schema, tenant/user types, graph validation utilities, shared enumerations. All other packages import types from here; nothing imports from them in return.

**`packages/nodes`**
Built-in core node implementations conforming to the `packages/sdk` Node interface. Integration-family nodes live in `packages/integrations/`.

**`packages/sdk`**
Public interface for custom node and integration development. Defines the Node interface and lifecycle contract, execution context API, auth schema helpers, and testing utilities. The canonical reference for external publishers. See Section 11.6 for the interface definition and a worked example.

**`packages/compiler`**
Graph-as-code translation library. `AgentGraph` base class, typed node classes, `@Agent` decorator, `compile()` function. No filesystem or database interaction — pure transform.

**`packages/cli`**
Build-time CLI: `magicaal build`, `magicaal validate`, `magicaal list`.

**`packages/integrations/core`**
Shared utilities across all integration packages: error formatting, pagination, OAuth token refresh, rate limit header parsing, idempotency key management.

**`packages/integrations/[service]`**
Each package exports: node implementations conforming to the SDK, an auth schema, node type manifests, an optional trigger handler, and integration tests.

---

## 5. Graph-as-Code System

### 5.1 Overview

Developers define agent graphs as TypeScript classes. The CLI compiles these to static JSON at build time. The compiled JSON is deployed with the Backend API and synced to the primary database at boot time.

### 5.2 `packages/compiler` — Translation Library

#### `@Agent` Decorator and `AgentGraph` Base Class

The `@Agent` decorator attaches metadata to the class. `AgentGraph` provides the builder API for declaring nodes and edges. `compile()` reflects on both to produce the canonical `AgentGraphDefinition`.

```typescript
// packages/compiler/src/decorators.ts

interface AgentMeta {
  handle:         string;
  name:           string;
  description?:   string;
  trigger:        TriggerConfig;
  concurrency?:   Partial<ConcurrencyConfig>;
  retry?:         Partial<RetryConfig>;
  timeout?:       number;
  invocationAuth?: InvocationAuthConfig;
  // Per-field override map. true = admin can change, false = locked.
  // Pass a boolean to set all fields at once.
  overridable?:   boolean | Partial<Record<string, boolean>>;
}

function Agent(meta: AgentMeta): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata("magicaal:agent", meta, target);
  };
}

// packages/compiler/src/graph.ts

abstract class AgentGraph {
  private _nodes = new Map<string, NodeDefinition>();
  private _edges: EdgeDefinition[]  = [];

  // Register a node and return it for chaining
  protected node<T extends NodeConfig>(id: string, type: string, config: T): T {
    this._nodes.set(id, { id, type, config });
    return config;
  }

  // Unconditional edge
  protected connect(from: string, to: string): void {
    this._edges.push({ id: `${from}→${to}`, from, to, type: "unconditional" });
  }

  // Conditional edge — condition is a JSONata expression
  protected when(from: string, condition: string, to: string): void {
    this._edges.push({ id: `${from}?${to}`, from, to, type: "conditional", condition });
  }

  // Fallback edge — taken when no conditional edges match
  protected otherwise(from: string, to: string): void {
    this._edges.push({ id: `${from}|${to}`, from, to, type: "fallback" });
  }

  // Called by compile() to materialize the graph
  abstract build(): void;

  // Internal — compile() calls this after build()
  _snapshot(): { nodes: Map<string, NodeDefinition>; edges: EdgeDefinition[] } {
    return { nodes: this._nodes, edges: this._edges };
  }
}
```

#### Minimal Code-Defined Agent

```typescript
// src/agents/issue-triage.agent.ts

@Agent({
  handle:      "issue-triage-agent",
  name:        "GitHub Issue Triage",
  trigger:     { type: "integration", service: "github", event: "issues.opened" },
  concurrency: { maxParallel: 20 },
  overridable: false,
  invocationAuth: { strategy: "api-key", overridable: true },
})
class IssueTriage extends AgentGraph {
  build() {
    this.node("start",    "core:start",                   { inputSchema: GitHubIssueSchema });
    this.node("classify", "core:llm-call",                { model: "claude-sonnet-4-6", prompt: { ref: "issue-classifier" } });
    this.node("guard",    "core:guardrail",               { rules: ["content-policy"] });
    this.node("route",    "core:router",                  { expression: "$.label" });
    this.node("notify",   "integration:slack:post-message",{ connection: "eng-workspace", channel: "#triage", text: "$.summary" });
    this.node("skip",     "core:log",                     { level: "info", message: "Issue filtered by guardrail" });
    this.node("end",      "core:end",                     {});

    this.connect("start",    "classify");
    this.connect("classify", "guard");
    this.when(  "guard",     "$.passed == true",  "route");
    this.otherwise("guard",                       "skip");
    this.when(  "route",     "$.label == 'bug'",  "notify");
    this.otherwise("route",                       "skip");
    this.connect("notify",   "end");
    this.connect("skip",     "end");
  }
}
```

#### `compile()` Function

```typescript
// packages/compiler/src/compile.ts

function compile(AgentClass: typeof AgentGraph): AgentGraphDefinition {
  const meta: AgentMeta = Reflect.getMetadata("magicaal:agent", AgentClass);
  if (!meta) throw new CompileError(`@Agent decorator missing on ${AgentClass.name}`);

  const instance = new AgentClass();
  instance.build();
  const { nodes, edges } = instance._snapshot();

  // Resolve all node types against the compiler's type registry
  for (const [id, node] of nodes) {
    if (!nodeTypeRegistry.has(node.type))
      throw new CompileError(`Unknown node type "${node.type}" on node "${id}"`);
  }

  // Validate connectivity — every non-Start node must have at least one inbound edge
  validateConnectivity(nodes, edges);

  return {
    version: GRAPH_SCHEMA_VERSION,
    handle:  meta.handle,
    name:    meta.name,
    entry:   findEntryNode(nodes),
    nodes:   Object.fromEntries(nodes),
    edges,
    config:  buildConfig(meta),
  };
}
```

### 5.3 `packages/cli` — Build Tool

| Command | Description |
|---|---|
| `magicaal build` | Discover, compile, and write agent JSON to the output directory |
| `magicaal validate` | Compile and validate without writing output |
| `magicaal list` | List discovered agent files and their handles |

File discovery scans `**/*.agent.ts` by convention (default: `./src/agents`). Overridable via `magicaal.config.ts`. Build output: `{handle}.agent.json` per agent + `agents.manifest.json` with content hashes.

### 5.4 Boot-Time Sync (Backend API)

Runs before the API begins accepting traffic. The algorithm is deliberately non-destructive — errors on individual agents are logged and skipped; they do not halt startup.

```
function bootTimeSync(agentsDir):
  manifest = readManifest(agentsDir / "agents.manifest.json")
  results  = { inserted: [], updated: [], stale: [], errors: [] }

  for each entry in manifest.agents:
    try:
      json     = readAndParseJSON(agentsDir / entry.handle + ".agent.json")
      validated = validateAgainstCoreSchema(json)       // throws on invalid

      existing = db.agents.findByHandle(entry.handle, tenantId)

      if not existing:
        agent   = db.agents.insert({ handle, authoring_mode: "code", enabled: false })
        version = db.agent_versions.insert({ agent_id, graph_json, content_hash: entry.hash })
        db.agents.update(agent.id, { current_version_id: version.id })
        results.inserted.push(entry.handle)

      else if existing.currentVersion.content_hash != entry.hash:
        version = db.agent_versions.insert({ agent_id: existing.id, graph_json, content_hash: entry.hash })
        syncConfig(existing.id, json.config, resolveOverrideMap(existing))
        db.agents.update(existing.id, { current_version_id: version.id })
        results.updated.push(entry.handle)
      // else: hash unchanged — no action

    catch error:
      results.errors.push({ handle: entry.handle, error: error.message })
      // continue to next agent

  // Flag agents present in DB but absent from manifest
  for each agent in db.agents.findCodeDefined(tenantId):
    if not manifest.agents.some(e => e.handle == agent.handle):
      db.agents.update(agent.id, { stale: true })
      results.stale.push(agent.handle)

  db.sync_events.insert({ ...results, completed_at: now() })
  return results

function syncConfig(agentId, incomingConfig, overrideMap):
  current = db.agent_config.find(agentId)
  for each field in incomingConfig:
    if overrideMap[field] == "locked" or current[field] is null:
      db.agent_config.update(agentId, { [field]: incomingConfig[field] })
    // else: field is admin-overridable and already set — preserve existing value
```

---

## 6. Web Application (Studio + Admin)

### 6.1 Design Approach

A single deployable service. Datastar drives all server-rendered UI. The graph canvas is a dedicated client-side island. All other UI is server-rendered and Datastar-driven.

### 6.2 Role-Based Views

| View | Minimum Role |
|---|---|
| Admin Panel | Tenant Admin |
| Studio | Developer |
| Run History / Monitoring | Viewer |

### 6.3 Studio

**Graph Canvas**
Fully interactive for Studio-built agents. Read-only for code-defined agents. Nodes display live execution state during test runs via SSE events. Nodes can be placed into named collapsible groups — canvas-only, no execution effect.

**Graph Lint Panel**
Pre-publish static analysis: unreachable nodes, missing connections, conditional edges with no fallback, cycle edges on non-Loop nodes, unresolved node type references, missing Integration Connection config. Lint errors block publish; warnings allow publish with acknowledgment.

**Node Palette**
All available node types grouped by category. Integration nodes grouped by service. "Browse Marketplace" entry at the bottom of each category. Newly installed packages surface without page reload via Datastar SSE push. Nodes with unconfigured Integration Connections show a "not connected" indicator.

**Node Configuration Panel**
Interactive for Studio-built agents; read-only for code-defined agents. Expression fields offer two togglable modes: Value Picker (upstream reference → auto-generated JSONata) and Expression Editor (raw JSONata, syntax highlighting, autocomplete, inline preview against last test run's context snapshot). Integration nodes show a connection selector with current status.

**Agent Configuration Panel**
Trigger type and settings, concurrency, retry, timeout, deployment metadata. Admin-overridable fields editable for code-defined agents; locked fields show a code-source indicator.

**AI Assistant Panel**
Graph-aware AI panel. Suggests and applies modifications (Studio-built agents), explains node behavior, debugs failed runs, generates TypeScript equivalents for code-defined agents, recommends integration nodes.

**Run / Test Panel**
Execute the current graph with a test input payload. Per-node execution status, input/output inspection, timing, and full execution log. ReAct and Planner trajectories displayed inline.

**Test Case Library Panel**
Named test cases per agent: input payload + output assertions (exact match, JSON Schema, Evaluate-based). Run full suite; view pass/fail per case with assertion-level drill-down.

**Version History Panel**
Studio-built agents: publish-snapshot versioning with side-by-side JSON diff and rollback (creates a new DRAFT). Code-defined agents: sync-event-derived versions with diff view; no rollback.

**Prompt Version Panel**
Per-agent view of named Prompt Versions referenced by LLM nodes. Create, diff, and promote versions without republishing the agent graph.

### 6.4 Admin

**Dashboard**
Active agents, run counts by status, resource utilization, error highlights, integration connection health, sync status, license grace period indicator.

**User Management**
Create, edit, deactivate users. Assign roles per tenant.

**Tenant Management**
Resource limits, default invocation auth, default rate limit, allowed node types, default LLM config, community packages opt-in.

**Agent Registry**
All agents with Studio-built vs. code-defined indicators. Enable/disable, force-cancel runs, navigate to telemetry. Stale agents flagged.

**Integration Connections**
OAuth connections: "Connect" initiates the authorization flow via Backend API. API key connections: key entered and stored encrypted. Shows status, last-used, and expiry. One-click reconnect for expired tokens. Multiple same-service connections supported.

**MCP Server Management**
Register MCP servers (stdio or HTTP/SSE). Test connectivity. View agent references. Admin-managed allowlist prevents SSRF via tenant-authored MCP connections.

**Prompt Version Management**
Tenant-wide view of all named Prompt Versions. Create, label, compare, promote. Promotion takes effect on the next run without graph republish.

**Node & Integration Marketplace**
MagiCaal Account panel, installed packages, live catalog browsing (or local offline file), install/update/remove for all five asset types, paid asset purchase linking, license management, air-gapped bundle upload, community package policy.

**Invocation Auth**
Auth strategy and rate limits per agent and as tenant defaults. Invocation key management. JWT config. Invocation audit log.

**Human Review Queue**
All suspended runs awaiting review. Approve, reject, or supply modified context value.

**Data Sources**, **Auth & Security**, **System Settings** as described.

---

## 7. Backend API

### 7.1 Responsibilities

Sole interface between the web app and all backend services. Owns: authentication, session management, all CRUD against the primary database, boot-time sync, OAuth callback handling, marketplace operations, and engine gateway.

All public routes versioned under `/v1/`. Breaking changes introduced in `/v2/` with a deprecation period.

### 7.2 Route Groups

| Route Prefix | Description |
|---|---|
| `POST /v1/auth/login` | Login — returns JWT + refresh token |
| `POST /v1/auth/logout` | Revoke session |
| `POST /v1/auth/refresh` | Refresh access token |
| `/v1/users` | User CRUD, role assignment |
| `/v1/tenants` | Tenant CRUD, resource limits, default invocation policy |
| `/v1/agents` | Agent definition CRUD |
| `GET  /v1/agents/:id/versions` | Version history |
| `GET  /v1/agents/:id/versions/:vId/diff` | JSON diff between two versions |
| `POST /v1/agents/:id/versions/:vId/rollback` | New DRAFT from prior version |
| `/v1/agents/:id/runs` | Run invocation (proxied to engine), run history |
| `/v1/agents/:id/runs/:runId/stream` | SSE stream of live run events |
| `/v1/agents/:id/config` | Trigger, concurrency, lifecycle config |
| `/v1/agents/:id/invocation-policy` | Invocation auth strategy, rate limits |
| `/v1/agents/:id/invocation-keys` | Per-agent invocation key management |
| `GET  /v1/agents/:id/schema/input` | Declared input JSON Schema |
| `GET  /v1/agents/:id/schema/output` | Declared output JSON Schema |
| `/v1/agents/:id/test-cases` | Test case CRUD |
| `POST /v1/agents/:id/test-cases/run` | Run full test suite |
| `/v1/prompts` | Prompt Version CRUD — create, list, diff, promote |
| `/v1/nodes` | List available node types and their schemas |
| `/v1/datasources` | Data source CRUD, connection testing |
| `/v1/mcp-servers` | MCP server CRUD, connectivity testing |
| `/v1/integrations` | List integration types |
| `/v1/integrations/connections` | Integration Connection CRUD |
| `POST /v1/integrations/connections/:id/reconnect` | Initiate OAuth reconnect |
| `GET  /v1/integrations/oauth/:service/callback` | OAuth authorization callback |
| `/v1/marketplace/account` | Link/unlink MagiCaal Account |
| `/v1/marketplace/catalog` | Fetch and cache catalog |
| `/v1/marketplace/packages` | Installed packages list |
| `POST /v1/marketplace/packages/:id/install` | Download, verify, install, signal engine |
| `POST /v1/marketplace/packages/:id/update` | Update to newer version |
| `DELETE /v1/marketplace/packages/:id` | Remove package |
| `/v1/marketplace/licenses` | List licenses for the linked account |
| `POST /v1/marketplace/licenses/bundle` | Upload air-gapped license bundle |
| `POST /v1/marketplace/templates/import` | Template Import Wizard |
| `POST /v1/marketplace/prompt-packs/import` | Import prompt pack |
| `/v1/keys` | Platform API key management |
| `/v1/telemetry` | Run metrics, token usage, Evaluate score history |
| `GET  /v1/openapi.json` | OpenAPI 3.x spec for all v1 routes |
| `GET  /v1/llm/health` | Live health state per LLM provider Integration Connection: circuit state, P50 latency, error rate, rate limit status and reset time. Readable without full admin auth — available to the client SDK and external dashboards. |
| `GET  /v1/llm/router-policies` | List named router policies for the current tenant |
| `POST /v1/llm/router-policies` | Create a named router policy |
| `PATCH /v1/llm/router-policies/:id` | Update a named router policy (strategy, targets, triggers, overridable flag) |
| `DELETE /v1/llm/router-policies/:id` | Delete a named router policy; agents referencing it are flagged |
| `GET  /v1/system/provider-pricing` | Get the full provider pricing table (provider, model, prompt/completion cost, context window) |
| `POST /v1/system/provider-pricing` | Create or update one or more provider pricing entries without a deploy |
| `/v1/system` | Health, settings, sync status |

### 7.3 Auth Middleware

```typescript
// apps/api/src/middleware/auth.ts  (illustrative)

async function authMiddleware(req, res, next) {
  const token = extractBearer(req.headers.authorization);
  if (!token) return res.status(401).json(unauthorized());

  const identity =
    token.startsWith("mk_")          // platform/tenant API key prefix
      ? await resolveApiKey(token)
      : await verifyJwt(token);

  if (!identity) return res.status(401).json(unauthorized());

  // RBAC check against the route's required role
  const required = routeRoleMap[req.method + " " + req.route.path];
  if (!hasRole(identity, required))
    return res.status(403).json(forbidden());

  req.identity = identity;   // { userId, tenantId, role }
  next();
}
```

### 7.4 Structured Error Responses

All API errors return a consistent shape:

```typescript
interface ApiError {
  code:     string;   // e.g. "AGENT_NOT_FOUND", "RATE_LIMIT_EXCEEDED"
  message:  string;   // human-readable
  details?: Record<string, unknown>;
}
```

### 7.5 Engine Gateway

Run invocation and telemetry queries are proxied to the engine's internal API, enriched with tenant context. The engine's internal API shape evolves independently of the public API.

### 7.6 OAuth Callback Handler

Manages the OAuth 2.0 authorization code flow for Integration Connections. Stores a short-lived state parameter before redirect. On callback, validates state, exchanges the authorization code for tokens, encrypts and persists the token set. Token refresh handled automatically at runtime by the Integration Credential Resolver.

---

## 8. Agent Engine

### 8.1 Core Concepts

**Node** — Fundamental unit of computation. Three-phase lifecycle: Prepare, Execute, Finalize.

**Edge** — Directed connection: unconditional, conditional (JSONata boolean), or fallback.

**Graph** — Complete agent definition as JSON. Single entry node, one or more terminal nodes.

**Run** — Single execution instance tracked via the `Run` type defined in `packages/core`.

**Step** — Execution record for a single node tracked via the `Step` type.

**Execution Context** — The mutable JSON envelope passed through the graph during execution:

```typescript
// packages/sdk/src/context.ts

interface ExecutionContext {
  // Identity (read-only)
  readonly runId:       string;
  readonly agentId:     string;
  readonly tenantId:    string;
  readonly triggerType: string;

  // Data envelope — the primary shared state
  data: Record<string, unknown>;

  // Read a top-level or dot-path key from data
  get<T = unknown>(key: string): T | undefined;

  // Write a value into data
  set(key: string, value: unknown): void;

  // Evaluate a JSONata expression against current data
  evaluate(expression: string): Promise<unknown>;

  // Resolve the active string content of a named Prompt Version
  resolvePrompt(name: string): Promise<string>;

  // Injected at Prepare phase — read-only inside node execution
  readonly credentials: Record<string, ResolvedCredentials>;

  // Observability helpers
  log(level: "debug" | "info" | "warn" | "error", message: string, meta?: Record<string, unknown>): void;
  metric(name: string, value: number): void;
  recordTokenUsage(usage: TokenUsage): void;     // called internally by LLM nodes
  recordTrajectoryStep(step: TrajectoryStep): void; // called internally by ReAct/Planner
}
```

### 8.2 Engine Subsystems

**Node Registry**
Loaded at startup from `packages/nodes`, enabled integration packages, and packages registered in the database. Maps node type identifiers to implementation modules.

Runtime loading: subscribes to a Redis pub/sub channel for package install events. On receiving an event, runs the Package Signature Verifier, loads the module, and registers its node types. Hot-loading makes new types available to subsequent runs without restart. In-flight runs use the registry snapshot captured at their start time.

**Package Signature Verifier**
Runs inline during the install flow before any package is registered:
1. Publisher signature verified against the publisher public key in the package manifest.
2. Content hash verified against the hash in the marketplace catalog.
3. Official packages additionally verified against the MagiCaal team countersignature.

Failures reject the package with a descriptive error.

**Graph Loader**
Reads, validates, and caches parsed agent graphs. Cache invalidation via Redis pub/sub on agent definition update or Prompt Version promotion.

```typescript
// apps/engine/src/graph-loader.ts (illustrative)

class GraphLoader {
  private cache = new Map<string, ParsedGraph>();

  async load(agentId: string, versionId: string): Promise<ParsedGraph> {
    const key = `${agentId}:${versionId}`;
    if (this.cache.has(key)) return this.cache.get(key)!;

    const version = await db.agent_versions.find(versionId);
    const def     = JSON.parse(version.graph_json) as AgentGraphDefinition;

    validateSchema(def);                    // throws on malformed graph
    resolveNodeTypes(def, nodeRegistry);    // throws on unknown node type

    const parsed = buildParsedGraph(def);
    this.cache.set(key, parsed);
    return parsed;
  }

  invalidate(agentId: string): void {
    for (const key of this.cache.keys())
      if (key.startsWith(agentId)) this.cache.delete(key);
  }
}
```

**Invocation Auth Validator**
Intercepts all incoming run requests before the Run Scheduler. Resolves effective policy (agent-level overrides tenant default), validates strategy, enforces rate limits, rejects before any run record is created.

**Run Scheduler**
Consumes pending run jobs, enforces per-tenant concurrency limits, dispatches to available workers.

**Execution Worker**
Core of the engine. Traverses the graph and drives each node through its lifecycle. For agent nodes (ReAct, Tool Call), delegates to the Tool Executor for each LLM iteration.

```
function executeRun(run, graph):
  context = buildContext(run)
  queue   = [graph.entryNode]
  visited = new Set()

  while queue is not empty:
    node = queue.shift()
    if visited.has(node.id): continue
    visited.add(node.id)

    parallelBranches = getParallelBranches(node, graph)

    if parallelBranches.length > 1:
      results   = await Promise.all(parallelBranches.map(n => executeNode(n, context)))
      joinNode  = findJoinNode(parallelBranches, graph)
      mergeParallelOutputs(results, context)
      nextNodes = resolveEdges(joinNode, context, graph)

    else:
      result = await executeNode(node, context)

      if result.status == "suspended":
        persistSuspendedState(run, context, node.id)
        return { status: "suspended" }

      if result.status == "failed":
        if isRetryable(result) and attemptsRemaining(run, node):
          requeueWithBackoff(run, node)
          return { status: "pending" }
        return { status: "failed", error: result.error }

      nextNodes = resolveEdges(node, context, graph)

    queue.push(...nextNodes)

  persistOutput(run, context.data)
  return { status: "completed", output: context.data }

function resolveEdges(node, context, graph):
  outbound = graph.edgesFrom(node.id)   // only flow edges; toolEdges excluded

  matched = outbound
    .filter(e => e.type == "conditional")
    .filter(e => context.evaluate(e.condition) == true)

  if matched.length > 0:
    return matched.map(e => graph.node(e.to))

  fallback = outbound.filter(e => e.type in ["fallback", "unconditional"])
  return fallback.map(e => graph.node(e.to))

async function executeNode(node, context):
  impl = nodeRegistry.get(node.type)
  step = createStep(node, context)

  try:
    resolvedConfig = await resolveConfig(node.config, context)
    await injectCredentials(node, context)
    output = await impl.execute(context, resolvedConfig)
    step.status  = output.status
    step.outputs = output.outputs

    if output.status == "complete":
      mergeOutputs(output.outputs, context)

  catch error:
    step.status = "failed"
    step.error  = formatError(error)

  persistStep(step)
  broadcastSSEEvent(context.runId, node.id, step.status)
  return { status: step.status, outputs: step.outputs, error: step.error }
```

**Tool Executor**
Handles the LLM iteration loop inside agent nodes (ReAct, Tool Call). Called by the Execution Worker when it encounters a `core:react` or `core:tool-call` node.

```
async function runAgentLoop(node, context, graph):
  config       = node.config
  tools        = await assembleTools(node.id, graph, context)
  conversation = [{ role: "user", content: context.get(config.inputKey) }]
  iteration    = 0

  while iteration < config.maxIterations:
    iteration++
    // Build a canonical request — no node knows which provider it will call
    canonicalReq = buildCanonicalRequest(config.systemPrompt, conversation, tools, config.agentMode)
    routerCfg    = resolveRouterConfig(node, graph, context.tenantPolicy)
    // routerCfg resolution order: node-level inline > node-level named ref >
    //   graph defaultRouter > tenant NamedRouterPolicy (locked if overridable: false)
    llmResponse  = await routerEngine.routedLLMCall(canonicalReq, routerCfg, context)
    // routedLLMCall selects provider, translates via ProviderAdapter, handles fallback,
    // and populates llmResponse.routingMeta for telemetry

    if agentMode == "react":
      recordTrajectoryStep(context, iteration, llmResponse.reasoning, null, null)

    if llmResponse.toolCalls is empty:
      context.set(config.outputKey, llmResponse.content)
      return { status: "complete", outputs: { [config.outputKey]: llmResponse.content } }

    toolResults = agentMode == "tool-call"
      ? await Promise.all(llmResponse.toolCalls.map(tc => invokeTool(tc, tools, graph, context)))
      : [await invokeTool(llmResponse.toolCalls[0], tools, graph, context)]

    if agentMode == "react":
      for each result in toolResults:
        recordTrajectoryStep(context, iteration, null, result.toolName, result.content)

    conversation.push({ role: "assistant", content: llmResponse.raw })
    conversation.push({ role: "tool",      content: formatToolResults(toolResults) })

  return { status: "failed", error: { code: "MAX_ITERATIONS_REACHED", retryable: false } }


async function assembleTools(agentNodeId, graph, context):
  tools = []

  // Graph-native Tool nodes and MCP Client funnels (via tool edges)
  for each toolEdge where toolEdge.to == agentNodeId:
    sourceNode = graph.node(toolEdge.from)

    if sourceNode.type == "core:tool":
      tools.push({
        name: sourceNode.config.name, description: sourceNode.config.description,
        inputSchema: sourceNode.config.inputSchema, source: "graph", nodeId: sourceNode.id,
      })
    else if sourceNode.type == "core:mcp-client":
      mcpTools = await mcpClient(sourceNode.config, context.credentials).listTools()
      for each mcpTool in mcpTools:
        tools.push({
          name: mcpTool.name, description: mcpTool.description,
          inputSchema: mcpTool.inputSchema, source: "mcp",
          nodeId: sourceNode.id, mcpToolName: mcpTool.name,
        })

  // Workspace tools — auto-registered when workspace enters READY state
  for each workspaceEdge where workspaceEdge.to == agentNodeId
      and workspaceEdge.edgeRole == "agent-registration":
    workspaceNode = graph.node(workspaceEdge.from)
    workspaceId   = context.get(workspaceNode.config.outputKey ?? "_workspace_id")
    if workspaceId and workspaceStatus(workspaceId) == "ready":
      for each wsTool in workspaceContainerManager.getAvailableTools(workspaceId):
        tools.push({
          name: wsTool.name, description: wsTool.description,
          inputSchema: wsTool.inputSchema, source: "workspace",
          workspaceId, wsToolType: wsTool.type,
        })

  return tools


async function invokeTool(toolCall, tools, graph, context):
  tool = tools.find(t => t.name == toolCall.name)
  if not tool:
    return { toolName: toolCall.name, content: [{ type: "text", text: "Unknown tool: " + toolCall.name }] }

  // Permission check before any invocation (workspace tools + graph tools via Code node policy)
  if tool.source == "workspace":
    permResult = permissionEnforcer.check(
      tool, tool.wsToolType, toolCall.operation, toolCall.arguments, context
    )
    if permResult.denied:
      recordPermissionDenial(context.runId, tool, toolCall, permResult.rule)
      return { toolName: toolCall.name, content: [{ type: "text", text: JSON.stringify({
        error: "PERMISSION_DENIED", message: permResult.message,
      })}]}

  if tool.source == "graph":     return await invokeGraphTool(tool.nodeId, toolCall.arguments, graph, context)
  if tool.source == "mcp":       return await invokeMcpTool(tool.nodeId, tool.mcpToolName, toolCall.arguments, context)
  if tool.source == "workspace": return await invokeWorkspaceTool(tool.workspaceId, tool.wsToolType, toolCall.arguments)


async function invokeWorkspaceTool(workspaceId, wsToolType, arguments):
  return await workspaceContainerManager.executeTool(workspaceId, wsToolType, arguments)
```

**Workspace Container Manager**
Provisions, manages, and tears down workspace Docker containers. Lifecycle:

```
async provisionWorkspace(config, sessionId, tenantId, runContext):
  image  = resolveImage(config.environment)  // pull if not cached; validates against tenant allowlist
  volume = createVolume(sessionId)           // unique per session; disk-quota-enforced
  container = docker.createContainer({
    image,
    volumes:    [{ source: volume, target: "/workspace" }],
    env:        resolveEnvVars(config, runContext),
    resources:  config.environment.resources,
    network:    buildNetworkPolicy(config.environment),
    user:       "agent",           // non-root; no extra capabilities
    labels:     { "magicaal.workspace": "true", "magicaal.tenant": tenantId },
  })
  docker.start(container)

  // Clone with credential helper sidecar (credentials never written to container env)
  runWithCredentialSidecar(container, config.gitCredentials, () =>
    gitClone(container, config.repository)
  )

  if config.environment.useDevContainer:
    applyDevContainer(container, resolveDevContainerSpec("/workspace/.devcontainer"))
  else if config.environment.dockerfile:
    buildAndApplyDockerfile(container, config.environment.dockerfile)

  runSetupCommands(container, config.environment.setupCommands)

  // Run afterBoot lifecycle hooks
  runHooks(container, config.hooks?.afterBoot, sessionId, tenantId)

  // Start MCP sidecar for extensibility (optional; available for MCP Client funnel)
  startMCPSidecar(container)

  db.workspaces.insert({
    sessionId, tenantId, containerId: container.id,
    volumeName: volume, status: "ready", config,
  })
  return container.id


async executeTool(workspaceId, toolType, operation, args, permissions):
  // Permission check is handled by Permission Enforcer before this is called
  container = db.workspaces.find(workspaceId).containerId
  switch toolType:
    case "bash":
      return docker.exec(container, ["bash", "-c", args.command], {
        workingDir: "/workspace/" + (args.workingDirectory ?? ""),
        timeout:    args.timeoutSeconds ?? 30,
      })
    case "file":   return executeFileOperation(container, operation, args)
    case "git":    return executeGitOperation(container, operation, args)
    case "process": return executeProcessOperation(container, operation, args)


async teardownWorkspace(workspaceId, config):
  container = db.workspaces.find(workspaceId).containerId
  runHooks(container, config.hooks?.beforeTeardown)
  if config.onTeardown?.autoCommit:
    executeInContainer(container, `git add -A && git commit -m "${config.onTeardown.autoCommit}"`)
  if config.onTeardown?.push:
    runWithCredentialSidecar(container, config.gitCredentials, () =>
      executeInContainer(container, "git push")
    )
  docker.stop(container)
  docker.removeContainer(container)
  docker.removeVolume(container)
  db.workspaces.update(workspaceId, { status: "stopped" })
```

Auto-registration: when a workspace enters READY state, the Container Manager publishes a `workspace.ready` event with `{ workspaceId, agentNodeIds: [...] }`. Each agent node that has a workspace edge from the workspace node receives the event and updates its assembled tool list for subsequent LLM iterations.

**Permission Enforcer**
Evaluates the three-tier permission hierarchy (tenant → workspace → agent) before any workspace tool invocation — whether agent-mediated or direct-flow.

```
class PermissionEnforcer:
  check(tool, toolType, operation, args, context):
    policy = mergeHierarchy(
      db.tenants.find(context.tenantId).permissionPolicy,  // floor; cannot be overridden
      resolveWorkspacePolicy(context),
      resolveAgentNodePolicy(context)                      // can only add deny rules
    )

    // Deny rules evaluated first across all tiers; deny always wins
    for each rule in policy.rules where rule.effect == "deny":
      if matchesRule(rule, toolType, operation, args):
        return {
          denied:  true,
          message: rule.message ?? "Operation not permitted",
          rule:    rule,
        }

    if policy.defaultPosture == "deny":
      hasAllow = policy.rules.some(r => r.effect == "allow" and matchesRule(r, toolType, operation, args))
      if not hasAllow:
        return { denied: true, message: "Operation not permitted by default-deny posture" }

    return { denied: false }


  matchesRule(rule, toolType, operation, args):
    if rule.tool != "*" and rule.tool != toolType:    return false
    if rule.operations?.length and not rule.operations.includes(operation): return false
    for each condition in (rule.conditions ?? []):
      if not evaluateCondition(condition, args): return false
    return true
```

Denials are recorded in the run trace as `workspace_permission_denied` step events: tool, operation, args summary (no sensitive values), the matching rule, and the message returned to the LLM. Visible in the session detail telemetry view.
Maintains active SSE connections. Dispatches node-level state change events to Studio clients and API consumer clients. In a horizontally scaled deployment, events are also published to Redis pub/sub so SSE connections on other engine instances receive them.

**License Validator**
Background process, runs hourly. Sends heartbeat to Marketplace API with the list of licensed asset IDs. On failure, starts a 72-hour grace period. Assets remain functional throughout the grace period and are never hard-disabled mid-run.

**Usage Reporter**
Background process, runs daily. Aggregates per-asset invocation counts from the Usage Counters table and reports to the Marketplace API. No payload, context, or user data included.

**Lifecycle Manager**
Tracks all active runs. Handles state transitions, cancellation, suspended run resumption, and timeout enforcement.

**Loop Manager**
Cycle-edge traversal for looping agents. Tracks iteration counts per run; enforces max iteration limits.

**Code Node Sandbox**
User JavaScript in an isolated VM. Scoped context access. No network or filesystem access by default. Configurable timeout and memory limits.

**Community Package Sandbox**
Community packages execute in an isolated VM. Network access limited to declared service domain. Undeclared outbound connections and filesystem access blocked.

**Integration Credential Resolver**
At the Prepare phase of integration nodes: resolves the referenced Integration Connection, decrypts credentials, checks token expiry (triggers OAuth refresh if needed), and injects credentials into the node's execution context. Credentials never written to telemetry or run records.

**Dry Run Executor** *(Phase 4)*
Activated by `dry_run: true` on the run request. LLM nodes return configured stub responses; integration and HTTP nodes return mock responses. Produces a complete step-level trace without real API calls.

### 8.3 Template Import Wizard

1. **Dependency check**: Missing node packages listed with marketplace availability and cost.
2. **Parameterization**: Typed form for declared template parameters; values replace placeholder tokens in the graph JSON.
3. **Canvas preview**: Read-only preview of the resolved graph.
4. **Agent creation**: Resolved graph JSON written as a new DRAFT agent. Fully independent Studio-editable agent from this point.

### 8.4 Trigger System

| Trigger Type | Description |
|---|---|
| **REST API** | HTTP POST; sync or async; subject to invocation auth |
| **Scheduled (Cron)** | Cron expression; internal; bypasses invocation auth |
| **Webhook** | Unique inbound URL; subject to invocation auth |
| **Integration Trigger** | External service event; service request signing validated; invocation auth bypassed |
| **Sub-graph / Handoff** | Internal agent-to-agent delegation; bypasses invocation auth |
| **Manual (Studio)** | Test run; uses platform session auth |

### 8.5 Run Lifecycle States

```
PENDING → RUNNING → COMPLETED
                 ↘ SUSPENDED → RUNNING (resumed)
                 ↘ FAILED
                 ↘ CANCELLED
```

Agent deployment states: `DRAFT → PUBLISHED → DEPRECATED`

### 8.6 Internal REST API

| Method | Route | Description |
|---|---|---|
| POST | `/runs` | Enqueue a new run |
| GET | `/runs/:id` | Run status, metadata, and output |
| GET | `/runs/:id/steps` | Step-level detail including token usage |
| DELETE | `/runs/:id` | Cancel an active or pending run |
| POST | `/runs/:id/review` | Submit Human Review response |
| GET | `/agents/:id/runs` | List runs for an agent |
| POST | `/agents/:id/deploy` | Publish a new agent version |
| GET | `/agents/:id/schema/input` | Declared input JSON Schema |
| GET | `/agents/:id/schema/output` | Declared output JSON Schema |
| GET | `/telemetry/metrics` | Aggregated run metrics |
| GET | `/telemetry/tokens` | Token usage aggregations |
| GET | `/telemetry/trajectory/:runId` | Full trajectory record |
| GET | `/health` | Worker pool status, active run count |

---

## 9. Database

### 9.1 Primary Database (SQLite, WAL Mode)

Key table definitions. All IDs are `TEXT` UUIDs. Timestamps are Unix milliseconds stored as `INTEGER`.

```sql
-- Core agent tables

CREATE TABLE agents (
  id                  TEXT PRIMARY KEY,
  tenant_id           TEXT NOT NULL REFERENCES tenants(id),
  handle              TEXT,             -- null for studio-built agents
  name                TEXT NOT NULL,
  authoring_mode      TEXT NOT NULL CHECK (authoring_mode IN ('studio', 'code')),
  current_version_id  TEXT,             -- FK set after first version insert
  template_source_id  TEXT,             -- marketplace asset_id if imported from template
  stale               INTEGER NOT NULL DEFAULT 0,
  enabled             INTEGER NOT NULL DEFAULT 1,
  created_at          INTEGER NOT NULL,
  updated_at          INTEGER NOT NULL,
  UNIQUE (tenant_id, handle)
);

CREATE TABLE agent_versions (
  id             TEXT PRIMARY KEY,
  agent_id       TEXT NOT NULL REFERENCES agents(id),
  graph_json     TEXT NOT NULL,   -- full AgentGraphDefinition as JSON string
  content_hash   TEXT NOT NULL,   -- SHA-256 of graph_json
  version_number INTEGER NOT NULL,
  publish_notes  TEXT,
  sync_event_id  TEXT,            -- set for code-defined agents; null for studio-built
  created_by     TEXT NOT NULL REFERENCES users(id),
  created_at     INTEGER NOT NULL,
  UNIQUE (agent_id, version_number)
);

CREATE TABLE agent_config (
  agent_id         TEXT PRIMARY KEY REFERENCES agents(id),
  trigger_config   TEXT NOT NULL,    -- JSON
  concurrency      TEXT NOT NULL,    -- JSON
  retry            TEXT NOT NULL,    -- JSON
  timeout_ms       INTEGER,
  override_map     TEXT NOT NULL DEFAULT '{}',   -- JSON: field → "locked"|"overridable"
  updated_at       INTEGER NOT NULL
);

-- Invocation

CREATE TABLE invocation_policies (
  agent_id         TEXT PRIMARY KEY REFERENCES agents(id),
  strategy         TEXT NOT NULL CHECK (strategy IN ('api-key', 'jwt', 'public')),
  jwt_config       TEXT,              -- JSON: issuer, jwks_url, audience, required_claims
  rate_limit       TEXT,              -- JSON: requestsPerWindow, windowSeconds, limitBy
  override_flags   TEXT NOT NULL DEFAULT '{}'   -- JSON per-field override flags
);

CREATE TABLE invocation_keys (
  id          TEXT PRIMARY KEY,
  agent_id    TEXT NOT NULL REFERENCES agents(id),
  tenant_id   TEXT NOT NULL,
  label       TEXT NOT NULL,
  key_hash    TEXT NOT NULL UNIQUE,
  last_used_at INTEGER,
  expires_at  INTEGER,
  revoked     INTEGER NOT NULL DEFAULT 0,
  created_at  INTEGER NOT NULL
);

-- Prompt Versions

CREATE TABLE prompt_versions (
  id             TEXT PRIMARY KEY,
  tenant_id      TEXT NOT NULL,
  name           TEXT NOT NULL,           -- stable slug, e.g. "issue-classifier"
  version_number INTEGER NOT NULL,
  content        TEXT NOT NULL,
  active         INTEGER NOT NULL DEFAULT 0,
  pack_namespace TEXT,                    -- set if imported from a marketplace prompt pack
  created_by     TEXT NOT NULL REFERENCES users(id),
  created_at     INTEGER NOT NULL,
  UNIQUE (tenant_id, name, version_number)
);

-- Test Cases

CREATE TABLE test_cases (
  id            TEXT PRIMARY KEY,
  agent_id      TEXT NOT NULL REFERENCES agents(id),
  tenant_id     TEXT NOT NULL,
  name          TEXT NOT NULL,
  input_payload TEXT NOT NULL,   -- JSON
  assertions    TEXT NOT NULL,   -- JSON array of assertion objects
  last_result   TEXT,            -- JSON: { passed, results[], ran_at }
  created_at    INTEGER NOT NULL,
  updated_at    INTEGER NOT NULL
);

-- Integration Connections

CREATE TABLE integration_connections (
  id              TEXT PRIMARY KEY,
  tenant_id       TEXT NOT NULL,
  service         TEXT NOT NULL,     -- e.g. "slack", "github"
  display_name    TEXT NOT NULL,
  auth_type       TEXT NOT NULL CHECK (auth_type IN ('oauth', 'apikey')),
  credentials     TEXT NOT NULL,     -- AES-256 encrypted JSON
  status          TEXT NOT NULL CHECK (status IN ('active', 'expired', 'revoked')),
  platform_wide   INTEGER NOT NULL DEFAULT 0,
  last_used_at    INTEGER,
  expires_at      INTEGER,
  created_at      INTEGER NOT NULL
);

-- Marketplace

CREATE TABLE asset_licenses (
  id                  TEXT PRIMARY KEY,
  asset_id            TEXT NOT NULL,
  license_type        TEXT NOT NULL CHECK (license_type IN ('free','one-time','subscription','usage')),
  scope               TEXT NOT NULL,      -- 'deployment' | 'account'
  expires_at          INTEGER,            -- null for perpetual licenses
  last_validated_at   INTEGER,
  grace_period_active INTEGER NOT NULL DEFAULT 0,
  created_at          INTEGER NOT NULL
);

CREATE TABLE usage_counters (
  asset_id        TEXT NOT NULL,
  period_start    INTEGER NOT NULL,   -- start of the current daily reporting period
  invocation_count INTEGER NOT NULL DEFAULT 0,
  last_reported_at INTEGER,
  PRIMARY KEY (asset_id, period_start)
);
```

### 9.2 Telemetry Store (SQLite, WAL Mode — Separate File)

```sql
-- Append-only; never updated after insert

CREATE TABLE runs (
  id             TEXT PRIMARY KEY,
  agent_id       TEXT NOT NULL,
  tenant_id      TEXT NOT NULL,
  version_id     TEXT NOT NULL,
  trigger_type   TEXT NOT NULL,
  status         TEXT NOT NULL,
  duration_ms    INTEGER,
  input_summary  TEXT,    -- truncated JSON preview; full input not stored in telemetry
  output_summary TEXT,
  created_at     INTEGER NOT NULL
);

CREATE TABLE steps (
  id                     TEXT PRIMARY KEY,
  run_id                 TEXT NOT NULL,
  agent_id               TEXT NOT NULL,
  tenant_id              TEXT NOT NULL,
  node_id                TEXT NOT NULL,
  node_type              TEXT NOT NULL,
  status                 TEXT NOT NULL,
  inputs                 TEXT,           -- JSON snapshot
  outputs                TEXT,           -- JSON snapshot
  error_code             TEXT,
  error_message          TEXT,
  prompt_tokens          INTEGER,
  completion_tokens      INTEGER,
  estimated_cost_usd     REAL,
  router_target_used     TEXT,           -- JSON: { provider, model, connectionId }
  router_attempt_count   INTEGER,        -- how many targets were tried before success
  router_trigger_history TEXT,           -- JSON array of RouterTriggerEvent; null if no fallback occurred
  started_at             INTEGER NOT NULL,
  completed_at           INTEGER
);

CREATE TABLE named_router_policies (
  id          TEXT PRIMARY KEY,
  tenant_id   TEXT NOT NULL,
  name        TEXT NOT NULL,
  config      TEXT NOT NULL,    -- JSON: ModelRouterConfig
  overridable INTEGER NOT NULL DEFAULT 1,
  created_by  TEXT NOT NULL REFERENCES users(id),
  created_at  INTEGER NOT NULL,
  updated_at  INTEGER NOT NULL,
  UNIQUE (tenant_id, name)
);

CREATE TABLE provider_pricing (
  id                       TEXT PRIMARY KEY,
  provider                 TEXT NOT NULL,
  model                    TEXT NOT NULL,
  prompt_per_1k_tokens     REAL NOT NULL,
  completion_per_1k_tokens REAL NOT NULL,
  context_window           INTEGER NOT NULL,
  updated_at               INTEGER NOT NULL,
  updated_by               TEXT REFERENCES users(id),
  UNIQUE (provider, model)
);

CREATE TABLE trajectories (
  id            TEXT PRIMARY KEY,
  run_id        TEXT NOT NULL,
  step_id       TEXT NOT NULL REFERENCES steps(id),
  iteration     INTEGER NOT NULL,
  reasoning     TEXT,           -- LLM's reasoning text
  tool_selected TEXT,           -- node type chosen as tool
  tool_inputs   TEXT,           -- JSON
  tool_outputs  TEXT,           -- JSON
  llm_response  TEXT,
  created_at    INTEGER NOT NULL
);

CREATE TABLE evaluate_scores (
  id         TEXT PRIMARY KEY,
  run_id     TEXT NOT NULL,
  agent_id   TEXT NOT NULL,
  node_id    TEXT NOT NULL,
  strategy   TEXT NOT NULL,   -- 'rule' | 'llm-judge' | 'comparison'
  score      REAL NOT NULL,
  reasoning  TEXT,
  created_at INTEGER NOT NULL
);
```

---

## 10. Job Queue

### 10.1 Queue Topology

- `runs.trigger` — All inbound run requests
- `runs.scheduled` — Cron-dispatched jobs
- `runs.retry` — Runs eligible for retry
- Per-tenant priority lanes

### 10.2 Technology Tiers

| Tier | Stack | Use Case |
|---|---|---|
| **Standard** | BullMQ + Redis | Production; priorities, delayed jobs, distributed consumers |
| **Lightweight** | SQLite-backed queue | Minimal Redis-free deployments |

---

## 11. Invocation Auth

### 11.1 Policy Resolution
Agent-level overrides tenant default.

### 11.2 Auth Strategies

**`api-key`** — Per-agent invocation keys. Stored hashed, displayed only at creation, individually revocable.

**`jwt`** — Signed JWT from a trusted issuer. Engine validates signature, issuer, audience, expiry, and optional required claims.

**`public`** — No credential validation. Rate limiting strongly recommended.

### 11.3 Rate Limiting
`requestsPerWindow`, `windowSeconds`, `limitBy` (`global` / `caller` / `ip`). Counters in Redis. `429` on limit exceeded. `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` headers on all invocation API responses. Events recorded in the Invocation Log.

### 11.4 Trigger Exemptions
Integration triggers, scheduled triggers, sub-graph/handoff calls, and Studio test runs bypass invocation auth. Integration triggers use service-specific request signing.

### 11.5 Invocation Audit Log
Every external invocation attempt logged: agent, tenant, timestamp, strategy, caller identity, outcome.

---

## 12. Integration Layer

### 12.1 Integration Connections vs. Data Sources
Data Sources: query-oriented, connection-string-based. Integration Connections: operation-oriented, OAuth or API key authenticated, webhook-triggered.

### 12.2 Integration Package Structure
Each integration in `packages/integrations/[service]/` exports: node implementations, auth schema, node type manifests, optional trigger handler with service-specific signature validation, and integration tests.

### 12.3 Authentication Flows

**OAuth 2.0**: Admin clicks "Connect" → API generates state + redirects to service → service redirects to callback → API exchanges code, encrypts, stores tokens.

**API Key**: Admin enters key → encrypted and stored immediately.

### 12.4 Marketplace Architecture (Platform-Side)

Five asset types. MagiCaal Account links the deployment via an Account API Key. Catalog proxied and cached. All packages pass the Package Signature Verifier. License heartbeat with 72-hour grace period. Usage reporting sends aggregate counts only.

### 12.5 Integration Trigger Registration

Dedicated inbound endpoint per tenant registered for each integration with a trigger handler:
```
/v1/triggers/integrations/[service]/[tenant-slug]
```

### 12.6 Node SDK Interface

Every node — built-in, integration, or community — implements this interface. It is the single contract enforced by the engine at registration time and at runtime.

```typescript
// packages/sdk/src/node.ts

interface NodeModule<TConfig = Record<string, unknown>> {
  // Stable type identifier — must be globally unique
  // Convention: "core:name", "integration:service:operation", "community:publisher:name"
  readonly type: string;

  readonly meta: {
    name:        string;
    description: string;
    category:    "control-flow" | "ai-llm" | "data" | "integration" | "code"
                | "composition" | "observability" | "guardrails";
    icon?:       string;
    canTrigger?: boolean;    // true if this node type can serve as a graph entry trigger
    version:     string;     // semver
  };

  readonly schema: {
    config: JSONSchema7;     // shape of the node's design-time configuration
    input:  JSONSchema7;     // expected keys this node reads from the execution context
    output: JSONSchema7;     // keys this node writes to the execution context on success
  };

  // Primary execution method — called by the Execution Worker at the Execute phase
  execute(ctx: ExecutionContext, config: TConfig): Promise<NodeOutput>;

  // Optional: called at Prepare phase before execute()
  // Use for validation, preflight checks, or credential verification
  prepare?(ctx: ExecutionContext, config: TConfig): Promise<void>;
}

interface NodeOutput {
  status:   "complete" | "suspended" | "failed";
  outputs:  Record<string, unknown>;  // written to context.data on "complete"
  error?:   { code: string; message: string; retryable: boolean };
}
```

#### Minimal Integration Node Example

```typescript
// packages/integrations/slack/src/nodes/post-message.ts

const SlackPostMessage: NodeModule<SlackPostMessageConfig> = {
  type: "integration:slack:post-message",

  meta: {
    name:       "Slack: Post Message",
    description:"Post a message to a Slack channel",
    category:   "integration",
    icon:       "slack",
    version:    "1.0.0",
  },

  schema: {
    config: {
      type: "object",
      required: ["connection", "channel", "text"],
      properties: {
        connection: { type: "string", description: "Integration Connection ID" },
        channel:    { type: "string", description: "Channel ID or JSONata expression" },
        text:       { type: "string", description: "Message text or JSONata expression" },
      },
    },
    input:  { type: "object" },
    output: {
      type: "object",
      properties: {
        messageTs:  { type: "string" },
        channelId:  { type: "string" },
      },
    },
  },

  async execute(ctx, config) {
    // Credentials were injected at Prepare phase by the Integration Credential Resolver
    const { accessToken } = ctx.credentials[config.connection];

    // Config values may be JSONata expressions — evaluate against current context
    const channel = await ctx.evaluate(config.channel) as string;
    const text    = await ctx.evaluate(config.text)    as string;

    const res = await slackWebClient(accessToken).chat.postMessage({ channel, text });

    return {
      status:  "complete",
      outputs: { messageTs: res.ts, channelId: res.channel },
    };
  },
};

export default SlackPostMessage;
```

---

## 13. Core Node Types

### Node Type Naming Convention

All node type identifiers follow the pattern:
- `core:[name]` — built-in platform nodes
- `integration:[service]:[operation]` — built-in integration nodes
- `community:[publisher]:[name]` — community marketplace nodes

### Control Flow

| Node | Type ID | Description |
|---|---|---|
| **Start** | `core:start` | Entry point. Defines the graph's input schema. One per graph. |
| **End** | `core:end` | Exit point. Multiple End nodes supported. |
| **Condition** | `core:condition` | JSONata boolean expression; routes to true/false branch. |
| **Router** | `core:router` | JSONata expression matched against N cases; routes to matching branch. |
| **Fork** | `core:fork` | Splits execution into concurrent parallel branches. |
| **Join** | `core:join` | Waits for all upstream parallel branches to complete. |
| **Loop** | `core:loop` | Iterates over a collection or repeats until JSONata condition satisfied. |
| **Wait / Delay** | `core:wait` | Suspends run for a duration or until a datetime. |
| **Stop** | `core:stop` | Terminates run with a defined success or failure status. |

### AI / LLM

| Node | Type ID | Description |
|---|---|---|
| **LLM Call** | `core:llm-call` | Calls a configured LLM provider. Structured output mode available. Token usage recorded. Not a tool-using node — for direct LLM calls without tool loops. |
| **Prompt Builder** | `core:prompt-builder` | Constructs a prompt with context interpolation. References named Prompt Versions. |
| **Structured Extract** | `core:structured-extract` | LLM-based JSON extraction from arbitrary text. Built-in retry. |
| **Embedding** | `core:embedding` | Generates a vector embedding via configured provider. |
| **Vector Search** | `core:vector-search` | Queries configured vector store. Returns ranked results. |
| **Memory Read / Write** | `core:memory-read` / `core:memory-write` | Key-value persistent memory, cross-run, scoped to agent and tenant. |
| **Tool Call** | `core:tool-call` | LLM-driven tool invocation using the model's native function calling API (structured JSON tool calls, no explicit CoT). Receives tools via tool edges from Tool nodes and MCP Client nodes. Supports configurable `maxIterations`: each iteration the LLM either emits one or more tool calls (executed in parallel) or a final answer. Reasoning is implicit — not recorded in trajectory. Efficient for well-defined, predictable tasks. |
| **ReAct** | `core:react` | LLM-driven Reason-Act loop using prompt-engineered Thought/Action/Observation. Receives tools via tool edges. Configurable `maxIterations`. Executes one tool call at a time, serially. Explicit reasoning text recorded as trajectory per iteration. Best for open-ended, multi-step tasks where reasoning traceability matters. |
| **Planner** | `core:planner` | LLM decomposes a goal from context into a structured plan — a JSON array of named steps consumed by downstream nodes. Trajectory recorded. Does not use tools directly; pairs with Tool Call or ReAct for execution. |
| **Reflection** | `core:reflection` | Routes a context value through a configurable LLM critique prompt iteratively. Configurable acceptance condition. |
| **Context Summarize** | `core:context-summarize` | Summarizes a named message/record array with an LLM call to manage token volume. |
| **Token Budget** | `core:token-budget` | Estimates token count for a context value; routes to trim branch if over budget. |
| **Episodic Memory** *(Phase 4)* | `core:episodic-memory-read` / `core:episodic-memory-write` | Semantic similarity-based cross-run memory. |

### Guardrails & Human Control

| Node | Type ID | Description |
|---|---|---|
| **Guardrail** | `core:guardrail` | Validates a context value against configurable rules. Routes to pass or fail branch. Strategies: block-and-fail, reroute-to-fallback, redact-and-continue. Not bypassable by graph misconfiguration. |
| **Human Review** | `core:human-review` | Pauses run (SUSPENDED), emits review request, waits for response. Supports approve, reject, and modified-value flows. State persisted before request is emitted. Supports confidence-based auto-escalation from LLM Call and ReAct nodes. |

### Data

| Node | Type ID | Description |
|---|---|---|
| **Transform** | `core:transform` | Maps/reshapes values using a JSONata expression. |
| **Filter** | `core:filter` | Filters an array using a JSONata predicate. |
| **Aggregate** | `core:aggregate` | Reduces a collection to a scalar using a JSONata aggregation. |
| **Validate** | `core:validate` | Validates against JSON Schema; routes to error branch on failure. |
| **Parse** | `core:parse` | Parses structured text (JSON, CSV, XML, Markdown) into typed context value. |

### Integration (Core)

| Node | Type ID | Description |
|---|---|---|
| **HTTP Request** | `core:http-request` | Outbound HTTP. Headers, body templates, auth schemes. |
| **Webhook Receive** | `core:webhook-receive` | Registers unique inbound URL; triggers or resumes a run. |
| **Database Query** | `core:db-query` | Read/write against a configured Data Source. |
| **File Read / Write** | `core:file-read` / `core:file-write` | Read from or write to configured storage. |
| **Web Search** | `core:web-search` | Query string from context → results from configured search provider. |
| **Web Scrape** | `core:web-scrape` | Fetches URL from context; extracts as Markdown, plain text, or HTML. |
| **MCP Client** | `core:mcp-client` | Connects to a registered MCP server; exposes its tools as callable actions. |

### Code

| Node | Type ID | Description |
|---|---|---|
| **Code** | `core:code` | Sandboxed JavaScript. Scoped context access. Configurable timeout and memory limits. |

### Composition

| Node | Type ID | Description |
|---|---|---|
| **Sub-graph** | `core:sub-graph` | Invokes another agent as a child run. Awaitable or fire-and-forget. |
| **Handoff** | `core:handoff` | Invokes a target agent with an explicit handoff message. Models delegation; named event in run trace. |
| **Fan-Out** | `core:fan-out` | Spawns a parallel branch per item in a named array. |
| **Reduce** | `core:reduce` | Collects Fan-Out outputs; merges via configurable strategy. |
| **Input Map / Output Map** | `core:input-map` / `core:output-map` | Map context into sub-graph input; merge output back. |

### Evaluation & Observability

| Node | Type ID | Description |
|---|---|---|
| **Evaluate** | `core:evaluate` | Rule-based, LLM-as-judge, or expected output comparison. Score written to context and Telemetry Store. |
| **Log** | `core:log` | Structured level-tagged log entry. |
| **Metric** | `core:metric` | Named numeric metric emitted to Telemetry Store. |
| **Annotation** | `core:annotation` | No-op canvas label. |

### Workspace

Workspace nodes live in the dedicated Workspace panel region on the Studio canvas — separate from the main graph flow and the Tool panel. The `core:workspace` node is a resource declaration; workspace tool nodes are the interface to that resource. All workspace tool nodes auto-register to any agent node connected via a workspace edge. In dual mode, workspace tool nodes can also be placed in the main graph flow for non-agent direct execution.

| Node | Type ID | Description |
|---|---|---|
| **Workspace** | `core:workspace` | Resource declaration node. Declares a session-scoped Docker-based development environment: repository (URL, ref, sparse paths), environment (image, devcontainer, Dockerfile, env vars, setup commands, resource limits, network policy), lifecycle (session or run), lifecycle hooks (afterClone, afterBoot, onSessionResume, beforeTeardown, onError), permission policy, and teardown actions (auto-commit, push, create PR). When connected to an agent node via a workspace-registration edge, all workspace tool nodes registered to this workspace are automatically assembled into the agent's flat tool list when the workspace enters READY state. Writes the workspace instance ID to a configurable context key for use by direct-mode nodes. |
| **Workspace Provision** | `core:workspace-provision` | Explicit workspace provisioning node placed in the main graph flow. Provisions the referenced workspace node at a specific point in execution, allowing runtime-resolved repository URL and branch from execution context (e.g. from a webhook payload). Useful for conditional provisioning or graphs that determine the repository at runtime. |
| **Workspace Shell** | `core:workspace-bash` | **Dual-mode.** In tool mode (tool panel): exposes bash execution to the agent under a configured tool contract. In direct mode (main flow): executes the configured command string directly. Returns `stdout`, `stderr`, `exitCode`, `timedOut`. Configurable `workingDirectory` and `timeoutSeconds`. Subject to workspace permission policy. |
| **Workspace File** | `core:workspace-file` | **Dual-mode.** File operations against the workspace working tree. Operations: `read_file`, `write_file`, `patch_file` (apply unified diff), `delete_file`, `move_file`, `list_directory`, `directory_tree`, `search_files` (glob), `grep` (regex content search). `patch_file` is the primary operation for LLM-generated edits — more reliable and token-efficient than full file rewrites. Subject to permission policy path-scope conditions. |
| **Workspace Git** | `core:workspace-git` | **Dual-mode.** Git operations against the workspace repository. Operations: `status`, `diff`, `log`, `add`, `commit`, `checkout`, `push`, `pull`, `create_branch`, `stash`, `stash_pop`. Returns structured output (parsed, not raw text). Subject to permission policy — individual operations can be denied (e.g. deny `push`, deny `commit` on protected branches). |
| **Workspace Process** | `core:workspace-process` | **Dual-mode.** Manages long-running background processes in the workspace container. Operations: `start` (returns a process ID), `stop`, `get_output` (recent stdout/stderr by line count), `list` (all running processes). Useful for dev servers, watch processes, and test runners in watch mode. |

### A2A Protocol *(Phase 4)*

| Node | Type ID | Description |
|---|---|---|
| **A2A Client** | `core:a2a-client` | Invokes any external A2A-compliant agent endpoint regardless of framework. |

---

## 14. Session & Context Management

### 14.1 Overview

A **Session** is a named, persistent context envelope shared across multiple invocations of the same agent. Multiple Runs can belong to the same session, sharing and accumulating context state between them. This enables agents that maintain conversational continuity, remember prior results, and build on previous work — without the caller resending full history on every request.

Sessions are opt-in. Agents without a session config run statelessly; existing behaviour is unchanged.

### 14.2 Session Identity & Namespacing

Session IDs are always namespaced: `{tenant_id}:{agent_id}:{caller_id}`.

**Caller-supplied IDs**: The API consumer includes `"session_id": "user-123-thread-456"` in the invocation request. Useful when the caller has its own identity or conversation model. The platform namespaces it internally — `acme:coding-assistant:user-123-thread-456`.

**Platform-generated IDs**: If no `session_id` is provided and sessions are enabled on the agent, the platform generates a UUID, namespaces it, and returns the full namespaced ID in the run response for the caller to use on subsequent requests.

In both cases the session is uniquely scoped to a tenant and agent. Caller-supplied IDs cannot collide across tenants or agents because the namespace includes both.

### 14.3 Session Propagation

A session propagates through an invocation tree but is bounded to it:

- A session **is** passed to child agents invoked via `core:sub-graph` and `core:handoff`. The child run loads the same session context, can read all parent-written keys, and its writes are accumulated into the shared session store on completion. Concurrent child runs (via Fan-Out) write to the session on completion; last-write-wins per key.
- Two **separate top-level invocations** (separate HTTP calls to the agent's REST endpoint) **cannot** share a session ID. The session is owned by one originating invocation chain. Attempting to reuse a session ID from a concurrent top-level run returns a `409 Session Conflict` error.

This models the natural semantic: a session represents one ongoing conversation or task, which may involve several collaborating agents, but not two independent callers operating in parallel.

### 14.4 Context Schema

The developer declares a **context schema** in the agent's session config specifying which execution context keys persist across runs and how they accumulate.

```typescript
// packages/core/src/session.ts

type AccumulationType = "append" | "replace" | "merge";
type OverflowStrategy  = "evict_oldest" | "summarize" | "truncate";

interface ContextSchemaEntry {
  type:           AccumulationType;
  maxItems?:      number;           // "append" only; triggers overflow when exceeded
  maxTokens?:     number;           // token budget when assembling this key for LLM injection
  overflow?:      OverflowStrategy; // "append" only; default: "evict_oldest"
  summarizeWith?: {
    model:       string;
    prompt:      string | PromptRef;
    targetItems: number;            // number of entries to compress into one summary record
  };
  deduplicateBy?: string;           // field name to deduplicate on before appending
  ttlSeconds?:    number;           // key-level expiry independent of the session TTL
}

interface SessionConfig {
  enabled:       boolean;
  ttlSeconds:    number;                           // session inactivity TTL; resets on each run
  schemaVersion: number;                           // increment when making breaking changes
  contextSchema: Record<string, ContextSchemaEntry>;
  migrations?:   SessionSchemaMigration[];
}

interface SessionSchemaMigration {
  fromVersion: number;
  toVersion:   number;
  // Key: new schema key name
  // Value: JSONata expression evaluated against the old session context to produce the new value
  transform:   Record<string, string>;
}

interface Session {
  id:            string;   // fully namespaced
  agentId:       string;
  tenantId:      string;
  rootRunId:     string;   // top-level run that created this session
  schemaVersion: number;
  status:        "active" | "stale_schema" | "expired";
  metadata:      Record<string, unknown>;  // caller-supplied at creation time
  createdAt:     number;
  lastActiveAt:  number;
  expiresAt:     number;
}
```

**Accumulation types:**
- `append` — new value pushed into an array; for message history, retrieved documents, findings
- `replace` — overwritten with the latest value each run; for active state (current file, active task)
- `merge` — deep-merged into an existing object; for evolving metadata or user preference maps

**Overflow strategies (append only):**
- `evict_oldest` — sliding window; oldest entries are dropped when `maxItems` is exceeded
- `summarize` — the oldest `targetItems` entries are compressed into a single summary record via an LLM call before eviction. The summary record carries `role: "summary"`. Preserves semantic content at reduced token cost.
- `truncate` — reject new entries when full; no eviction; newest items are always preserved

### 14.5 Schema Versioning

`SessionConfig.schemaVersion` is an integer starting at 1. When a developer changes the schema:

**Non-breaking changes** (adding a new key, adjusting `maxItems`, changing `ttlSeconds`, changing overflow strategy): apply immediately to all active sessions. New keys start empty; existing keys are unaffected.

**Breaking changes** (renaming a key, changing `type`, removing a key): require a `migrations` entry. When the engine loads a session whose stored `schemaVersion` is behind the current schema, it walks the migration chain — applying each migration's JSONata transforms in sequence. If a complete path exists, it migrates in place and updates the stored version. If no migration path is defined for a breaking change, the session is marked `stale_schema`. Stale sessions continue to function; unmigrated keys are treated as empty under the new schema. The Admin panel surfaces stale-schema sessions with reset and migration action options.

```typescript
// Example: renaming "messages" to "history" between schema v1 and v2
migrations: [{
  fromVersion: 1,
  toVersion:   2,
  transform: {
    history: "$.messages",   // JSONata: copy old "messages" value to new "history" key
  }
}]
```

The CLI gains `magicaal sessions migrate --agent {handle}` to batch-apply all pending migrations across active sessions for an agent.

### 14.6 Session-Aware Execution

**At run start (session_id present in request)**:
1. Load the session record from the database; assert it belongs to this agent and tenant
2. Apply schema migrations if `session.schemaVersion < current schemaVersion`
3. Load all persisted context entries and inject them into the execution context (same flat namespace as regular context — session keys are context keys that happen to persist)
4. The run's input payload is available at `context.data[config.inputKey]` as normal

**LLM node auto-injection**: LLM Call, Tool Call, and ReAct nodes support an optional `injectSessionHistory` config field. Set to the name of an `append`-type session key holding message history, the node automatically prepends the stored history as prior conversation turns before the current user input. This eliminates the need for an explicit Session Read node in conversational agents.

**At run completion**:
For each key declared in the context schema whose value was written during the run, the Session Manager applies the accumulation rule, runs overflow handling if needed, and writes back to the session store. `lastActiveAt` is updated; the session's TTL is reset.

**Handoff and sub-graph propagation**:
The session ID is passed as an internal parameter on child run invocations. The child's Session Manager loads the same session at its start and writes back to the same session at its end.

### 14.7 Session Manager (Engine Subsystem)

```
class SessionManager:

  async loadSession(sessionId, agentId, tenantId):
    session = db.sessions.find(sessionId)
    assert session.agentId == agentId
    assert session.tenantId == tenantId
    assert session.status != "expired"

    if session.schemaVersion < agent.currentSchemaVersion:
      migrationPath = findMigrationPath(session.schemaVersion, agent.currentSchemaVersion)
      if migrationPath exists:
        context = db.session_context.findAll(sessionId)
        for each migration in migrationPath:
          context = applyTransform(context, migration.transform)
        db.session_context.replaceAll(sessionId, context)
        db.sessions.update(sessionId, { schemaVersion: agent.currentSchemaVersion })
      else:
        db.sessions.update(sessionId, { status: "stale_schema" })

    entries = db.session_context.findAll(sessionId)
    return { session, context: toMap(entries) }


  async saveSession(sessionId, executionContext, schema):
    for each [key, entry] in schema.contextSchema:
      newValue = executionContext.get(key)
      if newValue is undefined: continue

      current = db.session_context.find(sessionId, key)?.value

      switch entry.type:
        case "append":
          merged = (current ?? []).concat([newValue])
          if entry.deduplicateBy:
            merged = deduplicateBy(merged, entry.deduplicateBy)
          if entry.maxItems and merged.length > entry.maxItems:
            merged = await applyOverflow(merged, entry)
          db.session_context.upsert(sessionId, key, merged)

        case "replace":
          db.session_context.upsert(sessionId, key, newValue)

        case "merge":
          db.session_context.upsert(sessionId, key, deepMerge(current ?? {}, newValue))

    db.sessions.update(sessionId, {
      lastActiveAt: now(),
      expiresAt:    now() + schema.ttlSeconds * 1000,
    })


  async expireSessions():   // background process, runs hourly
    db.sessions.markExpiredWhere({ expiresAt: { lt: now() } })
```

### 14.8 Session API Routes

The invocation endpoint gains session fields:

```
POST /v1/agents/:id/runs
{
  "input":            { ... },
  "session_id":       "user-123",       // optional caller-supplied ID
  "session_metadata": { "userId": "u1" } // optional; stored at session creation, ignored on existing sessions
}

Response:
{
  "run_id":    "run_abc",
  "session_id": "tenant:agent:user-123"  // echoes provided (namespaced), or platform-generated
}
```

New session management endpoints:

| Method | Route | Description |
|---|---|---|
| GET | `/v1/agents/:id/sessions` | List sessions; filter by status, date range, schema version |
| GET | `/v1/agents/:id/sessions/:sid` | Session metadata and full current context snapshot |
| GET | `/v1/agents/:id/sessions/:sid/runs` | All runs associated with the session in chronological order |
| DELETE | `/v1/agents/:id/sessions/:sid` | Destroy session and all stored context |
| POST | `/v1/agents/:id/sessions/:sid/reset` | Clear accumulated context; preserve session ID and metadata |

### 14.9 Database Entities

Added to the primary database (SQLite, WAL mode):

```sql
CREATE TABLE sessions (
  id               TEXT PRIMARY KEY,   -- "{tenant_id}:{agent_id}:{caller_id}"
  agent_id         TEXT NOT NULL REFERENCES agents(id),
  tenant_id        TEXT NOT NULL,
  root_run_id      TEXT NOT NULL,
  schema_version   INTEGER NOT NULL,
  status           TEXT NOT NULL CHECK (status IN ('active', 'stale_schema', 'expired')),
  metadata         TEXT,                -- JSON; caller-supplied at session creation
  created_at       INTEGER NOT NULL,
  last_active_at   INTEGER NOT NULL,
  expires_at       INTEGER NOT NULL
);

CREATE INDEX idx_sessions_agent_tenant ON sessions(agent_id, tenant_id);
CREATE INDEX idx_sessions_expires      ON sessions(expires_at);
CREATE INDEX idx_sessions_status       ON sessions(tenant_id, status);

CREATE TABLE session_context (
  session_id        TEXT NOT NULL REFERENCES sessions(id),
  key               TEXT NOT NULL,       -- matches a key in the agent's contextSchema
  value             TEXT NOT NULL,       -- JSON: current accumulated value
  accumulation_type TEXT NOT NULL,       -- snapshot of the schema entry's type
  version           INTEGER NOT NULL DEFAULT 1,
  updated_at        INTEGER NOT NULL,
  PRIMARY KEY (session_id, key)
);

CREATE TABLE session_run_links (
  session_id   TEXT NOT NULL REFERENCES sessions(id),
  run_id       TEXT NOT NULL,
  run_order    INTEGER NOT NULL,         -- position in the session's run sequence
  is_child_run INTEGER NOT NULL DEFAULT 0,
  created_at   INTEGER NOT NULL,
  PRIMARY KEY (session_id, run_id)
);
```

### 14.10 Session Telemetry

Sessions are a first-class view in the telemetry dashboard. The **Sessions view** provides:

- **Session list**: ID, agent, run count, creation date, last activity, status, accumulated context size, schema version. Filterable by status (including stale-schema), date range, and agent.
- **Session detail**: All runs in chronological order with their inputs and outputs; context state snapshot after each run; cumulative token usage across the session; summarization and overflow events; schema migration history.
- **Context growth chart**: Per-key context size over the session's lifetime — useful for identifying runaway append keys and planning `maxItems` limits.

### 14.11 Session Nodes

| Node | Type ID | Description |
|---|---|---|
| **Session Read** | `core:session-read` | Explicitly load one or more session keys into the execution context at any graph position. Takes a `{ contextKey: sessionKey }` map. Useful for conditional loading or when a value is needed mid-graph rather than at run start. Does not affect end-of-run accumulation. |
| **Session Write** | `core:session-write` | Explicitly write a context value to a session key at any point, bypassing end-of-run accumulation. Respects the declared accumulation type (append/replace/merge). Useful for progressive saving during long-running agents or writing state on specific branches only. |
| **Session Clear** | `core:session-clear` | Reset one or more session keys, or the entire session context, without deleting the session. The session ID remains valid for subsequent runs. Useful for "new topic" flows within a persistent session. |

### 14.12 Code-Defined Agent Example

```typescript
@Agent({
  handle:  "coding-assistant",
  name:    "Coding Assistant",
  trigger: { type: "rest", mode: "async" },
  session: {
    enabled:       true,
    ttlSeconds:    86400,     // 24-hour inactivity TTL
    schemaVersion: 1,
    contextSchema: {
      messages: {
        type:     "append",
        maxItems: 100,
        overflow: "summarize",
        summarizeWith: {
          model:       "claude-sonnet-4-6",
          prompt:      { ref: "conversation-summarizer" },
          targetItems: 20,
        },
      },
      currentFile:      { type: "replace" },
      identifiedIssues: { type: "append", maxItems: 200, overflow: "evict_oldest" },
      retrievedDocs: {
        type:          "append",
        maxItems:      30,
        overflow:      "evict_oldest",
        deduplicateBy: "id",
        maxTokens:     4000,
      },
      userPreferences: { type: "merge" },
    },
  },
})
class CodingAssistant extends AgentGraph {
  build() {
    this.node("start", "core:start", { inputSchema: { /* ... */ } });
    this.node("agent", "core:tool-call", {
      model:                "claude-sonnet-4-6",
      maxIterations:        5,
      injectSessionHistory: "messages",  // auto-prepend $session.messages as prior turns
      outputKey:            "response",
    });
    // Explicitly append the assistant response to session message history
    this.node("save-message", "core:session-write", {
      writes: { messages: { role: "assistant", content: "$.response" } },
    });
    this.node("end", "core:end", {});

    this.connect("start",        "agent");
    this.connect("agent",        "save-message");
    this.connect("save-message", "end");

    // Tools wired via tool edges (abbreviated)
    this.tool("file-tool", "agent");
    this.tool("search-tool", "agent");
  }
}
```

---

## 15. Tenant Model

### 14.1 Logical Isolation
All entities carry `tenant_id`. All queries and engine operations scoped to the authenticated tenant.

### 14.2 Per-Tenant Configuration

| Setting | Description |
|---|---|
| Max concurrent runs | Upper bound on simultaneously executing runs |
| Max agents | Upper bound on agent definitions |
| Allowed node types | Optional whitelist |
| Resource limits | Per-run timeout, sandbox memory |
| Default LLM config | Fallback provider/model |
| Default invocation auth | `api-key`, `jwt`, or `public` |
| Default rate limit | Tenant-wide default for all agents |
| Community packages enabled | Whether community marketplace packages may be used |

### 14.3 Cross-Tenant Boundaries
Sub-graph and Handoff nodes may only invoke agents within the same tenant. API and invocation keys are tenant-scoped. Integration Connections are tenant-scoped unless marked platform-wide. Secrets and data source credentials are tenant-scoped.

---

## 15. Platform Auth

### 15.1 Authentication

**Session Auth**: Username/password issues a short-lived JWT and a long-lived refresh token in `HttpOnly` cookies. Refresh token rotation on each use.

**API Key Auth**: Platform or tenant-scoped. `mk_` prefix convention for easy identification. Hashed at rest. Displayed only at creation.

**External IdP** *(Phase 4)*: OAuth 2.0 / OIDC via extensible identity provider interface.

### 15.2 Authorization (RBAC)

| Role | Scope | Capabilities |
|---|---|---|
| **Platform Admin** | Platform | Full access to all tenants, users, system config, marketplace |
| **Tenant Admin** | Tenant | Full access within tenant: agents, users, config, secrets, integrations, review queue |
| **Developer** | Tenant | Studio: create, edit, test agents; read-only telemetry and review queue |
| **Viewer** | Tenant | Read-only: agents, run history, telemetry, review queue |

### 15.3 Secret Management
All sensitive values — agent credentials, Integration Connection tokens, MagiCaal Account API key — stored AES-256 encrypted using a platform-level master key injectable via environment variable (`MAGICAAL_MASTER_KEY`). Never returned in API responses.

---

## 16. Deployment

### 16.1 Docker Compose (Default Self-Hosted)

```yaml
# docker-compose.yml (simplified)
services:
  web-api:
    build: ./apps/api
    ports: ["3000:3000"]
    environment:
      - DATABASE_URL=/data/magicaal.db
      - TELEMETRY_DATABASE_URL=/data/telemetry.db
      - REDIS_URL=redis://redis:6379
      - MAGICAAL_MASTER_KEY=${MAGICAAL_MASTER_KEY}
      - ENGINE_INTERNAL_URL=http://engine:4000
      - MARKETPLACE_CATALOG_SOURCE=${MARKETPLACE_CATALOG_SOURCE:-remote}
    volumes:
      - db-data:/data
      - ./agents:/agents:ro          # compiled agent JSON
      - ./marketplace:/marketplace:ro # catalog.json for air-gapped mode

  engine:
    build: ./apps/engine
    environment:
      - DATABASE_URL=/data/magicaal.db
      - TELEMETRY_DATABASE_URL=/data/telemetry.db
      - REDIS_URL=redis://redis:6379
      - MAGICAAL_MASTER_KEY=${MAGICAAL_MASTER_KEY}
      - DOCKER_SOCKET=/var/run/docker.sock      # DooD: workspace containers as host siblings
      - WORKSPACE_VOLUME_PATH=/workspaces       # base path for workspace volume mounts
      - WORKSPACE_DEFAULT_CPU_LIMIT=${WORKSPACE_CPU_LIMIT:-2.0}
      - WORKSPACE_DEFAULT_MEMORY_LIMIT=${WORKSPACE_MEMORY_LIMIT:-4g}
      - WORKSPACE_DEFAULT_DISK_LIMIT=${WORKSPACE_DISK_LIMIT:-10g}
    volumes:
      - db-data:/data
      - packages-data:/packages
      - /var/run/docker.sock:/var/run/docker.sock  # DooD mount
      - workspace-data:/workspaces                 # workspace volume storage

  redis:
    image: redis:7-alpine

volumes:
  db-data:
  packages-data:
```

### 16.2 Build Pipeline

```
tsc (compile TS)
  ↓
magicaal build  →  /agents/*.agent.json + agents.manifest.json
  ↓
docker build (web-api image, /agents baked in)
  ↓
docker compose up  →  API boots  →  boot-time sync  →  service ready
```

### 16.3 Horizontal Engine Scaling

Multiple engine instances share the queue and database. Cache invalidation and package install events propagated via Redis pub/sub. SSE events propagated via Redis pub/sub for consistent streaming regardless of which instance executes the run. Rate limit counters shared via Redis. License heartbeats and usage reports are idempotent.

---

## 17. Key Decisions & Rationale

| Decision | Choice | Rationale |
|---|---|---|
| Core types in `packages/core` | Shared TypeScript interfaces imported by all packages | Single source of truth for graph schema; prevents drift between compiler output and engine expectations |
| Node type ID convention | `core:name`, `integration:service:op`, `community:publisher:name` | Globally unique, namespace-safe, human-readable in graph JSON and telemetry |
| Graph engine | Custom, PocketFlow-inspired | Lifecycle control, tenant isolation, looping agents at scale |
| Frontend | Datastar | Server-driven UI; canvas as the one deliberate client-side island |
| Graph-as-code | Decorator + class inheritance | Familiar TS patterns; decorators for metadata; inheritance enforces graph structure |
| `compile()` as pure transform | No filesystem or DB access in compiler | Testable in isolation; usable in non-CLI contexts (e.g. a web-based code editor) |
| Boot-time sync | Non-destructive; errors skip, not halt | Production deployments must not fail to start because one agent definition is malformed |
| `syncConfig` respects override map | Locked fields always overwritten; overridable fields preserved if admin-set | Admin changes survive redeploys; locked fields stay in sync with code |
| Expression language | JSONata | JSON-in/JSON-out; single language for conditions, routing, and transforms; clear boundary with Code node |
| Expression UX | Tiered (Value Picker + Expression Editor) | Non-developer default; full power accessible; both produce the same underlying JSONata string |
| `ExecutionContext.evaluate()` | JSONata evaluation against `context.data` | Nodes express dynamic config as JSONata strings; evaluated lazily at runtime against current context |
| Edge resolution order | Conditional edges first, then fallback/unconditional | Explicit conditions take priority; graph author always has a clear mental model of routing |
| Parallel execution | `Promise.all` within a single worker | Avoids worker-per-branch overhead; concurrency bounded naturally by the JS event loop |
| Invocation auth | Separate from platform auth; three strategies | Platform auth governs management; invocation auth governs execution |
| Rate limit headers | `X-RateLimit-*` on all invocation responses | API consumers can self-regulate; standard HTTP convention |
| SSE fan-out via Redis | Events published to Redis pub/sub, consumed by all engine instances | No sticky session requirement; works under horizontal scaling |
| API versioning | `/v1/` prefix; `/v2/` for breaking changes | Stable contracts for API consumers |
| Structured error responses | Consistent `code` + `message` + `details` | Machine-readable codes for consumer error handling; human messages for debugging |
| Token usage per step | Recorded in `steps` table in Telemetry Store | Per-node cost visibility; powers Token Budget node decisions; does not bloat primary DB |
| Trajectory records | Separate `trajectories` table | ReAct/Planner audit trails without inflating the `steps` table; queryable independently |
| Evaluate scores | Separate `evaluate_scores` table | Time-series queries for quality trending without scanning `steps` |
| `MAGICAAL_MASTER_KEY` via env var | Never hardcoded or stored in DB | Compatible with Docker Secrets, Kubernetes Secrets, Vault; auditable injection |
| Dry run mode *(Phase 4)* | Separate execution path, stub responses | CI/testing without API costs or side effects; structural validation decoupled from live execution |
| A2A protocol *(Phase 4)* | Client node + optional inbound endpoint | Framework interoperability; adopts emerging standard without structural change |
| Package signature verification | Publisher sig + content hash + countersig (official) | Supply-chain attack prevention; tamper detection; multi-layer trust |
| MagiCaal Account | Separate cloud identity for marketplace | Deployment fully functional without marketplace; thin opt-in coupling |
| License heartbeat grace period | 72-hour grace; no hard enforcement in v1 | Transient network issues must not disrupt production |
| Usage reporting | Aggregate counts only | Privacy-preserving; auditable; usage billing without data exposure |
| Community package sandbox | `isolated-vm`; opt-in per tenant | Security without blocking extensibility; consistent with Code node model |
| Integration trigger auth | Service-specific signing, not invocation auth | External services use their own mechanisms; invocation auth is for external human/machine callers |
| SQLite WAL mode | Separate primary and telemetry DB files | WAL allows concurrent readers with a writer; separate files prevent high-volume telemetry writes from contending with app reads |
| Drizzle ORM | Dialect-agnostic | SQLite → Postgres migration without structural code changes |
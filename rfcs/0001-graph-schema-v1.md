---
RFC: 0001
Title: Agent Graph Schema v1 (AgentGraphDefinition)
Start Date: 2026-02-01
PR: (retroactive — shipped across Phases 0–2)
Status: Accepted
---

# RFC 0001 — Agent Graph Schema v1

## Summary

This RFC ratifies the `AgentGraphDefinition` schema as the canonical serialization format for MagiCaal agents. It is a directed graph with three distinct edge kinds (flow, tool, workspace) and a configuration envelope (`AgentConfig`) that governs runtime behaviour. This is a retroactive RFC — the schema was implemented across Phases 0–2 and is now formally documented for the benefit of node authors, integration builders, and future RFC authors who need to reference or extend it.

## Motivation

MagiCaal agents are defined as graphs. Before any significant future changes to that graph format can be proposed and evaluated, the current format must be precisely documented. This RFC serves as that canonical reference. It also establishes the three-edge-kind model as a deliberate, ratified decision — not an accident — so that future proposals for new edge kinds can evaluate themselves against this decision.

## Detailed Design

### Core Types

All types live in `packages/core/src/graph.ts` and are re-exported from `packages/core/src/index.ts`. They are types-only — no runtime code. Import them with `import type` exclusively.

#### `AgentGraphDefinition`

The root type for an agent definition. Stored as JSON on disk (in `AGENTS_DIR`) and in the `agent_versions` database table.

```typescript
interface AgentGraphDefinition {
  version: string;           // Schema version string, e.g. "1"
  handle?: string;           // Globally unique identifier for the agent (slug-safe)
  name: string;              // Human-readable display name
  description?: string;      // Optional longer description shown in Studio
  entry: string;             // ID of the entry node (must exist in `nodes`)
  nodes: Record<string, NodeDefinition>;  // Keyed by node ID
  edges: EdgeDefinition[];              // Control flow edges
  toolEdges: ToolEdgeDefinition[];      // Declares what tools a node exposes to LLMs
  workspaceEdges: WorkspaceEdgeDefinition[]; // Declares workspace associations
  routerPolicies?: Record<string, ModelRouterConfig>; // Named router policy overrides
  config: AgentConfig;       // Runtime configuration envelope
  layout?: GraphLayout;      // Canvas layout (Studio use only, ignored by engine)
}
```

#### `NodeDefinition`

Represents a single step in the agent graph.

```typescript
interface NodeDefinition {
  id: string;                          // Unique within this graph
  type: string;                        // Registered node type, e.g. "core:llm-call"
  label?: string;                      // Display label in Studio canvas
  config: Record<string, unknown>;     // Node-specific configuration (validated by node's configSchema)
  group?: string;                      // Canvas group/lane identifier (Studio use only)
}
```

#### `EdgeDefinition`

Represents a control flow edge between two nodes.

```typescript
interface EdgeDefinition {
  id: string;
  from: string;  // Source node ID
  to: string;    // Target node ID
  type: 'unconditional' | 'conditional' | 'fallback';
  condition?: string;  // JSONata expression (required when type = 'conditional')
  label?: string;      // Display label in Studio canvas
}
```

Edge semantics:
- **`unconditional`**: The edge always fires after `from` completes successfully. Used for linear sequence.
- **`conditional`**: The edge fires only when the `condition` JSONata expression evaluates to `true` against the node output. Multiple outgoing conditional edges form an `if/else if` chain.
- **`fallback`**: The edge fires when `from` completes with an error or when all outgoing conditional edges evaluate to `false`. At most one fallback edge per source node.

The engine evaluates edges in declaration order: unconditional first, then conditional in array order, then fallback.

#### `ToolEdgeDefinition`

Declares that a node (`from`) exposes tools to an LLM node (`to`). The LLM node uses this to assemble its tool list before executing.

```typescript
interface ToolEdgeDefinition {
  id: string;
  from: string;  // Tool source node ID (must be of type "core:tool" or "core:mcp-client")
  to: string;    // Consumer LLM node ID (must be of type "core:llm-call", "core:react", etc.)
}
```

Tool edges are directional but do not carry data at runtime — they are a static declaration resolved at graph load time.

#### `WorkspaceEdgeDefinition`

Declares a relationship between a node and a workspace.

```typescript
interface WorkspaceEdgeDefinition {
  id: string;
  from: string;                                // Source node ID
  to: string;                                  // Workspace node ID
  edgeRole: 'tool-source' | 'agent-registration';
}
```

Edge roles:
- **`tool-source`**: The workspace provides filesystem/shell/process tools to the `from` node (typically a `core:llm-call` or `core:react` node).
- **`agent-registration`**: The `from` node (an agent sub-graph) is registered as a callable agent within the workspace environment.

#### `GraphLayout`

Canvas layout data. Used by Studio for rendering; ignored by the engine.

```typescript
interface GraphLayout {
  nodes: Record<string, { x: number; y: number }>;  // Position per node ID
  groups?: Record<string, {
    label?: string;
    color?: string;
    nodeIds: string[];
  }>;
}
```

### `AgentConfig`

The runtime configuration envelope. Part of every `AgentGraphDefinition`.

```typescript
interface AgentConfig {
  trigger: TriggerConfig;
  concurrency: ConcurrencyConfig;
  retry: RetryConfig;
  timeout?: number;                             // Global run timeout in milliseconds
  invocationAuth?: InvocationAuthConfig;        // Guards external invocation
  rateLimit?: RateLimitConfig;                  // Per-tenant or per-key rate limits
  session?: SessionConfig;                      // Session management configuration
  defaultRouter?: string | ModelRouterConfig;   // Default Model Router for this agent
}
```

#### `TriggerConfig`

Discriminated union by `type`:

```typescript
type TriggerConfig =
  | { type: 'rest'; mode: 'sync' | 'async' }
  | { type: 'cron'; expression: string }          // Standard cron expression
  | { type: 'webhook' }
  | { type: 'integration'; service: string; event: string }
```

### Three-Edge-Kind Model

The decision to separate `edges`, `toolEdges`, and `workspaceEdges` into three distinct arrays (rather than a single `edges` array with a discriminator) was deliberate:

1. **Semantic clarity**: Flow edges, tool declaration edges, and workspace edges have completely different semantics and are evaluated at different points in the execution lifecycle. Mixing them in one array would require the engine to filter by type constantly.

2. **Graph traversal**: The engine's BFS traversal uses only `edges` for control flow. `toolEdges` and `workspaceEdges` are resolved at graph load time and cached as lookup tables — they are not walked by the BFS.

3. **Schema evolution**: New edge kinds can be added as new top-level arrays without breaking parsers that read only `edges` for control flow.

### `nodes` as `Record<string, NodeDefinition>`

Nodes are stored as a keyed record (object/map) rather than an array. This provides O(1) lookup by node ID — the engine looks up nodes by ID at every step of execution. An array would require O(n) scan.

The `entry` field is a string pointer to the entry node ID (a key in `nodes`), not a special node type. This allows the entry node to be any type — not just a hypothetical `core:start` structural node. The `core:start` node type exists as a convention but is not enforced by the schema.

### Versioning

The `version` field is a string (not a semver or integer) to remain flexible. The current value emitted by the compiler is `"1"`. Future schema versions will be documented in subsequent RFCs. The engine rejects graphs with unrecognized version values.

## Drawbacks

- Separating three edge arrays means graph manipulation code (compiler, Studio) must maintain three arrays rather than one. This is mildly more complex to write but significantly simpler to read and reason about.
- The `config: Record<string, unknown>` type for `NodeDefinition.config` provides no static safety — it is validated at runtime by each node's `configSchema`. This is necessary for extensibility (community nodes) but means type errors surface at load time, not compile time.

## Alternatives

**Single `edges` array with discriminator:** Considered and rejected. See Three-Edge-Kind Model above.

**Nodes as array:** `nodes: NodeDefinition[]` with `id` as a field. Rejected in favor of `Record<string, NodeDefinition>` for O(1) lookup. The `id` field is retained inside `NodeDefinition` as a convenience for serialization and display — it is always equal to its key in the record.

**Inline `AgentConfig` fields:** Considered embedding trigger, concurrency, etc. directly in `AgentGraphDefinition` rather than nesting them under `config`. Rejected to keep the root object clean and to allow `AgentConfig` to be referenced independently (e.g., in the `core:sub-graph` node's config, which inherits certain fields from the parent config).

## Unresolved Questions

None — this is a retroactive ratification of a shipped schema.

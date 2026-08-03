# AGENTS.md — Graph-as-Code Authoring

Instructions for an AI coding agent asked to create or modify a MagiCaal agent as **Graph-as-Code** (a `*.agent.ts` file compiled to the platform's `AgentGraphDefinition` format), rather than through the Studio canvas. This file is self-contained — verify against the cited source files rather than trusting memory of prior sessions, since some of the surface described here (node config shapes in particular) is known to drift out of sync with its own generated helpers (see §5).

## 1. Where Files Live

- One agent per file: `agents/<handle>.agent.ts`
- `agents/` is its own pnpm workspace (`@magicaal/agents`), depending only on `@magicaal/compiler` and `@magicaal/core` — never import `@magicaal/nodes` directly; node types are referenced by string id (`'core:llm-call'`), not by importing a node module.
- Reference implementation to read before writing a new one: `agents/caal.agent.ts` — a real, non-trivial agent (intent routing, tool-calling, session read/write) with inline comments explaining several fixed bugs. Read it end to end; it demonstrates every pattern in this file.

## 2. Class Shape

```typescript
import { Agent, AgentGraph } from '@magicaal/compiler';

@Agent({
  handle: 'my-agent',        // stable id, used in URLs/routes
  name: 'My Agent',
  description: '...',
  config: { /* AgentConfig — see §3 */ },
})
export class MyAgent extends AgentGraph {
  build(): void {
    // this.node(...) / this.connect(...) / this.when(...)/this.otherwise(...) / this.tool(...)
  }
}
```

- `@Agent(meta: AgentMeta)` — `packages/compiler/src/decorators.ts`. `meta.config` is `Partial<AgentConfig>`; unset fields get defaults from `compile()`'s `buildDefaultConfig` (see below).
- `AgentGraph` is abstract with one required method: `build(): void`, where you call `this.node`/`this.connect`/etc. to populate the graph. Nothing is compiled until `compile(MyAgent)` is called (by `magicaal build`/`magicaal validate` — see §8).
- `overridable?: boolean | Record<string, boolean>` on the `@Agent` meta controls whether a platform admin can override config fields post-deploy: `false`/absent = code always wins, `true` = admin can override anything, an object = per-field.

## 3. `AgentConfig` (the `config:` field)

Full shape, `packages/core/src/agent.ts`:

```typescript
interface AgentConfig {
  trigger: TriggerConfig;        // required
  concurrency: ConcurrencyConfig; // required
  retry: RetryConfig;             // required
  timeout?: number;
  invocationAuth?: InvocationAuthConfig;
  rateLimit?: RateLimitConfig;
  session?: SessionConfig;
  defaultRouter?: string | ModelRouterConfig;
}

type TriggerConfig =
  | { type: 'rest'; mode: 'sync' | 'async' }
  | { type: 'cron'; expression: string }
  | { type: 'webhook' }
  | { type: 'integration'; service: string; event: string };

interface ConcurrencyConfig { maxParallel: number; queueTimeout: number; }
// NOT maxConcurrent/queueStrategy — those field names were never real (see §7).

interface RetryConfig { maxAttempts: number; backoff: 'fixed' | 'exponential'; delayMs: number; }

interface InvocationAuthConfig {
  strategy: 'api-key' | 'jwt' | 'public';
  overridable?: boolean;
  jwtConfig?: { issuer: string; jwksUrl: string; audience?: string; requiredClaims?: Record<string, string> };
}

interface RateLimitConfig { requestsPerWindow: number; windowSeconds: number; limitBy: 'tenant' | 'key' | 'ip'; }
```

If you omit `trigger`/`concurrency`/`retry` entirely, `compile()` fills in `{ type: 'rest', mode: 'async' }`, `{ maxParallel: 5, queueTimeout: 30000 }`, and `{ maxAttempts: 1, backoff: 'fixed', delayMs: 0 }` respectively — fine defaults for most agents; only override what you actually need to change.

### Session config (only if the agent needs cross-run memory)

```typescript
interface SessionConfig {
  enabled: boolean;
  ttlSeconds: number;
  schemaVersion: number;
  contextSchema: Record<string, ContextSchemaEntry>;
  migrations?: SessionSchemaMigration[];
}

interface ContextSchemaEntry {
  type: 'append' | 'replace' | 'merge';
  maxItems?: number;       // for 'append'
  maxTokens?: number;
  overflow?: 'evict_oldest' | 'summarize' | 'truncate';
  summarizeWith?: { model: string; prompt: string | { ref: string; version?: number }; targetItems: number };
  deduplicateBy?: string;
  ttlSeconds?: number;
}
```

Every key your `core:session-read`/`core:session-write` nodes read/write must have a matching entry here, or the write is silently outside the schema. See [Sessions](sessions.md) for the full lifecycle (schema migrations, expiry).

## 4. Building the Graph (`AgentGraph` methods, `packages/compiler/src/graph.ts`)

| Method | Signature | Adds |
|---|---|---|
| `this.node` | `(id: string, type: string, config?: Record<string, unknown>)` | a node |
| `this.connect` | `(from: string, to: string)` | an unconditional edge |
| `this.when` | `(from: string, condition: string, to: string, label?: string)` | a conditional edge — `condition` is a JSONata boolean expression (see §6) |
| `this.otherwise` | `(from: string, to: string)` | the fallback edge taken when no `when()` from that node matched |
| `this.tool` | `(toolNodeId: string, agentNodeId: string)` | a tool edge — makes `toolNodeId` (a `core:tool` node or a `caal.*`-style platform tool id) callable by the agentic node `agentNodeId` (`core:react`/`core:tool-call`) |
| `this.workspace` | `(workspaceNodeId: string, agentNodeId: string, role?: 'tool-source' \| 'agent-registration')` | a workspace edge |

`type` is the node's string id, e.g. `'core:llm-call'` — see the [Node Reference](../reference/nodes/README.md) for the full list of 53 built-in types with per-node config details (or [Node Catalog](../reference/node-catalog.md) for a shorter prose overview).

## 5. Graph Validity Rules (enforced by `compile()`, `packages/compiler/src/compile.ts`)

These throw a `CompileError` with a `details` array — fix all of them before the agent will build:

- The graph must have **exactly one** `core:start` node.
- The graph must contain **at least one** `core:end` node.
- Every node type referenced must be a known type (in the built-in `ALL_NODES` registry from `@magicaal/nodes`, or an installed Marketplace package's node type).
- Every non-`core:start` node must have **at least one inbound edge** — an unreachable node is a compile error, not a warning.
- Every edge's `from`/`to` must reference a node id that actually exists in the graph.
- Every tool edge's target must reference a node id that exists.

Note what's **not** validated: node `config` shape. `compile()` checks structure, not per-node config correctness — a `core:router` node with a typo'd config field compiles fine and fails (or silently misbehaves) at runtime. This makes §6 below load-bearing, not optional.

## 6. Node Config — Use the Node Reference, Not the Typed Helpers

**For every node's exact config fields, required/optional status, output keys, and behavior notes, use [reference/nodes/](../reference/nodes/README.md) — one verified page per node type (`reference/nodes/core-<type>.md`).** Those pages are generated directly from each node's real `interface <X>Config`, JSON Schema, and `execute()` behavior in `packages/nodes/src/nodes/core-<type>.ts`, and are the authoritative source for Graph-as-Code config shapes.

**Do not use `packages/compiler/src/node-classes.ts`'s typed helper classes** (`LlmCallNode`, `RouterNode`, etc.) as a source of truth — they're generated by a `codegen` step for IDE autocomplete and are **demonstrably stale**. Two confirmed, documented examples (see [`core:llm-call`](../reference/nodes/core-llm-call.md), [`core:router`](../reference/nodes/core-router.md)):

- `LlmCallNode`'s typed config has `userMessage`/`messagesKey` but is **missing `userMessageKey`**, a real, actively-used field (`agents/caal.agent.ts` uses it: `userMessageKey: 'explainMessage'`).
- `RouterNode`'s typed config claims `{ expression, routes: Record<string,string> }`. The real field is `cases: string[]`, not `routes`.

If a node isn't covered by `reference/nodes/` yet, or you suspect the page is out of date after a code change, fall back to reading `packages/nodes/src/nodes/core-<type-without-prefix>.ts` directly — its `interface <X>Config` (near the top) and JSON Schema (a few lines below, with per-field `description`s) are ground truth. If you regenerate `node-classes.ts` (`pnpm --filter @magicaal/compiler run codegen` — note this script does not currently exist in `packages/compiler/package.json`; check before assuming it does), still spot-check the output against the source node file.

## 7. Expression Language

Node `config.expression` fields (`core:condition`, `core:router`, `core:transform`, `core:filter`, edge `when()` conditions, session-write `writes` values) are [JSONata](https://jsonata.org/), evaluated against the run's flat context object, referenced as `$` — e.g. `$.intent`, `$count($keys($.graphState.nodes ?? {}))`, `$append($.sessionMessages ?? [], [...])`, `$.message & "\n\n" & $string($.graphContext)`.

**`core:transform` writes its result to exactly one context key** (`config.outputKey`) — it does not spread an object result's fields across the top level of the context. If you need several sibling fields available at the top level, either give each its own `core:transform` node with its own `outputKey`, or nest them under one key and have downstream nodes/consumers read the nested path.

**`core:llm-call` does no `{{}}` templating of its own.** If you need to build a composed message from multiple context values, do it in a `core:transform` node first (`outputKey: 'myMessage'`) and pass that key via `userMessageKey`, rather than expecting the LLM node to interpolate anything itself.

## 8. Build & Validate Workflow

```bash
magicaal validate ./agents        # compile-check every *.agent.ts, no output written — run this first and after every edit
magicaal build ./agents --out ./dist/agents   # writes AgentGraphDefinition JSON + content-hashed manifest
magicaal generate ./agents        # emits JSON Schema for each agent's input/output
```

Full command reference: [CLI](../reference/cli.md). `validate` is cheap and gives you the `CompileError.details` list directly — run it in a loop while iterating rather than waiting for a full `build`.

## 9. Common Pitfalls Checklist

Before considering an agent done, check it against every item below — each corresponds to a real bug found in this codebase:

- [ ] `ConcurrencyConfig` fields are `maxParallel`/`queueTimeout` — not `maxConcurrent`/`queueStrategy`
- [ ] `core:router`'s config is `{ expression, cases }` — not `{ expression, routes }`
- [ ] Every `core:transform` node sets exactly one `outputKey`; no field is expected to appear at the top level unless a node explicitly put it there
- [ ] Any composed LLM message string is pre-built by a `core:transform` node and passed via the correct `*Key` field — never assumed to be templated inline
- [ ] `defaultRouter`/a node's inline `router` config, if set, is a real `ModelRouterConfig` (`strategy` is one of `priority`/`round-robin`/`weighted`/`least-latency`/`cost-optimized`, with real `targets`) — an invented shape like `{ strategy: 'fastest', maxCost: 0.01 }` is not validated at compile time and will silently do nothing or fail at runtime. When in doubt, omit `router` entirely and let it fall through to the graph/tenant default policy.
- [ ] Exactly one `core:start`, at least one `core:end`, every node reachable
- [ ] Every `contextSchema` key you read/write via `core:session-read`/`core:session-write` has a matching entry in `SessionConfig.contextSchema`
- [ ] `magicaal validate` passes with zero errors

## 10. When This Isn't Enough — Escalate to an RFC

Adding a node **within an existing category**, or composing existing nodes into a new agent, never needs an RFC. These do — see [RFC Process](contributing/rfc-process.md):
- A new node type category
- Any `AgentGraphDefinition` schema change
- Any `NodeModule`/`ExecutionContext` interface change (`packages/sdk`)

## Related Pages

[Graph-as-Code](graph-as-code.md) · [Node Reference](../reference/nodes/README.md) · [Node Authoring](node-authoring.md) · [Node Catalog](../reference/node-catalog.md) · [Sessions](sessions.md) · [Model Router](architecture/model-router.md) · [CLI](../reference/cli.md)

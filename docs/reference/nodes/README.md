# Node Reference

Authoritative, per-node config reference for all 53 built-in `core:*` node types — the source of truth for [Graph-as-Code](../../developer-guide/graph-as-code.md) authoring. Every page here is verified directly against its node's implementation in `packages/nodes/src/nodes/core-<type>.ts` (config `interface`, JSON Schema, and `execute()` behavior), not against the typed helper classes in `packages/compiler/src/node-classes.ts` — which are known to be stale for at least two node types (documented on their pages: [`core:llm-call`](core-llm-call.md), [`core:router`](core-router.md)).

If you're generating `*.agent.ts` code, also read **[AGENTS.md](../../developer-guide/AGENTS.md)** first — it covers the `AgentGraph` API (`node`/`connect`/`when`/`otherwise`/`tool`), `AgentConfig`/`SessionConfig` shapes, and graph-validity rules that apply on top of individual node config.

Every node's `category` below is the real `meta.category` value from its source (`packages/sdk/src/node.ts`'s `NodeModule['meta']['category']` enum) — this is a different, more granular grouping than the older prose overview in [node-catalog.md](../node-catalog.md).

## Control Flow (9)

Graph entry/exit and branching primitives.

| Node | Summary |
|---|---|
| [`core:start`](core-start.md) | Entry point; declares input schema |
| [`core:end`](core-end.md) | Terminal node; collects run output |
| [`core:stop`](core-stop.md) | Early-exit termination |
| [`core:condition`](core-condition.md) | JSONata boolean branch |
| [`core:router`](core-router.md) | JSONata case-key branch |
| [`core:fork`](core-fork.md) | Fixed-branch parallel split |
| [`core:join`](core-join.md) | Barrier + merge for `core:fork` |
| [`core:loop`](core-loop.md) | Conditional cycle with iteration cap |
| [`core:wait`](core-wait.md) | Delay or condition-poll pause |

## AI / LLM (12)

Everything that calls the [Model Router](../../developer-guide/architecture/model-router.md) or drives an agentic loop.

| Node | Summary |
|---|---|
| [`core:llm-call`](core-llm-call.md) | Single LLM call, optional structured output |
| [`core:tool-call`](core-tool-call.md) | Native function-calling tool loop (parallel per iteration) |
| [`core:react`](core-react.md) | Reason-Act tool loop (serial) |
| [`core:agentic-router`](core-agentic-router.md) | LLM-powered intent classification branch |
| [`core:planner`](core-planner.md) | LLM decomposes a goal into a plan |
| [`core:reflection`](core-reflection.md) | Iterative LLM self-critique loop |
| [`core:structured-extract`](core-structured-extract.md) | LLM call with mandatory schema-validated output |
| [`core:prompt-builder`](core-prompt-builder.md) | `{{}}`-template prompt assembly |
| [`core:context-summarize`](core-context-summarize.md) | LLM summarization to reduce token volume |
| [`core:embedding`](core-embedding.md) | Text → vector embedding |
| [`core:vector-search`](core-vector-search.md) | In-memory cosine similarity search |
| [`core:token-budget`](core-token-budget.md) | Estimate tokens, flag over-budget |

## Data (7)

| Node | Summary |
|---|---|
| [`core:transform`](core-transform.md) | JSONata expression → single context key |
| [`core:filter`](core-filter.md) | Boolean pass/fallback gate |
| [`core:validate`](core-validate.md) | JSON Schema validation (subset) |
| [`core:parse`](core-parse.md) | String → JSON/CSV/lines |
| [`core:aggregate`](core-aggregate.md) | Array reduction (sum/count/min/max/...) |
| [`core:memory-read`](core-memory-read.md) | Read in-run context keys with defaults |
| [`core:memory-write`](core-memory-write.md) | Write computed in-run context keys |

## Integration (8)

External-world I/O.

| Node | Summary |
|---|---|
| [`core:http-request`](core-http-request.md) | Generic HTTP call |
| [`core:webhook-receive`](core-webhook-receive.md) | Read inbound webhook payload |
| [`core:web-search`](core-web-search.md) | Brave/Tavily web search |
| [`core:web-scrape`](core-web-scrape.md) | Fetch + extract page text |
| [`core:file-read`](core-file-read.md) | Read from workspace filesystem |
| [`core:file-write`](core-file-write.md) | Write to workspace filesystem |
| [`core:db-query`](core-db-query.md) | Parameterised SQL `SELECT` (Postgres) |
| [`core:mcp-client`](core-mcp-client.md) | Call an [MCP server](../../developer-guide/mcp.md) tool, direct or funnel |

## Composition (7)

Graph-of-graphs and parallel-collection primitives.

| Node | Summary |
|---|---|
| [`core:sub-graph`](core-sub-graph.md) | Invoke another agent as a child run |
| [`core:handoff`](core-handoff.md) | Fire-and-forget delegation to another agent |
| [`core:fan-out`](core-fan-out.md) | Per-item parallel branch spawn |
| [`core:reduce`](core-reduce.md) | Collect/merge `core:fan-out` results |
| [`core:input-map`](core-input-map.md) | Shape sub-graph input namespace |
| [`core:output-map`](core-output-map.md) | Remap sub-graph output back to parent |
| [`core:evaluate`](core-evaluate.md) | Score a value (rule/LLM-judge/exact-match) |

## Code (1)

| Node | Summary |
|---|---|
| [`core:code`](core-code.md) | Sandboxed JavaScript snippet execution |

## Tool (1)

| Node | Summary |
|---|---|
| [`core:tool`](core-tool.md) | Declares an LLM-facing tool contract |

## Observability (3)

| Node | Summary |
|---|---|
| [`core:log`](core-log.md) | Write to the run log |
| [`core:metric`](core-metric.md) | Emit a named numeric metric |
| [`core:annotation`](core-annotation.md) | Structured note on the step record |

## Guardrails (2)

| Node | Summary |
|---|---|
| [`core:guardrail`](core-guardrail.md) | Rule-based policy check: block/reroute/redact |
| [`core:human-review`](core-human-review.md) | Suspend for human approval |

## Session (3)

| Node | Summary |
|---|---|
| [`core:session-read`](core-session-read.md) | Read persisted session context into the run |
| [`core:session-write`](core-session-write.md) | Stage values for session persistence |
| [`core:session-clear`](core-session-clear.md) | Schedule session key(s) for deletion |

---

## Shared Execution Context API

Every node's `execute(ctx, config)` receives an `ExecutionContext` (`packages/sdk/src/context.ts`). The methods referenced across the pages above:

| Method | Purpose |
|---|---|
| `ctx.data` | The full current context object (what JSONata `$` resolves against) |
| `ctx.get<T>(key)` / `ctx.set(key, value)` | Read/write a single context key |
| `ctx.evaluate(expression)` | Evaluate a JSONata expression against `ctx.data` |
| `ctx.credentials[connectionId]` | Resolved Integration Connection credentials (`{ type: 'oauth' \| 'apikey', accessToken?, apiKey?, ... }`) |
| `ctx.llmCall(request, routerConfig)` | Route an LLM call through the Model Router |
| `ctx.log(level, message, meta?)` | Write to the run log |
| `ctx.metric(name, value)` | Emit a telemetry metric |
| `ctx.emit(event, payload)` | Emit an observable run event |
| `ctx.suspend(reviewId, opts?)` | Suspend the run, checkpointing at the calling node (`opts.resumeAt` for a timed resume) |
| `ctx.recordTrajectoryStep(step)` / `ctx.recordTokenUsage(usage)` | Telemetry for agentic/LLM nodes |
| `ctx.resolvePrompt(name, version?)` | Resolve a versioned prompt from the prompt-versioning system |

## `NodeOutput` — what every `execute()` returns

```typescript
interface NodeOutput {
  status: 'complete' | 'suspended' | 'failed';
  outputs: Record<string, unknown>;
  error?: { code: string; message: string; retryable: boolean };
  routingMeta?: { targetUsed: {...}; attemptCount: number; triggerHistory: unknown[] }; // LLM-calling nodes only
}
```

`suspended` is only returned by nodes that pause a run ([`core:human-review`](core-human-review.md), [`core:wait`](core-wait.md) in delay mode above 5s). `error.retryable` signals whether the engine's retry policy (`AgentConfig.retry`) should re-attempt the node.

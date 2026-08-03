# Node Catalog

53 built-in `core:*` node types live in `packages/nodes/src/nodes/`, one file per type (`core-<name>.ts`). Every agent graph — whether authored in the Studio canvas or as [Graph-as-Code](../developer-guide/graph-as-code.md) — is composed from these plus any Marketplace-installed package nodes. See [Node Authoring](../developer-guide/node-authoring.md) for how to add one.

This page is a prose overview. For per-node config fields, exact behavior, and gotchas verified against source — the reference to actually implement against — see **[Node Reference](nodes/README.md)**. Categories below match each node's real `meta.category` value.

## Control Flow

[`start`](nodes/core-start.md), [`end`](nodes/core-end.md), [`stop`](nodes/core-stop.md), [`condition`](nodes/core-condition.md), [`router`](nodes/core-router.md), [`fork`](nodes/core-fork.md), [`join`](nodes/core-join.md), [`loop`](nodes/core-loop.md), [`wait`](nodes/core-wait.md)

Graph entry/exit, branching, iteration, and fixed-branch-count parallel fork/join.

## AI / LLM

[`llm-call`](nodes/core-llm-call.md), [`tool-call`](nodes/core-tool-call.md), [`react`](nodes/core-react.md), [`agentic-router`](nodes/core-agentic-router.md), [`planner`](nodes/core-planner.md), [`reflection`](nodes/core-reflection.md), [`structured-extract`](nodes/core-structured-extract.md), [`prompt-builder`](nodes/core-prompt-builder.md), [`context-summarize`](nodes/core-context-summarize.md), [`embedding`](nodes/core-embedding.md), [`vector-search`](nodes/core-vector-search.md), [`token-budget`](nodes/core-token-budget.md)

Everything that calls the [Model Router](../developer-guide/architecture/model-router.md) directly or drives an agentic tool loop: single calls, structured extraction, ReAct/tool-call loops, LLM-powered routing, planning/reflection, prompt assembly, summarization, embeddings, vector search, and token budgeting.

## Data

[`transform`](nodes/core-transform.md), [`filter`](nodes/core-filter.md), [`validate`](nodes/core-validate.md), [`parse`](nodes/core-parse.md), [`aggregate`](nodes/core-aggregate.md), [`memory-read`](nodes/core-memory-read.md), [`memory-write`](nodes/core-memory-write.md)

General data shaping via JSONata, schema validation, string parsing, array aggregation, and in-run (non-persisted) memory reads/writes.

## Integration

[`http-request`](nodes/core-http-request.md), [`webhook-receive`](nodes/core-webhook-receive.md), [`web-search`](nodes/core-web-search.md), [`web-scrape`](nodes/core-web-scrape.md), [`file-read`](nodes/core-file-read.md), [`file-write`](nodes/core-file-write.md), [`db-query`](nodes/core-db-query.md), [`mcp-client`](nodes/core-mcp-client.md)

External-world I/O: generic HTTP, inbound webhooks, web search/scraping, workspace filesystem, SQL `SELECT`, and calling an [MCP server](../developer-guide/mcp.md). Vendor-specific actions (Slack, GitHub, Salesforce, etc.) come from [integration packages](integrations/README.md), not this core set.

## Composition

[`sub-graph`](nodes/core-sub-graph.md), [`handoff`](nodes/core-handoff.md), [`fan-out`](nodes/core-fan-out.md), [`reduce`](nodes/core-reduce.md), [`input-map`](nodes/core-input-map.md), [`output-map`](nodes/core-output-map.md), [`evaluate`](nodes/core-evaluate.md)

Invoking another agent as a sub-graph or handoff, per-item parallel fan-out/reduce (dynamic branch count, vs. control-flow's fixed fork/join), input/output namespace mapping, and scoring/evaluation.

## Code

[`code`](nodes/core-code.md)

Sandboxed JavaScript execution (`isolated-vm`) — its own category since it's the one node that runs arbitrary user code.

## Tool

[`tool`](nodes/core-tool.md)

Declares an LLM-facing tool contract wrapping a downstream action node — its own category since it's a special config-only declaration node, never executed directly in graph flow.

## Observability

[`log`](nodes/core-log.md), [`metric`](nodes/core-metric.md), [`annotation`](nodes/core-annotation.md)

Structured logging, metrics emission, and free-text annotations on the step record.

## Guardrails

[`guardrail`](nodes/core-guardrail.md), [`human-review`](nodes/core-human-review.md)

Policy/safety checks (block, reroute, or redact) and pausing a run for a human decision (resumed via `POST /v1/agents/{id}/runs/{runId}/review`).

## Session

[`session-read`](nodes/core-session-read.md), [`session-write`](nodes/core-session-write.md), [`session-clear`](nodes/core-session-clear.md)

Persisted [session](../developer-guide/sessions.md) context reads/writes/clears — distinct from Data's in-run `memory-read`/`memory-write`, which never touch the session store.

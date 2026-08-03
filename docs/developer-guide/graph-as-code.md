# Graph-as-Code

Agent graphs can be authored two ways, both first-class and both compiling to the same `AgentGraphDefinition` JSON format: drag-and-drop in the Studio canvas, or TypeScript via `packages/compiler`. Caal itself (`agents/caal.agent.ts`) is written this way.

## Authoring

```typescript
import { Agent, AgentGraph } from '@magicaal/compiler';

@Agent({
  handle: 'my-agent',
  name: 'My Agent',
  description: '...',
  config: {
    trigger: { type: 'rest', mode: 'async' },
    concurrency: { maxParallel: 10, queueTimeout: 30000 },
    session: { enabled: true, ttlSeconds: 86400, schemaVersion: 1, contextSchema: { /* ... */ } },
  },
})
export class MyAgent extends AgentGraph {
  build(): void {
    this.node('start', 'core:start');
    this.node('call-llm', 'core:llm-call', { /* node config */ });
    // ...edges connect nodes; see an existing *.agent.ts for the full pattern
  }
}
```

Agent files live in `agents/` (a pnpm workspace itself — see `pnpm-workspace.yaml`), named `*.agent.ts`.

For a full, verified authoring reference — every `AgentGraph` method, the complete `AgentConfig`/`SessionConfig` shapes, graph-validity rules, and a checklist of real config-shape bugs to avoid — see **[AGENTS.md — Graph-as-Code Authoring](AGENTS.md)**. That page is written for an AI coding agent generating `*.agent.ts` files and is the canonical reference for this task; this page is the narrative overview.

## Compiler (`packages/compiler`)

| Module | Role |
|---|---|
| `decorators.ts` | `@Agent(...)` — attaches `AgentMeta` to a class |
| `graph.ts` | `AgentGraph` base class — `this.node(id, type, config)`, `this.connect`/`this.when`/`this.otherwise`, `this.tool`, `this.workspace` build up the graph |
| `node-classes.ts` | Optional typed helper classes for IDE autocomplete on a subset of node types — generated, and known to lag the real node config shapes; see [AGENTS.md §6](AGENTS.md#6-node-config--verify-against-the-real-source-not-the-typed-helpers) before relying on one |
| `compile.ts` | `compile()` — turns a built `AgentGraph` instance into `AgentGraphDefinition` JSON; throws `CompileError` on invalid graphs |

## CLI Workflow

```bash
magicaal validate ./agents   # compile-check only, no output — use in CI
magicaal build ./agents --out ./dist/agents
```

See [CLI reference](../reference/cli.md) for the full command list. The `build` output is what `AGENTS_DIR` boot-time sync in `apps/api` picks up — no manual "import into Studio" step is needed; a compiled agent just appears.

## When to Use Which Path

Both are equally supported; Graph-as-Code suits agents you want to code-review, template, or generate programmatically (Caal itself is a good example of encoding non-obvious logic — see the extensive inline comments in `agents/caal.agent.ts` explaining specific data-flow bugs it works around). The canvas suits iterative, visual editing. An agent built one way can still be inspected (not edited back to source) from the other — the compiled JSON is the shared format both read.

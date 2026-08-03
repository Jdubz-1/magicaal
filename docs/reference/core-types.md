# Core Types (`@magicaal/core`)

`packages/core` is the platform's shared foundational type layer — **types-only, zero runtime code**, imported everywhere with `import type`. It defines ~80 interfaces across 8 domain modules in `packages/core/src/`:

| Module | Covers |
|---|---|
| `agent.ts` | `AgentGraphDefinition`, `NodeDefinition`, `AgentConfig` — the compiled graph format both authoring paths (canvas and [Graph-as-Code](../developer-guide/graph-as-code.md)) produce |
| `graph.ts` | Graph structural types: edges, conditions, node categories |
| `run.ts` | Run lifecycle types: status, steps, trajectory records |
| `llm.ts` | `ModelRouterConfig`, `ModelRouterStrategy`, `RouterTriggerCondition`, canonical LLM request/response shapes — see [Model Router](../developer-guide/architecture/model-router.md) |
| `session.ts` | `SessionConfig`, `ContextSchemaEntry`, `OverflowStrategy`, `SessionSchemaMigration` — see [Sessions](../developer-guide/sessions.md) |
| `agentic-router.ts` | Agentic routing/tool-selection types |
| `workspace.ts` | Workspace context types |
| `caal.ts` | Types shared with the [Caal](../developer-guide/caal.md) assistant |
| `tenant.ts` | Tenant/multi-tenancy types |

## Why types-only

Because `@magicaal/core` ships no runtime code, a plain `import` compiles but fails once the Docker build erases type-only imports. Always:

```typescript
import type { AgentGraphDefinition } from '@magicaal/core'; // ✅
```

See [Code Standards](../developer-guide/contributing/code-standards.md) for the full rule.

## Changing a Core Type

An `AgentGraphDefinition` schema change (breaking or additive) requires an RFC — see [RFC Process](../developer-guide/contributing/rfc-process.md).

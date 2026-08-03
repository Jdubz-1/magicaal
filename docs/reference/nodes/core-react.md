# `core:react` — ReAct

**Category:** ai-llm · **Version:** 1.0.0

Prompt-engineered Reason-Act loop. Executes tools **serially** (unlike [`core:tool-call`](core-tool-call.md), which runs them in parallel per iteration) with Thought/Action/Observation trajectory recording.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `inputKey` | `string` | Yes | Context key containing the user message or task |
| `outputKey` | `string` | Yes | Context key to write the final answer |
| `systemPrompt` | `string` | No | Optional system prompt for the agent |
| `maxIterations` | `number` | No | Maximum reasoning iterations (default: 10) |
| `router` | `ModelRouterConfig` | No | Inline or named policy reference |
| `injectSessionHistory` | `string` | No | Context key holding prior `CanonicalMessage[]` turns |

## Behavior Notes

Same pattern as `core:tool-call`: `execute()` itself returns `ENGINE_REQUIRED` — real execution happens in the engine's Tool Executor (`apps/engine/src/execution/tool-executor.ts`), which drives the serial reason/act/observe loop and records each step via `ctx.recordTrajectoryStep`.

Use `core:react` over `core:tool-call` when you need explicit reasoning traces or when tool calls must happen one at a time (e.g. later calls depend on earlier results in a way the model needs to see before deciding the next action).

## Example

```typescript
this.node('agent', 'core:react', { inputKey: 'task', outputKey: 'answer', maxIterations: 8 });
this.tool('search-docs', 'agent');
this.tool('run-calculation', 'agent');
```

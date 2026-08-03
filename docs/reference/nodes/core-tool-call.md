# `core:tool-call` — Tool Call

**Category:** ai-llm · **Version:** 1.0.0

LLM-driven tool invocation loop using native provider function calling. Executes tools in parallel per iteration. Pair with [`core:tool`](core-tool.md) nodes wired in via `this.tool(toolNodeId, agentNodeId)`.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `inputKey` | `string` | Yes | Context key containing the user message or task |
| `outputKey` | `string` | Yes | Context key to write the final answer |
| `systemPrompt` | `string` | No | System prompt for the agent |
| `maxIterations` | `number` | No | Maximum tool-call iterations (default: 10) |
| `router` | `ModelRouterConfig` | No | Inline or named policy reference |
| `injectSessionHistory` | `string` | No | Context key holding prior `CanonicalMessage[]` turns, prepended before this node runs |

## Behavior Notes

**Not executed by its own `execute()` method.** `execute()` unconditionally returns `ENGINE_REQUIRED` — real execution is special-cased by the Tool Executor in `apps/engine/src/execution/tool-executor.ts` (invoked from `worker.ts`), which resolves the node's tool edges (`this.tool(...)` calls targeting this node id) into the LLM's available function-call tools. The `execute()` body only matters for unit tests run outside the engine.

## Example

```typescript
this.node('assistant', 'core:tool-call', {
  inputKey: 'task',
  outputKey: 'result',
  maxIterations: 5,
});
this.tool('lookup-order', 'assistant');
this.tool('issue-refund', 'assistant');
```

See `agents/caal.agent.ts`'s `suggester`/`modifier` nodes for a real multi-tool example.

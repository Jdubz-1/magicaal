# `core:tool` — Tool

**Category:** tool · **Version:** 1.0.0

Declares an LLM-facing tool contract wrapping any downstream action node. Wire it to an agentic node (`core:react`/`core:tool-call`) with `this.tool(toolNodeId, agentNodeId)`.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | LLM-facing tool name (unique within the agent) |
| `description` | `string` | Yes | Explains what the tool does and when to use it — this is what the LLM reads to decide whether to call it |
| `inputSchema` | `object` (JSON Schema) | Yes | Schema for the tool's parameters, as the LLM will provide them |
| `outputMapping` | `string` | Yes | Context key containing the tool result, returned to the LLM |
| `inputMapping` | `Record<string, string>` | No | Maps the LLM's argument names to context keys |

## Behavior Notes

`execute()` is **never called in normal graph flow** — the engine's Tool Executor reads this node's config directly when assembling the tool list for whichever agentic node it's wired to via a tool edge. Downstream of a `core:tool` node in the graph is typically the actual action (an `core:http-request`, `core:db-query`, etc.) that the tool wraps.

## Example

```typescript
this.node('lookup-order-tool', 'core:tool', {
  name: 'lookup_order',
  description: 'Look up an order by its id and return its current status.',
  inputSchema: { type: 'object', required: ['orderId'], properties: { orderId: { type: 'string' } } },
  outputMapping: 'orderLookupResult',
});
this.node('lookup-order-action', 'core:db-query', {
  connectionId: 'orders-db',
  query: 'SELECT * FROM orders WHERE id = $1',
  paramsKey: 'orderId',
  outputKey: 'orderLookupResult',
});
this.connect('lookup-order-tool', 'lookup-order-action');
this.tool('lookup-order-tool', 'assistant-node-id');
```

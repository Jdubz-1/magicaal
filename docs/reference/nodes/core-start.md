# `core:start` — Start

**Category:** control-flow · **Version:** 1.0.0 · **`canTrigger: true`**

Entry point of the agent graph. Declares the input schema and writes input values to context. Every graph must have exactly one `core:start` node (enforced by `compile()`).

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `inputSchema` | `object` | No | JSON Schema for the expected input payload |

## Output

All input keys are written directly to context (`ctx.data`) — there is no `outputKey`; every key of the run's input becomes a top-level context key immediately available to downstream nodes.

## Example

```typescript
this.node('start', 'core:start', {
  inputSchema: {
    type: 'object',
    required: ['message'],
    properties: { message: { type: 'string' } },
  },
});
```

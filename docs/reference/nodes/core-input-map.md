# `core:input-map` — Input Map

**Category:** composition · **Version:** 1.0.0

Maps context keys into a sub-graph input namespace using JSONata expressions. Place immediately before [`core:sub-graph`](core-sub-graph.md).

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `mapping` | `Record<string, string>` | Yes | Output context key → JSONata expression, evaluated against the current context |

## Output

Each key in `mapping` is written to context with its evaluated value.

## Example

```typescript
this.node('map-input', 'core:input-map', {
  mapping: { input: '{ "task": $.userTask, "priority": $.priority ?? "normal" }' },
});
this.node('run-sub', 'core:sub-graph', { agentId: 'worker-agent' });
this.connect('map-input', 'run-sub');
```

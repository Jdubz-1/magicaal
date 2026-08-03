# `core:output-map` — Output Map

**Category:** composition · **Version:** 1.0.0

Remaps context keys after a sub-graph returns. Maps a parent context key → a source key already present in context (typically the sub-graph's output key).

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `mapping` | `Record<string, string>` | Yes | Parent context key → source key in context |

Note: unlike `core:input-map`, values here are plain **context key names**, not JSONata expressions.

## Output

Each key in `mapping` is written to context, copied from its corresponding source key's current value.

## Example

```typescript
this.node('run-sub', 'core:sub-graph', { agentId: 'worker-agent', outputKey: 'sub_graph_output' });
this.node('remap-output', 'core:output-map', { mapping: { finalAnswer: 'sub_graph_output' } });
this.connect('run-sub', 'remap-output');
```

# `core:sub-graph` — Sub-Graph

**Category:** composition · **Version:** 1.0.0

Invokes another agent as a child run. Awaitable or fire-and-forget.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | ID of the target agent to invoke |
| `inputKey` | `string` | No | Context key containing the sub-graph input (default: `input`) |
| `outputKey` | `string` | No | Context key to write the sub-graph output to (default: `sub_graph_output`) |
| `await` | `boolean` | No | Wait for completion (default: `true`) |

## Output

| Key | Type |
|---|---|
| `[outputKey]` | the sub-run's output object (or `{ runId }` if not awaited) |
| `_sub_run_id` | `string` |

Fails with `SUB_GRAPH_NOT_AVAILABLE` if run outside the engine (e.g. a unit test with no `dispatchSubRun` on the context).

Pair with [`core:input-map`](core-input-map.md) beforehand to shape the sub-graph's input namespace, and [`core:output-map`](core-output-map.md) after to remap its output back into the parent's naming.

## Example

```typescript
this.node('map-input', 'core:input-map', { mapping: { input: '{ "task": $.task }' } });
this.node('run-sub-agent', 'core:sub-graph', { agentId: 'sub-agent-handle', outputKey: 'subResult' });
this.connect('map-input', 'run-sub-agent');
```

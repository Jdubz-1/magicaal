# `core:loop` — Loop

**Category:** control-flow · **Version:** 1.0.0

Controls a cycle in the graph. On each pass it evaluates `condition`: `true` continues the loop (the back edge fires), `false` exits to the next unconditional edge. The engine tracks iteration count and enforces `maxIterations` independently of the condition.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `condition` | `string` | Yes | JSONata boolean — `true` continues the loop, `false` exits |
| `maxIterations` | `number` | No | Hard cap on loop iterations (default: 50) |
| `iterationKey` | `string` | No | Context key to write the current iteration index to (0-based) |

## Output

| Key | Type |
|---|---|
| `_loop_continue` | `boolean` |
| `_loop_iteration` | `number` (0-based) |

## Example

```typescript
this.node('retry-loop', 'core:loop', {
  condition: '$._valid = false and $.retryCount < 3',
  maxIterations: 3,
  iterationKey: 'retryCount',
});
this.when('retry-loop', '$._loop_continue = true', 'retry-step');
this.otherwise('retry-loop', 'give-up');
```

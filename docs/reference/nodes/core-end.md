# `core:end` — End

**Category:** control-flow · **Version:** 1.0.0

Terminal node of the agent graph. Collects configured output keys from context as the run result. Every graph must contain at least one `core:end` node (enforced by `compile()`); a graph can have several, one per terminal branch.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `outputKeys` | `string[]` | No | Context keys to include in the run output. If omitted, **all** context data is returned. |

Note: the field is `outputKeys` (plural array) — not `outputKey` (singular), despite what `packages/compiler/src/node-classes.ts`'s stale `EndNode` helper claims.

## Output

The selected context values, returned as the agent run's result.

## Example

```typescript
this.node('end', 'core:end', { outputKeys: ['content'] });
```

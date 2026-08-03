# `core:join` — Join

**Category:** control-flow · **Version:** 1.0.0

Barrier node that waits for all upstream parallel branches (from a `core:fork`) to complete, then merges their context outputs according to the specified strategy before continuing.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `mergeStrategy` | `'last-wins' \| 'merge' \| 'collect'` | Yes | `last-wins`: latest branch output overwrites earlier keys. `merge`: deep-merge all branch outputs. `collect`: gather each branch output into an array at `collectKey`. |
| `collectKey` | `string` | Required when `mergeStrategy` is `'collect'` | Context key to write the collected array to |

## Output

| Key | Type |
|---|---|
| `_join_branch_count` | `number` |

Note: the actual merge is performed by the engine worker before this node's `execute()` runs; the node itself just marks the join point complete and resets `_fork_active`.

## Example

```typescript
this.node('join', 'core:join', { mergeStrategy: 'merge' });
```

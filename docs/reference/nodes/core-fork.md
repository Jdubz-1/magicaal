# `core:fork` — Fork

**Category:** control-flow · **Version:** 1.0.0

Splits execution into parallel branches. All outbound unconditional edges fire simultaneously and execute in parallel. Pair with a downstream `core:join` to merge results.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `branchKey` | `string` | No | Context key to write the number of parallel branches to |

## Output

| Key | Type |
|---|---|
| `_fork_branch_count` | `number` |

Note: actual parallel dispatch is handled by the engine worker, not by this node's own logic — `execute()` just marks the fork point (`_fork_active = true`).

## Example

```typescript
this.node('fork', 'core:fork');
this.connect('fork', 'branch-a');
this.connect('fork', 'branch-b');
this.connect('branch-a', 'join');
this.connect('branch-b', 'join');
```

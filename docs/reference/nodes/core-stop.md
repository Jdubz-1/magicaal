# `core:stop` — Stop

**Category:** control-flow · **Version:** 1.0.0

Explicitly terminates the run with a `STOPPED` status. The lifecycle manager detects `_terminated` and ends the run. Use this for an early-exit branch that isn't a normal completion (distinct from routing to a `core:end` node).

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `reason` | `string` | No | Reason recorded in the run output |

## Output

| Key | Type | Notes |
|---|---|---|
| `_terminated` | `boolean` (`true`) | Signal the lifecycle manager checks |
| `reason` | `string` | Defaults to `'Stopped'` if `reason` is not set |

## Example

```typescript
this.node('bail-out', 'core:stop', { reason: 'User declined the proposed action' });
```

# `core:wait` — Wait

**Category:** control-flow · **Version:** 1.0.0

Pauses execution for a fixed delay or until a JSONata condition resolves to true. Times out and returns `_wait_timed_out: true` (does not fail the run) if the condition is never met.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `mode` | `'delay' \| 'condition'` | Yes | `delay`: pause for `delayMs` milliseconds. `condition`: poll `condition` until true. |
| `delayMs` | `number` | For `mode: 'delay'` | Delay in milliseconds |
| `condition` | `string` | For `mode: 'condition'` | JSONata boolean expression to poll |
| `pollIntervalMs` | `number` | No | Polling interval in ms (default: 500) — condition mode only |
| `timeoutMs` | `number` | No | Maximum wait time in ms before timing out (default: 30000) — condition mode only |

## Output

| Key | Type |
|---|---|
| `_wait_elapsed_ms` | `number` |
| `_wait_timed_out` | `boolean` |

## Behavior Notes

- **`delay` mode above 5 seconds** (`WAIT_SUSPEND_THRESHOLD_MS`): the run **suspends** and resumes via a delayed BullMQ job instead of holding an engine worker slot for the whole duration — status returned is `suspended`, not `complete`, on the first pass.
- **`delay` mode at or below 5 seconds**: an ordinary in-process `setTimeout` sleep; the worker slot is held.
- **`condition` mode**: always in-process polling for its full duration (no suspend/resume) — a long condition poll holds a worker slot the entire time.

## Example

```typescript
this.node('cooldown', 'core:wait', { mode: 'delay', delayMs: 10_000 });
this.node('wait-for-flag', 'core:wait', { mode: 'condition', condition: '$.ready = true', timeoutMs: 60_000 });
```

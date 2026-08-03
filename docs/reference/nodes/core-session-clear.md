# `core:session-clear` — Session Clear

**Category:** session · **Version:** 1.0.0

Marks session context keys for deletion at run end. If no keys are specified, schedules a full session clear.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `keys` | `string[]` | No | Specific session keys to clear. If omitted, everything is cleared. |

## Behavior Notes

This node does **not** delete anything immediately — it sets the named keys to `undefined` in the current run context (so they read as empty for the rest of this run) and records which keys (or "all") to clear, which the session manager acts on when the run ends and persists session state.

## Example

```typescript
this.node('reset-conversation', 'core:session-clear'); // clears everything
this.node('clear-proposal', 'core:session-clear', { keys: ['lastProposal'] });
```

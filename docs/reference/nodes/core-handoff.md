# `core:handoff` — Handoff

**Category:** composition · **Version:** 1.0.0

Delegates to a target agent with an explicit handoff message. **Always fire-and-forget** (unlike [`core:sub-graph`](core-sub-graph.md), which can await) — recorded as a named delegation event (`ctx.emit('handoff', ...)`) in the run trace.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | ID of the target agent |
| `messageKey` | `string` | Yes | Context key containing the handoff message |
| `outputKey` | `string` | No | Context key to write the dispatched run id to (default: `_handoff_run_id`) |

## Output

| Key | Type |
|---|---|
| `[outputKey]` | `string` (the dispatched run's id) |

Fails with `HANDOFF_NOT_AVAILABLE` if run outside the engine.

## Example

```typescript
this.node('escalate', 'core:handoff', { agentId: 'human-escalation-agent', messageKey: 'escalationMessage' });
```

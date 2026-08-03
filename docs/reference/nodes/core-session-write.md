# `core:session-write` — Session Write

**Category:** session · **Version:** 1.0.0

Writes values to the run context under session-tracked keys. The actual persistence to the session store happens at run end (`saveSession`), driven by the agent's `SessionConfig.contextSchema` accumulation rules (`replace`/`append`/`merge`) — this node just stages the values.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `writes` | `Record<string, unknown>` | Yes | `{ sessionKey: valueOrJSONata }` — a string value starting with `$` is evaluated as a JSONata expression against the current run context; anything else (including non-`$`-prefixed strings) is used as a literal |

## Example

```typescript
this.node('session-write', 'core:session-write', {
  writes: {
    messages: '$append($.sessionMessages ?? [], [{"role": "user", "content": $.message}, {"role": "assistant", "content": $.content}])',
    lastProposal: '$._caal_proposal',
  },
});
```

This is the exact pattern `agents/caal.agent.ts` uses to persist a conversation turn. Every key written here must have a matching entry in the agent's `SessionConfig.contextSchema` with an accumulation `type` (`append`/`replace`/`merge`) that matches how you're writing it — writing with `$append(...)` to a `type: 'replace'` key works but defeats the purpose of the schema's own accumulation logic. See [Sessions](../../developer-guide/sessions.md).

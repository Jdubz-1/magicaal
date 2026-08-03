# `core:session-read` — Session Read

**Category:** session · **Version:** 1.0.0

Reads values from the **persisted session context** into the run context. Session values are already preloaded at run start ([Sessions](../../developer-guide/sessions.md) — `SessionManager.loadSession`); this node makes that explicit in the graph flow so downstream nodes have named context keys to read.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `reads` | `Record<string, string>` | Yes | `{ targetContextKey: sessionKey }` — reads each `sessionKey` into `targetContextKey` |

Only keys with a defined value in the loaded session are written; missing session keys are silently skipped (not an error).

## Example

```typescript
this.node('session-read', 'core:session-read', {
  reads: { sessionMessages: 'messages', lastProposal: 'lastProposal', userPreferences: 'userPreferences' },
});
```

This is the exact node `agents/caal.agent.ts` uses at the start of every run. Every key on the right (`messages`, `lastProposal`, `userPreferences`) must have a matching entry in the agent's `SessionConfig.contextSchema` — see [Sessions](../../developer-guide/sessions.md).

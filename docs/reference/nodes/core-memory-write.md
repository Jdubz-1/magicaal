# `core:memory-write` — Memory Write

**Category:** data · **Version:** 1.0.0

Writes one or more computed values into the in-run context. Each value is resolved from a JSONata expression evaluated against the current context data.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `writes` | `Array<{ key: string; valueExpression: string; mode?: 'replace' \| 'append' \| 'increment' }>` | Yes | Write operations, performed in array order |

- `mode: 'replace'` (default) — overwrite the key
- `mode: 'append'` — push onto an array (creates a one-item array if the key wasn't already an array)
- `mode: 'increment'` — add the resolved number to the existing numeric value (treats missing as `0`)

## Output

| Key | Type |
|---|---|
| `_memory_keys_written` | `string[]` |

Fails with `MEMORY_WRITE_EXPRESSION_ERROR` if any `valueExpression` fails to evaluate.

## Example

```typescript
this.node('track-attempt', 'core:memory-write', {
  writes: [
    { key: 'attempts', valueExpression: '1', mode: 'increment' },
    { key: 'history', valueExpression: '$.currentStep', mode: 'append' },
  ],
});
```

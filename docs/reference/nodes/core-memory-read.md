# `core:memory-read` — Memory Read

**Category:** data · **Version:** 1.0.0

Reads one or more named keys from the **in-run** context (not persisted session storage — for that, see [`core:session-read`](core-session-read.md)) and makes them explicit/available for downstream nodes, applying defaults for missing keys.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `keys` | `string[]` | Yes | Context keys to read |
| `defaultValues` | `Record<string, unknown>` | No | Default value per key, used when the key isn't already set |
| `failIfMissing` | `boolean` | No | Fail the node if any key has neither an existing value nor a default (default: `false`) |

## Output

| Key | Type |
|---|---|
| `_memory_keys_read` | `string[]` |
| `_memory_missing_keys` | `string[]` |

## Example

```typescript
this.node('read-defaults', 'core:memory-read', {
  keys: ['retryCount', 'userTier'],
  defaultValues: { retryCount: 0, userTier: 'standard' },
});
```

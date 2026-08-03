# `core:log` — Log

**Category:** observability · **Version:** 1.0.0

Writes a message to the run log and emits it as an observable event.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `level` | `'debug' \| 'info' \| 'warn' \| 'error'` | Yes | Log severity |
| `message` | `string` | Yes | Message text (used unless `messageKey` is set) |
| `messageKey` | `string` | No | Context key whose value is used as the message instead of `message` |
| `outputKey` | `string` | No | Context key to also write the logged message to |

## Output

| Key | Type |
|---|---|
| `_logged` | `boolean` (`true`) |
| `_log_message` | `string` |

## Example

```typescript
this.node('log-start', 'core:log', { level: 'info', message: 'Processing started' });
```

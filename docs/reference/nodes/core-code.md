# `core:code` — Code

**Category:** code · **Version:** 1.0.0

Executes a JavaScript snippet in an isolated VM sandbox (`isolated-vm`). Input context keys are injected as read-only globals. The snippet must assign to a `result` variable; its value is written to `outputKey`. **No network or filesystem access inside the sandbox.**

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `code` | `string` | Yes | JavaScript to execute. Must assign to `result`. Example: `` `result = input * 2;` `` |
| `outputKey` | `string` | Yes | Context key to write `result`'s value to |
| `inputKeys` | `string[]` | No | Context keys to inject as read-only globals inside the sandbox |
| `timeoutMs` | `number` | No | Max execution time (default: 5000) |
| `memoryMb` | `number` | No | Max heap memory (default: 64) |

## Output

| Key | Type |
|---|---|
| `[outputKey]` | value of `result` after the snippet runs |
| `_code_result` | same value |

## Behavior Notes

- The sandbox requires the `isolated-vm` native module to be available; if it failed to build/load in the current environment, the node fails with `CODE_SANDBOX_UNAVAILABLE` rather than silently doing nothing.
- Distinct error codes are surfaced for `CODE_TIMEOUT`, `CODE_MEMORY_EXCEEDED`, and `CODE_SYNTAX_ERROR` in addition to the generic `CODE_EXECUTION_FAILED` — useful for a downstream retry/fallback branch to distinguish "your code is broken" from "it ran too long."

## Example

```typescript
this.node('compute-total', 'core:code', {
  inputKeys: ['lineItems'],
  code: 'result = lineItems.reduce((sum, i) => sum + i.amount, 0);',
  outputKey: 'total',
});
```

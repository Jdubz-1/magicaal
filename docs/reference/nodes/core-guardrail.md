# `core:guardrail` — Guardrail

**Category:** guardrails · **Version:** 1.0.0

Evaluates a set of JSONata rule expressions against the current context. A rule **fires when its expression evaluates to `true`**, meaning a policy has been violated (not the reverse — this trips people up).

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `mode` | `'block-and-fail' \| 'reroute-to-fallback' \| 'redact-and-continue'` | Yes | What to do on violation (see below) |
| `rules` | `Array<{ expression: string; description?: string; redactKey?: string; redactValue?: string }>` | Yes | `expression` returning `true` means a policy is violated |
| `failureMessage` | `string` | No | Message set in `_guardrail_reason` on violation (falls back to the violating rule's `description`) |

**`mode` behavior:**
- `block-and-fail` — terminates the run with a `GUARDRAIL_BLOCKED` error (not retryable)
- `reroute-to-fallback` — sets `_guardrail_blocked = true` and continues, so the fallback edge (`this.otherwise(...)`) fires
- `redact-and-continue` — replaces the offending context value(s) at each violated rule's `redactKey` (with `redactValue`, default `"[REDACTED]"`) and continues normally

## Output

| Key | Type |
|---|---|
| `_guardrail_passed` | `boolean` |
| `_guardrail_blocked` | `boolean` |
| `_guardrail_redacted` | `boolean` |
| `_guardrail_reason` | `string` (only set on violation) |

Rule evaluation stops at the **first** rule that fires; a rule expression that itself errors is treated as non-violating (fails safe/open, not closed) rather than blocking the run.

## Example

```typescript
this.node('pii-check', 'core:guardrail', {
  mode: 'redact-and-continue',
  rules: [
    { expression: '$contains($.content, /\\d{3}-\\d{2}-\\d{4}/)', description: 'SSN detected', redactKey: 'content', redactValue: '[REDACTED-SSN]' },
  ],
});
```

# `core:condition` — Condition

**Category:** control-flow · **Version:** 1.0.0

Evaluates a JSONata boolean expression against context data. Writes the result to `_condition`. Connect outbound edges with conditions `$._condition = true` / `$._condition = false` — or more idiomatically, use `this.when(from, 'true condition', trueTarget)` and `this.otherwise(from, falseTarget)`.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `expression` | `string` | Yes | JSONata expression that evaluates to a boolean |

## Output

| Key | Type |
|---|---|
| `_condition` | `boolean` |

## Example

```typescript
this.node('has-attachment', 'core:condition', { expression: '$.attachments and $count($.attachments) > 0' });
this.when('has-attachment', '$._condition = true', 'process-attachment');
this.otherwise('has-attachment', 'skip');
```

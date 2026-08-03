# `core:filter` — Filter

**Category:** data · **Version:** 1.0.0

Evaluates a boolean JSONata expression. Passes context through when true; use the fallback edge for when it's false — lets you filter the flow without a full `core:condition` branch pair.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `expression` | `string` | Yes | JSONata expression that must evaluate to `true` to pass |

## Output

| Key | Type |
|---|---|
| `_filter_pass` | `boolean` |

## Example

```typescript
this.node('only-urgent', 'core:filter', { expression: '$.priority = "urgent"' });
this.connect('only-urgent', 'escalate'); // taken when _filter_pass is true
this.otherwise('only-urgent', 'normal-queue');
```

# `core:metric` — Metric

**Category:** observability · **Version:** 1.0.0

Emits a named numeric metric for the current run. Recorded in telemetry and visible in the Admin telemetry dashboard.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | Metric name (e.g. `"tokens_used"`, `"items_processed"`) |
| `value` | `number` | No | Static value to record (used if `valueKey` is not set) |
| `valueKey` | `string` | No | JSONata expression resolving the metric value from context — **overrides `value`** |

If neither is resolvable to a number, the node fails with `METRIC_VALUE_NOT_NUMBER`. If both are omitted, `value` defaults to `1`.

## Output

| Key | Type |
|---|---|
| `_metric_recorded` | `boolean` (`true`) |

## Example

```typescript
this.node('count-item', 'core:metric', { name: 'items_processed', valueKey: '$count($.items)' });
```

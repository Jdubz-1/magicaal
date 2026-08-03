# `core:aggregate` — Aggregate

**Category:** data · **Version:** 1.0.0

Reduces an array at a context key using a specified aggregation operation.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `inputKey` | `string` | Yes | Context key containing the array to aggregate |
| `operation` | `'sum' \| 'count' \| 'collect' \| 'min' \| 'max' \| 'average' \| 'first' \| 'last'` | Yes | Aggregation to perform |
| `outputKey` | `string` | Yes | Context key to write the result to |
| `valueKey` | `string` | No | For `sum`/`min`/`max`/`average`: the property to read from each array item (omit to use the item itself as the number) |

## Output

| Key | Type |
|---|---|
| `[outputKey]` | number, or the array/item itself for `collect`/`first`/`last`/`count` |
| `_aggregate_result` | same value |

Non-numeric items are filtered out (`isNaN`-checked) before `sum`/`min`/`max`/`average`; `min`/`max`/`average` return `null` if nothing numeric remains.

## Example

```typescript
this.node('total-cost', 'core:aggregate', { inputKey: 'lineItems', operation: 'sum', valueKey: 'amount', outputKey: 'total' });
```

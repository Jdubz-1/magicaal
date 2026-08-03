# `core:fan-out` — Fan-Out

**Category:** composition · **Version:** 1.0.0

Spawns a parallel branch per item in a named array. Pair with [`core:reduce`](core-reduce.md) downstream to collect results — this is the data-driven counterpart to [`core:fork`](core-fork.md)/[`core:join`](core-join.md)'s fixed-branch-count parallelism.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `arrayKey` | `string` | Yes | Context key containing the array to fan out over |
| `itemKey` | `string` | No | Context key for each item within its branch (default: `_fanout_item`) |
| `resultsKey` | `string` | No | Context key where branch results are written (default: `_fanout_results`) — **must match the paired `core:reduce`'s `resultsKey`** |

## Output

| Key | Type |
|---|---|
| `_fanout_count` | `number` |

Fails with `FAN_OUT_INVALID_INPUT` if `arrayKey`'s value isn't an array. Actual parallel dispatch, one branch per item, is handled by the engine worker's fan-out special case — this node's own `execute()` just validates the array and records the count.

## Example

```typescript
this.node('fan-out-items', 'core:fan-out', { arrayKey: 'orderIds', itemKey: 'orderId', resultsKey: 'orderResults' });
this.connect('fan-out-items', 'process-one-order'); // runs once per item, $.orderId available
this.node('collect', 'core:reduce', { outputKey: 'allResults', mergeStrategy: 'collect', resultsKey: 'orderResults' });
this.connect('process-one-order', 'collect');
```

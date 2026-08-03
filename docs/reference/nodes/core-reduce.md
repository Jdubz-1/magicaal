# `core:reduce` — Reduce

**Category:** composition · **Version:** 1.0.0

Collects [`core:fan-out`](core-fan-out.md) branch outputs and merges them via the configured strategy. The consumer side of the fan-out/reduce pair.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `outputKey` | `string` | Yes | Context key to write the merged result to |
| `mergeStrategy` | `'collect' \| 'merge' \| 'last-wins'` | No | Default: `collect` |
| `resultsKey` | `string` | No | Context key to read branch results from (default: `_fanout_results`) — **must match the paired `core:fan-out`'s `resultsKey`** |

`collect` returns the raw results array; `merge` deep-merges (`Object.assign`) all branch result objects together; `last-wins` returns only the final branch's result.

## Output

`[outputKey]` — the merged value, per the strategy above.

## Example

See [`core:fan-out`](core-fan-out.md) for the full pattern.

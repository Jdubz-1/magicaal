# `core:token-budget` — Token Budget

**Category:** ai-llm · **Version:** 1.0.0

Estimates token count for a context value and sets an over-budget flag for a downstream conditional edge to branch on (e.g. into a trim/summarize path).

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `inputKey` | `string` | Yes | Context key to estimate |
| `budgetTokens` | `number` | Yes | Token budget threshold |
| `overBudgetKey` | `string` | No | Context key for the boolean over-budget flag (default: `_over_budget`) |
| `estimatedTokensKey` | `string` | No | Context key for the estimated token count (default: `_estimated_tokens`) |

## Behavior Notes

The estimate is a **rough heuristic** (`~4 characters per token`), not a real tokenizer — treat the threshold as a conservative trigger, not an exact count. Non-string values are `JSON.stringify`'d before estimating.

## Example

```typescript
this.node('check-budget', 'core:token-budget', { inputKey: 'sessionMessages', budgetTokens: 8000 });
this.when('check-budget', '$._over_budget = true', 'summarize-history');
this.otherwise('check-budget', 'call-llm');
```

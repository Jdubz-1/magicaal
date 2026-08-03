# `core:evaluate` — Evaluate

**Category:** composition · **Version:** 1.0.0

Scores a context value via rule-based, LLM-as-judge, or exact-match evaluation. Emits the score to telemetry as a metric (`evaluate.<evaluatorType>`). Backs the platform's test-case system.

## Config

Base fields (always required) plus one of three evaluator-specific shapes, discriminated by `evaluatorType`:

| Field | Type | Required | Description |
|---|---|---|---|
| `inputKey` | `string` | Yes | Context key holding the value to evaluate |
| `scoreOutputKey` | `string` | Yes | Context key to write the numeric score to |
| `evaluatorType` | `'rule-based' \| 'llm-judge' \| 'exact-match'` | Yes | |
| `labelOutputKey` | `string` | No | Context key to write a human-readable label to |

**`evaluatorType: 'rule-based'`:**
| Field | Type | Description |
|---|---|---|
| `rules` | `Array<{ expression: string; score: number; label?: string }>` | Evaluated in order; the first `expression` that evaluates to `true`/`1` sets the score |

**`evaluatorType: 'llm-judge'`:**
| Field | Type | Description |
|---|---|---|
| `rubric` | `string` | Scoring rubric given to the judge LLM |
| `router` | `ModelRouterConfig` | Optional |

**`evaluatorType: 'exact-match'`:**
| Field | Type | Description |
|---|---|---|
| `expectedKey` | `string` | Context key holding the expected value; scores `1.0` if `JSON.stringify` matches, else `0.0` |

## Output

| Key | Type |
|---|---|
| `[scoreOutputKey]` | `number` |
| `[labelOutputKey]` | `string` (if set) |

## Example

```typescript
this.node('score-response', 'core:evaluate', {
  inputKey: 'response',
  scoreOutputKey: 'score',
  evaluatorType: 'llm-judge',
  rubric: 'Score 0-1 on how helpful and accurate the response is.',
});
```

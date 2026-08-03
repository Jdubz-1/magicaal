# `core:planner` — Planner

**Category:** ai-llm · **Version:** 1.0.0

LLM decomposes a goal into a structured plan consumed by downstream nodes. Records a trajectory step (`ctx.recordTrajectoryStep`).

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `goalKey` | `string` | Yes | Context key holding the goal text |
| `outputKey` | `string` | Yes | Context key to write the plan to |
| `systemPrompt` | `string` | No | Defaults to a generic step-decomposition prompt |
| `planSchema` | `object` (JSON Schema) | No | Expected plan structure; if set, the response is parsed as JSON |
| `router` | `ModelRouterConfig` | No | |

## Output

`[outputKey]` — the plan, as parsed JSON if `planSchema` was set, otherwise the raw LLM response string.

## Example

```typescript
this.node('plan', 'core:planner', {
  goalKey: 'goal',
  outputKey: 'steps',
  planSchema: { type: 'object', properties: { steps: { type: 'array', items: { type: 'string' } } } },
});
```

# `core:reflection` — Reflection

**Category:** ai-llm · **Version:** 1.0.0

Routes a context value through an iterative LLM critique loop until an acceptance condition is met.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `inputKey` | `string` | Yes | Context key holding the initial value to critique |
| `outputKey` | `string` | Yes | Context key updated with each iteration's result |
| `systemPrompt` | `string` | Yes | Critique prompt — the LLM should return an improved version |
| `acceptanceExpression` | `string` | Yes | JSONata boolean, evaluated against context after each iteration |
| `maxIterations` | `number` | No | Max critique cycles (default: 5) |
| `router` | `ModelRouterConfig` | No | |

## Behavior Notes

Each iteration calls the LLM with `systemPrompt` and the current value as the user message, writes the response to `outputKey`, then evaluates `acceptanceExpression` against the (now-updated) context. Loops until accepted or `maxIterations` is reached — whichever comes first; hitting the cap is not an error, the last iteration's output is still returned.

## Example

```typescript
this.node('polish-draft', 'core:reflection', {
  inputKey: 'draft',
  outputKey: 'draft',
  systemPrompt: 'Critique this draft for clarity and correctness. If it is already excellent, return it unchanged.',
  acceptanceExpression: '$length($.draft) > 0 and $not($contains($.draft, "TODO"))',
  maxIterations: 3,
});
```

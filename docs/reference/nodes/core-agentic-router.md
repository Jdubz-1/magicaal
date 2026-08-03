# `core:agentic-router` — Agentic Router

**Category:** ai-llm · **Version:** 1.0.0

LLM-powered intent classifier — the "smart" counterpart to [`core:router`](core-router.md)'s pure-JSONata routing. Calls the configured model with a classification prompt auto-built from the declared `cases`. Writes the selected route key to `routeOutputKey`. If confidence falls below `confidenceThreshold`, overrides the route to `"_human_review"` for HITL escalation.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `inputKey` | `string` | Yes | Context key whose string value is the text to classify |
| `cases` | `Array<{ key, label, description }>` | Yes | Declared routing cases — each needs a unique `key`, a `label`, and a `description` used in the auto-built classification prompt |
| `routeOutputKey` | `string` | Yes | Context key to write the selected route key to. Outbound conditional edges should check this key. |
| `router` | `ModelRouterConfig` | No | Router config for the classification LLM call |
| `model` | `string` | No | **Deprecated** — use `router` instead; kept only for backwards compatibility |
| `confidenceOutputKey` | `string` | No | Context key to write the confidence score (0.0–1.0) |
| `reasoningOutputKey` | `string` | No | Context key to write the reasoning text |
| `confidenceThreshold` | `number` | No | If confidence is below this, the route is overridden to `"_human_review"` |
| `systemPrompt` | `string` | No | Additional system prompt injected before the auto-generated classification prompt |

## Output

| Key | Type |
|---|---|
| `[routeOutputKey]` | `string` — one of the declared `cases[].key`, or `"_human_review"` |
| `_route` | same as above |
| `_route_confidence` | `number` (0–1) |
| `_route_reasoning` | `string` |

## Example

```typescript
this.node('classify-request', 'core:agentic-router', {
  inputKey: 'message',
  cases: [
    { key: 'refund', label: 'Refund Request', description: 'Customer wants money back for an order' },
    { key: 'shipping', label: 'Shipping Question', description: 'Customer asking about delivery status' },
    { key: 'other', label: 'Other', description: 'Anything not covered above' },
  ],
  routeOutputKey: '_route',
  confidenceThreshold: 0.6,
});
this.when('classify-request', '$._route = "refund"', 'handle-refund');
this.when('classify-request', '$._route = "shipping"', 'handle-shipping');
this.when('classify-request', '$._route = "_human_review"', 'escalate');
this.otherwise('classify-request', 'handle-other');
```

# `core:structured-extract` — Structured Extract

**Category:** ai-llm · **Version:** 1.0.0

Calls an LLM with **mandatory** structured output validation — `outputSchema` is required and always enforced (equivalent to [`core:llm-call`](core-llm-call.md) with `outputSchema` always active). The parsed JSON object is written to `outputKey`.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `outputSchema` | `object` (JSON Schema) | Yes | Required schema for structured output |
| `outputKey` | `string` | Yes | Context key to write the parsed object to |
| `systemPrompt` | `string` | No | |
| `userMessage` | `string` | No | Literal message text |
| `messagesKey` | `string` | No | Context key with a `CanonicalMessage[]` — overrides `userMessage` |
| `router` | `ModelRouterConfig` | No | |
| `maxTokens` | `number` | No | |
| `temperature` | `number` | No | |
| `retryOnMalformed` | `number` | No | Retries on invalid JSON (default: 2) |

Note: unlike `core:llm-call`, this node has no `userMessageKey` field — only the literal `userMessage` or a full `messagesKey`.

## Output

| Key | Type |
|---|---|
| `[outputKey]` | parsed object matching `outputSchema` |
| `_extract_result` | same value |

## Example

```typescript
this.node('extract-ticket', 'core:structured-extract', {
  userMessage: 'Extract the customer name and issue summary from this email.',
  outputSchema: {
    type: 'object',
    required: ['customerName', 'issueSummary'],
    properties: { customerName: { type: 'string' }, issueSummary: { type: 'string' } },
  },
  outputKey: 'ticket',
});
```

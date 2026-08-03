# `core:context-summarize` — Context Summarize

**Category:** ai-llm · **Version:** 1.0.0

Summarizes a message array or text value with an LLM call to reduce token volume — useful ahead of a `core:llm-call` when accumulated session history is getting long, or paired with a session `contextSchema` entry's `overflow: 'summarize'`.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `inputKey` | `string` | Yes | Context key containing a messages array or text to summarize |
| `outputKey` | `string` | Yes | Context key to write the summary to |
| `systemPrompt` | `string` | No | Defaults to a generic "summarize concisely, preserve key information" prompt |
| `router` | `ModelRouterConfig` | No | |

## Example

```typescript
this.node('summarize-history', 'core:context-summarize', {
  inputKey: 'sessionMessages',
  outputKey: 'historySummary',
});
```

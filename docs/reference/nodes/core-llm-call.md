# `core:llm-call` — LLM Call

**Category:** ai-llm · **Version:** 1.0.0

Calls a language model via the configured [Model Router](../../developer-guide/architecture/model-router.md). Accepts a user message (string) or a full message array from context. Writes the response text to `outputKey`. Supports structured output via `outputSchema` with automatic retry on malformed JSON.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `outputKey` | `string` | Yes | Context key to write the LLM response text (or parsed JSON object if `outputSchema` is set) |
| `systemPrompt` | `string` | No | System prompt injected before the user message |
| `userMessage` | `string` | No | **Literal** user message text, sent exactly as written — **no `{{}}` templating happens here** (see Behavior Notes) |
| `userMessageKey` | `string` | No | Context key holding a pre-assembled user message string (e.g. built by an upstream `core:transform`). **Takes precedence over `userMessage` when set.** |
| `messagesKey` | `string` | No | Context key containing a `CanonicalMessage[]` for multi-turn conversations — overrides `userMessage`/`userMessageKey` |
| `injectSessionHistory` | `string` | No | Context key holding a `CanonicalMessage[]` from a prior session; prepended before the current message |
| `router` | `ModelRouterConfig` | No | Inline router config; overrides the graph's `defaultRouter` |
| `maxTokens` | `number` | No | |
| `temperature` | `number` | No | |
| `outputSchema` | `object` (JSON Schema) | No | Enables structured output — the response is validated and auto-retried on malformed JSON |
| `retryOnMalformed` | `number` | No | Retries when `outputSchema` is set and the response is invalid JSON (default: 2) |

**Verified correction:** `packages/compiler/src/node-classes.ts`'s `LlmCallNode` typed helper is **missing `userMessageKey`** entirely, despite it being the field real agents use to pass a pre-built message (see `agents/caal.agent.ts`'s `explainer` node). Don't rely on the typed helper for this node — use this table or `packages/nodes/src/nodes/core-llm-call.ts` directly.

## Output

| Key | Type |
|---|---|
| `[outputKey]` | `string` or parsed object (if `outputSchema` set) |
| `_llm_response` | same as above |
| `_llm_usage` | token usage object |

## Behavior Notes

- **No templating.** `userMessage` is sent verbatim — it does not interpolate `{{key}}` placeholders. If you need a composed message from multiple context values, build it first with a [`core:transform`](core-transform.md) node (`outputKey: 'myMessage'`) or a [`core:prompt-builder`](core-prompt-builder.md) node, then reference that key via `userMessageKey`.
- A tenant-level prompt suffix (`ctx.get('systemPromptSuffix')`) is automatically appended to `systemPrompt` if present in context — used by Caal's tenant-configurable system prompt addendum; you don't need to wire this yourself.
- On malformed JSON with `outputSchema` set, a correction message is appended to the conversation and the call retried up to `retryOnMalformed` times before failing with `LLM_MALFORMED_JSON`.

## Example

```typescript
this.node('build-message', 'core:transform', {
  outputKey: 'userMessage',
  expression: '$.message & "\n\nContext: " & $string($.someContext)',
});
this.node('call-llm', 'core:llm-call', {
  systemPrompt: 'You are a helpful assistant.',
  userMessageKey: 'userMessage',
  outputKey: 'content',
  injectSessionHistory: 'sessionMessages',
});
this.connect('build-message', 'call-llm');
```

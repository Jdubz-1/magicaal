# `core:prompt-builder` — Prompt Builder

**Category:** ai-llm · **Version:** 1.0.0

Assembles a prompt string from a template and context values, using `{{key}}` / `{{nested.key}}` mustache-style placeholders (dot-notation supported). The result is written to `outputKey` for use by a downstream LLM node.

This is a **different templating mechanism than JSONata** — it's the one place in the node catalog with actual `{{}}` interpolation. `core:llm-call` itself does not template; if you want templated prompt assembly, use this node upstream of it.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `template` | `string` | Yes | Prompt template with `{{key}}` placeholders (dot-notation for nested values) |
| `outputKey` | `string` | Yes | Context key to write the assembled prompt string to |

## Output

| Key | Type |
|---|---|
| `[outputKey]` | `string` |
| `_prompt_built` | `boolean` (`true`) |

Missing or non-object path segments resolve to an empty string rather than throwing.

## Example

```typescript
this.node('build-prompt', 'core:prompt-builder', {
  template: 'Customer: {{customer.name}}\nIssue: {{issueSummary}}\n\nDraft a reply.',
  outputKey: 'prompt',
});
this.node('reply', 'core:llm-call', { userMessageKey: 'prompt', outputKey: 'content' });
```

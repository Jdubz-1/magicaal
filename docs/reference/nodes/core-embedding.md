# `core:embedding` — Embedding

**Category:** ai-llm · **Version:** 1.0.0

Generates a vector embedding for a text value from context. Writes the float array to `outputKey`. Requires a `router` pointing to an embedding-capable model (e.g. `text-embedding-3-small`).

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `inputKey` | `string` | Yes | Context key containing the text to embed |
| `outputKey` | `string` | Yes | Context key to write the embedding vector (`number[]`) to |
| `router` | `ModelRouterConfig` | No | Must point at an embedding model — a chat-completion model target will not work |

## Output

| Key | Type |
|---|---|
| `[outputKey]` | `number[]` |
| `_embedding_dimensions` | `number` |

Pair with [`core:vector-search`](core-vector-search.md) for retrieval.

## Example

```typescript
this.node('embed-query', 'core:embedding', {
  inputKey: 'query',
  outputKey: 'queryVector',
  router: { strategy: 'priority', targets: [{ id: 'embed', provider: 'openai', model: 'text-embedding-3-small' }] },
});
```

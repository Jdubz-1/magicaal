# `core:vector-search` — Vector Search

**Category:** ai-llm · **Version:** 1.0.0

Performs **in-memory** cosine similarity search over a vector index stored in context (not a persisted/external vector DB). Reads a `{id, vector, metadata}[]` array from `vectorsKey` and a query vector from `queryVectorKey`. Returns the top-K results sorted by descending similarity.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `vectorsKey` | `string` | Yes | Context key holding the vector index: `{id, vector, metadata?}[]` |
| `queryVectorKey` | `string` | Yes | Context key holding the query vector (`number[]`) |
| `outputKey` | `string` | Yes | Context key to write `{id, score, metadata?}[]` results to |
| `topK` | `number` | No | Number of top results to return (default: 5) |
| `minScore` | `number` | No | Minimum cosine similarity threshold, 0–1 (default: 0) |

## Behavior Notes

Fails with `VECTOR_DIMENSIONS_MISMATCH` if any index entry's vector length doesn't match the query vector's length — all vectors must share the same embedding model/dimensionality. Fails with `VECTOR_EMPTY_INDEX` / `VECTOR_INVALID_QUERY` on missing or malformed inputs.

## Example

```typescript
this.node('search', 'core:vector-search', {
  vectorsKey: 'knowledgeBaseVectors',
  queryVectorKey: 'queryVector',
  outputKey: 'matches',
  topK: 3,
  minScore: 0.7,
});
```

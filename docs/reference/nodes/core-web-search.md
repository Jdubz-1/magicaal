# `core:web-search` — Web Search

**Category:** integration · **Version:** 1.0.0

Searches the web using a configured Integration Connection — supports **Brave Search** or **Tavily**, selected by the connection's credential metadata (`creds.extra.provider`; defaults to Brave if unset). Writes an array of `{title, url, snippet, position}` results to `outputKey`.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `queryKey` | `string` | Yes | Context key holding the search query string |
| `connectionId` | `string` | Yes | Integration Connection ID (Brave Search or Tavily API key) |
| `outputKey` | `string` | Yes | Context key to write the results array to |
| `maxResults` | `number` | No | Default: 5 (capped at 20 for Brave) |

## Output

| Key | Type |
|---|---|
| `[outputKey]` | `Array<{ title: string; url: string; snippet: string; position: number }>` |
| `_search_result_count` | `number` |

## Example

```typescript
this.node('search', 'core:web-search', { queryKey: 'query', connectionId: 'brave-conn', outputKey: 'results', maxResults: 5 });
```

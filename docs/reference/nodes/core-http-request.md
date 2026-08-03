# `core:http-request` — HTTP Request

**Category:** integration · **Version:** 1.0.0

Makes an HTTP request to a URL. Optionally authenticates via an Integration Connection. Writes `{status, ok, headers, body}` to `outputKey`.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `url` | `string` | Yes | Request URL. Supports JSONata expressions (evaluated if the string contains `$`) |
| `outputKey` | `string` | Yes | Context key to write `{status, ok, headers, body}` to |
| `method` | `'GET' \| 'POST' \| 'PUT' \| 'PATCH' \| 'DELETE' \| 'HEAD'` | No | Default: `GET` |
| `headers` | `Record<string, string>` | No | Additional request headers |
| `body` | any | No | Objects are JSON-serialized and `Content-Type` set automatically; ignored for `GET`/`HEAD` |
| `connectionId` | `string` | No | Integration Connection ID — injects a `Bearer` `Authorization` header from the connection's API key or OAuth access token |
| `timeoutMs` | `number` | No | Default: 30000 |
| `followRedirects` | `boolean` | No | Default: `true` |

## Output

| Key | Type |
|---|---|
| `[outputKey]` | `{ status: number; ok: boolean; headers: Record<string,string>; body: unknown }` |
| `_http_status` | `number` |
| `_http_ok` | `boolean` |

Response body is parsed as JSON when `Content-Type` includes `application/json`, otherwise returned as text. `HTTP_TIMEOUT` is retryable; other failures are `HTTP_INVALID_URL` (not retryable) or `HTTP_REQUEST_FAILED` (retryable).

## Example

```typescript
this.node('call-api', 'core:http-request', {
  method: 'POST',
  url: 'https://api.example.com/v1/orders',
  body: { customerId: '$.customerId' },
  connectionId: 'example-api-conn',
  outputKey: 'apiResponse',
});
```

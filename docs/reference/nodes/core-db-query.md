# `core:db-query` — DB Query

**Category:** integration · **Version:** 1.0.0

Executes a parameterised SQL query against a database Integration Connection. **`SELECT`-only** — writes/mutations are rejected. Writes `{rows, rowCount, fields}` to `outputKey`.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `connectionId` | `string` | Yes | Integration Connection ID for the database |
| `query` | `string` | Yes | SQL `SELECT` query. Use `$1`, `$2`, … placeholders. |
| `outputKey` | `string` | Yes | Context key to write `{rows, rowCount, fields}` to |
| `paramsKey` | `string` | No | Context key holding an array of parameter values matched to `$1`, `$2`, … |
| `maxRows` | `number` | No | Default: 1000 |

## Output

| Key | Type |
|---|---|
| `[outputKey]` | `{ rows: object[]; rowCount: number; fields: string[] }` |
| `_db_row_count` | `number` |

## Behavior Notes

- Only queries matching `^\s*SELECT\s` (case-insensitive) are accepted — anything else fails with `DB_QUERY_RESTRICTED`, "Only SELECT statements are permitted."
- Only **PostgreSQL** connections are currently supported (`dbType: 'postgres'` in the connection's credential metadata) — other `dbType` values fail with `DB_UNSUPPORTED_TYPE`.

## Example

```typescript
this.node('lookup-order', 'core:db-query', {
  connectionId: 'orders-db',
  query: 'SELECT id, status, total FROM orders WHERE customer_id = $1',
  paramsKey: 'queryParams', // e.g. [customerId]
  outputKey: 'orderRows',
});
```

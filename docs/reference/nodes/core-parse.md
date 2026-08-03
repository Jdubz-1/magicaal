# `core:parse` — Parse

**Category:** data · **Version:** 1.0.0

Parses a string context value into a structured format.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `inputKey` | `string` | Yes | Context key containing the string to parse |
| `format` | `'json' \| 'csv' \| 'lines'` | Yes | `json`: object/array via `JSON.parse`. `csv`: array of objects keyed by header row. `lines`: array of non-empty, newline-split strings. |
| `outputKey` | `string` | Yes | Context key to write the parsed result to |
| `csvDelimiter` | `string` | No | CSV column delimiter (default: `,`) |

## Output

| Key | Type |
|---|---|
| `[outputKey]` | parsed result |
| `_parse_result` | same value |

Fails with `PARSE_INPUT_NOT_STRING` if `inputKey`'s value isn't a string, or `PARSE_ERROR` on malformed input (e.g. invalid JSON).

## Example

```typescript
this.node('parse-response', 'core:parse', { inputKey: 'rawCsv', format: 'csv', outputKey: 'rows' });
```

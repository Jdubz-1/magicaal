# `core:file-read` — File Read

**Category:** integration · **Version:** 1.0.0

Reads a file from the workspace filesystem. Path is relative to `WORKSPACE_BASE_PATH` (env var, default `/workspace`). Writes the content to `outputKey` along with `_file_size`/`_file_encoding` metadata.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `path` | `string` | Yes | File path relative to the workspace base directory. Supports JSONata expressions (evaluated if the string contains `$`). |
| `outputKey` | `string` | Yes | Context key to write the file content to |
| `encoding` | `'utf8' \| 'base64' \| 'binary'` | No | Default: `utf8` |

## Output

| Key | Type |
|---|---|
| `[outputKey]` | file content, as a string (base64-encoded if `encoding: 'base64'` or `'binary'`) |
| `_file_size` | `number` (bytes) |
| `_file_encoding` | `string` |

## Behavior Notes

**Path traversal is blocked**: the resolved path must stay within `WORKSPACE_BASE_PATH` or the node fails with `FILE_ACCESS_DENIED` — you cannot read outside the workspace directory, even with `../` sequences.

## Example

```typescript
this.node('read-config', 'core:file-read', { path: 'config/settings.json', outputKey: 'rawSettings' });
```

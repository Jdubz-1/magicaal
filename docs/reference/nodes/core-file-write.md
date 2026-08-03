# `core:file-write` — File Write

**Category:** integration · **Version:** 1.0.0

Writes content from a context key to a file in the workspace filesystem. Path is relative to `WORKSPACE_BASE_PATH`.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `path` | `string` | Yes | Destination path relative to workspace base. Supports JSONata expressions. |
| `contentKey` | `string` | Yes | Context key holding the content to write (non-strings are `JSON.stringify`'d) |
| `outputKey` | `string` | Yes | Context key to write the `{path, bytesWritten}` result to |
| `encoding` | `'utf8' \| 'base64'` | No | Default: `utf8` |
| `createDirs` | `boolean` | No | Create parent directories if missing (default: `false`) |

## Output

| Key | Type |
|---|---|
| `[outputKey]` | `{ path: string; bytesWritten: number }` |
| `_file_written_path` | `string` |
| `_file_bytes_written` | `number` |

Same path-traversal protection as [`core:file-read`](core-file-read.md) — fails with `FILE_PATH_INVALID` if the resolved path escapes the workspace base.

## Example

```typescript
this.node('save-report', 'core:file-write', {
  path: 'reports/summary.json',
  contentKey: 'reportData',
  createDirs: true,
  outputKey: 'writeResult',
});
```

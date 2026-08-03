# `core:annotation` — Annotation

**Category:** observability · **Version:** 1.0.0

Writes a structured annotation to the step record. Visible in the Studio test-run panel and telemetry — useful for surfacing an intermediate value or decision point for human inspection without affecting graph flow.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | Yes | Human-readable annotation label |
| `valueExpression` | `string` | No | JSONata expression whose result is included in the annotation |
| `outputKey` | `string` | No | Context key to also write the annotation object to |

## Output

| Key | Type |
|---|---|
| `_annotation` | `{ label: string; timestamp: string; value?: unknown }` |

## Example

```typescript
this.node('note-decision', 'core:annotation', { label: 'Routing decision', valueExpression: '$.intent' });
```

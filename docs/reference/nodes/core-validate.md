# `core:validate` — Validate

**Category:** data · **Version:** 1.0.0

Validates a context value against a JSON Schema (a small built-in validator — not a full JSON Schema implementation; see Behavior Notes). Outputs `_valid` and `_errors`. Use a conditional edge on `_valid` to branch on the outcome.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `inputKey` | `string` | Yes | Context key whose value will be validated |
| `schema` | `object` (JSON Schema) | Yes | Schema to validate against |

## Output

| Key | Type |
|---|---|
| `_valid` | `boolean` |
| `_errors` | `Array<{ path: string; message: string }>` |

## Behavior Notes

Supports `type`, `enum`, `required`, `properties` (recursive), `items` (recursive), and for strings: `minLength`/`maxLength`/`pattern`; for numbers: `minimum`/`maximum`. It does **not** support the full JSON Schema spec (no `oneOf`/`anyOf`/`$ref`/format validators/etc.) — keep validation schemas to these primitives.

## Example

```typescript
this.node('validate-input', 'core:validate', {
  inputKey: 'parsedOrder',
  schema: {
    type: 'object',
    required: ['orderId', 'amount'],
    properties: { orderId: { type: 'string' }, amount: { type: 'number', minimum: 0 } },
  },
});
this.when('validate-input', '$._valid = true', 'process-order');
this.otherwise('validate-input', 'reject-order');
```

# `core:transform` — Transform

**Category:** data · **Version:** 1.0.0

Evaluates a JSONata expression and writes the result to a single context key. The most commonly used data node — the standard way to compute an intermediate value.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `expression` | `string` | Yes | JSONata expression evaluated against the current context data |
| `outputKey` | `string` | Yes | Context key to write the result to |

## Output

| Key | Type |
|---|---|
| `[outputKey]` | result of the expression |
| `_transform_result` | same value |

## Behavior Notes

**Writes to exactly one context key.** If the JSONata expression evaluates to an object, that whole object lands under `outputKey` — it is **not** spread across the top level of the context. If you need several sibling fields available at the top level, give each its own `core:transform` node with its own `outputKey`, or read the nested object explicitly downstream (e.g. `$.myResult.fieldA`). This is a real bug class in this codebase — see the extensive comments in `agents/caal.agent.ts` explaining it.

## Example

```typescript
this.node('assemble-context', 'core:transform', {
  outputKey: 'graphContext',
  expression: '{ "nodeCount": $count($keys($.graphState.nodes)), "selected": $.selectedNodeIds ?? [] }',
});
// Downstream nodes read $.graphContext.nodeCount, not $.nodeCount directly.
```

# `core:router` — Router

**Category:** control-flow · **Version:** 1.0.0

Evaluates a JSONata expression that returns a case-key string. Writes the result to `_route`. Connect outbound conditional edges with conditions like `$._route = "case-name"`.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `expression` | `string` | Yes | JSONata expression that returns a case key string |
| `cases` | `string[]` | Yes | Declared case keys; each should have a matching outbound conditional edge |

**Verified correction:** `packages/compiler/src/node-classes.ts`'s `RouterNode` helper claims the config is `{ expression, routes: Record<string,string> }`. That is wrong — the real field is `cases: string[]`, not `routes`. Do not use `routes`.

## Output

| Key | Type |
|---|---|
| `_route` | `string` |

## Example

```typescript
this.node('intent-router', 'core:router', {
  expression: '$.intent',
  cases: ['explain', 'question', 'suggest', 'modify'],
});
this.when('intent-router', '$.intent = "explain" or $.intent = "question"', 'explainer-path');
this.when('intent-router', '$.intent = "suggest"', 'suggest-path');
this.otherwise('intent-router', 'explainer-path');
```

This is the exact pattern `agents/caal.agent.ts` uses for its `intent-router` node.

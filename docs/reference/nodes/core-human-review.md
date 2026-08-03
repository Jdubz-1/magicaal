# `core:human-review` — Human Review

**Category:** guardrails · **Version:** 1.0.0

Suspends the run and requests human review via the Admin panel. On resume after approval, continues to downstream nodes with `_review_approved: true`. Rejection is handled by the resume endpoint marking the run failed — this node's own logic only ever sees the approved path.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `prompt` | `string` | No | Instructions shown to the human reviewer |
| `contextKeys` | `string[]` | No | Context keys to include in the review payload for the reviewer to inspect |
| `reviewIdKey` | `string` | No | Context key to write the generated `reviewId` to, for reference in downstream nodes |

## Output

| Key | Type |
|---|---|
| `_review_approved` | `boolean` |
| `_review_id` | `string` |
| `_review_modifications` | `object \| null` |

## Behavior Notes

Two-phase execution, driven by whether `_review_approved` is already `true` in context:
1. **First pass**: generates a `reviewId` (`rev_<uuid>`), sets it in context, calls `ctx.suspend(reviewId)`, and returns `status: 'suspended'`. The scheduler persists a checkpoint here.
2. **Resumed pass** (after an admin approves via the resume endpoint, which sets `_review_approved = true` before re-invoking this node): returns `status: 'complete'` immediately with the review outcome.

## Example

```typescript
this.node('review-refund', 'core:human-review', {
  prompt: 'Approve this refund over $500?',
  contextKeys: ['orderId', 'refundAmount'],
});
this.connect('review-refund', 'issue-refund'); // only reached after approval
```

# `core:webhook-receive` — Webhook Receive

**Category:** integration · **Version:** 1.0.0

Reads the inbound webhook payload set by the trigger infrastructure when an agent is invoked via its webhook URL (`POST /v1/agents/{id}/webhook/{secret}`). Writes the normalised payload to `outputKey`.

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `outputKey` | `string` | Yes | Context key to write the normalised `{body, headers?, receivedAt}` payload to |
| `payloadKey` | `string` | No | Context key holding the raw webhook body (default: `_webhook_payload`) |
| `headersKey` | `string` | No | Context key holding the webhook request headers, if you also want those surfaced |

## Output

| Key | Type |
|---|---|
| `[outputKey]` | `{ body: unknown; headers?: unknown; receivedAt: string (ISO) }` |
| `_webhook_received_at` | `string` (ISO) |

Fails with `WEBHOOK_PAYLOAD_MISSING` if the payload isn't present — this means the agent's `trigger.type` in `AgentConfig` isn't `'webhook'`, or this node was placed in a graph that wasn't actually invoked via webhook.

## Example

```typescript
this.node('receive', 'core:webhook-receive', { outputKey: 'event' });
```

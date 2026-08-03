# Integration Packages

`packages/integrations/` holds one workspace package per external service, each implementing the `IntegrationPackage` interface from `@magicaal/sdk-node` (see [Node Authoring](../../developer-guide/node-authoring.md)) — action/trigger nodes plus an auth schema the platform uses to render the Integration Connection form.

## Shared Utilities (`@magicaal/integration-core`)

Every integration package depends on `packages/integrations/core`, which provides:

- `IntegrationError`, `isRetryableStatus`, `errorFromResponse` — a consistent error hierarchy
- `parseRateLimitHeaders`, `isRateLimited` — rate-limit handling
- `paginate`, `collectAll`, `parseLinkHeader` — pagination helpers
- `refreshOAuthToken`, `exchangeAuthorizationCode`, `isExpired` — OAuth2 token refresh
- `deriveIdempotencyKey`, `newIdempotencyKey`, `stableStringify` — idempotency key generation for at-least-once trigger delivery
- `resolveField` — Integration Connection config-field resolution

Write new integrations against these rather than reimplementing retry/pagination/OAuth logic per package.

## Packages

| Package | Description |
|---|---|
| `caal` | Tool stubs backing the [Caal](../../developer-guide/caal.md) assistant — not a third-party service integration |
| `bamboohr` | BambooHR integration |
| `github` | Issue/comment nodes, webhook trigger |
| `gmail` | Gmail integration |
| `google-workspace` | Google Workspace integration |
| `hubspot` | HubSpot integration |
| `jira` | Issue/comment nodes, webhook trigger |
| `quickbooks` | QuickBooks integration |
| `salesforce` | Salesforce integration |
| `sendgrid` | SendGrid integration |
| `shopify` | Shopify integration |
| `slack` | Message nodes, channel tools, Events API trigger |
| `stripe` | Stripe integration |
| `twilio` | Twilio integration |
| `zendesk` | Zendesk integration |

Connections to any of these are managed via `apps/api`'s `/v1/integrations/connections` endpoints (credentials encrypted at rest with `MAGICAAL_MASTER_KEY`); trigger registrations via `/v1/integrations/triggers`. New integration packages that conform to this existing format don't require an RFC — see [CONTRIBUTING.md — What Requires an RFC](../../../CONTRIBUTING.md#what-requires-an-rfc).

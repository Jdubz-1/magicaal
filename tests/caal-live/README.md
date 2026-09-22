# Caal live smoke

The same prompt corpus CI runs against a scripted model, run against a real
provider. This is the hand-verification that closed the last round of Caal
fixes, made repeatable.

It spends real money, so it is opt-in and never runs on a pull request.

```bash
# See what it would do — no network, no cost
devbox run -- pnpm caal:live -- --dry-run

# For real, against a running stack
CAAL_LIVE=1 \
CAAL_API_URL=http://localhost:3000 \
CAAL_TOKEN=<a Studio bearer token> \
devbox run -- pnpm caal:live
```

| Variable | Required | Default |
|---|---|---|
| `CAAL_LIVE` | yes, must be `1` | — |
| `CAAL_TOKEN` | yes | — |
| `CAAL_API_URL` | no | `http://localhost:3000` |
| `CAAL_AGENT_ID` | no | `caal-live-smoke` |

## What it asserts

Structural properties only — never the model's prose:

- HTTP 200 within the proxy budget (a 202 `CAAL_STILL_RUNNING` or a 504 is a failure here)
- `content` above a 200-character floor — the "suggestions never appeared" symptom was 0 characters after 1,202 billed completion tokens
- suggest turns carry an options card and no proposal
- modify turns carry a proposal with at least one patch

## The baseline

Each run rewrites `baseline.json` and reports drift against the previous one as
a **warning**, not a failure: a turn that got 1.75x slower, or a case that used
to propose patches and now proposes none. The 47k to 95k prompt-token doubling
caused by one extra provider round trip is exactly the regression no boolean
assertion catches.

Token counts are not recorded. A Caal run belongs to the `_platform` tenant, so
`GET /v1/runs/:runId` will not serve it to the invoking tenant; wall-clock time
is the proxy for it, and it is noisy enough that only a large jump is meaningful.

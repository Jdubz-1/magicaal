# Marketplace

The MagiCaal Marketplace is a hosted registry (`marketplace.magicaal.dev`, operated by MagiCaal Labs) that self-hosted deployments optionally connect to for node packages, agent templates, workflow bundles, and prompt packs — modeled on the VS Code extension marketplace. It's entirely optional: a deployment with `MARKETPLACE_ENABLED=false` (the default) runs fully on its built-in nodes with no community packages. See `.ai_docs/MAGICAAL_MARKETPLACE_SPEC.md` for the full service spec — this page covers the platform-side client in `apps/api` and `apps/engine`.

## `.mpack` Package Format

A `.mpack` file is a gzipped tar archive: `manifest.json` (identity, exported `nodeTypes`, `runtime` version constraints, `requiredAuthSchemas`, declared `networkAccess`), a CommonJS `index.js` bundle, `index.d.ts`, per-node-type JSON Schemas, optional palette icons, and a `PUBLISHER_SIG` signature over the content hash. The format itself is OSS and defined in `packages/sdk`.

## Install & Verification Flow

1. `POST /v1/marketplace/packages/{id}/install` (API) fetches the catalog asset and hands it to the engine.
2. `apps/engine/src/marketplace/package-verifier.ts` checks the bundle's signature. `SignatureStatus` is `verified` (countersigned by MagiCaal Labs — see `signing-keys.ts`), `unverified` (self-signed only), or `invalid`. By default only `verified` packages install; set `MARKETPLACE_ALLOW_UNVERIFIED=true` to allow `unverified` ones too — package code then runs with **full engine privileges**, since there is no sandbox yet for community packages.
3. `package-loader.ts` extracts the package into `PACKAGES_DIR` (`/data/packages`) and `hot-load.ts` activates its node types into the running `node-registry` — **no engine restart required**.
4. `apps/engine/src/registry/entitlements.ts` scopes the newly available node types to the installing tenant only; built-ins remain available to everyone.
5. `usage-flush.ts` periodically reports per-run package usage back to `apps/api`'s `license-validator.ts`/`usage-reporter.ts` (`apps/api/src/marketplace/`) for license enforcement and billing.

## Air-Gapped Mode

Independent of `MARKETPLACE_ENABLED`: setting `MARKETPLACE_CATALOG_SOURCE=local` points the API at a locally mounted `catalog.json` (`MARKETPLACE_LOCAL_CATALOG_PATH`) instead of the hosted catalog, and `POST /v1/marketplace/licenses/bundle` accepts a base64 license bundle directly — both work with no outbound network access.

## Templates & Prompt Packs

Besides node packages, the Marketplace also distributes:
- **Agent templates** — imported via `POST /v1/marketplace/templates/import`, creating a new draft agent with template parameters resolved
- **Prompt packs** — imported via `POST /v1/marketplace/prompt-packs/import`, landing under a `pack:` namespace in the prompt-versioning system

## Account & Licensing

`apps/api/src/marketplace/account.ts` manages the linked MagiCaal Account (`GET`/`POST /v1/marketplace/account`); `license-validator.ts` checks installed packages against issued licenses. All Marketplace routes except `licenses/bundle` return `503` when `MARKETPLACE_ENABLED=false`.

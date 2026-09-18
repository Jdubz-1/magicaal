/**
 * The platform tenant that owns code-defined agents (Caal).
 *
 * Mirrors PLATFORM_TENANT_ID in apps/api/src/platform/bootstrap.ts. Kept in one
 * place here because two guards depend on it — credential resolution honouring
 * a run's credentialTenantId, and sub-run dispatch forwarding it — and they
 * must not drift apart.
 */
export const PLATFORM_TENANT_ID = '_platform';

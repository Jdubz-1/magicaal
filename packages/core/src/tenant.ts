/**
 * Typed shape of the tenants.resource_limits JSON column (ARCHITECTURE §14.2).
 *
 * This is the currently-enforced subset: maxAgents gates agent creation
 * (API), maxConcurrentRuns overrides the platform-wide admission cap
 * (engine scheduler), and defaultInvocationStrategy is the tenant-default
 * tier of invocation policy resolution (§11.1). 'jwt' is deliberately not a
 * valid tenant default — it requires per-agent jwtConfig, so agents without
 * one would fail at validation. The remaining §14.2 settings (allowed node
 * types, per-run resource limits, default LLM config, default rate limit)
 * are future work, documented as such in the architecture doc.
 */
export interface TenantResourceLimits {
  /** Cap on concurrently executing runs for the tenant (engine admission). */
  maxConcurrentRuns?: number;
  /** Cap on the number of agents the tenant may create. */
  maxAgents?: number;
  /** Invocation-auth strategy applied when an agent has no policy of its own. */
  defaultInvocationStrategy?: 'api-key' | 'public';
}

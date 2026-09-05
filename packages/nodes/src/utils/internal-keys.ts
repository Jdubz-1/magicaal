/**
 * Engine-internal context keys.
 *
 * Nodes write bookkeeping values into the execution context alongside the
 * agent's real data — `_transform_result` (core:transform), `_route`
 * (core:router), `_loop_continue` (core:loop), `_terminated` (core:stop),
 * `_review_id` (core:human-review), `_sub_run_id` (core:sub-graph), and so on.
 * They exist to carry state between nodes within a run; they are not part of an
 * agent's public result and must not be handed to run callers, who may be third
 * parties holding nothing but an agent-scoped invocation key.
 *
 * The convention is a leading underscore. Filtering happens only at the
 * run-output boundary — the context itself keeps every key, because session
 * persistence and retry/resume checkpoints depend on it.
 */
export function isInternalKey(key: string): boolean {
  return key.startsWith('_');
}

/** Shallow copy of `data` without engine-internal (`_`-prefixed) keys. */
export function stripInternalKeys(data: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (!isInternalKey(key)) out[key] = value;
  }
  return out;
}

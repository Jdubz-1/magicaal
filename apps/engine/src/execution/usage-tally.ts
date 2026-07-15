/**
 * Per-run tally of marketplace-package node executions (§8.2 / ALIGN-019).
 *
 * Module-level rather than context-held on purpose: fork/fan-out branches and
 * the agent-loop tool path each build fresh ExecutionContext instances, but
 * every node execution flows through executeNodeOnce with the runId — so a
 * runId-keyed map sees them all. The scheduler drains the tally at run end
 * (every outcome) and flushes it to the API, which owns usage_counters.
 */
const tallies = new Map<string, Map<string, number>>();

export function recordPackageNodeExecution(runId: string, packageId: string): void {
  let runTally = tallies.get(runId);
  if (!runTally) {
    runTally = new Map();
    tallies.set(runId, runTally);
  }
  runTally.set(packageId, (runTally.get(packageId) ?? 0) + 1);
}

/** Remove and return the run's counts, or null when no package nodes ran. */
export function drainRunTally(runId: string): Record<string, number> | null {
  const runTally = tallies.get(runId);
  if (!runTally) return null;
  tallies.delete(runId);
  return Object.fromEntries(runTally);
}

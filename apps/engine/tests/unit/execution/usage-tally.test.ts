import { recordPackageNodeExecution, drainRunTally } from '@/execution/usage-tally';

describe('usage tally (ALIGN-019)', () => {
  it('counts package executions per run and drains once', () => {
    recordPackageNodeExecution('run-1', 'acme/tools');
    recordPackageNodeExecution('run-1', 'acme/tools');
    recordPackageNodeExecution('run-1', 'other/pkg');
    recordPackageNodeExecution('run-2', 'acme/tools');

    expect(drainRunTally('run-1')).toEqual({ 'acme/tools': 2, 'other/pkg': 1 });
    // Drained — a second drain finds nothing
    expect(drainRunTally('run-1')).toBeNull();
    // Other runs' tallies are untouched
    expect(drainRunTally('run-2')).toEqual({ 'acme/tools': 1 });
  });

  it('returns null for runs that executed no package nodes', () => {
    expect(drainRunTally('run-core-only')).toBeNull();
  });
});

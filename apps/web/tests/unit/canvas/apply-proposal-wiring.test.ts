import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const CANVAS = join(__dirname, '../../../src/canvas');

/**
 * Applying a proposal must go through applyProposalPatches, which counts what
 * actually landed. The previous inline loop in App.svelte ignored patches it
 * couldn't match and armed the Undo button regardless, so an empty proposal
 * read as a successful change.
 */
describe('proposal apply wiring', () => {
  const app = readFileSync(join(CANVAS, 'App.svelte'), 'utf8');
  const panel = readFileSync(join(CANVAS, 'components/CaalPanel.svelte'), 'utf8');

  it('App.svelte applies patches through the counted helper, not an inline loop', () => {
    expect(app).toContain("from './lib/proposalPatches'");
    expect(app).toContain('applyProposalPatches(');
    expect(app).not.toContain("patch.op ===");
  });

  it('App.svelte arms the undo entry only when something applied', () => {
    expect(app).toContain('if (result.applied > 0)');
    const undoIndex = app.indexOf('recordCaalChange(');
    const guardIndex = app.indexOf('if (result.applied > 0)');
    expect(guardIndex).toBeGreaterThan(-1);
    expect(undoIndex).toBeGreaterThan(guardIndex);
  });

  it('CaalPanel reports the applied result instead of assuming success', () => {
    expect(panel).toContain("caal:proposal-applied");
    expect(panel).not.toContain('accepted and applied to graph');
  });

  it('CaalPanel only offers a review card for a proposal with patches', () => {
    expect(panel).toContain('out.proposal?.patches?.length');
  });

  /**
   * authoringMode lives on the agent record, never in the graph JSON, so
   * reading it off $graph always sent 'studio' — the Caal graph's own
   * isCodeDefined branches could never fire for a code-defined agent.
   */
  it('CaalPanel sends the real authoring mode, not one read off the graph JSON', () => {
    expect(panel).toContain("authoringMode: readonly ? 'code-defined' : 'studio'");
    expect(panel).not.toContain("['authoringMode']");
  });
});

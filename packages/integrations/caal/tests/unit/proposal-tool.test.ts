import { proposalCreate } from '../../src/index';
import type { ExecutionContext } from '@magicaal/sdk-node';

/**
 * Every proposal Caal ever showed in Studio carried zero patches: the tool
 * builds them from _caal_patches, staged by the caal.graph.* write tools, and
 * the suggest path never had those tools wired. An empty proposal still read
 * as a success all the way to the review card, which reported it applied and
 * armed Undo for a graph that never changed.
 */
function fakeCtx(data: Record<string, unknown> = {}): ExecutionContext {
  const store: Record<string, unknown> = { ...data };
  return {
    get: <T>(key: string) => store[key] as T | undefined,
    set: (key: string, value: unknown) => {
      store[key] = value;
    },
    data: store,
  } as unknown as ExecutionContext;
}

describe('caal.proposal.create', () => {
  it('refuses to build a proposal with nothing staged', async () => {
    const ctx = fakeCtx();

    const out = await proposalCreate.execute(ctx, { description: 'Add a guardrail' });

    expect(out.status).toBe('failed');
    expect(out.error?.code).toBe('NO_PATCHES_STAGED');
    expect(out.error?.message).toContain('caal.graph.addNode');
    expect(ctx.get('_caal_proposal')).toBeUndefined();
  });

  it('leaves staging intact when it refuses, so the model can stage and retry', async () => {
    const ctx = fakeCtx({ _caal_patches: [] });

    await proposalCreate.execute(ctx, { description: 'nothing yet' });
    const patches = ctx.get<unknown[]>('_caal_patches');
    ctx.set('_caal_patches', [...(patches ?? []), { op: 'add_node', data: { id: 'n1', type: 'core:end' } }]);

    const out = await proposalCreate.execute(ctx, { description: 'Add an end node' });
    expect(out.status).toBe('complete');
  });

  it('builds a proposal from the staged patches and clears staging', async () => {
    const staged = [
      { op: 'add_node', data: { id: 'guard', type: 'core:guardrail' } },
      { op: 'add_edge', data: { from: 'llm', to: 'guard' } },
    ];
    const ctx = fakeCtx({ _caal_patches: staged });

    const out = await proposalCreate.execute(ctx, {
      description: 'Add a guardrail after the LLM node',
      rationale: 'Unfiltered model output reaches the caller.',
    });

    expect(out.status).toBe('complete');
    const proposal = out.outputs.proposal as { patches: unknown[]; complexity: string; rationale: string };
    expect(proposal.patches).toHaveLength(2);
    expect(proposal.complexity).toBe('targeted');
    expect(proposal.rationale).toContain('Unfiltered');
    expect(ctx.get('_caal_proposal')).toEqual(proposal);
    expect(ctx.get('_caal_patches')).toEqual([]);
  });

  it('classifies a large patch set as more than targeted', async () => {
    const many = Array.from({ length: 5 }, (_, i) => ({ op: 'add_node', data: { id: `n${i}` } }));
    const ctx = fakeCtx({ _caal_patches: many });

    const out = await proposalCreate.execute(ctx, { description: 'Restructure' });

    expect((out.outputs.proposal as { complexity: string }).complexity).toBe('structural');
  });
});

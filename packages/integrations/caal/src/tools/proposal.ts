import type { NodeModule } from '@magicaal/sdk-node';

type ComplexityLevel = 'targeted' | 'structural' | 'replacement';

function classifyComplexity(patchCount: number, patches: unknown[]): ComplexityLevel {
  const hasDeleteAll = (patches as Array<{ op: string }>).some(
    (p) => p.op === 'delete_node' || p.op === 'delete_edge',
  );
  if (patchCount >= 10 || (hasDeleteAll && patchCount > 4)) return 'replacement';
  if (patchCount >= 4) return 'structural';
  return 'targeted';
}

export const proposalCreate: NodeModule = {
  type: 'caal.proposal.create',
  meta: { name: 'Create Proposal', description: 'Create a staged graph change proposal for developer review', category: 'integration', version: '0.1.0' },
  schema: {
    config: {
      type: 'object',
      properties: {
        description: { type: 'string', description: 'Human-readable summary of what this proposal does' },
        rationale: { type: 'string', description: 'Why this change is recommended' },
      },
      required: ['description'],
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        proposal: { type: 'object', description: 'CaalProposal object ready for frontend review UI' },
      },
    },
  },
  async execute(ctx, config) {
    const cfg = config as { description: string; rationale?: string };
    const patches = ctx.get<unknown[]>('_caal_patches') ?? [];

    const complexity = classifyComplexity(patches.length, patches);

    const proposal = {
      id: `prop_${Date.now().toString(36)}`,
      description: cfg.description,
      rationale: cfg.rationale ?? '',
      complexity,
      patches,
      createdAt: new Date().toISOString(),
    };

    ctx.set('_caal_proposal', proposal);
    ctx.set('_caal_patches', []); // reset staging after proposal is created

    return { status: 'complete', outputs: { proposal } };
  },
};

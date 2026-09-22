import { setupCaalHarness, invokeCaalSimulated } from '../harness/invoke';
import { assertRunInvariants, assertAnswered } from '../harness/assertions';
import { normalizeCaalOptions } from '../../../../web/src/canvas/lib/caalOptions';

/**
 * A code-defined agent is owned by its *.agent.ts source. Caal can explain it
 * and advise on it, but a GraphPatch cannot be applied to TypeScript, so the
 * modify path must never reach the staging tools.
 *
 * The flag comes from `graphState.authoringMode`, which CaalPanel sets from the
 * agent record. Reading it off the graph JSON instead always produced 'studio',
 * so none of these branches could fire for a code-defined agent at all.
 */

const ADVICE = 'The LLM node has no guardrail after it; I would add one.';

describe('code-defined agents', () => {
  beforeAll(async () => {
    await setupCaalHarness();
  }, 30_000);

  it('derives isCodeDefined from the authoring mode Studio sends', async () => {
    const codeDefined = await invokeCaalSimulated({
      message: 'Explain what this agent does.',
      intent: 'explain',
      graphState: 'codeDefined',
      script: { explainer: [{ text: ADVICE }] },
    });
    expect(codeDefined.ctx.get<{ isCodeDefined: boolean }>('systemContext')?.isCodeDefined).toBe(true);

    const studio = await invokeCaalSimulated({
      message: 'Explain what this agent does.',
      intent: 'explain',
      graphState: 'studioLinear',
      script: { explainer: [{ text: ADVICE }] },
    });
    expect(studio.ctx.get<{ isCodeDefined: boolean }>('systemContext')?.isCodeDefined).toBe(false);
  });

  it('explains a code-defined agent exactly as it would any other', async () => {
    const run = await invokeCaalSimulated({
      message: 'Explain what this agent does and how the nodes connect.',
      intent: 'explain',
      graphState: 'codeDefined',
      script: { explainer: [{ text: ADVICE }] },
    });

    assertRunInvariants(run);
    assertAnswered(run);
    expect(run.path).toContain('explainer');
  });

  describe('suggest', () => {
    it('gives advice, then offers only an acknowledgement', async () => {
      const run = await invokeCaalSimulated({
        message: 'Suggest improvements to this agent graph.',
        intent: 'suggest',
        graphState: 'codeDefined',
        script: { suggester: [{ text: ADVICE }] },
      });

      assertRunInvariants(run);
      assertAnswered(run);

      const options = run.response.options as {
        question: string;
        options: Array<{ value: string; followUpIntent?: string }>;
      };

      expect(options.options.map((o) => o.value)).toEqual(['dismiss']);
      expect(options.question).toContain('.agent.ts');
      // Offering a modify follow-up here would hand the developer a button
      // that routes straight into the guard node.
      expect(options.options.some((o) => o.followUpIntent === 'modify')).toBe(false);
    });

    it('survives Studio re-validating the same payload as readonly', async () => {
      const run = await invokeCaalSimulated({
        message: 'Suggest improvements to this agent graph.',
        intent: 'suggest',
        graphState: 'codeDefined',
        script: { suggester: [{ text: ADVICE }] },
      });

      // normalizeCaalOptions drops modify follow-ups when the agent is
      // readonly; the card must still have something to render afterwards.
      const normalized = normalizeCaalOptions(run.response.options, { readonly: true });
      expect(normalized).not.toBeNull();
      expect(normalized!.options.map((o) => o.value)).toEqual(['dismiss']);
    });
  });

  describe('modify', () => {
    it.each([
      ['Add a content safety guardrail node after the LLM node.'],
      ['delete the logging node and wire start straight to the llm'],
    ])('routes %p into the guard node instead of the tool loop', async (message) => {
      const run = await invokeCaalSimulated({
        message,
        intent: 'modify',
        graphState: 'codeDefined',
        // Deliberately empty: reaching the modifier at all would throw "no
        // scripted turns", which is a louder failure than a silent one.
        script: {},
      });

      assertRunInvariants(run);
      expect(run.path).toContain('code-defined-modify-blocked');
      expect(run.path).not.toContain('modifier');
      expect(run.path).not.toContain('build-modify-message');
    });

    it('spends no provider call at all', async () => {
      const run = await invokeCaalSimulated({
        message: 'Add a guardrail after the LLM node.',
        intent: 'modify',
        graphState: 'codeDefined',
        script: {},
      });

      // The guard is a transform node; nothing on this path talks to a model.
      expect(run.requests).toEqual([]);
      expect(run.toolCalls).toEqual([]);
    });

    it('explains why, and stages nothing', async () => {
      const run = await invokeCaalSimulated({
        message: 'Add a guardrail after the LLM node.',
        intent: 'modify',
        graphState: 'codeDefined',
        script: {},
      });

      assertAnswered(run);
      expect(run.response.content).toContain('code-defined');
      expect(run.response.content).toContain('.agent.ts');
      expect(run.response.proposal).toBeUndefined();
      expect(run.ctx.get('_caal_patches')).toBeUndefined();
    });

    it('still stores the turn, so History is not missing the exchange', async () => {
      const run = await invokeCaalSimulated({
        message: 'Add a guardrail after the LLM node.',
        intent: 'modify',
        graphState: 'codeDefined',
        script: {},
      });

      expect(run.sessionWrites.messages).toEqual([
        { role: 'user', content: 'Add a guardrail after the LLM node.' },
        { role: 'assistant', content: run.response.content },
      ]);
    });
  });

  it('leaves the studio path untouched by any of this', async () => {
    const run = await invokeCaalSimulated({
      message: 'Add a content safety guardrail node after the LLM node.',
      intent: 'modify',
      graphState: 'studioLinear',
      script: {
        modifier: [
          { toolCalls: [{ name: 'caal.graph.addNode', input: { nodeId: 'g', nodeType: 'core:guardrail' } }] },
          { toolCalls: [{ name: 'caal.proposal.create', input: { description: 'Add a guardrail' } }] },
          { text: 'Staged one change.' },
        ],
      },
    });

    expect(run.path).toContain('modifier');
    expect(run.path).not.toContain('code-defined-modify-blocked');
    expect(run.response.proposal).toBeDefined();
  });
});

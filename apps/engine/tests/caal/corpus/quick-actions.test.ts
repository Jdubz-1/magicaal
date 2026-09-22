import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  setupCaalHarness,
  invokeCaalSimulated,
  applySessionWrites,
  type SimulatedRun,
} from '../harness/invoke';
import type { Script } from '../harness/scripted-provider';
import {
  assertRunInvariants,
  assertAnswered,
  assertNoStagingTools,
} from '../harness/assertions';
import { QUICK_ACTIONS, OPTIONS_FOLLOW_UP, type CaalPromptCase } from './prompts';
import { applyProposalPatches } from '../../../../web/src/canvas/lib/proposalPatches';
import { GRAPH_FIXTURES } from '../harness/fixtures/graphs';

/**
 * The five Studio quick actions, run end to end through the real graph.
 *
 * Every one of them broke at least once in the last two months, and each broke
 * on its own path: suggest emitted empty proposals, suggest lost its answer to
 * the agent loop, modify could not remember what suggest had said, explain was
 * the only one that never routed anywhere.
 */

/** Scripts are simulation detail, so they live here rather than in the corpus. */
const SCRIPTS: Record<string, Script> = {
  'qa-explain': {
    explainer: [
      { text: 'It receives a push, summarizes it with [[llm]], and posts the summary to Slack.' },
    ],
  },
  'qa-suggest': {
    suggester: [
      { text: 'First, the shape.', toolCalls: [{ name: 'caal.graph.summarize' }] },
      { text: 'Second, [[llm]] has no guardrail after it.', toolCalls: [{ name: 'caal.graph.read' }] },
      { text: 'Third, I would add a content safety check before the Slack post.' },
    ],
  },
  'qa-describe-selected': {
    explainer: [{ text: 'The selected node [[llm]] summarizes the push event.' }],
  },
  'qa-add-guardrail': {
    modifier: [
      { text: 'Let me read the graph first.', toolCalls: [{ name: 'caal.graph.read' }] },
      {
        toolCalls: [
          {
            name: 'caal.graph.addNode',
            input: { nodeId: 'guardrail', nodeType: 'core:guardrail', nodeConfig: { policy: 'content-safety' } },
          },
        ],
      },
      {
        toolCalls: [
          { name: 'caal.graph.addEdge', input: { fromNodeId: 'llm', toNodeId: 'guardrail' } },
          { name: 'caal.graph.addEdge', input: { fromNodeId: 'guardrail', toNodeId: 'notify' } },
          { name: 'caal.graph.deleteEdge', input: { fromNodeId: 'llm', toNodeId: 'notify' } },
        ],
      },
      {
        toolCalls: [
          {
            name: 'caal.proposal.create',
            input: {
              description: 'Add a content safety guardrail after the LLM node',
              rationale: 'Nothing checks the summary before it is posted to Slack.',
            },
          },
        ],
      },
      { text: 'I staged four changes for your review.' },
    ],
  },
  'qa-optimize': {
    suggester: [
      { text: 'Looking at the graph.', toolCalls: [{ name: 'caal.graph.summarize' }] },
      { text: 'The Slack post could run in parallel with the summary write.' },
    ],
  },
};

async function runCase(testCase: CaalPromptCase): Promise<SimulatedRun> {
  return invokeCaalSimulated({
    message: testCase.message,
    intent: testCase.intent,
    graphState: testCase.graph,
    selectedNodeIds: testCase.selectedNodeIds,
    script: SCRIPTS[testCase.id],
  });
}

describe('Studio quick actions', () => {
  beforeAll(async () => {
    await setupCaalHarness();
  }, 30_000);

  /**
   * The corpus is only meaningful if it is the prompts Studio actually sends.
   * A quick action reworded in the panel and not here would leave the real
   * prompt untested while this file went on passing.
   */
  it('matches the prompts CaalPanel ships', () => {
    const panel = readFileSync(
      join(__dirname, '../../../../web/src/canvas/components/CaalPanel.svelte'),
      'utf8',
    );
    const shipped = [...panel.matchAll(/prompt:\s*'([^']+)'/g)].map((m) => m[1]);

    expect(shipped).toEqual(QUICK_ACTIONS.map((c) => c.message));

    const intents = [...panel.matchAll(/intent:\s*'(\w+)'/g)].map((m) => m[1]);
    expect(intents).toEqual(QUICK_ACTIONS.map((c) => c.intent));
  });

  describe.each(QUICK_ACTIONS.map((c) => [c.id, c] as const))('%s', (_id, testCase) => {
    let run: SimulatedRun;

    beforeAll(async () => {
      run = await runCase(testCase);
    });

    it('holds every standing invariant', () => {
      assertRunInvariants(run);
    });

    it(`is handled by ${testCase.expect.handledBy} and answers`, () => {
      expect(run.path).toContain(testCase.expect.handledBy);
      assertAnswered(run, testCase.expect.minContentChars);
    });

    it(`ends with a proposal: ${testCase.expect.proposal}`, () => {
      if (testCase.expect.proposal === 'absent') {
        expect(run.response.proposal).toBeUndefined();
      } else {
        expect(run.response.proposal).toBeDefined();
      }
    });

    it(`ends with an options card: ${testCase.expect.options}`, () => {
      if (testCase.expect.options === 'absent') {
        expect(run.response.options).toBeUndefined();
      } else {
        expect(run.response.options).toBeDefined();
      }
    });

    it('stores exactly this turn in the session', () => {
      expect(run.sessionWrites.messages).toEqual([
        { role: 'user', content: testCase.message },
        { role: 'assistant', content: run.response.content },
      ]);
    });
  });

  describe('qa-explain', () => {
    it('routes explain and question to the same branch', async () => {
      for (const intent of ['explain', 'question'] as const) {
        const run = await invokeCaalSimulated({
          message: 'Explain what this agent does and how the nodes connect.',
          intent,
          script: SCRIPTS['qa-explain'],
        });
        expect(run.path).toContain('build-explain-message');
        expect(run.path).toContain('explainer');
        expect(run.path).not.toContain('suggester');
        expect(run.path).not.toContain('modifier');
      }
    });
  });

  describe('qa-suggest', () => {
    let run: SimulatedRun;
    beforeAll(async () => {
      run = await runCase(QUICK_ACTIONS.find((c) => c.id === 'qa-suggest')!);
    });

    /**
     * The agent loop used to keep only the final iteration's text. A suggest
     * turn billed 1,202 completion tokens and reached Studio with content: "".
     */
    it('assembles narration from every iteration, not just the last', () => {
      const content = run.response.content as string;
      expect(content).toContain('First, the shape.');
      expect(content).toContain('Second,');
      expect(content).toContain('Third, I would add');
    });

    it('is never offered a tool that could stage or propose a change', () => {
      assertNoStagingTools(run, 'suggester');
    });

    it('offers to hand the advice to the modify path instead', () => {
      const options = run.response.options as {
        question: string;
        options: Array<{ value: string; followUpIntent?: string; followUpMessage?: string }>;
      };

      expect(options.options.map((o) => o.value)).toEqual(['create_proposal', 'dismiss']);
      const yes = options.options[0];
      expect(yes.followUpIntent).toBe('modify');
      expect(yes.followUpMessage).toBe(OPTIONS_FOLLOW_UP.message);
    });

    it('runs suggest-options between the suggester and the assembler', () => {
      const suggesterAt = run.path.indexOf('suggester');
      const optionsAt = run.path.indexOf('suggest-options');
      const assemblerAt = run.path.indexOf('response-assembler');

      expect(suggesterAt).toBeLessThan(optionsAt);
      expect(optionsAt).toBeLessThan(assemblerAt);
    });
  });

  describe('qa-describe-selected', () => {
    it('carries the selection into the graph context the model is given', async () => {
      const run = await runCase(QUICK_ACTIONS.find((c) => c.id === 'qa-describe-selected')!);

      const sent = run.requests[0].messages[0].content as string;
      expect(sent).toContain('selectedNodeIds');
      expect(sent).toContain('llm');
    });

    it('handles a multi-node selection and an empty one', async () => {
      for (const selectedNodeIds of [['llm', 'notify'], []]) {
        const run = await invokeCaalSimulated({
          message: 'Describe the currently selected node.',
          intent: 'explain',
          selectedNodeIds,
          script: SCRIPTS['qa-describe-selected'],
        });
        assertRunInvariants(run);
        assertAnswered(run);
      }
    });
  });

  describe('qa-add-guardrail', () => {
    let run: SimulatedRun;
    beforeAll(async () => {
      run = await runCase(QUICK_ACTIONS.find((c) => c.id === 'qa-add-guardrail')!);
    });

    it('stages every change before proposing, and clears staging afterwards', () => {
      const proposal = run.response.proposal as { patches: Array<{ op: string }>; complexity: string };

      expect(proposal.patches.map((p) => p.op)).toEqual([
        'add_node',
        'add_edge',
        'add_edge',
        'delete_edge',
      ]);
      expect(proposal.complexity).toBe('structural');
      expect(run.ctx.get('_caal_patches')).toEqual([]);
    });

    /**
     * The seam that started all of this: a proposal that Studio cannot apply is
     * a graph defect, not a UI defect. These are the real patches the real
     * tools staged, run through the real apply path.
     */
    it('produces patches Studio can actually apply', () => {
      const proposal = run.response.proposal as { patches: Array<{ op: string }> };
      const before = structuredClone(GRAPH_FIXTURES.studioLinear);

      const result = applyProposalPatches(before as never, proposal.patches as never);

      expect(result.applied).toBe(proposal.patches.length);
      expect(result.skipped).toEqual([]);

      const after = result.graph;
      expect(after.nodes['guardrail']).toBeDefined();
      // A node with no position stacks on the canvas fallback.
      expect(after.nodes['guardrail'].position).toBeDefined();

      const edgePairs = after.edges.map((e) => `${e.from}->${e.to}`);
      expect(edgePairs).toContain('llm->guardrail');
      expect(edgePairs).toContain('guardrail->notify');
      expect(edgePairs).not.toContain('llm->notify');

      // No edge left pointing at a node that is not there.
      for (const edge of after.edges) {
        expect(Object.keys(after.nodes)).toContain(edge.from);
        expect(Object.keys(after.nodes)).toContain(edge.to);
      }
    });

    it('records the proposal in the session so History can replay it', () => {
      expect(run.sessionWrites.lastProposal).toMatchObject({ description: expect.any(String) });
      expect(run.sessionWrites.proposalHistory).toHaveLength(1);
    });

    /**
     * The same prompt against a graph with no LLM node: the correct outcome is
     * prose and no proposal, which is what the live stack did when this was
     * last checked by hand.
     */
    it('answers without a proposal when there is nothing to attach to', async () => {
      const noLlm = await invokeCaalSimulated({
        message: 'Add a content safety guardrail node after the LLM node.',
        intent: 'modify',
        graphState: 'noLlmNode',
        script: {
          modifier: [
            { text: 'Checking the graph.', toolCalls: [{ name: 'caal.graph.read' }] },
            { text: 'This graph has no LLM node, so there is nothing to guard. Add one first.' },
          ],
        },
      });

      assertRunInvariants(noLlm);
      expect(noLlm.response.proposal).toBeUndefined();
      expect(noLlm.response.content).toContain('no LLM node');
    });
  });

  describe('qa-followup-proposal', () => {
    /**
     * Turn one advises, turn two is the options card's follow-up. core:tool-call
     * advertised injectSessionHistory and ignored it, so the modifier answered
     * "I don't have a record of improvements I just suggested to you."
     */
    it('carries turn one\'s advice into turn two\'s prompt', async () => {
      const first = await runCase(QUICK_ACTIONS.find((c) => c.id === 'qa-suggest')!);
      const stored = applySessionWrites([], first.sessionWrites);

      const second = await invokeCaalSimulated({
        message: OPTIONS_FOLLOW_UP.message,
        intent: OPTIONS_FOLLOW_UP.intent,
        session: stored,
        script: {
          modifier: [
            {
              toolCalls: [
                {
                  name: 'caal.graph.addNode',
                  input: { nodeId: 'guardrail', nodeType: 'core:guardrail' },
                },
              ],
            },
            {
              toolCalls: [
                { name: 'caal.proposal.create', input: { description: 'Add the guardrail I suggested' } },
              ],
            },
            { text: 'Staged the change we discussed.' },
          ],
        },
      });

      assertRunInvariants(second);

      const history = second.requests[0].messages;
      const assistantTurns = history.filter((m) => m.role === 'assistant');
      expect(assistantTurns.length).toBeGreaterThan(0);
      expect(JSON.stringify(assistantTurns)).toContain('Third, I would add');

      // And the follow-up is the last thing said, not buried in history.
      expect(history[history.length - 1]).toMatchObject({
        role: 'user',
        content: expect.stringContaining(OPTIONS_FOLLOW_UP.message),
      });

      expect(second.response.proposal).toBeDefined();
    });
  });
});

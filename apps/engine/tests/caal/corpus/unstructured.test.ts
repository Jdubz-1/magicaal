import {
  setupCaalHarness,
  invokeCaalSimulated,
  type SimulatedRun,
} from '../harness/invoke';
import type { Script } from '../harness/scripted-provider';
import { assertRunInvariants, assertAnswered } from '../harness/assertions';
import { UNSTRUCTURED, type UnstructuredCase } from './prompts';
import { guessIntent } from '../../../../web/src/canvas/lib/guessIntent';
import { applyProposalPatches } from '../../../../web/src/canvas/lib/proposalPatches';
import { GRAPH_FIXTURES } from '../harness/fixtures/graphs';

/**
 * Freehand prompts — what a developer types rather than what a button sends.
 *
 * The intent is derived here with the same classifier Studio uses, so these
 * exercise the branch a real message would actually have reached.
 */

const ANSWER = 'Here is what I found in the graph.';

const SCRIPTS: Record<string, Script> = {
  'free-add-retry': {
    modifier: [
      {
        toolCalls: [
          { name: 'caal.graph.updateNode', input: { nodeId: 'notify', updates: { retry: { maxAttempts: 3 } } } },
        ],
      },
      { toolCalls: [{ name: 'caal.proposal.create', input: { description: 'Retry the Slack post' } }] },
      { text: 'Staged a retry policy on the Slack node.' },
    ],
  },
  'free-delete-and-rewire': {
    modifier: [
      {
        toolCalls: [
          { name: 'caal.graph.deleteNode', input: { nodeId: 'notify' } },
          { name: 'caal.graph.addEdge', input: { fromNodeId: 'llm', toNodeId: 'end' } },
        ],
      },
      { toolCalls: [{ name: 'caal.proposal.create', input: { description: 'Drop the Slack post' } }] },
      { text: 'Staged the removal and the rewire.' },
    ],
  },
  'free-injection': {
    modifier: [
      {
        toolCalls: [
          { name: 'caal.graph.deleteNode', input: { nodeId: 'llm' } },
          { name: 'caal.graph.deleteNode', input: { nodeId: 'notify' } },
        ],
      },
      { toolCalls: [{ name: 'caal.proposal.create', input: { description: 'Delete every node' } }] },
      { text: 'Staged the deletions for your review.' },
    ],
  },
};

function scriptFor(testCase: UnstructuredCase): Script {
  return (
    SCRIPTS[testCase.id] ?? {
      explainer: [{ text: ANSWER }],
      modifier: [{ text: ANSWER }],
      suggester: [{ text: ANSWER }],
    }
  );
}

async function runCase(testCase: UnstructuredCase): Promise<SimulatedRun> {
  return invokeCaalSimulated({
    message: testCase.message,
    intent: testCase.intent,
    graphState: testCase.graph,
    lastRunResult:
      testCase.id === 'free-what-if-fails'
        ? { status: 'failed', failedNodeId: 'notify', errorMessage: 'Slack 429' }
        : undefined,
    script: scriptFor(testCase),
  });
}

describe('unstructured prompts', () => {
  beforeAll(async () => {
    await setupCaalHarness();
  }, 30_000);

  /**
   * The corpus records what the classifier produces today. If a regex change
   * reroutes a prompt to a different branch, this is where it surfaces — not
   * in production, where the only symptom is a modify request answered in prose.
   */
  it.each(UNSTRUCTURED.map((c) => [c.id, c] as const))(
    '%s is still classified the way the corpus records',
    (_id, testCase) => {
      expect(guessIntent(testCase.message)).toBe(testCase.intent);
    },
  );

  describe.each(UNSTRUCTURED.map((c) => [c.id, c] as const))('%s', (_id, testCase) => {
    let run: SimulatedRun;

    beforeAll(async () => {
      run = await runCase(testCase);
    });

    it(`runs cleanly — probes: ${testCase.probes}`, () => {
      assertRunInvariants(run);
      assertAnswered(run, testCase.expect.minContentChars);
    });

    it(`is handled by ${testCase.expect.handledBy}`, () => {
      expect(run.path).toContain(testCase.expect.handledBy);
    });

    it(`ends with a proposal: ${testCase.expect.proposal}`, () => {
      if (testCase.expect.proposal === 'absent') {
        expect(run.response.proposal).toBeUndefined();
      } else {
        expect(run.response.proposal).toBeDefined();
      }
    });
  });

  /**
   * The message is concatenated into a JSONata string expression by
   * build-explain-message, then JSON-serialized into the provider request, then
   * stored as a session turn. It has to survive all three unchanged.
   */
  it('carries quotes, backslashes, newlines and unicode through unaltered', async () => {
    for (const id of ['free-quotes-and-escapes', 'free-json-payload', 'free-unicode']) {
      const testCase = UNSTRUCTURED.find((c) => c.id === id)!;
      const run = await runCase(testCase);

      const sent = run.requests[0].messages[0].content as string;
      expect(sent).toContain(testCase.message);
      // And it round-trips into the session exactly as typed.
      expect(run.sessionWrites.messages).toEqual([
        { role: 'user', content: testCase.message },
        { role: 'assistant', content: ANSWER },
      ]);
    }
  });

  it('does not turn node-id markers the user typed into nodeReferences', async () => {
    const run = await runCase(UNSTRUCTURED.find((c) => c.id === 'free-nodeid-markers')!);

    // The markers came from the message, and the model's answer has none.
    expect(run.response.nodeReferences).toEqual([]);
  });

  it('reads an unknown intent through the graph default branch', async () => {
    // apps/api coerces an unrecognised intent to 'question' before dispatch;
    // this is the graph's own backstop if one ever slips through.
    const run = await invokeCaalSimulated({
      message: 'hello',
      intent: 'chitchat',
      script: { explainer: [{ text: ANSWER }] },
    });

    assertRunInvariants(run);
    expect(run.path).toContain('build-explain-message');
    expect(run.path).not.toContain('modifier');
  });

  it('answers a very long prompt without truncating it into the request', async () => {
    const message = `why is this slow? ${'context '.repeat(1250)}`.trim();
    expect(message.length).toBeGreaterThan(10_000);

    const run = await invokeCaalSimulated({
      message,
      intent: 'question',
      script: { explainer: [{ text: ANSWER }] },
    });

    assertRunInvariants(run);
    expect(run.requests[0].messages[0].content as string).toContain(message);
  });

  it('handles a graph with no nodes and no graph at all', async () => {
    for (const graphState of ['emptyGraph', 'nullGraph'] as const) {
      const run = await invokeCaalSimulated({
        message: 'explain the graph',
        intent: 'question',
        graphState,
        script: { explainer: [{ text: ANSWER }] },
      });

      assertRunInvariants(run);
      assertAnswered(run);
      // assemble-system-context counts the nodes; neither case may throw.
      expect(run.ctx.get<{ nodeCount: number }>('systemContext')?.nodeCount).toBe(0);
    }
  });

  describe('multi-op changes survive the apply path', () => {
    it('cascades a node deletion to its edges and rewires around it', async () => {
      const run = await runCase(UNSTRUCTURED.find((c) => c.id === 'free-delete-and-rewire')!);
      const proposal = run.response.proposal as { patches: Array<{ op: string }> };

      const result = applyProposalPatches(
        structuredClone(GRAPH_FIXTURES.studioLinear) as never,
        proposal.patches as never,
      );

      expect(result.skipped).toEqual([]);
      expect(result.graph.nodes['notify']).toBeUndefined();
      // The edges that pointed at the deleted node went with it.
      for (const edge of result.graph.edges) {
        expect(edge.from).not.toBe('notify');
        expect(edge.to).not.toBe('notify');
      }
      expect(result.graph.edges.map((e) => `${e.from}->${e.to}`)).toContain('llm->end');
    });

    it('classifies a single change as targeted', async () => {
      const run = await runCase(UNSTRUCTURED.find((c) => c.id === 'free-add-retry')!);
      const proposal = run.response.proposal as { patches: unknown[]; complexity: string };

      expect(proposal.patches).toHaveLength(1);
      expect(proposal.complexity).toBe('targeted');
    });
  });

  /**
   * A harness property, not a claim about the model: whatever it is talked into
   * staging, the change still arrives as a proposal the developer has to accept.
   * Nothing between the tool and the response applies anything.
   */
  it('routes an instruction-override attempt into the review path like any other change', async () => {
    const run = await runCase(UNSTRUCTURED.find((c) => c.id === 'free-injection')!);
    const proposal = run.response.proposal as { patches: Array<{ op: string }> };

    expect(proposal.patches.every((p) => p.op === 'delete_node')).toBe(true);
    // The graph Studio sent is untouched — applying is a separate, explicit act.
    expect(run.ctx.get<{ nodes: Record<string, unknown> }>('graphState')?.nodes).toHaveProperty('llm');
    expect(Object.keys(GRAPH_FIXTURES.studioLinear.nodes)).toContain('llm');
  });
});

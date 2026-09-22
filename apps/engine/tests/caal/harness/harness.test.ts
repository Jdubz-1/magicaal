import {
  setupCaalHarness,
  invokeCaalSimulated,
  compiledCaalGraph,
  applySessionWrites,
} from './invoke';
import { expectedRunInput } from '../../../../../tests/fixtures/caal-wire/run-job-input';

/**
 * Proves the harness itself works before any corpus depends on it: the real
 * compiled Caal graph runs end to end, the scripted provider is reached, and
 * the response comes back in the shape apps/api returns.
 */
describe('Caal simulated-run harness', () => {
  beforeAll(async () => {
    await setupCaalHarness();
  }, 30_000);

  /**
   * The harness and apps/api's caal-invoke.test.ts consume the same fixture, so
   * a field invokeCaal starts or stops sending changes what a simulated run
   * starts from. This asserts the harness adds nothing of its own beyond the
   * two keys the scheduler seeds.
   */
  it('starts a run from the input the API dispatches, plus the scheduler keys', async () => {
    const run = await invokeCaalSimulated({
      message: 'What does this do?',
      intent: 'question',
      script: { explainer: [{ text: 'A push notifier.' }] },
    });

    const fromController = Object.keys(
      expectedRunInput({ tenantId: 'tenant-a', userId: 'user-1', agentId: 'agent-1' }),
    );
    for (const key of fromController) {
      expect(run.ctx.data).toHaveProperty(key);
    }

    const seeded = ['_caal_api_base', '_caal_tenant_id'];
    const started = Object.keys(run.ctx.data).filter(
      (k) => fromController.includes(k) || seeded.includes(k),
    );
    expect(started.sort()).toEqual([...fromController, ...seeded].sort());
  });

  it('compiles the real Caal agent, not a fixture of one', () => {
    const graph = compiledCaalGraph();

    expect(graph.nodes['intent-router']).toBeDefined();
    expect(graph.nodes['suggester']).toBeDefined();
    expect(graph.nodes['modifier']).toBeDefined();
    expect(graph.toolEdges.length).toBeGreaterThan(0);
  });

  it('runs an explain turn through the real graph and returns the API response shape', async () => {
    const run = await invokeCaalSimulated({
      message: 'Explain what this agent does and how the nodes connect.',
      intent: 'explain',
      script: {
        explainer: [{ text: 'It listens for a push, summarizes it with [[llm]], then posts to Slack.' }],
      },
    });

    expect(run.path).toEqual([
      'start',
      'session-read',
      'assemble-graph-context',
      'assemble-system-context',
      'intent-router',
      'build-explain-message',
      'explainer',
      'response-assembler',
      'session-write',
      'end',
    ]);

    expect(run.response.content).toContain('summarizes it');
    // response-assembler pulls [[nodeId]] markers out of the model's answer.
    expect(run.response.nodeReferences).toEqual(['llm']);
    expect(run.response.proposal).toBeUndefined();
  });

  /**
   * JSONata returns a bare value for a single match and undefined for none, so
   * response-assembler's $map needed an explicit array constructor: a
   * one-reference answer used to produce the string "llm" where every declared
   * type says string[], and an answer with no markers dropped the field.
   */
  it.each([
    ['no markers', 'Nothing to point at here.', []],
    ['one marker', 'Look at [[llm]].', ['llm']],
    ['several markers', '[[start]] feeds [[llm]] feeds [[notify]].', ['start', 'llm', 'notify']],
  ])('returns nodeReferences as an array with %s', async (_label, text, expected) => {
    const run = await invokeCaalSimulated({
      message: 'Explain this.',
      intent: 'explain',
      script: { explainer: [{ text }] },
    });

    expect(Array.isArray(run.response.nodeReferences)).toBe(true);
    expect(run.response.nodeReferences).toEqual(expected);
  });

  it('reaches the scripted provider with the graph actually serialized into the prompt', async () => {
    const run = await invokeCaalSimulated({
      message: 'What does this do?',
      intent: 'question',
      script: { explainer: [{ text: 'A push notifier.' }] },
    });

    expect(run.requests).toHaveLength(1);
    const [request] = run.requests;

    expect(request.nodeId).toBe('explainer');
    expect(request.system).toContain('You are Caal');
    // core:llm-call does no templating of its own, so the graph context has to
    // arrive pre-built in the message — the ISS-076 failure was an empty one.
    const sent = request.messages[0].content as string;
    expect(sent).toContain('What does this do?');
    expect(sent).toContain('GitHub Push Notifier');
    expect(sent).toContain('Graph context:');
  });

  it('offers the suggest path its read tools and none that stage a change', async () => {
    const run = await invokeCaalSimulated({
      message: 'Suggest improvements to this agent graph.',
      intent: 'suggest',
      script: {
        suggester: [
          { text: 'Let me look.', toolCalls: [{ name: 'caal.graph.summarize' }] },
          { text: 'Add a guardrail after the LLM node.' },
        ],
      },
    });

    const offered = run.toolsOffered('suggester');
    expect(offered).toContain('caal_graph_summarize');
    expect(offered).not.toContain('caal_proposal_create');
    expect(offered.filter((t) => /^caal_graph_(add|update|delete)/.test(t))).toEqual([]);

    // The tool really ran: its result came back into the conversation.
    expect(run.toolCalls.map((t) => t.name)).toEqual(['caal_graph_summarize']);
    expect(run.toolResults).toHaveLength(1);
    expect(run.toolResults[0].content).toContain('node(s)');
  });

  it('records what would have been written to the session, not what was loaded', async () => {
    const run = await invokeCaalSimulated({
      message: 'What does this do?',
      intent: 'question',
      session: [
        { role: 'user', content: 'earlier question' },
        { role: 'assistant', content: 'earlier answer' },
      ],
      script: { explainer: [{ text: 'A push notifier.' }] },
    });

    // The loaded pair is the baseline; only this turn's two entries are writes.
    expect(run.sessionWrites.messages).toEqual([
      { role: 'user', content: 'What does this do?' },
      { role: 'assistant', content: 'A push notifier.' },
    ]);
  });

  it('chains turns the way the session layer would', () => {
    const first = applySessionWrites([], {
      messages: [
        { role: 'user', content: 'one' },
        { role: 'assistant', content: 'two' },
      ],
    });
    const second = applySessionWrites(first, {
      messages: [
        { role: 'user', content: 'three' },
        { role: 'assistant', content: 'four' },
      ],
    });

    expect(second.map((m) => m.content)).toEqual(['one', 'two', 'three', 'four']);
  });

  it('keeps engine-internal keys out of the run output', async () => {
    const run = await invokeCaalSimulated({
      message: 'Suggest improvements to this agent graph.',
      intent: 'suggest',
      script: { suggester: [{ text: 'Add a guardrail.' }] },
    });

    for (const key of Object.keys(run.output)) {
      expect(key.startsWith('_')).toBe(false);
    }
    // The options prompt reaches the client only because response-assembler
    // copies it into caalResult, which the controller then flattens.
    expect(run.output._caal_options).toBeUndefined();
    expect(run.response.options).toBeDefined();
  });
});

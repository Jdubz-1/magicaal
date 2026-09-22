import { setupCaalHarness, invokeCaalSimulated } from '../harness/invoke';
import { assertRunInvariants, assertAnswered } from '../harness/assertions';

/**
 * What Caal does when something goes wrong mid-turn.
 *
 * Every case here is a shape that reached a developer as an unexplained
 * failure at least once: a transport blip logged as the bare string "fetch
 * failed", a tool error that killed the run instead of being handed back to
 * the model, an empty proposal that succeeded all the way to the review card.
 */

const ADVICE = 'Add a guardrail after the LLM node.';

function transportError(): Error {
  // undici reports a failed connect as exactly this, with the detail in
  // err.cause — which is why the engine has describeError at all.
  return Object.assign(new Error('fetch failed'), {
    cause: new AggregateError([Object.assign(new Error(''), { code: 'ECONNREFUSED' })], ''),
  });
}

function providerError(status: number): Error {
  return Object.assign(new Error(`Anthropic ${status}`), { _providerError: true, status });
}

describe('failure modes', () => {
  beforeAll(async () => {
    await setupCaalHarness();
  }, 30_000);

  describe('transport', () => {
    it('retries a call that never reached the provider, and the turn still completes', async () => {
      const run = await invokeCaalSimulated({
        message: 'Explain this graph.',
        intent: 'explain',
        script: {
          explainer: [{ error: transportError(), failTimes: 1, text: ADVICE }],
        },
      });

      assertRunInvariants(run);
      assertAnswered(run);
      // Two attempts at the same iteration: the failure and the retry.
      expect(run.requests).toHaveLength(2);
      expect(run.requests.every((r) => r.iteration === 1)).toBe(true);
    }, 15_000);

    it('gives up after the bounded number of retries rather than looping', async () => {
      await expect(
        invokeCaalSimulated({
          message: 'Explain this graph.',
          intent: 'explain',
          script: { explainer: [{ error: transportError() }] },
        }),
      ).rejects.toThrow();
    }, 15_000);

    /**
     * A provider that answered is not a transport failure. Retrying a 400
     * spends money re-sending a request the provider has already rejected.
     */
    it('does not retry an error the provider itself returned', async () => {
      let run: Awaited<ReturnType<typeof invokeCaalSimulated>> | undefined;
      await expect(
        (async () => {
          run = await invokeCaalSimulated({
            message: 'Explain this graph.',
            intent: 'explain',
            script: { explainer: [{ error: providerError(400) }] },
          });
        })(),
      ).rejects.toThrow();
      expect(run).toBeUndefined();
    });
  });

  describe('tool failures', () => {
    /**
     * A tool that fails is a message to the model, not the end of the run —
     * otherwise a single unreachable platform read ends a whole suggest turn.
     */
    it('hands a failed tool back to the model and carries on', async () => {
      const run = await invokeCaalSimulated({
        message: 'Suggest improvements to this agent graph.',
        intent: 'suggest',
        script: {
          suggester: [
            // askOptions with nothing usable fails deterministically.
            { toolCalls: [{ name: 'caal.ui.askOptions', input: { question: '', options: [] } }] },
            { text: ADVICE },
          ],
        },
      });

      assertRunInvariants(run);
      assertAnswered(run);
      expect(run.toolResults[0].content).toContain('error');
    });

    it('reports a tool the model invented rather than throwing', async () => {
      const run = await invokeCaalSimulated({
        message: 'Suggest improvements to this agent graph.',
        intent: 'suggest',
        script: {
          suggester: [
            { toolCalls: [{ name: 'caal.graph.doTheThing' }] },
            { text: ADVICE },
          ],
        },
      });

      assertRunInvariants(run);
      expect(run.toolResults[0].content).toContain('Unknown tool');
    });
  });

  describe('empty proposals', () => {
    /**
     * The root cause of the whole "accepted proposal changes nothing" report:
     * a proposal built from an empty staging list succeeded at four layers.
     */
    it('refuses to build a proposal from nothing, and says why in the tool result', async () => {
      const run = await invokeCaalSimulated({
        message: 'Add a guardrail after the LLM node.',
        intent: 'modify',
        script: {
          modifier: [
            { toolCalls: [{ name: 'caal.proposal.create', input: { description: 'Add a guardrail' } }] },
            { text: 'I could not stage that.' },
          ],
        },
      });

      assertRunInvariants(run);
      expect(run.response.proposal).toBeUndefined();

      // invokeNativeTool surfaces a failed tool's message, not its code, so
      // what the model gets is the sentence naming the staging tools.
      const result = JSON.parse(run.toolResults[0].content) as { error: string };
      expect(result.error).toContain('No graph changes are staged');
      expect(result.error).toContain('caal.graph.addNode');
    });

    it('leaves staging intact so the model can correct itself and propose again', async () => {
      const run = await invokeCaalSimulated({
        message: 'Add a guardrail after the LLM node.',
        intent: 'modify',
        script: {
          modifier: [
            { toolCalls: [{ name: 'caal.proposal.create', input: { description: 'Too early' } }] },
            {
              toolCalls: [
                { name: 'caal.graph.addNode', input: { nodeId: 'guardrail', nodeType: 'core:guardrail' } },
              ],
            },
            { toolCalls: [{ name: 'caal.proposal.create', input: { description: 'Add a guardrail' } }] },
            { text: 'Staged one change.' },
          ],
        },
      });

      assertRunInvariants(run);
      const proposal = run.response.proposal as { patches: unknown[] };
      expect(proposal.patches).toHaveLength(1);
    });
  });

  describe('empty answers', () => {
    it('stores no assistant turn when the model says nothing', async () => {
      const run = await invokeCaalSimulated({
        message: 'Explain this graph.',
        intent: 'explain',
        script: { explainer: [{ text: '' }] },
      });

      // An empty turn stored here comes back as a content-less message on the
      // next invocation, which the provider rejects.
      expect(run.sessionWrites.messages).toEqual([
        { role: 'user', content: 'Explain this graph.' },
      ]);
    });

    it('drops a content-less turn already in the session rather than re-sending it', async () => {
      const run = await invokeCaalSimulated({
        message: 'And now?',
        intent: 'explain',
        session: [
          { role: 'user', content: 'earlier question' },
          { role: 'assistant', content: '' },
          { role: 'user', content: 'another question' },
        ],
        script: { explainer: [{ text: ADVICE }] },
      });

      const history = run.requests[0].messages;
      for (const message of history) {
        expect(message.content).not.toBe('');
      }
      expect(JSON.stringify(history)).toContain('earlier question');
    });
  });

  describe('iteration budget', () => {
    /**
     * Documented, not endorsed: a loop that never stops calling tools fails the
     * run and the narration it accumulated is discarded. Returning it as a
     * success instead would report a turn that never converged as a finished
     * answer, so this is pinned as the current trade-off rather than changed
     * here.
     */
    it('fails the run when the model never stops calling tools', async () => {
      const spin = { toolCalls: [{ name: 'caal.graph.summarize' }] };

      await expect(
        invokeCaalSimulated({
          message: 'Suggest improvements to this agent graph.',
          intent: 'suggest',
          script: { suggester: Array.from({ length: 9 }, () => spin) },
        }),
      ).rejects.toThrow(/maxIterations|MAX_ITERATIONS/i);
    });

    it('leaves the suggest path room for inspection calls plus a closing answer', async () => {
      const run = await invokeCaalSimulated({
        message: 'Suggest improvements to this agent graph.',
        intent: 'suggest',
        script: {
          suggester: [
            ...Array.from({ length: 7 }, (_, i) => ({
              text: `Step ${i + 1}.`,
              toolCalls: [{ name: 'caal.graph.summarize' }],
            })),
            { text: ADVICE },
          ],
        },
      });

      assertRunInvariants(run);
      expect(run.response.content).toContain('Step 1.');
      expect(run.response.content).toContain(ADVICE);
    });
  });
});

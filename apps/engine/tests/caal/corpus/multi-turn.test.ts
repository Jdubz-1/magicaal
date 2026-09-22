import type { CanonicalMessage } from '@magicaal/core';
import {
  setupCaalHarness,
  invokeCaalSimulated,
  applySessionWrites,
} from '../harness/invoke';
import { assertRunInvariants } from '../harness/assertions';

/**
 * Conversations, not single turns.
 *
 * "I don't have a record of improvements I just suggested to you. This appears
 * to be the first request in our conversation." — the modifier, one turn after
 * the suggester had given three paragraphs of advice. core:tool-call and
 * core:react advertised injectSessionHistory in their schema and only
 * core:llm-call implemented it, so every agentic Caal turn started blank.
 */

const ANSWER = 'Understood.';

function turns(n: number): CanonicalMessage[] {
  return Array.from({ length: n }, (_, i) => [
    { role: 'user' as const, content: `question ${i + 1}` },
    { role: 'assistant' as const, content: `answer ${i + 1}` },
  ]).flat();
}

function historyOf(messages: CanonicalMessage[]): string[] {
  return messages.map((m) => (typeof m.content === 'string' ? m.content : JSON.stringify(m.content)));
}

describe('multi-turn conversations', () => {
  beforeAll(async () => {
    await setupCaalHarness();
  }, 30_000);

  it('accumulates across three turns without nesting or duplicating', async () => {
    let stored: CanonicalMessage[] = [];

    for (const message of ['first question', 'second question', 'third question']) {
      const run = await invokeCaalSimulated({
        message,
        intent: 'explain',
        session: stored,
        script: { explainer: [{ text: `answer to ${message}` }] },
      });

      assertRunInvariants(run);
      stored = applySessionWrites(stored, run.sessionWrites);
    }

    // Six flat entries, not three arrays of two. The node and the session layer
    // both accumulating produced a list of turn-arrays that core:llm-call then
    // fed to the provider as entries with no role or content.
    expect(stored).toHaveLength(6);
    for (const entry of stored) {
      expect(['user', 'assistant']).toContain(entry.role);
      expect(typeof entry.content).toBe('string');
    }
    expect(historyOf(stored)).toEqual([
      'first question',
      'answer to first question',
      'second question',
      'answer to second question',
      'third question',
      'answer to third question',
    ]);
  });

  describe('history injection', () => {
    it('gives the agentic path the conversation it was configured for', async () => {
      const run = await invokeCaalSimulated({
        message: 'Turn that into a proposal.',
        intent: 'modify',
        session: [
          { role: 'user', content: 'Suggest improvements to this agent graph.' },
          { role: 'assistant', content: 'Add a content safety guardrail after the LLM node.' },
        ],
        script: {
          modifier: [
            {
              toolCalls: [
                { name: 'caal.graph.addNode', input: { nodeId: 'guardrail', nodeType: 'core:guardrail' } },
              ],
            },
            { toolCalls: [{ name: 'caal.proposal.create', input: { description: 'Add the guardrail' } }] },
            { text: 'Staged it.' },
          ],
        },
      });

      const sent = historyOf(run.requests[0].messages);
      expect(sent[0]).toContain('Suggest improvements');
      expect(sent[1]).toContain('content safety guardrail');
      expect(sent[sent.length - 1]).toContain('Turn that into a proposal.');
    });

    it('resends the whole conversation on every iteration of the loop', async () => {
      const run = await invokeCaalSimulated({
        message: 'Suggest improvements to this agent graph.',
        intent: 'suggest',
        session: turns(2),
        script: {
          suggester: [
            { toolCalls: [{ name: 'caal.graph.summarize' }] },
            { text: 'Add a guardrail.' },
          ],
        },
      });

      // Both iterations carry the prior turns, which is exactly why the loop
      // caps what it injects and a single llm-call does not.
      for (const request of run.requests) {
        expect(historyOf(request.messages)[0]).toBe('question 1');
      }
      expect(run.requests[1].messages.length).toBeGreaterThan(run.requests[0].messages.length);
    });

    /**
     * The cap exists because the agentic loop resends the conversation up to
     * eight times; a single llm-call sends it once and is left uncapped.
     */
    it('caps the agentic path at the newest turns and leaves llm-call uncapped', async () => {
      const long = turns(30);

      const agentic = await invokeCaalSimulated({
        message: 'Suggest improvements to this agent graph.',
        intent: 'suggest',
        session: long,
        script: { suggester: [{ text: 'Add a guardrail.' }] },
      });

      const injected = agentic.requests[0].messages.slice(0, -1);
      expect(injected.length).toBeLessThanOrEqual(20);
      expect(injected.length).toBeGreaterThan(0);
      // Newest kept: the last stored turn survives, the first does not.
      expect(historyOf(injected)).toContain('answer 30');
      expect(historyOf(injected)).not.toContain('question 1');

      const single = await invokeCaalSimulated({
        message: 'Explain this graph.',
        intent: 'explain',
        session: long,
        script: { explainer: [{ text: ANSWER }] },
      });

      expect(single.requests[0].messages.length).toBe(long.length + 1);
      expect(historyOf(single.requests[0].messages)).toContain('question 1');
    });

    it('caps by characters as well as by count', async () => {
      const heavy: CanonicalMessage[] = Array.from({ length: 10 }, (_, i) => ({
        role: (i % 2 === 0 ? 'user' : 'assistant') as 'user' | 'assistant',
        content: `${i}`.repeat(6_000),
      }));

      const run = await invokeCaalSimulated({
        message: 'Suggest improvements to this agent graph.',
        intent: 'suggest',
        session: heavy,
        script: { suggester: [{ text: 'Add a guardrail.' }] },
      });

      const injected = run.requests[0].messages.slice(0, -1);
      const chars = injected.reduce((sum, m) => sum + String(m.content).length, 0);
      expect(chars).toBeLessThanOrEqual(24_000);
      // Never fewer than one: an over-budget conversation still gets context.
      expect(injected.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('session accumulation', () => {
    it('records a proposal in history only on the turns that produced one', async () => {
      const advisory = await invokeCaalSimulated({
        message: 'Suggest improvements to this agent graph.',
        intent: 'suggest',
        script: { suggester: [{ text: 'Add a guardrail.' }] },
      });

      // $._caal_proposal ? $append([], [...]) : [] — an empty append stores
      // nothing rather than a null entry.
      expect(advisory.sessionWrites.proposalHistory).toEqual([]);
      expect(advisory.sessionWrites.lastProposal).toBeUndefined();

      const modifying = await invokeCaalSimulated({
        message: 'Add a guardrail after the LLM node.',
        intent: 'modify',
        script: {
          modifier: [
            {
              toolCalls: [
                { name: 'caal.graph.addNode', input: { nodeId: 'guardrail', nodeType: 'core:guardrail' } },
              ],
            },
            { toolCalls: [{ name: 'caal.proposal.create', input: { description: 'Add a guardrail' } }] },
            { text: 'Staged it.' },
          ],
        },
      });

      expect(modifying.sessionWrites.proposalHistory).toHaveLength(1);
      expect(modifying.sessionWrites.lastProposal).toMatchObject({ description: 'Add a guardrail' });
    });

    it('evicts the oldest turns once the stored conversation is full', () => {
      // maxItems: 50, overflow: evict_oldest on the messages key.
      let stored = turns(24); // 48 entries
      stored = applySessionWrites(stored, {
        messages: [
          { role: 'user', content: 'newest question' },
          { role: 'assistant', content: 'newest answer' },
        ],
      });
      expect(stored).toHaveLength(50);

      stored = applySessionWrites(stored, {
        messages: [
          { role: 'user', content: 'newer still' },
          { role: 'assistant', content: 'and its answer' },
        ],
      });

      expect(stored).toHaveLength(50);
      expect(historyOf(stored)).not.toContain('question 1');
      expect(historyOf(stored)).toContain('and its answer');
    });
  });
});

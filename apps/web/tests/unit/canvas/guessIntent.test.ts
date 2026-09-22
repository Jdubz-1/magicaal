import { guessIntent } from '../../../src/canvas/lib/guessIntent';
import { CAAL_INTENTS } from '../../../src/canvas/lib/caalOptions';

/**
 * The intent decides which branch of the Caal graph runs — a "modify" request
 * classified as a question reaches a node with no staging tools and can only
 * answer in prose. Studio's quick actions carry an explicit intent; anything
 * typed freehand goes through this classifier, so its behaviour is pinned here
 * and the regression corpus derives its intents from it rather than hardcoding
 * them (docs/developer-guide/caal-regression-suite.md §3.2).
 */
describe('guessIntent', () => {
  it('only ever returns an intent the graph has a case for', () => {
    const samples = [
      'add a node', 'improve this', 'why is it slow?', '', '   ',
      'DELETE EVERYTHING', 'ordinary words with no verb at all',
    ];
    for (const text of samples) {
      expect(CAAL_INTENTS).toContain(guessIntent(text));
    }
  });

  describe('modify', () => {
    it.each([
      'add a retry to the http node',
      'create a guardrail node',
      'remove the logging step',
      'delete the unused branch',
      'update the model on the llm node',
      'change the temperature',
      'modify the router condition',
      'rename the start node',
      'move the guardrail earlier',
      'connect start straight to the llm',
      'disconnect these two',
    ])('classifies %p as modify', (text) => {
      expect(guessIntent(text)).toBe('modify');
    });
  });

  describe('suggest', () => {
    it.each([
      'suggest something',
      'how do I improve this graph?',
      'optimize this for cost',
      'is there a better way to do this?',
      'what do you recommend?',
      'enhance the error handling',
    ])('classifies %p as suggest', (text) => {
      expect(guessIntent(text)).toBe('suggest');
    });
  });

  it('falls back to question when no verb matches', () => {
    expect(guessIntent('why is my agent so slow?')).toBe('question');
    expect(guessIntent('what happens if the API call fails?')).toBe('question');
    expect(guessIntent('')).toBe('question');
  });

  it('is case-insensitive', () => {
    expect(guessIntent('ADD A NODE')).toBe('modify');
    expect(guessIntent('Optimize This')).toBe('suggest');
  });

  /**
   * modify is checked first, so a message carrying both kinds of verb takes the
   * branch that can actually stage a change — the safer of the two, since the
   * modify path can still answer in prose but the suggest path cannot stage.
   */
  it('prefers modify when a message carries both kinds of verb', () => {
    expect(guessIntent('add a cache to improve performance')).toBe('modify');
  });

  /**
   * The patterns are word-bounded, which has two documented consequences. These
   * are not assertions that the behaviour is ideal — they are here so a change
   * to the regex shows up as a deliberate diff.
   */
  describe('word-boundary consequences', () => {
    it('does not fire on a verb embedded in a longer word', () => {
      expect(guessIntent('what does the address field do?')).toBe('question');
      expect(guessIntent('tell me about the changelog')).toBe('question');
    });

    it('does not fire on an inflected verb, so past tense reads as a question', () => {
      expect(guessIntent('I moved the node and it broke')).toBe('question');
      expect(guessIntent('who deleted the guardrail?')).toBe('question');
    });
  });

  /**
   * Studio sends its quick actions with an explicit intent rather than routing
   * them through this function, and these two are why: the classifier disagrees
   * with the intent the action means. "Explain what this agent does and how the
   * nodes connect" trips the `connect` verb, which would send a read-only
   * question down the modify path.
   */
  describe('why quick actions carry an explicit intent', () => {
    it.each([
      ['Explain what this agent does and how the nodes connect.', 'explain', 'modify'],
      ['Describe the currently selected node.', 'explain', 'question'],
    ])('%p is sent as %p but would be guessed as %p', (prompt, _sent, guessed) => {
      expect(guessIntent(prompt)).toBe(guessed);
    });

    it.each([
      ['Suggest improvements to this agent graph.', 'suggest'],
      ['How can I optimize this agent graph for performance?', 'suggest'],
      ['Add a content safety guardrail node after the LLM node.', 'modify'],
    ])('%p agrees with the intent Studio sends (%p)', (prompt, sent) => {
      expect(guessIntent(prompt)).toBe(sent);
    });
  });
});

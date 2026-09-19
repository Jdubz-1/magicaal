import { readSessionHistory } from '../../../src/utils/session-history';

/**
 * Stored turns are not guaranteed to be clean CanonicalMessages, and both the
 * llm-call node and the engine's agentic loop read them back into a request.
 */
describe('readSessionHistory', () => {
  const turn = (role: 'user' | 'assistant', content: string) => ({ role, content });

  it('reads plain stored turns', () => {
    const stored = [turn('user', 'Suggest improvements'), turn('assistant', 'Here are three…')];

    expect(readSessionHistory(stored)).toEqual(stored);
  });

  it('flattens the turn-arrays older sessions stored', () => {
    const stored = [
      [turn('user', 'first'), turn('assistant', 'reply')],
      [turn('user', 'second'), turn('assistant', 'reply two')],
    ];

    expect(readSessionHistory(stored)).toHaveLength(4);
  });

  it('drops a turn with empty content, which providers reject', () => {
    const stored = [
      turn('user', 'Suggest improvements'),
      turn('assistant', ''),
      turn('assistant', '   '),
      turn('user', 'and again'),
    ];

    expect(readSessionHistory(stored).map((m) => m.content)).toEqual([
      'Suggest improvements',
      'and again',
    ]);
  });

  it('drops anything that is not a message', () => {
    const stored = [null, 'a string', 7, { role: 'narrator', content: 'x' }, { content: 'no role' }];

    expect(readSessionHistory(stored)).toEqual([]);
  });

  it('keeps a block-array content but not an empty one', () => {
    const blocks = { role: 'assistant' as const, content: [{ type: 'text' as const, text: 'hi' }] };

    expect(readSessionHistory([blocks, { role: 'assistant', content: [] }])).toEqual([blocks]);
  });

  it('returns nothing for a missing or non-array value', () => {
    for (const stored of [undefined, null, 'not an array', {}]) {
      expect(readSessionHistory(stored)).toEqual([]);
    }
  });

  it('keeps the most recent messages when capped by count', () => {
    const stored = Array.from({ length: 10 }, (_, i) => turn('user', `m${i}`));

    expect(readSessionHistory(stored, { maxMessages: 3 }).map((m) => m.content)).toEqual([
      'm7',
      'm8',
      'm9',
    ]);
  });

  it('trims from the oldest end to fit a character budget', () => {
    const stored = [turn('user', 'x'.repeat(100)), turn('assistant', 'y'.repeat(30)), turn('user', 'z')];

    expect(readSessionHistory(stored, { maxChars: 40 }).map((m) => m.content[0])).toEqual(['y', 'z']);
  });

  it('keeps at least the newest message even when it alone exceeds the budget', () => {
    const stored = [turn('user', 'old'), turn('assistant', 'w'.repeat(500))];

    expect(readSessionHistory(stored, { maxChars: 10 })).toHaveLength(1);
  });
});

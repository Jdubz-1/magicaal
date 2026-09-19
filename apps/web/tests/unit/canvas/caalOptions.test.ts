import { normalizeCaalOptions } from '../../../src/canvas/lib/caalOptions';

/**
 * The options card's payload is written by the model, and choosing an option
 * sends its followUpMessage back to Caal as a new turn — so Studio re-checks
 * the shape the engine-side tool already normalized, and additionally drops
 * answers it can't honour here.
 */
const studio = { readonly: false };

describe('normalizeCaalOptions', () => {
  const proposalPrompt = {
    question: 'Want me to turn this into a proposal you can apply?',
    options: [
      {
        label: 'Yes, draft a proposal',
        value: 'create_proposal',
        description: 'Caal stages each change.',
        followUpMessage: 'Create a proposal implementing the improvements.',
        followUpIntent: 'modify',
      },
      { label: 'No thanks', value: 'dismiss' },
    ],
  };

  it('keeps a well-formed prompt intact', () => {
    expect(normalizeCaalOptions(proposalPrompt, studio)).toEqual(proposalPrompt);
  });

  it('returns null for anything that is not a usable prompt', () => {
    for (const raw of [
      null,
      undefined,
      'a string',
      { options: proposalPrompt.options },
      { question: 'ok?', options: 'not an array' },
      { question: 'ok?', options: [] },
      { question: '   ', options: proposalPrompt.options },
      { question: 'ok?', options: [{ value: 'no-label' }] },
    ]) {
      expect(normalizeCaalOptions(raw, studio)).toBeNull();
    }
  });

  it('drops modify follow-ups for a code-defined agent, which cannot be modified', () => {
    const result = normalizeCaalOptions(proposalPrompt, { readonly: true });

    expect(result?.options).toEqual([{ label: 'No thanks', value: 'dismiss' }]);
  });

  it('returns null when readonly filtering leaves nothing', () => {
    const onlyModify = { question: 'Apply?', options: [proposalPrompt.options[0]] };

    expect(normalizeCaalOptions(onlyModify, { readonly: true })).toBeNull();
  });

  it('caps the options and clamps long strings', () => {
    const result = normalizeCaalOptions(
      {
        question: 'Q'.repeat(500),
        options: Array.from({ length: 7 }, (_, i) => ({
          label: `L${i}`.repeat(80),
          value: `v${i}`,
          description: 'D'.repeat(300),
        })),
      },
      studio,
    );

    expect(result?.question).toHaveLength(200);
    expect(result?.options).toHaveLength(4);
    expect(result?.options[0].label).toHaveLength(60);
    expect(result?.options[0].description).toHaveLength(160);
  });

  it('ignores a follow-up whose intent is not one the Caal graph routes on', () => {
    const result = normalizeCaalOptions(
      {
        question: 'Go?',
        options: [{ label: 'Go', value: 'go', followUpMessage: 'do it', followUpIntent: 'wipe' }],
      },
      studio,
    );

    expect(result?.options[0].followUpIntent).toBeUndefined();
    expect(result?.options[0].followUpMessage).toBeUndefined();
  });
});

import { uiAskOptions, normalizeUiOptions } from '@magicaal/integration-caal';
import type { ExecutionContext } from '@magicaal/sdk-node';

/**
 * The model writes this payload, so every field is re-checked: Studio renders
 * the labels as buttons and sends a chosen option's followUpMessage back as a
 * new Caal turn, so an intent outside the graph's intent-router cases would
 * quietly answer the wrong branch.
 */
function fakeCtx(): ExecutionContext {
  const store: Record<string, unknown> = {};
  return {
    get: <T>(key: string) => store[key] as T | undefined,
    set: (key: string, value: unknown) => {
      store[key] = value;
    },
    data: store,
  } as unknown as ExecutionContext;
}

describe('caal.ui.askOptions', () => {
  const yesNo = [
    {
      label: 'Yes, draft a proposal',
      value: 'create_proposal',
      followUpMessage: 'Create a proposal implementing the improvements.',
      followUpIntent: 'modify',
    },
    { label: 'No thanks', value: 'dismiss' },
  ];

  it('writes the question and options to _caal_options', async () => {
    const ctx = fakeCtx();

    const out = await uiAskOptions.execute(ctx, { question: 'Turn this into a proposal?', options: yesNo });

    expect(out.status).toBe('complete');
    expect(out.outputs.asked).toBe(2);
    expect(ctx.get('_caal_options')).toEqual({
      question: 'Turn this into a proposal?',
      options: yesNo,
    });
  });

  it('fails when the question or every option is unusable', async () => {
    for (const config of [
      { question: '  ', options: yesNo },
      { question: 'ok?', options: [] },
      { question: 'ok?', options: [{ value: 'no-label' }, { label: 'no value' }] },
      { question: 'ok?', options: 'not an array' },
    ]) {
      const ctx = fakeCtx();
      const out = await uiAskOptions.execute(ctx, config);

      expect(out.status).toBe('failed');
      expect(out.error?.code).toBe('NO_VALID_OPTIONS');
      expect(ctx.get('_caal_options')).toBeUndefined();
    }
  });
});

describe('normalizeUiOptions', () => {
  it('caps the list at four options', () => {
    const six = Array.from({ length: 6 }, (_, i) => ({ label: `Option ${i}`, value: `v${i}` }));

    expect(normalizeUiOptions(six)).toHaveLength(4);
  });

  it('clamps long labels and descriptions', () => {
    const [option] = normalizeUiOptions([
      { label: 'L'.repeat(200), value: 'v', description: 'D'.repeat(400) },
    ]);

    expect(option.label).toHaveLength(60);
    expect(option.description).toHaveLength(160);
  });

  it('drops a follow-up whose intent is not one the graph routes on', () => {
    const [option] = normalizeUiOptions([
      { label: 'Go', value: 'go', followUpMessage: 'do it', followUpIntent: 'delete-everything' },
    ]);

    expect(option.followUpIntent).toBeUndefined();
    expect(option.followUpMessage).toBeUndefined();
  });

  it('drops a follow-up message with no intent at all', () => {
    const [option] = normalizeUiOptions([{ label: 'Go', value: 'go', followUpMessage: 'do it' }]);

    expect(option.followUpMessage).toBeUndefined();
  });

  it('drops a duplicate value — Studio keys its buttons by it', () => {
    expect(
      normalizeUiOptions([
        { label: 'No thanks', value: 'dismiss' },
        { label: 'Not now', value: 'dismiss' },
      ]),
    ).toEqual([{ label: 'No thanks', value: 'dismiss' }]);
  });

  it('ignores entries that are not option objects', () => {
    expect(normalizeUiOptions([null, 'nope', 7, { label: 'Keep', value: 'keep' }])).toEqual([
      { label: 'Keep', value: 'keep' },
    ]);
  });
});

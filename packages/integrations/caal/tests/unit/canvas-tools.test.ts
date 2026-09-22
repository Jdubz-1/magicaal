import { canvasHighlight, canvasFocus } from '../../src/index';
import { makeMockContext } from '../helpers/mock-context';

/**
 * Both tools communicate by writing a context key that the Caal graph's
 * response-assembler lifts into `caalResult` and Studio dispatches as a canvas
 * event. The key names and payload shapes are the contract between
 * agents/caal.agent.ts and CaalPanel.svelte, so they are pinned here rather
 * than left to agree by coincidence.
 */

describe('caal.canvas.highlight', () => {
  it('writes the key response-assembler reads, with the shape Studio dispatches', async () => {
    const ctx = makeMockContext({});

    const res = await canvasHighlight.execute(ctx, {
      nodeIds: ['llm', 'guard'],
      color: '#22C55E',
      durationMs: 5000,
    });

    expect(res.status).toBe('complete');
    expect(res.outputs).toEqual({ highlighted: ['llm', 'guard'] });
    expect(ctx.get('_caal_canvas_highlight')).toEqual({
      nodeIds: ['llm', 'guard'],
      color: '#22C55E',
      durationMs: 5000,
    });
  });

  it('fills in a colour and duration when the model supplies neither', async () => {
    const ctx = makeMockContext({});

    await canvasHighlight.execute(ctx, { nodeIds: ['llm'] });

    // Studio reads all three fields off the event; an undefined colour renders
    // as no highlight at all.
    expect(ctx.get('_caal_canvas_highlight')).toEqual({
      nodeIds: ['llm'],
      color: '#F59E0B',
      durationMs: 2000,
    });
  });

  it('accepts an empty selection without writing a malformed payload', async () => {
    const ctx = makeMockContext({});

    const res = await canvasHighlight.execute(ctx, { nodeIds: [] });

    expect(res.status).toBe('complete');
    expect(ctx.get<{ nodeIds: string[] }>('_caal_canvas_highlight')?.nodeIds).toEqual([]);
  });
});

describe('caal.canvas.focus', () => {
  it('writes nodeId and zoom', async () => {
    const ctx = makeMockContext({});

    const res = await canvasFocus.execute(ctx, { nodeId: 'llm', zoom: 2 });

    expect(res.outputs).toEqual({ focused: 'llm' });
    expect(ctx.get('_caal_canvas_focus')).toEqual({ nodeId: 'llm', zoom: 2 });
  });

  it('defaults the zoom level', async () => {
    const ctx = makeMockContext({});

    await canvasFocus.execute(ctx, { nodeId: 'llm' });

    expect(ctx.get('_caal_canvas_focus')).toEqual({ nodeId: 'llm', zoom: 1.5 });
  });
});

describe('canvas keys stay engine-internal', () => {
  /**
   * core:end strips `_`-prefixed keys from a run's output, so these reach the
   * client only because response-assembler copies them into `caalResult`. A
   * rename that drops the underscore would leak them into every run result.
   */
  it('both tools write underscore-prefixed keys', async () => {
    const ctx = makeMockContext({});

    await canvasHighlight.execute(ctx, { nodeIds: ['a'] });
    await canvasFocus.execute(ctx, { nodeId: 'a' });

    const written = Object.keys(ctx.data).filter((k) => k.startsWith('_caal_canvas'));
    expect(written.sort()).toEqual(['_caal_canvas_focus', '_caal_canvas_highlight']);
  });
});

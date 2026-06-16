import type { NodeModule } from '@magicaal/sdk-node';

export const canvasHighlight: NodeModule = {
  type: 'caal.canvas.highlight',
  meta: { name: 'Highlight Nodes', description: 'Highlight one or more nodes on the Studio canvas', category: 'integration', version: '0.1.0' },
  schema: {
    config: {
      type: 'object',
      properties: {
        nodeIds: { type: 'array', items: { type: 'string' }, description: 'Node IDs to highlight' },
        color: { type: 'string', description: 'Optional highlight color (hex or CSS color name)' },
        durationMs: { type: 'number', description: 'How long to keep the highlight (ms). Default 2000.' },
      },
      required: ['nodeIds'],
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        highlighted: { type: 'array', description: 'Node IDs that were highlighted' },
      },
    },
  },
  async execute(ctx, config) {
    const cfg = config as { nodeIds: string[]; color?: string; durationMs?: number };
    ctx.set('_caal_canvas_highlight', {
      nodeIds: cfg.nodeIds,
      color: cfg.color ?? '#F59E0B',
      durationMs: cfg.durationMs ?? 2000,
    });
    return { highlighted: cfg.nodeIds };
  },
};

export const canvasFocus: NodeModule = {
  type: 'caal.canvas.focus',
  meta: { name: 'Focus Node', description: 'Pan and zoom the Studio canvas to focus on a specific node', category: 'integration', version: '0.1.0' },
  schema: {
    config: {
      type: 'object',
      properties: {
        nodeId: { type: 'string', description: 'Node ID to pan and zoom the canvas to' },
        zoom: { type: 'number', description: 'Target zoom level (default 1.5)' },
      },
      required: ['nodeId'],
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        focused: { type: 'string', description: 'The node ID that was focused' },
      },
    },
  },
  async execute(ctx, config) {
    const cfg = config as { nodeId: string; zoom?: number };
    ctx.set('_caal_canvas_focus', {
      nodeId: cfg.nodeId,
      zoom: cfg.zoom ?? 1.5,
    });
    return { focused: cfg.nodeId };
  },
};

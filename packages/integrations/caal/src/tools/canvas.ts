import type { NodeModule } from '@magicaal/sdk-node';

export const canvasHighlight: NodeModule = {
  type: 'caal.canvas.highlight',
  meta: { name: 'Highlight Nodes', description: 'Highlight one or more nodes on the Studio canvas', category: 'integration', version: '0.1.0' },
  schema: { config: {}, input: {}, output: {} },
  async execute() { throw new Error('Not implemented'); },
};

export const canvasFocus: NodeModule = {
  type: 'caal.canvas.focus',
  meta: { name: 'Focus Node', description: 'Pan and zoom the Studio canvas to focus on a specific node', category: 'integration', version: '0.1.0' },
  schema: { config: {}, input: {}, output: {} },
  async execute() { throw new Error('Not implemented'); },
};

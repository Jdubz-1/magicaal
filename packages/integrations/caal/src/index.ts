import type { NodeModule } from '@magicaal/sdk-node';
import {
  graphRead,
  graphGetNode,
  graphGetSelectedNodes,
  graphSummarize,
  graphAddNode,
  graphUpdateNode,
  graphDeleteNode,
  graphAddEdge,
  graphDeleteEdge,
  graphAddToolEdge,
} from './tools/graph';
import { proposalCreate } from './tools/proposal';
import {
  platformListNodeTypes,
  platformGetNodeSchema,
  platformListConnections,
  platformListAgents,
} from './tools/platform';
import { canvasHighlight, canvasFocus } from './tools/canvas';

export * from './tools/graph';
export * from './tools/proposal';
export * from './tools/platform';
export * from './tools/canvas';

/**
 * Every Caal tool as a flat NodeModule list, mirroring @magicaal/nodes'
 * ALL_NODES — this is what the engine registers into the same node registry
 * built-in and integration nodes use (apps/engine/src/registry/startup.ts),
 * so tool edges referencing these type names (agents/caal.agent.ts's
 * this.tool('caal.graph.read', ...) calls) resolve to something at runtime.
 */
export const ALL_CAAL_TOOLS: NodeModule[] = [
  graphRead,
  graphGetNode,
  graphGetSelectedNodes,
  graphSummarize,
  graphAddNode,
  graphUpdateNode,
  graphDeleteNode,
  graphAddEdge,
  graphDeleteEdge,
  graphAddToolEdge,
  proposalCreate,
  platformListNodeTypes,
  platformGetNodeSchema,
  platformListConnections,
  platformListAgents,
  canvasHighlight,
  canvasFocus,
];

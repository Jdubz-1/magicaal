import type { AgentGraphDefinition } from './graph';
import type { RunStatus } from './run';

export interface CaalInvokeRequest {
  message: string;
  graphState: AgentGraphDefinition | null;
  selectedNodeIds: string[];
  lastRunResult?: RunSummary;
  sessionId: string;
}

export interface RunSummary {
  runId: string;
  status: RunStatus;
  failedNodeId?: string;
  errorMessage?: string;
}

export interface CaalResponse {
  message: string;
  proposal?: CaalProposal;
  options?: CaalOptionsPrompt;
  nodeReferences: NodeReference[];
  tsChanges?: TypeScriptSuggestion;
}

/**
 * A question Caal puts to the developer with selectable answers, rendered as an
 * inline card in Studio. Written by the caal.ui.askOptions tool; the suggest
 * path uses it to offer turning advice into a proposal, since that path is
 * advisory and stages no graph changes itself.
 */
export interface CaalOptionsPrompt {
  question: string;
  options: CaalOption[];
}

export interface CaalOption {
  /** Button text. */
  label: string;
  /** Machine-readable answer id, e.g. 'create_proposal'. */
  value: string;
  description?: string;
  /** Sent back to Caal as a new turn when this answer is chosen. */
  followUpMessage?: string;
  followUpIntent?: CaalIntent;
}

export type CaalIntent = 'explain' | 'question' | 'suggest' | 'modify';

export interface NodeReference {
  nodeId: string;
  nodeType: string;
  label?: string;
}

export interface TypeScriptSuggestion {
  description: string;
  diff: string;
  targetHandle: string;
}

export interface CaalProposal {
  id: string;
  description: string;
  complexity: 'targeted' | 'structural' | 'replacement';
  patches: GraphPatch[];
  preview?: AgentGraphDefinition;
  reasoning?: string;
}

export interface GraphPatch {
  op:
    | 'add_node'
    | 'update_node'
    | 'delete_node'
    | 'add_edge'
    | 'delete_edge'
    | 'add_tool_edge';
  target?: string;
  data?: Record<string, unknown>;
  reason?: string;
}

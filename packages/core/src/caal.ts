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
  nodeReferences: NodeReference[];
  tsChanges?: TypeScriptSuggestion;
}

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

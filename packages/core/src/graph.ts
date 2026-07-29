import type { AgentConfig } from './agent';
import type { ModelRouterConfig } from './llm';
import type { WorkspaceTool } from './workspace';

export interface AgentGraphDefinition {
  version: string;
  handle?: string;
  name: string;
  description?: string;
  entry: string;
  nodes: Record<string, NodeDefinition>;
  edges: EdgeDefinition[];
  toolEdges: ToolEdgeDefinition[];
  workspaceEdges: WorkspaceEdgeDefinition[];
  routerPolicies?: Record<string, ModelRouterConfig>;
  config: AgentConfig;
  layout?: GraphLayout;
  /**
   * Admin-override policy for config fields on code-defined agents.
   * false or absent = all fields locked (code is the source of truth);
   * true = all fields admin-overridable; object = per-field flags
   * (true = overridable, false = locked). Consumed by boot-time sync.
   */
  overridable?: boolean | Record<string, boolean>;
}

export interface NodeDefinition {
  id: string;
  type: string;
  label?: string;
  config: Record<string, unknown>;
  group?: string;
}

export interface EdgeDefinition {
  id: string;
  from: string;
  to: string;
  type: 'unconditional' | 'conditional' | 'fallback';
  condition?: string;
  label?: string;
}

export interface ToolEdgeDefinition {
  id: string;
  from: string;
  to: string;
}

export interface WorkspaceEdgeDefinition {
  id: string;
  from: string;
  to: string;
  edgeRole: 'tool-source' | 'agent-registration';
}

export interface GraphLayout {
  nodes: Record<string, { x: number; y: number }>;
  groups?: Record<string, { label: string; color?: string }>;
}

export interface ToolContract {
  name: string;
  description: string;
  inputSchema: object;
}

export interface ToolNodeConfig extends ToolContract {
  inputMapping: Record<string, string>;
  outputMapping: string;
}

export interface AssembledTool {
  name: string;
  description: string;
  inputSchema: object;
  source: 'graph' | 'mcp' | 'native';
  nodeId: string;
  mcpToolName?: string;
}

export interface AssembledWorkspaceTool {
  name: string;
  description: string;
  inputSchema: object;
  source: 'workspace';
  workspaceId: string;
  wsToolType: WorkspaceTool;
}

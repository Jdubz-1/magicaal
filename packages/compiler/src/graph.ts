import type { NodeDefinition, EdgeDefinition, ToolEdgeDefinition, WorkspaceEdgeDefinition } from '@magicaal/core';

export interface GraphSnapshot {
  nodes: Record<string, NodeDefinition>;
  edges: EdgeDefinition[];
  toolEdges: ToolEdgeDefinition[];
  workspaceEdges: WorkspaceEdgeDefinition[];
}

export abstract class AgentGraph {
  private _nodes: Record<string, NodeDefinition> = {};
  private _edges: EdgeDefinition[] = [];
  private _toolEdges: ToolEdgeDefinition[] = [];
  private _workspaceEdges: WorkspaceEdgeDefinition[] = [];
  private _edgeCounter = 0;

  abstract build(): void;

  node(id: string, type: string, config: Record<string, unknown> = {}): void {
    this._nodes[id] = { id, type, config };
  }

  connect(from: string, to: string): void {
    this._edges.push({ id: `e_${++this._edgeCounter}`, from, to, type: 'unconditional' });
  }

  when(from: string, condition: string, to: string, label?: string): void {
    this._edges.push({ id: `e_${++this._edgeCounter}`, from, to, type: 'conditional', condition, label });
  }

  otherwise(from: string, to: string): void {
    this._edges.push({ id: `e_${++this._edgeCounter}`, from, to, type: 'fallback' });
  }

  tool(toolNodeId: string, agentNodeId: string): void {
    this._toolEdges.push({ id: `te_${++this._edgeCounter}`, from: toolNodeId, to: agentNodeId });
  }

  workspace(workspaceNodeId: string, agentNodeId: string, role: 'tool-source' | 'agent-registration' = 'tool-source'): void {
    this._workspaceEdges.push({ id: `we_${++this._edgeCounter}`, from: workspaceNodeId, to: agentNodeId, edgeRole: role });
  }

  _snapshot(): GraphSnapshot {
    return {
      nodes: { ...this._nodes },
      edges: [...this._edges],
      toolEdges: [...this._toolEdges],
      workspaceEdges: [...this._workspaceEdges],
    };
  }
}

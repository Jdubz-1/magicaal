import 'reflect-metadata';
import type { AgentGraphDefinition, AgentConfig } from '@magicaal/core';
import { ALL_NODES } from '@magicaal/nodes';
import { AgentGraph } from './graph.js';
import { AGENT_META_KEY, type AgentMeta } from './decorators.js';

export class CompileError extends Error {
  constructor(
    message: string,
    public readonly details?: string[],
  ) {
    super(message);
    this.name = 'CompileError';
  }
}

type AgentGraphClass = new () => AgentGraph;

const KNOWN_NODE_TYPES = new Set(ALL_NODES.map((n) => n.type));

function buildDefaultConfig(partial: Partial<AgentConfig>): AgentConfig {
  return {
    trigger: partial.trigger ?? { type: 'rest', mode: 'async' },
    concurrency: partial.concurrency ?? { maxParallel: 5, queueTimeout: 30000 },
    retry: partial.retry ?? { maxAttempts: 1, backoff: 'fixed', delayMs: 0 },
    ...(partial.timeout !== undefined && { timeout: partial.timeout }),
    ...(partial.invocationAuth && { invocationAuth: partial.invocationAuth }),
    ...(partial.rateLimit && { rateLimit: partial.rateLimit }),
    ...(partial.session && { session: partial.session }),
    ...(partial.defaultRouter && { defaultRouter: partial.defaultRouter }),
  };
}

export function compile(AgentClass: AgentGraphClass): AgentGraphDefinition {
  const meta: AgentMeta | undefined = Reflect.getMetadata(AGENT_META_KEY, AgentClass);

  if (!meta) {
    throw new CompileError(
      `Class ${AgentClass.name} is missing the @Agent decorator`,
    );
  }

  const instance = new AgentClass();
  instance.build();
  const { nodes, edges, toolEdges, workspaceEdges } = instance._snapshot();

  // Validate
  const errors: string[] = [];

  if (Object.keys(nodes).length === 0) {
    errors.push('Graph has no nodes');
  }

  // Every node type must be known
  for (const node of Object.values(nodes)) {
    if (!KNOWN_NODE_TYPES.has(node.type)) {
      errors.push(`Unknown node type "${node.type}" on node "${node.id}"`);
    }
  }

  // Find the entry node (core:start)
  const startNodes = Object.values(nodes).filter((n) => n.type === 'core:start');
  if (startNodes.length === 0) {
    errors.push('Graph must have exactly one core:start node');
  }
  if (startNodes.length > 1) {
    errors.push('Graph must have exactly one core:start node, found multiple');
  }

  // Every non-start node must have ≥1 inbound edge
  const inboundTargets = new Set(edges.map((e) => e.to));
  for (const node of Object.values(nodes)) {
    if (node.type !== 'core:start' && !inboundTargets.has(node.id)) {
      errors.push(`Node "${node.id}" (${node.type}) has no inbound edges — it can never be reached`);
    }
  }

  // Edge references must point to existing nodes
  for (const edge of edges) {
    if (!nodes[edge.from]) errors.push(`Edge "${edge.id}" references unknown source node "${edge.from}"`);
    if (!nodes[edge.to]) errors.push(`Edge "${edge.id}" references unknown target node "${edge.to}"`);
  }

  // Tool edge targets must point to existing nodes
  for (const te of toolEdges) {
    if (!nodes[te.to]) {
      errors.push(`toolEdge target node "${te.to}" does not exist (from tool "${te.from}")`);
    }
  }

  // Graph must have at least one core:end node
  if (!Object.values(nodes).some((n) => n.type === 'core:end')) {
    errors.push('Graph must contain at least one core:end node');
  }

  if (errors.length > 0) {
    throw new CompileError(`Compilation failed for agent "${meta.handle}"`, errors);
  }

  const entry = startNodes[0]!.id;

  return {
    version: '1.0',
    handle: meta.handle,
    name: meta.name,
    ...(meta.description && { description: meta.description }),
    entry,
    nodes,
    edges,
    toolEdges,
    workspaceEdges,
    config: buildDefaultConfig(meta.config),
  };
}

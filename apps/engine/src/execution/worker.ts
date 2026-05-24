import type { AgentGraphDefinition, EdgeDefinition } from '@magicaal/core';
import { evaluate } from '@magicaal/nodes';
import { registry } from '../registry/node-registry';
import { lifecycle } from './lifecycle';
import type { ExecutionContextImpl } from './context';
import { logger } from '../lib/logger';

export async function resolveEdges(
  edges: EdgeDefinition[],
  fromId: string,
  data: Record<string, unknown>,
): Promise<string[]> {
  const fromEdges = edges.filter((e) => e.from === fromId);

  const unconditional = fromEdges.filter((e) => e.type === 'unconditional');
  if (unconditional.length > 0) {
    return unconditional.map((e) => e.to);
  }

  const conditional = fromEdges.filter((e) => e.type === 'conditional');
  const matched: string[] = [];
  for (const edge of conditional) {
    if (edge.condition) {
      try {
        const result = await evaluate(edge.condition, data);
        if (result === true || result === 1) {
          matched.push(edge.to);
        }
      } catch {
        // condition evaluation failure means edge is not taken
      }
    }
  }
  if (matched.length > 0) return matched;

  const fallback = fromEdges.filter((e) => e.type === 'fallback');
  return fallback.map((e) => e.to);
}

export async function executeGraph(
  runId: string,
  graph: AgentGraphDefinition,
  ctx: ExecutionContextImpl,
): Promise<void> {
  const queue: string[] = [graph.entry];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    if (visited.has(nodeId)) continue;
    visited.add(nodeId);

    const nodeDef = graph.nodes[nodeId];
    if (!nodeDef) {
      logger.warn({ runId, nodeId }, 'Node not found in graph definition, skipping');
      continue;
    }

    const module = registry.get(nodeDef.type);
    const stepId = await lifecycle.writeStepStart(runId, nodeId, nodeDef.type, ctx);

    let output;
    try {
      output = await module.execute(ctx, nodeDef.config);
    } catch (err) {
      const error = {
        code: 'NODE_EXECUTION_ERROR',
        message: err instanceof Error ? err.message : String(err),
        retryable: false,
      };
      await lifecycle.writeStepFailed(stepId, error);
      throw err;
    }

    await lifecycle.writeStepEnd(stepId, output);

    if (output.status === 'failed') {
      throw Object.assign(new Error(output.error?.message ?? 'Node execution failed'), {
        code: output.error?.code ?? 'NODE_FAILED',
      });
    }

    if (output.status === 'suspended' || ctx.isSuspended) {
      return;
    }

    if (output.outputs._terminated === true) {
      return;
    }

    const nextNodes = await resolveEdges(graph.edges, nodeId, ctx.data);
    queue.push(...nextNodes);
  }
}

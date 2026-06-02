import type { AgentGraphDefinition, EdgeDefinition, NodeDefinition } from '@magicaal/core';
import { evaluate } from '@magicaal/nodes';
import { registry } from '../registry/node-registry';
import { lifecycle } from './lifecycle';
import { ExecutionContextImpl } from './context';
import type { RunParams } from './context';
import { logger } from '../lib/logger';

const DEFAULT_MAX_LOOP_ITERATIONS = 50;

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

function findJoinNode(graph: AgentGraphDefinition): string | null {
  for (const [nodeId, nodeDef] of Object.entries(graph.nodes)) {
    if (nodeDef.type === 'core:join') {
      const inbound = graph.edges.filter((e) => e.to === nodeId);
      if (inbound.length >= 2) return nodeId;
    }
  }
  return null;
}

async function executeNodeOnce(
  runId: string,
  nodeDef: NodeDefinition,
  ctx: ExecutionContextImpl,
): Promise<ReturnType<Awaited<ReturnType<typeof registry.get>>['execute']>> {
  const module = registry.get(nodeDef.type);
  const stepId = await lifecycle.writeStepStart(runId, nodeDef.id, nodeDef.type, ctx);
  const ts = new Date().toISOString();

  ctx.emit('node.started', { runId, nodeId: nodeDef.id, nodeType: nodeDef.type, timestamp: ts });

  const tokensBefore = { ...ctx.tokenUsage };
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
    ctx.emit('node.failed', {
      runId,
      nodeId: nodeDef.id,
      nodeType: nodeDef.type,
      error: { code: error.code, message: error.message },
      timestamp: new Date().toISOString(),
    });
    throw err;
  }

  const tokensAfter = ctx.tokenUsage;
  const tokenDelta = {
    promptTokens: tokensAfter.promptTokens - tokensBefore.promptTokens,
    completionTokens: tokensAfter.completionTokens - tokensBefore.completionTokens,
    estimatedCostUsd: tokensAfter.estimatedCostUsd - tokensBefore.estimatedCostUsd,
  };
  await lifecycle.writeStepEnd(stepId, output, tokenDelta);

  if (output.status === 'failed') {
    ctx.emit('node.failed', {
      runId,
      nodeId: nodeDef.id,
      nodeType: nodeDef.type,
      error: {
        code: output.error?.code ?? 'NODE_FAILED',
        message: output.error?.message ?? 'Node execution failed',
      },
      timestamp: new Date().toISOString(),
    });
    throw Object.assign(new Error(output.error?.message ?? 'Node execution failed'), {
      code: output.error?.code ?? 'NODE_FAILED',
    });
  }

  if (output.status === 'complete') {
    ctx.emit('node.completed', {
      runId,
      nodeId: nodeDef.id,
      nodeType: nodeDef.type,
      outputs: output.outputs,
      timestamp: new Date().toISOString(),
    });
  }

  return output;
}

export async function executeGraph(
  runId: string,
  graph: AgentGraphDefinition,
  ctx: ExecutionContextImpl,
): Promise<void> {
  const queue: string[] = [graph.entry];
  const visited = new Set<string>();
  const loopIterations = new Map<string, number>(); // nodeId → iteration count

  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    if (visited.has(nodeId)) continue;
    visited.add(nodeId);

    const nodeDef = graph.nodes[nodeId];
    if (!nodeDef) {
      logger.warn({ runId, nodeId }, 'Node not found in graph definition, skipping');
      continue;
    }

    // ── Fork/Join parallel execution ──────────────────────────────────────
    if (nodeDef.type === 'core:fork') {
      const output = await executeNodeOnce(runId, nodeDef, ctx);
      if (output.status === 'suspended' || ctx.isSuspended) return;
      if (output.outputs._terminated === true) return;

      const branchHeads = await resolveEdges(graph.edges, nodeId, ctx.data);
      if (branchHeads.length <= 1) {
        // Degenerate fork — treat as normal node
        queue.push(...branchHeads.filter((n) => !visited.has(n)));
        continue;
      }

      const joinNodeId = findJoinNode(graph);
      if (!joinNodeId) {
        // No join node — fall back to regular BFS
        logger.warn({ runId }, 'core:fork without a core:join — executing branches sequentially');
        queue.push(...branchHeads.filter((n) => !visited.has(n)));
        continue;
      }

      const joinDef = graph.nodes[joinNodeId];
      const mergeStrategy = (joinDef?.config as { mergeStrategy?: string })?.mergeStrategy ?? 'last-wins';
      const collectKey = (joinDef?.config as { collectKey?: string })?.collectKey ?? '_branch_results';

      const branchDataSnapshots = await Promise.all(
        branchHeads.map(async (branchHead) => {
          const branchCtx = new ExecutionContextImpl({
            runId: ctx.runId,
            agentId: ctx.agentId,
            tenantId: ctx.tenantId,
            triggerType: ctx.triggerType,
            input: JSON.parse(JSON.stringify(ctx.data)) as Record<string, unknown>,
          } as RunParams);

          const branchQueue: string[] = [branchHead];
          const branchVisited = new Set<string>();
          branchVisited.add(nodeId); // don't re-enter fork

          while (branchQueue.length > 0) {
            const bid = branchQueue.shift()!;
            if (branchVisited.has(bid) || bid === joinNodeId) break;
            branchVisited.add(bid);

            const bDef = graph.nodes[bid];
            if (!bDef) continue;

            const bOutput = await executeNodeOnce(runId, bDef, branchCtx);
            if (bOutput.status === 'suspended' || branchCtx.isSuspended) break;
            if (bOutput.outputs._terminated === true) break;

            const bNext = await resolveEdges(graph.edges, bid, branchCtx.data);
            branchQueue.push(...bNext.filter((n) => !branchVisited.has(n) && n !== joinNodeId));
          }

          return branchCtx.data;
        }),
      );

      // Merge branch outputs into main context
      if (mergeStrategy === 'collect') {
        ctx.set(collectKey, branchDataSnapshots);
      } else {
        // 'merge' and 'last-wins' both apply sequentially; 'merge' is semantically the same here
        for (const branchData of branchDataSnapshots) {
          Object.assign(ctx.data, branchData);
        }
      }
      ctx.set('_fork_branch_count', branchDataSnapshots.length);

      // Execute the join node and continue from its successors
      if (!visited.has(joinNodeId)) {
        visited.add(joinNodeId);
        const joinOutput = await executeNodeOnce(runId, joinDef, ctx);
        if (joinOutput.status === 'suspended' || ctx.isSuspended) return;
        if (joinOutput.outputs._terminated === true) return;

        const afterJoin = await resolveEdges(graph.edges, joinNodeId, ctx.data);
        queue.push(...afterJoin.filter((n) => !visited.has(n)));
      }
      continue;
    }

    // ── Normal node execution ──────────────────────────────────────────────
    const output = await executeNodeOnce(runId, nodeDef, ctx);

    if (output.status === 'suspended' || ctx.isSuspended) {
      return;
    }

    if (output.outputs._terminated === true) {
      return;
    }

    const nextNodes = await resolveEdges(graph.edges, nodeId, ctx.data);

    // ── Loop cycle detection ───────────────────────────────────────────────
    for (const next of nextNodes) {
      if (visited.has(next)) {
        // Cycle edge — only allow if this is a core:loop node and condition says continue
        if (
          nodeDef.type === 'core:loop' &&
          ctx.get<boolean>('_loop_continue') === true
        ) {
          const maxIter =
            (nodeDef.config as { maxIterations?: number }).maxIterations ??
            DEFAULT_MAX_LOOP_ITERATIONS;
          const count = (loopIterations.get(next) ?? 0) + 1;
          if (count > maxIter) {
            throw Object.assign(
              new Error(`Loop exceeded maxIterations (${maxIter}) at node "${next}"`),
              { code: 'MAX_LOOP_ITERATIONS', retryable: false },
            );
          }
          loopIterations.set(next, count);
          visited.delete(next); // allow re-traversal
          queue.push(next);
        }
        // else: non-loop cycle edge — skip (standard BFS visited behaviour)
      } else {
        queue.push(next);
      }
    }
  }
}

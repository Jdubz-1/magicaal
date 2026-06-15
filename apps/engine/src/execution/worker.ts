import type { AgentGraphDefinition, NodeDefinition } from '@magicaal/core';
import { registry } from '../registry/node-registry';
import { lifecycle } from './lifecycle';
import { ExecutionContextImpl } from './context';
import type { RunParams } from './context';
import { logger } from '../lib/logger';
import { runAgentLoop, registerExecuteNodeOnce } from './tool-executor';
import type { NodeOutput } from '@magicaal/sdk-node';
import { resolveEdges } from './graph-utils';

export { resolveEdges };

const DEFAULT_MAX_LOOP_ITERATIONS = 50;

// Circular-import break: give tool-executor a reference to executeNodeOnce
// after this module is fully loaded.
let _registered = false;

function findJoinNode(graph: AgentGraphDefinition): string | null {
  for (const [nodeId, nodeDef] of Object.entries(graph.nodes)) {
    if (nodeDef.type === 'core:join') {
      const inbound = graph.edges.filter((e) => e.to === nodeId);
      if (inbound.length >= 2) return nodeId;
    }
  }
  return null;
}

function findReduceNode(graph: AgentGraphDefinition, branchHeads: string[]): string | null {
  // BFS from each branch head to find the first core:reduce node
  const visited = new Set<string>(branchHeads);
  const queue = [...branchHeads];
  while (queue.length > 0) {
    const id = queue.shift()!;
    const nodeDef = graph.nodes[id];
    if (nodeDef?.type === 'core:reduce') return id;
    const outbound = graph.edges.filter((e) => e.from === id).map((e) => e.to);
    for (const next of outbound) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
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

  ctx.emit('node.started', { runId, nodeId: nodeDef.id, nodeType: nodeDef.type, stepId, timestamp: ts });

  const tokensBefore = { ...ctx.tokenUsage };
  // Inject current node ID so nodes can identify themselves (e.g. core:mcp-client direct mode)
  (ctx as unknown as Record<string, unknown>)._currentNodeId = nodeDef.id;
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
  } finally {
    delete (ctx as unknown as Record<string, unknown>)._currentNodeId;
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
      stepId,
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
  // Register once after module is loaded to avoid circular import issues
  if (!_registered) {
    registerExecuteNodeOnce(
      executeNodeOnce as unknown as (runId: string, node: NodeDefinition, ctx: ExecutionContextImpl) => Promise<NodeOutput>,
    );
    _registered = true;
  }
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

    // ── Agentic loop nodes (tool-call / react) ────────────────────────────
    if (nodeDef.type === 'core:tool-call' || nodeDef.type === 'core:react') {
      const mode = nodeDef.type === 'core:react' ? 'react' : 'tool-call';
      const stepId = await lifecycle.writeStepStart(runId, nodeDef.id, nodeDef.type, ctx);
      const ts = new Date().toISOString();
      ctx.emit('node.started', { runId, nodeId: nodeDef.id, nodeType: nodeDef.type, stepId, timestamp: ts });

      const tokensBefore = { ...ctx.tokenUsage };
      let output;
      try {
        output = await runAgentLoop(nodeDef, graph, ctx, mode);
      } catch (err) {
        const error = {
          code: 'AGENT_LOOP_ERROR',
          message: err instanceof Error ? err.message : String(err),
          retryable: false,
        };
        await lifecycle.writeStepFailed(stepId, error);
        ctx.emit('node.failed', { runId, nodeId: nodeDef.id, nodeType: nodeDef.type, error, timestamp: new Date().toISOString() });
        throw err;
      }

      // Flush trajectory steps to telemetry
      const trajectories = ctx.trajectorySteps;
      if (trajectories.length > 0) {
        await lifecycle.writeTrajectorySteps(stepId, runId, trajectories);
        ctx.clearTrajectorySteps();
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
          error: output.error,
          timestamp: new Date().toISOString(),
        });
        throw Object.assign(new Error(output.error?.message ?? 'Agent loop failed'), {
          code: output.error?.code ?? 'AGENT_LOOP_FAILED',
        });
      }

      ctx.emit('node.completed', { runId, nodeId: nodeDef.id, nodeType: nodeDef.type, stepId, outputs: output.outputs, timestamp: new Date().toISOString() });
      if (output.outputs) Object.assign(ctx.data, output.outputs);

      const nextNodes = await resolveEdges(graph.edges, nodeId, ctx.data);
      queue.push(...nextNodes.filter((n) => !visited.has(n)));
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

    // ── Fan-Out/Reduce dynamic parallel execution ─────────────────────────
    if (nodeDef.type === 'core:fan-out') {
      const fanOutOutput = await executeNodeOnce(runId, nodeDef, ctx);
      if (fanOutOutput.status === 'suspended' || ctx.isSuspended) return;
      if (fanOutOutput.outputs._terminated === true) return;

      const arrayKey = (nodeDef.config as { arrayKey?: string }).arrayKey ?? 'items';
      const items = ctx.get<unknown[]>(arrayKey) ?? [];

      const branchHeads = await resolveEdges(graph.edges, nodeId, ctx.data);
      const reduceNodeId = findReduceNode(graph, branchHeads);

      const branchResults = await Promise.all(
        items.map(async (item, index) => {
          const branchCtx = new ExecutionContextImpl({
            runId: ctx.runId,
            agentId: ctx.agentId,
            tenantId: ctx.tenantId,
            triggerType: ctx.triggerType,
            input: {
              ...JSON.parse(JSON.stringify(ctx.data)) as Record<string, unknown>,
              _fanout_item: item,
              _fanout_index: index,
            },
            graphDefaultRouter: ctx.graphDefaultRouter,
            tenantRouterPolicy: ctx.tenantRouterPolicy,
          } as RunParams);
          Object.assign(
            (branchCtx as unknown as { credentials: Record<string, unknown> }).credentials,
            ctx.credentials,
          );

          const bQueue = [...branchHeads];
          const bVisited = new Set<string>([nodeId]);

          while (bQueue.length > 0) {
            const bid = bQueue.shift()!;
            if (bVisited.has(bid) || bid === reduceNodeId) continue;
            bVisited.add(bid);
            const bDef = graph.nodes[bid];
            if (!bDef) continue;
            const bOut = await executeNodeOnce(runId, bDef, branchCtx);
            if (bOut.status === 'suspended' || branchCtx.isSuspended) break;
            if (bOut.outputs._terminated === true) break;
            const bNext = await resolveEdges(graph.edges, bid, branchCtx.data);
            bQueue.push(...bNext.filter((n) => !bVisited.has(n) && n !== reduceNodeId));
          }

          return branchCtx.data;
        }),
      );

      // Store results for core:reduce to consume
      ctx.set('_fanout_results', branchResults);
      ctx.set('_fanout_count', items.length);

      // Execute reduce node and continue from its successors
      if (reduceNodeId && !visited.has(reduceNodeId)) {
        visited.add(reduceNodeId);
        const reduceDef = graph.nodes[reduceNodeId];
        if (reduceDef) {
          const reduceOutput = await executeNodeOnce(runId, reduceDef, ctx);
          if (reduceOutput.status === 'suspended' || ctx.isSuspended) return;
          if (reduceOutput.outputs._terminated === true) return;
          const afterReduce = await resolveEdges(graph.edges, reduceNodeId, ctx.data);
          queue.push(...afterReduce.filter((n) => !visited.has(n)));
        }
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

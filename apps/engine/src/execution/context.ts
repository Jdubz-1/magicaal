import type { ExecutionContext, TrajectoryStep, ResolvedCredentials } from '@magicaal/sdk-node';
import type { TokenUsage, CanonicalLLMRequest, CanonicalLLMResponse, ModelRouterConfig } from '@magicaal/core';
import { evaluate } from '@magicaal/nodes';
import { logger } from '../lib/logger';
import { sseManager } from '../sse/sse-manager';
import { routedLLMCall, resolveRouterConfig } from '../router/router-engine';
import { config } from '../config';
import { mcpRegistry } from '../mcp/mcp-registry';

export interface RunParams {
  runId: string;
  agentId: string;
  tenantId: string;
  triggerType: string;
  input: Record<string, unknown>;
  graphDefaultRouter?: ModelRouterConfig | null;
  tenantRouterPolicy?: ModelRouterConfig | null;
  sessionId?: string;
}

export interface CollectedMetric {
  name: string;
  value: number;
}

export class ExecutionContextImpl implements ExecutionContext {
  readonly runId: string;
  readonly agentId: string;
  readonly tenantId: string;
  readonly triggerType: string;
  readonly sessionId?: string;
  data: Record<string, unknown>;

  readonly credentials: Record<string, ResolvedCredentials> = {};

  readonly graphDefaultRouter?: ModelRouterConfig | null;
  readonly tenantRouterPolicy?: ModelRouterConfig | null;

  private _tokenUsage: TokenUsage = {
    promptTokens: 0,
    completionTokens: 0,
    estimatedCostUsd: 0,
  };
  private _trajectorySteps: TrajectoryStep[] = [];
  private _metrics: CollectedMetric[] = [];
  private _suspended = false;
  private _suspendReviewId: string | undefined;
  private _suspendedNodeId: string | undefined;

  constructor(params: RunParams) {
    this.runId = params.runId;
    this.agentId = params.agentId;
    this.tenantId = params.tenantId;
    this.triggerType = params.triggerType;
    this.sessionId = params.sessionId;
    this.data = { ...params.input };
    this.graphDefaultRouter = params.graphDefaultRouter;
    this.tenantRouterPolicy = params.tenantRouterPolicy;
  }

  get<T = unknown>(key: string): T | undefined {
    return this.data[key] as T | undefined;
  }

  set(key: string, value: unknown): void {
    this.data[key] = value;
  }

  async evaluate(expression: string): Promise<unknown> {
    return evaluate(expression, this.data);
  }

  async resolvePrompt(_name: string, _version?: number): Promise<string> {
    throw Object.assign(new Error('resolvePrompt not implemented in Phase 1'), {
      status: 501,
      code: 'NOT_IMPLEMENTED',
    });
  }

  log(
    level: 'debug' | 'info' | 'warn' | 'error',
    message: string,
    meta?: Record<string, unknown>,
  ): void {
    logger[level]({ runId: this.runId, ...meta }, message);
  }

  metric(name: string, value: number): void {
    this._metrics.push({ name, value });
  }

  recordTokenUsage(usage: TokenUsage): void {
    this._tokenUsage.promptTokens += usage.promptTokens;
    this._tokenUsage.completionTokens += usage.completionTokens;
    this._tokenUsage.estimatedCostUsd += usage.estimatedCostUsd;
  }

  recordTrajectoryStep(step: TrajectoryStep): void {
    this._trajectorySteps.push(step);
  }

  clearTrajectorySteps(): void {
    this._trajectorySteps = [];
  }

  // Engine-internal: allows core:mcp-client direct-mode node to call MCP tools
  async _callMcpTool(nodeId: string, toolName: string, args: Record<string, unknown>): Promise<unknown> {
    return mcpRegistry.callTool(nodeId, this.runId, toolName, args);
  }

  async dispatchSubRun(
    agentId: string,
    input: Record<string, unknown>,
    opts?: { await?: boolean },
  ): Promise<{ runId: string; output?: Record<string, unknown> }> {
    const engineUrl = config.engineInternalUrl;
    // The engine's /internal API is authenticated, and a sub-graph call is a
    // platform caller: it bypasses the target agent's invocation policy
    // (ARCHITECTURE §11.4), since the parent run was already authorized.
    const internalHeaders = {
      'Content-Type': 'application/json',
      'X-Internal-Auth': config.masterKey,
    };

    const postResp = await fetch(`${engineUrl}/internal/runs`, {
      method: 'POST',
      headers: internalHeaders,
      body: JSON.stringify({
        agentId,
        tenantId: this.tenantId,
        triggerType: 'sub-graph',
        input,
        parentRunId: this.runId,
        caller: { kind: 'platform', strategy: 'sub-graph' },
      }),
    });
    if (!postResp.ok) throw Object.assign(new Error(`Sub-run dispatch failed: ${postResp.status}`), { code: 'SUB_RUN_DISPATCH_FAILED', retryable: false });
    const { runId } = await postResp.json() as { runId: string };
    if (opts?.await === false) return { runId };
    // Poll for completion
    const start = Date.now();
    const timeout = 300_000;
    while (Date.now() - start < timeout) {
      await new Promise((r) => setTimeout(r, 1000));
      const getResp = await fetch(`${engineUrl}/internal/runs/${runId}`, {
        headers: { 'X-Internal-Auth': config.masterKey },
      });
      if (!getResp.ok) {
        throw Object.assign(new Error(`Sub-run status check failed: ${getResp.status}`), { code: 'SUB_RUN_STATUS_ERROR', retryable: false });
      }
      const run = await getResp.json() as { status: string; output?: Record<string, unknown> };
      if (run.status === 'completed') return { runId, output: run.output };
      if (run.status === 'failed' || run.status === 'cancelled') {
        throw Object.assign(new Error(`Sub-run ${runId} ended with status: ${run.status}`), { code: 'SUB_RUN_FAILED', retryable: false });
      }
    }
    throw Object.assign(new Error(`Sub-run ${runId} timed out`), { code: 'SUB_RUN_TIMEOUT', retryable: false });
  }

  suspend(reviewId: string, nodeId?: string): void {
    this._suspended = true;
    this._suspendReviewId = reviewId;
    this._suspendedNodeId = nodeId;
  }

  emit(event: string, payload: unknown): void {
    sseManager.broadcast(this.runId, event, payload);
  }

  async llmCall(
    request: CanonicalLLMRequest,
    nodeRouterConfig?: ModelRouterConfig | null,
  ): Promise<CanonicalLLMResponse> {
    const config = resolveRouterConfig(
      { router: nodeRouterConfig ?? undefined },
      this.graphDefaultRouter ?? undefined,
      this.tenantRouterPolicy ?? undefined,
    );
    if (!config) {
      throw Object.assign(
        new Error('No router config available for LLM call. Configure a router at node, graph, or tenant level.'),
        { code: 'ROUTER_NOT_CONFIGURED', retryable: false },
      );
    }
    const response = await routedLLMCall(request, config, this);
    this.recordTokenUsage(response.usage);
    return response;
  }

  get isSuspended(): boolean {
    return this._suspended;
  }

  get suspendReviewId(): string | undefined {
    return this._suspendReviewId;
  }

  get suspendedNodeId(): string | undefined {
    return this._suspendedNodeId;
  }

  get tokenUsage(): TokenUsage {
    return { ...this._tokenUsage };
  }

  get trajectorySteps(): TrajectoryStep[] {
    return [...this._trajectorySteps];
  }

  get metrics(): CollectedMetric[] {
    return [...this._metrics];
  }
}

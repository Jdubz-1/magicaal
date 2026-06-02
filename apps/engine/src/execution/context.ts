import type { ExecutionContext, TrajectoryStep, ResolvedCredentials } from '@magicaal/sdk-node';
import type { TokenUsage, CanonicalLLMRequest, CanonicalLLMResponse, ModelRouterConfig } from '@magicaal/core';
import { evaluate } from '@magicaal/nodes';
import { logger } from '../lib/logger';
import { sseManager } from '../sse/sse-manager';
import { routedLLMCall, resolveRouterConfig } from '../router/router-engine';

export interface RunParams {
  runId: string;
  agentId: string;
  tenantId: string;
  triggerType: string;
  input: Record<string, unknown>;
  graphDefaultRouter?: ModelRouterConfig | null;
  tenantRouterPolicy?: ModelRouterConfig | null;
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

import type { ExecutionContext, TrajectoryStep, ResolvedCredentials } from '@magicaal/sdk-node';
import type { TokenUsage } from '@magicaal/core';
import { evaluate } from '@magicaal/nodes';
import { logger } from '../lib/logger';

export interface RunParams {
  runId: string;
  agentId: string;
  tenantId: string;
  triggerType: string;
  input: Record<string, unknown>;
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

  private _tokenUsage: TokenUsage = {
    promptTokens: 0,
    completionTokens: 0,
    estimatedCostUsd: 0,
  };
  private _trajectorySteps: TrajectoryStep[] = [];
  private _metrics: CollectedMetric[] = [];
  private _suspended = false;
  private _suspendReviewId: string | undefined;

  constructor(params: RunParams) {
    this.runId = params.runId;
    this.agentId = params.agentId;
    this.tenantId = params.tenantId;
    this.triggerType = params.triggerType;
    this.data = { ...params.input };
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

  suspend(reviewId: string): void {
    this._suspended = true;
    this._suspendReviewId = reviewId;
  }

  emit(event: string, payload: unknown): void {
    logger.info({ runId: this.runId, event, payload }, 'Run event emitted');
  }

  get isSuspended(): boolean {
    return this._suspended;
  }

  get suspendReviewId(): string | undefined {
    return this._suspendReviewId;
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

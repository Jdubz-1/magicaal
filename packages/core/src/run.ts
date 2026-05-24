import type { TriggerConfig } from './agent';

export type RunStatus = 'pending' | 'running' | 'completed' | 'suspended' | 'failed' | 'cancelled';
export type StepStatus = 'pending' | 'running' | 'complete' | 'suspended' | 'failed';

export interface Run {
  id: string;
  agentId: string;
  tenantId: string;
  versionId: string;
  triggerType: TriggerConfig['type'] | 'manual';
  status: RunStatus;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  suspendedAtNodeId?: string;
  startedAt?: number;
  completedAt?: number;
  createdAt: number;
}

export interface Step {
  id: string;
  runId: string;
  nodeId: string;
  nodeType: string;
  status: StepStatus;
  inputs?: Record<string, unknown>;
  outputs?: Record<string, unknown>;
  tokenUsage?: TokenUsage;
  error?: StepError;
  startedAt: number;
  completedAt?: number;
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  estimatedCostUsd: number;
}

export interface StepError {
  code: string;
  message: string;
  retryable: boolean;
}

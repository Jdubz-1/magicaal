import type { ExecutionContext } from './context';

export interface NodeOutput {
  status: 'complete' | 'suspended' | 'failed';
  outputs: Record<string, unknown>;
  error?: { code: string; message: string; retryable: boolean };
  /** Populated by LLM-calling nodes; written to telemetry step record. */
  routingMeta?: {
    targetUsed: { id: string; provider: string; model: string; connectionId: string };
    attemptCount: number;
    triggerHistory: unknown[];
  };
}

export interface NodeModule<TConfig = Record<string, unknown>> {
  readonly type: string;
  readonly meta: {
    name: string;
    description: string;
    category:
      | 'control-flow'
      | 'ai-llm'
      | 'data'
      | 'integration'
      | 'code'
      | 'composition'
      | 'observability'
      | 'guardrails';
    icon?: string;
    canTrigger?: boolean;
    version: string;
  };
  readonly schema: {
    config: object;
    input: object;
    output: object;
  };
  execute(ctx: ExecutionContext, config: TConfig): Promise<NodeOutput>;
  prepare?(ctx: ExecutionContext, config: TConfig): Promise<void>;
}

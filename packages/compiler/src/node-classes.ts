/**
 * Typed node builder helpers. Each class provides IDE autocomplete for config.
 * Generated from ALL_NODES registry; regenerate with: pnpm --filter @magicaal/compiler run codegen
 */

export class StartNode {
  readonly type = 'core:start';
  constructor(public config: { inputSchema?: object } = {}) {}
}

export class EndNode {
  readonly type = 'core:end';
  constructor(public config: { outputKey?: string } = {}) {}
}

export class StopNode {
  readonly type = 'core:stop';
  constructor(public config: { reason?: string } = {}) {}
}

export class ConditionNode {
  readonly type = 'core:condition';
  constructor(public config: { expression: string }) {}
}

export class RouterNode {
  readonly type = 'core:router';
  constructor(public config: { expression: string; routes: Record<string, string> }) {}
}

export class TransformNode {
  readonly type = 'core:transform';
  constructor(public config: { expression: string; outputKey: string }) {}
}

export class FilterNode {
  readonly type = 'core:filter';
  constructor(public config: { expression: string; inputKey: string; outputKey: string }) {}
}

export class LogNode {
  readonly type = 'core:log';
  constructor(public config: { message: string; level?: 'debug' | 'info' | 'warn' | 'error' }) {}
}

export class LlmCallNode {
  readonly type = 'core:llm-call';
  constructor(
    public config: {
      outputKey: string;
      systemPrompt?: string;
      userMessage?: string;
      messagesKey?: string;
      injectSessionHistory?: string;
      maxTokens?: number;
      temperature?: number;
      outputSchema?: object;
      retryOnMalformed?: number;
      router?: object;
    },
  ) {}
}

export class ToolCallNode {
  readonly type = 'core:tool-call';
  constructor(
    public config: {
      systemPrompt?: string;
      userMessage?: string;
      outputKey: string;
      injectSessionHistory?: string;
      maxIterations?: number;
      router?: object;
    },
  ) {}
}

export class ReactNode {
  readonly type = 'core:react';
  constructor(
    public config: {
      systemPrompt?: string;
      outputKey: string;
      injectSessionHistory?: string;
      maxIterations?: number;
      router?: object;
    },
  ) {}
}

export class ToolNode {
  readonly type = 'core:tool';
  constructor(
    public config: {
      name: string;
      description: string;
      inputSchema: object;
      inputMapping: Record<string, string>;
      outputMapping: string;
    },
  ) {}
}

export class GuardrailNode {
  readonly type = 'core:guardrail';
  constructor(
    public config: {
      policy: string;
      inputKey: string;
      outputKey: string;
      rejectAction?: 'stop' | 'fallback';
    },
  ) {}
}

export class HumanReviewNode {
  readonly type = 'core:human-review';
  constructor(public config: { reviewQueue: string; prompt?: string; timeoutMs?: number }) {}
}

export class HttpRequestNode {
  readonly type = 'core:http-request';
  constructor(
    public config: {
      method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
      url: string;
      outputKey: string;
      headersKey?: string;
      bodyKey?: string;
    },
  ) {}
}

export class WaitNode {
  readonly type = 'core:wait';
  constructor(public config: { durationMs: number }) {}
}

export class LoopNode {
  readonly type = 'core:loop';
  constructor(public config: { itemsKey: string; maxIterations?: number }) {}
}

export class SessionReadNode {
  readonly type = 'core:session-read';
  constructor(public config: { reads: Record<string, string> }) {}
}

export class SessionWriteNode {
  readonly type = 'core:session-write';
  constructor(public config: { writes: Record<string, unknown> }) {}
}

export class SessionClearNode {
  readonly type = 'core:session-clear';
  constructor(public config: { keys?: string[] } = {}) {}
}

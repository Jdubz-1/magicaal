import type { ExecutionContext, ResolvedCredentials } from '@magicaal/sdk-node';

export interface MockContext extends ExecutionContext {
  _data: Record<string, unknown>;
}

export function makeMockContext(
  initial: Record<string, unknown> = {},
  credentials: Record<string, ResolvedCredentials> = {},
): MockContext {
  const _data: Record<string, unknown> = { ...initial };

  const ctx: MockContext = {
    runId: 'test-run',
    agentId: 'test-agent',
    tenantId: 'test-tenant',
    triggerType: 'api',
    credentials,

    get _data() {
      return _data;
    },

    get data() {
      return _data;
    },
    set data(v: Record<string, unknown>) {
      Object.assign(_data, v);
    },

    get<T = unknown>(key: string): T | undefined {
      return _data[key] as T | undefined;
    },
    set(key: string, value: unknown): void {
      _data[key] = value;
    },
    evaluate: jest.fn().mockImplementation(async (expr: string) => {
      // basic passthrough — tests that need real evaluation override this mock
      return expr;
    }),
    resolvePrompt: jest.fn().mockRejectedValue(new Error('not implemented')),
    log: jest.fn(),
    metric: jest.fn(),
    recordTokenUsage: jest.fn(),
    recordTrajectoryStep: jest.fn(),
    suspend: jest.fn(),
    emit: jest.fn(),
    llmCall: jest.fn().mockRejectedValue(new Error('llmCall not mocked in this test')),
  };

  return ctx;
}

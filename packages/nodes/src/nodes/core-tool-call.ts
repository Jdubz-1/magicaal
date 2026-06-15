import type { NodeModule } from '@magicaal/sdk-node';
import type { ModelRouterConfig } from '@magicaal/core';

interface ToolCallConfig {
  inputKey: string;
  outputKey: string;
  systemPrompt?: string;
  maxIterations?: number;
  router?: ModelRouterConfig;
}

export const coreToolCall: NodeModule<ToolCallConfig> = {
  type: 'core:tool-call',
  meta: {
    name: 'Tool Call',
    description: 'LLM-driven tool invocation loop using native function calling. Executes tools in parallel per iteration.',
    category: 'ai-llm',
    icon: 'cpu',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['inputKey', 'outputKey'],
      properties: {
        inputKey:      { type: 'string', description: 'Context key containing the user message or task' },
        outputKey:     { type: 'string', description: 'Context key to write the final answer' },
        systemPrompt:  { type: 'string', description: 'Optional system prompt for the agent' },
        maxIterations: { type: 'number', description: 'Maximum tool-call iterations (default 10)' },
        router:        { type: 'object', description: 'ModelRouterConfig — inline or named policy reference' },
      },
    },
    input:  { type: 'object', properties: {} },
    output: { type: 'object', properties: {} },
  },
  // Execution is handled by the Tool Executor in the engine (worker.ts special case).
  // This execute() is never called directly.
  async execute(ctx, config) {
    throw Object.assign(
      new Error('core:tool-call must be executed via the engine Tool Executor'),
      { code: 'INTERNAL_ERROR', retryable: false },
    );
  },
};

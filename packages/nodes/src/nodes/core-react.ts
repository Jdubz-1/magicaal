import type { NodeModule } from '@magicaal/sdk-node';
import type { ModelRouterConfig } from '@magicaal/core';

interface ReactConfig {
  inputKey: string;
  outputKey: string;
  systemPrompt?: string;
  maxIterations?: number;
  router?: ModelRouterConfig;
}

export const coreReact: NodeModule<ReactConfig> = {
  type: 'core:react',
  meta: {
    name: 'ReAct',
    description: 'Prompt-engineered Reason-Act loop. Executes tools serially with Thought/Action/Observation trajectory recording.',
    category: 'ai-llm',
    icon: 'brain',
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
        maxIterations: { type: 'number', description: 'Maximum reasoning iterations (default 10)' },
        router:        { type: 'object', description: 'ModelRouterConfig — inline or named policy reference' },
      },
    },
    input:  { type: 'object', properties: {} },
    output: { type: 'object', properties: {} },
  },
  // Execution is handled by the Tool Executor in the engine (worker.ts special case).
  async execute() {
    throw Object.assign(
      new Error('core:react must be executed via the engine Tool Executor'),
      { code: 'INTERNAL_ERROR', retryable: false },
    );
  },
};

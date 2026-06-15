import type { NodeModule } from '@magicaal/sdk-node';

interface ToolConfig {
  name: string;
  description: string;
  inputSchema: object;
  inputMapping: Record<string, string>;
  outputMapping: string;
}

export const coreTool: NodeModule<ToolConfig> = {
  type: 'core:tool',
  meta: {
    name: 'Tool',
    description: 'Declares an LLM-facing tool contract wrapping any downstream action node.',
    category: 'tool',
    icon: 'wrench',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['name', 'description', 'inputSchema', 'outputMapping'],
      properties: {
        name:          { type: 'string', description: 'LLM-facing tool name (unique within agent)' },
        description:   { type: 'string', description: 'Explains what the tool does and when to use it' },
        inputSchema:   { type: 'object', description: 'JSON Schema for tool parameters' },
        inputMapping:  { type: 'object', description: 'Maps LLM arg names to context keys' },
        outputMapping: { type: 'string', description: 'Context key containing the tool result' },
      },
    },
    input:  {},
    output: {},
  },
  // execute() is never called in normal graph flow — tool-executor reads config directly
  async execute() {
    return { status: 'complete', outputs: {} };
  },
};

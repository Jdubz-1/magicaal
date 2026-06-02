import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';

interface PromptBuilderConfig {
  template: string;
  outputKey: string;
}

function interpolate(template: string, data: Record<string, unknown>): string {
  return template.replace(/\{\{(\s*[\w.]+\s*)\}\}/g, (_, key: string) => {
    const trimmed = key.trim();
    const parts = trimmed.split('.');
    let val: unknown = data;
    for (const part of parts) {
      if (val == null || typeof val !== 'object') { val = undefined; break; }
      val = (val as Record<string, unknown>)[part];
    }
    return val != null ? String(val) : '';
  });
}

export const corePromptBuilder: NodeModule<PromptBuilderConfig> = {
  type: 'core:prompt-builder',
  meta: {
    name: 'Prompt Builder',
    description:
      'Assembles a prompt string from a template and context values. Use {{key}} or {{nested.key}} syntax to reference context values. The result is written to outputKey for use by a downstream LLM node.',
    category: 'ai-llm',
    icon: 'file-text',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['template', 'outputKey'],
      properties: {
        template: {
          type: 'string',
          description: 'Prompt template with {{key}} placeholders. Supports dot-notation for nested values.',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write the assembled prompt string to',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _prompt_built: { type: 'boolean' },
      },
    },
  },
  async execute(ctx: ExecutionContext, config: PromptBuilderConfig) {
    const assembled = interpolate(config.template, ctx.data);
    ctx.set(config.outputKey, assembled);
    ctx.set('_prompt_built', true);

    return {
      status: 'complete' as const,
      outputs: { [config.outputKey]: assembled, _prompt_built: true },
    };
  },
};

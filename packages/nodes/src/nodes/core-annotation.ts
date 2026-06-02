import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';
import { evaluate } from '../utils/jsonata';

interface AnnotationConfig {
  label: string;
  valueExpression?: string;
  outputKey?: string;
}

export const coreAnnotation: NodeModule<AnnotationConfig> = {
  type: 'core:annotation',
  meta: {
    name: 'Annotation',
    description: 'Writes a structured annotation to the step record. Visible in the Studio test run panel and telemetry.',
    category: 'observability',
    icon: 'tag',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['label'],
      properties: {
        label: {
          type: 'string',
          description: 'Human-readable annotation label',
        },
        valueExpression: {
          type: 'string',
          description: 'Optional JSONata expression to include a context value in the annotation',
        },
        outputKey: {
          type: 'string',
          description: 'Optional context key to write the annotation object to',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _annotation: { type: 'object' },
      },
    },
  },
  async execute(ctx: ExecutionContext, config: AnnotationConfig) {
    const annotation: Record<string, unknown> = {
      label: config.label,
      timestamp: new Date().toISOString(),
    };

    if (config.valueExpression) {
      annotation.value = await evaluate(config.valueExpression, ctx.data);
    }

    ctx.log('info', `[annotation] ${config.label}`, annotation);
    ctx.set('_annotation', annotation);

    if (config.outputKey) {
      ctx.set(config.outputKey, annotation);
    }

    return {
      status: 'complete' as const,
      outputs: { _annotation: annotation },
    };
  },
};

import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';

interface JsonSchemaLike {
  type?: string;
  required?: string[];
  properties?: Record<string, JsonSchemaLike>;
  items?: JsonSchemaLike;
  enum?: unknown[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

interface ValidateConfig {
  inputKey: string;
  schema: JsonSchemaLike;
}

interface ValidationIssue {
  path: string;
  message: string;
}

function validate(
  value: unknown,
  schema: JsonSchemaLike,
  path: string,
  issues: ValidationIssue[],
): void {
  if (schema.type) {
    const actualType = Array.isArray(value) ? 'array' : typeof value;
    if (actualType !== schema.type) {
      issues.push({ path, message: `Expected type ${schema.type}, got ${actualType}` });
      return;
    }
  }

  if (schema.enum !== undefined && !schema.enum.includes(value)) {
    issues.push({ path, message: `Value must be one of: ${schema.enum.join(', ')}` });
  }

  if (schema.type === 'string' && typeof value === 'string') {
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      issues.push({ path, message: `String length ${value.length} is less than minLength ${schema.minLength}` });
    }
    if (schema.maxLength !== undefined && value.length > schema.maxLength) {
      issues.push({ path, message: `String length ${value.length} exceeds maxLength ${schema.maxLength}` });
    }
    if (schema.pattern !== undefined && !new RegExp(schema.pattern).test(value)) {
      issues.push({ path, message: `String does not match pattern ${schema.pattern}` });
    }
  }

  if (schema.type === 'number' && typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) {
      issues.push({ path, message: `Value ${value} is less than minimum ${schema.minimum}` });
    }
    if (schema.maximum !== undefined && value > schema.maximum) {
      issues.push({ path, message: `Value ${value} exceeds maximum ${schema.maximum}` });
    }
  }

  if (schema.type === 'object' && typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const obj = value as Record<string, unknown>;
    for (const req of schema.required ?? []) {
      if (!(req in obj)) {
        issues.push({ path: `${path}.${req}`, message: `Required field "${req}" is missing` });
      }
    }
    if (schema.properties) {
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        if (key in obj) {
          validate(obj[key], propSchema, `${path}.${key}`, issues);
        }
      }
    }
  }

  if (schema.type === 'array' && Array.isArray(value) && schema.items) {
    value.forEach((item, i) => {
      validate(item, schema.items!, `${path}[${i}]`, issues);
    });
  }
}

export const coreValidate: NodeModule<ValidateConfig> = {
  type: 'core:validate',
  meta: {
    name: 'Validate',
    description:
      'Validates a context value against a JSON Schema. Outputs _valid (boolean) and _errors (array). Use conditional edges on _valid to branch on validation outcome.',
    category: 'data',
    icon: 'check-circle',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['inputKey', 'schema'],
      properties: {
        inputKey: {
          type: 'string',
          description: 'Context key whose value will be validated',
        },
        schema: {
          type: 'object',
          description: 'JSON Schema to validate against',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _valid: { type: 'boolean' },
        _errors: { type: 'array', items: { type: 'object' } },
      },
    },
  },
  async execute(ctx: ExecutionContext, config: ValidateConfig) {
    const value = ctx.get(config.inputKey);
    const issues: ValidationIssue[] = [];

    validate(value, config.schema, config.inputKey, issues);

    const valid = issues.length === 0;
    ctx.set('_valid', valid);
    ctx.set('_errors', issues);

    return {
      status: 'complete' as const,
      outputs: { _valid: valid, _errors: issues },
    };
  },
};

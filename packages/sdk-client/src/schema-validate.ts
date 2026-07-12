import type { ValidationIssue } from './errors.js';

interface JsonSchemaNode {
  type?: string;
  properties?: Record<string, JsonSchemaNode>;
  required?: string[];
  items?: JsonSchemaNode;
  enum?: unknown[];
}

function typeOf(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'number') return Number.isInteger(value) ? 'integer' : 'number';
  return typeof value;
}

function typeMatches(expected: string, actual: string): boolean {
  if (expected === actual) return true;
  return expected === 'number' && actual === 'integer';
}

/**
 * Dependency-free validation against the JSON Schema subset agent schemas
 * use (type / properties / required / items / enum). Not a full JSON Schema
 * implementation — server-side validation remains authoritative.
 */
export function validateAgainstSchema(
  value: unknown,
  schema: JsonSchemaNode,
  path = '$',
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (schema.type !== undefined) {
    const actual = typeOf(value);
    if (!typeMatches(schema.type, actual)) {
      issues.push({
        path,
        message: `expected ${schema.type}, got ${actual}`,
        code: 'type_mismatch',
      });
      return issues; // deeper checks are meaningless on the wrong type
    }
  }

  if (schema.enum !== undefined && !schema.enum.some((v) => v === value)) {
    issues.push({
      path,
      message: `value is not one of the allowed values: ${schema.enum.map((v) => JSON.stringify(v)).join(', ')}`,
      code: 'enum_mismatch',
    });
  }

  if (schema.type === 'object' && value !== null && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    for (const key of schema.required ?? []) {
      if (record[key] === undefined) {
        issues.push({ path: `${path}.${key}`, message: 'required field is missing', code: 'required' });
      }
    }
    for (const [key, propSchema] of Object.entries(schema.properties ?? {})) {
      if (record[key] !== undefined) {
        issues.push(...validateAgainstSchema(record[key], propSchema, `${path}.${key}`));
      }
    }
  }

  if (schema.type === 'array' && Array.isArray(value) && schema.items) {
    value.forEach((item, i) => {
      issues.push(...validateAgainstSchema(item, schema.items!, `${path}[${i}]`));
    });
  }

  return issues;
}

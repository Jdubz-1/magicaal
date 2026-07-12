import { validateAgainstSchema } from '../../src/schema-validate.js';

const SCHEMA = {
  type: 'object',
  required: ['query'],
  properties: {
    query: { type: 'string' },
    limit: { type: 'number' },
    mode: { type: 'string', enum: ['fast', 'thorough'] },
    tags: { type: 'array', items: { type: 'string' } },
    filters: {
      type: 'object',
      required: ['field'],
      properties: { field: { type: 'string' } },
    },
  },
};

describe('validateAgainstSchema', () => {
  it('returns no issues for valid input', () => {
    const issues = validateAgainstSchema(
      { query: 'hello', limit: 5, mode: 'fast', tags: ['a'], filters: { field: 'name' } },
      SCHEMA,
    );
    expect(issues).toEqual([]);
  });

  it('reports missing required fields with their path', () => {
    const issues = validateAgainstSchema({}, SCHEMA);
    expect(issues).toEqual([
      { path: '$.query', message: 'required field is missing', code: 'required' },
    ]);
  });

  it('reports type mismatches', () => {
    const issues = validateAgainstSchema({ query: 42 }, SCHEMA);
    expect(issues).toContainEqual({
      path: '$.query',
      message: 'expected string, got integer',
      code: 'type_mismatch',
    });
  });

  it('reports enum violations', () => {
    const issues = validateAgainstSchema({ query: 'x', mode: 'slow' }, SCHEMA);
    expect(issues.some((i) => i.path === '$.mode' && i.code === 'enum_mismatch')).toBe(true);
  });

  it('validates array items and nested objects', () => {
    const issues = validateAgainstSchema(
      { query: 'x', tags: ['ok', 7], filters: {} },
      SCHEMA,
    );
    expect(issues.some((i) => i.path === '$.tags[1]' && i.code === 'type_mismatch')).toBe(true);
    expect(issues.some((i) => i.path === '$.filters.field' && i.code === 'required')).toBe(true);
  });

  it('accepts integers where numbers are expected', () => {
    expect(validateAgainstSchema({ query: 'x', limit: 3 }, SCHEMA)).toEqual([]);
  });
});

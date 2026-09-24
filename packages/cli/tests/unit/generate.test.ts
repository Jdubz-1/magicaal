import {
  schemaToTsType,
  renderTypesFile,
  renderDescriptorFile,
  computeSchemaHash,
  isSafeHandle,
} from '../../src/commands/generate.js';

const INPUT_SCHEMA = {
  type: 'object',
  required: ['query'],
  properties: {
    query: { type: 'string', description: 'Search query' },
    limit: { type: 'number' },
    mode: { type: 'string', enum: ['fast', 'thorough'] },
    tags: { type: 'array', items: { type: 'string' } },
  },
};

describe('schemaToTsType', () => {
  it('maps primitive types', () => {
    expect(schemaToTsType({ type: 'string' })).toBe('string');
    expect(schemaToTsType({ type: 'integer' })).toBe('number');
    expect(schemaToTsType({ type: 'boolean' })).toBe('boolean');
  });

  it('maps enums to literal unions', () => {
    expect(schemaToTsType({ type: 'string', enum: ['a', 'b'] })).toBe('"a" | "b"');
  });

  it('maps arrays', () => {
    expect(schemaToTsType({ type: 'array', items: { type: 'number' } })).toBe('Array<number>');
  });

  it('maps objects with required/optional fields', () => {
    const ts = schemaToTsType(INPUT_SCHEMA);
    expect(ts).toContain('query: string;');
    expect(ts).toContain('limit?: number;');
    expect(ts).toContain('mode?: "fast" | "thorough";');
    expect(ts).toContain('tags?: Array<string>;');
  });

  it('falls back to Record<string, unknown> for null/absent schemas', () => {
    expect(schemaToTsType(null)).toBe('Record<string, unknown>');
    expect(schemaToTsType({ type: 'object' })).toBe('Record<string, unknown>');
  });
});

describe('renderTypesFile', () => {
  it('emits Input and Output types with PascalCase names', () => {
    const file = renderTypesFile('pr-review-bot', INPUT_SCHEMA, null);
    expect(file).toContain('export type PrReviewBotInput =');
    expect(file).toContain('export type PrReviewBotOutput = Record<string, unknown>;');
    expect(file).toContain('query: string;');
  });
});

describe('renderDescriptorFile', () => {
  it('emits a typed AgentDescriptor const', () => {
    const agent = { id: 'agent-1', handle: 'pr-review-bot', name: 'PR Review Bot' };
    const hash = computeSchemaHash(INPUT_SCHEMA, null);
    const file = renderDescriptorFile(agent, INPUT_SCHEMA, null, hash);

    expect(file).toContain("import type { AgentDescriptor } from '@magicaal/sdk';");
    expect(file).toContain(
      "import type { PrReviewBotInput, PrReviewBotOutput } from './pr-review-bot.types';",
    );
    expect(file).toContain(
      'export const prReviewBotAgent: AgentDescriptor<PrReviewBotInput, PrReviewBotOutput> = {',
    );
    expect(file).toContain('agentId: "agent-1"');
    expect(file).toContain(`schemaHash: "${hash}"`);
  });
});

describe('computeSchemaHash', () => {
  it('is deterministic and schema-sensitive', () => {
    const a = computeSchemaHash(INPUT_SCHEMA, null);
    expect(computeSchemaHash(INPUT_SCHEMA, null)).toBe(a);
    expect(computeSchemaHash({ type: 'object' }, null)).not.toBe(a);
    expect(a).toMatch(/^[0-9a-f]{64}$/);
  });
});

/**
 * `handle` comes from the API and is interpolated into an output path. The API
 * does not constrain its format, so the CLI — which writes to a developer's
 * filesystem with their permissions — decides for itself what it is willing to
 * turn into a filename.
 */
describe('isSafeHandle', () => {
  it.each([
    'support-bot',
    'caal',
    'agent_v2',
    'a.b.c',
    'A1',
  ])('accepts %s', (handle) => {
    expect(isSafeHandle(handle)).toBe(true);
  });

  it.each([
    ['../../../etc/cron.d/x', 'traversal'],
    ['..', 'bare traversal'],
    ['a/../b', 'traversal in the middle'],
    ['sub/dir', 'a separator'],
    ['back\\slash', 'a windows separator'],
    ['.hidden', 'a leading dot'],
    ['-flag', 'a leading dash'],
    ['', 'empty'],
    ['with space', 'a space'],
    ['nul\u0000byte', 'a null byte'],
  ])('refuses %s — %s', (handle) => {
    expect(isSafeHandle(handle)).toBe(false);
  });
});

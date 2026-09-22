/**
 * queue/client opens a real Redis socket at import time, and reaching
 * toApiToolName pulls it in through run-control. Stubbed here rather than via
 * the route-test helper so this file needs no database either.
 */
jest.mock('@/queue/client', () => ({
  redis: {
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue('OK'),
    del: jest.fn().mockResolvedValue(0),
    incr: jest.fn().mockResolvedValue(1),
    decr: jest.fn().mockResolvedValue(0),
    expire: jest.fn().mockResolvedValue(1),
    publish: jest.fn().mockResolvedValue(1),
  },
  runTriggerQueue: { add: jest.fn() },
  runScheduledQueue: { add: jest.fn(), getRepeatableJobs: jest.fn(), removeRepeatableByKey: jest.fn() },
  runRetryQueue: { add: jest.fn() },
}));

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { GraphPatch } from '@magicaal/core';
import { ALL_CAAL_TOOLS } from '@magicaal/integration-caal';
import { toApiToolName } from '@/execution/tool-executor';
import { applyProposalPatches } from '../../../../web/src/canvas/lib/proposalPatches';
import { GRAPH_FIXTURES } from '../harness/fixtures/graphs';

/**
 * Values duplicated across workspaces, asserted in one place.
 *
 * Each of these was individually correct on both sides and wrong together.
 * The 502s that made every Studio quick action unusable were a fifteen-second
 * proxy budget in front of a two-minute poll ceiling — two reasonable numbers
 * that nothing compared.
 */

const REPO = join(__dirname, '../../../../..');

function source(relative: string): string {
  return readFileSync(join(REPO, relative), 'utf8');
}

describe('cross-workspace Caal constants', () => {
  describe('timeout budgets', () => {
    it('gives the web proxy a longer budget than the API poll ceiling', () => {
      // Imported rather than scanned, since both are computed rather than literal.
      process.env.JWT_SECRET ??= 'crosswalk-test';
      process.env.DATABASE_URL ??= 'file::memory:';

      /* eslint-disable @typescript-eslint/no-var-requires */
      const { config: web } = require('../../../../web/src/config') as {
        config: { caalTimeoutMs: number; apiTimeoutMs: number };
      };
      const { config: api } = require('../../../../api/src/config') as {
        config: { caalInvokeTimeoutMs: number };
      };
      /* eslint-enable @typescript-eslint/no-var-requires */

      // The API waits this long before answering CAAL_STILL_RUNNING. A shorter
      // budget in front of it aborts turns that were seconds from completing
      // and reports them to the developer as "API unreachable".
      expect(web.caalTimeoutMs).toBeGreaterThan(api.caalInvokeTimeoutMs);
      // Caal is the slow path; ordinary calls keep the tighter budget.
      expect(web.caalTimeoutMs).toBeGreaterThan(web.apiTimeoutMs);
    });
  });

  describe('the four intents', () => {
    /**
     * Four files declare this list and none can import another: the API's copy
     * is a module-local const, the tool's is a local tuple, core's is a type
     * union that does not exist at runtime, and only Studio's is exported. So
     * this is a source-level crosswalk on purpose.
     */
    const EXPECTED = ['explain', 'question', 'suggest', 'modify'];

    it.each([
      ['apps/api/src/controllers/caal.controller.ts', 'CAAL_INTENTS'],
      ['packages/integrations/caal/src/tools/ui.ts', 'FOLLOW_UP_INTENTS'],
      ['apps/web/src/canvas/lib/caalOptions.ts', 'CAAL_INTENTS'],
    ])('%s declares them in the same order', (file, identifier) => {
      const text = source(file);
      const match = text.match(new RegExp(`${identifier}\\s*=\\s*\\[([^\\]]+)\\]`));
      expect(match).not.toBeNull();

      const declared = [...match![1].matchAll(/'([a-z]+)'/g)].map((m) => m[1]);
      expect(declared).toEqual(EXPECTED);
    });

    it('packages/core declares the same union', () => {
      const text = source('packages/core/src/caal.ts');
      const match = text.match(/export type CaalIntent\s*=\s*([^;]+);/);
      expect(match).not.toBeNull();

      const declared = [...match![1].matchAll(/'([a-z]+)'/g)].map((m) => m[1]);
      expect(declared).toEqual(EXPECTED);
    });

    it('the Caal graph has a branch for every one of them', () => {
      const agent = source('agents/caal.agent.ts');
      const cases = agent.match(/cases:\s*\[([^\]]+)\]/);
      expect(cases).not.toBeNull();

      const declared = [...cases![1].matchAll(/'([a-z]+)'/g)].map((m) => m[1]);
      expect(declared.sort()).toEqual([...EXPECTED].sort());
    });
  });

  describe('graph patch operations', () => {
    /**
     * Studio's apply path switches on this exact set. An op the tools can stage
     * but the apply path does not know is staged, shown in the review card, and
     * then silently skipped when the developer clicks Apply.
     *
     * Checked by applying one of each rather than by reading the source, so a
     * refactor of the switch cannot fool it.
     */
    const ALL_OPS: Array<GraphPatch['op']> = [
      'add_node',
      'update_node',
      'delete_node',
      'add_edge',
      'delete_edge',
      'add_tool_edge',
    ];

    const SAMPLE: Record<GraphPatch['op'], GraphPatch> = {
      add_node: { op: 'add_node', data: { id: 'fresh', type: 'core:guardrail', config: {} } },
      update_node: { op: 'update_node', target: 'llm', data: { temperature: 0.1 } },
      delete_node: { op: 'delete_node', target: 'notify' },
      add_edge: { op: 'add_edge', data: { from: 'start', to: 'end' } },
      delete_edge: { op: 'delete_edge', data: { from: 'start', to: 'llm' } },
      add_tool_edge: { op: 'add_tool_edge', data: { tool: 'caal.graph.read', agent: 'llm' } },
    };

    it.each(ALL_OPS)('Studio can apply a %s patch', (op) => {
      const result = applyProposalPatches(
        structuredClone(GRAPH_FIXTURES.studioLinear) as never,
        [SAMPLE[op]] as never,
      );

      expect(result.skipped).toEqual([]);
      expect(result.applied).toBe(1);
    });

    it('an op outside the union is reported as skipped, not silently dropped', () => {
      const result = applyProposalPatches(
        structuredClone(GRAPH_FIXTURES.studioLinear) as never,
        [{ op: 'rename_universe', target: 'llm' }] as never,
      );

      expect(result.applied).toBe(0);
      expect(result.skipped).toHaveLength(1);
      expect(result.skipped[0].reason).toBeTruthy();
    });
  });

  describe('provider-facing tool names', () => {
    /**
     * Anthropic requires ^[a-zA-Z0-9_-]{1,128}$ and rejects the entire request
     * when one tool violates it. MagiCaal's own ids are dotted, so every Caal
     * tool depends on the sanitizer at the boundary.
     */
    it.each(ALL_CAAL_TOOLS.map((t) => [t.type] as const))('%s sanitizes to a legal name', (type) => {
      expect(toApiToolName(type)).toMatch(/^[a-zA-Z0-9_-]{1,128}$/);
    });

    it('no two Caal tools collide after sanitizing', () => {
      const names = ALL_CAAL_TOOLS.map((t) => toApiToolName(t.type));
      expect(new Set(names).size).toBe(names.length);
    });

    it('every Caal tool declares an object config schema', () => {
      for (const tool of ALL_CAAL_TOOLS) {
        const schema = tool.schema.config as { type?: string; properties?: unknown };
        expect(schema.type).toBe('object');
        expect(schema.properties).toBeDefined();
      }
    });
  });
});

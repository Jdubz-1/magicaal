import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { compile } from '@magicaal/compiler';
import { ALL_NODES } from '@magicaal/nodes';
import { ALL_CAAL_TOOLS } from '@magicaal/integration-caal';
import type { AgentGraphDefinition, ConcurrencyConfig, SessionConfig } from '@magicaal/core';
import { CaalAssistantAgent } from '../../../../../agents/caal.agent';

/**
 * Does each node's config say something the node type will actually read?
 *
 * Six nodes in this graph were once configured with fields their node type
 * does not recognise — routeKey instead of expression, routerConfig instead of
 * router, a transform with no outputKey — and compile() accepted all of them,
 * because it validates node-type existence and connectivity, never a node's
 * config against that type's own schema. Each failure was silent in a
 * different way.
 *
 * The same class of bug produced "I don't have a record of what I suggested":
 * core:tool-call declared injectSessionHistory in its schema and no code read
 * it, so the graph asked for conversation history and was handed none.
 */

const REPO = join(__dirname, '../../../../..');
const graph = compile(CaalAssistantAgent) as AgentGraphDefinition;

const MODULES = new Map([...ALL_NODES, ...ALL_CAAL_TOOLS].map((n) => [n.type, n]));

/**
 * Where a node type's behaviour actually lives. Most are their own module;
 * the agentic ones are executed by the engine and ship a stub, so asking their
 * module whether it reads a key would always answer no.
 */
const ENGINE_EXECUTED: Record<string, string> = {
  'core:tool-call': 'apps/engine/src/execution/tool-executor.ts',
  'core:react': 'apps/engine/src/execution/tool-executor.ts',
};

function implementationOf(type: string): string | null {
  const engineFile = ENGINE_EXECUTED[type];
  if (engineFile) return readFileSync(join(REPO, engineFile), 'utf8');

  const file = join(REPO, 'packages/nodes/src/nodes', `${type.replace(':', '-')}.ts`);
  return existsSync(file) ? readFileSync(file, 'utf8') : null;
}

/**
 * Config keys that change what a node does, as opposed to keys that are merely
 * validated. A typo in one of these is accepted everywhere and simply has no
 * effect.
 */
const BEHAVING_KEYS = [
  'injectSessionHistory',
  'inputKey',
  'outputKey',
  'userMessageKey',
  'messagesKey',
  'expression',
  'cases',
  'reads',
  'writes',
  'maxIterations',
  'systemPrompt',
];

const CONFIGURED_NODES = Object.values(graph.nodes).filter(
  (n) => Object.keys((n.config ?? {}) as object).length > 0,
);

describe('Caal node config crosswalk', () => {
  it('has configured nodes to check', () => {
    expect(CONFIGURED_NODES.length).toBeGreaterThan(5);
  });

  it.each(CONFIGURED_NODES.map((n) => [n.id, n.type] as const))(
    '%s (%s) sets only keys its schema declares',
    (id, type) => {
      const module = MODULES.get(type);
      expect(module).toBeDefined();

      const properties = Object.keys(
        (module!.schema.config as { properties?: Record<string, unknown> }).properties ?? {},
      );
      expect(properties.length).toBeGreaterThan(0);

      for (const key of Object.keys(graph.nodes[id].config as object)) {
        expect(properties).toContain(key);
      }
    },
  );

  it.each(CONFIGURED_NODES.map((n) => [n.id, n.type] as const))(
    '%s (%s) sets every key its schema requires',
    (id, type) => {
      const required = ((MODULES.get(type)!.schema.config as { required?: string[] }).required ?? []);
      const configured = Object.keys(graph.nodes[id].config as object);

      for (const key of required) {
        expect(configured).toContain(key);
      }
    },
  );

  /**
   * The injectSessionHistory guard, generalized. A key that steers behaviour has
   * to appear in the code that implements the node, not only in its schema.
   *
   * Deliberately a source-text check: it is crude, and it is exactly what was
   * missing when core:tool-call advertised a feature it did not have.
   */
  it.each(CONFIGURED_NODES.map((n) => [n.id, n.type] as const))(
    '%s (%s) sets behaving keys the implementation actually reads',
    (id, type) => {
      const source = implementationOf(type);
      if (source === null) return; // integration node, covered by its own package

      const configured = Object.keys(graph.nodes[id].config as object);
      for (const key of configured) {
        if (!BEHAVING_KEYS.includes(key)) continue;
        expect(source.includes(key)).toBe(true);
      }
    },
  );

  describe('agent-level config', () => {
    /**
     * ConcurrencyConfig is { maxParallel, queueTimeout }. The graph once
     * declared { maxConcurrent, queueStrategy }, which are not fields of
     * anything, so the scheduler's admission check read undefined for both on
     * every Caal run.
     */
    it('declares concurrency with the fields the scheduler reads', () => {
      const concurrency = graph.config?.concurrency as ConcurrencyConfig | undefined;
      expect(concurrency).toBeDefined();

      const check: ConcurrencyConfig = concurrency!;
      expect(typeof check.maxParallel).toBe('number');
      expect(typeof check.queueTimeout).toBe('number');
      expect(Object.keys(check).sort()).toEqual(['maxParallel', 'queueTimeout']);
    });

    it('enables a session, since every path reads and writes one', () => {
      const session = graph.config?.session as SessionConfig | undefined;
      expect(session?.enabled).toBe(true);
      expect(session?.contextSchema).toBeDefined();
    });
  });

  describe('session keys', () => {
    const session = graph.config?.session as SessionConfig;
    const declared = Object.keys(session.contextSchema ?? {});

    /**
     * apps/api's save loop iterates the contextSchema, not the payload, so a
     * write to an undeclared key is sent over the wire and silently dropped.
     */
    it('writes only keys the contextSchema declares', () => {
      const writes = Object.keys(
        (graph.nodes['session-write'].config as { writes: Record<string, string> }).writes,
      );

      expect(writes.length).toBeGreaterThan(0);
      for (const key of writes) {
        expect(declared).toContain(key);
      }
    });

    it('reads only keys the contextSchema declares', () => {
      const reads = Object.values(
        (graph.nodes['session-read'].config as { reads: Record<string, string> }).reads,
      );

      expect(reads.length).toBeGreaterThan(0);
      for (const key of reads) {
        expect(declared).toContain(key);
      }
    });

    /**
     * core:session-write only evaluates a value that starts with '$'; anything
     * else is stored as its own template text, so the session fills with copies
     * of the expression instead of the data.
     */
    it('writes expressions, not literals', () => {
      const writes = (graph.nodes['session-write'].config as { writes: Record<string, string> }).writes;

      for (const [key, expression] of Object.entries(writes)) {
        expect(`${key}=${expression.trim()[0]}`).toBe(`${key}=$`);
      }
    });
  });
});

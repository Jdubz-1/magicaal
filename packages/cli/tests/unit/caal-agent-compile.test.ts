import { compile } from '@magicaal/compiler';
import { CaalAssistantAgent } from '../../../../agents/caal.agent';

// Regression coverage for ISS-076/077/079/080/081: agents/caal.agent.ts had
// five different nodes configured with fields their node type doesn't
// recognize (routeKey instead of expression, missing inputKey/outputKey,
// routerConfig instead of router), each silently accepted by compile()
// because it validates node-type existence and edge/tool-edge connectivity,
// never a node's config against that node type's own JSON schema. These
// assertions pin the actual contract each node type needs, so a future typo
// here fails at test time instead of failing silently in production.
describe('CaalAssistantAgent compiles with config shapes each node type actually reads', () => {
  const graph = compile(CaalAssistantAgent);

  function node(id: string): { type: string; config: Record<string, unknown> } {
    const n = graph.nodes[id];
    if (!n) throw new Error(`Expected a compiled node "${id}"`);
    return n as { type: string; config: Record<string, unknown> };
  }

  it('intent-router uses core:router\'s real config shape (ISS-080)', () => {
    const n = node('intent-router');
    expect(n.type).toBe('core:router');
    expect(typeof n.config.expression).toBe('string');
    expect(Array.isArray(n.config.cases)).toBe(true);
    expect(n.config.routeKey).toBeUndefined();
  });

  it('every core:transform node sets outputKey (ISS-081)', () => {
    const transformNodeIds = Object.values(graph.nodes)
      .filter((n) => (n as { type: string }).type === 'core:transform')
      .map((n) => (n as { id: string }).id);

    expect(transformNodeIds.length).toBeGreaterThan(0);
    for (const id of transformNodeIds) {
      const n = node(id);
      expect(typeof n.config.outputKey).toBe('string');
      expect((n.config.outputKey as string).length).toBeGreaterThan(0);
    }
  });

  it('explainer (core:llm-call) reads a real message source and writes to "content" (ISS-076/079)', () => {
    const n = node('explainer');
    expect(n.type).toBe('core:llm-call');
    expect(n.config.userMessageKey).toBe('explainMessage');
    expect(n.config.outputKey).toBe('content');
    expect(n.config.userTemplate).toBeUndefined();
    expect(n.config.routerConfig).toBeUndefined();
  });

  it('suggester and modifier (core:tool-call) set inputKey and write to "content" (ISS-077/079)', () => {
    for (const [id, expectedInputKey] of [
      ['suggester', 'suggestMessage'],
      ['modifier', 'modifyMessage'],
    ] as const) {
      const n = node(id);
      expect(n.type).toBe('core:tool-call');
      expect(n.config.inputKey).toBe(expectedInputKey);
      expect(n.config.outputKey).toBe('content');
      expect(n.config.userTemplate).toBeUndefined();
      expect(n.config.routerConfig).toBeUndefined();
    }
  });

  it('response-assembler nests its multi-field result under one outputKey (ISS-081) and does not recompute already-top-level content/intent', () => {
    const ra = node('response-assembler');
    expect(ra.config.outputKey).toBe('caalResult');
    expect(ra.config.expression).not.toContain('"content"');
    expect(ra.config.expression).toContain('proposal');
  });

  it('session-write writes only the new turn, reading the raw $._caal_proposal and never the unpopulated $.history/$.proposal', () => {
    const sw = node('session-write');
    const writes = sw.config.writes as Record<string, string>;

    // Every write must be an expression: core:session-write only evaluates a
    // string that starts with '$', so a bare [...] literal is stored as its own
    // template text and the session fills with copies of that string.
    for (const [key, expr] of Object.entries(writes)) {
      expect(`${key}=${expr.trim()[0]}`).toBe(`${key}=$`);
    }

    // The turn's own two messages, and nothing else: the session layer's
    // `append` concatenates them. Re-appending the stored key here accumulated
    // twice and stored a list of turn-arrays, which core:llm-call then fed
    // back to the provider adapter as entries with no role/content.
    expect(writes.messages).toContain('$.message');
    expect(writes.messages).toContain('$.content');
    expect(writes.messages).not.toContain('$.sessionMessages');
    expect(writes.messages).not.toContain('$.history');

    expect(writes.proposalHistory).toContain('$._caal_proposal');
    expect(writes.proposalHistory).not.toContain('$.proposalHistory');
    expect(writes.proposalHistory).not.toContain('$.proposal ');
  });

  it('the modify path routes around code-defined agents into a guard node, not the tool-call loop (ISS-070)', () => {
    const modifyEdges = graph.edges.filter((e) => e.from === 'intent-router');
    const targets = modifyEdges.map((e) => e.to);
    expect(targets).toContain('build-modify-message');
    expect(targets).toContain('code-defined-modify-blocked');

    const guard = node('code-defined-modify-blocked');
    expect(guard.config.outputKey).toBe('content');
  });
});

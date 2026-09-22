import { compile } from '@magicaal/compiler';
import { ALL_NODES } from '@magicaal/nodes';
import { ALL_CAAL_TOOLS } from '@magicaal/integration-caal';
import type { AgentGraphDefinition } from '@magicaal/core';
import { CaalAssistantAgent } from '../../../../../agents/caal.agent';

/**
 * Rules about how the Caal graph is wired, checked without running it.
 *
 * The empty-proposal bug was pure wiring: `suggester` had
 * caal.proposal.create and none of the caal.graph.* staging tools, so every
 * proposal it could ever build carried zero patches. Each tool's own unit test
 * passed. Nothing asserted the relationship between them.
 *
 * These are stated as general rules rather than as facts about today's nodes,
 * so a node added later is held to the same contract.
 */

const graph = compile(CaalAssistantAgent) as AgentGraphDefinition;

const KNOWN_TYPES = new Set([...ALL_NODES, ...ALL_CAAL_TOOLS].map((n) => n.type));

function toolsFor(nodeId: string): string[] {
  return graph.toolEdges.filter((e) => e.to === nodeId).map((e) => e.from);
}

const AGENTIC_NODES = Object.values(graph.nodes)
  .filter((n) => n.type === 'core:tool-call' || n.type === 'core:react')
  .map((n) => n.id);

describe('Caal graph wiring', () => {
  it('has agentic nodes to check', () => {
    expect(AGENTIC_NODES.length).toBeGreaterThan(0);
  });

  it('references only tool types that are actually registered', () => {
    for (const edge of graph.toolEdges) {
      // A typo here compiles happily and fails at runtime, mid-turn, as an
      // unresolvable tool the model was told it had.
      expect(KNOWN_TYPES.has(edge.from)).toBe(true);
    }
  });

  it('points every tool edge at a node that exists and can use one', () => {
    for (const edge of graph.toolEdges) {
      expect(Object.keys(graph.nodes)).toContain(edge.to);
      expect(AGENTIC_NODES).toContain(edge.to);
    }
  });

  /**
   * The general form of the empty-proposal bug. caal.proposal.create builds a
   * proposal purely out of what the staging tools pushed onto _caal_patches, so
   * a node with the former and none of the latter can only ever produce an
   * empty one.
   */
  it('never gives a node caal.proposal.create without a way to stage a change', () => {
    for (const nodeId of AGENTIC_NODES) {
      const tools = toolsFor(nodeId);
      if (!tools.includes('caal.proposal.create')) continue;

      const staging = tools.filter((t) => /^caal\.graph\.(add|update|delete)/.test(t));
      expect(staging.length).toBeGreaterThan(0);
    }
  });

  describe('per-node tool policy', () => {
    /**
     * Declared rather than derived, so removing a tool from the graph fails
     * here instead of quietly changing what a path can do.
     */
    const POLICY: Record<
      string,
      { mustHave: string[]; mustNotHave: Array<string | RegExp>; why: string }
    > = {
      suggester: {
        mustHave: ['caal.graph.read', 'caal.graph.summarize'],
        mustNotHave: [
          'caal.proposal.create',
          // suggest-options asks the follow-up question for free; wiring the
          // tool invited the model to spend a round trip asking it again, and a
          // tool call as its closing act left it nothing to say on the
          // iteration that actually returns.
          'caal.ui.askOptions',
          /^caal\.graph\.(add|update|delete)/,
        ],
        why: 'the suggest path is advisory and stages nothing',
      },
      modifier: {
        mustHave: [
          'caal.proposal.create',
          'caal.graph.addNode',
          'caal.graph.updateNode',
          'caal.graph.deleteNode',
          'caal.graph.addEdge',
          'caal.graph.deleteEdge',
        ],
        mustNotHave: [],
        why: 'the modify path owns staging and proposals',
      },
    };

    it.each(Object.entries(POLICY).map(([id, p]) => [id, p.why, p] as const))(
      '%s — %s',
      (nodeId, _why, policy) => {
      const tools = toolsFor(nodeId);

      for (const required of policy.mustHave) {
        expect(tools).toContain(required);
      }
      for (const banned of policy.mustNotHave) {
        if (typeof banned === 'string') {
          expect(tools).not.toContain(banned);
        } else {
          expect(tools.filter((t) => banned.test(t))).toEqual([]);
        }
      }
      },
    );

    it('covers every agentic node in the graph', () => {
      // A new agentic node with no policy is the gap this whole file exists to
      // close, so it must be added here deliberately.
      expect(AGENTIC_NODES.sort()).toEqual(Object.keys(POLICY).sort());
    });
  });

  /**
   * A prompt that names a tool the node does not have sends the model looking
   * for it, and the wasted iterations come out of the loop's budget.
   */
  it('never names a tool in a prompt that the node was not given', () => {
    for (const nodeId of AGENTIC_NODES) {
      const prompt = (graph.nodes[nodeId].config as { systemPrompt?: string }).systemPrompt ?? '';
      const tools = toolsFor(nodeId);

      for (const type of KNOWN_TYPES) {
        if (!type.startsWith('caal.')) continue;
        if (!prompt.includes(type)) continue;
        expect(tools).toContain(type);
      }
    }
  });

  describe('routing', () => {
    function successors(nodeId: string): string[] {
      return graph.edges.filter((e) => e.from === nodeId).map((e) => e.to);
    }

    it('reaches the assembler and the session write from every branch', () => {
      // Every terminal path must pass through both: a branch that skips
      // session-write loses the turn, and one that skips response-assembler
      // returns no proposal, options or node references.
      const seen = new Set<string>();
      const stack = [graph.entry];
      const terminals: string[] = [];

      while (stack.length > 0) {
        const node = stack.pop()!;
        if (seen.has(node)) continue;
        seen.add(node);

        const next = successors(node);
        if (next.length === 0) terminals.push(node);
        stack.push(...next);
      }

      expect(terminals).toEqual(['end']);
      expect(seen).toContain('response-assembler');
      expect(seen).toContain('session-write');

      expect(successors('response-assembler')).toEqual(['session-write']);
      expect(successors('session-write')).toEqual(['end']);
    });

    it('routes every branch of intent-router somewhere real', () => {
      const branches = graph.edges.filter((e) => e.from === 'intent-router');
      expect(branches.length).toBeGreaterThan(0);

      for (const edge of branches) {
        expect(Object.keys(graph.nodes)).toContain(edge.to);
      }

      // And there is a fallback, so an intent with no case still answers.
      expect(branches.some((e) => !e.condition)).toBe(true);
    });

    it('sends a code-defined modify to the guard, not into the tool loop', () => {
      const conditions = graph.edges
        .filter((e) => e.from === 'intent-router')
        .map((e) => ({ to: e.to, condition: e.condition ?? '' }));

      const blocked = conditions.find((c) => c.to === 'code-defined-modify-blocked');
      expect(blocked?.condition).toContain('isCodeDefined');

      const allowed = conditions.find((c) => c.to === 'build-modify-message');
      expect(allowed?.condition).toContain('isCodeDefined');
      // The two modify branches must be mutually exclusive, or both run.
      expect(allowed?.condition).toContain('!=');
    });
  });
});

/**
 * Graph states Studio would send as `graphState` on a Caal invoke.
 *
 * These are the *subject* graphs Caal reasons about, not the Caal graph itself
 * — that one is compiled from agents/caal.agent.ts by the harness.
 *
 * `authoringMode` is the field CaalPanel sets from the agent record; the Caal
 * graph's assemble-system-context derives `isCodeDefined` from it, and every
 * code-defined branch depends on it being present and correct.
 */

export interface SubjectGraph {
  version: string;
  name: string;
  entry: string;
  authoringMode: 'studio' | 'code-defined';
  nodes: Record<string, { id: string; type: string; config?: Record<string, unknown>; label?: string }>;
  edges: Array<{ id: string; from: string; to: string; type?: string; condition?: string }>;
  toolEdges: Array<{ id: string; from: string; to: string }>;
}

function graph(over: Partial<SubjectGraph>): SubjectGraph {
  return {
    version: '1',
    name: 'Subject Agent',
    entry: 'start',
    authoringMode: 'studio',
    nodes: {},
    edges: [],
    toolEdges: [],
    ...over,
  };
}

/** The common case: start → llm → end, authored in Studio. */
export const studioLinear = graph({
  name: 'GitHub Push Notifier',
  nodes: {
    start: { id: 'start', type: 'core:start', config: {} },
    llm: {
      id: 'llm',
      type: 'core:llm-call',
      label: 'Summarize push',
      config: { systemPrompt: 'Summarize the push event.', outputKey: 'summary' },
    },
    notify: {
      id: 'notify',
      type: 'slack:post-message',
      config: { channel: '#dev', text: '$.summary' },
    },
    end: { id: 'end', type: 'core:end', config: {} },
  },
  edges: [
    { id: 'e1', from: 'start', to: 'llm', type: 'unconditional' },
    { id: 'e2', from: 'llm', to: 'notify', type: 'unconditional' },
    { id: 'e3', from: 'notify', to: 'end', type: 'unconditional' },
  ],
});

/**
 * Same shape, but owned by a *.agent.ts file. Caal can explain it and can
 * suggest against it, but cannot stage GraphPatch ops nobody can apply to
 * TypeScript source — the modify path routes to a guard node instead.
 */
export const codeDefined = graph({
  ...studioLinear,
  name: 'Code-Defined Agent',
  authoringMode: 'code-defined',
});

/**
 * No LLM node at all. "Add a content safety guardrail node after the LLM node"
 * has nothing to attach to here, and the correct outcome is prose with no
 * proposal — which is what the live stack did when this was last checked by
 * hand.
 */
export const noLlmNode = graph({
  name: 'Webhook Relay',
  nodes: {
    start: { id: 'start', type: 'core:webhook-receive', config: {} },
    http: { id: 'http', type: 'core:http-request', config: { url: 'https://example.test/relay' } },
    end: { id: 'end', type: 'core:end', config: {} },
  },
  edges: [
    { id: 'e1', from: 'start', to: 'http', type: 'unconditional' },
    { id: 'e2', from: 'http', to: 'end', type: 'unconditional' },
  ],
});

/** A freshly created agent: assemble-system-context must count zero, not throw. */
export const emptyGraph = graph({ name: 'Untitled Agent', nodes: {}, edges: [] });

/** Studio sends null before an agent is opened. */
export const nullGraph = null;

/** Wide enough that a summarize call has something to compress. */
export const largeGraph = graph({
  name: 'Large Pipeline',
  nodes: Object.fromEntries(
    Array.from({ length: 30 }, (_, i) => [
      `n${i}`,
      { id: `n${i}`, type: i % 3 === 0 ? 'core:llm-call' : 'core:transform', config: { outputKey: `k${i}` } },
    ]),
  ),
  edges: Array.from({ length: 29 }, (_, i) => ({
    id: `e${i}`,
    from: `n${i}`,
    to: `n${i + 1}`,
    type: 'unconditional',
  })),
});

export const GRAPH_FIXTURES = {
  studioLinear,
  codeDefined,
  noLlmNode,
  emptyGraph,
  nullGraph,
  largeGraph,
} as const;

export type GraphFixtureName = keyof typeof GRAPH_FIXTURES;

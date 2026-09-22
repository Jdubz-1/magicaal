import type { GraphFixtureName } from '../harness/fixtures/graphs';

/**
 * The prompts Caal is held to.
 *
 * One corpus, two consumers: the simulated tier (apps/engine/tests/caal) runs
 * every case against a scripted model on every CI run, and the live tier
 * (tests/caal-live) runs the same cases against a real provider on demand. The
 * structural expectations below are the ones both tiers can check — neither
 * asserts anything about the model's prose.
 *
 * Scripts are not here: what the model is made to say is a property of the
 * simulation, not of the prompt.
 */

export type CaalIntent = 'explain' | 'question' | 'suggest' | 'modify';

export interface CaalPromptCase {
  id: string;
  label: string;
  message: string;
  /** What Studio sends. Quick actions carry it explicitly; see `derivesIntent`. */
  intent: CaalIntent;
  /**
   * True when Studio would have derived this intent with guessIntent rather
   * than declaring it, i.e. the developer typed the message.
   */
  derivesIntent: boolean;
  selectedNodeIds?: string[];
  graph: GraphFixtureName;
  expect: {
    /** The agentic or llm node that should handle it. */
    handledBy: string;
    proposal: 'absent' | 'required';
    options: 'absent' | 'required';
    /** Floor on the assembled answer. A 0-char answer is the lost-narration bug. */
    minContentChars: number;
  };
}

/**
 * The five quick actions, verbatim from CaalPanel's ALL_QUICK_ACTIONS, plus the
 * follow-up that suggest-options offers. These are the paths a developer hits
 * most and the ones that broke most.
 */
export const QUICK_ACTIONS: CaalPromptCase[] = [
  {
    id: 'qa-explain',
    label: 'Explain graph',
    message: 'Explain what this agent does and how the nodes connect.',
    intent: 'explain',
    derivesIntent: false,
    graph: 'studioLinear',
    expect: { handledBy: 'explainer', proposal: 'absent', options: 'absent', minContentChars: 1 },
  },
  {
    id: 'qa-suggest',
    label: 'Suggest improvements',
    message: 'Suggest improvements to this agent graph.',
    intent: 'suggest',
    derivesIntent: false,
    graph: 'studioLinear',
    // Advisory only: the card offers to turn the advice into a proposal, and
    // the suggest path has no tool that could stage one.
    expect: { handledBy: 'suggester', proposal: 'absent', options: 'required', minContentChars: 1 },
  },
  {
    id: 'qa-describe-selected',
    label: 'Describe selected',
    message: 'Describe the currently selected node.',
    intent: 'explain',
    derivesIntent: false,
    selectedNodeIds: ['llm'],
    graph: 'studioLinear',
    expect: { handledBy: 'explainer', proposal: 'absent', options: 'absent', minContentChars: 1 },
  },
  {
    id: 'qa-add-guardrail',
    label: 'Add guardrail',
    message: 'Add a content safety guardrail node after the LLM node.',
    intent: 'modify',
    derivesIntent: false,
    graph: 'studioLinear',
    expect: { handledBy: 'modifier', proposal: 'required', options: 'absent', minContentChars: 1 },
  },
  {
    id: 'qa-optimize',
    label: 'Optimize flow',
    message: 'How can I optimize this agent graph for performance?',
    intent: 'suggest',
    derivesIntent: false,
    graph: 'studioLinear',
    expect: { handledBy: 'suggester', proposal: 'absent', options: 'required', minContentChars: 1 },
  },
];

/**
 * The turn Studio sends when the developer picks "Yes, draft a proposal" on
 * the suggest path's options card. It only makes sense as turn two, with turn
 * one's advice in the session — which is the whole point: the modify node
 * answered "I don't have a record of improvements I just suggested" because
 * core:tool-call ignored the history it was configured with.
 */
export const OPTIONS_FOLLOW_UP: CaalPromptCase = {
  id: 'qa-followup-proposal',
  label: 'Yes, draft a proposal',
  message: 'Turn the improvements you just suggested into a proposal I can review and apply.',
  intent: 'modify',
  derivesIntent: false,
  graph: 'studioLinear',
  expect: { handledBy: 'modifier', proposal: 'required', options: 'absent', minContentChars: 1 },
};

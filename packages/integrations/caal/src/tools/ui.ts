import type { NodeModule } from '@magicaal/sdk-node';

/**
 * Intents the Caal graph's intent-router branches on (agents/caal.agent.ts);
 * an option's follow-up re-invokes Caal with one of them, so anything else
 * would fall through to the default explain branch.
 */
const FOLLOW_UP_INTENTS = ['explain', 'question', 'suggest', 'modify'] as const;
type FollowUpIntent = (typeof FOLLOW_UP_INTENTS)[number];

const MAX_OPTIONS = 4;
const MAX_QUESTION = 200;
const MAX_LABEL = 60;
const MAX_DESCRIPTION = 160;
const MAX_FOLLOW_UP = 2000;

interface RawOption {
  label?: unknown;
  value?: unknown;
  description?: unknown;
  followUpMessage?: unknown;
  followUpIntent?: unknown;
}

export interface CaalUiOption {
  label: string;
  value: string;
  description?: string;
  followUpMessage?: string;
  followUpIntent?: FollowUpIntent;
}

function clamp(value: unknown, max: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed.slice(0, max) : undefined;
}

/**
 * The model writes these, so every field is re-checked rather than trusted:
 * an option missing its label or value has nothing to render or report, and a
 * follow-up intent outside the router's cases would silently answer the wrong
 * branch. Studio re-validates the same payload on its side.
 */
export function normalizeUiOptions(raw: unknown): CaalUiOption[] {
  if (!Array.isArray(raw)) return [];

  const normalized: CaalUiOption[] = [];
  // Studio keys the rendered buttons by value; two answers sharing one would
  // break the card outright.
  const seen = new Set<string>();
  for (const entry of raw) {
    if (typeof entry !== 'object' || entry === null) continue;
    const opt = entry as RawOption;

    const label = clamp(opt.label, MAX_LABEL);
    const value = clamp(opt.value, MAX_LABEL);
    if (!label || !value || seen.has(value)) continue;
    seen.add(value);

    const followUpMessage = clamp(opt.followUpMessage, MAX_FOLLOW_UP);
    const intent = typeof opt.followUpIntent === 'string' ? opt.followUpIntent : undefined;
    const followUpIntent = FOLLOW_UP_INTENTS.includes(intent as FollowUpIntent)
      ? (intent as FollowUpIntent)
      : undefined;

    const option: CaalUiOption = { label, value };
    const description = clamp(opt.description, MAX_DESCRIPTION);
    if (description) option.description = description;
    // A follow-up without a usable intent would be sent as a plain question,
    // which is never what an option like "draft a proposal" means.
    if (followUpMessage && followUpIntent) {
      option.followUpMessage = followUpMessage;
      option.followUpIntent = followUpIntent;
    }

    normalized.push(option);
    if (normalized.length === MAX_OPTIONS) break;
  }

  return normalized;
}

export const uiAskOptions: NodeModule = {
  type: 'caal.ui.askOptions',
  meta: {
    name: 'Ask With Options',
    description: 'Ask the developer a question in Studio and offer selectable answers',
    category: 'integration',
    version: '0.1.0',
  },
  schema: {
    config: {
      type: 'object',
      properties: {
        question: { type: 'string', description: 'The question to put to the developer' },
        options: {
          type: 'array',
          description: 'Between one and four selectable answers',
          items: {
            type: 'object',
            properties: {
              label: { type: 'string', description: 'Button text, e.g. "Yes, draft a proposal"' },
              value: { type: 'string', description: 'Machine-readable answer id, e.g. "create_proposal"' },
              description: { type: 'string', description: 'Optional one-line explanation shown under the label' },
              followUpMessage: {
                type: 'string',
                description: 'Message Studio sends back to Caal when this answer is chosen. Omit for an answer that just dismisses the question.',
              },
              followUpIntent: {
                type: 'string',
                enum: [...FOLLOW_UP_INTENTS],
                description: 'Intent the follow-up message runs as. Required alongside followUpMessage.',
              },
            },
            required: ['label', 'value'],
          },
        },
      },
      required: ['question', 'options'],
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        asked: { type: 'number', description: 'How many options were presented' },
      },
    },
  },
  async execute(ctx, config) {
    const cfg = config as { question?: unknown; options?: unknown };

    const question = clamp(cfg.question, MAX_QUESTION);
    const options = normalizeUiOptions(cfg.options);

    if (!question || options.length === 0) {
      return {
        status: 'failed',
        outputs: {},
        error: {
          code: 'NO_VALID_OPTIONS',
          message:
            'caal.ui.askOptions needs a question and at least one option with both a label and a value.',
          retryable: true,
        },
      };
    }

    ctx.set('_caal_options', { question, options });
    return { status: 'complete', outputs: { asked: options.length } };
  },
};

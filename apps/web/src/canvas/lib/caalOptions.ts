/**
 * Caal's inline options card.
 *
 * The payload comes from the model (via the caal.ui.askOptions tool) or from
 * the suggest path's fallback in agents/caal.agent.ts, so it is re-validated
 * here rather than trusted: the engine-side tool normalizes the same fields,
 * and this is the second pass that also drops answers Studio can't honour —
 * a "modify" follow-up against a code-defined agent, which the graph's
 * intent-router blocks anyway.
 */

export const CAAL_INTENTS = ['explain', 'question', 'suggest', 'modify'] as const;
export type CaalIntent = (typeof CAAL_INTENTS)[number];

const MAX_OPTIONS = 4;
const MAX_QUESTION = 200;
const MAX_LABEL = 60;
const MAX_DESCRIPTION = 160;
const MAX_FOLLOW_UP = 2000;

export interface CaalOption {
  label: string;
  value: string;
  description?: string;
  followUpMessage?: string;
  followUpIntent?: CaalIntent;
}

export interface CaalOptionsPrompt {
  question: string;
  options: CaalOption[];
}

function clamp(value: unknown, max: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed.slice(0, max) : undefined;
}

export function normalizeCaalOptions(
  raw: unknown,
  opts: { readonly: boolean },
): CaalOptionsPrompt | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const prompt = raw as { question?: unknown; options?: unknown };

  const question = clamp(prompt.question, MAX_QUESTION);
  if (!question || !Array.isArray(prompt.options)) return null;

  const options: CaalOption[] = [];
  // CaalOptionsCard keys its buttons by value — a duplicate would throw.
  const seen = new Set<string>();
  for (const entry of prompt.options) {
    if (typeof entry !== 'object' || entry === null) continue;
    const opt = entry as Record<string, unknown>;

    const label = clamp(opt.label, MAX_LABEL);
    const value = clamp(opt.value, MAX_LABEL);
    if (!label || !value || seen.has(value)) continue;
    seen.add(value);

    const followUpMessage = clamp(opt.followUpMessage, MAX_FOLLOW_UP);
    const intent = typeof opt.followUpIntent === 'string' ? opt.followUpIntent : undefined;
    const followUpIntent = CAAL_INTENTS.includes(intent as CaalIntent)
      ? (intent as CaalIntent)
      : undefined;

    // Modification isn't supported for code-defined agents (ISS-070) — the
    // same reason CaalPanel hides the modify quick actions in readonly mode.
    if (opts.readonly && followUpIntent === 'modify') continue;

    const option: CaalOption = { label, value };
    const description = clamp(opt.description, MAX_DESCRIPTION);
    if (description) option.description = description;
    if (followUpMessage && followUpIntent) {
      option.followUpMessage = followUpMessage;
      option.followUpIntent = followUpIntent;
    }

    options.push(option);
    if (options.length === MAX_OPTIONS) break;
  }

  // A card whose only actionable answer was filtered out is just noise.
  if (options.length === 0) return null;
  return { question, options };
}

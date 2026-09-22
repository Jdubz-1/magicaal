import type { CaalIntent } from './caalOptions';

/**
 * Picks the Caal intent for a message the developer typed freehand.
 *
 * Studio's quick actions carry an explicit intent; anything typed into the box
 * does not, and the intent decides which branch of the Caal graph runs
 * (agents/caal.agent.ts's intent-router). Getting it wrong is not a display
 * bug — a "modify" request classified as a question reaches a node with no
 * staging tools and can only answer in prose.
 *
 * `apps/api`'s invokeCaal re-checks the value against the same four intents and
 * falls back to 'question', so a result outside this union can never reach the
 * graph. This function only decides which of the four to ask for.
 *
 * It lives here, rather than inside CaalPanel.svelte, so the regression corpus
 * can assert the intent a real phrasing produces without mounting a component
 * (docs/developer-guide/caal-regression-suite.md §3.2).
 */
export function guessIntent(text: string): CaalIntent {
  const lower = text.toLowerCase();
  if (/\b(add|create|remove|delete|update|change|modify|rename|move|connect|disconnect)\b/.test(lower)) return 'modify';
  if (/\b(suggest|improve|optimize|better|recommend|enhance)\b/.test(lower)) return 'suggest';
  return 'question';
}

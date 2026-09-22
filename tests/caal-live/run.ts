import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  QUICK_ACTIONS,
  UNSTRUCTURED,
  OPTIONS_FOLLOW_UP,
  type CaalPromptCase,
} from '../../apps/engine/tests/caal/corpus/prompts';
import { GRAPH_FIXTURES } from '../../apps/engine/tests/caal/harness/fixtures/graphs';

/**
 * The CI corpus, run against a real provider.
 *
 * This is the hand-verification that closed the last round of Caal fixes, made
 * repeatable. It spends real money, so it is opt-in: CAAL_LIVE=1 plus a token,
 * never on a pull request.
 *
 * Only structural properties are asserted, never the model's prose. A live run
 * cannot tell you the advice was good; it can tell you the turn completed
 * inside the proxy budget, that suggest produced an options card and no
 * proposal, and that whatever modify staged still applies cleanly.
 */

interface CaseResult {
  id: string;
  ok: boolean;
  ms: number;
  status: number;
  contentChars: number;
  patchCount: number;
  optionCount: number;
  failures: string[];
}

interface Baseline {
  recordedAt: string;
  cases: Record<string, Pick<CaseResult, 'ms' | 'contentChars' | 'patchCount'>>;
}

const BASELINE_PATH = join(__dirname, 'baseline.json');

/** A 0-char answer after a thousand billed completion tokens is the symptom. */
const MIN_CONTENT_CHARS = 200;
/** Warn, do not fail: an extra provider round trip roughly doubles a turn. */
const DRIFT_FACTOR = 1.75;

function env(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`${name} is required. See tests/caal-live/README or the script header.`);
  }
  return value;
}

function cases(): CaalPromptCase[] {
  return [...QUICK_ACTIONS, OPTIONS_FOLLOW_UP, ...UNSTRUCTURED];
}

async function invoke(
  apiUrl: string,
  token: string,
  testCase: CaalPromptCase,
  agentId: string,
): Promise<{ status: number; body: Record<string, unknown>; ms: number }> {
  const started = Date.now();
  const res = await fetch(`${apiUrl}/v1/caal/invoke`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      message: testCase.message,
      intent: testCase.intent,
      // The fixture graphs, so a live run varies only in the model — not in
      // whatever agent happened to be open.
      graphState: GRAPH_FIXTURES[testCase.graph],
      selectedNodeIds: testCase.selectedNodeIds ?? [],
      agentId,
      lastRunResult: null,
    }),
  });

  const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  return { status: res.status, body, ms: Date.now() - started };
}

function check(testCase: CaalPromptCase, status: number, body: Record<string, unknown>): CaseResult {
  const failures: string[] = [];
  const output = (body.output ?? {}) as {
    content?: string;
    proposal?: { patches?: unknown[] };
    options?: { options?: unknown[] };
  };

  // 202 CAAL_STILL_RUNNING and 504 both mean the turn outlasted a budget.
  if (status !== 200) failures.push(`expected 200, got ${status}${body.code ? ` (${body.code})` : ''}`);

  const content = output.content ?? '';
  if (content.length < MIN_CONTENT_CHARS) {
    failures.push(`content was ${content.length} chars, below the ${MIN_CONTENT_CHARS} floor`);
  }

  const patches = output.proposal?.patches ?? [];
  if (testCase.expect.proposal === 'absent' && output.proposal !== undefined) {
    failures.push('expected no proposal');
  }
  if (testCase.expect.proposal === 'required' && patches.length === 0) {
    failures.push('expected a proposal carrying at least one patch');
  }

  const options = output.options?.options ?? [];
  if (testCase.expect.options === 'required' && options.length === 0) {
    failures.push('expected an options card');
  }
  if (testCase.expect.options === 'absent' && options.length > 0) {
    failures.push('expected no options card');
  }

  return {
    id: testCase.id,
    ok: failures.length === 0,
    ms: 0,
    status,
    contentChars: content.length,
    patchCount: patches.length,
    optionCount: options.length,
    failures,
  };
}

function reportDrift(results: CaseResult[]): void {
  if (!existsSync(BASELINE_PATH)) {
    console.log('\nNo previous baseline — this run becomes it.');
    return;
  }

  const previous = JSON.parse(readFileSync(BASELINE_PATH, 'utf8')) as Baseline;
  if (!previous.cases) return;

  console.log(`\nDrift against the baseline recorded ${previous.recordedAt}:`);
  let noted = 0;
  for (const result of results) {
    const before = previous.cases[result.id];
    if (!before) continue;

    if (result.ms > before.ms * DRIFT_FACTOR) {
      console.log(`  ! ${result.id}: ${before.ms}ms -> ${result.ms}ms`);
      noted++;
    }
    if (before.patchCount > 0 && result.patchCount === 0) {
      console.log(`  ! ${result.id}: proposed ${before.patchCount} patches before, none now`);
      noted++;
    }
  }
  // Warnings, not failures: latency is noisy, and the point is to make a
  // doubling visible rather than to gate on it.
  if (noted === 0) console.log('  none');
}

async function main(): Promise<void> {
  const dryRun = process.argv.includes('--dry-run');
  const all = cases();

  if (dryRun) {
    console.log(`Would run ${all.length} cases against a live provider:\n`);
    for (const testCase of all) {
      console.log(
        `  ${testCase.id.padEnd(24)} intent=${testCase.intent.padEnd(9)} graph=${testCase.graph.padEnd(13)} ` +
          `proposal=${testCase.expect.proposal} options=${testCase.expect.options}`,
      );
    }
    console.log(`\nSet CAAL_LIVE=1, CAAL_TOKEN and CAAL_API_URL to run them for real.`);
    return;
  }

  if (process.env.CAAL_LIVE !== '1') {
    throw new Error('Refusing to spend provider credit without CAAL_LIVE=1.');
  }

  const apiUrl = env('CAAL_API_URL', 'http://localhost:3000').replace(/\/$/, '');
  const token = env('CAAL_TOKEN');
  // One agent id for every case, so they share a session. That is deliberate:
  // qa-followup-proposal only means anything with the suggest turn before it in
  // history, and a growing conversation is what a real Studio session looks
  // like anyway.
  const agentId = env('CAAL_AGENT_ID', 'caal-live-smoke');

  console.log(`Running ${all.length} live Caal cases against ${apiUrl}\n`);

  const results: CaseResult[] = [];
  for (const testCase of all) {
    const { status, body, ms } = await invoke(apiUrl, token, testCase, agentId);
    const result = { ...check(testCase, status, body), ms };
    results.push(result);

    const mark = result.ok ? 'ok  ' : 'FAIL';
    console.log(
      `  ${mark} ${result.id.padEnd(24)} ${String(result.ms).padStart(6)}ms  ` +
        `${String(result.contentChars).padStart(5)} chars  ${result.patchCount} patches`,
    );
    for (const failure of result.failures) console.log(`       - ${failure}`);
  }

  reportDrift(results);

  const baseline: Baseline = {
    recordedAt: new Date().toISOString(),
    cases: Object.fromEntries(
      results.map((r) => [r.id, { ms: r.ms, contentChars: r.contentChars, patchCount: r.patchCount }]),
    ),
  };
  writeFileSync(BASELINE_PATH, `${JSON.stringify(baseline, null, 2)}\n`);

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} passed.`);
  if (failed.length > 0) process.exitCode = 1;
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exitCode = 1;
});

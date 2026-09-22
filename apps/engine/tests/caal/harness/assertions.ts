import type { SessionConfig } from '@magicaal/core';
import { caalSessionConfig, type SimulatedRun } from './invoke';

/**
 * The checklist every corpus run is held to, on top of whatever its own case
 * asserts. Most Caal regressions were a violation of one of these on exactly
 * one path, which is why they are applied to every run rather than spot-checked.
 */

/** Anthropic requires ^[a-zA-Z0-9_-]{1,128}$; OpenAI is the same set at 64. */
const PROVIDER_TOOL_NAME = /^[a-zA-Z0-9_-]{1,128}$/;

export function assertRunInvariants(run: SimulatedRun): void {
  // 1. The graph was entered and left through its own terminals. A branch that
  //    stops reaching session-write loses the turn silently.
  expect(run.path[0]).toBe('start');
  expect(run.path.slice(-3)).toEqual(['response-assembler', 'session-write', 'end']);
  expect(new Set(run.path).size).toBe(run.path.length);

  // 2. Every tool offered is one a provider will accept. Six Caal tools once
  //    shipped an untyped `{}` schema and 400'd every suggest and modify run.
  for (const request of run.requests) {
    for (const name of request.toolNames) {
      expect(name).toMatch(PROVIDER_TOOL_NAME);
    }
    for (const tool of request.tools) {
      expect((tool.inputSchema as { type?: string }).type).toBe('object');
    }
    expect(new Set(request.toolNames).size).toBe(request.toolNames.length);
  }

  // 3. A proposal exists only if it can change something. Every proposal that
  //    reached Studio for weeks carried zero patches.
  const proposal = run.response.proposal as { patches?: unknown[] } | undefined;
  if (proposal !== undefined) {
    expect(Array.isArray(proposal.patches)).toBe(true);
    expect(proposal.patches!.length).toBeGreaterThan(0);
  }

  // 4. nodeReferences is always a list, never a bare match or a missing field.
  expect(Array.isArray(run.response.nodeReferences)).toBe(true);

  // 5. Engine-internal keys stay out of the run output.
  for (const key of Object.keys(run.output)) {
    expect(key.startsWith('_')).toBe(false);
  }

  assertSessionWrites(run);
}

export function assertSessionWrites(run: SimulatedRun, sessionConfig?: SessionConfig): void {
  const schema = ((sessionConfig ?? caalSessionConfig()).contextSchema ?? {}) as Record<string, unknown>;

  // ctx.sessionWrites() is every key the run wrote, and apps/api's save loop
  // iterates the contextSchema rather than the payload — so an undeclared key
  // (graphContext, explainMessage, …) is sent and then dropped, and only the
  // declared ones are worth asserting on here.
  const persisted = Object.keys(run.sessionWrites).filter((k) => k in schema);
  expect(persisted.length).toBeGreaterThan(0);

  const messages = run.sessionWrites.messages as Array<{ role: string; content: unknown }> | undefined;
  if (messages === undefined) return;

  // This turn's entries and nothing else. Re-appending the loaded history here
  // made the node and the session layer both accumulate, storing a list of
  // turn-arrays that core:llm-call then fed back as malformed messages.
  expect(Array.isArray(messages)).toBe(true);
  expect(messages.length).toBeLessThanOrEqual(2);
  expect(messages[0]).toMatchObject({ role: 'user' });

  for (const message of messages) {
    // An empty turn stored here comes back as a content-less message on the
    // next invocation.
    expect(typeof message.content).toBe('string');
    expect((message.content as string).length).toBeGreaterThan(0);
    expect(['user', 'assistant']).toContain(message.role);
  }
}

/** The answer the developer sees was actually assembled, not dropped. */
export function assertAnswered(run: SimulatedRun, minChars = 1): void {
  expect(typeof run.response.content).toBe('string');
  expect((run.response.content as string).length).toBeGreaterThanOrEqual(minChars);
}

/** The suggest path is advisory: it is never even offered a way to stage one. */
export function assertNoStagingTools(run: SimulatedRun, nodeId: string): void {
  const offered = run.toolsOffered(nodeId);
  expect(offered).not.toContain('caal_proposal_create');
  expect(offered.filter((t) => /^caal_graph_(add|update|delete)/.test(t))).toEqual([]);
  expect(run.response.proposal).toBeUndefined();
}

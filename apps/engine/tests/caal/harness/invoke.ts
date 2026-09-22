// Must come first: this module's hoisted jest.mock calls swap @/config for a
// test DB, @/queue/client for a Map-backed fake Redis, and the loggers for
// stubs. Anything that imports @/config before it wins instead.
import { buildTestApp } from '../../helpers/app';

import { compile } from '@magicaal/compiler';
import { stripInternalKeys } from '@magicaal/nodes';
import type { AgentGraphDefinition, CanonicalMessage, SessionConfig } from '@magicaal/core';
import { CaalAssistantAgent } from '../../../../../agents/caal.agent';
import { ExecutionContextImpl } from '@/execution/context';
import { executeGraph } from '@/execution/worker';
import { config } from '@/config';
import {
  createScriptedProvider,
  SCRIPTED_CONNECTION_ID,
  scriptedRouter,
  type RecordedRequest,
  type Script,
  type ScriptedProvider,
} from './scripted-provider';
import { GRAPH_FIXTURES, type SubjectGraph } from './fixtures/graphs';
import {
  expectedRunInput,
  expectedSessionId,
  PLATFORM_TENANT_ID,
} from '../../../../../tests/fixtures/caal-wire/run-job-input';

/**
 * Runs a Caal invoke the way the stack does, with only the provider faked.
 *
 * The request that goes in is the one apps/api's invokeCaal builds
 * (caal.controller.ts), the graph is the real compiled agents/caal.agent.ts
 * with real nodes and real Caal tools, and the response that comes out is
 * flattened exactly as the controller flattens it — so what a test asserts on
 * is the literal body a Studio client receives.
 *
 * Deliberately not routed through the scheduler's job processor: session
 * persistence there is an HTTP call to apps/api, so the wrapper would only add
 * a fetch seam to fake. Session load is reproduced by preloading the context
 * (as the scheduler does from loadSession) and session save by reading
 * ctx.sessionWrites(), which is what would have been persisted.
 */

export const PLATFORM_TENANT = PLATFORM_TENANT_ID;

export type CaalIntent = 'explain' | 'question' | 'suggest' | 'modify';

export interface SimulatedRequest {
  message: string;
  intent?: CaalIntent | string;
  /** A fixture name, a literal graph, or null (Studio before an agent opens). */
  graphState?: keyof typeof GRAPH_FIXTURES | SubjectGraph | null;
  selectedNodeIds?: string[];
  lastRunResult?: unknown;
  /** Prior turns, preloaded the way a loaded session would be. */
  session?: CanonicalMessage[];
  sessionExtras?: Record<string, unknown>;
  systemPromptSuffix?: string | null;
  invokerTenantId?: string;
  agentId?: string;
  script?: Script;
}

export interface SimulatedRun {
  /** The body apps/api would return: content, proposal, options, nodeReferences. */
  response: Record<string, unknown>;
  /** The run's declared output, before the controller flattens caalResult. */
  output: Record<string, unknown>;
  /** Node ids in execution order. */
  path: string[];
  requests: RecordedRequest[];
  /** Provider-facing tool names offered to a node, as the model saw them. */
  toolsOffered(nodeId: string): string[];
  /** Tools the model asked for, in order, as the provider-facing name. */
  toolCalls: Array<{ nodeId: string; iteration: number; name: string; input: Record<string, unknown> }>;
  /** Tool results as the model saw them, read back out of the conversation. */
  toolResults: Array<{ nodeId: string; toolCallId: string; content: string }>;
  /** What would have been persisted to the session. */
  sessionWrites: Record<string, unknown>;
  ctx: ExecutionContextImpl;
}

let caalGraph: AgentGraphDefinition | undefined;
let provider: ScriptedProvider | undefined;

/** Compile once and bootstrap the registry; call from beforeAll. */
export async function setupCaalHarness(): Promise<void> {
  if (caalGraph) return;

  // Registers every node module, integration, Caal tool and provider adapter,
  // and migrates the telemetry DB — the same boot sequence src/index.ts runs.
  await buildTestApp();

  caalGraph = compile(CaalAssistantAgent) as AgentGraphDefinition;
  provider = createScriptedProvider();

  // A core:llm-call request carries no node metadata, so the provider matches
  // it on the system prompt the compiled graph gave that node.
  provider.registerSystemPrompts(
    Object.values(caalGraph.nodes)
      .map((n) => ({
        nodeId: n.id,
        systemPrompt: (n.config as { systemPrompt?: string } | undefined)?.systemPrompt ?? '',
      }))
      .filter((p) => p.systemPrompt.length > 0),
  );
}

export function compiledCaalGraph(): AgentGraphDefinition {
  if (!caalGraph) throw new Error('setupCaalHarness() must run first');
  return caalGraph;
}

export function caalSessionConfig(): SessionConfig {
  return compiledCaalGraph().config?.session as SessionConfig;
}

function resolveGraphState(
  value: SimulatedRequest['graphState'],
): SubjectGraph | null {
  if (value === undefined) return GRAPH_FIXTURES.studioLinear;
  if (value === null) return null;
  if (typeof value === 'string') return GRAPH_FIXTURES[value] as SubjectGraph | null;
  return value;
}

let runCounter = 0;

export async function invokeCaalSimulated(req: SimulatedRequest): Promise<SimulatedRun> {
  if (!caalGraph || !provider) throw new Error('setupCaalHarness() must run first');
  provider.reset(req.script ?? {});

  const invokerTenantId = req.invokerTenantId ?? 'tenant-a';
  const runId = `run_caal_${++runCounter}`;
  const caller = { tenantId: invokerTenantId, userId: 'user-1', agentId: req.agentId ?? 'agent-1' };

  const ctx = new ExecutionContextImpl({
    runId,
    agentId: 'caal-agent',
    tenantId: PLATFORM_TENANT,
    triggerType: 'caal',
    input: {
      // The key set comes from the shared wire fixture, which apps/api's
      // caal-invoke.test.ts asserts invokeCaal dispatches — so a field the
      // controller starts or stops sending changes what a run starts from here
      // too, instead of the two drifting apart.
      ...expectedRunInput(caller, {
        message: req.message,
        intent: req.intent ?? 'question',
        systemPromptSuffix: req.systemPromptSuffix ?? null,
      }),
      // Per-case values the fixture only carries an example of.
      graphState: resolveGraphState(req.graphState),
      selectedNodeIds: req.selectedNodeIds ?? [],
      lastRunResult: req.lastRunResult ?? null,
      // Seeded by the scheduler rather than the controller, for Caal's platform
      // tools — they run in this process with no user session.
      _caal_api_base: config.apiBaseUrl,
      _caal_tenant_id: invokerTenantId,
    },
    runRouterOverride: scriptedRouter(runId),
    sessionId: expectedSessionId(caller),
    credentialTenantId: invokerTenantId,
  });

  // routedLLMCall reads credentials straight off the context; the real resolver
  // decrypts an integration_connections row, and is covered by
  // tests/unit/resolver/credential-tenant.test.ts.
  (ctx.credentials as Record<string, unknown>)[SCRIPTED_CONNECTION_ID] = { apiKey: 'scripted-key' };

  // Session load: the scheduler copies each loaded entry into the context and
  // then resets write tracking, so the baseline is not counted as this run's
  // writes — the double-accumulation that once nested Caal's history.
  if (req.session) ctx.set('messages', req.session);
  for (const [key, value] of Object.entries(req.sessionExtras ?? {})) ctx.set(key, value);
  ctx.resetWriteTracking();

  // executeNodeOnce emits node.started for every node, and worker.ts does the
  // same for the agentic ones, so the emit stream is the execution path.
  // Swallowed rather than forwarded: emit fans out to the SSE manager, which
  // no assertion here reads.
  const path: string[] = [];
  (ctx as unknown as { emit: ExecutionContextImpl['emit'] }).emit = ((
    event: string,
    payload: Record<string, unknown>,
  ) => {
    if (event === 'node.started') path.push(payload.nodeId as string);
  }) as ExecutionContextImpl['emit'];

  await executeGraph(runId, caalGraph, ctx);

  // scheduler.ts: a run returns the terminal core:end node's selection, else
  // the context minus engine-internal keys.
  const declared = (ctx as unknown as Record<string, unknown>)._runOutput as
    | Record<string, unknown>
    | undefined;
  const output = declared ?? stripInternalKeys(ctx.data);

  // caal.controller.ts flattens caalResult back to the top level so the
  // endpoint's shape stays what CaalPanel expects.
  const { caalResult, ...rest } = output as { caalResult?: Record<string, unknown> };
  const response = { ...rest, ...(caalResult ?? {}) };

  // The tool executor emits nothing, so tool activity is read from the two
  // sides of the conversation: what the model asked for (the provider's own
  // answers) and what came back (the tool_result turns it was then shown).
  const toolCalls = provider.responses.flatMap((r) =>
    r.toolCalls.map((tc) => ({ nodeId: r.nodeId, iteration: r.iteration, name: tc.name, input: tc.input })),
  );
  const seenResults = new Set<string>();
  const toolResults: SimulatedRun['toolResults'] = [];
  for (const request of provider.requests) {
    for (const message of request.messages) {
      if (message.role !== 'tool_result' || !message.toolCallId) continue;
      if (seenResults.has(message.toolCallId)) continue;
      seenResults.add(message.toolCallId);
      toolResults.push({
        nodeId: request.nodeId,
        toolCallId: message.toolCallId,
        content: typeof message.content === 'string' ? message.content : JSON.stringify(message.content),
      });
    }
  }

  return {
    response,
    output,
    path,
    requests: provider.requests,
    toolsOffered: (nodeId: string) =>
      provider!.requests.filter((r) => r.nodeId === nodeId).flatMap((r) => r.toolNames),
    toolCalls,
    toolResults,
    sessionWrites: ctx.sessionWrites(),
    ctx,
  };
}

/**
 * Chains turns the way the session layer would: `messages` is an `append` key
 * with maxItems/evict_oldest, so turn n's writes accumulate onto turn n-1's
 * stored value rather than replacing it.
 */
export function applySessionWrites(
  previous: CanonicalMessage[],
  writes: Record<string, unknown>,
  sessionConfig: SessionConfig = caalSessionConfig(),
): CanonicalMessage[] {
  const schema = (sessionConfig.contextSchema ?? {}) as Record<
    string,
    { type?: string; maxItems?: number; overflow?: string }
  >;
  const rule = schema['messages'] ?? {};
  const written = (writes['messages'] ?? []) as CanonicalMessage[];
  if (rule.type !== 'append') return written;

  const merged = [...previous, ...written];
  const max = rule.maxItems;
  if (max && merged.length > max && rule.overflow === 'evict_oldest') {
    return merged.slice(merged.length - max);
  }
  return merged;
}

import type {
  CanonicalLLMRequest,
  CanonicalLLMResponse,
  ModelRouterConfig,
  ModelRouterTarget,
  RouterTriggerCondition,
} from '@magicaal/core';
import type { ProviderAdapter, ResolvedCredentials } from '@magicaal/sdk-node';
import { providerAdapterRegistry } from '@/router/provider-adapter-registry';
import { toApiToolName } from '@/execution/tool-executor';

/**
 * The only fake in the Caal simulated-run suite.
 *
 * It is a ProviderAdapter rather than a stub of ctx.llmCall so that everything
 * between the graph and the wire stays real: assembleTools resolving tool
 * edges against the registry, toApiToolName sanitizing dotted ids, schema
 * normalization, target selection, the circuit breaker, and the transport
 * retry. Every one of those has broken a Caal run at least once, and a
 * ctx.llmCall stub would skip all of them.
 *
 * It also records the CanonicalLLMRequest each node produced, which is the
 * most useful artifact in the suite: the system prompt, the conversation and
 * the exact tool list Caal offered the model.
 */

export const SCRIPTED_PROVIDER = 'scripted';
export const SCRIPTED_CONNECTION_ID = 'conn-scripted';

/**
 * A router pinned to the fake, with a target id unique per run.
 *
 * The circuit breaker keys failure counts by target id and opens after five,
 * so a shared id would let the failure-mode cases leak state into every case
 * that ran after them.
 */
export function scriptedRouter(targetId: string): ModelRouterConfig {
  return {
    name: 'scripted',
    strategy: 'priority',
    targets: [
      {
        id: `scripted-${targetId}`,
        connectionId: SCRIPTED_CONNECTION_ID,
        provider: SCRIPTED_PROVIDER,
        model: 'scripted-model',
      },
    ],
    triggers: [],
  };
}

/** One model turn. `toolCalls` uses MagiCaal tool ids; sanitizing is done here. */
export type ScriptedTurn =
  | { text: string }
  | { text?: string; toolCalls: Array<{ name: string; input?: Record<string, unknown> }> }
  /**
   * Throws instead of answering. `failTimes` bounds how many attempts at this
   * same turn throw before it answers with `text` — which is how a transport
   * retry that eventually succeeds is expressed, since a retry re-enters the
   * same loop iteration.
   */
  | { error: Error; failTimes?: number; text?: string };

/**
 * Turns keyed by the node that asks for them. Agentic nodes are matched on
 * `request.metadata.agentNodeId`, which runAgentLoop always sets; a
 * core:llm-call node has no metadata and is matched on its system prompt
 * instead (see `registerSystemPrompts`). `'*'` catches anything unmatched.
 */
export type Script = Record<string, ScriptedTurn[]>;

export interface RecordedRequest {
  nodeId: string;
  iteration: number;
  system?: string;
  /**
   * A snapshot. runAgentLoop mutates one conversation array across iterations,
   * so holding the reference would make every recorded request show the final
   * state.
   */
  messages: CanonicalLLMRequest['messages'];
  /** Provider-facing tool names, i.e. post-sanitizing. */
  toolNames: string[];
  tools: NonNullable<CanonicalLLMRequest['tools']>;
}

/** What the scripted model answered — the tool calls a request produced. */
export interface RecordedResponse {
  nodeId: string;
  iteration: number;
  text: string;
  toolCalls: Array<{ id: string; name: string; input: Record<string, unknown> }>;
}

export interface ScriptedProvider {
  adapter: ProviderAdapter;
  requests: RecordedRequest[];
  responses: RecordedResponse[];
  /** Node system prompts, longest first, for matching a core:llm-call request. */
  registerSystemPrompts(prompts: Array<{ nodeId: string; systemPrompt: string }>): void;
  reset(script: Script): void;
}

function turnFor(script: Script, nodeId: string, iteration: number): ScriptedTurn {
  const turns = script[nodeId] ?? script['*'];
  if (!turns) {
    throw new Error(
      `No scripted turns for node "${nodeId}". Add a "${nodeId}" key (or "*") to the script.`,
    );
  }
  const turn = turns[iteration - 1];
  if (!turn) {
    throw new Error(
      `Script for "${nodeId}" ran out at iteration ${iteration}; it has ${turns.length} turn(s). ` +
        'The agent loop only stops on a turn with no tool calls — end the script with one.',
    );
  }
  return turn;
}

export function createScriptedProvider(): ScriptedProvider {
  let script: Script = {};
  const requests: RecordedRequest[] = [];
  const responses: RecordedResponse[] = [];
  let systemPrompts: Array<{ nodeId: string; systemPrompt: string }> = [];
  // Per-node call counter, so a core:llm-call node (which has no iteration in
  // its metadata) still advances through its scripted turns.
  const calls = new Map<string, number>();
  // Attempts at one (node, iteration) pair, so a transport retry can recover.
  const attempts = new Map<string, number>();
  // Conversation length of the last request per node. A transport retry
  // re-sends the identical conversation, so an unchanged length means the same
  // iteration rather than the next one — runAgentLoop tells us its iteration
  // directly, but core:llm-call sends no metadata at all.
  const lastLength = new Map<string, number>();

  function resolveNodeId(request: CanonicalLLMRequest): string {
    const fromMeta = (request.metadata as { agentNodeId?: string } | undefined)?.agentNodeId;
    if (fromMeta) return fromMeta;

    const system = request.system ?? '';
    const match = systemPrompts.find((p) => system.startsWith(p.systemPrompt));
    return match?.nodeId ?? '*';
  }

  const adapter: ProviderAdapter = {
    provider: SCRIPTED_PROVIDER,

    async call(
      request: CanonicalLLMRequest,
      target: ModelRouterTarget,
      _credentials: ResolvedCredentials,
    ): Promise<CanonicalLLMResponse> {
      const nodeId = resolveNodeId(request);
      const declared = (request.metadata as { iteration?: number } | undefined)?.iteration;
      let iteration: number;
      if (declared !== undefined) {
        iteration = declared;
      } else {
        const previous = calls.get(nodeId) ?? 0;
        const isRetry = lastLength.get(nodeId) === request.messages.length && previous > 0;
        iteration = isRetry ? previous : previous + 1;
      }
      calls.set(nodeId, iteration);
      lastLength.set(nodeId, request.messages.length);

      const tools = request.tools ?? [];
      requests.push({
        nodeId,
        iteration,
        system: request.system,
        messages: structuredClone(request.messages),
        toolNames: tools.map((t) => t.name),
        tools,
      });

      const turn = turnFor(script, nodeId, iteration);
      if ('error' in turn) {
        const key = `${nodeId}:${iteration}`;
        const attempt = (attempts.get(key) ?? 0) + 1;
        attempts.set(key, attempt);
        if (attempt <= (turn.failTimes ?? Number.POSITIVE_INFINITY)) throw turn.error;
      }

      const scripted = 'toolCalls' in turn ? turn.toolCalls : undefined;
      const toolCalls = (scripted ?? []).map((tc, i) => ({
        id: `toolu_${nodeId}_${iteration}_${i}`,
        // Scripts name tools as the graph does (caal.graph.read); the loop
        // dispatches on the sanitized name, so convert with the real function
        // rather than hardcoding underscores.
        name: toApiToolName(tc.name),
        input: tc.input ?? {},
      }));

      responses.push({ nodeId, iteration, text: turn.text ?? '', toolCalls });

      return {
        content: turn.text ?? '',
        ...(toolCalls.length > 0 && { toolCalls }),
        stopReason: toolCalls.length > 0 ? 'tool_use' : 'end_turn',
        usage: { promptTokens: 100, completionTokens: 50, estimatedCostUsd: 0 },
        routingMeta: { targetUsed: target, attemptCount: 1, triggerHistory: [] },
      };
    },

    // eslint-disable-next-line require-yield
    async *stream(): AsyncGenerator<CanonicalLLMResponse> {
      throw new Error('scripted provider does not stream');
    },

    translateError(error: unknown): RouterTriggerCondition | null {
      if (typeof error !== 'object' || error === null) return null;
      const e = error as { status?: number; _providerError?: boolean };
      if (!e._providerError) return null;
      if (e.status === 429) return { type: 'rate_limit' };
      if (e.status === 400) return { type: 'content_policy' };
      if (e.status && e.status >= 500) return { type: 'provider_error' };
      return null;
    },
  };

  providerAdapterRegistry.register(adapter);

  return {
    adapter,
    requests,
    responses,
    registerSystemPrompts(prompts) {
      // Longest first so a prompt that prefixes another cannot shadow it.
      systemPrompts = [...prompts].sort((a, b) => b.systemPrompt.length - a.systemPrompt.length);
    },
    reset(next: Script) {
      script = next;
      requests.length = 0;
      responses.length = 0;
      calls.clear();
      attempts.clear();
      lastLength.clear();
    },
  };
}

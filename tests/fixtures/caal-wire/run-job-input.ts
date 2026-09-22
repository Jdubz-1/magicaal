/**
 * The Caal invoke payload, as one fixture with two consumers.
 *
 * apps/api's caal-invoke.test.ts asserts that invokeCaal *dispatches* this, and
 * apps/engine's simulated-run harness uses it to build the context a run
 * starts from. Neither side can change shape without the other failing, which
 * is the only thing standing between "the graph runs correctly" and "the API
 * calls the graph correctly" being two separately true, jointly wrong
 * statements.
 *
 * Deliberately dependency-free so both workspaces can import it without
 * dragging the other's module graph along.
 */

export const PLATFORM_TENANT_ID = '_platform';
export const CAAL_AGENT_HANDLE = 'caal-assistant';

export interface CaalInvokeBody {
  message: string;
  intent: string;
  graphState: unknown;
  selectedNodeIds: string[];
  agentId: string;
  lastRunResult: unknown;
}

/** What Studio POSTs to /v1/caal/invoke. */
export const CAAL_INVOKE_BODY: CaalInvokeBody = {
  message: 'Suggest improvements to this agent graph.',
  intent: 'suggest',
  graphState: {
    version: '1',
    name: 'GitHub Push Notifier',
    entry: 'start',
    authoringMode: 'studio',
    nodes: { start: { id: 'start', type: 'core:start', config: {} } },
    edges: [],
    toolEdges: [],
  },
  selectedNodeIds: ['start'],
  agentId: 'agent-under-edit',
  lastRunResult: null,
};

export interface Caller {
  tenantId: string;
  userId: string;
  agentId?: string;
}

/**
 * Namespaced per user and per target agent. The id the client sends is treated
 * as a *client* id and wrapped once — echoing the server's own value back
 * nested it one wrapper deeper on every turn and started a fresh session with
 * each message (ISS-069).
 */
export function expectedSessionId({ tenantId, userId, agentId }: Caller): string {
  return `${PLATFORM_TENANT_ID}:${CAAL_AGENT_HANDLE}:${tenantId}:${userId}:${agentId ?? 'global'}`;
}

/** The `input` invokeCaal puts on the run. */
export function expectedRunInput(
  caller: Caller,
  overrides: { message?: string; intent?: string; systemPromptSuffix?: string | null } = {},
): Record<string, unknown> {
  return {
    message: overrides.message ?? CAAL_INVOKE_BODY.message,
    // The graph routes on this; without it every message fell through the
    // intent-router's cases to the default explain branch.
    intent: overrides.intent ?? CAAL_INVOKE_BODY.intent,
    graphState: CAAL_INVOKE_BODY.graphState,
    selectedNodeIds: CAAL_INVOKE_BODY.selectedNodeIds,
    lastRunResult: null,
    systemPromptSuffix: overrides.systemPromptSuffix ?? null,
    _invokerTenantId: caller.tenantId,
    _invokerUserId: caller.userId,
    _agentId: caller.agentId ?? null,
  };
}

/** The whole dispatch body invokeCaal POSTs to the engine. */
export function expectedDispatch(
  caller: Caller & { caalAgentId: string },
  overrides: Parameters<typeof expectedRunInput>[1] = {},
): Record<string, unknown> {
  return {
    agentId: caller.caalAgentId,
    // The run executes as the platform tenant...
    tenantId: PLATFORM_TENANT_ID,
    triggerType: 'caal',
    // ...under a Studio-only exemption from the target agent's invocation
    // policy, since this request already carried a platform JWT.
    caller: { kind: 'platform', strategy: 'caal' },
    sessionId: expectedSessionId(caller),
    // ...but its credentials resolve against the invoking tenant, whose router
    // policy chose the model and whose connection backs it.
    credentialTenantId: caller.tenantId,
    input: expectedRunInput(caller, overrides),
  };
}

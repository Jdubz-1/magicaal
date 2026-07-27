import { Agent, AgentGraph } from '@magicaal/compiler';

@Agent({
  handle: 'caal-assistant',
  name: 'Caal AI Assistant',
  description: 'In-Studio AI assistant for MagiCaal — explains, suggests, and modifies agent graphs.',
  config: {
    trigger: { type: 'rest', mode: 'async' },
    // ConcurrencyConfig is { maxParallel, queueTimeout } — { maxConcurrent,
    // queueStrategy } was never a real field (ISS-082, same class as
    // ISS-076-081), so scheduler.ts's admission check silently saw an
    // undefined maxParallel/queueTimeout for every Caal run.
    concurrency: { maxParallel: 10, queueTimeout: 30000 },
    session: {
      enabled: true,
      ttlSeconds: 86400,
      schemaVersion: 1,
      contextSchema: {
        messages: { type: 'append', maxItems: 50, overflow: 'evict_oldest' },
        lastProposal: { type: 'replace' },
        userPreferences: { type: 'merge' },
        proposalHistory: { type: 'append', maxItems: 20, overflow: 'evict_oldest' },
      },
    },
  },
})
export class CaalAssistantAgent extends AgentGraph {
  build(): void {
    // ── Nodes ────────────────────────────────────────────────────────────────
    this.node('start', 'core:start');

    // Restore session history and read context
    this.node('session-read', 'core:session-read', {
      reads: {
        sessionMessages: 'messages',
        lastProposal: 'lastProposal',
        userPreferences: 'userPreferences',
      },
    });

    // Assemble context for the LLM: graph state + code-defined flag.
    //
    // core:transform writes its JSONata result to exactly one context key
    // (ctx.set(config.outputKey, result)) — it does not spread an object
    // result's fields across the top level of ctx.data. The original
    // "context-assembler" computed one big object literal with intent,
    // message, graphContext, explainMessage, etc. as sibling fields and never
    // set outputKey at all, so the whole object landed under a bogus
    // "undefined" key — none of those fields ever actually reached $.intent,
    // $.graphContext, etc. for any downstream node to read (ISS-081). $.message
    // and $.intent don't need re-deriving here — they're already top-level
    // from the run's input (see apps/api/caal.controller.ts) — and
    // $.lastProposal/$.userPreferences are already top-level from
    // session-read below. graphContext and systemContext are the only values
    // that need a dedicated node each, since nothing else already provides
    // them as flat keys.
    this.node('assemble-graph-context', 'core:transform', {
      outputKey: 'graphContext',
      expression: `{
        "graphState": $.graphState,
        "selectedNodeIds": $.selectedNodeIds ?? [],
        "lastRunResult": $.lastRunResult
      }`,
    });

    this.node('assemble-system-context', 'core:transform', {
      outputKey: 'systemContext',
      expression: `{
        "nodeCount": $count($keys($.graphState.nodes ?? {})),
        "isCodeDefined": $.graphState.authoringMode = "code-defined"
      }`,
    });

    // Route on intent. `core:router`'s config is `{ expression, cases }`, not
    // `routeKey` — the old field name meant `config.expression` was always
    // undefined, and jsonata(undefined) throws at construction, so this node
    // failed on every single invocation before any response path ever ran
    // (ISS-080). The outbound edges below key off $.intent directly rather
    // than $._route, so this expression only needs to keep the node from
    // crashing — actual branching is still edge-condition driven.
    this.node('intent-router', 'core:router', {
      expression: '$.intent',
      cases: ['explain', 'question', 'suggest', 'modify'],
    });

    // ── Explain / Question path ──────────────────────────────────────────────
    // core:llm-call does no {{}} templating of its own (ISS-076) — the full
    // message string for the LLM has to be pre-built as its own context key,
    // for the same core:transform single-outputKey reason noted above.
    this.node('build-explain-message', 'core:transform', {
      outputKey: 'explainMessage',
      expression: `$.message & "\n\nGraph context:\n" & $string($.graphContext) & "\n\nUser preferences: " & $string($.userPreferences ?? {})`,
    });

    this.node('explainer', 'core:llm-call', {
      systemPrompt:
        'You are Caal, an expert AI assistant embedded in MagiCaal Studio. ' +
        'You help developers understand and improve their AI agent graphs. ' +
        'When referring to specific nodes, wrap the node ID in [[nodeId]] so the UI can render a chip. ' +
        'Be concise and actionable. You are talking to a developer.',
      userMessageKey: 'explainMessage',
      outputKey: 'content',
      injectSessionHistory: 'sessionMessages',
      // No inline `router` here: { strategy: 'fastest', maxCost: 0.01 } was never a
      // valid ModelRouterConfig (no targets/triggers; 'fastest' isn't a real
      // ModelRouterStrategy) — it was dead under the old `routerConfig` typo, and
      // making it live under the correct field name would just move the failure
      // from silent to a hard error. Falls through to the graph/tenant router
      // policy, which a Caal admin can now steer via caal_configuration's
      // modelOverride/routerPolicyId (see invokeCaal's routerOverride).
    });

    // ── Suggest path ─────────────────────────────────────────────────────────
    this.node('build-suggest-message', 'core:transform', {
      outputKey: 'suggestMessage',
      expression: `$.message & "\n\nGraph: " & $string($.graphContext)`,
    });

    this.node('suggester', 'core:tool-call', {
      systemPrompt:
        'You are Caal. Suggest improvements to the agent graph. ' +
        'Use the available tools to inspect the graph and platform capabilities, ' +
        'then create a proposal with caal.proposal.create.',
      inputKey: 'suggestMessage',
      outputKey: 'content',
      injectSessionHistory: 'sessionMessages',
      maxIterations: 3,
      // See explainer's comment above — no inline `router`.
    });

    // ── Modify path ───────────────────────────────────────────────────────────
    this.node('build-modify-message', 'core:transform', {
      outputKey: 'modifyMessage',
      expression: `$.message & "\n\nGraph: " & $string($.graphContext) & "\nisCodeDefined: " & $string($.systemContext.isCodeDefined)`,
    });

    this.node('modifier', 'core:tool-call', {
      systemPrompt:
        'You are Caal. The developer wants to modify their agent graph. ' +
        'Use graph tools to stage changes and then call caal.proposal.create to present a proposal.',
      inputKey: 'modifyMessage',
      outputKey: 'content',
      injectSessionHistory: 'sessionMessages',
      maxIterations: 8,
      // See explainer's comment above — no inline `router`.
    });

    // ── Code-defined modify guard ─────────────────────────────────────────────
    // TypeScript diff suggestions (proposing a unified diff against the
    // *.agent.ts source instead of staging GraphPatch ops) were never
    // implemented beyond an unused type (ISS-070) — the modifier node used to
    // just tell the LLM to "output TypeScript diff suggestions" in its
    // prompt, with nothing downstream that could parse or display one. Route
    // modify requests against code-defined agents here instead of into a
    // tool loop that would stage GraphPatch ops nobody can apply to a
    // *.agent.ts file.
    this.node('code-defined-modify-blocked', 'core:transform', {
      outputKey: 'content',
      expression: `"This agent is code-defined — Caal can explain it, but can't modify it directly yet. Edit the source *.agent.ts file and run \`magicaal build\` to apply changes."`,
    });

    // ── Response assembler ────────────────────────────────────────────────────
    // Only computes fields nothing else already provides at the top level:
    // "content" (set directly by explainer/suggester/modifier/the guard node
    // via their own outputKey: 'content' — ISS-079) and "intent" (already
    // top-level from the run's input) both need no recomputation here.
    // core:transform can only write ONE context key per node (ISS-081), and
    // this node computes four sibling fields (proposal/canvasHighlight/
    // canvasFocus/nodeReferences), so they're nested under "caalResult" and
    // flattened back to the top level by invokeCaal before the API responds
    // — keeping the external /v1/caal/invoke response shape (which the
    // Studio client already expects) unchanged.
    this.node('response-assembler', 'core:transform', {
      outputKey: 'caalResult',
      expression: `{
        "nodeReferences": $.content ? $map($match($.content, /\\[\\[([^\\]]+)\\]\\]/), function($m) { $m.groups[0] }) : [],
        "proposal": $._caal_proposal,
        "canvasHighlight": $._caal_canvas_highlight,
        "canvasFocus": $._caal_canvas_focus
      }`,
    });

    // Persist conversation turn to session. $.history used to reference a
    // "context-assembler" field that never actually reached the top level of
    // ctx.data (ISS-081) — sessionMessages (from session-read below) is the
    // real, already-flat key holding prior turns.
    this.node('session-write', 'core:session-write', {
      writes: {
        messages: '$append($.sessionMessages ?? [], [{"role": "user", "content": $.message}, {"role": "assistant", "content": $.content}])',
        lastProposal: '$._caal_proposal',
        // References the raw _caal_proposal key directly rather than
        // $.proposal/$.caalResult.proposal, so this doesn't depend on
        // response-assembler's output shape at all.
        proposalHistory: '$._caal_proposal ? $append($.proposalHistory ?? [], [$._caal_proposal]) : $.proposalHistory',
      },
    });

    this.node('end', 'core:end');

    // ── Edges ─────────────────────────────────────────────────────────────────
    this.connect('start', 'session-read');
    this.connect('session-read', 'assemble-graph-context');
    this.connect('assemble-graph-context', 'assemble-system-context');
    this.connect('assemble-system-context', 'intent-router');

    this.when('intent-router', '$.intent = "explain" or $.intent = "question"', 'build-explain-message');
    this.when('intent-router', '$.intent = "suggest"', 'build-suggest-message');
    this.when('intent-router', '$.intent = "modify" and $.systemContext.isCodeDefined != true', 'build-modify-message');
    this.when('intent-router', '$.intent = "modify" and $.systemContext.isCodeDefined = true', 'code-defined-modify-blocked');
    this.otherwise('intent-router', 'build-explain-message');

    this.connect('build-explain-message', 'explainer');
    this.connect('build-suggest-message', 'suggester');
    this.connect('build-modify-message', 'modifier');

    this.connect('explainer', 'response-assembler');
    this.connect('suggester', 'response-assembler');
    this.connect('modifier', 'response-assembler');
    this.connect('code-defined-modify-blocked', 'response-assembler');

    this.connect('response-assembler', 'session-write');
    this.connect('session-write', 'end');

    // ── Tool edges ────────────────────────────────────────────────────────────
    // Platform tools available to both suggester and modifier
    this.tool('caal.platform.listNodeTypes', 'suggester');
    this.tool('caal.platform.getNodeSchema', 'suggester');
    this.tool('caal.platform.listConnections', 'suggester');
    this.tool('caal.platform.listAgents', 'suggester');
    this.tool('caal.graph.read', 'suggester');
    this.tool('caal.graph.summarize', 'suggester');
    this.tool('caal.proposal.create', 'suggester');

    this.tool('caal.platform.listNodeTypes', 'modifier');
    this.tool('caal.platform.getNodeSchema', 'modifier');
    this.tool('caal.platform.listConnections', 'modifier');
    this.tool('caal.platform.listAgents', 'modifier');

    // Graph read/write tools for modifier
    this.tool('caal.graph.read', 'modifier');
    this.tool('caal.graph.getNode', 'modifier');
    this.tool('caal.graph.getSelectedNodes', 'modifier');
    this.tool('caal.graph.summarize', 'modifier');
    this.tool('caal.graph.addNode', 'modifier');
    this.tool('caal.graph.updateNode', 'modifier');
    this.tool('caal.graph.deleteNode', 'modifier');
    this.tool('caal.graph.addEdge', 'modifier');
    this.tool('caal.graph.deleteEdge', 'modifier');
    this.tool('caal.graph.addToolEdge', 'modifier');
    this.tool('caal.proposal.create', 'modifier');

    // Canvas tools for agentic nodes (core:tool-call can invoke them)
    this.tool('caal.canvas.highlight', 'suggester');
    this.tool('caal.canvas.focus', 'suggester');
    this.tool('caal.canvas.highlight', 'modifier');
    this.tool('caal.canvas.focus', 'modifier');
  }
}

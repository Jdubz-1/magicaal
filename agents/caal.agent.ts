import { Agent, AgentGraph } from '@magicaal/compiler';

@Agent({
  handle: 'caal-assistant',
  name: 'Caal AI Assistant',
  description: 'In-Studio AI assistant for MagiCaal — explains, suggests, and modifies agent graphs.',
  config: {
    trigger: { type: 'rest', mode: 'async' },
    concurrency: { maxConcurrent: 10, queueStrategy: 'fifo' },
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

    // Assemble full context for the LLM: graph state + session history + preferences
    this.node('context-assembler', 'core:transform', {
      expression: `{
        "intent": $.intent ?? "question",
        "message": $.message,
        "graphContext": {
          "graphState": $.graphState,
          "selectedNodeIds": $.selectedNodeIds ?? [],
          "lastRunResult": $.lastRunResult
        },
        "history": $.sessionMessages ?? [],
        "lastProposal": $.lastProposal,
        "userPreferences": $.userPreferences ?? {},
        "systemContext": {
          "nodeCount": $count($keys($.graphState.nodes ?? {})),
          "isCodeDefined": $.graphState.authoringMode = "code-defined"
        }
      }`,
    });

    // Route on intent
    this.node('intent-router', 'core:router', {
      routeKey: '$.intent',
    });

    // ── Explain / Question path ──────────────────────────────────────────────
    this.node('explainer', 'core:llm-call', {
      systemPrompt:
        'You are Caal, an expert AI assistant embedded in MagiCaal Studio. ' +
        'You help developers understand and improve their AI agent graphs. ' +
        'When referring to specific nodes, wrap the node ID in [[nodeId]] so the UI can render a chip. ' +
        'Be concise and actionable. You are talking to a developer.',
      userTemplate:
        '{{message}}\n\n' +
        'Graph context:\n{{$string(graphContext)}}\n\n' +
        'User preferences: {{$string(userPreferences)}}',
      injectSessionHistory: 'sessionMessages',
      routerConfig: { strategy: 'fastest', maxCost: 0.01 },
    });

    // ── Suggest path ─────────────────────────────────────────────────────────
    this.node('suggester', 'core:tool-call', {
      systemPrompt:
        'You are Caal. Suggest improvements to the agent graph. ' +
        'Use the available tools to inspect the graph and platform capabilities, ' +
        'then create a proposal with caal.proposal.create.',
      userTemplate: '{{message}}\n\nGraph: {{$string(graphContext)}}',
      injectSessionHistory: 'sessionMessages',
      maxIterations: 3,
      routerConfig: { strategy: 'balanced' },
    });

    // ── Modify path ───────────────────────────────────────────────────────────
    this.node('modifier', 'core:tool-call', {
      systemPrompt:
        'You are Caal. The developer wants to modify their agent graph. ' +
        'Use graph tools to stage changes and then call caal.proposal.create to present a proposal. ' +
        'For code-defined agents (isCodeDefined=true), output TypeScript diff suggestions instead of staging patches.',
      userTemplate:
        '{{message}}\n\nGraph: {{$string(graphContext)}}\n' +
        'isCodeDefined: {{systemContext.isCodeDefined}}',
      injectSessionHistory: 'sessionMessages',
      maxIterations: 8,
      routerConfig: { strategy: 'balanced' },
    });

    // ── Response assembler ────────────────────────────────────────────────────
    this.node('response-assembler', 'core:transform', {
      expression: `{
        "content": $.content ?? $.output.content,
        "nodeReferences": [$.content ? $match($.content, /\\[\\[([^\\]]+)\\]\\]/)[] : []],
        "proposal": $._caal_proposal,
        "canvasHighlight": $._caal_canvas_highlight,
        "canvasFocus": $._caal_canvas_focus,
        "intent": $.intent
      }`,
    });

    // Persist conversation turn to session
    this.node('session-write', 'core:session-write', {
      writes: {
        messages: '$append($.history ?? [], [{"role": "user", "content": $.message}, {"role": "assistant", "content": $.content}])',
        lastProposal: '$._caal_proposal',
        proposalHistory: '$.proposal ? $append($.proposalHistory ?? [], [$.proposal]) : $.proposalHistory',
      },
    });

    this.node('end', 'core:end');

    // ── Edges ─────────────────────────────────────────────────────────────────
    this.connect('start', 'session-read');
    this.connect('session-read', 'context-assembler');
    this.connect('context-assembler', 'intent-router');

    this.when('intent-router', '$.intent = "explain" or $.intent = "question"', 'explainer');
    this.when('intent-router', '$.intent = "suggest"', 'suggester');
    this.when('intent-router', '$.intent = "modify"', 'modifier');
    this.otherwise('intent-router', 'explainer');

    this.connect('explainer', 'response-assembler');
    this.connect('suggester', 'response-assembler');
    this.connect('modifier', 'response-assembler');

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

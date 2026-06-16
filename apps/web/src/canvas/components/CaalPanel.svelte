<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { selectedNode, graph } from '../stores/graph';
  import ProposalReviewUI from './ProposalReviewUI.svelte';

  export let agentId: string;

  interface CaalMessage {
    role: 'user' | 'assistant';
    content: string;
    nodeReferences?: string[];
    proposal?: CaalProposal;
    canvasHighlight?: { nodeIds: string[]; color: string; durationMs: number };
    canvasFocus?: { nodeId: string; zoom: number };
    timestamp: number;
  }

  interface CaalProposal {
    id: string;
    description: string;
    rationale: string;
    complexity: 'targeted' | 'structural' | 'replacement';
    patches: CaalPatch[];
    createdAt: string;
  }

  interface CaalPatch {
    op: string;
    target?: string;
    data?: Record<string, unknown>;
  }

  let messages: CaalMessage[] = [];
  let inputText = '';
  let isThinking = false;
  let pendingProposal: CaalProposal | null = null;
  let sessionId: string | null = null;
  let expanded = true;
  let showHistory = false;
  let historyMessages: CaalMessage[] = [];

  let messagesEl: HTMLElement;

  const QUICK_ACTIONS = [
    { label: 'Explain graph', intent: 'explain', prompt: 'Explain what this agent does and how the nodes connect.' },
    { label: 'Suggest improvements', intent: 'suggest', prompt: 'Suggest improvements to this agent graph.' },
    { label: 'Describe selected', intent: 'explain', prompt: 'Describe the currently selected node.' },
    { label: 'Add guardrail', intent: 'modify', prompt: 'Add a content safety guardrail node after the LLM node.' },
    { label: 'Optimize flow', intent: 'suggest', prompt: 'How can I optimize this agent graph for performance?' },
  ];

  async function sendMessage(text: string, intent?: string) {
    if (!text.trim() || isThinking) return;

    const userMsg: CaalMessage = { role: 'user', content: text, timestamp: Date.now() };
    messages = [...messages, userMsg];
    inputText = '';
    isThinking = true;
    scrollToBottom();

    try {
      const graphSnapshot = {
        ...$graph,
        authoringMode: ($graph as Record<string, unknown>)['authoringMode'] ?? 'studio',
      };

      const body = {
        message: text,
        graphState: graphSnapshot,
        selectedNodeIds: $selectedNode ? [$selectedNode.id] : [],
        sessionId: sessionId ?? undefined,
        intent: intent ?? guessIntent(text),
      };

      const res = await fetch('/api/v1/caal/invoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`Caal invoke failed: ${res.status}`);
      const data = await res.json() as {
        output?: {
          content?: string;
          nodeReferences?: string[];
          proposal?: CaalProposal;
          canvasHighlight?: { nodeIds: string[]; color: string; durationMs: number };
          canvasFocus?: { nodeId: string; zoom: number };
        };
        sessionId?: string;
      };

      if (data.sessionId) sessionId = data.sessionId;

      const out = data.output ?? {};
      const assistantMsg: CaalMessage = {
        role: 'assistant',
        content: out.content ?? '',
        nodeReferences: out.nodeReferences ?? [],
        proposal: out.proposal,
        canvasHighlight: out.canvasHighlight,
        canvasFocus: out.canvasFocus,
        timestamp: Date.now(),
      };
      messages = [...messages, assistantMsg];

      if (out.proposal) pendingProposal = out.proposal;
      if (out.canvasHighlight) dispatchCanvasHighlight(out.canvasHighlight);
      if (out.canvasFocus) dispatchCanvasFocus(out.canvasFocus);
    } catch (err) {
      const errMsg: CaalMessage = {
        role: 'assistant',
        content: `Error: ${(err as Error).message}`,
        timestamp: Date.now(),
      };
      messages = [...messages, errMsg];
    } finally {
      isThinking = false;
      scrollToBottom();
    }
  }

  function guessIntent(text: string): string {
    const lower = text.toLowerCase();
    if (/\b(add|create|remove|delete|update|change|modify|rename|move|connect|disconnect)\b/.test(lower)) return 'modify';
    if (/\b(suggest|improve|optimize|better|recommend|enhance)\b/.test(lower)) return 'suggest';
    return 'question';
  }

  function dispatchCanvasHighlight(hl: { nodeIds: string[]; color: string; durationMs: number }) {
    window.dispatchEvent(new CustomEvent('caal:canvas-highlight', { detail: hl }));
  }

  function dispatchCanvasFocus(focus: { nodeId: string; zoom: number }) {
    window.dispatchEvent(new CustomEvent('caal:canvas-focus', { detail: focus }));
  }

  function onNodeRefClick(nodeId: string) {
    window.dispatchEvent(new CustomEvent('caal:canvas-focus', { detail: { nodeId, zoom: 1.5 } }));
    window.dispatchEvent(new CustomEvent('caal:canvas-highlight', { detail: { nodeIds: [nodeId], color: '#F59E0B', durationMs: 2000 } }));
  }

  function renderContentWithChips(content: string): { type: 'text' | 'chip'; value: string }[] {
    const parts: { type: 'text' | 'chip'; value: string }[] = [];
    const regex = /\[\[([^\]]+)\]\]/g;
    let last = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(content)) !== null) {
      if (match.index > last) parts.push({ type: 'text', value: content.slice(last, match.index) });
      parts.push({ type: 'chip', value: match[1] });
      last = match.index + match[0].length;
    }
    if (last < content.length) parts.push({ type: 'text', value: content.slice(last) });
    return parts;
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
    });
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(inputText);
    }
  }

  async function loadHistory() {
    if (!sessionId) return;
    try {
      const res = await fetch(`/api/v1/caal/sessions/${encodeURIComponent(sessionId)}`);
      if (res.ok) {
        const data = await res.json() as { contextEntries: { messages?: CaalMessage[] } };
        historyMessages = data.contextEntries?.messages ?? [];
        showHistory = true;
      }
    } catch { /* non-fatal */ }
  }

  function onProposalApply(event: CustomEvent<CaalProposal>) {
    const proposal = event.detail;
    // Dispatch patches to the graph store and history
    window.dispatchEvent(new CustomEvent('caal:apply-proposal', { detail: proposal }));
    pendingProposal = null;
    messages = [...messages, {
      role: 'assistant',
      content: `Proposal "${proposal.description}" accepted and applied to graph.`,
      timestamp: Date.now(),
    }];
  }

  function onProposalReject() {
    pendingProposal = null;
  }
</script>

<div class="caal-panel" class:collapsed={!expanded}>
  <div class="caal-header">
    <span class="caal-title">
      <span class="caal-dot"></span>
      Caal AI
    </span>
    <div class="header-actions">
      {#if sessionId}
        <button class="icon-btn" title="History" on:click={loadHistory}>⏱</button>
      {/if}
      <button class="icon-btn" on:click={() => (expanded = !expanded)}>
        {expanded ? '▼' : '▲'}
      </button>
    </div>
  </div>

  {#if expanded}
    {#if showHistory}
      <div class="history-view">
        <div class="history-header">
          <span>Conversation History</span>
          <button class="icon-btn" on:click={() => (showHistory = false)}>✕</button>
        </div>
        <div class="messages-list">
          {#each historyMessages as msg}
            <div class="message {msg.role}">
              <span class="msg-content">{msg.content}</span>
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <!-- Messages list -->
      <div class="messages-list" bind:this={messagesEl}>
        {#if messages.length === 0}
          <div class="empty-state">
            Ask Caal to explain, improve, or modify this agent graph.
          </div>
        {/if}
        {#each messages as msg}
          <div class="message {msg.role}">
            {#if msg.role === 'assistant'}
              <div class="msg-content">
                {#each renderContentWithChips(msg.content) as part}
                  {#if part.type === 'chip'}
                    <button class="node-chip" on:click={() => onNodeRefClick(part.value)}>
                      {part.value}
                    </button>
                  {:else}
                    <span>{part.value}</span>
                  {/if}
                {/each}
              </div>
            {:else}
              <span class="msg-content">{msg.content}</span>
            {/if}
          </div>
        {/each}

        {#if isThinking}
          <div class="message assistant thinking">
            <span class="dot"></span><span class="dot"></span><span class="dot"></span>
          </div>
        {/if}
      </div>

      <!-- Pending proposal -->
      {#if pendingProposal}
        <ProposalReviewUI
          proposal={pendingProposal}
          on:apply={onProposalApply}
          on:reject={onProposalReject}
        />
      {/if}

      <!-- Quick actions -->
      <div class="quick-actions">
        {#each QUICK_ACTIONS as action}
          <button
            class="quick-btn"
            on:click={() => sendMessage(action.prompt, action.intent)}
            disabled={isThinking}
          >
            {action.label}
          </button>
        {/each}
      </div>

      <!-- Input -->
      <div class="input-area">
        <textarea
          class="caal-input"
          bind:value={inputText}
          on:keydown={onKeydown}
          placeholder="Ask Caal… (Enter to send, Shift+Enter for newline)"
          rows={2}
          disabled={isThinking}
        ></textarea>
        <button
          class="send-btn"
          on:click={() => sendMessage(inputText)}
          disabled={isThinking || !inputText.trim()}
        >
          ➤
        </button>
      </div>
    {/if}
  {/if}
</div>

<style>
  .caal-panel {
    background: #12141f;
    border-top: 1px solid #2d3148;
    display: flex;
    flex-direction: column;
    max-height: 420px;
  }
  .caal-panel.collapsed {
    max-height: 36px;
  }
  .caal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-bottom: 1px solid #2d3148;
    flex-shrink: 0;
    cursor: default;
  }
  .caal-title {
    font-size: 12px;
    font-weight: 600;
    color: #e2e8f0;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .caal-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #f59e0b;
    display: inline-block;
  }
  .header-actions {
    display: flex;
    gap: 4px;
  }
  .icon-btn {
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    font-size: 13px;
    padding: 2px 5px;
    border-radius: 3px;
  }
  .icon-btn:hover { color: #e2e8f0; background: #1e2235; }

  .messages-list {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 80px;
  }
  .empty-state {
    color: #64748b;
    font-size: 11px;
    text-align: center;
    padding: 16px 8px;
  }
  .message {
    padding: 6px 10px;
    border-radius: 8px;
    font-size: 12px;
    line-height: 1.5;
    max-width: 95%;
  }
  .message.user {
    background: #1e3a5f;
    color: #bfdbfe;
    align-self: flex-end;
  }
  .message.assistant {
    background: #1a1d27;
    color: #e2e8f0;
    border: 1px solid #2d3148;
    align-self: flex-start;
  }
  .message.thinking {
    display: flex;
    gap: 4px;
    align-items: center;
    padding: 10px 14px;
  }
  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #94a3b8;
    animation: pulse 1.2s infinite;
  }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes pulse {
    0%, 80%, 100% { opacity: 0.3; }
    40% { opacity: 1; }
  }
  .msg-content { white-space: pre-wrap; word-break: break-word; }
  .node-chip {
    display: inline-block;
    background: #451a03;
    border: 1px solid #f59e0b;
    color: #fbbf24;
    border-radius: 4px;
    padding: 1px 6px;
    font-size: 11px;
    cursor: pointer;
    margin: 0 2px;
    font-family: monospace;
  }
  .node-chip:hover { background: #78350f; }

  .quick-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 6px 8px;
    border-top: 1px solid #2d3148;
  }
  .quick-btn {
    background: #1e2235;
    border: 1px solid #2d3148;
    color: #94a3b8;
    border-radius: 4px;
    padding: 3px 8px;
    font-size: 10px;
    cursor: pointer;
  }
  .quick-btn:hover:not(:disabled) { color: #e2e8f0; border-color: #f59e0b; }
  .quick-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .input-area {
    display: flex;
    gap: 4px;
    padding: 6px 8px;
    border-top: 1px solid #2d3148;
    flex-shrink: 0;
  }
  .caal-input {
    flex: 1;
    background: #0f1117;
    border: 1px solid #2d3148;
    color: #e2e8f0;
    border-radius: 6px;
    padding: 6px 8px;
    font-size: 12px;
    resize: none;
    font-family: inherit;
  }
  .caal-input:focus { outline: none; border-color: #f59e0b; }
  .send-btn {
    background: #f59e0b;
    border: none;
    color: #000;
    border-radius: 6px;
    padding: 0 10px;
    cursor: pointer;
    font-size: 14px;
  }
  .send-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .send-btn:hover:not(:disabled) { background: #fbbf24; }

  .history-view {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }
  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 10px;
    font-size: 11px;
    color: #94a3b8;
    border-bottom: 1px solid #2d3148;
  }
</style>

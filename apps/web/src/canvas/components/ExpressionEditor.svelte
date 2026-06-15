<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let value: string = '';
  export let placeholder: string = 'JSONata expression...';
  export let fieldName: string = '';

  const dispatch = createEventDispatcher<{ change: string; evaluate: string }>();

  function onInput(e: Event) {
    value = (e.target as HTMLTextAreaElement).value;
    dispatch('change', value);
  }

  function onEvaluate() {
    dispatch('evaluate', value);
  }
</script>

<div class="expr-editor">
  <textarea
    class="expr-textarea"
    {placeholder}
    rows="3"
    value={value}
    on:input={onInput}
    spellcheck="false"
    autocomplete="off"
    autocorrect="off"
  ></textarea>
  <div class="expr-actions">
    <span class="expr-hint">JSONata</span>
    <button class="eval-btn" on:click={onEvaluate} title="Evaluate against last run context">▶ Evaluate</button>
  </div>
</div>

<style>
  .expr-editor { display: flex; flex-direction: column; gap: 4px; }
  .expr-textarea {
    width: 100%;
    background: #0d1117;
    color: #e2e8f0;
    border: 1px solid #374151;
    border-radius: 4px;
    padding: 6px 8px;
    font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
    font-size: 0.75rem;
    line-height: 1.5;
    resize: vertical;
    box-sizing: border-box;
    caret-color: #f59e0b;
    outline: none;
  }
  .expr-textarea:focus { border-color: #f59e0b; }
  .expr-actions { display: flex; justify-content: space-between; align-items: center; }
  .expr-hint { font-size: 0.6rem; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.08em; }
  .eval-btn {
    font-size: 0.65rem; color: #94a3b8; background: #1e2035;
    border: 1px solid #374151; border-radius: 3px; padding: 2px 6px;
    cursor: pointer;
  }
  .eval-btn:hover { color: #e2e8f0; border-color: #f59e0b; }
</style>

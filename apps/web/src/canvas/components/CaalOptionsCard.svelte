<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { CaalOption, CaalOptionsPrompt } from '../lib/caalOptions';

  export let prompt: CaalOptionsPrompt;
  export let disabled = false;

  const dispatch = createEventDispatcher<{ choose: CaalOption }>();
</script>

<!--
  Caal asking the developer something with selectable answers. All text here is
  model-supplied and rendered as text — never {@html} — and normalizeCaalOptions
  has already clamped and filtered it.
-->
<div class="options-card">
  <div class="options-question">{prompt.question}</div>
  <div class="options-list">
    {#each prompt.options as option (option.value)}
      <button
        class="option-btn"
        {disabled}
        on:click={() => dispatch('choose', option)}
      >
        <span class="option-label">{option.label}</span>
        {#if option.description}
          <span class="option-desc">{option.description}</span>
        {/if}
      </button>
    {/each}
  </div>
</div>

<style>
  .options-card {
    background: #1a1d27;
    border: 1px solid #2d3148;
    border-left: 2px solid #f59e0b;
    border-radius: 8px;
    margin: 0 8px 8px;
    padding: 8px 10px;
    flex-shrink: 0;
  }
  .options-question {
    font-size: 12px;
    color: #e2e8f0;
    line-height: 1.45;
    margin-bottom: 8px;
  }
  .options-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .option-btn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    width: 100%;
    text-align: left;
    background: #12141f;
    border: 1px solid #2d3148;
    border-radius: 6px;
    padding: 6px 8px;
    cursor: pointer;
    color: #e2e8f0;
    font-family: inherit;
  }
  .option-btn:hover:not(:disabled) {
    border-color: #f59e0b;
    background: #1e2235;
  }
  .option-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .option-label {
    font-size: 11px;
    font-weight: 600;
  }
  .option-desc {
    font-size: 10px;
    color: #94a3b8;
    line-height: 1.4;
  }
</style>

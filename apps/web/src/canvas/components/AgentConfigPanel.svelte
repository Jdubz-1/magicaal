<script lang="ts">
  import { onMount } from 'svelte';
  import { agent, graph, agentConfig } from '../stores/graph';

  export let agentId: string;
  export let readonly = false;

  let publishing = false;
  let publishMsg = '';
  let saving = false;
  let saveMsg = '';
  let draftSaving = false;
  let draftMsg = '';
  let reverting = false;
  let revertMsg = '';

  interface IntegrationType {
    service: string;
    displayName: string;
    hasTrigger: boolean;
  }
  interface TriggerRegistration {
    id: string;
    service: string;
    agentId: string;
    eventFilter: string | null;
    url: string;
  }

  let integrationTypes: IntegrationType[] = [];
  let agentTriggers: TriggerRegistration[] = [];
  let integService = '';
  let integEventFilter = '';
  let integSecret = '';
  let integMsg = '';
  let registering = false;

  onMount(async () => {
    try {
      const [typesRes, triggersRes] = await Promise.all([
        fetch('/api/integrations'),
        fetch('/api/integrations/triggers'),
      ]);
      if (typesRes.ok) {
        const all = (await typesRes.json()) as IntegrationType[];
        integrationTypes = all.filter((t) => t.hasTrigger);
      }
      if (triggersRes.ok) {
        const all = (await triggersRes.json()) as TriggerRegistration[];
        agentTriggers = all.filter((t) => t.agentId === agentId);
      }
    } catch {
      // integration trigger UI degrades silently; REST/cron/webhook still work
    }
  });

  async function registerIntegrationTrigger() {
    registering = true;
    integMsg = '';
    try {
      const res = await fetch('/api/integrations/triggers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: integService,
          agentId,
          eventFilter: integEventFilter || undefined,
          secret: integSecret,
        }),
      });
      if (!res.ok) throw new Error('Registration failed');
      const created = (await res.json()) as TriggerRegistration;
      agentTriggers = [...agentTriggers, created];
      integSecret = '';
      integEventFilter = '';
      integMsg = '✓ Trigger registered';
    } catch (err) {
      integMsg = '✗ ' + (err instanceof Error ? err.message : 'Error');
    } finally {
      registering = false;
    }
  }

  async function removeIntegrationTrigger(id: string) {
    try {
      const res = await fetch(`/api/integrations/triggers/${id}`, { method: 'DELETE' });
      if (res.ok || res.status === 204) {
        agentTriggers = agentTriggers.filter((t) => t.id !== id);
      }
    } catch {
      // leave the row in place on failure
    }
  }

  async function publish() {
    publishing = true;
    publishMsg = '';
    try {
      const graphJson = JSON.stringify($graph);
      const res = await fetch(`/api/agents/${agentId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ graphJson }),
      });
      if (!res.ok) throw new Error('Publish failed');
      publishMsg = '✓ Published';
      const agentRes = await fetch(`/api/agents/${agentId}`);
      if (agentRes.ok) agent.set(await agentRes.json());
    } catch (err) {
      publishMsg = '✗ ' + (err instanceof Error ? err.message : 'Error');
    } finally {
      publishing = false;
    }
  }

  async function saveDraft() {
    draftSaving = true;
    draftMsg = '';
    try {
      const res = await fetch(`/api/agents/${agentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draftGraphJson: JSON.stringify($graph) }),
      });
      if (!res.ok) throw new Error('Save failed');
      draftMsg = '✓ Draft saved';
    } catch (err) {
      draftMsg = '✗ ' + (err instanceof Error ? err.message : 'Error');
    } finally {
      draftSaving = false;
    }
  }

  async function revertToDraft() {
    reverting = true;
    revertMsg = '';
    try {
      const res = await fetch(`/api/agents/${agentId}/draft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Revert failed');
      agent.set(await res.json());
      revertMsg = '✓ Reverted to draft';
    } catch (err) {
      revertMsg = '✗ ' + (err instanceof Error ? err.message : 'Error');
    } finally {
      reverting = false;
    }
  }

  async function saveTriggerConfig() {
    saving = true;
    saveMsg = '';
    try {
      const triggerConfig: Record<string, unknown> = { type: $agentConfig.triggerType };
      if ($agentConfig.triggerType === 'cron') {
        triggerConfig.expression = $agentConfig.cronExpression;
      }
      const res = await fetch(`/api/agents/${agentId}/config`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ triggerConfig }),
      });
      if (!res.ok) throw new Error('Save failed');
      saveMsg = '✓ Saved';

      // If webhook trigger, fetch webhook URL from a publish response or agent config
      if ($agentConfig.triggerType === 'webhook') {
        const cfgRes = await fetch(`/api/agents/${agentId}/config`);
        if (cfgRes.ok) {
          const cfg = await cfgRes.json() as { triggerConfig?: { webhookUrl?: string } };
          agentConfig.update((c) => ({ ...c, webhookUrl: cfg.triggerConfig?.webhookUrl ?? '' }));
        }
      }
    } catch (err) {
      saveMsg = '✗ ' + (err instanceof Error ? err.message : 'Error');
    } finally {
      saving = false;
    }
  }
</script>

<div class="panel-section">
  <div class="panel-header">Agent</div>
  {#if $agent}
    <div class="agent-name">{$agent.name}</div>
    <div class="agent-status status-{$agent.status}">{$agent.status}</div>
  {/if}
  <div class="btn-row">
    <button class="btn-draft" disabled={draftSaving || readonly} on:click={saveDraft}>
      {draftSaving ? 'Saving…' : 'Save Draft'}
    </button>
    <button class="btn-publish" disabled={publishing || readonly} on:click={publish}>
      {publishing ? 'Publishing…' : 'Publish'}
    </button>
  </div>
  {#if draftMsg}<div class="status-msg">{draftMsg}</div>{/if}
  {#if publishMsg}<div class="status-msg">{publishMsg}</div>{/if}
  {#if $agent?.status === 'active' && !readonly}
    <button class="btn-revert" disabled={reverting} on:click={revertToDraft}>
      {reverting ? 'Reverting…' : 'Revert to Draft'}
    </button>
    {#if revertMsg}<div class="status-msg">{revertMsg}</div>{/if}
  {/if}
</div>

<div class="panel-section">
  <div class="panel-header">Trigger Config</div>
  <div class="form-group">
    <label>Trigger Type</label>
    <select bind:value={$agentConfig.triggerType}>
      <option value="rest">REST API</option>
      <option value="cron">Scheduled (Cron)</option>
      <option value="webhook">Webhook</option>
      <option value="integration">Integration Event</option>
    </select>
  </div>

  {#if $agentConfig.triggerType === 'integration'}
    {#if agentTriggers.length > 0}
      <div class="form-group">
        <label>Registered Triggers</label>
        {#each agentTriggers as trig}
          <div class="trigger-row">
            <div class="trigger-info">
              <span class="trigger-service">{trig.service}</span>
              {#if trig.eventFilter}<span class="trigger-filter">{trig.eventFilter}</span>{/if}
              <code class="trigger-url">{trig.url}</code>
            </div>
            <button class="trigger-remove" title="Remove trigger"
              on:click={() => removeIntegrationTrigger(trig.id)}>✕</button>
          </div>
        {/each}
      </div>
    {/if}
    <div class="form-group">
      <label>Service</label>
      <select bind:value={integService}>
        <option value="">— select a service —</option>
        {#each integrationTypes as t}
          <option value={t.service}>{t.displayName}</option>
        {/each}
      </select>
    </div>
    <div class="form-group">
      <label>Event Filter (optional)</label>
      <input type="text" bind:value={integEventFilter} placeholder="e.g. app_mention — blank for all events" />
    </div>
    <div class="form-group">
      <label>Signing Secret</label>
      <input type="password" bind:value={integSecret} placeholder="the service's webhook signing secret" />
      <div class="field-hint">Used to verify inbound event signatures. Never displayed after registration.</div>
    </div>
    <button class="btn-save" disabled={registering || !integService || !integSecret}
      on:click={registerIntegrationTrigger}>
      {registering ? 'Registering…' : 'Register Trigger'}
    </button>
    {#if integMsg}<div class="status-msg">{integMsg}</div>{/if}
  {/if}

  {#if $agentConfig.triggerType === 'cron'}
    <div class="form-group">
      <label>Cron Expression</label>
      <input
        type="text"
        bind:value={$agentConfig.cronExpression}
        placeholder="0 * * * * (every hour)"
      />
      <div class="field-hint">Standard cron format: minute hour day month weekday</div>
    </div>
  {/if}

  {#if $agentConfig.triggerType === 'webhook'}
    <div class="form-group">
      <label>Webhook URL</label>
      {#if $agentConfig.webhookUrl}
        <div class="webhook-url">
          <code>{$agentConfig.webhookUrl}</code>
          <div class="field-hint">POST your payload to this URL. No auth headers required.</div>
        </div>
      {:else}
        <div class="field-hint">Publish the agent to generate the webhook URL.</div>
      {/if}
    </div>
  {/if}

  <div class="form-group">
    <label>Description</label>
    <input
      type="text"
      bind:value={$agentConfig.description}
      placeholder="What does this agent do?"
    />
  </div>
  <button class="btn-save" disabled={saving} on:click={saveTriggerConfig}>
    {saving ? 'Saving…' : 'Save'}
  </button>
  {#if saveMsg}<div class="status-msg">{saveMsg}</div>{/if}
</div>

<style>
  .panel-section { padding: 1rem; border-bottom: 1px solid #2d3148; }
  .panel-header { font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.08em; color: #475569; margin-bottom: 0.75rem; }
  .agent-name { font-size: 0.9375rem; font-weight: 600; color: #e2e8f0; margin-bottom: 0.25rem; }
  .agent-status { font-size: 0.75rem; color: #94a3b8; margin-bottom: 1rem; }
  .status-active { color: #86efac; }
  .status-draft { color: #fbbf24; }
  .btn-row { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
  .form-group { margin-bottom: 0.75rem; }
  label { display: block; font-size: 0.6875rem; color: #94a3b8; margin-bottom: 0.25rem; }
  input { background: #0f1117; border: 1px solid #2d3148; border-radius: 4px; color: #e2e8f0; padding: 0.375rem 0.625rem; font-size: 0.8125rem; width: 100%; box-sizing: border-box; }
  .readonly-input { opacity: 0.5; cursor: not-allowed; }
  .btn-draft { flex: 1; background: #1e3a5f; color: #93c5fd; border: 1px solid #1e40af; border-radius: 6px; padding: 0.5rem 0.5rem; font-size: 0.8125rem; cursor: pointer; }
  .btn-draft:hover:not(:disabled) { background: #1e40af; }
  .btn-draft:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn-publish { flex: 1; background: #7c6af7; color: #fff; border: none; border-radius: 6px; padding: 0.5rem 0.5rem; font-size: 0.8125rem; cursor: pointer; }
  .btn-publish:hover:not(:disabled) { background: #6b57f0; }
  .btn-publish:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn-revert { background: transparent; border: 1px solid #7f2121; color: #fca5a5; border-radius: 4px; padding: 0.375rem 0.75rem; font-size: 0.75rem; cursor: pointer; width: 100%; margin-top: 0.5rem; }
  .btn-revert:hover:not(:disabled) { background: #3b1f1f; }
  .btn-revert:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn-save { background: #1e3a5f; color: #93c5fd; border: 1px solid #1e40af; border-radius: 6px; padding: 0.375rem 0.75rem; font-size: 0.8125rem; cursor: pointer; width: 100%; }
  .btn-save:hover:not(:disabled) { background: #1e40af; }
  .btn-save:disabled { opacity: 0.5; cursor: not-allowed; }
  .status-msg { font-size: 0.75rem; color: #94a3b8; margin-top: 0.5rem; }
  select { background: #0f1117; border: 1px solid #2d3148; border-radius: 4px; color: #e2e8f0; padding: 0.375rem 0.625rem; font-size: 0.8125rem; width: 100%; }
  .field-hint { font-size: 0.6875rem; color: #475569; margin-top: 0.25rem; }
  .webhook-url { background: #0a0c14; border: 1px solid #2d3148; border-radius: 4px; padding: 0.5rem; }
  .webhook-url code { font-size: 0.6875rem; color: #93c5fd; word-break: break-all; }
  .trigger-row { display: flex; align-items: flex-start; gap: 0.375rem; background: #0a0c14; border: 1px solid #2d3148; border-radius: 4px; padding: 0.5rem; margin-bottom: 0.375rem; }
  .trigger-info { flex: 1; min-width: 0; }
  .trigger-service { font-size: 0.75rem; color: #e2e8f0; font-weight: 600; margin-right: 0.375rem; }
  .trigger-filter { font-size: 0.6875rem; color: #f59e0b; font-family: monospace; }
  .trigger-url { display: block; font-size: 0.625rem; color: #93c5fd; word-break: break-all; margin-top: 0.25rem; }
  .trigger-remove { background: none; border: none; color: #fca5a5; cursor: pointer; font-size: 0.75rem; flex-shrink: 0; }
</style>

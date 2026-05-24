import App from './App.svelte';
import { mount } from 'svelte';

const target = document.getElementById('canvas-mount');
if (target) {
  const agentId = target.getAttribute('data-agent-id') ?? '';
  mount(App, { target, props: { agentId } });
}

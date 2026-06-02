import { ALL_NODES } from '@magicaal/nodes';
import { registry } from './node-registry';
import { logger } from '../lib/logger';
import { providerAdapterRegistry } from '../router/provider-adapter-registry';
import { openAIAdapter } from '../router/adapters/openai';
import { anthropicAdapter } from '../router/adapters/anthropic';
import { googleAdapter } from '../router/adapters/google';

export function registerNodes(): void {
  for (const node of ALL_NODES) {
    registry.register(node);
  }
  logger.info({ count: ALL_NODES.length }, 'Node registry initialized');
}

export function registerAdapters(): void {
  providerAdapterRegistry.register(openAIAdapter);
  providerAdapterRegistry.register(anthropicAdapter);
  providerAdapterRegistry.register(googleAdapter);
  logger.info(
    { providers: providerAdapterRegistry.list() },
    'Provider adapter registry initialized',
  );
}

import { ALL_NODES } from '@magicaal/nodes';
import type { IntegrationPackage } from '@magicaal/sdk-node';
import { SLACK_INTEGRATION } from '@magicaal/integration-slack';
import { registry } from './node-registry';
import { integrationRegistry } from './integration-registry';
import { logger } from '../lib/logger';
import { providerAdapterRegistry } from '../router/provider-adapter-registry';
import { openAIAdapter } from '../router/adapters/openai';
import { anthropicAdapter } from '../router/adapters/anthropic';
import { googleAdapter } from '../router/adapters/google';

/** Built-in first-party integration packages, registered at startup. */
const BUILT_IN_INTEGRATIONS: IntegrationPackage[] = [SLACK_INTEGRATION];

export function registerNodes(): void {
  for (const node of ALL_NODES) {
    registry.register(node);
  }
  logger.info({ count: ALL_NODES.length }, 'Node registry initialized');
}

export function registerIntegrations(): void {
  for (const pkg of BUILT_IN_INTEGRATIONS) {
    integrationRegistry.register(pkg);
    for (const node of pkg.nodes) {
      registry.register(node);
    }
  }
  logger.info(
    { services: integrationRegistry.listAll().map((p) => p.service) },
    'Integration registry initialized',
  );
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

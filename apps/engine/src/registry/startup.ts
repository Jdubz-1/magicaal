import { ALL_NODES } from '@magicaal/nodes';
import { ALL_CAAL_TOOLS } from '@magicaal/integration-caal';
import type { IntegrationPackage } from '@magicaal/sdk-node';
import { SLACK_INTEGRATION } from '@magicaal/integration-slack';
import { GITHUB_INTEGRATION } from '@magicaal/integration-github';
import { JIRA_INTEGRATION } from '@magicaal/integration-jira';
import { GMAIL_INTEGRATION } from '@magicaal/integration-gmail';
import { SENDGRID_INTEGRATION } from '@magicaal/integration-sendgrid';
import { STRIPE_INTEGRATION } from '@magicaal/integration-stripe';
import { GOOGLE_WORKSPACE_INTEGRATION } from '@magicaal/integration-google-workspace';
import { SALESFORCE_INTEGRATION } from '@magicaal/integration-salesforce';
import { HUBSPOT_INTEGRATION } from '@magicaal/integration-hubspot';
import { ZENDESK_INTEGRATION } from '@magicaal/integration-zendesk';
import { TWILIO_INTEGRATION } from '@magicaal/integration-twilio';
import { QUICKBOOKS_INTEGRATION } from '@magicaal/integration-quickbooks';
import { BAMBOOHR_INTEGRATION } from '@magicaal/integration-bamboohr';
import { SHOPIFY_INTEGRATION } from '@magicaal/integration-shopify';
import { registry } from './node-registry';
import { integrationRegistry } from './integration-registry';
import { logger } from '../lib/logger';
import { providerAdapterRegistry } from '../router/provider-adapter-registry';
import { openAIAdapter } from '../router/adapters/openai';
import { anthropicAdapter } from '../router/adapters/anthropic';
import { googleAdapter } from '../router/adapters/google';

/** Built-in first-party integration packages, registered at startup. */
const BUILT_IN_INTEGRATIONS: IntegrationPackage[] = [
  SLACK_INTEGRATION,
  GITHUB_INTEGRATION,
  JIRA_INTEGRATION,
  GMAIL_INTEGRATION,
  SENDGRID_INTEGRATION,
  STRIPE_INTEGRATION,
  GOOGLE_WORKSPACE_INTEGRATION,
  SALESFORCE_INTEGRATION,
  HUBSPOT_INTEGRATION,
  ZENDESK_INTEGRATION,
  TWILIO_INTEGRATION,
  QUICKBOOKS_INTEGRATION,
  BAMBOOHR_INTEGRATION,
  SHOPIFY_INTEGRATION,
];

export function registerNodes(): void {
  for (const node of ALL_NODES) {
    registry.register(node);
  }
  logger.info({ count: ALL_NODES.length }, 'Node registry initialized');
}

/**
 * Caal's platform/graph/proposal/canvas tools are standalone NodeModules —
 * not core:tool graph nodes, not an IntegrationPackage — registered directly
 * into the same registry so tool edges that reference them by type name
 * (agents/caal.agent.ts's this.tool('caal.graph.read', ...) calls) resolve
 * to something at runtime. Previously unregistered entirely: every one of
 * Caal's tool edges silently produced zero assembled tools.
 */
export function registerCaalTools(): void {
  for (const tool of ALL_CAAL_TOOLS) {
    registry.register(tool);
  }
  logger.info({ count: ALL_CAAL_TOOLS.length }, 'Caal tool registry initialized');
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

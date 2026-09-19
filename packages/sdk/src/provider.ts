import type {
  CanonicalLLMRequest,
  CanonicalLLMResponse,
  ModelRouterTarget,
  RouterTriggerCondition,
} from '@magicaal/core';
import type { ResolvedCredentials } from './context';
import type { IntegrationAuthField } from './integration';

/** A model offered as a preset when connecting a provider or picking a model in Studio. */
export interface ProviderModelOption {
  id: string;
  label: string;
  contextWindow?: number;
  /** Preselected when the user hasn't chosen a model yet. */
  recommended?: boolean;
}

/**
 * Catalog metadata for a model provider. The Admin "Model Providers" section
 * and the Studio model picker are rendered from these, so a new adapter
 * surfaces in the UI without UI changes.
 */
export interface ProviderDescriptor {
  /** Equals integration_connections.service and ModelRouterTarget.provider. */
  provider: string;
  displayName: string;
  description: string;
  /** Where the user obtains an API key. */
  apiKeyUrl?: string;
  /** Fields stored (encrypted) in integration_connections.credentials_enc. */
  authFields: IntegrationAuthField[];
  /** Curated presets; users can still enter any other model id. */
  models: ProviderModelOption[];
}

export interface CredentialValidationResult {
  ok: boolean;
  reason?: 'invalid_key' | 'unreachable' | 'unknown';
  message?: string;
}

export interface ProviderAdapter {
  readonly provider: string;
  /** Catalog metadata; adapters without one are callable but not offered as presets. */
  readonly descriptor?: ProviderDescriptor;
  /** Cheap, token-free check that the credentials are accepted by the provider. */
  validateCredentials?(credentials: ResolvedCredentials): Promise<CredentialValidationResult>;
  call(
    request: CanonicalLLMRequest,
    target: ModelRouterTarget,
    credentials: ResolvedCredentials,
  ): Promise<CanonicalLLMResponse>;
  stream(
    request: CanonicalLLMRequest,
    target: ModelRouterTarget,
    credentials: ResolvedCredentials,
  ): AsyncGenerator<CanonicalLLMResponse>;
  translateError(error: unknown): RouterTriggerCondition | null;
}

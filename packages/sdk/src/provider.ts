import type {
  CanonicalLLMRequest,
  CanonicalLLMResponse,
  ModelRouterTarget,
  RouterTriggerCondition,
} from '@magicaal/core';
import type { ResolvedCredentials } from './context';

export interface ProviderAdapter {
  readonly provider: string;
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

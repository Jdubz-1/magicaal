import type {
  CanonicalLLMRequest,
  CanonicalLLMResponse,
  ModelRouterTarget,
  RouterTriggerCondition,
} from '@magicaal/core';

export interface ProviderAdapter {
  readonly provider: string;
  call(
    request: CanonicalLLMRequest,
    target: ModelRouterTarget,
  ): Promise<CanonicalLLMResponse>;
  stream(
    request: CanonicalLLMRequest,
    target: ModelRouterTarget,
  ): AsyncGenerator<CanonicalLLMResponse>;
  translateError(error: unknown): RouterTriggerCondition | null;
}

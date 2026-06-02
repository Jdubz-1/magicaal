import type { ProviderAdapter } from '@magicaal/sdk-node';
import { logger } from '../lib/logger';

class ProviderAdapterRegistry {
  private readonly adapters = new Map<string, ProviderAdapter>();

  register(adapter: ProviderAdapter): void {
    this.adapters.set(adapter.provider, adapter);
    logger.debug({ provider: adapter.provider }, 'Provider adapter registered');
  }

  get(provider: string): ProviderAdapter {
    const adapter = this.adapters.get(provider);
    if (!adapter) {
      throw Object.assign(
        new Error(`No provider adapter registered for "${provider}". Available: ${this.list().join(', ')}`),
        { code: 'PROVIDER_NOT_FOUND' },
      );
    }
    return adapter;
  }

  has(provider: string): boolean {
    return this.adapters.has(provider);
  }

  list(): string[] {
    return [...this.adapters.keys()];
  }
}

export const providerAdapterRegistry = new ProviderAdapterRegistry();

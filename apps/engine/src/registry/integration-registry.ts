import type { IntegrationPackage } from '@magicaal/sdk-node';

class IntegrationRegistry {
  private packages = new Map<string, IntegrationPackage>();

  register(pkg: IntegrationPackage): void {
    this.packages.set(pkg.service, pkg);
  }

  get(service: string): IntegrationPackage {
    const pkg = this.packages.get(service);
    if (!pkg) {
      throw Object.assign(new Error(`Unknown integration service: ${service}`), {
        status: 404,
        code: 'INTEGRATION_NOT_FOUND',
      });
    }
    return pkg;
  }

  has(service: string): boolean {
    return this.packages.has(service);
  }

  listAll(): IntegrationPackage[] {
    return Array.from(this.packages.values());
  }
}

export const integrationRegistry = new IntegrationRegistry();

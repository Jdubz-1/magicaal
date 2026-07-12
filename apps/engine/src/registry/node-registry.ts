import type { NodeModule } from '@magicaal/sdk-node';

export interface NodeRegistrySnapshot {
  readonly generation: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(type: string): NodeModule<any>;
  listAll(): NodeModule[];
  /**
   * The package a node type came from, as `{publisher}/{name}`, or undefined
   * for a built-in. Callers use this to enforce per-tenant entitlement:
   * built-ins are available to everyone, package nodes only to the tenants
   * that installed them.
   */
  packageOf(type: string): string | undefined;
}

function lookupOrThrow(modules: Map<string, NodeModule>, type: string): NodeModule {
  const module = modules.get(type);
  if (!module) {
    throw Object.assign(new Error(`Unknown node type: ${type}`), {
      status: 400,
      code: 'NODE_TYPE_NOT_FOUND',
    });
  }
  return module;
}

class NodeRegistry {
  private modules = new Map<string, NodeModule>();
  /** type → owning packageId. Only package-provided types appear here. */
  private provenance = new Map<string, string>();
  private gen = 0;

  register(module: NodeModule): void {
    this.modules.set(module.type, module);
  }

  /**
   * Register modules from a hot-loaded package. Copy-on-write: the live maps
   * are replaced rather than mutated, so snapshots taken by in-flight runs
   * keep resolving against the registry as it was when their run started.
   *
   * `packageId` is `{publisher}/{name}` — version-agnostic, so updating a
   * package does not revoke an existing tenant's entitlement to its nodes.
   */
  hotLoad(modules: NodeModule[], packageId: string): number {
    const nextModules = new Map(this.modules);
    const nextProvenance = new Map(this.provenance);

    for (const module of modules) {
      nextModules.set(module.type, module);
      nextProvenance.set(module.type, packageId);
    }

    this.modules = nextModules;
    this.provenance = nextProvenance;
    this.gen++;
    return this.gen;
  }

  /**
   * Stable view for a single run. Captures the current map references; later
   * hotLoad() calls do not affect it.
   */
  snapshot(): NodeRegistrySnapshot {
    const modules = this.modules;
    const provenance = this.provenance;
    const generation = this.gen;
    return {
      generation,
      get: (type: string) => lookupOrThrow(modules, type),
      listAll: () => Array.from(modules.values()),
      packageOf: (type: string) => provenance.get(type),
    };
  }

  get generation(): number {
    return this.gen;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(type: string): NodeModule<any> {
    return lookupOrThrow(this.modules, type);
  }

  listAll(): NodeModule[] {
    return Array.from(this.modules.values());
  }

  packageOf(type: string): string | undefined {
    return this.provenance.get(type);
  }
}

export const registry = new NodeRegistry();

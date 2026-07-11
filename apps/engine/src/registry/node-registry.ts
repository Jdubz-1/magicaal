import type { NodeModule } from '@magicaal/sdk-node';

export interface NodeRegistrySnapshot {
  readonly generation: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(type: string): NodeModule<any>;
  listAll(): NodeModule[];
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
  private gen = 0;

  register(module: NodeModule): void {
    this.modules.set(module.type, module);
  }

  /**
   * Register modules from a hot-loaded package. Copy-on-write: the live map
   * is replaced rather than mutated, so snapshots taken by in-flight runs
   * keep resolving against the registry as it was when their run started.
   */
  hotLoad(modules: NodeModule[]): number {
    const next = new Map(this.modules);
    for (const module of modules) {
      next.set(module.type, module);
    }
    this.modules = next;
    this.gen++;
    return this.gen;
  }

  /**
   * Stable view for a single run. Captures the current map reference; later
   * hotLoad() calls do not affect it.
   */
  snapshot(): NodeRegistrySnapshot {
    const modules = this.modules;
    const generation = this.gen;
    return {
      generation,
      get: (type: string) => lookupOrThrow(modules, type),
      listAll: () => Array.from(modules.values()),
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
}

export const registry = new NodeRegistry();

import type { NodeModule } from '@magicaal/sdk-node';

class NodeRegistry {
  private modules = new Map<string, NodeModule>();

  register(module: NodeModule): void {
    this.modules.set(module.type, module);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(type: string): NodeModule<any> {
    const module = this.modules.get(type);
    if (!module) {
      throw Object.assign(new Error(`Unknown node type: ${type}`), {
        status: 400,
        code: 'NODE_TYPE_NOT_FOUND',
      });
    }
    return module;
  }

  listAll(): NodeModule[] {
    return Array.from(this.modules.values());
  }
}

export const registry = new NodeRegistry();

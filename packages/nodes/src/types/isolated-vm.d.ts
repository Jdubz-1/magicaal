// Minimal type stubs for isolated-vm (optional native dependency)
// Full types are available when the package is installed with native bindings.
declare module 'isolated-vm' {
  export class Isolate {
    constructor(options?: { memoryLimit?: number });
    createContext(): Promise<Context>;
    compileScript(code: string): Promise<Script>;
    dispose(): void;
  }

  export class Context {
    global: Reference;
  }

  export class Script {
    run(context: Context, options?: { timeout?: number }): Promise<void>;
  }

  export class Reference {
    set(key: string, value: unknown): Promise<void>;
    get(key: string, options?: { reference?: boolean }): Promise<Reference>;
    copy(): Promise<unknown>;
  }

  export class ExternalCopy<T = unknown> {
    constructor(value: T);
    copyInto(options?: { release?: boolean }): T;
  }
}

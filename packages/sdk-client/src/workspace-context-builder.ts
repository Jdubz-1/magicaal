export interface ContextSchemaDefinition {
  [key: string]: {
    type: 'append' | 'replace' | 'merge';
    maxItems?: number;
  };
}

export interface ContextMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

export interface ContextDocument {
  id: string;
  title: string;
  content: string;
}

export class WorkspaceContextBuilder {
  private _messages: ContextMessage[] = [];
  private _currentFile: { path: string; content: string } | null = null;
  private _documents: ContextDocument[] = [];
  private _extra: Record<string, unknown> = {};

  constructor(private readonly schema?: ContextSchemaDefinition) {}

  addMessage(role: 'user' | 'assistant', content: string): this {
    this._messages.push({ role, content, timestamp: Date.now() });
    return this;
  }

  setCurrentFile(path: string, content: string): this {
    this._currentFile = { path, content };
    return this;
  }

  addDocument(doc: ContextDocument): this {
    this._documents.push(doc);
    return this;
  }

  set(key: string, value: unknown): this {
    this._extra[key] = value;
    return this;
  }

  toInput(): Record<string, unknown> {
    const input: Record<string, unknown> = { ...this._extra };

    if (this._messages.length > 0) {
      input['messages'] = this._messages;
    }

    if (this._currentFile) {
      input['currentFile'] = this._currentFile;
    }

    if (this._documents.length > 0) {
      input['documents'] = this._documents;
    }

    return input;
  }
}

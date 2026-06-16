import { spawn, ChildProcess } from 'node:child_process';
import { logger } from '../lib/logger';

export interface McpServerConfig {
  id: string;
  transport: 'stdio' | 'http';
  url?: string;
  command?: string;
  args?: string[];
  env?: Record<string, string>;
}

export interface McpTool {
  name: string;
  description: string;
  inputSchema: object;
}

type JsonRpcRequest = { jsonrpc: '2.0'; id: number; method: string; params?: unknown };
type JsonRpcResponse = { jsonrpc: '2.0'; id: number; result?: unknown; error?: { code: number; message: string } };

export class McpClient {
  private _config: McpServerConfig;
  private _process: ChildProcess | null = null;
  private _idCounter = 1;
  private _pendingRequests = new Map<number, { resolve: (v: unknown) => void; reject: (e: Error) => void }>();
  private _buffer = '';
  private _capabilities: Record<string, unknown> = {};

  constructor(config: McpServerConfig) {
    this._config = config;
  }

  async connect(): Promise<void> {
    if (this._config.transport === 'stdio') {
      await this._connectStdio();
    }
    // HTTP transport connects lazily per request
  }

  private async _connectStdio(): Promise<void> {
    const { command, args, env } = this._config;
    if (!command) throw new Error('McpClient: command required for stdio transport');

    this._process = spawn(command, args ?? [], {
      env: { ...process.env, ...env },
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    this._process.stdout?.on('data', (chunk: Buffer) => {
      this._buffer += chunk.toString();
      this._drainBuffer();
    });

    this._process.stderr?.on('data', (chunk: Buffer) => {
      logger.debug({ serverId: this._config.id }, `MCP stderr: ${chunk.toString().trim()}`);
    });

    this._process.on('error', (err) => {
      logger.error({ serverId: this._config.id, err }, 'MCP process error');
      for (const [, { reject }] of this._pendingRequests) reject(err);
      this._pendingRequests.clear();
    });

    this._process.on('exit', (code) => {
      if (code !== 0 && code !== null) {
        logger.warn({ serverId: this._config.id, code }, 'MCP process exited with non-zero code');
      }
    });
  }

  private _drainBuffer(): void {
    const lines = this._buffer.split('\n');
    this._buffer = lines.pop() ?? '';
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        const msg = JSON.parse(trimmed) as JsonRpcResponse;
        const pending = this._pendingRequests.get(msg.id);
        if (!pending) continue;
        this._pendingRequests.delete(msg.id);
        if (msg.error) {
          pending.reject(new Error(`MCP error ${msg.error.code}: ${msg.error.message}`));
        } else {
          pending.resolve(msg.result);
        }
      } catch {
        // ignore malformed lines
      }
    }
  }

  private async _send(method: string, params?: unknown): Promise<unknown> {
    const id = this._idCounter++;
    const req: JsonRpcRequest = { jsonrpc: '2.0', id, method, params };

    if (this._config.transport === 'stdio') {
      return new Promise((resolve, reject) => {
        this._pendingRequests.set(id, { resolve, reject });
        const line = JSON.stringify(req) + '\n';
        this._process?.stdin?.write(line, (err) => {
          if (err) {
            this._pendingRequests.delete(id);
            reject(err);
          }
        });
      });
    } else {
      // HTTP Streamable transport
      const resp = await fetch(this._config.url!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      const body = await resp.json() as JsonRpcResponse;
      if (body.error) throw new Error(`MCP error ${body.error.code}: ${body.error.message}`);
      return body.result;
    }
  }

  async initialize(): Promise<void> {
    const result = await this._send('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'magicaal-engine', version: '0.1.0' },
    }) as { capabilities?: Record<string, unknown> };
    this._capabilities = result?.capabilities ?? {};
    // Send initialized notification (fire-and-forget per MCP spec, but await flush)
    const notification = JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n';
    if (this._config.transport === 'stdio') {
      await new Promise<void>((resolve, reject) =>
        this._process?.stdin?.write(notification, (err) => (err ? reject(err) : resolve())),
      );
    } else {
      // HTTP: send as a one-way POST; server may not respond (notifications/initialized has no response)
      await fetch(this._config.url!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: notification.trim(),
      }).catch(() => { /* notifications are fire-and-forget; ignore HTTP errors */ });
    }
  }

  async listTools(): Promise<McpTool[]> {
    const result = await this._send('tools/list') as { tools?: Array<{ name: string; description?: string; inputSchema?: object }> };
    return (result?.tools ?? []).map((t) => ({
      name: t.name,
      description: t.description ?? '',
      inputSchema: t.inputSchema ?? {},
    }));
  }

  async callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
    const result = await this._send('tools/call', { name, arguments: args }) as { content?: Array<{ type: string; text?: string }> };
    const content = result?.content ?? [];
    const text = content.filter((c) => c.type === 'text').map((c) => c.text ?? '').join('\n');
    return text || JSON.stringify(result);
  }

  async disconnect(): Promise<void> {
    if (this._process) {
      this._process.stdin?.end();
      this._process.kill();
      this._process = null;
    }
    this._pendingRequests.clear();
  }

  get capabilities(): Record<string, unknown> {
    return this._capabilities;
  }
}

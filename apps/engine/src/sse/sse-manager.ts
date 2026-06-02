import type { Response } from 'express';
import { logger } from '../lib/logger';

class SseManager {
  private readonly connections = new Map<string, Set<Response>>();

  subscribe(runId: string, res: Response): void {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    if (!this.connections.has(runId)) {
      this.connections.set(runId, new Set());
    }
    this.connections.get(runId)!.add(res);

    res.on('close', () => {
      this._unsubscribe(runId, res);
    });

    logger.debug({ runId }, 'SSE client subscribed');
  }

  broadcast(runId: string, event: string, payload: unknown): void {
    const subscribers = this.connections.get(runId);
    if (!subscribers || subscribers.size === 0) return;

    const frame = `event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`;
    for (const res of subscribers) {
      try {
        res.write(frame);
      } catch {
        this._unsubscribe(runId, res);
      }
    }
  }

  close(runId: string): void {
    const subscribers = this.connections.get(runId);
    if (!subscribers) return;

    for (const res of subscribers) {
      try {
        res.end();
      } catch {
        // connection already closed
      }
    }
    this.connections.delete(runId);
    logger.debug({ runId }, 'SSE connections closed');
  }

  private _unsubscribe(runId: string, res: Response): void {
    const subscribers = this.connections.get(runId);
    if (!subscribers) return;
    subscribers.delete(res);
    if (subscribers.size === 0) {
      this.connections.delete(runId);
    }
  }
}

export const sseManager = new SseManager();

import type { SessionConfig, ModelRouterConfig } from '@magicaal/core';
import { config } from '../config';
import { logger } from '../lib/logger';

export interface LoadedSession {
  contextEntries: Map<string, unknown>;
}

type ApiSessionResponse = {
  session: { id: string; status: string; schemaVersion: number };
  contextEntries: Record<string, unknown>;
};

type ExpireResponse = { expired: number };

export class SessionManager {
  private get baseUrl(): string {
    return config.apiBaseUrl;
  }

  async loadSession(
    sessionId: string,
    agentId: string,
    tenantId: string,
    sessionConfig: SessionConfig,
  ): Promise<LoadedSession> {
    // POST rather than GET: the API applies the schema migration chain
    // (ARCHITECTURE §14.5) against the agent's current SessionConfig and
    // asserts session↔agent↔tenant ownership before returning context.
    const url = `${this.baseUrl}/internal/sessions/${encodeURIComponent(sessionId)}/load`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Auth': config.masterKey,
      },
      body: JSON.stringify({ agentId, tenantId, sessionConfig }),
    });

    if (res.status === 404) {
      // Session not found — create it and return empty entries
      await this.createSession(sessionId, agentId, tenantId, sessionConfig);
      return { contextEntries: new Map() };
    }

    if (!res.ok) {
      const body = await res.text();
      throw Object.assign(
        new Error(`Failed to load session ${sessionId}: ${res.status} ${body}`),
        { code: 'SESSION_LOAD_ERROR', retryable: false },
      );
    }

    const data = await res.json() as ApiSessionResponse;

    if (data.session.status === 'expired') {
      throw Object.assign(
        new Error(`Session ${sessionId} has expired`),
        { code: 'SESSION_EXPIRED', status: 410, retryable: false },
      );
    }

    const contextEntries = new Map<string, unknown>(Object.entries(data.contextEntries));
    return { contextEntries };
  }

  async createSession(
    sessionId: string,
    agentId: string,
    tenantId: string,
    sessionConfig: SessionConfig,
  ): Promise<void> {
    const url = `${this.baseUrl}/internal/sessions`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Auth': config.masterKey,
      },
      body: JSON.stringify({ sessionId, agentId, tenantId, sessionConfig }),
    });

    if (!res.ok && res.status !== 409) {
      const body = await res.text();
      throw Object.assign(
        new Error(`Failed to create session ${sessionId}: ${res.status} ${body}`),
        { code: 'SESSION_CREATE_ERROR', retryable: false },
      );
    }
  }

  async saveSession(
    sessionId: string,
    runId: string,
    contextData: Record<string, unknown>,
    sessionConfig: SessionConfig,
    defaultRouter?: ModelRouterConfig | null,
  ): Promise<void> {
    const url = `${this.baseUrl}/internal/sessions/${encodeURIComponent(sessionId)}/save`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Auth': config.masterKey,
      },
      // defaultRouter lets the API's summarize-overflow path route its LLM
      // call back through this engine (ALIGN-007)
      body: JSON.stringify({ runId, contextData, sessionConfig, defaultRouter: defaultRouter ?? null }),
    });

    if (!res.ok) {
      const body = await res.text();
      logger.warn(
        { sessionId, runId, status: res.status, body },
        'Session save failed — run data not persisted to session',
      );
    }
  }

  async recordRunLink(sessionId: string, runId: string, isChildRun = false): Promise<void> {
    const url = `${this.baseUrl}/internal/sessions/${encodeURIComponent(sessionId)}/run-link`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Auth': config.masterKey,
      },
      body: JSON.stringify({ runId, isChildRun }),
    }).catch((err: unknown) => {
      logger.warn({ sessionId, runId, err }, 'Failed to record session run link');
    });
  }

  async expireSessions(): Promise<void> {
    const url = `${this.baseUrl}/internal/sessions/expire`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'X-Internal-Auth': config.masterKey },
      });
      if (res.ok) {
        const data = await res.json() as ExpireResponse;
        if (data.expired > 0) {
          logger.info({ expired: data.expired }, 'Expired stale sessions');
        }
      }
    } catch (err) {
      logger.warn({ err }, 'Session expiry sweep failed');
    }
  }
}

export const sessionManager = new SessionManager();

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        tenantId: string;
        role: 'platform_admin' | 'tenant_admin' | 'developer' | 'viewer';
      };
      /**
       * Which auth plane authenticated a run request.
       *
       * - `platform`   — a tenant principal (Studio JWT or platform API key).
       *   Bypasses the agent's invocation policy, per ARCHITECTURE §11.4.
       * - `invocation` — a third-party credential validated against the agent's
       *   invocation policy by the engine (api-key / jwt / public).
       */
      caller?: {
        kind: 'platform' | 'invocation';
        strategy: string;
        keyId?: string;
      };
      /** Raw request body bytes, captured for webhook signature verification. */
      rawBody?: string;
    }
  }
}

export {};

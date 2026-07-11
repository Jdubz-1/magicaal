declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        tenantId: string;
        role: 'platform_admin' | 'tenant_admin' | 'developer' | 'viewer';
      };
      /** Raw request body bytes, captured for webhook signature verification. */
      rawBody?: string;
    }
  }
}

export {};

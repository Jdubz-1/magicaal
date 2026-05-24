declare global {
  namespace Express {
    interface Request {
      // Extend with request-scoped properties, e.g.:
      // user?: { id: string; role: string };
      user?: unknown;
    }
  }
}

export {};

import type { SessionUser } from '../middleware/session';

declare global {
  namespace Express {
    interface Locals {
      /** Per-request CSP nonce, set by the cspNonce middleware. */
      cspNonce: string;
      /**
       * A freshly minted invocation key, handed from the create handler to the
       * page that shows it once. Present only on that one response.
       */
      newKey?: string;
    }

    interface Request {
      /** Verified session payload, set by the loadSession middleware. */
      session?: SessionUser;
      /** The access token the session was read from, forwarded to the API. */
      accessToken?: string;
    }
  }
}

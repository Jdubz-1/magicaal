import type { SessionUser } from '../middleware/session';

declare global {
  namespace Express {
    interface Request {
      /** Verified session payload, set by the loadSession middleware. */
      session?: SessionUser;
      /** The access token the session was read from, forwarded to the API. */
      accessToken?: string;
    }
  }
}

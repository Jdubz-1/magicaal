import type { RequestHandler } from 'express';
import { validateInvocationRequest } from '../auth/invocation-auth';

/**
 * POST /internal/invocation-auth/validate
 *
 * Authenticates a caller against an agent's invocation policy (api-key / jwt /
 * public) and returns the resolved identity. The API calls this when a request
 * carries no *platform* credential, so the invocation plane has exactly one
 * implementation — here, where the JWKS handling and the Redis rate limiter
 * already live — rather than being duplicated in the API.
 *
 * The API is the enforcement point; this is the authority it defers to.
 */
export const validateInvocation: RequestHandler = async (req, res, next) => {
  try {
    const { agentId, authorizationHeader } = req.body as {
      agentId?: string;
      authorizationHeader?: string;
    };

    if (!agentId) {
      throw Object.assign(new Error('agentId is required'), { status: 400 });
    }

    const validated = await validateInvocationRequest(agentId, authorizationHeader);
    res.json(validated);
  } catch (err) {
    next(err);
  }
};

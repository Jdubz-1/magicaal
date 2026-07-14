import { Router, type Router as RouterType } from 'express';
import { requireAuth } from '../middleware/auth';
import { requireInternalAuth } from '../middleware/auth';
import {
  listSessions,
  getSession,
  getSessionRuns,
  deleteSession,
  resetSession,
  migrateAgentSessions,
  internalGetSession,
  internalLoadSession,
  internalCreateSession,
  internalSaveSession,
  internalRecordRunLink,
  internalExpireSessions,
} from '../controllers/sessions.controller';

// Public session routes — mounted as sub-router under /v1/agents/:id/sessions
export const sessionRouter: RouterType = Router({ mergeParams: true });

sessionRouter.get('/', requireAuth, listSessions);
sessionRouter.get('/:sid', requireAuth, getSession);
sessionRouter.get('/:sid/runs', requireAuth, getSessionRuns);
sessionRouter.delete('/:sid', requireAuth, deleteSession);
sessionRouter.post('/:sid/reset', requireAuth, resetSession);
sessionRouter.post('/migrate', requireAuth, migrateAgentSessions);

// Internal session routes — called by engine, auth via X-Internal-Auth header
export const internalSessionRouter: RouterType = Router();

internalSessionRouter.get('/:sessionId', requireInternalAuth, internalGetSession);
// Engine run-start load — carries the agent's SessionConfig so the schema
// migration chain (§14.5) can run before context injection
internalSessionRouter.post('/:sessionId/load', requireInternalAuth, internalLoadSession);
internalSessionRouter.post('/', requireInternalAuth, internalCreateSession);
internalSessionRouter.post('/expire', requireInternalAuth, internalExpireSessions);
internalSessionRouter.post('/:sessionId/save', requireInternalAuth, internalSaveSession);
internalSessionRouter.post('/:sessionId/run-link', requireInternalAuth, internalRecordRunLink);

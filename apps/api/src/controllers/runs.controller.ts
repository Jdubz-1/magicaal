import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { agents, invocationKeys } from '../db/schema';
import { engineClient } from '../lib/engine-client';

function sha256hex(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

async function resolveInvocationKey(agentId: string, authHeader: string | undefined): Promise<string | undefined> {
  if (!authHeader?.startsWith('Bearer ')) return undefined;
  const token = authHeader.slice(7);
  if (!token.startsWith('mk_')) return undefined;

  const keyHash = sha256hex(token);
  const rows = await db
    .select()
    .from(invocationKeys)
    .where(eq(invocationKeys.keyHash, keyHash));
  const key = rows[0];

  if (!key || key.revoked || key.agentId !== agentId) {
    throw Object.assign(new Error('Invalid or revoked invocation key'), { status: 401 });
  }
  if (key.expiresAt && key.expiresAt < new Date()) {
    throw Object.assign(new Error('Invocation key expired'), { status: 401 });
  }

  return token;
}

export const dispatchRun: RequestHandler = async (req, res, next) => {
  try {
    const { id: agentId } = req.params;
    const { tenantId } = req.user!;
    const { input = {}, mode = 'async' } = req.body as {
      input?: Record<string, unknown>;
      mode?: 'sync' | 'async';
    };

    const agentRows = await db.select().from(agents).where(eq(agents.id, agentId));
    const agent = agentRows[0];
    if (!agent) throw Object.assign(new Error('Agent not found'), { status: 404, code: 'AGENT_NOT_FOUND' });
    if (agent.status !== 'active' || !agent.enabled) {
      throw Object.assign(new Error('Agent is not active'), { status: 409, code: 'AGENT_NOT_ACTIVE' });
    }

    const authKey = await resolveInvocationKey(agentId, req.headers.authorization);

    const response = await engineClient.post('/internal/runs', {
      agentId,
      tenantId,
      triggerType: 'api',
      input,
      authKey,
    });

    const { runId } = response.data as { runId: string };

    if (mode === 'sync') {
      let run: { status: string; output: unknown; error: unknown } | null = null;
      const maxPolls = 60;
      for (let i = 0; i < maxPolls; i++) {
        await new Promise((r) => setTimeout(r, 1000));
        const poll = await engineClient.get(`/internal/runs/${runId}`);
        run = poll.data as { status: string; output: unknown; error: unknown };
        if (['completed', 'failed', 'suspended', 'cancelled'].includes(run.status)) break;
      }
      return res.json(run);
    }

    res.status(202).json({ runId });
  } catch (err) {
    next(err);
  }
};

export const getRun: RequestHandler = async (req, res, next) => {
  try {
    const { runId } = req.params;
    const response = await engineClient.get(`/internal/runs/${runId}`);
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

export const getRunSteps: RequestHandler = async (req, res, next) => {
  try {
    const { runId } = req.params;
    const response = await engineClient.get(`/internal/runs/${runId}/steps`);
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

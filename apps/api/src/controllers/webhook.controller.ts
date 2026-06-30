import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq, and } from 'drizzle-orm';
import { db } from '../db/client';
import { agents } from '../db/schema';
import { engineClient } from '../lib/engine-client';
import { config } from '../config';

function computeWebhookSecret(agentId: string): string {
  if (!config.masterKey) {
    throw Object.assign(
      new Error('MAGICAAL_MASTER_KEY must be set to generate webhook secrets'),
      { status: 500, code: 'MISSING_MASTER_KEY' },
    );
  }
  return crypto
    .createHmac('sha256', config.masterKey)
    .update(agentId)
    .digest('hex');
}

export function getWebhookUrl(agentId: string, baseUrl: string): string {
  const secret = computeWebhookSecret(agentId);
  return `${baseUrl}/v1/agents/${agentId}/webhook/${secret}`;
}

export const handleWebhook: RequestHandler = async (req, res, next) => {
  try {
    const { id: agentId, secret } = req.params;

    const expectedSecret = computeWebhookSecret(agentId);
    const secretBuf = Buffer.from(secret);
    const expectedBuf = Buffer.from(expectedSecret);
    if (
      secretBuf.length !== expectedBuf.length ||
      !crypto.timingSafeEqual(secretBuf, expectedBuf)
    ) {
      throw Object.assign(new Error('Invalid webhook secret'), { status: 401 });
    }

    const agentRows = await db
      .select()
      .from(agents)
      .where(and(eq(agents.id, agentId), eq(agents.enabled, true)));

    const agent = agentRows[0];
    if (!agent) {
      throw Object.assign(new Error('Agent not found or not enabled'), { status: 404 });
    }

    if (agent.status !== 'active') {
      throw Object.assign(new Error('Agent is not active'), { status: 409, code: 'AGENT_NOT_ACTIVE' });
    }

    const response = await engineClient.post(
      `/internal/agents/${agentId}/webhook`,
      req.body,
      { headers: { 'x-tenant-id': agent.tenantId } },
    );

    res.status(202).json(response.data);
  } catch (err) {
    next(err);
  }
};

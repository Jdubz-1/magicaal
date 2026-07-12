import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { integrationRegistry } from '../registry/integration-registry';
import { telemetryDb } from '../db/telemetry-client';
import { telemetryRuns } from '../db/telemetry-schema';
import { runTriggerQueue } from '../queue/client';
import { logger } from '../lib/logger';

function newRunId(): string {
  return `run_${crypto.randomUUID()}`;
}

/** GET /internal/integrations — integration package metadata for the API layer. */
export const listIntegrations: RequestHandler = (_req, res) => {
  const packages = integrationRegistry.listAll().map((pkg) => ({
    service: pkg.service,
    displayName: pkg.displayName,
    description: pkg.description,
    version: pkg.version,
    authType: pkg.authType,
    authSchema: pkg.authSchema,
    nodeTypes: pkg.nodes.map((n) => n.type),
    hasTrigger: pkg.trigger !== undefined,
  }));
  res.json(packages);
};

interface TriggerRegistration {
  id: string;
  agentId: string;
  eventFilter: string | null;
  secret: string;
}

/**
 * POST /internal/triggers/integrations/:service
 *
 * The API layer receives the public webhook, looks up the enabled trigger
 * registrations for (service, tenantSlug), and forwards the raw body +
 * headers here. This handler verifies the service signature per
 * registration, answers endpoint-verification handshakes, and enqueues a
 * run for every registration whose event filter matches.
 */
export const integrationTriggerDispatch: RequestHandler = async (req, res, next) => {
  try {
    const { service } = req.params;
    const { tenantId, rawBody, headers, triggers } = req.body as {
      tenantId: string;
      rawBody: string;
      headers: Record<string, string | string[] | undefined>;
      triggers: TriggerRegistration[];
    };

    if (!tenantId || typeof rawBody !== 'string' || !Array.isArray(triggers)) {
      throw Object.assign(new Error('tenantId, rawBody, and triggers are required'), {
        status: 400,
      });
    }

    const pkg = integrationRegistry.get(service);
    const handler = pkg.trigger;
    if (!handler) {
      throw Object.assign(new Error(`Integration "${service}" does not support triggers`), {
        status: 400,
        code: 'TRIGGER_NOT_SUPPORTED',
      });
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      payload = rawBody;
    }

    // A signature valid against any registration's secret authenticates the
    // request (registrations for the same service share the app's secret).
    const verified = triggers.filter((t) => handler.verifySignature(rawBody, headers, t.secret));
    if (verified.length === 0) {
      throw Object.assign(new Error('Webhook signature verification failed'), {
        status: 401,
        code: 'INVALID_SIGNATURE',
      });
    }

    // Endpoint-verification handshake (e.g. Slack url_verification) — answer
    // immediately, dispatch nothing.
    const handshakeResponse = handler.handshake?.(payload);
    if (handshakeResponse !== undefined) {
      res.status(200).json(handshakeResponse);
      return;
    }

    const eventType = handler.eventType(payload, headers);
    const matched = verified.filter(
      (t) => !t.eventFilter || t.eventFilter === eventType,
    );

    const now = new Date();
    const runIds: string[] = [];

    for (const trigger of matched) {
      const runId = newRunId();

      await telemetryDb.insert(telemetryRuns).values({
        id: runId,
        tenantId,
        agentId: trigger.agentId,
        triggerType: 'integration',
        status: 'pending',
        startedAt: now,
        inputJson: JSON.stringify({ service, eventType, payload }),
        totalPromptTokens: 0,
        totalCompletionTokens: 0,
        estimatedCostUsd: 0,
      });

      await runTriggerQueue.add('run', {
        runId,
        agentId: trigger.agentId,
        tenantId,
        triggerType: 'integration',
        input: { service, eventType, payload },
      });

      runIds.push(runId);
    }

    logger.info(
      { service, eventType, matched: matched.length, runIds },
      'Integration trigger dispatched',
    );

    res.status(202).json({ runIds, eventType });
  } catch (err) {
    next(err);
  }
};

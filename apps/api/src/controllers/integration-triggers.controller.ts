import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq, and } from 'drizzle-orm';
import { db } from '../db/client';
import { integrationTriggers, tenants, agents } from '../db/schema';
import { engineClient } from '../lib/engine-client';
import { encryptCredentials, decryptCredentials } from '../lib/credentials';
import { config } from '../config';

function newId(): string {
  return crypto.randomUUID();
}

/**
 * Decrypt a stored trigger secret.
 *
 * Secrets were stored in plaintext before they were treated as credentials;
 * backfillTriggerSecrets() re-encrypts them at boot. A row that fails to
 * decrypt is assumed to be a legacy plaintext value and used as-is, so a
 * deployment mid-upgrade keeps verifying webhooks rather than failing closed
 * on every delivery.
 */
function decryptTriggerSecret(stored: string): string {
  try {
    return decryptCredentials(stored);
  } catch {
    return stored;
  }
}

/** Reject services the engine has no trigger-capable integration package for. */
async function assertServiceSupportsTriggers(service: string): Promise<void> {
  const { data } = await engineClient.get('/internal/integrations');
  const pkg = (data as Array<{ service: string; hasTrigger?: boolean }>).find(
    (p) => p.service === service,
  );

  if (!pkg) {
    throw Object.assign(new Error(`Unknown integration service: ${service}`), {
      status: 400,
      code: 'INTEGRATION_NOT_FOUND',
    });
  }
  if (!pkg.hasTrigger) {
    throw Object.assign(new Error(`Integration "${service}" does not support triggers`), {
      status: 400,
      code: 'TRIGGER_NOT_SUPPORTED',
    });
  }
}

/** GET /v1/integrations — available integration types from the engine registry. */
export const listIntegrationTypes: RequestHandler = async (_req, res, next) => {
  try {
    const response = await engineClient.get('/internal/integrations');
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

/** GET /v1/integrations/triggers — this tenant's trigger registrations. */
export const listTriggers: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const rows = await db
      .select({
        id: integrationTriggers.id,
        service: integrationTriggers.service,
        tenantSlug: integrationTriggers.tenantSlug,
        agentId: integrationTriggers.agentId,
        eventFilter: integrationTriggers.eventFilter,
        enabled: integrationTriggers.enabled,
        createdAt: integrationTriggers.createdAt,
      })
      .from(integrationTriggers)
      .where(eq(integrationTriggers.tenantId, tenantId));

    const withUrls = rows.map((row) => ({
      ...row,
      url: `${config.publicBaseUrl}/v1/triggers/integrations/${row.service}/${row.tenantSlug}`,
    }));

    res.json(withUrls);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /v1/integrations/triggers — register an agent for a service's events.
 * `secret` is the service's webhook signing secret (e.g. the Slack app
 * signing secret); inbound event signatures are verified against it.
 */
export const createTrigger: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { service, agentId, eventFilter, secret } = req.body as {
      service?: string;
      agentId?: string;
      eventFilter?: string;
      secret?: string;
    };

    if (!service || !agentId || !secret) {
      throw Object.assign(new Error('service, agentId, and secret are required'), {
        status: 400,
      });
    }

    // A service the engine has no integration package for would produce a
    // trigger URL that can only ever fail at dispatch — reject it up front.
    await assertServiceSupportsTriggers(service);

    const agentRows = await db
      .select({ id: agents.id })
      .from(agents)
      .where(and(eq(agents.id, agentId), eq(agents.tenantId, tenantId)));
    if (!agentRows[0]) {
      throw Object.assign(new Error('Agent not found'), { status: 404 });
    }

    const tenantRows = await db
      .select({ slug: tenants.slug })
      .from(tenants)
      .where(eq(tenants.id, tenantId));
    if (!tenantRows[0]) {
      throw Object.assign(new Error('Tenant not found'), { status: 404 });
    }
    const tenantSlug = tenantRows[0].slug;

    const [created] = await db
      .insert(integrationTriggers)
      .values({
        id: newId(),
        tenantId,
        service,
        tenantSlug,
        agentId,
        eventFilter: eventFilter ?? null,
        // Webhook signing secrets are credentials — encrypted at rest like
        // integration connection credentials, and decrypted only at dispatch.
        secret: encryptCredentials(secret),
        enabled: true,
        createdAt: new Date(),
      })
      .returning({
        id: integrationTriggers.id,
        service: integrationTriggers.service,
        tenantSlug: integrationTriggers.tenantSlug,
        agentId: integrationTriggers.agentId,
        eventFilter: integrationTriggers.eventFilter,
        enabled: integrationTriggers.enabled,
        createdAt: integrationTriggers.createdAt,
      });

    res.status(201).json({
      ...created,
      url: `${config.publicBaseUrl}/v1/triggers/integrations/${created.service}/${created.tenantSlug}`,
    });
  } catch (err) {
    next(err);
  }
};

/** DELETE /v1/integrations/triggers/:id */
export const deleteTrigger: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params;

    const existing = await db
      .select({ id: integrationTriggers.id })
      .from(integrationTriggers)
      .where(and(eq(integrationTriggers.id, id), eq(integrationTriggers.tenantId, tenantId)));
    if (!existing[0]) {
      throw Object.assign(new Error('Trigger not found'), { status: 404 });
    }

    await db.delete(integrationTriggers).where(eq(integrationTriggers.id, id));
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

/** Headers a trigger handler may need for signature verification / event typing. */
function forwardableHeaders(
  headers: Record<string, string | string[] | undefined>,
): Record<string, string | string[] | undefined> {
  const out: Record<string, string | string[] | undefined> = {};
  for (const [key, value] of Object.entries(headers)) {
    const k = key.toLowerCase();
    if (k === 'authorization' || k === 'cookie') continue;
    out[k] = value;
  }
  return out;
}

/**
 * POST /v1/triggers/integrations/:service/:tenantSlug — public inbound
 * webhook receiver. No platform auth: authenticity is established by the
 * service's own signature scheme, verified in the engine against each
 * registration's signing secret.
 */
export const receiveIntegrationEvent: RequestHandler = async (req, res, next) => {
  try {
    const { service, tenantSlug } = req.params;

    const tenantRows = await db
      .select({ id: tenants.id, enabled: tenants.enabled })
      .from(tenants)
      .where(eq(tenants.slug, tenantSlug));
    const tenant = tenantRows[0];
    if (!tenant || !tenant.enabled) {
      throw Object.assign(new Error('Unknown trigger endpoint'), { status: 404 });
    }

    // Only registrations whose agent can actually run: a draft or disabled
    // agent would otherwise get a run row and a queue job on every delivery,
    // failing at graph load and filling telemetry with noise.
    const triggerRows = await db
      .select({
        id: integrationTriggers.id,
        agentId: integrationTriggers.agentId,
        eventFilter: integrationTriggers.eventFilter,
        secret: integrationTriggers.secret,
      })
      .from(integrationTriggers)
      .innerJoin(agents, eq(agents.id, integrationTriggers.agentId))
      .where(
        and(
          eq(integrationTriggers.tenantId, tenant.id),
          eq(integrationTriggers.service, service),
          eq(integrationTriggers.enabled, true),
          eq(agents.status, 'active'),
          eq(agents.enabled, true),
        ),
      );

    if (triggerRows.length === 0) {
      throw Object.assign(new Error('Unknown trigger endpoint'), { status: 404 });
    }

    // The engine verifies the service's HMAC against the plaintext secret; it
    // is decrypted here and never stored or logged in the clear.
    const triggers = triggerRows.map((row) => ({
      ...row,
      secret: decryptTriggerSecret(row.secret),
    }));

    const response = await engineClient.post(`/internal/triggers/integrations/${service}`, {
      tenantId: tenant.id,
      rawBody: req.rawBody ?? JSON.stringify(req.body ?? {}),
      headers: forwardableHeaders(req.headers),
      triggers,
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    next(err);
  }
};

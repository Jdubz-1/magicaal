import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq, and } from 'drizzle-orm';
import { db } from '../db/client';
import { integrationOauthApps } from '../db/schema';
import { encryptCredentials, decryptCredentials } from '../lib/credentials';

export interface OAuthApp {
  id: string;
  service: string;
  clientId: string;
  clientSecret: string;
  scopes: string[] | null;
}

/**
 * Load a tenant's OAuth client application for a service, with the client
 * secret decrypted. Used by the authorization-code flow; never exposed on a
 * response.
 */
export async function loadOAuthApp(
  tenantId: string,
  service: string,
): Promise<OAuthApp | undefined> {
  const rows = await db
    .select()
    .from(integrationOauthApps)
    .where(
      and(eq(integrationOauthApps.tenantId, tenantId), eq(integrationOauthApps.service, service)),
    );

  const row = rows[0];
  if (!row) return undefined;

  return {
    id: row.id,
    service: row.service,
    clientId: row.clientId,
    clientSecret: decryptCredentials(row.clientSecretEnc),
    scopes: row.scopes ? (JSON.parse(row.scopes) as string[]) : null,
  };
}

/** GET /v1/integrations/oauth-apps — configured OAuth apps (never returns secrets). */
export const listOAuthApps: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const rows = await db
      .select({
        id: integrationOauthApps.id,
        service: integrationOauthApps.service,
        clientId: integrationOauthApps.clientId,
        scopes: integrationOauthApps.scopes,
        createdAt: integrationOauthApps.createdAt,
        updatedAt: integrationOauthApps.updatedAt,
      })
      .from(integrationOauthApps)
      .where(eq(integrationOauthApps.tenantId, tenantId));

    res.json(
      rows.map((r) => ({ ...r, scopes: r.scopes ? (JSON.parse(r.scopes) as string[]) : null })),
    );
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /v1/integrations/oauth-apps — register (or replace) the OAuth client
 * app for a service. One app per tenant + service.
 */
export const upsertOAuthApp: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { service, clientId, clientSecret, scopes } = req.body as {
      service?: string;
      clientId?: string;
      clientSecret?: string;
      scopes?: string[];
    };

    if (!service || !clientId || !clientSecret) {
      throw Object.assign(new Error('service, clientId, and clientSecret are required'), {
        status: 400,
      });
    }
    if (scopes !== undefined && !Array.isArray(scopes)) {
      throw Object.assign(new Error('scopes must be an array of strings'), { status: 400 });
    }

    const now = new Date();
    const clientSecretEnc = encryptCredentials(clientSecret);
    const scopesJson = scopes ? JSON.stringify(scopes) : null;

    const existing = await db
      .select({ id: integrationOauthApps.id })
      .from(integrationOauthApps)
      .where(
        and(eq(integrationOauthApps.tenantId, tenantId), eq(integrationOauthApps.service, service)),
      );

    if (existing[0]) {
      await db
        .update(integrationOauthApps)
        .set({ clientId, clientSecretEnc, scopes: scopesJson, updatedAt: now })
        .where(eq(integrationOauthApps.id, existing[0].id));
      res.json({ id: existing[0].id, service, clientId, scopes: scopes ?? null });
      return;
    }

    const id = crypto.randomUUID();
    await db.insert(integrationOauthApps).values({
      id,
      tenantId,
      service,
      clientId,
      clientSecretEnc,
      scopes: scopesJson,
      createdAt: now,
      updatedAt: now,
    });

    res.status(201).json({ id, service, clientId, scopes: scopes ?? null });
  } catch (err) {
    next(err);
  }
};

/** DELETE /v1/integrations/oauth-apps/:id */
export const deleteOAuthApp: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params;

    const existing = await db
      .select({ id: integrationOauthApps.id })
      .from(integrationOauthApps)
      .where(and(eq(integrationOauthApps.id, id), eq(integrationOauthApps.tenantId, tenantId)));
    if (!existing[0]) {
      throw Object.assign(new Error('OAuth app not found'), { status: 404 });
    }

    await db.delete(integrationOauthApps).where(eq(integrationOauthApps.id, id));
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq, and } from 'drizzle-orm';
import { db } from '../db/client';
import { integrationConnections, integrationOauthStates } from '../db/schema';
import { config } from '../config';

function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function deriveKey(masterKey: string): Buffer {
  return crypto.createHash('sha256').update(masterKey).digest();
}

export function encryptCredentials(plaintext: string): string {
  if (!config.masterKey) {
    throw new Error('MAGICAAL_MASTER_KEY is required for Integration Connections');
  }
  const key = deriveKey(config.masterKey);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, encrypted]).toString('base64');
}

/**
 * POST /internal/integrations/connections/:id/credentials — engine-internal
 * persistence of mid-run OAuth token refreshes. No platform auth (internal
 * network only, same trust model as /internal/sessions).
 */
export const internalUpdateCredentials: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { credentials, expiresAt } = req.body as {
      credentials?: Record<string, unknown>;
      expiresAt?: number | null;
    };
    if (!credentials) {
      throw Object.assign(new Error('credentials are required'), { status: 400 });
    }

    const existing = await db
      .select({ id: integrationConnections.id })
      .from(integrationConnections)
      .where(eq(integrationConnections.id, id));
    if (!existing[0]) {
      throw Object.assign(new Error('Connection not found'), { status: 404 });
    }

    await db
      .update(integrationConnections)
      .set({
        credentialsEnc: encryptCredentials(JSON.stringify(credentials)),
        expiresAt: typeof expiresAt === 'number' ? new Date(expiresAt) : null,
        status: 'active',
        updatedAt: new Date(),
      })
      .where(eq(integrationConnections.id, id));

    res.json({ id, updated: true });
  } catch (err) {
    next(err);
  }
};

export const listConnections: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const rows = await db
      .select({
        id: integrationConnections.id,
        service: integrationConnections.service,
        displayName: integrationConnections.displayName,
        authType: integrationConnections.authType,
        status: integrationConnections.status,
        lastUsedAt: integrationConnections.lastUsedAt,
        expiresAt: integrationConnections.expiresAt,
        createdAt: integrationConnections.createdAt,
      })
      .from(integrationConnections)
      .where(eq(integrationConnections.tenantId, tenantId));

    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const getConnection: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params;

    const rows = await db
      .select({
        id: integrationConnections.id,
        service: integrationConnections.service,
        displayName: integrationConnections.displayName,
        authType: integrationConnections.authType,
        status: integrationConnections.status,
        lastUsedAt: integrationConnections.lastUsedAt,
        expiresAt: integrationConnections.expiresAt,
        createdAt: integrationConnections.createdAt,
      })
      .from(integrationConnections)
      .where(and(eq(integrationConnections.id, id), eq(integrationConnections.tenantId, tenantId)));

    if (!rows[0]) {
      throw Object.assign(new Error('Connection not found'), { status: 404 });
    }

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

export const createConnection: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const {
      service,
      displayName,
      authType,
      credentials,
    } = req.body as {
      service?: string;
      displayName?: string;
      authType?: 'oauth2' | 'api_key';
      credentials?: Record<string, unknown>;
    };

    if (!service || !displayName || !authType || !credentials) {
      throw Object.assign(
        new Error('service, displayName, authType, and credentials are required'),
        { status: 400 },
      );
    }

    const credentialsEnc = encryptCredentials(JSON.stringify(credentials));
    const now = new Date();

    const [created] = await db
      .insert(integrationConnections)
      .values({
        id: newId(),
        tenantId,
        service,
        displayName,
        authType,
        credentialsEnc,
        status: 'active',
        createdAt: now,
        updatedAt: now,
      })
      .returning({
        id: integrationConnections.id,
        service: integrationConnections.service,
        displayName: integrationConnections.displayName,
        authType: integrationConnections.authType,
        status: integrationConnections.status,
        createdAt: integrationConnections.createdAt,
      });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const updateConnection: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params;
    const { displayName, credentials } = req.body as {
      displayName?: string;
      credentials?: Record<string, unknown>;
    };

    const existing = await db
      .select()
      .from(integrationConnections)
      .where(and(eq(integrationConnections.id, id), eq(integrationConnections.tenantId, tenantId)));

    if (!existing[0]) {
      throw Object.assign(new Error('Connection not found'), { status: 404 });
    }

    const updateFields: Partial<typeof existing[0]> = { updatedAt: new Date() };
    if (displayName !== undefined) updateFields.displayName = displayName;
    if (credentials !== undefined) {
      updateFields.credentialsEnc = encryptCredentials(JSON.stringify(credentials));
      updateFields.status = 'active';
    }

    await db
      .update(integrationConnections)
      .set(updateFields)
      .where(eq(integrationConnections.id, id));

    res.json({ id, updated: true });
  } catch (err) {
    next(err);
  }
};

export const deleteConnection: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params;

    const existing = await db
      .select()
      .from(integrationConnections)
      .where(and(eq(integrationConnections.id, id), eq(integrationConnections.tenantId, tenantId)));

    if (!existing[0]) {
      throw Object.assign(new Error('Connection not found'), { status: 404 });
    }

    await db.delete(integrationConnections).where(eq(integrationConnections.id, id));
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export const initiateOAuth: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { service, redirectUri } = req.body as { service?: string; redirectUri?: string };

    if (!service || !redirectUri) {
      throw Object.assign(new Error('service and redirectUri are required'), { status: 400 });
    }

    const stateToken = crypto.randomBytes(32).toString('hex');
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes

    await db.insert(integrationOauthStates).values({
      id: newId(),
      tenantId,
      service,
      stateToken,
      redirectUri,
      createdAt: now,
      expiresAt,
    });

    res.json({ stateToken, message: 'Use stateToken in your OAuth authorization URL state parameter' });
  } catch (err) {
    next(err);
  }
};

export const oauthCallback: RequestHandler = async (req, res, next) => {
  try {
    const { service } = req.params;
    const { code, state, error: oauthError } = req.query as {
      code?: string;
      state?: string;
      error?: string;
    };

    if (oauthError) {
      return res.redirect(`/admin/integrations?error=${encodeURIComponent(oauthError)}`);
    }

    if (!code || !state) {
      throw Object.assign(new Error('Missing code or state parameter'), { status: 400 });
    }

    const stateRows = await db
      .select()
      .from(integrationOauthStates)
      .where(eq(integrationOauthStates.stateToken, state));

    const stateRecord = stateRows[0];
    if (!stateRecord || stateRecord.service !== service) {
      throw Object.assign(new Error('Invalid or expired OAuth state'), { status: 400 });
    }
    if (stateRecord.expiresAt < new Date()) {
      throw Object.assign(new Error('OAuth state expired'), { status: 400 });
    }

    // Clean up state token
    await db.delete(integrationOauthStates).where(eq(integrationOauthStates.id, stateRecord.id));

    // Token exchange is service-specific — stub here; full impl in Phase 5 integrations
    // For now, store the code as a placeholder credential
    const credentialsEnc = encryptCredentials(JSON.stringify({
      auth_code: code,
      service,
      exchanged: false,
      note: 'OAuth token exchange pending Phase 5 integration package',
    }));

    const now = new Date();
    await db.insert(integrationConnections).values({
      id: newId(),
      tenantId: stateRecord.tenantId,
      service,
      displayName: `${service} (OAuth)`,
      authType: 'oauth2',
      credentialsEnc,
      status: 'active',
      createdAt: now,
      updatedAt: now,
    });

    res.redirect(stateRecord.redirectUri + '?connected=true');
  } catch (err) {
    next(err);
  }
};

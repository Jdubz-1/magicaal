import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq, and } from 'drizzle-orm';
import type { IntegrationAuthSchema, IntegrationOAuthConfig } from '@magicaal/sdk-node';
import { exchangeAuthorizationCode } from '@magicaal/integration-core';
import { db } from '../db/client';
import { integrationConnections, integrationOauthStates } from '../db/schema';
import { engineClient } from '../lib/engine-client';
import { encryptCredentials } from '../lib/credentials';
import { loadOAuthApp } from './oauth-apps.controller';
import { config } from '../config';

function newId(): string {
  return crypto.randomUUID();
}

/**
 * POST /internal/integrations/connections/:id/credentials — engine-internal
 * persistence of mid-run OAuth token refreshes. Requires X-Internal-Auth
 * (requireInternalAuth), same trust model as /internal/sessions.
 *
 * The engine sends the run's tenantId; the connection must belong to it, so a
 * compromised or buggy caller cannot rewrite another tenant's credentials.
 */
export const internalUpdateCredentials: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { credentials, expiresAt, tenantId } = req.body as {
      credentials?: Record<string, unknown>;
      expiresAt?: number | null;
      tenantId?: string;
    };
    if (!credentials) {
      throw Object.assign(new Error('credentials are required'), { status: 400 });
    }
    if (!tenantId) {
      throw Object.assign(new Error('tenantId is required'), { status: 400 });
    }

    const existing = await db
      .select({ id: integrationConnections.id })
      .from(integrationConnections)
      .where(
        and(eq(integrationConnections.id, id), eq(integrationConnections.tenantId, tenantId)),
      );
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

const OAUTH_STATE_TTL_MS = 10 * 60 * 1000;
const OAUTH_NONCE_COOKIE = 'magicaal_oauth_nonce';

/** The callback URL registered with the provider; must byte-match at exchange. */
function callbackUrl(service: string): string {
  return `${config.publicBaseUrl}/v1/integrations/oauth/${service}/callback`;
}

/**
 * Only same-origin redirect targets are accepted. An attacker-supplied
 * absolute URL would otherwise turn the public callback into an open redirect.
 */
function assertSafeRedirect(redirectUri: string): string {
  let parsed: URL;
  try {
    parsed = new URL(redirectUri, config.publicBaseUrl);
  } catch {
    throw Object.assign(new Error('redirectUri is not a valid URL'), { status: 400 });
  }

  const base = new URL(config.publicBaseUrl);
  if (parsed.origin !== base.origin) {
    throw Object.assign(
      new Error('redirectUri must be on the same origin as PUBLIC_BASE_URL'),
      { status: 400, code: 'REDIRECT_URI_NOT_ALLOWED' },
    );
  }
  return parsed.toString();
}

function sha256hex(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

/** Fetch a service's OAuth endpoints from the engine's integration registry. */
async function serviceOAuthConfig(service: string): Promise<IntegrationOAuthConfig> {
  const { data } = await engineClient.get('/internal/integrations');
  const pkg = (data as Array<{ service: string; authSchema?: IntegrationAuthSchema }>).find(
    (p) => p.service === service,
  );

  const oauth = pkg?.authSchema?.oauth;
  if (!oauth) {
    throw Object.assign(new Error(`Service "${service}" does not support OAuth`), {
      status: 400,
      code: 'OAUTH_NOT_SUPPORTED',
    });
  }
  return oauth;
}

/**
 * Shared authorization-code flow starter: mints the state (+ PKCE verifier),
 * binds it to the caller's browser via the nonce cookie, and returns the
 * provider authorization URL. `connectionId` marks a reconnect flow — the
 * callback then updates that connection in place (ALIGN-016).
 */
async function beginOAuthFlow(
  res: Parameters<RequestHandler>[1],
  opts: { tenantId: string; service: string; redirectUri: string; connectionId?: string },
): Promise<void> {
  const { tenantId, service, connectionId } = opts;
  const safeRedirect = assertSafeRedirect(opts.redirectUri);

  const app = await loadOAuthApp(tenantId, service);
  if (!app) {
    throw Object.assign(
      new Error(`No OAuth app configured for "${service}" — add one in Admin → Integrations`),
      { status: 400, code: 'OAUTH_APP_NOT_CONFIGURED' },
    );
  }

  const oauth = await serviceOAuthConfig(service);

  const stateToken = crypto.randomBytes(32).toString('hex');
  // PKCE (RFC 7636) — providers that ignore it are unaffected
  const codeVerifier = crypto.randomBytes(32).toString('base64url');
  const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url');
  const nonce = crypto.randomBytes(32).toString('hex');

  const now = new Date();
  await db.insert(integrationOauthStates).values({
    id: crypto.randomUUID(),
    tenantId,
    service,
    stateToken,
    redirectUri: safeRedirect,
    codeVerifier,
    nonceHash: sha256hex(nonce),
    connectionId: connectionId ?? null,
    createdAt: now,
    expiresAt: new Date(now.getTime() + OAUTH_STATE_TTL_MS),
  });

  // Bound to the initiating browser: the callback rejects a request that
  // cannot present this nonce, so a victim cannot be walked through a flow
  // whose state was minted by someone else.
  res.cookie(OAUTH_NONCE_COOKIE, nonce, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'lax',
    maxAge: OAUTH_STATE_TTL_MS,
    path: '/v1/integrations/oauth',
  });

  const authUrl = new URL(oauth.authorizationUrl);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', app.clientId);
  authUrl.searchParams.set('redirect_uri', callbackUrl(service));
  authUrl.searchParams.set('scope', (app.scopes ?? oauth.scopes).join(' '));
  authUrl.searchParams.set('state', stateToken);
  authUrl.searchParams.set('code_challenge', codeChallenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');

  res.json({ authorizationUrl: authUrl.toString(), stateToken });
}

/**
 * POST /v1/integrations/oauth/initiate — start the authorization-code flow.
 * Returns the provider authorization URL for the browser to visit, and binds
 * the flow to this browser with a nonce cookie.
 */
export const initiateOAuth: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { service, redirectUri } = req.body as { service?: string; redirectUri?: string };

    if (!service || !redirectUri) {
      throw Object.assign(new Error('service and redirectUri are required'), { status: 400 });
    }

    await beginOAuthFlow(res, { tenantId, service, redirectUri });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /v1/integrations/connections/:id/reconnect (§6.4 / ALIGN-016) —
 * restart the OAuth flow for an existing connection. The callback replaces
 * its credentials in place, preserving the connection id every node config
 * references (delete + re-create would silently break them all).
 */
export const reconnectConnection: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params;
    const { redirectUri = '/admin/integrations' } = req.body as { redirectUri?: string };

    const rows = await db
      .select()
      .from(integrationConnections)
      .where(and(eq(integrationConnections.id, id), eq(integrationConnections.tenantId, tenantId)));
    const connection = rows[0];
    if (!connection) {
      throw Object.assign(new Error('Connection not found'), { status: 404 });
    }
    if (connection.authType !== 'oauth2') {
      throw Object.assign(
        new Error('Only OAuth connections can be reconnected — update api_key credentials directly'),
        { status: 400, code: 'NOT_OAUTH_CONNECTION' },
      );
    }

    await beginOAuthFlow(res, {
      tenantId,
      service: connection.service,
      redirectUri,
      connectionId: connection.id,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /v1/integrations/oauth/:service/callback — the provider redirects the
 * user's browser here. Mounted outside requireAuth: the request carries no
 * bearer token. Authenticity comes from the single-use state token plus the
 * nonce cookie set at initiate.
 */
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

    const nonce = req.cookies?.[OAUTH_NONCE_COOKIE] as string | undefined;
    if (!stateRecord.nonceHash || !nonce || sha256hex(nonce) !== stateRecord.nonceHash) {
      throw Object.assign(
        new Error('OAuth flow was not started in this browser'),
        { status: 400, code: 'OAUTH_NONCE_MISMATCH' },
      );
    }

    // State is single-use — consume it before the exchange
    await db.delete(integrationOauthStates).where(eq(integrationOauthStates.id, stateRecord.id));
    res.clearCookie(OAUTH_NONCE_COOKIE, { path: '/v1/integrations/oauth' });

    const app = await loadOAuthApp(stateRecord.tenantId, service);
    if (!app) {
      throw Object.assign(new Error(`No OAuth app configured for "${service}"`), {
        status: 400,
        code: 'OAUTH_APP_NOT_CONFIGURED',
      });
    }
    const oauth = await serviceOAuthConfig(service);

    const redirect = new URL(stateRecord.redirectUri);
    const now = new Date();

    let token;
    try {
      token = await exchangeAuthorizationCode(
        {
          service,
          tokenUrl: oauth.tokenUrl,
          clientId: app.clientId,
          clientSecret: app.clientSecret,
          clientAuth: oauth.clientAuth,
          extraParams: oauth.extraParams,
        },
        code,
        callbackUrl(service),
        stateRecord.codeVerifier ?? undefined,
      );
    } catch (err) {
      // Never leave a connection marked active when no token was obtained
      redirect.searchParams.set('error', err instanceof Error ? err.message : 'exchange_failed');
      return res.redirect(redirect.toString());
    }

    // client_id/client_secret ride along in the credential blob: that is where
    // the engine's credential resolver reads them from when it refreshes an
    // expired token mid-run.
    const credentialsEnc = encryptCredentials(
      JSON.stringify({
        access_token: token.accessToken,
        refresh_token: token.refreshToken,
        client_id: app.clientId,
        client_secret: app.clientSecret,
      }),
    );

    // Reconnect flow (ALIGN-016): replace the existing connection's
    // credentials in place — a new row would change the connection id and
    // silently break every node config referencing it.
    if (stateRecord.connectionId) {
      const [updated] = await db
        .update(integrationConnections)
        .set({
          credentialsEnc,
          status: 'active',
          expiresAt: token.expiresAt ? new Date(token.expiresAt) : null,
          updatedAt: now,
        })
        .where(
          and(
            eq(integrationConnections.id, stateRecord.connectionId),
            eq(integrationConnections.tenantId, stateRecord.tenantId),
            eq(integrationConnections.service, service),
          ),
        )
        .returning({ id: integrationConnections.id });

      if (!updated) {
        // Connection was deleted mid-flow — surface it rather than silently creating a new one
        redirect.searchParams.set('error', 'connection_no_longer_exists');
        return res.redirect(redirect.toString());
      }

      redirect.searchParams.set('reconnected', 'true');
      redirect.searchParams.set('connectionId', updated.id);
      return res.redirect(redirect.toString());
    }

    const [created] = await db
      .insert(integrationConnections)
      .values({
        id: crypto.randomUUID(),
        tenantId: stateRecord.tenantId,
        service,
        displayName: `${service} (OAuth)`,
        authType: 'oauth2',
        credentialsEnc,
        status: 'active',
        expiresAt: token.expiresAt ? new Date(token.expiresAt) : null,
        createdAt: now,
        updatedAt: now,
      })
      .returning({ id: integrationConnections.id });

    redirect.searchParams.set('connected', 'true');
    redirect.searchParams.set('connectionId', created.id);
    res.redirect(redirect.toString());
  } catch (err) {
    next(err);
  }
};

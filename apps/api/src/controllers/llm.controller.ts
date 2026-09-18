import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq, and } from 'drizzle-orm';
import type { ModelRouterConfig } from '@magicaal/core';
import type { CredentialValidationResult, ProviderDescriptor } from '@magicaal/sdk-node';
import { db } from '../db/client';
import { integrationConnections, namedRouterPolicies } from '../db/schema';
import { engineClient } from '../lib/engine-client';
import { connectionResponseColumns, newConnectionRow } from './integrations.controller';

function newId(): string {
  return crypto.randomUUID();
}

type RouterPolicyRow = typeof namedRouterPolicies.$inferSelect;

/** better-sqlite3 surfaces a unique-index violation by code, not by message. */
function isUniqueConstraintError(err: unknown): boolean {
  const code = (err as { code?: string }).code;
  return code === 'SQLITE_CONSTRAINT_UNIQUE' || code === 'SQLITE_CONSTRAINT_PRIMARYKEY';
}

function newRouterPolicyRow(input: {
  tenantId: string;
  name: string;
  config: Record<string, unknown> | ModelRouterConfig;
  overridable: boolean;
}): typeof namedRouterPolicies.$inferInsert {
  const now = new Date();
  return {
    id: newId(),
    tenantId: input.tenantId,
    name: input.name,
    configJson: JSON.stringify(input.config),
    overridable: input.overridable,
    createdAt: now,
    updatedAt: now,
  };
}

function routerPolicyResponse(row: RouterPolicyRow): Record<string, unknown> {
  return {
    id: row.id,
    name: row.name,
    config: JSON.parse(row.configJson) as Record<string, unknown>,
    overridable: row.overridable,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/** GET /v1/llm/providers — the engine's model provider catalog. */
export const listProviders: RequestHandler = async (_req, res, next) => {
  try {
    const engineResponse = await engineClient.get('/internal/llm/providers');
    res.json(engineResponse.data);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /v1/llm/providers/:provider/connections — connect a model provider from
 * its catalog preset: validate the key with the provider, store the connection,
 * and optionally create a single-target router policy that uses it.
 */
export const createProviderConnection: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { provider } = req.params;
    const { displayName, credentials, skipValidation, routerPolicy } = req.body as {
      displayName?: string;
      credentials?: Record<string, unknown>;
      skipValidation?: boolean;
      routerPolicy?: { create?: boolean; name?: string; model?: string };
    };

    const { data: catalog } = await engineClient.get<ProviderDescriptor[]>('/internal/llm/providers');
    const descriptor = catalog.find((p) => p.provider === provider);
    if (!descriptor) {
      throw Object.assign(new Error(`Unknown model provider "${provider}"`), {
        status: 404,
        code: 'PROVIDER_NOT_FOUND',
      });
    }

    const missing = descriptor.authFields
      .filter((f) => f.required && !(typeof credentials?.[f.key] === 'string' && credentials[f.key] !== ''))
      .map((f) => f.key);
    if (!credentials || missing.length > 0) {
      throw Object.assign(new Error(`Missing required credential fields: ${missing.join(', ')}`), {
        status: 400,
      });
    }

    const createPolicy = routerPolicy?.create === true;
    const model = routerPolicy?.model?.trim();
    if (createPolicy && !model) {
      throw Object.assign(new Error('routerPolicy.model is required to create a router policy'), {
        status: 400,
      });
    }

    if (!skipValidation) {
      // Own try/catch: this request body carries the plaintext key, and an
      // error that never reaches engine-client's response interceptor (a
      // refused connection, a timeout, a non-JSON 502) is logged whole by
      // errorHandler — pino copies err.config.data with it.
      let result: CredentialValidationResult;
      try {
        ({ data: result } = await engineClient.post<CredentialValidationResult>(
          `/internal/llm/providers/${encodeURIComponent(provider)}/validate`,
          { credentials },
        ));
      } catch (err) {
        const status = (err as { status?: number }).status;
        throw Object.assign(
          new Error(
            status
              ? `Could not verify the key with the provider (engine responded ${status})`
              : 'Could not verify the key with the provider (engine unreachable)',
          ),
          { status: 424, code: 'PROVIDER_UNREACHABLE' },
        );
      }
      if (!result.ok) {
        const invalid = result.reason === 'invalid_key';
        throw Object.assign(
          new Error(result.message ?? 'Provider credential validation failed'),
          invalid
            ? { status: 422, code: 'PROVIDER_KEY_INVALID' }
            : { status: 424, code: 'PROVIDER_UNREACHABLE' },
        );
      }
    }

    // Synchronous better-sqlite3 transaction: a failed policy insert must not
    // leave a half-configured provider behind.
    const runInsert = () => db.transaction((tx) => {
      const connection = tx
        .insert(integrationConnections)
        .values(
          newConnectionRow({
            tenantId,
            service: provider,
            displayName: displayName?.trim() || descriptor.displayName,
            authType: 'api_key',
            credentials,
          }),
        )
        .returning(connectionResponseColumns)
        .get();

      let policy: RouterPolicyRow | undefined;
      if (createPolicy && model) {
        const policyConfig: ModelRouterConfig = {
          strategy: 'priority',
          targets: [{ id: 'primary', connectionId: connection.id, provider, model }],
          triggers: [],
        };
        policy = tx
          .insert(namedRouterPolicies)
          .values(
            newRouterPolicyRow({
              tenantId,
              name: routerPolicy?.name?.trim() || `${provider}-${model}`,
              config: policyConfig,
              overridable: true,
            }),
          )
          .returning()
          .get();
      }
      return { connection, policy };
    });

    // named_router_policies is UNIQUE(tenant_id, name), and the generated
    // `${provider}-${model}` repeats for a second key on the same provider —
    // which rolled the whole transaction back and surfaced as a 500 with the
    // key discarded. Report it as a conflict the caller can act on.
    let created: ReturnType<typeof runInsert>;
    try {
      created = runInsert();
    } catch (err) {
      if (isUniqueConstraintError(err)) {
        throw Object.assign(
          new Error(
            `A router policy named "${routerPolicy?.name?.trim() || `${provider}-${model}`}" already exists — give this one a different name`,
          ),
          { status: 409, code: 'POLICY_NAME_TAKEN' },
        );
      }
      throw err;
    }

    res.status(201).json({
      connection: created.connection,
      ...(created.policy && { routerPolicy: routerPolicyResponse(created.policy) }),
    });
  } catch (err) {
    next(err);
  }
};

export const getProviderHealth: RequestHandler = async (_req, res, next) => {
  try {
    // Real per-target router health (ALIGN-024) — the engine's bare /health
    // is a liveness stub with no provider data.
    const engineResponse = await engineClient.get('/internal/llm/provider-health');
    res.json(engineResponse.data);
  } catch (err) {
    next(err);
  }
};

export const listRouterPolicies: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const rows = await db
      .select()
      .from(namedRouterPolicies)
      .where(eq(namedRouterPolicies.tenantId, tenantId));

    res.json(
      rows.map((r) => ({
        id: r.id,
        name: r.name,
        config: JSON.parse(r.configJson) as Record<string, unknown>,
        overridable: r.overridable,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      })),
    );
  } catch (err) {
    next(err);
  }
};

export const createRouterPolicy: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { name, config, overridable = true } = req.body as {
      name?: string;
      config?: Record<string, unknown>;
      overridable?: boolean;
    };

    if (!name || !config) {
      throw Object.assign(new Error('name and config are required'), { status: 400 });
    }

    const [created] = await db
      .insert(namedRouterPolicies)
      .values(newRouterPolicyRow({ tenantId, name, config, overridable }))
      .returning();

    res.status(201).json(routerPolicyResponse(created));
  } catch (err) {
    next(err);
  }
};

export const updateRouterPolicy: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params;
    const { name, config, overridable } = req.body as {
      name?: string;
      config?: Record<string, unknown>;
      overridable?: boolean;
    };

    const existing = await db
      .select()
      .from(namedRouterPolicies)
      .where(and(eq(namedRouterPolicies.id, id), eq(namedRouterPolicies.tenantId, tenantId)));

    if (!existing[0]) {
      throw Object.assign(new Error('Router policy not found'), { status: 404 });
    }

    const now = new Date();
    const [updated] = await db
      .update(namedRouterPolicies)
      .set({
        ...(name !== undefined && { name }),
        ...(config !== undefined && { configJson: JSON.stringify(config) }),
        ...(overridable !== undefined && { overridable }),
        updatedAt: now,
      })
      .where(eq(namedRouterPolicies.id, id))
      .returning();

    res.json({
      id: updated.id,
      name: updated.name,
      config: JSON.parse(updated.configJson) as Record<string, unknown>,
      overridable: updated.overridable,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteRouterPolicy: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params;

    const existing = await db
      .select()
      .from(namedRouterPolicies)
      .where(and(eq(namedRouterPolicies.id, id), eq(namedRouterPolicies.tenantId, tenantId)));

    if (!existing[0]) {
      throw Object.assign(new Error('Router policy not found'), { status: 404 });
    }

    await db.delete(namedRouterPolicies).where(eq(namedRouterPolicies.id, id));
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

import type { ExecutionContext, IntegrationPackage, NodeModule } from '@magicaal/sdk-node';
import { IntegrationError, errorFromResponse, resolveField } from '@magicaal/integration-core';

interface QuickBooksAuth {
  baseUrl: string;
  realmId: string;
  accessToken: string;
}

function auth(ctx: ExecutionContext, connectionId: string): QuickBooksAuth {
  const creds = ctx.credentials[connectionId];
  const extra = creds?.extra ?? {};
  const realmId = typeof extra.realm_id === 'string' ? extra.realm_id : undefined;
  const accessToken = creds?.accessToken;
  const sandbox = extra.sandbox === true || extra.sandbox === 'true';
  if (!realmId || !accessToken) {
    throw new IntegrationError({
      service: 'quickbooks',
      message: `quickbooks: connection "${connectionId}" is missing realm_id or an access token`,
      code: 'CONNECTION_NOT_RESOLVED',
      retryable: false,
    });
  }
  return {
    baseUrl: sandbox
      ? 'https://sandbox-quickbooks.api.intuit.com'
      : 'https://quickbooks.api.intuit.com',
    realmId,
    accessToken,
  };
}

interface CreateCustomerConfig {
  connectionId: string;
  displayName: string;
  email?: string;
  outputKey: string;
}

export const quickbooksCreateCustomer: NodeModule<CreateCustomerConfig> = {
  type: 'integration:quickbooks:create-customer',
  meta: {
    name: 'QuickBooks: Create Customer',
    description: 'Creates a customer in QuickBooks Online. Writes {id} to outputKey.',
    category: 'integration',
    icon: 'briefcase',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'displayName', 'outputKey'],
      properties: {
        connectionId: { type: 'string', format: 'connection', service: 'quickbooks', description: 'QuickBooks Integration Connection' },
        displayName: { type: 'string', description: 'Customer display name. Supports JSONata expressions starting with $.' },
        email: { type: 'string', description: 'Primary email. Supports JSONata expressions.' },
        outputKey: { type: 'string', description: 'Context key to write {id} to' },
      },
    },
    input: {},
    output: { type: 'object', properties: { id: { type: 'string' } } },
  },
  async execute(ctx, config) {
    try {
      const qb = auth(ctx, config.connectionId);
      const displayName = await resolveField(ctx, config.displayName);

      const body: Record<string, unknown> = { DisplayName: displayName };
      if (config.email !== undefined) {
        body.PrimaryEmailAddr = { Address: await resolveField(ctx, config.email) };
      }

      const response = await fetch(
        `${qb.baseUrl}/v3/company/${encodeURIComponent(qb.realmId)}/customer`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${qb.accessToken}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(body),
        },
      );
      if (!response.ok) throw await errorFromResponse('quickbooks', response);

      const data = (await response.json()) as { Customer: { Id: string } };
      const result = { id: data.Customer.Id };
      ctx.set(config.outputKey, result);
      return { status: 'complete' as const, outputs: { [config.outputKey]: result } };
    } catch (err) {
      if (err instanceof IntegrationError) {
        return {
          status: 'failed' as const,
          outputs: {},
          error: { code: err.code ?? 'QUICKBOOKS_ERROR', message: err.message, retryable: err.retryable },
        };
      }
      throw err;
    }
  },
};

export const QUICKBOOKS_INTEGRATION: IntegrationPackage = {
  service: 'quickbooks',
  displayName: 'QuickBooks',
  description: 'Create customers in QuickBooks Online.',
  version: '0.1.0',
  authType: 'oauth2',
  authSchema: {
    fields: [
      { key: 'access_token', label: 'Access Token', type: 'secret', required: true },
      { key: 'refresh_token', label: 'Refresh Token', type: 'secret', description: 'Enables automatic token refresh' },
      { key: 'realm_id', label: 'Company (Realm) ID', type: 'string', required: true },
      { key: 'sandbox', label: 'Sandbox Company', type: 'string', description: 'true to target the sandbox API' },
    ],
    oauth: {
      authorizationUrl: 'https://appcenter.intuit.com/connect/oauth2',
      tokenUrl: 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
      scopes: ['com.intuit.quickbooks.accounting'],
    },
  },
  nodes: [quickbooksCreateCustomer],
};

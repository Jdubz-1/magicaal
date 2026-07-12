import * as crypto from 'node:crypto';
import type {
  ExecutionContext,
  IntegrationPackage,
  IntegrationTriggerHandler,
  NodeModule,
} from '@magicaal/sdk-node';
import { IntegrationError, errorFromResponse, resolveField } from '@magicaal/integration-core';

const API_VERSION = 'v59.0';

interface SalesforceAuth {
  instanceUrl: string;
  accessToken: string;
}

function auth(ctx: ExecutionContext, connectionId: string): SalesforceAuth {
  const creds = ctx.credentials[connectionId];
  const instanceUrl =
    typeof creds?.extra?.instance_url === 'string'
      ? creds.extra.instance_url.replace(/\/$/, '')
      : undefined;
  const accessToken = creds?.accessToken;
  if (!instanceUrl || !accessToken) {
    throw new IntegrationError({
      service: 'salesforce',
      message: `salesforce: connection "${connectionId}" needs instance_url and an access token`,
      code: 'CONNECTION_NOT_RESOLVED',
      retryable: false,
    });
  }
  return { instanceUrl, accessToken };
}

function fail(err: unknown) {
  if (err instanceof IntegrationError) {
    return {
      status: 'failed' as const,
      outputs: {},
      error: { code: err.code ?? 'SALESFORCE_ERROR', message: err.message, retryable: err.retryable },
    };
  }
  throw err;
}

interface CreateRecordConfig {
  connectionId: string;
  objectType: string;
  fields: Record<string, unknown>;
  outputKey: string;
}

export const salesforceCreateRecord: NodeModule<CreateRecordConfig> = {
  type: 'integration:salesforce:create-record',
  meta: {
    name: 'Salesforce: Create Record',
    description: 'Creates an sObject record (Lead, Contact, Opportunity, ...). Writes {id} to outputKey.',
    category: 'integration',
    icon: 'database',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'objectType', 'fields', 'outputKey'],
      properties: {
        connectionId: { type: 'string', format: 'connection', service: 'salesforce', description: 'Salesforce Integration Connection' },
        objectType: { type: 'string', description: 'sObject API name, e.g. Lead' },
        fields: { type: 'object', description: 'Record field values. String values support JSONata expressions starting with $.' },
        outputKey: { type: 'string', description: 'Context key to write {id} to' },
      },
    },
    input: {},
    output: { type: 'object', properties: { id: { type: 'string' } } },
  },
  async execute(ctx, config) {
    try {
      const sf = auth(ctx, config.connectionId);

      const fields: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(config.fields)) {
        fields[key] = typeof value === 'string' ? await resolveField(ctx, value) : value;
      }

      const response = await fetch(
        `${sf.instanceUrl}/services/data/${API_VERSION}/sobjects/${encodeURIComponent(config.objectType)}`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${sf.accessToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(fields),
        },
      );
      if (!response.ok) throw await errorFromResponse('salesforce', response);

      const data = (await response.json()) as { id: string };
      const result = { id: data.id };
      ctx.set(config.outputKey, result);
      return { status: 'complete' as const, outputs: { [config.outputKey]: result } };
    } catch (err) {
      return fail(err);
    }
  },
};

interface SoqlQueryConfig {
  connectionId: string;
  soql: string;
  outputKey: string;
}

export const salesforceQuery: NodeModule<SoqlQueryConfig> = {
  type: 'integration:salesforce:query',
  meta: {
    name: 'Salesforce: SOQL Query',
    description: 'Runs a SOQL query, following nextRecordsUrl pagination. Writes the record array to outputKey.',
    category: 'integration',
    icon: 'search',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'soql', 'outputKey'],
      properties: {
        connectionId: { type: 'string', format: 'connection', service: 'salesforce', description: 'Salesforce Integration Connection' },
        soql: { type: 'string', description: 'SOQL query. Supports JSONata expressions starting with $.' },
        outputKey: { type: 'string', description: 'Context key to write the record array to' },
      },
    },
    input: {},
    output: { type: 'object', properties: { records: { type: 'array' } } },
  },
  async execute(ctx, config) {
    try {
      const sf = auth(ctx, config.connectionId);
      const soql = await resolveField(ctx, config.soql);

      const records: unknown[] = [];
      let url: string | null = `${sf.instanceUrl}/services/data/${API_VERSION}/query?q=${encodeURIComponent(soql)}`;
      while (url) {
        const response: Response = await fetch(url, {
          headers: { Authorization: `Bearer ${sf.accessToken}` },
        });
        if (!response.ok) throw await errorFromResponse('salesforce', response);
        const data = (await response.json()) as {
          records: unknown[];
          done: boolean;
          nextRecordsUrl?: string;
        };
        records.push(...data.records);
        url = !data.done && data.nextRecordsUrl ? `${sf.instanceUrl}${data.nextRecordsUrl}` : null;
      }

      ctx.set(config.outputKey, records);
      return { status: 'complete' as const, outputs: { [config.outputKey]: records } };
    } catch (err) {
      return fail(err);
    }
  },
};

/**
 * Salesforce has no signed outbound webhook of its own; events reach the
 * platform through an Apex REST callout or middleware configured to sign the
 * raw body as HMAC-SHA256 hex in X-MagiCaal-Signature (sha256=<hex>) using
 * the registration secret. Event type is read from payload.eventType.
 */
export const salesforceTrigger: IntegrationTriggerHandler = {
  service: 'salesforce',
  verifySignature(rawBody, headers, secret): boolean {
    const raw = headers['x-magicaal-signature'];
    const signature = Array.isArray(raw) ? raw[0] : raw;
    if (!signature) return false;
    const expected = `sha256=${crypto.createHmac('sha256', secret).update(rawBody).digest('hex')}`;
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expected);
    return sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);
  },
  eventType(payload): string | undefined {
    return (payload as { eventType?: string })?.eventType;
  },
};

export const SALESFORCE_INTEGRATION: IntegrationPackage = {
  service: 'salesforce',
  displayName: 'Salesforce',
  description: 'Create records, run SOQL queries, and trigger agents from signed callout events.',
  version: '0.1.0',
  authType: 'oauth2',
  authSchema: {
    fields: [
      { key: 'access_token', label: 'Access Token', type: 'secret', required: true },
      { key: 'refresh_token', label: 'Refresh Token', type: 'secret', description: 'Enables automatic token refresh' },
      { key: 'instance_url', label: 'Instance URL', type: 'string', required: true, description: 'e.g. https://acme.my.salesforce.com' },
    ],
    oauth: {
      authorizationUrl: 'https://login.salesforce.com/services/oauth2/authorize',
      tokenUrl: 'https://login.salesforce.com/services/oauth2/token',
      scopes: ['api', 'refresh_token'],
    },
  },
  nodes: [salesforceCreateRecord, salesforceQuery],
  trigger: salesforceTrigger,
};

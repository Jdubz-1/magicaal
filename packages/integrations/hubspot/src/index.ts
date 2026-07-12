import * as crypto from 'node:crypto';
import type {
  ExecutionContext,
  IntegrationPackage,
  IntegrationTriggerHandler,
  NodeModule,
} from '@magicaal/sdk-node';
import { IntegrationError, errorFromResponse, resolveField } from '@magicaal/integration-core';

const API = 'https://api.hubapi.com';

function token(ctx: ExecutionContext, connectionId: string): string {
  const creds = ctx.credentials[connectionId];
  const value = creds?.accessToken ?? creds?.apiKey;
  if (!value) {
    throw new IntegrationError({
      service: 'hubspot',
      message: `hubspot: no usable token for connection "${connectionId}"`,
      code: 'CONNECTION_NOT_RESOLVED',
      retryable: false,
    });
  }
  return value;
}

function fail(err: unknown) {
  if (err instanceof IntegrationError) {
    return {
      status: 'failed' as const,
      outputs: {},
      error: { code: err.code ?? 'HUBSPOT_ERROR', message: err.message, retryable: err.retryable },
    };
  }
  throw err;
}

interface CreateContactConfig {
  connectionId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  outputKey: string;
}

export const hubspotCreateContact: NodeModule<CreateContactConfig> = {
  type: 'integration:hubspot:create-contact',
  meta: {
    name: 'HubSpot: Create Contact',
    description: 'Creates a CRM contact. Writes {id} to outputKey.',
    category: 'integration',
    icon: 'user-plus',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'email', 'outputKey'],
      properties: {
        connectionId: { type: 'string', format: 'connection', service: 'hubspot', description: 'HubSpot Integration Connection' },
        email: { type: 'string', description: 'Contact email. Supports JSONata expressions starting with $.' },
        firstName: { type: 'string', description: 'First name. Supports JSONata expressions.' },
        lastName: { type: 'string', description: 'Last name. Supports JSONata expressions.' },
        outputKey: { type: 'string', description: 'Context key to write {id} to' },
      },
    },
    input: {},
    output: { type: 'object', properties: { id: { type: 'string' } } },
  },
  async execute(ctx, config) {
    try {
      const accessToken = token(ctx, config.connectionId);
      const email = await resolveField(ctx, config.email);
      const properties: Record<string, string> = { email };
      if (config.firstName !== undefined) properties.firstname = await resolveField(ctx, config.firstName);
      if (config.lastName !== undefined) properties.lastname = await resolveField(ctx, config.lastName);

      const response = await fetch(`${API}/crm/v3/objects/contacts`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ properties }),
      });
      if (!response.ok) throw await errorFromResponse('hubspot', response);

      const data = (await response.json()) as { id: string };
      const result = { id: data.id };
      ctx.set(config.outputKey, result);
      return { status: 'complete' as const, outputs: { [config.outputKey]: result } };
    } catch (err) {
      return fail(err);
    }
  },
};

interface SearchContactsConfig {
  connectionId: string;
  email: string;
  outputKey: string;
}

export const hubspotSearchContacts: NodeModule<SearchContactsConfig> = {
  type: 'integration:hubspot:search-contacts',
  meta: {
    name: 'HubSpot: Search Contacts',
    description: 'Searches CRM contacts by email. Writes an array of {id, properties} to outputKey.',
    category: 'integration',
    icon: 'search',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'email', 'outputKey'],
      properties: {
        connectionId: { type: 'string', format: 'connection', service: 'hubspot', description: 'HubSpot Integration Connection' },
        email: { type: 'string', description: 'Email to search for. Supports JSONata expressions starting with $.' },
        outputKey: { type: 'string', description: 'Context key to write the contact array to' },
      },
    },
    input: {},
    output: { type: 'object', properties: { contacts: { type: 'array' } } },
  },
  async execute(ctx, config) {
    try {
      const accessToken = token(ctx, config.connectionId);
      const email = await resolveField(ctx, config.email);

      const response = await fetch(`${API}/crm/v3/objects/contacts/search`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
        }),
      });
      if (!response.ok) throw await errorFromResponse('hubspot', response);

      const data = (await response.json()) as {
        results?: Array<{ id: string; properties: Record<string, string> }>;
      };
      const results = data.results ?? [];
      ctx.set(config.outputKey, results);
      return { status: 'complete' as const, outputs: { [config.outputKey]: results } };
    } catch (err) {
      return fail(err);
    }
  },
};

/**
 * HubSpot webhook v1 signature: X-HubSpot-Signature is SHA-256 hex of
 * `${clientSecret}${rawBody}` — the registration secret is the app's client
 * secret. Event type is the subscriptionType of the first event in the
 * (array-shaped) payload.
 */
export const hubspotTrigger: IntegrationTriggerHandler = {
  service: 'hubspot',
  verifySignature(rawBody, headers, secret): boolean {
    const raw = headers['x-hubspot-signature'];
    const signature = Array.isArray(raw) ? raw[0] : raw;
    if (!signature) return false;
    const expected = crypto.createHash('sha256').update(`${secret}${rawBody}`).digest('hex');
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expected);
    return sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);
  },
  eventType(payload): string | undefined {
    if (Array.isArray(payload) && payload.length > 0) {
      return (payload[0] as { subscriptionType?: string })?.subscriptionType;
    }
    return (payload as { subscriptionType?: string })?.subscriptionType;
  },
};

export const HUBSPOT_INTEGRATION: IntegrationPackage = {
  service: 'hubspot',
  displayName: 'HubSpot',
  description: 'Create and search CRM contacts; trigger agents from HubSpot webhook subscriptions.',
  version: '0.1.0',
  authType: 'oauth2',
  authSchema: {
    fields: [
      { key: 'access_token', label: 'Private App Token', type: 'secret', required: true, description: 'Private app access token (pat-...)' },
    ],
    oauth: {
      authorizationUrl: 'https://app.hubspot.com/oauth/authorize',
      tokenUrl: 'https://api.hubapi.com/oauth/v1/token',
      scopes: ['crm.objects.contacts.read', 'crm.objects.contacts.write'],
    },
  },
  nodes: [hubspotCreateContact, hubspotSearchContacts],
  trigger: hubspotTrigger,
};

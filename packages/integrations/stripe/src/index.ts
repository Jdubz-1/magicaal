import * as crypto from 'node:crypto';
import type {
  ExecutionContext,
  IntegrationPackage,
  IntegrationTriggerHandler,
  NodeModule,
} from '@magicaal/sdk-node';
import {
  IntegrationError,
  errorFromResponse,
  resolveField,
  collectAll,
  deriveIdempotencyKey,
} from '@magicaal/integration-core';

const API = 'https://api.stripe.com/v1';

function apiKey(ctx: ExecutionContext, connectionId: string): string {
  const creds = ctx.credentials[connectionId];
  const value = creds?.apiKey ?? creds?.accessToken;
  if (!value) {
    throw new IntegrationError({
      service: 'stripe',
      message: `stripe: no usable API key for connection "${connectionId}"`,
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
      error: { code: err.code ?? 'STRIPE_ERROR', message: err.message, retryable: err.retryable },
    };
  }
  throw err;
}

interface CreateCustomerConfig {
  connectionId: string;
  email: string;
  name?: string;
  outputKey: string;
}

export const stripeCreateCustomer: NodeModule<CreateCustomerConfig> = {
  type: 'integration:stripe:create-customer',
  meta: {
    name: 'Stripe: Create Customer',
    description: 'Creates a customer. Retried node executions reuse a deterministic Idempotency-Key so the write cannot double-apply. Writes {id} to outputKey.',
    category: 'integration',
    icon: 'user-plus',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'email', 'outputKey'],
      properties: {
        connectionId: { type: 'string', format: 'connection', service: 'stripe', description: 'Stripe Integration Connection' },
        email: { type: 'string', description: 'Customer email. Supports JSONata expressions starting with $.' },
        name: { type: 'string', description: 'Customer name. Supports JSONata expressions.' },
        outputKey: { type: 'string', description: 'Context key to write {id} to' },
      },
    },
    input: {},
    output: { type: 'object', properties: { id: { type: 'string' } } },
  },
  async execute(ctx, config) {
    try {
      const key = apiKey(ctx, config.connectionId);
      const email = await resolveField(ctx, config.email);
      const name = config.name !== undefined ? await resolveField(ctx, config.name) : undefined;

      const body = new URLSearchParams({ email });
      if (name) body.set('name', name);

      const nodeId = ((ctx as unknown as Record<string, unknown>)._currentNodeId as string) ?? 'stripe-create-customer';
      const response = await fetch(`${API}/customers`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Idempotency-Key': deriveIdempotencyKey({ runId: ctx.runId, nodeId, payload: { email, name } }),
        },
        body,
      });
      if (!response.ok) throw await errorFromResponse('stripe', response);

      const data = (await response.json()) as { id: string };
      const result = { id: data.id };
      ctx.set(config.outputKey, result);
      return { status: 'complete' as const, outputs: { [config.outputKey]: result } };
    } catch (err) {
      return fail(err);
    }
  },
};

interface ListChargesConfig {
  connectionId: string;
  customerId?: string;
  maxCharges?: number;
  outputKey: string;
}

export const stripeListCharges: NodeModule<ListChargesConfig> = {
  type: 'integration:stripe:list-charges',
  meta: {
    name: 'Stripe: List Charges',
    description: 'Lists charges with starting_after cursor pagination. Writes an array of {id, amount, currency, status} to outputKey.',
    category: 'integration',
    icon: 'credit-card',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'outputKey'],
      properties: {
        connectionId: { type: 'string', format: 'connection', service: 'stripe', description: 'Stripe Integration Connection' },
        customerId: { type: 'string', description: 'Filter to one customer. Supports JSONata expressions.' },
        maxCharges: { type: 'number', description: 'Maximum charges to return (default: 100)' },
        outputKey: { type: 'string', description: 'Context key to write the charge array to' },
      },
    },
    input: {},
    output: { type: 'object', properties: { charges: { type: 'array' } } },
  },
  async execute(ctx, config) {
    try {
      const key = apiKey(ctx, config.connectionId);
      const customerId =
        config.customerId !== undefined ? await resolveField(ctx, config.customerId) : undefined;

      interface Charge { id: string; amount: number; currency: string; status: string }
      const charges = await collectAll<Charge, string>(
        async (cursor) => {
          const params = new URLSearchParams({ limit: '100' });
          if (customerId) params.set('customer', customerId);
          if (cursor) params.set('starting_after', cursor);
          const response = await fetch(`${API}/charges?${params}`, {
            headers: { Authorization: `Bearer ${key}` },
          });
          if (!response.ok) throw await errorFromResponse('stripe', response);
          const data = (await response.json()) as { data: Charge[]; has_more: boolean };
          const items = data.data ?? [];
          return {
            items,
            nextCursor: data.has_more && items.length > 0 ? items[items.length - 1].id : null,
          };
        },
        { maxItems: config.maxCharges ?? 100 },
      );

      const result = charges.map((c) => ({ id: c.id, amount: c.amount, currency: c.currency, status: c.status }));
      ctx.set(config.outputKey, result);
      return { status: 'complete' as const, outputs: { [config.outputKey]: result } };
    } catch (err) {
      return fail(err);
    }
  },
};

const STRIPE_TOLERANCE_S = 300;

/**
 * Stripe webhook scheme: Stripe-Signature header of the form
 * `t=<timestamp>,v1=<hmac>[,v1=...]` where each v1 is HMAC-SHA256 over
 * `${t}.${rawBody}` keyed with the endpoint signing secret.
 */
export function verifyStripeSignature(
  rawBody: string,
  headers: Record<string, string | string[] | undefined>,
  secret: string,
  nowS: number = Math.floor(Date.now() / 1000),
): boolean {
  const raw = headers['stripe-signature'];
  const header = Array.isArray(raw) ? raw[0] : raw;
  if (!header) return false;

  let timestamp: string | undefined;
  const signatures: string[] = [];
  for (const part of header.split(',')) {
    const [k, v] = part.split('=', 2);
    if (k === 't') timestamp = v;
    if (k === 'v1' && v) signatures.push(v);
  }
  if (!timestamp || signatures.length === 0) return false;

  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(nowS - ts) > STRIPE_TOLERANCE_S) return false;

  const expected = crypto.createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest('hex');
  const expBuf = Buffer.from(expected);
  return signatures.some((sig) => {
    const sigBuf = Buffer.from(sig);
    return sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);
  });
}

export const stripeTrigger: IntegrationTriggerHandler = {
  service: 'stripe',
  verifySignature(rawBody, headers, secret): boolean {
    return verifyStripeSignature(rawBody, headers, secret);
  },
  eventType(payload): string | undefined {
    // e.g. "payment_intent.succeeded"
    return (payload as { type?: string })?.type;
  },
};

export const STRIPE_INTEGRATION: IntegrationPackage = {
  service: 'stripe',
  displayName: 'Stripe',
  description: 'Create customers, inspect charges, and trigger agents from Stripe webhook events.',
  version: '0.1.0',
  authType: 'api_key',
  authSchema: {
    fields: [
      { key: 'api_key', label: 'Secret Key', type: 'secret', required: true, description: 'sk_live_ or sk_test_ secret key' },
    ],
  },
  nodes: [stripeCreateCustomer, stripeListCharges],
  trigger: stripeTrigger,
};

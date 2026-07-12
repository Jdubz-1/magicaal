import * as crypto from 'node:crypto';
import type {
  ExecutionContext,
  IntegrationPackage,
  IntegrationTriggerHandler,
  NodeModule,
} from '@magicaal/sdk-node';
import { IntegrationError, errorFromResponse, resolveField, parseLinkHeader } from '@magicaal/integration-core';

const API_VERSION = '2024-10';

interface ShopifyAuth {
  shopUrl: string;
  accessToken: string;
}

function auth(ctx: ExecutionContext, connectionId: string): ShopifyAuth {
  const creds = ctx.credentials[connectionId];
  const extra = creds?.extra ?? {};
  const shopUrl = typeof extra.shop_url === 'string' ? extra.shop_url.replace(/\/$/, '') : undefined;
  const accessToken =
    creds?.accessToken ?? creds?.apiKey ?? (typeof extra.access_token === 'string' ? extra.access_token : undefined);
  if (!shopUrl || !accessToken) {
    throw new IntegrationError({
      service: 'shopify',
      message: `shopify: connection "${connectionId}" is missing shop_url or an access token`,
      code: 'CONNECTION_NOT_RESOLVED',
      retryable: false,
    });
  }
  return { shopUrl, accessToken };
}

interface ListOrdersConfig {
  connectionId: string;
  status?: 'open' | 'closed' | 'cancelled' | 'any';
  maxOrders?: number;
  outputKey: string;
}

export const shopifyListOrders: NodeModule<ListOrdersConfig> = {
  type: 'integration:shopify:list-orders',
  meta: {
    name: 'Shopify: List Orders',
    description: 'Lists orders with Link-header pagination. Writes an array of {id, name, total_price, financial_status} to outputKey.',
    category: 'integration',
    icon: 'shopping-cart',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'outputKey'],
      properties: {
        connectionId: { type: 'string', format: 'connection', service: 'shopify', description: 'Shopify Integration Connection' },
        status: { type: 'string', enum: ['open', 'closed', 'cancelled', 'any'], description: 'Order status filter (default: open)' },
        maxOrders: { type: 'number', description: 'Maximum orders to return (default: 250)' },
        outputKey: { type: 'string', description: 'Context key to write the order array to' },
      },
    },
    input: {},
    output: { type: 'object', properties: { orders: { type: 'array' } } },
  },
  async execute(ctx, config) {
    try {
      const shop = auth(ctx, config.connectionId);
      const max = config.maxOrders ?? 250;

      interface Order { id: number; name: string; total_price: string; financial_status: string }
      const orders: Order[] = [];
      let url: string | null =
        `${shop.shopUrl}/admin/api/${API_VERSION}/orders.json?status=${config.status ?? 'open'}&limit=250`;

      while (url && orders.length < max) {
        const response: Response = await fetch(url, {
          headers: { 'X-Shopify-Access-Token': shop.accessToken },
        });
        if (!response.ok) throw await errorFromResponse('shopify', response);
        const data = (await response.json()) as { orders: Order[] };
        orders.push(...(data.orders ?? []));
        url = parseLinkHeader(response.headers.get('link')).next ?? null;
      }

      const result = orders.slice(0, max).map((o) => ({
        id: o.id,
        name: o.name,
        total_price: o.total_price,
        financial_status: o.financial_status,
      }));
      ctx.set(config.outputKey, result);
      return { status: 'complete' as const, outputs: { [config.outputKey]: result } };
    } catch (err) {
      if (err instanceof IntegrationError) {
        return {
          status: 'failed' as const,
          outputs: {},
          error: { code: err.code ?? 'SHOPIFY_ERROR', message: err.message, retryable: err.retryable },
        };
      }
      throw err;
    }
  },
};

interface CreateProductConfig {
  connectionId: string;
  title: string;
  bodyHtml?: string;
  outputKey: string;
}

export const shopifyCreateProduct: NodeModule<CreateProductConfig> = {
  type: 'integration:shopify:create-product',
  meta: {
    name: 'Shopify: Create Product',
    description: 'Creates a product. Writes {id, handle} to outputKey.',
    category: 'integration',
    icon: 'package',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'title', 'outputKey'],
      properties: {
        connectionId: { type: 'string', format: 'connection', service: 'shopify', description: 'Shopify Integration Connection' },
        title: { type: 'string', description: 'Product title. Supports JSONata expressions starting with $.' },
        bodyHtml: { type: 'string', description: 'Product description HTML. Supports JSONata expressions.' },
        outputKey: { type: 'string', description: 'Context key to write {id, handle} to' },
      },
    },
    input: {},
    output: { type: 'object', properties: { id: { type: 'number' }, handle: { type: 'string' } } },
  },
  async execute(ctx, config) {
    try {
      const shop = auth(ctx, config.connectionId);
      const title = await resolveField(ctx, config.title);
      const bodyHtml = config.bodyHtml !== undefined ? await resolveField(ctx, config.bodyHtml) : undefined;

      const response = await fetch(`${shop.shopUrl}/admin/api/${API_VERSION}/products.json`, {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': shop.accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product: { title, ...(bodyHtml !== undefined ? { body_html: bodyHtml } : {}) } }),
      });
      if (!response.ok) throw await errorFromResponse('shopify', response);

      const data = (await response.json()) as { product: { id: number; handle: string } };
      const result = { id: data.product.id, handle: data.product.handle };
      ctx.set(config.outputKey, result);
      return { status: 'complete' as const, outputs: { [config.outputKey]: result } };
    } catch (err) {
      if (err instanceof IntegrationError) {
        return {
          status: 'failed' as const,
          outputs: {},
          error: { code: err.code ?? 'SHOPIFY_ERROR', message: err.message, retryable: err.retryable },
        };
      }
      throw err;
    }
  },
};

/**
 * Shopify webhook signature: X-Shopify-Hmac-Sha256 is base64 HMAC-SHA256
 * over the raw body keyed with the webhook signing secret. Event type comes
 * from X-Shopify-Topic (e.g. orders/create).
 */
export function verifyShopifySignature(
  rawBody: string,
  headers: Record<string, string | string[] | undefined>,
  secret: string,
): boolean {
  const raw = headers['x-shopify-hmac-sha256'];
  const signature = Array.isArray(raw) ? raw[0] : raw;
  if (!signature) return false;

  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('base64');
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  return sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);
}

export const shopifyTrigger: IntegrationTriggerHandler = {
  service: 'shopify',
  verifySignature(rawBody, headers, secret): boolean {
    return verifyShopifySignature(rawBody, headers, secret);
  },
  eventType(_payload, headers): string | undefined {
    const raw = headers['x-shopify-topic'];
    return Array.isArray(raw) ? raw[0] : raw;
  },
};

export const SHOPIFY_INTEGRATION: IntegrationPackage = {
  service: 'shopify',
  displayName: 'Shopify',
  description: 'List orders, create products, and trigger agents from Shopify webhook topics.',
  version: '0.1.0',
  authType: 'api_key',
  authSchema: {
    fields: [
      { key: 'shop_url', label: 'Shop URL', type: 'string', required: true, description: 'e.g. https://acme.myshopify.com' },
      { key: 'access_token', label: 'Admin API Access Token', type: 'secret', required: true, description: 'shpat_ token from a custom app' },
    ],
  },
  nodes: [shopifyListOrders, shopifyCreateProduct],
  trigger: shopifyTrigger,
};

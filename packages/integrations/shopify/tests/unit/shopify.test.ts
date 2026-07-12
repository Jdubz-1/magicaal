import * as crypto from 'node:crypto';
import { shopifyListOrders, shopifyCreateProduct, verifyShopifySignature, shopifyTrigger } from '../../src/index';
import { makeMockContext } from '../helpers/mock-context';

const CREDS = {
  'conn-1': {
    type: 'apikey' as const,
    extra: { shop_url: 'https://acme.myshopify.com', access_token: 'shpat_token' },
  },
};
const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('integration:shopify:list-orders', () => {
  it('lists orders with the access-token header and Link pagination', async () => {
    const order = (id: number) => ({ id, name: `#${id}`, total_price: '10.00', financial_status: 'paid' });
    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ orders: [order(1)] }), {
          status: 200,
          headers: { link: '<https://acme.myshopify.com/admin/api/2024-10/orders.json?page_info=n2>; rel="next"' },
        }),
      )
      .mockResolvedValueOnce(new Response(JSON.stringify({ orders: [order(2)] }), { status: 200 }));
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    await shopifyListOrders.execute(ctx, { connectionId: 'conn-1', outputKey: 'orders' });

    expect(ctx.get<unknown[]>('orders')).toHaveLength(2);
    expect(mockFetch.mock.calls[0][1].headers['X-Shopify-Access-Token']).toBe('shpat_token');
    expect(mockFetch.mock.calls[1][0]).toContain('page_info=n2');
  });
});

describe('integration:shopify:create-product', () => {
  it('creates a product', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ product: { id: 77, handle: 'widget' } }), { status: 201 }),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await shopifyCreateProduct.execute(ctx, {
      connectionId: 'conn-1',
      title: 'Widget',
      outputKey: 'product',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('product')).toEqual({ id: 77, handle: 'widget' });
  });
});

describe('verifyShopifySignature', () => {
  const SECRET = 'shop-secret';
  const body = JSON.stringify({ id: 1, name: '#1001' });

  function sign(payload: string, secret: string = SECRET): string {
    return crypto.createHmac('sha256', secret).update(payload).digest('base64');
  }

  it('accepts a valid base64 HMAC', () => {
    expect(verifyShopifySignature(body, { 'x-shopify-hmac-sha256': sign(body) }, SECRET)).toBe(true);
  });

  it('rejects tampered payloads, wrong secrets, and missing headers', () => {
    expect(verifyShopifySignature(body.replace('1001', '9999'), { 'x-shopify-hmac-sha256': sign(body) }, SECRET)).toBe(false);
    expect(verifyShopifySignature(body, { 'x-shopify-hmac-sha256': sign(body, 'other') }, SECRET)).toBe(false);
    expect(verifyShopifySignature(body, {}, SECRET)).toBe(false);
  });

  it('reads the topic header as the event type', () => {
    expect(shopifyTrigger.eventType({}, { 'x-shopify-topic': 'orders/create' })).toBe('orders/create');
  });
});

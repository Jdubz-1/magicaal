import * as crypto from 'node:crypto';
import { stripeCreateCustomer, stripeListCharges, verifyStripeSignature, stripeTrigger } from '../../src/index';
import { makeMockContext } from '../helpers/mock-context';

const CREDS = { 'conn-1': { type: 'apikey' as const, apiKey: 'sk_test_key' } };
const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('integration:stripe:create-customer', () => {
  it('sends form-encoded body with a deterministic Idempotency-Key', async () => {
    const mockFetch = jest.fn().mockImplementation(async () => {
      return new Response(JSON.stringify({ id: 'cus_1' }), { status: 200 });
    });
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const config = { connectionId: 'conn-1', email: 'a@b.com', name: 'Ada', outputKey: 'cust' };
    const result = await stripeCreateCustomer.execute(ctx, config);

    expect(result.status).toBe('complete');
    expect(ctx.get('cust')).toEqual({ id: 'cus_1' });

    const [, init] = mockFetch.mock.calls[0];
    expect(init.headers['Content-Type']).toBe('application/x-www-form-urlencoded');
    const key1 = init.headers['Idempotency-Key'];
    expect(key1).toMatch(/^[0-9a-f]{64}$/);

    // A retried execution derives the same key
    await stripeCreateCustomer.execute(ctx, config);
    expect(mockFetch.mock.calls[1][1].headers['Idempotency-Key']).toBe(key1);
  });
});

describe('integration:stripe:list-charges', () => {
  it('paginates with starting_after cursors', async () => {
    const page = (ids: string[], hasMore: boolean) =>
      new Response(
        JSON.stringify({
          data: ids.map((id) => ({ id, amount: 100, currency: 'usd', status: 'succeeded' })),
          has_more: hasMore,
        }),
        { status: 200 },
      );
    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce(page(['ch_1', 'ch_2'], true))
      .mockResolvedValueOnce(page(['ch_3'], false));
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    await stripeListCharges.execute(ctx, { connectionId: 'conn-1', outputKey: 'charges' });

    expect(ctx.get<Array<{ id: string }>>('charges')!.map((c) => c.id)).toEqual(['ch_1', 'ch_2', 'ch_3']);
    expect(mockFetch.mock.calls[1][0]).toContain('starting_after=ch_2');
  });
});

describe('verifyStripeSignature', () => {
  const SECRET = 'whsec_test';
  const NOW_S = 1_700_000_000;
  const body = JSON.stringify({ type: 'payment_intent.succeeded' });

  function sign(payload: string, t: number = NOW_S, secret: string = SECRET): string {
    const v1 = crypto.createHmac('sha256', secret).update(`${t}.${payload}`).digest('hex');
    return `t=${t},v1=${v1}`;
  }

  it('accepts a valid t=,v1= header', () => {
    expect(verifyStripeSignature(body, { 'stripe-signature': sign(body) }, SECRET, NOW_S)).toBe(true);
  });

  it('rejects a tampered payload', () => {
    const header = { 'stripe-signature': sign(body) };
    expect(verifyStripeSignature(body.replace('succeeded', 'failed'), header, SECRET, NOW_S)).toBe(false);
  });

  it('rejects a stale timestamp', () => {
    const stale = NOW_S - 600;
    expect(
      verifyStripeSignature(body, { 'stripe-signature': sign(body, stale) }, SECRET, NOW_S),
    ).toBe(false);
  });

  it('rejects a wrong secret and missing header', () => {
    expect(
      verifyStripeSignature(body, { 'stripe-signature': sign(body, NOW_S, 'other') }, SECRET, NOW_S),
    ).toBe(false);
    expect(verifyStripeSignature(body, {}, SECRET, NOW_S)).toBe(false);
  });

  it('extracts the Stripe event type', () => {
    expect(stripeTrigger.eventType({ type: 'charge.refunded' }, {})).toBe('charge.refunded');
  });
});

import { quickbooksCreateCustomer } from '../../src/index';
import { makeMockContext } from '../helpers/mock-context';

const CREDS = {
  'conn-1': { type: 'oauth' as const, accessToken: 'qb-token', extra: { realm_id: '9341' } },
};
const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('integration:quickbooks:create-customer', () => {
  it('creates a customer against the production API by default', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ Customer: { Id: '58' } }), { status: 200 }),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await quickbooksCreateCustomer.execute(ctx, {
      connectionId: 'conn-1',
      displayName: 'Acme Corp',
      email: 'billing@acme.com',
      outputKey: 'customer',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('customer')).toEqual({ id: '58' });

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe('https://quickbooks.api.intuit.com/v3/company/9341/customer');
    const body = JSON.parse(init.body);
    expect(body.DisplayName).toBe('Acme Corp');
    expect(body.PrimaryEmailAddr.Address).toBe('billing@acme.com');
  });

  it('targets the sandbox host when sandbox is set', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ Customer: { Id: '1' } }), { status: 200 }),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext(
      {},
      { 'conn-1': { type: 'oauth' as const, accessToken: 't', extra: { realm_id: '1', sandbox: 'true' } } },
    );
    await quickbooksCreateCustomer.execute(ctx, {
      connectionId: 'conn-1',
      displayName: 'X',
      outputKey: 'out',
    });

    expect(mockFetch.mock.calls[0][0]).toContain('https://sandbox-quickbooks.api.intuit.com');
  });
});

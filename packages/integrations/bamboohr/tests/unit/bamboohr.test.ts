import * as crypto from 'node:crypto';
import { bamboohrListEmployees, verifyBamboohrSignature, bamboohrTrigger } from '../../src/index';
import { makeMockContext } from '../helpers/mock-context';

const CREDS = {
  'conn-1': { type: 'apikey' as const, extra: { subdomain: 'acme', api_key: 'bh-key' } },
};
const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('integration:bamboohr:list-employees', () => {
  it('fetches the directory with api-key Basic auth', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          employees: [{ id: '4', displayName: 'Ada L', jobTitle: 'Eng', workEmail: 'ada@acme.com' }],
        }),
        { status: 200 },
      ),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await bamboohrListEmployees.execute(ctx, {
      connectionId: 'conn-1',
      outputKey: 'employees',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get<unknown[]>('employees')).toHaveLength(1);

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe('https://api.bamboohr.com/api/gateway.php/acme/v1/employees/directory');
    const expectedBasic = Buffer.from('bh-key:x').toString('base64');
    expect(init.headers.Authorization).toBe(`Basic ${expectedBasic}`);
  });
});

describe('verifyBamboohrSignature', () => {
  const SECRET = 'bh-webhook-key';
  const TS = '1700000000';
  const body = JSON.stringify({ type: 'employee.updated' });

  function headersFor(payload: string, secret: string = SECRET) {
    return {
      'x-bamboohr-signature': crypto.createHmac('sha256', secret).update(`${payload}${TS}`).digest('hex'),
      'x-bamboohr-timestamp': TS,
    };
  }

  it('accepts a valid HMAC over body+timestamp', () => {
    expect(verifyBamboohrSignature(body, headersFor(body), SECRET)).toBe(true);
  });

  it('rejects tampered payloads and wrong secrets', () => {
    expect(verifyBamboohrSignature(body.replace('updated', 'deleted'), headersFor(body), SECRET)).toBe(false);
    expect(verifyBamboohrSignature(body, headersFor(body, 'other'), SECRET)).toBe(false);
    expect(verifyBamboohrSignature(body, {}, SECRET)).toBe(false);
  });

  it('extracts the event type', () => {
    expect(bamboohrTrigger.eventType({ type: 'employee.updated' }, {})).toBe('employee.updated');
  });
});

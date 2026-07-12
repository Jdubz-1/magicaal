import * as crypto from 'node:crypto';
import { salesforceCreateRecord, salesforceQuery, salesforceTrigger } from '../../src/index';
import { makeMockContext } from '../helpers/mock-context';

const CREDS = {
  'conn-1': {
    type: 'oauth' as const,
    accessToken: 'sf-token',
    extra: { instance_url: 'https://acme.my.salesforce.com' },
  },
};
const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('integration:salesforce:create-record', () => {
  it('creates an sObject record with resolved field expressions', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: '00Q1', success: true }), { status: 201 }),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    (ctx.evaluate as jest.Mock).mockResolvedValue('Ada Lovelace');

    const result = await salesforceCreateRecord.execute(ctx, {
      connectionId: 'conn-1',
      objectType: 'Lead',
      fields: { LastName: '$.name', Company: 'Acme' },
      outputKey: 'lead',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('lead')).toEqual({ id: '00Q1' });

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe('https://acme.my.salesforce.com/services/data/v59.0/sobjects/Lead');
    const body = JSON.parse(init.body);
    expect(body.LastName).toBe('Ada Lovelace');
    expect(body.Company).toBe('Acme');
  });

  it('fails when instance_url is missing', async () => {
    const ctx = makeMockContext({}, { 'conn-1': { type: 'oauth' as const, accessToken: 't' } });
    const result = await salesforceCreateRecord.execute(ctx, {
      connectionId: 'conn-1',
      objectType: 'Lead',
      fields: {},
      outputKey: 'out',
    });
    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('CONNECTION_NOT_RESOLVED');
  });
});

describe('integration:salesforce:query', () => {
  it('follows nextRecordsUrl pagination', async () => {
    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({ records: [{ Id: '1' }], done: false, nextRecordsUrl: '/services/data/v59.0/query/next-1' }),
          { status: 200 },
        ),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ records: [{ Id: '2' }], done: true }), { status: 200 }),
      );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    await salesforceQuery.execute(ctx, {
      connectionId: 'conn-1',
      soql: 'SELECT Id FROM Lead',
      outputKey: 'rows',
    });

    expect(ctx.get<unknown[]>('rows')).toHaveLength(2);
    expect(mockFetch.mock.calls[1][0]).toBe(
      'https://acme.my.salesforce.com/services/data/v59.0/query/next-1',
    );
  });
});

describe('salesforceTrigger', () => {
  const SECRET = 'sf-secret';
  const body = JSON.stringify({ eventType: 'opportunity.won' });

  function sign(payload: string, secret: string = SECRET): string {
    return `sha256=${crypto.createHmac('sha256', secret).update(payload).digest('hex')}`;
  }

  it('verifies the X-MagiCaal-Signature HMAC', () => {
    expect(salesforceTrigger.verifySignature(body, { 'x-magicaal-signature': sign(body) }, SECRET)).toBe(true);
    expect(
      salesforceTrigger.verifySignature(body.replace('won', 'lost'), { 'x-magicaal-signature': sign(body) }, SECRET),
    ).toBe(false);
    expect(salesforceTrigger.verifySignature(body, {}, SECRET)).toBe(false);
  });

  it('extracts payload.eventType', () => {
    expect(salesforceTrigger.eventType({ eventType: 'lead.created' }, {})).toBe('lead.created');
  });
});

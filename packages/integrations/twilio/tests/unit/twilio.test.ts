import { twilioSendSms } from '../../src/index';
import { makeMockContext } from '../helpers/mock-context';

const CREDS = {
  'conn-1': { type: 'apikey' as const, extra: { account_sid: 'AC123', auth_token: 'tok' } },
};
const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('integration:twilio:send-sms', () => {
  it('POSTs form-encoded message params with account Basic auth', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ sid: 'SM1', status: 'queued' }), { status: 201 }),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await twilioSendSms.execute(ctx, {
      connectionId: 'conn-1',
      to: '+15551234567',
      from: '+15559876543',
      body: 'Deploy finished',
      outputKey: 'sms',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('sms')).toEqual({ sid: 'SM1', status: 'queued' });

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe('https://api.twilio.com/2010-04-01/Accounts/AC123/Messages.json');
    const expectedBasic = Buffer.from('AC123:tok').toString('base64');
    expect(init.headers.Authorization).toBe(`Basic ${expectedBasic}`);
    const body = init.body as URLSearchParams;
    expect(body.get('To')).toBe('+15551234567');
    expect(body.get('Body')).toBe('Deploy finished');
  });

  it('fails without account_sid', async () => {
    const ctx = makeMockContext({}, { 'conn-1': { type: 'apikey' as const, apiKey: 'tok' } });
    const result = await twilioSendSms.execute(ctx, {
      connectionId: 'conn-1',
      to: '+1',
      from: '+2',
      body: 'x',
      outputKey: 'out',
    });
    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('CONNECTION_NOT_RESOLVED');
  });
});

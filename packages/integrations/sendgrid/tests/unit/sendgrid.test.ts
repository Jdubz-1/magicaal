import { sendgridSendEmail } from '../../src/index';
import { makeMockContext } from '../helpers/mock-context';

const CREDS = { 'conn-1': { type: 'apikey' as const, apiKey: 'SG.key' } };
const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('integration:sendgrid:send-email', () => {
  it('POSTs a v3 mail/send payload and captures the message id', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(null, { status: 202, headers: { 'x-message-id': 'msg-1' } }),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await sendgridSendEmail.execute(ctx, {
      connectionId: 'conn-1',
      to: 'a@b.com',
      from: 'noreply@acme.com',
      subject: 'Hi',
      body: '<b>Hello</b>',
      html: true,
      outputKey: 'sent',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('sent')).toEqual({ messageId: 'msg-1' });

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe('https://api.sendgrid.com/v3/mail/send');
    expect(init.headers.Authorization).toBe('Bearer SG.key');
    const body = JSON.parse(init.body);
    expect(body.personalizations[0].to[0].email).toBe('a@b.com');
    expect(body.content[0].type).toBe('text/html');
  });

  it('surfaces SendGrid error bodies', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ errors: [{ message: 'does not contain a valid address' }] }), {
        status: 400,
      }),
    ) as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await sendgridSendEmail.execute(ctx, {
      connectionId: 'conn-1',
      to: 'bad',
      from: 'noreply@acme.com',
      subject: 's',
      body: 'b',
      outputKey: 'out',
    });
    expect(result.status).toBe('failed');
    expect(result.error?.message).toContain('valid address');
  });
});

import * as crypto from 'node:crypto';
import { hubspotCreateContact, hubspotSearchContacts, hubspotTrigger } from '../../src/index';
import { makeMockContext } from '../helpers/mock-context';

const CREDS = { 'conn-1': { type: 'oauth' as const, accessToken: 'pat-token' } };
const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('integration:hubspot:create-contact', () => {
  it('creates a CRM contact with lowercase property names', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: '501' }), { status: 201 }),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await hubspotCreateContact.execute(ctx, {
      connectionId: 'conn-1',
      email: 'a@b.com',
      firstName: 'Ada',
      outputKey: 'contact',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('contact')).toEqual({ id: '501' });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.properties).toEqual({ email: 'a@b.com', firstname: 'Ada' });
  });
});

describe('integration:hubspot:search-contacts', () => {
  it('searches by email filter', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ results: [{ id: '501', properties: { email: 'a@b.com' } }] }), {
        status: 200,
      }),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    await hubspotSearchContacts.execute(ctx, {
      connectionId: 'conn-1',
      email: 'a@b.com',
      outputKey: 'found',
    });

    expect(ctx.get<unknown[]>('found')).toHaveLength(1);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.filterGroups[0].filters[0]).toEqual({
      propertyName: 'email',
      operator: 'EQ',
      value: 'a@b.com',
    });
  });
});

describe('hubspotTrigger', () => {
  const SECRET = 'client-secret';
  const body = JSON.stringify([{ subscriptionType: 'contact.creation', objectId: 1 }]);

  function sign(payload: string, secret: string = SECRET): string {
    return crypto.createHash('sha256').update(`${secret}${payload}`).digest('hex');
  }

  it('verifies the v1 signature (sha256 of secret+body)', () => {
    expect(hubspotTrigger.verifySignature(body, { 'x-hubspot-signature': sign(body) }, SECRET)).toBe(true);
    expect(
      hubspotTrigger.verifySignature(body.replace('creation', 'deletion'), { 'x-hubspot-signature': sign(body) }, SECRET),
    ).toBe(false);
    expect(hubspotTrigger.verifySignature(body, {}, SECRET)).toBe(false);
  });

  it('extracts subscriptionType from array payloads', () => {
    expect(hubspotTrigger.eventType(JSON.parse(body), {})).toBe('contact.creation');
  });
});

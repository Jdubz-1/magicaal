import { sheetsAppendRow, calendarCreateEvent, googleWorkspaceTrigger } from '../../src/index';
import { makeMockContext } from '../helpers/mock-context';

const CREDS = { 'conn-1': { type: 'oauth' as const, accessToken: 'ya29.token' } };
const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('integration:google-workspace:sheets-append-row', () => {
  it('appends a row via values:append', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ updates: { updatedRange: 'Sheet1!A5:C5' } }), { status: 200 }),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await sheetsAppendRow.execute(ctx, {
      connectionId: 'conn-1',
      spreadsheetId: 'sheet-id',
      range: 'Sheet1!A:C',
      values: ['a', 'b', 'c'],
      outputKey: 'row',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('row')).toEqual({ updatedRange: 'Sheet1!A5:C5' });

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toContain('/spreadsheets/sheet-id/values/');
    expect(url).toContain('valueInputOption=USER_ENTERED');
    expect(JSON.parse(init.body).values).toEqual([['a', 'b', 'c']]);
  });
});

describe('integration:google-workspace:calendar-create-event', () => {
  it('creates an event on the primary calendar by default', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: 'evt-1', htmlLink: 'https://cal/evt-1' }), { status: 200 }),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await calendarCreateEvent.execute(ctx, {
      connectionId: 'conn-1',
      summary: 'Standup',
      startIso: '2026-07-12T09:00:00Z',
      endIso: '2026-07-12T09:15:00Z',
      outputKey: 'event',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('event')).toEqual({ id: 'evt-1', htmlLink: 'https://cal/evt-1' });
    expect(mockFetch.mock.calls[0][0]).toContain('/calendars/primary/events');
  });
});

describe('googleWorkspaceTrigger', () => {
  it('verifies the watch channel token', () => {
    expect(
      googleWorkspaceTrigger.verifySignature('{}', { 'x-goog-channel-token': 's1' }, 's1'),
    ).toBe(true);
    expect(
      googleWorkspaceTrigger.verifySignature('{}', { 'x-goog-channel-token': 'nope' }, 's1'),
    ).toBe(false);
  });

  it('reads the resource state as the event type', () => {
    expect(googleWorkspaceTrigger.eventType({}, { 'x-goog-resource-state': 'exists' })).toBe('exists');
  });
});

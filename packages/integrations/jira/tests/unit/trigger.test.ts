import * as crypto from 'node:crypto';
import { jiraTrigger, verifyJiraSignature } from '../../src/trigger';

const SECRET = 'jira-webhook-secret';

function sign(rawBody: string, secret: string = SECRET): string {
  return `sha256=${crypto.createHmac('sha256', secret).update(rawBody).digest('hex')}`;
}

describe('verifyJiraSignature', () => {
  const body = JSON.stringify({ webhookEvent: 'jira:issue_created', issue: { key: 'ENG-1' } });

  it('accepts a correctly signed request', () => {
    expect(verifyJiraSignature(body, { 'x-hub-signature': sign(body) }, SECRET)).toBe(true);
  });

  it('rejects a tampered body', () => {
    const headers = { 'x-hub-signature': sign(body) };
    expect(verifyJiraSignature(body.replace('ENG-1', 'ENG-2'), headers, SECRET)).toBe(false);
  });

  it('rejects a wrong secret', () => {
    expect(
      verifyJiraSignature(body, { 'x-hub-signature': sign(body, 'other') }, SECRET),
    ).toBe(false);
  });

  it('rejects a missing signature header', () => {
    expect(verifyJiraSignature(body, {}, SECRET)).toBe(false);
  });
});

describe('jiraTrigger', () => {
  it('extracts webhookEvent as the event type', () => {
    expect(jiraTrigger.eventType({ webhookEvent: 'jira:issue_created' }, {})).toBe(
      'jira:issue_created',
    );
  });

  it('returns undefined when no webhookEvent is present', () => {
    expect(jiraTrigger.eventType({}, {})).toBeUndefined();
  });
});

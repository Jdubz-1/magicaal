import * as crypto from 'node:crypto';
import { githubTrigger, verifyGithubSignature } from '../../src/trigger';

const SECRET = 'webhook-secret';

function sign(rawBody: string, secret: string = SECRET): string {
  return `sha256=${crypto.createHmac('sha256', secret).update(rawBody).digest('hex')}`;
}

describe('verifyGithubSignature', () => {
  const body = JSON.stringify({ ref: 'refs/heads/main', commits: [] });

  it('accepts a correctly signed request', () => {
    expect(
      verifyGithubSignature(body, { 'x-hub-signature-256': sign(body) }, SECRET),
    ).toBe(true);
  });

  it('rejects a tampered body', () => {
    const headers = { 'x-hub-signature-256': sign(body) };
    expect(verifyGithubSignature(body.replace('main', 'evil'), headers, SECRET)).toBe(false);
  });

  it('rejects a wrong secret', () => {
    expect(
      verifyGithubSignature(body, { 'x-hub-signature-256': sign(body, 'other') }, SECRET),
    ).toBe(false);
  });

  it('rejects a missing signature header', () => {
    expect(verifyGithubSignature(body, {}, SECRET)).toBe(false);
  });
});

describe('githubTrigger', () => {
  it('acknowledges the ping handshake', () => {
    expect(githubTrigger.handshake!({ zen: 'Design for failure.', hook_id: 1 })).toEqual({
      ok: true,
    });
  });

  it('does not treat normal events as handshakes', () => {
    expect(githubTrigger.handshake!({ ref: 'refs/heads/main' })).toBeUndefined();
  });

  it('derives the event type from the X-GitHub-Event header', () => {
    expect(githubTrigger.eventType({}, { 'x-github-event': 'push' })).toBe('push');
  });

  it('appends the action when present', () => {
    expect(
      githubTrigger.eventType({ action: 'opened' }, { 'x-github-event': 'pull_request' }),
    ).toBe('pull_request.opened');
  });
});

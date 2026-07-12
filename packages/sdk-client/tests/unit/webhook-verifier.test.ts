import { WebhookVerifier, WebhookVerificationError } from '../../src/webhook-verifier.js';

const SECRET = 'whsec_test';
const NOW_MS = 1_700_000_000_000;

describe('WebhookVerifier', () => {
  const verifier = new WebhookVerifier(SECRET);
  const payload = JSON.stringify({ event: 'run.completed', runId: 'run-1' });

  it('accepts a correctly signed payload', () => {
    const signature = verifier.sign(payload);
    expect(verifier.verify(payload, signature)).toBe(true);
  });

  it('rejects a tampered payload', () => {
    const signature = verifier.sign(payload);
    const tampered = payload.replace('run-1', 'run-2');
    expect(verifier.verify(tampered, signature)).toBe(false);
  });

  it('rejects a signature from a different secret', () => {
    const other = new WebhookVerifier('whsec_other');
    expect(verifier.verify(payload, other.sign(payload))).toBe(false);
  });

  it('rejects an empty signature', () => {
    expect(verifier.verify(payload, '')).toBe(false);
  });

  it('verifies timestamped signatures within tolerance', () => {
    const ts = Math.floor(NOW_MS / 1000);
    const signature = verifier.sign(payload, ts);
    expect(verifier.verify(payload, signature, { timestamp: ts, nowMs: NOW_MS })).toBe(true);
  });

  it('rejects stale timestamps (replay guard)', () => {
    const stale = Math.floor(NOW_MS / 1000) - 600;
    const signature = verifier.sign(payload, stale);
    expect(verifier.verify(payload, signature, { timestamp: stale, nowMs: NOW_MS })).toBe(false);
  });

  it('assertValid throws WebhookVerificationError on a tampered payload', () => {
    const signature = verifier.sign(payload);
    expect(() => verifier.assertValid(payload.replace('run-1', 'evil'), signature)).toThrow(
      WebhookVerificationError,
    );
    expect(() => verifier.assertValid(payload, signature)).not.toThrow();
  });

  it('refuses an empty secret at construction', () => {
    expect(() => new WebhookVerifier('')).toThrow(WebhookVerificationError);
  });
});

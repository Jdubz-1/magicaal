import { createHmac, timingSafeEqual } from 'node:crypto';
import { MagiCaalError } from './errors.js';

export class WebhookVerificationError extends MagiCaalError {
  constructor(message = 'Webhook signature verification failed') {
    super(message, 'webhook_verification_failed');
    this.name = 'WebhookVerificationError';
  }
}

export interface WebhookVerifyOptions {
  /**
   * Timestamp header value sent with the notification. When present the
   * signature covers `${timestamp}.${rawBody}` and staleness is enforced.
   */
  timestamp?: string | number;
  /** Maximum accepted timestamp age in seconds (default 300). */
  toleranceSeconds?: number;
  /** Clock override for tests. */
  nowMs?: number;
}

/**
 * Verifies MagiCaal outbound webhook notifications.
 *
 * Scheme: HMAC-SHA256 over the raw request body (or `${timestamp}.${rawBody}`
 * when a timestamp accompanies the delivery), hex-encoded and prefixed:
 * `X-MagiCaal-Signature: sha256=<hex>`.
 */
export class WebhookVerifier {
  constructor(private readonly secret: string) {
    if (!secret) throw new WebhookVerificationError('Webhook secret must not be empty');
  }

  /** Compute the expected signature for a payload (used by senders and tests). */
  sign(rawBody: string, timestamp?: string | number): string {
    const base = timestamp !== undefined ? `${timestamp}.${rawBody}` : rawBody;
    return `sha256=${createHmac('sha256', this.secret).update(base).digest('hex')}`;
  }

  /** True when the signature matches the payload. */
  verify(rawBody: string, signature: string, opts: WebhookVerifyOptions = {}): boolean {
    if (!signature) return false;

    if (opts.timestamp !== undefined) {
      const ts = Number(opts.timestamp);
      const tolerance = (opts.toleranceSeconds ?? 300) * 1000;
      const now = opts.nowMs ?? Date.now();
      if (!Number.isFinite(ts) || Math.abs(now - ts * 1000) > tolerance) return false;
    }

    const expected = this.sign(rawBody, opts.timestamp);
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expected);
    return sigBuf.length === expBuf.length && timingSafeEqual(sigBuf, expBuf);
  }

  /** Like verify(), but throws WebhookVerificationError on failure. */
  assertValid(rawBody: string, signature: string, opts: WebhookVerifyOptions = {}): void {
    if (!this.verify(rawBody, signature, opts)) {
      throw new WebhookVerificationError();
    }
  }
}

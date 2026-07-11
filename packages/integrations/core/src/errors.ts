/**
 * Standardized error type for all integration packages. Service-specific
 * error shapes are mapped into this so nodes, the engine, and telemetry
 * see one consistent structure regardless of which service failed.
 */
export class IntegrationError extends Error {
  readonly service: string;
  readonly status?: number;
  readonly code?: string;
  readonly retryable: boolean;
  readonly raw?: unknown;

  constructor(opts: {
    service: string;
    message: string;
    status?: number;
    code?: string;
    retryable?: boolean;
    raw?: unknown;
  }) {
    super(opts.message);
    this.name = 'IntegrationError';
    this.service = opts.service;
    this.status = opts.status;
    this.code = opts.code;
    this.retryable = opts.retryable ?? isRetryableStatus(opts.status);
    this.raw = opts.raw;
  }
}

/** 408/429 and all 5xx are transient; everything else is not. */
export function isRetryableStatus(status?: number): boolean {
  if (status === undefined) return false;
  return status === 408 || status === 429 || status >= 500;
}

/**
 * Build an IntegrationError from a failed HTTP response. Attempts to extract
 * a service error message from common JSON body shapes ({error}, {message},
 * {error_description}, {errors: [...]}) before falling back to the status text.
 */
export async function errorFromResponse(
  service: string,
  response: Response,
): Promise<IntegrationError> {
  let raw: unknown;
  let message = `${service} request failed with status ${response.status}`;
  let code: string | undefined;

  try {
    const text = await response.text();
    try {
      raw = JSON.parse(text);
      const body = raw as Record<string, unknown>;
      const candidate =
        (typeof body.error_description === 'string' && body.error_description) ||
        (typeof body.message === 'string' && body.message) ||
        (typeof body.error === 'string' && body.error) ||
        (Array.isArray(body.errors) && body.errors.length > 0 && JSON.stringify(body.errors[0]));
      if (candidate) message = `${service}: ${candidate}`;
      if (typeof body.error === 'string') code = body.error;
      if (typeof body.code === 'string') code = body.code;
    } catch {
      raw = text;
      if (text) message = `${service}: ${text.slice(0, 300)}`;
    }
  } catch {
    // body unreadable — keep the status-based message
  }

  return new IntegrationError({
    service,
    message,
    status: response.status,
    code,
    raw,
  });
}

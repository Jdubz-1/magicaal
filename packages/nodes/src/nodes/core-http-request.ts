import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';

interface HttpRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';
  url: string;
  headers?: Record<string, string>;
  body?: unknown;
  connectionId?: string;
  outputKey: string;
  timeoutMs?: number;
  followRedirects?: boolean;
}

export const coreHttpRequest: NodeModule<HttpRequestConfig> = {
  type: 'core:http-request',
  meta: {
    name: 'HTTP Request',
    description:
      'Makes an HTTP request to a URL. Supports GET, POST, PUT, PATCH, DELETE. Optionally uses an Integration Connection for authentication. Writes {status, ok, headers, body} to outputKey.',
    category: 'integration',
    icon: 'globe',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['url', 'outputKey'],
      properties: {
        method: {
          type: 'string',
          enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
          description: 'HTTP method (default: GET)',
        },
        url: {
          type: 'string',
          description: 'Request URL. Supports JSONata expressions starting with $.',
        },
        headers: {
          type: 'object',
          description: 'Additional request headers (key-value pairs)',
        },
        body: {
          description: 'Request body. Objects are JSON-serialised and Content-Type set automatically.',
        },
        connectionId: {
          type: 'string',
          description: 'Integration Connection ID to use for authentication headers',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write {status, ok, headers, body} response to',
        },
        timeoutMs: {
          type: 'number',
          description: 'Request timeout in milliseconds (default: 30000)',
        },
        followRedirects: {
          type: 'boolean',
          description: 'Follow HTTP redirects (default: true)',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _http_status: { type: 'number' },
        _http_ok: { type: 'boolean' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: HttpRequestConfig) {
    const method = config.method ?? 'GET';
    const timeoutMs = config.timeoutMs ?? 30_000;

    // Resolve URL — evaluate if it looks like a JSONata expression
    let url: string;
    try {
      url =
        typeof config.url === 'string' && config.url.includes('$')
          ? String(await ctx.evaluate(config.url))
          : config.url;
    } catch {
      url = config.url;
    }

    if (!url || !url.startsWith('http')) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'HTTP_INVALID_URL',
          message: `Invalid URL: "${url}"`,
          retryable: false,
        },
      };
    }

    // Build request headers
    const headers: Record<string, string> = { ...config.headers };

    // Inject auth from Integration Connection
    if (config.connectionId) {
      const creds = ctx.credentials[config.connectionId];
      if (creds) {
        if (creds.type === 'apikey' && creds.apiKey) {
          headers['Authorization'] = `Bearer ${creds.apiKey}`;
        } else if (creds.type === 'oauth' && creds.accessToken) {
          headers['Authorization'] = `Bearer ${creds.accessToken}`;
        }
      }
    }

    // Prepare body
    let bodyInit: string | undefined;
    if (config.body !== undefined && method !== 'GET' && method !== 'HEAD') {
      if (typeof config.body === 'string') {
        bodyInit = config.body;
      } else {
        bodyInit = JSON.stringify(config.body);
        if (!headers['Content-Type']) {
          headers['Content-Type'] = 'application/json';
        }
      }
    }

    // Execute request with timeout
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: bodyInit,
        signal: controller.signal,
        redirect: config.followRedirects === false ? 'manual' : 'follow',
      });

      clearTimeout(timer);

      // Parse response body
      const contentType = response.headers.get('content-type') ?? '';
      let body: unknown;
      if (contentType.includes('application/json')) {
        try {
          body = await response.json();
        } catch {
          body = await response.text();
        }
      } else {
        body = await response.text();
      }

      // Collect response headers as plain object
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      const result = {
        status: response.status,
        ok: response.ok,
        headers: responseHeaders,
        body,
      };

      ctx.set(config.outputKey, result);
      ctx.set('_http_status', response.status);
      ctx.set('_http_ok', response.ok);

      return {
        status: 'complete' as const,
        outputs: {
          [config.outputKey]: result,
          _http_status: response.status,
          _http_ok: response.ok,
        },
      };
    } catch (err) {
      clearTimeout(timer);

      if (err instanceof Error && err.name === 'AbortError') {
        return {
          status: 'failed' as const,
          outputs: {},
          error: {
            code: 'HTTP_TIMEOUT',
            message: `Request timed out after ${timeoutMs}ms`,
            retryable: true,
          },
        };
      }

      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'HTTP_REQUEST_FAILED',
          message: err instanceof Error ? err.message : 'HTTP request failed',
          retryable: true,
        },
      };
    }
  },
};

import * as crypto from 'node:crypto';
import type {
  ExecutionContext,
  IntegrationPackage,
  IntegrationTriggerHandler,
  NodeModule,
} from '@magicaal/sdk-node';
import { IntegrationError, errorFromResponse } from '@magicaal/integration-core';

interface BambooAuth {
  subdomain: string;
  authHeader: string;
}

function auth(ctx: ExecutionContext, connectionId: string): BambooAuth {
  const creds = ctx.credentials[connectionId];
  const extra = creds?.extra ?? {};
  const subdomain = typeof extra.subdomain === 'string' ? extra.subdomain : undefined;
  const apiKey = creds?.apiKey ?? (typeof extra.api_key === 'string' ? extra.api_key : undefined);
  if (!subdomain || !apiKey) {
    throw new IntegrationError({
      service: 'bamboohr',
      message: `bamboohr: connection "${connectionId}" is missing subdomain or api_key`,
      code: 'CONNECTION_NOT_RESOLVED',
      retryable: false,
    });
  }
  // BambooHR uses the API key as the Basic auth username with any password
  const basic = Buffer.from(`${apiKey}:x`).toString('base64');
  return { subdomain, authHeader: `Basic ${basic}` };
}

interface ListEmployeesConfig {
  connectionId: string;
  outputKey: string;
}

export const bamboohrListEmployees: NodeModule<ListEmployeesConfig> = {
  type: 'integration:bamboohr:list-employees',
  meta: {
    name: 'BambooHR: List Employees',
    description: 'Fetches the employee directory. Writes an array of {id, displayName, jobTitle, workEmail} to outputKey.',
    category: 'integration',
    icon: 'users',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'outputKey'],
      properties: {
        connectionId: { type: 'string', format: 'connection', service: 'bamboohr', description: 'BambooHR Integration Connection' },
        outputKey: { type: 'string', description: 'Context key to write the employee array to' },
      },
    },
    input: {},
    output: { type: 'object', properties: { employees: { type: 'array' } } },
  },
  async execute(ctx, config) {
    try {
      const bh = auth(ctx, config.connectionId);
      const response = await fetch(
        `https://api.bamboohr.com/api/gateway.php/${encodeURIComponent(bh.subdomain)}/v1/employees/directory`,
        { headers: { Authorization: bh.authHeader, Accept: 'application/json' } },
      );
      if (!response.ok) throw await errorFromResponse('bamboohr', response);

      const data = (await response.json()) as {
        employees?: Array<{ id: string; displayName: string; jobTitle?: string; workEmail?: string }>;
      };
      const employees = (data.employees ?? []).map((e) => ({
        id: e.id,
        displayName: e.displayName,
        jobTitle: e.jobTitle,
        workEmail: e.workEmail,
      }));
      ctx.set(config.outputKey, employees);
      return { status: 'complete' as const, outputs: { [config.outputKey]: employees } };
    } catch (err) {
      if (err instanceof IntegrationError) {
        return {
          status: 'failed' as const,
          outputs: {},
          error: { code: err.code ?? 'BAMBOOHR_ERROR', message: err.message, retryable: err.retryable },
        };
      }
      throw err;
    }
  },
};

/**
 * BambooHR webhook signature: X-BambooHR-Signature is HMAC-SHA256 hex over
 * `${rawBody}${timestamp}` keyed with the webhook private key, timestamp in
 * X-BambooHR-Timestamp.
 */
export function verifyBamboohrSignature(
  rawBody: string,
  headers: Record<string, string | string[] | undefined>,
  secret: string,
): boolean {
  const sigRaw = headers['x-bamboohr-signature'];
  const tsRaw = headers['x-bamboohr-timestamp'];
  const signature = Array.isArray(sigRaw) ? sigRaw[0] : sigRaw;
  const timestamp = Array.isArray(tsRaw) ? tsRaw[0] : tsRaw;
  if (!signature || !timestamp) return false;

  const expected = crypto.createHmac('sha256', secret).update(`${rawBody}${timestamp}`).digest('hex');
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  return sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);
}

export const bamboohrTrigger: IntegrationTriggerHandler = {
  service: 'bamboohr',
  verifySignature(rawBody, headers, secret): boolean {
    return verifyBamboohrSignature(rawBody, headers, secret);
  },
  eventType(payload): string | undefined {
    return (payload as { type?: string })?.type;
  },
};

export const BAMBOOHR_INTEGRATION: IntegrationPackage = {
  service: 'bamboohr',
  displayName: 'BambooHR',
  description: 'Read the employee directory and trigger agents from BambooHR webhook events.',
  version: '0.1.0',
  authType: 'api_key',
  authSchema: {
    fields: [
      { key: 'subdomain', label: 'Company Subdomain', type: 'string', required: true, description: 'the {subdomain} in {subdomain}.bamboohr.com' },
      { key: 'api_key', label: 'API Key', type: 'secret', required: true },
    ],
  },
  nodes: [bamboohrListEmployees],
  trigger: bamboohrTrigger,
};

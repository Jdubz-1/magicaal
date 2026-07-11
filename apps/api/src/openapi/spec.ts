import { config } from '../config';

type OpenApiOperation = {
  tags: string[];
  summary: string;
  security?: Array<Record<string, string[]>>;
  parameters?: Array<{
    name: string;
    in: 'path' | 'query';
    required?: boolean;
    schema: { type: string };
    description?: string;
  }>;
  requestBody?: {
    required?: boolean;
    content: Record<string, { schema: Record<string, unknown> }>;
  };
  responses: Record<string, { description: string }>;
};

type OpenApiPathItem = Partial<
  Record<'get' | 'post' | 'put' | 'patch' | 'delete', OpenApiOperation>
>;

function pathParam(name: string, description?: string) {
  return { name, in: 'path' as const, required: true, schema: { type: 'string' }, description };
}

function jsonBody(properties: Record<string, unknown>, required?: string[]) {
  return {
    required: true,
    content: {
      'application/json': { schema: { type: 'object', properties, required } },
    },
  };
}

const ok = { description: 'Success' };
const created = { description: 'Created' };
const accepted = { description: 'Accepted' };
const noContent = { description: 'No content' };
const badRequest = { description: 'Invalid request' };
const unauthorized = { description: 'Missing or invalid credentials' };
const notFound = { description: 'Not found' };

const str = { type: 'string' };
const obj = { type: 'object' };

/**
 * Hand-assembled OpenAPI 3.0 document for the public /v1 API. This is the
 * source for the published API reference; when adding a route, add its path
 * item here.
 */
export function buildOpenApiSpec(): Record<string, unknown> {
  const paths: Record<string, OpenApiPathItem> = {
    // ── Auth ──────────────────────────────────────────────────────────────
    '/v1/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Log in with email and password; returns a JWT and sets a refresh cookie',
        security: [],
        requestBody: jsonBody({ email: str, password: str }, ['email', 'password']),
        responses: { '200': ok, '401': unauthorized },
      },
    },
    '/v1/auth/refresh': {
      post: {
        tags: ['Auth'],
        summary: 'Exchange the refresh cookie for a new access token',
        security: [],
        responses: { '200': ok, '401': unauthorized },
      },
    },
    '/v1/auth/logout': {
      post: { tags: ['Auth'], summary: 'Invalidate the current session', responses: { '204': noContent } },
    },

    // ── Agents ────────────────────────────────────────────────────────────
    '/v1/agents': {
      get: { tags: ['Agents'], summary: 'List agents for the tenant', responses: { '200': ok } },
      post: {
        tags: ['Agents'],
        summary: 'Create a draft agent',
        requestBody: jsonBody({ name: str, handle: str, description: str }, ['name', 'handle']),
        responses: { '201': created, '400': badRequest },
      },
    },
    '/v1/agents/{id}': {
      get: {
        tags: ['Agents'],
        summary: 'Get an agent',
        parameters: [pathParam('id')],
        responses: { '200': ok, '404': notFound },
      },
      patch: {
        tags: ['Agents'],
        summary: 'Update agent fields or the draft graph',
        parameters: [pathParam('id')],
        requestBody: jsonBody({ name: str, description: str, draftGraphJson: str }),
        responses: { '200': ok, '404': notFound },
      },
      delete: {
        tags: ['Agents'],
        summary: 'Archive an agent',
        parameters: [pathParam('id')],
        responses: { '204': noContent, '404': notFound },
      },
    },
    '/v1/agents/{id}/publish': {
      post: {
        tags: ['Agents'],
        summary: 'Publish a graph as the active agent version',
        parameters: [pathParam('id')],
        requestBody: jsonBody({ graphJson: str, publishNotes: str }, ['graphJson']),
        responses: { '200': ok, '400': badRequest },
      },
    },
    '/v1/agents/{id}/runs': {
      post: {
        tags: ['Runs'],
        summary: 'Invoke the agent (sync or async)',
        parameters: [pathParam('id')],
        requestBody: jsonBody(
          { input: obj, mode: { type: 'string', enum: ['sync', 'async'] }, session_id: str },
          ['input'],
        ),
        responses: { '200': ok, '202': accepted, '401': unauthorized },
      },
    },
    '/v1/agents/{id}/runs/{runId}': {
      get: {
        tags: ['Runs'],
        summary: 'Get run status and output',
        parameters: [pathParam('id'), pathParam('runId')],
        responses: { '200': ok, '404': notFound },
      },
    },
    '/v1/agents/{id}/runs/{runId}/steps': {
      get: {
        tags: ['Runs'],
        summary: 'List per-node execution steps for a run',
        parameters: [pathParam('id'), pathParam('runId')],
        responses: { '200': ok },
      },
    },
    '/v1/agents/{id}/runs/{runId}/stream': {
      get: {
        tags: ['Runs'],
        summary: 'Server-Sent Events stream of run lifecycle events',
        parameters: [pathParam('id'), pathParam('runId')],
        responses: { '200': { description: 'text/event-stream of run events' } },
      },
    },
    '/v1/agents/{id}/schema/input': {
      get: {
        tags: ['Agents'],
        summary: 'JSON Schema of the agent input (SDK codegen source)',
        parameters: [pathParam('id')],
        responses: { '200': ok },
      },
    },
    '/v1/agents/{id}/schema/output': {
      get: {
        tags: ['Agents'],
        summary: 'JSON Schema of the agent output (SDK codegen source)',
        parameters: [pathParam('id')],
        responses: { '200': ok },
      },
    },
    '/v1/agents/{id}/sessions': {
      get: {
        tags: ['Sessions'],
        summary: 'List sessions for an agent',
        parameters: [pathParam('id')],
        responses: { '200': ok },
      },
      post: {
        tags: ['Sessions'],
        summary: 'Create a session',
        parameters: [pathParam('id')],
        requestBody: jsonBody({ metadata: obj }),
        responses: { '201': created },
      },
    },
    '/v1/agents/{id}/sessions/{sid}': {
      get: {
        tags: ['Sessions'],
        summary: 'Get session context snapshot',
        parameters: [pathParam('id'), pathParam('sid')],
        responses: { '200': ok, '404': notFound },
      },
      delete: {
        tags: ['Sessions'],
        summary: 'Destroy a session',
        parameters: [pathParam('id'), pathParam('sid')],
        responses: { '204': noContent },
      },
    },
    '/v1/agents/{id}/webhook/{secret}': {
      post: {
        tags: ['Triggers'],
        summary: 'Public per-agent webhook trigger (HMAC secret in URL)',
        security: [],
        parameters: [pathParam('id'), pathParam('secret')],
        requestBody: jsonBody({}),
        responses: { '202': accepted, '401': unauthorized },
      },
    },

    // ── Integrations ──────────────────────────────────────────────────────
    '/v1/integrations': {
      get: {
        tags: ['Integrations'],
        summary: 'List available integration types from the engine registry',
        responses: { '200': ok },
      },
    },
    '/v1/integrations/connections': {
      get: { tags: ['Integrations'], summary: 'List integration connections', responses: { '200': ok } },
      post: {
        tags: ['Integrations'],
        summary: 'Create a connection (credentials encrypted at rest)',
        requestBody: jsonBody(
          { service: str, displayName: str, authType: str, credentials: obj },
          ['service', 'displayName', 'authType', 'credentials'],
        ),
        responses: { '201': created },
      },
    },
    '/v1/integrations/connections/{id}': {
      get: {
        tags: ['Integrations'],
        summary: 'Get a connection (credentials never returned)',
        parameters: [pathParam('id')],
        responses: { '200': ok, '404': notFound },
      },
      patch: {
        tags: ['Integrations'],
        summary: 'Update display name or rotate credentials',
        parameters: [pathParam('id')],
        requestBody: jsonBody({ displayName: str, credentials: obj }),
        responses: { '200': ok },
      },
      delete: {
        tags: ['Integrations'],
        summary: 'Delete a connection',
        parameters: [pathParam('id')],
        responses: { '204': noContent },
      },
    },
    '/v1/integrations/triggers': {
      get: {
        tags: ['Triggers'],
        summary: 'List integration trigger registrations',
        responses: { '200': ok },
      },
      post: {
        tags: ['Triggers'],
        summary: 'Register an agent for a service’s webhook events',
        requestBody: jsonBody(
          { service: str, agentId: str, eventFilter: str, secret: str },
          ['service', 'agentId', 'secret'],
        ),
        responses: { '201': created },
      },
    },
    '/v1/integrations/triggers/{id}': {
      delete: {
        tags: ['Triggers'],
        summary: 'Remove a trigger registration',
        parameters: [pathParam('id')],
        responses: { '204': noContent },
      },
    },
    '/v1/triggers/integrations/{service}/{tenantSlug}': {
      post: {
        tags: ['Triggers'],
        summary:
          'Public integration event receiver — authenticity via the service’s webhook signature',
        security: [],
        parameters: [pathParam('service'), pathParam('tenantSlug')],
        requestBody: jsonBody({}),
        responses: { '200': ok, '202': accepted, '401': unauthorized, '404': notFound },
      },
    },

    // ── Marketplace ───────────────────────────────────────────────────────
    '/v1/marketplace/account': {
      get: {
        tags: ['Marketplace'],
        summary: 'Linked MagiCaal Account status (503 when MARKETPLACE_ENABLED=false)',
        responses: { '200': ok, '503': { description: 'Marketplace disabled' } },
      },
      post: {
        tags: ['Marketplace'],
        summary: 'Link a MagiCaal Account by API key',
        requestBody: jsonBody({ apiKey: str }, ['apiKey']),
        responses: { '201': created, '503': { description: 'Marketplace disabled' } },
      },
    },
    '/v1/marketplace/catalog': {
      get: {
        tags: ['Marketplace'],
        summary: 'Package catalog (cached 6h; ?refresh=true forces a re-fetch)',
        parameters: [
          { name: 'refresh', in: 'query', schema: { type: 'string' }, description: 'true to bypass the cache' },
        ],
        responses: { '200': ok, '503': { description: 'Marketplace disabled' } },
      },
    },
    '/v1/marketplace/packages': {
      get: {
        tags: ['Marketplace'],
        summary: 'List installed packages',
        responses: { '200': ok, '503': { description: 'Marketplace disabled' } },
      },
    },
    '/v1/marketplace/packages/{id}/install': {
      post: {
        tags: ['Marketplace'],
        summary: 'Install a catalog asset (signature-verified, hot-loaded)',
        parameters: [pathParam('id', 'Catalog assetId')],
        responses: { '201': created, '422': { description: 'Signature verification failed' } },
      },
    },
    '/v1/marketplace/packages/{id}/update': {
      post: {
        tags: ['Marketplace'],
        summary: 'Update an installed package to the newest catalog version',
        parameters: [pathParam('id')],
        responses: { '200': ok },
      },
    },
    '/v1/marketplace/packages/{id}': {
      delete: {
        tags: ['Marketplace'],
        summary: 'Disable an installed package',
        parameters: [pathParam('id')],
        responses: { '204': noContent },
      },
    },
    '/v1/marketplace/licenses': {
      get: {
        tags: ['Marketplace'],
        summary: 'List asset licenses',
        responses: { '200': ok, '503': { description: 'Marketplace disabled' } },
      },
    },
    '/v1/marketplace/licenses/bundle': {
      post: {
        tags: ['Marketplace'],
        summary:
          'Air-gapped bundle install — always active regardless of MARKETPLACE_ENABLED',
        requestBody: jsonBody({ bundleBase64: str }, ['bundleBase64']),
        responses: { '201': created, '422': { description: 'Signature verification failed' } },
      },
    },
    '/v1/marketplace/templates/import': {
      post: {
        tags: ['Marketplace'],
        summary: 'Import an agent template as a new DRAFT agent',
        requestBody: jsonBody({ template: obj, parameters: obj, name: str, handle: str }, [
          'template',
          'name',
          'handle',
        ]),
        responses: { '201': created, '422': { description: 'Unresolved template parameter' } },
      },
    },
    '/v1/marketplace/prompt-packs/import': {
      post: {
        tags: ['Marketplace'],
        summary: 'Import a prompt pack under a pack: namespace',
        requestBody: jsonBody({ pack: obj }, ['pack']),
        responses: { '201': created },
      },
    },

    // ── Platform ──────────────────────────────────────────────────────────
    '/v1/nodes': {
      get: {
        tags: ['Platform'],
        summary: 'List registered node types (built-in + installed packages)',
        responses: { '200': ok },
      },
    },
    '/v1/system': {
      get: { tags: ['Platform'], summary: 'System health', responses: { '200': ok } },
    },
    '/v1/llm/health': {
      get: { tags: ['Platform'], summary: 'Provider health from the Model Router', responses: { '200': ok } },
    },
    '/v1/telemetry': {
      get: { tags: ['Telemetry'], summary: 'Run telemetry summary', responses: { '200': ok } },
    },
    '/v1/telemetry/tokens': {
      get: { tags: ['Telemetry'], summary: 'Token usage aggregates', responses: { '200': ok } },
    },
    '/v1/openapi.json': {
      get: {
        tags: ['Platform'],
        summary: 'This document',
        security: [],
        responses: { '200': ok },
      },
    },
  };

  return {
    openapi: '3.0.3',
    info: {
      title: 'MagiCaal Platform API',
      description:
        'BFF API for the MagiCaal self-hosted AI agent platform. Authenticate with a platform JWT (Authorization: Bearer). Agent invocation additionally supports invocation keys.',
      version: '0.5.0',
    },
    servers: [{ url: config.publicBaseUrl }],
    tags: [
      { name: 'Auth' },
      { name: 'Agents' },
      { name: 'Runs' },
      { name: 'Sessions' },
      { name: 'Integrations' },
      { name: 'Triggers' },
      { name: 'Marketplace' },
      { name: 'Telemetry' },
      { name: 'Platform' },
    ],
    security: [{ bearerAuth: [] }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
    paths,
  };
}

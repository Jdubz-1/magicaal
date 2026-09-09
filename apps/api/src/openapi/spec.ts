import { config } from '../config';

type OpenApiOperation = {
  tags: string[];
  summary: string;
  /** Longer prose for operations whose behaviour a one-line summary can't carry. */
  description?: string;
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
const forbidden = { description: 'Insufficient role' };
const conflict = { description: 'Conflicts with current state' };

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
      get: {
        tags: ['Agents'],
        summary: 'List agents for the tenant',
        parameters: [
          {
            name: 'includeArchived',
            in: 'query',
            schema: { type: 'boolean' },
            description: 'true to include archived agents, which are omitted by default',
          },
        ],
        responses: { '200': ok },
      },
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
        summary: 'Archive an agent, or purge it outright',
        description:
          'Archives by default (status becomes "archived" and the agent stops executing). ' +
          'With purge=true the agent and all of its rows are deleted permanently, including ' +
          'its run history, which requires the tenant_admin role. Code-defined agents cannot ' +
          'be deleted — they are owned by agents.manifest.json and would be re-created by the ' +
          'next boot-time sync. Fails with 409 while any run is pending, running, or suspended.',
        parameters: [
          pathParam('id'),
          {
            name: 'purge',
            in: 'query',
            schema: { type: 'boolean' },
            description: 'true to delete permanently instead of archiving (tenant_admin only)',
          },
        ],
        responses: {
          '204': noContent,
          '403': forbidden,
          '404': notFound,
          '409': conflict,
          '502': { description: 'Engine unavailable — agent not deleted' },
        },
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
      get: {
        tags: ['Runs'],
        summary: 'List runs for an agent',
        parameters: [pathParam('id')],
        responses: { '200': ok },
      },
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
      delete: {
        tags: ['Runs'],
        summary: 'Cancel an in-flight run',
        parameters: [pathParam('id'), pathParam('runId')],
        responses: { '204': noContent, '404': notFound },
      },
    },
    '/v1/agents/{id}/runs/{runId}/review': {
      post: {
        tags: ['Runs'],
        summary: 'Submit a human-review decision for a run paused on a core:human-review node',
        parameters: [pathParam('id'), pathParam('runId')],
        requestBody: jsonBody({ decision: str, feedback: str }, ['decision']),
        responses: { '200': ok, '404': notFound },
      },
    },
    '/v1/runs/{runId}': {
      get: {
        tags: ['Runs'],
        summary: 'Look up a run directly by id (platform or invocation plane)',
        parameters: [pathParam('runId')],
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
    '/v1/agents/{id}/versions': {
      get: {
        tags: ['Agents'],
        summary: 'List published versions of an agent',
        parameters: [pathParam('id')],
        responses: { '200': ok },
      },
    },
    '/v1/agents/{id}/versions/{vId}/diff': {
      get: {
        tags: ['Agents'],
        summary: 'Diff a version’s graph against the previous version',
        parameters: [pathParam('id'), pathParam('vId')],
        responses: { '200': ok },
      },
    },
    '/v1/agents/{id}/versions/{vId}/rollback': {
      post: {
        tags: ['Agents'],
        summary: 'Roll back the active version to an earlier published version',
        parameters: [pathParam('id'), pathParam('vId')],
        responses: { '200': ok, '404': notFound },
      },
    },
    '/v1/agents/{id}/config': {
      get: {
        tags: ['Agents'],
        summary: 'Get agent runtime config (timeout, concurrency, routing overrides)',
        parameters: [pathParam('id')],
        responses: { '200': ok },
      },
      patch: {
        tags: ['Agents'],
        summary: 'Update agent runtime config',
        parameters: [pathParam('id')],
        requestBody: jsonBody({}),
        responses: { '200': ok },
      },
    },
    '/v1/agents/{id}/invocation-policy': {
      get: {
        tags: ['Agents'],
        summary: 'Get the agent’s invocation policy (private, key-only, or public)',
        parameters: [pathParam('id')],
        responses: { '200': ok },
      },
      patch: {
        tags: ['Agents'],
        summary: 'Update the agent’s invocation policy',
        parameters: [pathParam('id')],
        requestBody: jsonBody({ policy: str }, ['policy']),
        responses: { '200': ok },
      },
    },
    '/v1/agents/{id}/invocation-keys': {
      get: {
        tags: ['Agents'],
        summary: 'List invocation keys issued for an agent',
        parameters: [pathParam('id')],
        responses: { '200': ok },
      },
      post: {
        tags: ['Agents'],
        summary: 'Issue a new invocation key (ik_ prefixed, shown once)',
        parameters: [pathParam('id')],
        requestBody: jsonBody({ label: str }),
        responses: { '201': created },
      },
    },
    '/v1/agents/{id}/invocation-keys/{keyId}': {
      delete: {
        tags: ['Agents'],
        summary: 'Revoke an invocation key',
        parameters: [pathParam('id'), pathParam('keyId')],
        responses: { '204': noContent },
      },
    },
    '/v1/agents/{id}/invocation-log': {
      get: {
        tags: ['Agents'],
        summary: 'Audit log of invocation-plane calls to this agent',
        parameters: [pathParam('id')],
        responses: { '200': ok },
      },
    },
    '/v1/agents/{id}/test-cases': {
      get: {
        tags: ['Test Cases'],
        summary: 'List test cases for an agent',
        parameters: [pathParam('id')],
        responses: { '200': ok },
      },
      post: {
        tags: ['Test Cases'],
        summary: 'Create a test case',
        parameters: [pathParam('id')],
        requestBody: jsonBody({ input: obj, expected: obj }),
        responses: { '201': created },
      },
    },
    '/v1/agents/{id}/test-cases/{cid}': {
      put: {
        tags: ['Test Cases'],
        summary: 'Update a test case',
        parameters: [pathParam('id'), pathParam('cid')],
        requestBody: jsonBody({ input: obj, expected: obj }),
        responses: { '200': ok },
      },
      delete: {
        tags: ['Test Cases'],
        summary: 'Delete a test case',
        parameters: [pathParam('id'), pathParam('cid')],
        responses: { '204': noContent },
      },
    },
    '/v1/agents/{id}/test-cases/run': {
      post: {
        tags: ['Test Cases'],
        summary: 'Run the full test-case suite for an agent',
        parameters: [pathParam('id')],
        responses: { '202': accepted },
      },
    },

    // ── Users, Tenants & API Keys ────────────────────────────────────────────
    '/v1/users': {
      get: { tags: ['Users'], summary: 'List users in the tenant', responses: { '200': ok } },
      post: {
        tags: ['Users'],
        summary: 'Create a user (platform_admin or tenant_admin only)',
        requestBody: jsonBody({ email: str, role: str }, ['email', 'role']),
        responses: { '201': created },
      },
    },
    '/v1/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Get a user',
        parameters: [pathParam('id')],
        responses: { '200': ok, '404': notFound },
      },
      patch: {
        tags: ['Users'],
        summary: 'Update a user (platform_admin or tenant_admin only)',
        parameters: [pathParam('id')],
        requestBody: jsonBody({ role: str }),
        responses: { '200': ok },
      },
      delete: {
        tags: ['Users'],
        summary: 'Deactivate a user (platform_admin or tenant_admin only)',
        parameters: [pathParam('id')],
        responses: { '204': noContent },
      },
    },
    '/v1/tenants': {
      get: { tags: ['Tenants'], summary: 'List tenants (platform_admin only)', responses: { '200': ok } },
      post: {
        tags: ['Tenants'],
        summary: 'Create a tenant (platform_admin only)',
        requestBody: jsonBody({ name: str, slug: str }, ['name', 'slug']),
        responses: { '201': created },
      },
    },
    '/v1/tenants/{id}': {
      get: {
        tags: ['Tenants'],
        summary: 'Get a tenant (platform_admin or that tenant’s tenant_admin)',
        parameters: [pathParam('id')],
        responses: { '200': ok, '404': notFound },
      },
      patch: {
        tags: ['Tenants'],
        summary: 'Update a tenant',
        parameters: [pathParam('id')],
        requestBody: jsonBody({ name: str }),
        responses: { '200': ok },
      },
    },
    '/v1/keys': {
      get: { tags: ['API Keys'], summary: 'List platform API keys (tenant_admin+)', responses: { '200': ok } },
      post: {
        tags: ['API Keys'],
        summary: 'Mint a platform API key (tenant_admin+, secret shown once)',
        requestBody: jsonBody({ label: str }),
        responses: { '201': created },
      },
    },
    '/v1/keys/{id}': {
      delete: {
        tags: ['API Keys'],
        summary: 'Revoke a platform API key',
        parameters: [pathParam('id')],
        responses: { '204': noContent },
      },
    },

    // ── Data Sources ─────────────────────────────────────────────────────────
    '/v1/datasources': {
      get: { tags: ['Data Sources'], summary: 'List data sources (developer+)', responses: { '200': ok } },
      post: {
        tags: ['Data Sources'],
        summary: 'Create a data source',
        requestBody: jsonBody({ type: str, config: obj }, ['type', 'config']),
        responses: { '201': created },
      },
    },
    '/v1/datasources/{id}': {
      get: {
        tags: ['Data Sources'],
        summary: 'Get a data source',
        parameters: [pathParam('id')],
        responses: { '200': ok, '404': notFound },
      },
      patch: {
        tags: ['Data Sources'],
        summary: 'Update a data source',
        parameters: [pathParam('id')],
        requestBody: jsonBody({ config: obj }),
        responses: { '200': ok },
      },
      delete: {
        tags: ['Data Sources'],
        summary: 'Delete a data source',
        parameters: [pathParam('id')],
        responses: { '204': noContent },
      },
    },
    '/v1/datasources/{id}/test': {
      post: {
        tags: ['Data Sources'],
        summary: 'Test connectivity for a data source',
        parameters: [pathParam('id')],
        responses: { '200': ok, '400': badRequest },
      },
    },

    // ── MCP Servers ──────────────────────────────────────────────────────────
    '/v1/mcp-servers': {
      get: { tags: ['MCP'], summary: 'List registered MCP servers', responses: { '200': ok } },
      post: {
        tags: ['MCP'],
        summary: 'Register an MCP server (tenant_admin+)',
        requestBody: jsonBody({ name: str, transport: str, config: obj }, ['name', 'transport']),
        responses: { '201': created },
      },
    },
    '/v1/mcp-servers/{id}': {
      get: {
        tags: ['MCP'],
        summary: 'Get an MCP server',
        parameters: [pathParam('id')],
        responses: { '200': ok, '404': notFound },
      },
      delete: {
        tags: ['MCP'],
        summary: 'Remove an MCP server (tenant_admin+)',
        parameters: [pathParam('id')],
        responses: { '204': noContent },
      },
    },
    '/v1/mcp-servers/{id}/test': {
      post: {
        tags: ['MCP'],
        summary: 'Test connectivity to an MCP server (tenant_admin+)',
        parameters: [pathParam('id')],
        responses: { '200': ok, '400': badRequest },
      },
    },

    // ── Prompts ──────────────────────────────────────────────────────────────
    '/v1/prompts': {
      get: { tags: ['Prompts'], summary: 'List prompt names', responses: { '200': ok } },
      post: {
        tags: ['Prompts'],
        summary: 'Create a new prompt version (developer+)',
        requestBody: jsonBody({ name: str, template: str }, ['name', 'template']),
        responses: { '201': created },
      },
    },
    '/v1/prompts/{name}/versions': {
      get: {
        tags: ['Prompts'],
        summary: 'List versions of a prompt',
        parameters: [pathParam('name')],
        responses: { '200': ok },
      },
    },
    '/v1/prompts/{name}/versions/{vid}/diff': {
      get: {
        tags: ['Prompts'],
        summary: 'Diff two prompt versions',
        parameters: [pathParam('name'), pathParam('vid')],
        responses: { '200': ok },
      },
    },
    '/v1/prompts/{name}/versions/{vid}/promote': {
      post: {
        tags: ['Prompts'],
        summary: 'Promote a prompt version to active (developer+)',
        parameters: [pathParam('name'), pathParam('vid')],
        responses: { '200': ok },
      },
    },

    // ── Caal ─────────────────────────────────────────────────────────────────
    '/v1/caal/invoke': {
      post: {
        tags: ['Caal'],
        summary: 'Invoke Caal against a target agent graph',
        requestBody: jsonBody({ agentId: str, message: str }, ['agentId', 'message']),
        responses: { '200': ok, '202': accepted },
      },
    },
    '/v1/caal/sessions/{agentId}': {
      get: {
        tags: ['Caal'],
        summary: 'Get the caller’s Caal conversation history for a target agent',
        parameters: [pathParam('agentId')],
        responses: { '200': ok },
      },
    },
    '/v1/caal/config': {
      get: { tags: ['Caal'], summary: 'Get tenant Caal configuration', responses: { '200': ok } },
      patch: {
        tags: ['Caal'],
        summary: 'Update tenant Caal configuration (tenant_admin+)',
        requestBody: jsonBody({}),
        responses: { '200': ok },
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

    // ── Previously undocumented (added with the spec↔route contract test) ──
    '/v1/agents/{id}/draft': {
      post: {
        tags: ['Agents'],
        summary: 'Reopen the active version as a new draft',
        parameters: [pathParam('id')],
        responses: { '200': ok, '404': notFound },
      },
    },
    '/v1/agents/{id}/sessions/migrate': {
      post: {
        tags: ['Sessions'],
        summary: 'Batch-migrate this agent\'s sessions to the current context schema',
        parameters: [pathParam('id')],
        responses: { '200': ok },
      },
    },
    '/v1/agents/{id}/sessions/{sid}/runs': {
      get: {
        tags: ['Sessions'],
        summary: 'List runs linked to a session',
        parameters: [pathParam('id'), pathParam('sid')],
        responses: { '200': ok, '404': notFound },
      },
    },
    '/v1/agents/{id}/sessions/{sid}/reset': {
      post: {
        tags: ['Sessions'],
        summary: 'Clear a session\'s context without deleting the session',
        parameters: [pathParam('id'), pathParam('sid')],
        responses: { '200': ok, '404': notFound },
      },
    },
    '/v1/sessions': {
      get: {
        tags: ['Sessions'],
        summary: 'List sessions across the tenant',
        responses: { '200': ok },
      },
    },
    '/v1/llm/router-policies': {
      get: { tags: ['Platform'], summary: 'List named model-router policies', responses: { '200': ok } },
      post: {
        tags: ['Platform'],
        summary: 'Create a named model-router policy',
        requestBody: jsonBody({ name: str, config: obj }, ['name', 'config']),
        responses: { '201': created, '400': badRequest },
      },
    },
    '/v1/llm/router-policies/{id}': {
      patch: {
        tags: ['Platform'],
        summary: 'Update a named model-router policy',
        parameters: [pathParam('id')],
        requestBody: jsonBody({ name: str, config: obj }),
        responses: { '200': ok, '404': notFound },
      },
      delete: {
        tags: ['Platform'],
        summary: 'Delete a named model-router policy',
        parameters: [pathParam('id')],
        responses: { '204': noContent, '404': notFound },
      },
    },
    '/v1/integrations/oauth/initiate': {
      post: {
        tags: ['Integrations'],
        summary: 'Begin an OAuth authorization-code flow',
        requestBody: jsonBody({ service: str, redirectUri: str }, ['service']),
        responses: { '200': ok, '400': badRequest },
      },
    },
    '/v1/integrations/oauth/{service}/callback': {
      get: {
        tags: ['Integrations'],
        summary: 'OAuth provider redirect target',
        description:
          'Public — the provider redirects the user\'s browser here with no bearer token. ' +
          'The single-use state token and nonce cookie authenticate the call.',
        security: [],
        parameters: [pathParam('service')],
        responses: { '302': { description: 'Redirect back to the app' }, '400': badRequest },
      },
    },
    '/v1/integrations/connections/{id}/reconnect': {
      post: {
        tags: ['Integrations'],
        summary: 'Re-run OAuth for an existing connection, keeping its id',
        parameters: [pathParam('id')],
        responses: { '200': ok, '404': notFound },
      },
    },
    '/v1/integrations/oauth-apps': {
      get: { tags: ['Integrations'], summary: 'List per-tenant OAuth app credentials', responses: { '200': ok } },
      put: {
        tags: ['Integrations'],
        summary: 'Upsert per-tenant OAuth app credentials',
        requestBody: jsonBody({ service: str, clientId: str, clientSecret: str }, ['service', 'clientId', 'clientSecret']),
        responses: { '200': ok, '400': badRequest },
      },
    },
    '/v1/integrations/oauth-apps/{id}': {
      delete: {
        tags: ['Integrations'],
        summary: 'Delete per-tenant OAuth app credentials',
        parameters: [pathParam('id')],
        responses: { '204': noContent, '404': notFound },
      },
    },
    '/v1/telemetry/trajectory/{runId}': {
      get: {
        tags: ['Telemetry'],
        summary: 'Agentic-loop trajectory for a run',
        parameters: [pathParam('runId')],
        responses: { '200': ok, '404': notFound },
      },
    },
    '/v1/telemetry/routing-events': {
      get: { tags: ['Telemetry'], summary: 'Model-router decision history', responses: { '200': ok } },
    },
    '/v1/telemetry/evaluate-scores': {
      get: { tags: ['Telemetry'], summary: 'core:evaluate score history', responses: { '200': ok } },
    },
    '/v1/utils/evaluate': {
      post: {
        tags: ['Platform'],
        summary: 'Evaluate a JSONata expression against sample context',
        requestBody: jsonBody({ expression: str, data: obj }, ['expression']),
        responses: { '200': ok, '400': badRequest },
      },
    },
    '/v1/system/config': {
      get: { tags: ['Platform'], summary: 'Effective platform configuration', responses: { '200': ok } },
    },
    '/v1/system/provider-pricing': {
      get: { tags: ['Platform'], summary: 'Provider pricing table', responses: { '200': ok } },
      post: {
        tags: ['Platform'],
        summary: 'Upsert provider pricing (tenant_admin)',
        requestBody: jsonBody({ provider: str, model: str, pricing: obj }, ['provider', 'model']),
        responses: { '200': ok, '403': forbidden },
      },
    },
    '/v1/system/sync': {
      get: { tags: ['Platform'], summary: 'Most recent boot-time sync event', responses: { '200': ok } },
    },
    '/v1/system/sync/log': {
      get: { tags: ['Platform'], summary: 'Boot-time sync history', responses: { '200': ok } },
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
      version: '0.6.0',
    },
    servers: [{ url: config.publicBaseUrl }],
    tags: [
      { name: 'Auth' },
      { name: 'Agents' },
      { name: 'Runs' },
      { name: 'Sessions' },
      { name: 'Test Cases' },
      { name: 'Users' },
      { name: 'Tenants' },
      { name: 'API Keys' },
      { name: 'Data Sources' },
      { name: 'MCP' },
      { name: 'Prompts' },
      { name: 'Caal' },
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

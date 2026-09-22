import { EventEmitter } from 'node:events';
import * as http from 'node:http';
import {
  platformListNodeTypes,
  platformGetNodeSchema,
  platformListConnections,
  platformListAgents,
} from '../../src/index';
import { makeMockContext } from '../helpers/mock-context';

jest.mock('node:http');

/**
 * These four tools read the platform on Caal's behalf from inside the engine,
 * where there is no user session. They originally called the tenant-facing
 * `/v1/*` routes with `X-Internal-Auth` — a header that only guards
 * `/internal/*` — so every call 401'd, the model was handed an error, and the
 * suggester burned its whole iteration budget retrying.
 *
 * The route side is covered by apps/api's caal-internal.test.ts; this pins the
 * request the tool actually builds.
 */

const mockGet = http.get as unknown as jest.Mock;

interface Captured {
  hostname: string;
  port: string;
  path: string;
  headers: Record<string, string>;
}

let captured: Captured[] = [];

function respondWith(status: number, body: string): void {
  mockGet.mockImplementation((opts: Captured, cb: (res: unknown) => void) => {
    captured.push(opts);

    const req = new EventEmitter() as EventEmitter & {
      setTimeout: jest.Mock;
      destroy: jest.Mock;
    };
    req.setTimeout = jest.fn();
    req.destroy = jest.fn();

    const res = new EventEmitter() as EventEmitter & { statusCode: number };
    res.statusCode = status;
    cb(res);
    process.nextTick(() => {
      if (body) res.emit('data', body);
      res.emit('end');
    });

    return req;
  });
}

function failWith(err: NodeJS.ErrnoException): void {
  mockGet.mockImplementation((opts: Captured) => {
    captured.push(opts);
    const req = new EventEmitter() as EventEmitter & {
      setTimeout: jest.Mock;
      destroy: jest.Mock;
    };
    req.setTimeout = jest.fn();
    req.destroy = jest.fn();
    process.nextTick(() => req.emit('error', err));
    return req;
  });
}

function caalCtx(overrides: Record<string, unknown> = {}) {
  return makeMockContext({
    _caal_api_base: 'http://api:3000',
    _caal_master_key: 'internal-secret',
    _caal_tenant_id: 'tenant-a',
    ...overrides,
  });
}

beforeEach(() => {
  captured = [];
  mockGet.mockReset();
});

describe('Caal platform tools reach the internal plane', () => {
  it.each([
    ['caal.platform.listNodeTypes', platformListNodeTypes, {}, '/internal/caal/nodes', 'nodeTypes'],
    ['caal.platform.listConnections', platformListConnections, {}, '/internal/caal/connections', 'connections'],
    ['caal.platform.listAgents', platformListAgents, {}, '/internal/caal/agents', 'agents'],
    ['caal.platform.getNodeSchema', platformGetNodeSchema, { nodeType: 'core:start' }, '/internal/caal/nodes/core%3Astart', 'schema'],
  ])('%s calls %p with the internal header', async (_name, tool, config, expectedPath, outputKey) => {
    respondWith(200, JSON.stringify([{ type: 'core:start' }]));

    const res = await tool.execute(caalCtx(), config);

    expect(res.status).toBe('complete');
    expect(res.outputs[outputKey]).toEqual([{ type: 'core:start' }]);

    expect(captured).toHaveLength(1);
    expect(captured[0].path).toBe(expectedPath);
    // The whole regression: a /v1 path with this header is unauthenticated.
    expect(captured[0].path.startsWith('/internal/')).toBe(true);
    expect(captured[0].path).not.toContain('/v1/');
    expect(captured[0].headers['X-Internal-Auth']).toBe('internal-secret');
  });

  it('names the invoking tenant, not the run tenant', async () => {
    respondWith(200, '[]');

    // A Caal run executes as _platform; the tenant whose nodes and connections
    // it is reasoning about rides in separately.
    await platformListAgents.execute(caalCtx({ tenantId: '_platform' }), {});

    expect(captured[0].headers['X-Tenant-Id']).toBe('tenant-a');
  });

  it('falls back to _invokerTenantId when the engine did not seed _caal_tenant_id', async () => {
    respondWith(200, '[]');

    const ctx = makeMockContext({
      _caal_api_base: 'http://api:3000',
      _caal_master_key: 'internal-secret',
      _invokerTenantId: 'tenant-b',
    });
    await platformListAgents.execute(ctx, {});

    expect(captured[0].headers['X-Tenant-Id']).toBe('tenant-b');
  });

  it('URL-encodes a node type so the colon does not split the path', async () => {
    respondWith(200, '{}');

    await platformGetNodeSchema.execute(caalCtx(), { nodeType: 'core:llm-call' });

    expect(captured[0].path).toBe('/internal/caal/nodes/core%3Allm-call');
  });

  it('targets the API base the engine seeded, not localhost', async () => {
    respondWith(200, '[]');

    await platformListNodeTypes.execute(caalCtx(), {});

    // localhost inside the engine container is the engine itself — the default
    // exists only for running a tool outside a run.
    expect(captured[0].hostname).toBe('api');
    expect(captured[0].port).toBe('3000');
  });
});

describe('Caal platform tool failures', () => {
  /**
   * The status used to be ignored, so an error page resolved as data and the
   * model was handed `{"error":"..."}` as though it were a result.
   */
  it('rejects on a non-2xx instead of handing the body back as data', async () => {
    respondWith(401, '{"error":"Unauthorized"}');

    await expect(platformListNodeTypes.execute(caalCtx(), {})).rejects.toThrow(/responded 401/);
  });

  it('names the cause when the API is unreachable', async () => {
    failWith(Object.assign(new Error(''), { code: 'ECONNREFUSED' }));

    await expect(platformListAgents.execute(caalCtx(), {})).rejects.toThrow(/unreachable: ECONNREFUSED/);
  });

  /**
   * A refused local connect arrives as an AggregateError whose own message is
   * empty, which logged as nothing at all.
   */
  it('digs the code out of an AggregateError with no message of its own', async () => {
    failWith(Object.assign(new Error(''), { errors: [{ code: 'ECONNREFUSED' }] }));

    await expect(platformListAgents.execute(caalCtx(), {})).rejects.toThrow(/unreachable: ECONNREFUSED/);
  });

  it('returns a non-JSON body verbatim rather than throwing a parse error', async () => {
    respondWith(200, 'not json at all');

    const res = await platformListNodeTypes.execute(caalCtx(), {});
    expect(res.outputs.nodeTypes).toBe('not json at all');
  });
});

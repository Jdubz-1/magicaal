import { coreDbQuery } from '../../../src/nodes/core-db-query';
import { makeMockContext } from '../../helpers/mock-context';

// Mock the pg module
jest.mock('pg', () => {
  const mockQuery = jest.fn();
  const mockEnd = jest.fn().mockResolvedValue(undefined);
  const MockPool = jest.fn().mockImplementation(() => ({
    query: mockQuery,
    end: mockEnd,
  }));
  return { Pool: MockPool, __mockQuery: mockQuery };
});

// We need to access the mock query function
let mockPgQuery: jest.Mock;
let MockPool: jest.Mock;

beforeAll(async () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pg = require('pg') as { Pool: jest.Mock; __mockQuery: jest.Mock };
  MockPool = pg.Pool;
  mockPgQuery = pg.__mockQuery;
});

beforeEach(() => {
  jest.clearAllMocks();
});

const baseCredentials = {
  type: 'apikey' as const,
  extra: { dbType: 'postgres', connectionString: 'postgresql://localhost/testdb' },
};

describe('core:db-query', () => {
  it('executes a SELECT query and writes results to outputKey', async () => {
    const ctx = makeMockContext({});
    ctx.credentials['conn-db'] = baseCredentials;
    mockPgQuery.mockResolvedValue({
      rows: [{ id: 1, name: 'Alice' }],
      rowCount: 1,
      fields: [{ name: 'id' }, { name: 'name' }],
    });

    const result = await coreDbQuery.execute(ctx, {
      connectionId: 'conn-db',
      query: 'SELECT id, name FROM users',
      outputKey: 'users',
    });

    expect(result.status).toBe('complete');
    const users = ctx.get<{ rows: unknown[]; rowCount: number }>('users');
    expect(users?.rows).toHaveLength(1);
    expect(users?.rowCount).toBe(1);
    expect(ctx.get('_db_row_count')).toBe(1);
  });

  it('passes params from context to the query', async () => {
    const ctx = makeMockContext({ params: [42] });
    ctx.credentials['conn-db'] = baseCredentials;
    mockPgQuery.mockResolvedValue({
      rows: [{ id: 42 }],
      rowCount: 1,
      fields: [{ name: 'id' }],
    });

    await coreDbQuery.execute(ctx, {
      connectionId: 'conn-db',
      query: 'SELECT * FROM items WHERE id = $1',
      paramsKey: 'params',
      outputKey: 'item',
    });

    expect(mockPgQuery).toHaveBeenCalledWith(
      'SELECT * FROM items WHERE id = $1',
      [42],
    );
  });

  it('rejects non-SELECT statements', async () => {
    const ctx = makeMockContext({});
    ctx.credentials['conn-db'] = baseCredentials;

    const result = await coreDbQuery.execute(ctx, {
      connectionId: 'conn-db',
      query: 'DELETE FROM users WHERE id = 1',
      outputKey: 'result',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('DB_QUERY_RESTRICTED');
    expect(MockPool).not.toHaveBeenCalled();
  });

  it('returns failed when connection not found', async () => {
    const ctx = makeMockContext({});

    const result = await coreDbQuery.execute(ctx, {
      connectionId: 'missing-conn',
      query: 'SELECT 1',
      outputKey: 'result',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('DB_CONNECTION_NOT_FOUND');
  });

  it('returns DB_UNSUPPORTED_TYPE for unsupported db types', async () => {
    const ctx = makeMockContext({});
    ctx.credentials['conn-db'] = {
      type: 'apikey',
      extra: { dbType: 'mysql', connectionString: 'mysql://localhost/db' },
    };

    const result = await coreDbQuery.execute(ctx, {
      connectionId: 'conn-db',
      query: 'SELECT 1',
      outputKey: 'result',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('DB_UNSUPPORTED_TYPE');
  });

  it('returns DB_QUERY_ERROR on query failure', async () => {
    const ctx = makeMockContext({});
    ctx.credentials['conn-db'] = baseCredentials;
    mockPgQuery.mockRejectedValue(new Error('relation "users" does not exist'));

    const result = await coreDbQuery.execute(ctx, {
      connectionId: 'conn-db',
      query: 'SELECT * FROM users',
      outputKey: 'result',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('DB_QUERY_ERROR');
  });
});

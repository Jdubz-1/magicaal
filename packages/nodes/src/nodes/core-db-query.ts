import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';

interface DbQueryConfig {
  connectionId: string;
  query: string;
  paramsKey?: string;
  outputKey: string;
  maxRows?: number;
}

interface QueryResult {
  rows: Record<string, unknown>[];
  rowCount: number;
  fields: string[];
}

const SELECT_ONLY_PATTERN = /^\s*SELECT\s/i;

// Lazy-load pg to avoid requiring it unless the node is actually used
async function runPostgresQuery(
  connectionString: string,
  query: string,
  params: unknown[],
  maxRows: number,
): Promise<QueryResult> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Pool } = (await import('pg')) as typeof import('pg');
  const pool = new Pool({ connectionString, max: 1 });
  try {
    const result = await pool.query(query, params);
    const rows = (result.rows as Record<string, unknown>[]).slice(0, maxRows);
    const fields = result.fields?.map((f) => f.name) ?? Object.keys(rows[0] ?? {});
    return { rows, rowCount: result.rowCount ?? rows.length, fields };
  } finally {
    await pool.end();
  }
}

export const coreDbQuery: NodeModule<DbQueryConfig> = {
  type: 'core:db-query',
  meta: {
    name: 'DB Query',
    description:
      'Executes a parameterised SQL SELECT query against a database Integration Connection. Supports PostgreSQL. Writes {rows, rowCount, fields} to outputKey. SELECT statements only for safety.',
    category: 'integration',
    icon: 'database',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['connectionId', 'query', 'outputKey'],
      properties: {
        connectionId: {
          type: 'string',
          description: 'Integration Connection ID for the database',
        },
        query: {
          type: 'string',
          description: 'SQL SELECT query. Use $1, $2, … placeholders for parameters.',
        },
        paramsKey: {
          type: 'string',
          description: 'Context key holding an array of parameter values (matched to $1, $2, …)',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write {rows, rowCount, fields} to',
        },
        maxRows: {
          type: 'number',
          description: 'Maximum number of rows to return (default: 1000)',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _db_row_count: { type: 'number' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: DbQueryConfig) {
    // Enforce SELECT-only
    if (!SELECT_ONLY_PATTERN.test(config.query)) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'DB_QUERY_RESTRICTED',
          message: 'Only SELECT statements are permitted in Phase 2',
          retryable: false,
        },
      };
    }

    const creds = ctx.credentials[config.connectionId];
    if (!creds) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'DB_CONNECTION_NOT_FOUND',
          message: `Connection "${config.connectionId}" not found`,
          retryable: false,
        },
      };
    }

    const extra = (creds.extra as Record<string, string> | undefined) ?? {};
    const dbType = extra['dbType'] ?? 'postgres';
    const connectionString = extra['connectionString'] ?? '';

    if (!connectionString) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'DB_CONNECTION_FAILED',
          message: 'Connection credentials do not contain a connectionString',
          retryable: false,
        },
      };
    }

    const params = config.paramsKey
      ? (ctx.get<unknown[]>(config.paramsKey) ?? [])
      : [];

    const maxRows = config.maxRows ?? 1000;

    try {
      let result: QueryResult;

      if (dbType === 'postgres') {
        result = await runPostgresQuery(connectionString, config.query, params, maxRows);
      } else {
        return {
          status: 'failed' as const,
          outputs: {},
          error: {
            code: 'DB_UNSUPPORTED_TYPE',
            message: `Database type "${dbType}" is not supported. Supported: postgres`,
            retryable: false,
          },
        };
      }

      ctx.set(config.outputKey, result);
      ctx.set('_db_row_count', result.rowCount);

      return {
        status: 'complete' as const,
        outputs: {
          [config.outputKey]: result,
          _db_row_count: result.rowCount,
        },
      };
    } catch (err) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'DB_QUERY_ERROR',
          message: err instanceof Error ? err.message : 'Database query failed',
          retryable: false,
        },
      };
    }
  },
};

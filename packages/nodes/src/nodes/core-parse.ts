import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';

interface ParseConfig {
  inputKey: string;
  format: 'json' | 'csv' | 'lines';
  outputKey: string;
  csvDelimiter?: string;
}

function parseCsv(text: string, delimiter: string): Record<string, string>[] {
  const rows = text.trim().split('\n');
  if (rows.length === 0) return [];
  const headers = rows[0].split(delimiter).map((h) => h.trim());
  return rows.slice(1).map((row) => {
    const values = row.split(delimiter);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = (values[i] ?? '').trim();
    });
    return obj;
  });
}

export const coreParse: NodeModule<ParseConfig> = {
  type: 'core:parse',
  meta: {
    name: 'Parse',
    description: 'Parses a string context value into a structured format (JSON, CSV, or newline-separated lines)',
    category: 'data',
    icon: 'file-text',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['inputKey', 'format', 'outputKey'],
      properties: {
        inputKey: {
          type: 'string',
          description: 'Context key containing the string to parse',
        },
        format: {
          type: 'string',
          enum: ['json', 'csv', 'lines'],
          description: 'Parsing format: json (object/array), csv (array of objects with header row), lines (array of strings)',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write the parsed result to',
        },
        csvDelimiter: {
          type: 'string',
          description: 'CSV column delimiter (default: ",")',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _parse_result: {},
      },
    },
  },
  async execute(ctx: ExecutionContext, config: ParseConfig) {
    const raw = ctx.get<string>(config.inputKey);
    if (typeof raw !== 'string') {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'PARSE_INPUT_NOT_STRING',
          message: `Context key "${config.inputKey}" is not a string (got ${typeof raw})`,
          retryable: false,
        },
      };
    }

    let result: unknown;
    try {
      if (config.format === 'json') {
        result = JSON.parse(raw);
      } else if (config.format === 'csv') {
        result = parseCsv(raw, config.csvDelimiter ?? ',');
      } else {
        result = raw.split('\n').filter((l) => l.trim().length > 0);
      }
    } catch (err) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'PARSE_ERROR',
          message: err instanceof Error ? err.message : 'Parse failed',
          retryable: false,
        },
      };
    }

    ctx.set(config.outputKey, result);
    ctx.set('_parse_result', result);

    return {
      status: 'complete' as const,
      outputs: { [config.outputKey]: result, _parse_result: result },
    };
  },
};

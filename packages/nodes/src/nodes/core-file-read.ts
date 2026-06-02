import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';
import { readFile, stat } from 'node:fs/promises';
import { resolve, normalize } from 'node:path';

interface FileReadConfig {
  path: string;
  encoding?: 'utf8' | 'base64' | 'binary';
  outputKey: string;
}

function safeResolvePath(inputPath: string): string | null {
  try {
    const basePath = process.env['WORKSPACE_BASE_PATH'] ?? '/workspace';
    const resolved = resolve(basePath, normalize(inputPath.replace(/^\//, '')));
    // Ensure the resolved path starts with the base path (prevent traversal)
    if (!resolved.startsWith(resolve(basePath))) return null;
    return resolved;
  } catch {
    return null;
  }
}

export const coreFileRead: NodeModule<FileReadConfig> = {
  type: 'core:file-read',
  meta: {
    name: 'File Read',
    description:
      'Reads a file from the workspace filesystem. Path is relative to WORKSPACE_BASE_PATH. Writes file content to outputKey along with _file_size and _file_encoding metadata.',
    category: 'integration',
    icon: 'file-text',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['path', 'outputKey'],
      properties: {
        path: {
          type: 'string',
          description: 'File path relative to the workspace base directory. Supports JSONata expressions.',
        },
        encoding: {
          type: 'string',
          enum: ['utf8', 'base64', 'binary'],
          description: 'File encoding (default: utf8)',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write the file content to',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _file_size: { type: 'number' },
        _file_encoding: { type: 'string' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: FileReadConfig) {
    // Resolve path — evaluate if JSONata expression
    let rawPath: string;
    try {
      rawPath =
        config.path.includes('$')
          ? String(await ctx.evaluate(config.path))
          : config.path;
    } catch {
      rawPath = config.path;
    }

    const resolvedPath = safeResolvePath(rawPath);
    if (!resolvedPath) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'FILE_ACCESS_DENIED',
          message: `Path "${rawPath}" is outside the workspace base directory`,
          retryable: false,
        },
      };
    }

    const encoding = config.encoding ?? 'utf8';

    try {
      const fileStat = await stat(resolvedPath);
      const content =
        encoding === 'base64'
          ? (await readFile(resolvedPath)).toString('base64')
          : await readFile(resolvedPath, encoding === 'binary' ? undefined : 'utf8');

      const contentValue = Buffer.isBuffer(content) ? content.toString('base64') : content;

      ctx.set(config.outputKey, contentValue);
      ctx.set('_file_size', fileStat.size);
      ctx.set('_file_encoding', encoding);

      return {
        status: 'complete' as const,
        outputs: {
          [config.outputKey]: contentValue,
          _file_size: fileStat.size,
          _file_encoding: encoding,
        },
      };
    } catch (err) {
      const isNotFound =
        err instanceof Error && 'code' in err && (err as NodeJS.ErrnoException).code === 'ENOENT';

      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: isNotFound ? 'FILE_NOT_FOUND' : 'FILE_READ_ERROR',
          message: err instanceof Error ? err.message : 'Failed to read file',
          retryable: false,
        },
      };
    }
  },
};

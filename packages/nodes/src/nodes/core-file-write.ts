import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve, normalize, dirname } from 'node:path';

interface FileWriteConfig {
  path: string;
  contentKey: string;
  encoding?: 'utf8' | 'base64';
  createDirs?: boolean;
  outputKey: string;
}

function safeResolvePath(inputPath: string): string | null {
  try {
    const basePath = process.env['WORKSPACE_BASE_PATH'] ?? '/workspace';
    const resolved = resolve(basePath, normalize(inputPath.replace(/^\//, '')));
    if (!resolved.startsWith(resolve(basePath))) return null;
    return resolved;
  } catch {
    return null;
  }
}

export const coreFileWrite: NodeModule<FileWriteConfig> = {
  type: 'core:file-write',
  meta: {
    name: 'File Write',
    description:
      'Writes content from a context key to a file in the workspace filesystem. Path is relative to WORKSPACE_BASE_PATH. Writes {path, bytesWritten} to outputKey.',
    category: 'integration',
    icon: 'file-plus',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['path', 'contentKey', 'outputKey'],
      properties: {
        path: {
          type: 'string',
          description: 'Destination file path relative to workspace base. Supports JSONata expressions.',
        },
        contentKey: {
          type: 'string',
          description: 'Context key holding the string content to write',
        },
        encoding: {
          type: 'string',
          enum: ['utf8', 'base64'],
          description: 'Write encoding (default: utf8)',
        },
        createDirs: {
          type: 'boolean',
          description: 'Create parent directories if they do not exist (default: false)',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write {path, bytesWritten} result to',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _file_written_path: { type: 'string' },
        _file_bytes_written: { type: 'number' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: FileWriteConfig) {
    // Resolve path
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
          code: 'FILE_PATH_INVALID',
          message: `Path "${rawPath}" is outside the workspace base directory`,
          retryable: false,
        },
      };
    }

    const content = ctx.get<unknown>(config.contentKey);
    if (content === undefined) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'FILE_WRITE_ERROR',
          message: `Context key "${config.contentKey}" is not set`,
          retryable: false,
        },
      };
    }

    const contentStr =
      typeof content === 'string' ? content : JSON.stringify(content, null, 2);
    const encoding = config.encoding ?? 'utf8';

    try {
      if (config.createDirs) {
        await mkdir(dirname(resolvedPath), { recursive: true });
      }

      const buffer =
        encoding === 'base64'
          ? Buffer.from(contentStr, 'base64')
          : Buffer.from(contentStr, 'utf8');

      await writeFile(resolvedPath, buffer);

      const result = { path: resolvedPath, bytesWritten: buffer.byteLength };
      ctx.set(config.outputKey, result);
      ctx.set('_file_written_path', resolvedPath);
      ctx.set('_file_bytes_written', buffer.byteLength);

      return {
        status: 'complete' as const,
        outputs: {
          [config.outputKey]: result,
          _file_written_path: resolvedPath,
          _file_bytes_written: buffer.byteLength,
        },
      };
    } catch (err) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'FILE_WRITE_ERROR',
          message: err instanceof Error ? err.message : 'Failed to write file',
          retryable: false,
        },
      };
    }
  },
};

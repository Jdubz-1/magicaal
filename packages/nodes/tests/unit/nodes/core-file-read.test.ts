import { coreFileRead } from '../../../src/nodes/core-file-read';
import { makeMockContext } from '../../helpers/mock-context';

jest.mock('node:fs/promises', () => ({
  readFile: jest.fn(),
  stat: jest.fn(),
}));

import { readFile, stat } from 'node:fs/promises';

const mockReadFile = readFile as jest.Mock;
const mockStat = stat as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  process.env['WORKSPACE_BASE_PATH'] = '/workspace';
  mockStat.mockResolvedValue({ size: 42 });
});

describe('core:file-read', () => {
  it('reads a file and writes content to outputKey', async () => {
    const ctx = makeMockContext({});
    mockReadFile.mockResolvedValue('hello world');

    const result = await coreFileRead.execute(ctx, {
      path: 'README.md',
      outputKey: 'fileContent',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('fileContent')).toBe('hello world');
    expect(ctx.get('_file_size')).toBe(42);
    expect(ctx.get('_file_encoding')).toBe('utf8');
  });

  it('returns failed with FILE_NOT_FOUND when file does not exist', async () => {
    const ctx = makeMockContext({});
    const err = Object.assign(new Error('ENOENT: no such file'), { code: 'ENOENT' });
    mockReadFile.mockRejectedValue(err);

    const result = await coreFileRead.execute(ctx, {
      path: 'missing.txt',
      outputKey: 'content',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('FILE_NOT_FOUND');
  });

  it('returns FILE_ACCESS_DENIED for path traversal attempt', async () => {
    const ctx = makeMockContext({});

    const result = await coreFileRead.execute(ctx, {
      path: '../../../../etc/passwd',
      outputKey: 'content',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('FILE_ACCESS_DENIED');
    expect(mockReadFile).not.toHaveBeenCalled();
  });

  it('reads file as base64 when encoding is base64', async () => {
    const ctx = makeMockContext({});
    mockReadFile.mockResolvedValue(Buffer.from('binary data'));

    const result = await coreFileRead.execute(ctx, {
      path: 'image.png',
      encoding: 'base64',
      outputKey: 'data',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('_file_encoding')).toBe('base64');
  });
});

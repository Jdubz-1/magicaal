import { coreFileRead } from '../../../src/nodes/core-file-read';
import { makeMockContext } from '../../helpers/mock-context';

jest.mock('node:fs/promises', () => ({
  open: jest.fn(),
}));

import { open } from 'node:fs/promises';

const mockOpen = open as jest.Mock;

/**
 * The node reads through a single FileHandle rather than stat()-then-readFile()
 * so the size and the bytes cannot describe two different files. The mock
 * mirrors that: one handle, answering both.
 */
function mockHandle(content: unknown, size = 42): { close: jest.Mock; readFile: jest.Mock } {
  return {
    stat: jest.fn().mockResolvedValue({ size }),
    readFile: jest.fn().mockResolvedValue(content),
    close: jest.fn().mockResolvedValue(undefined),
  } as unknown as { close: jest.Mock; readFile: jest.Mock };
}

beforeEach(() => {
  jest.clearAllMocks();
  process.env['WORKSPACE_BASE_PATH'] = '/workspace';
});

describe('core:file-read', () => {
  it('reads a file and writes content to outputKey', async () => {
    const ctx = makeMockContext({});
    mockOpen.mockResolvedValue(mockHandle('hello world'));

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
    mockOpen.mockRejectedValue(
      Object.assign(new Error('ENOENT: no such file'), { code: 'ENOENT' }),
    );

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
    expect(mockOpen).not.toHaveBeenCalled();
  });

  it('reads file as base64 when encoding is base64', async () => {
    const ctx = makeMockContext({});
    mockOpen.mockResolvedValue(mockHandle(Buffer.from('binary data')));

    const result = await coreFileRead.execute(ctx, {
      path: 'image.png',
      encoding: 'base64',
      outputKey: 'data',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('_file_encoding')).toBe('base64');
    expect(ctx.get('data')).toBe(Buffer.from('binary data').toString('base64'));
  });

  /**
   * The size and the content come from one open descriptor. Naming the path
   * twice — stat() then readFile() — lets the two calls land on different
   * files if the path is replaced between them, which is the race CodeQL
   * reported at this node.
   */
  it('takes the size and the bytes from a single handle', async () => {
    const ctx = makeMockContext({});
    const handle = mockHandle('contents');
    mockOpen.mockResolvedValue(handle);

    await coreFileRead.execute(ctx, { path: 'README.md', outputKey: 'c' });

    expect(mockOpen).toHaveBeenCalledTimes(1);
    expect(mockOpen).toHaveBeenCalledWith('/workspace/README.md', 'r');
    expect(handle.readFile).toHaveBeenCalledTimes(1);
  });

  it('closes the handle even when the read fails', async () => {
    const ctx = makeMockContext({});
    const handle = mockHandle('unused');
    handle.readFile.mockRejectedValue(new Error('EIO'));
    mockOpen.mockResolvedValue(handle);

    const result = await coreFileRead.execute(ctx, { path: 'README.md', outputKey: 'c' });

    expect(result.status).toBe('failed');
    expect(handle.close).toHaveBeenCalledTimes(1);
  });
});

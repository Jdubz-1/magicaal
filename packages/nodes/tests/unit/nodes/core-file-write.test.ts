import { coreFileWrite } from '../../../src/nodes/core-file-write';
import { makeMockContext } from '../../helpers/mock-context';

jest.mock('node:fs/promises', () => ({
  writeFile: jest.fn(),
  mkdir: jest.fn(),
}));

import { writeFile, mkdir } from 'node:fs/promises';

const mockWriteFile = writeFile as jest.Mock;
const mockMkdir = mkdir as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  process.env['WORKSPACE_BASE_PATH'] = '/workspace';
  mockWriteFile.mockResolvedValue(undefined);
  mockMkdir.mockResolvedValue(undefined);
});

describe('core:file-write', () => {
  it('writes string content to a file', async () => {
    const ctx = makeMockContext({ myContent: 'hello world' });

    const result = await coreFileWrite.execute(ctx, {
      path: 'output.txt',
      contentKey: 'myContent',
      outputKey: 'writeResult',
    });

    expect(result.status).toBe('complete');
    expect(mockWriteFile).toHaveBeenCalled();
    const written = ctx.get<{ bytesWritten: number }>('writeResult');
    expect(written?.bytesWritten).toBeGreaterThan(0);
  });

  it('serialises non-string content as JSON', async () => {
    const ctx = makeMockContext({ data: { key: 'value' } });

    const result = await coreFileWrite.execute(ctx, {
      path: 'data.json',
      contentKey: 'data',
      outputKey: 'writeResult',
    });

    expect(result.status).toBe('complete');
    const [, buffer] = mockWriteFile.mock.calls[0] as [string, Buffer];
    expect(buffer.toString('utf8')).toContain('"key": "value"');
  });

  it('creates parent directories when createDirs is true', async () => {
    const ctx = makeMockContext({ text: 'hi' });

    await coreFileWrite.execute(ctx, {
      path: 'subdir/file.txt',
      contentKey: 'text',
      createDirs: true,
      outputKey: 'result',
    });

    expect(mockMkdir).toHaveBeenCalledWith(expect.any(String), { recursive: true });
  });

  it('returns failed when contentKey is not set', async () => {
    const ctx = makeMockContext({});

    const result = await coreFileWrite.execute(ctx, {
      path: 'file.txt',
      contentKey: 'missing',
      outputKey: 'result',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('FILE_WRITE_ERROR');
  });

  it('returns FILE_PATH_INVALID for traversal attempt', async () => {
    const ctx = makeMockContext({ text: 'evil' });

    const result = await coreFileWrite.execute(ctx, {
      path: '../../../etc/crontab',
      contentKey: 'text',
      outputKey: 'result',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('FILE_PATH_INVALID');
    expect(mockWriteFile).not.toHaveBeenCalled();
  });
});

import * as zlib from 'node:zlib';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import {
  extractMpack,
  installAndLoad,
  assertWithinPackagesDir,
  MAX_DECOMPRESSED_BYTES,
} from '@/marketplace/package-loader';

/** Minimal ustar writer for test fixtures (mirrors what the publisher CLI produces). */
function makeTarGz(files: Record<string, string>): Buffer {
  const blocks: Buffer[] = [];

  for (const [name, content] of Object.entries(files)) {
    const body = Buffer.from(content, 'utf8');
    const header = Buffer.alloc(512);
    header.write(name, 0, 100, 'utf8');
    header.write('0000644\0', 100, 8, 'utf8'); // mode
    header.write('0000000\0', 108, 8, 'utf8'); // uid
    header.write('0000000\0', 116, 8, 'utf8'); // gid
    header.write(body.length.toString(8).padStart(11, '0') + '\0', 124, 12, 'utf8');
    header.write('00000000000\0', 136, 12, 'utf8'); // mtime
    header.write('        ', 148, 8, 'utf8'); // checksum placeholder
    header[156] = 0x30; // '0' = regular file
    header.write('ustar\0', 257, 6, 'utf8');
    header.write('00', 263, 2, 'utf8');

    let checksum = 0;
    for (const byte of header) checksum += byte;
    header.write(checksum.toString(8).padStart(6, '0') + '\0 ', 148, 8, 'utf8');

    blocks.push(header);
    blocks.push(body);
    const pad = (512 - (body.length % 512)) % 512;
    if (pad > 0) blocks.push(Buffer.alloc(pad));
  }

  blocks.push(Buffer.alloc(1024)); // end-of-archive
  return zlib.gzipSync(Buffer.concat(blocks));
}

describe('extractMpack', () => {
  it('extracts files from a gzipped tar bundle', () => {
    const bundle = makeTarGz({
      'manifest.json': '{"name":"demo"}',
      'index.js': 'module.exports = {};',
      'schema/node.json': '{}',
    });

    const files = extractMpack(bundle);
    expect(files.get('manifest.json')!.toString()).toBe('{"name":"demo"}');
    expect(files.get('index.js')!.toString()).toBe('module.exports = {};');
    expect(files.get('schema/node.json')!.toString()).toBe('{}');
  });

  it('rejects path traversal entries', () => {
    const bundle = makeTarGz({ '../evil.js': 'evil();' });
    expect(() => extractMpack(bundle)).toThrow(/escapes the package root/);
  });

  it('rejects non-gzip input', () => {
    expect(() => extractMpack(Buffer.from('not a bundle'))).toThrow();
  });

  it('refuses a gzip bomb rather than inflating it (ISS-056)', () => {
    // ~600 MB of zeroes compresses to a few hundred KB — well past the cap
    const bomb = zlib.gzipSync(Buffer.alloc(MAX_DECOMPRESSED_BYTES + 64 * 1024 * 1024));
    expect(bomb.length).toBeLessThan(2 * 1024 * 1024);

    expect(() => extractMpack(bomb)).toThrow(/failed to decompress/);
  });

  it('rejects an entry whose declared size runs past the archive', () => {
    const bundle = makeTarGz({ 'index.js': 'x' });
    const tar = zlib.gunzipSync(bundle);
    // Overwrite the size field (octal, offset 124) with an absurd length
    tar.write('77777777777\0', 124, 'utf8');

    expect(() => extractMpack(zlib.gzipSync(tar))).toThrow(/size outside the archive/);
  });
});

describe('assertWithinPackagesDir (ISS-057)', () => {
  const root = path.join(os.tmpdir(), 'magicaal-root');

  it('accepts a directory inside the install root', () => {
    expect(assertWithinPackagesDir(path.join(root, 'acme-demo-1.0.0'), root)).toBe(
      path.join(root, 'acme-demo-1.0.0'),
    );
  });

  it('refuses a directory outside the install root', () => {
    expect(() => assertWithinPackagesDir('/etc', root)).toThrow(/outside the install root/);
  });

  it('refuses traversal out of the install root', () => {
    expect(() => assertWithinPackagesDir(path.join(root, '..', 'evil'), root)).toThrow(
      /outside the install root/,
    );
  });

  it('refuses a sibling directory sharing the root prefix', () => {
    expect(() => assertWithinPackagesDir(`${root}-evil`, root)).toThrow(/outside the install root/);
  });
});

describe('installAndLoad', () => {
  let installRoot: string;

  beforeEach(() => {
    installRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'magicaal-pkg-'));
  });

  afterEach(() => {
    fs.rmSync(installRoot, { recursive: true, force: true });
  });

  it('writes the bundle to disk and loads exported NODES', () => {
    const manifest = {
      scope: 'community',
      publisher: 'acme',
      name: 'demo',
      version: '1.0.0',
    };
    const indexJs = `
      module.exports.NODES = [{
        type: 'community:acme:demo-node',
        meta: { name: 'Demo', description: 'd', category: 'integration', version: '1.0.0' },
        schema: { config: {}, input: {}, output: {} },
        execute: async () => ({ status: 'complete', outputs: {} }),
      }];
    `;

    const files = new Map<string, Buffer>([
      ['manifest.json', Buffer.from(JSON.stringify(manifest))],
      ['index.js', Buffer.from(indexJs)],
    ]);

    const loaded = installAndLoad(files, installRoot);
    expect(loaded.manifest.name).toBe('demo');
    expect(loaded.nodes).toHaveLength(1);
    expect(loaded.nodes[0].type).toBe('community:acme:demo-node');
    expect(
      fs.existsSync(path.join(installRoot, 'acme-demo-1.0.0', 'index.js')),
    ).toBe(true);
  });

  it('throws when the module exports no nodes', () => {
    const files = new Map<string, Buffer>([
      [
        'manifest.json',
        Buffer.from(JSON.stringify({ publisher: 'acme', name: 'empty', version: '1.0.0' })),
      ],
      ['index.js', Buffer.from('module.exports = {};')],
    ]);

    expect(() => installAndLoad(files, installRoot)).toThrow(/exports no nodes/);
  });

  it('rejects manifest identifiers containing path separators or traversal', () => {
    const validNode =
      "module.exports.NODES = [{ type: 't', meta: { name: 'n', description: 'd', category: 'integration', version: '1.0.0' }, schema: { config: {}, input: {}, output: {} }, execute: async () => ({ status: 'complete', outputs: {} }) }];";
    for (const bad of [
      { publisher: '../../../tmp/evil', name: 'x', version: '1.0.0' },
      { publisher: 'acme/evil', name: 'x', version: '1.0.0' },
      { publisher: 'acme', name: 'a/b', version: '1.0.0' },
      { publisher: 'acme', name: 'x', version: '1.0.0/../..' },
    ]) {
      const files = new Map<string, Buffer>([
        ['manifest.json', Buffer.from(JSON.stringify(bad))],
        ['index.js', Buffer.from(validNode)],
      ]);
      expect(() => installAndLoad(files, installRoot)).toThrow(/unsafe package|escapes/);
    }

    // Nothing was written outside the install root
    expect(fs.existsSync(path.join(installRoot, '..', 'tmp', 'evil-x-1.0.0'))).toBe(false);
  });
});

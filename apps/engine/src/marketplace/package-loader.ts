import * as zlib from 'node:zlib';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { NodeModule, IntegrationPackage } from '@magicaal/sdk-node';
import type { PackageManifest } from './package-verifier';

/**
 * Extract a .mpack bundle (gzipped POSIX tar) into a path → content map.
 * Minimal ustar reader: 512-byte headers, name (+ optional ustar prefix),
 * octal size, content padded to 512-byte blocks. Bundles are produced by
 * the publisher CLI, so exotic tar features (GNU longname, sparse files)
 * are out of scope and rejected implicitly by the plain-file filter.
 */
export function extractMpack(bundle: Buffer): Map<string, Buffer> {
  const tar = zlib.gunzipSync(bundle);
  const files = new Map<string, Buffer>();

  let offset = 0;
  while (offset + 512 <= tar.length) {
    const header = tar.subarray(offset, offset + 512);

    // Two consecutive zero blocks terminate the archive
    if (header.every((b) => b === 0)) break;

    const name = header.subarray(0, 100).toString('utf8').replace(/\0.*$/, '');
    const sizeOctal = header.subarray(124, 136).toString('utf8').replace(/[\0 ]/g, '');
    const size = parseInt(sizeOctal || '0', 8);
    const typeFlag = header[156];
    const prefix = header.subarray(345, 500).toString('utf8').replace(/\0.*$/, '');
    const fullName = prefix ? `${prefix}/${name}` : name;

    offset += 512;

    // '0' or NUL = plain file; directories ('5') and everything else are skipped
    if ((typeFlag === 0x30 || typeFlag === 0) && fullName) {
      // Normalize leading ./ and reject path traversal outright
      const normalized = fullName.replace(/^\.\//, '');
      if (normalized.includes('..')) {
        throw new Error(`bundle entry escapes the package root: ${fullName}`);
      }
      files.set(normalized, Buffer.from(tar.subarray(offset, offset + size)));
    }

    offset += Math.ceil(size / 512) * 512;
  }

  return files;
}

export interface LoadedPackage {
  manifest: PackageManifest;
  nodes: NodeModule[];
  integration?: IntegrationPackage;
}

/**
 * Write extracted bundle files to the installed-packages directory and load
 * the CommonJS module. The bundle's index.js must export either NODES
 * (NodeModule[]) or INTEGRATION (IntegrationPackage), or default-export one
 * of the two.
 */
export function installAndLoad(
  files: Map<string, Buffer>,
  installRoot: string,
): LoadedPackage {
  const manifest = JSON.parse(
    files.get('manifest.json')!.toString('utf8'),
  ) as PackageManifest;

  const dir = path.join(installRoot, `${manifest.publisher}-${manifest.name}-${manifest.version}`);
  fs.mkdirSync(dir, { recursive: true });
  for (const [rel, content] of files) {
    const target = path.join(dir, rel);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
  }

  return loadPackageDir(dir);
}

/** Load an already-installed package directory (startup re-load of installed packages). */
export function loadPackageDir(dir: string): LoadedPackage {
  const manifest = JSON.parse(
    fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'),
  ) as PackageManifest;

  const indexPath = path.join(dir, 'index.js');
  // Bust the require cache so an updated version replaces the old module
  delete require.cache[require.resolve(indexPath)];
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require(indexPath) as Record<string, unknown>;

  const integration = (mod.INTEGRATION ?? undefined) as IntegrationPackage | undefined;
  let nodes = (mod.NODES ?? mod.default ?? integration?.nodes) as NodeModule[] | undefined;
  if (integration && !nodes) nodes = integration.nodes;

  if (!nodes || !Array.isArray(nodes) || nodes.length === 0) {
    throw new Error(
      `package ${manifest.publisher}/${manifest.name} exports no nodes (expected NODES or INTEGRATION)`,
    );
  }

  return { manifest, nodes, integration };
}

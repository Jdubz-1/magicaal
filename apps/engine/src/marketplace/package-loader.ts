import * as zlib from 'node:zlib';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { NodeModule, IntegrationPackage } from '@magicaal/sdk-node';
import { verifyPackage, isInstallAllowed, type PackageManifest } from './package-verifier';

/**
 * Cap on the decompressed size of a bundle. Gzip reaches ratios of 1000:1, so
 * without a cap a small upload can inflate to tens of gigabytes and take the
 * engine down before any signature is even checked — extraction happens first.
 */
export const MAX_DECOMPRESSED_BYTES = 256 * 1024 * 1024;

/**
 * Extract a .mpack bundle (gzipped POSIX tar) into a path → content map.
 * Minimal ustar reader: 512-byte headers, name (+ optional ustar prefix),
 * octal size, content padded to 512-byte blocks. Bundles are produced by
 * the publisher CLI, so exotic tar features (GNU longname, sparse files)
 * are out of scope and rejected implicitly by the plain-file filter.
 */
export function extractMpack(bundle: Buffer): Map<string, Buffer> {
  let tar: Buffer;
  try {
    tar = zlib.gunzipSync(bundle, { maxOutputLength: MAX_DECOMPRESSED_BYTES });
  } catch (err) {
    // zlib raises ERR_BUFFER_TOO_LARGE once the cap is exceeded
    throw new Error(
      `bundle failed to decompress (max ${MAX_DECOMPRESSED_BYTES} bytes): ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }

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

    // A header may not claim more content than the archive actually holds
    if (!Number.isFinite(size) || size < 0 || offset + size > tar.length) {
      throw new Error(`bundle entry "${fullName}" declares a size outside the archive`);
    }

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
  /** Absolute directory the package was installed to (safe, within installRoot). */
  dir: string;
}

/**
 * Manifest identifier segments become a filesystem directory name, so they
 * must not contain path separators or traversal sequences. Restrict to a
 * conservative charset shared by publisher handles, package names, and semver.
 */
function safeSegment(kind: string, value: unknown): string {
  if (typeof value !== 'string' || !/^[A-Za-z0-9._-]+$/.test(value)) {
    throw new Error(`unsafe package ${kind}: ${JSON.stringify(value)}`);
  }
  return value;
}

/**
 * Assert a package directory lies inside the install root. Loading a package
 * `require()`s its code with full engine privileges, so a directory that
 * arrives from outside this process (e.g. a Redis hot-load event) must never
 * be trusted to point where it claims.
 */
export function assertWithinPackagesDir(dir: string, installRoot: string): string {
  const resolved = path.resolve(dir);
  const root = path.resolve(installRoot);
  if (resolved !== root && !resolved.startsWith(root + path.sep)) {
    throw new Error(`package directory is outside the install root: ${dir}`);
  }
  return resolved;
}

/** Safe, validated install directory for a manifest under installRoot. */
export function packageInstallDir(
  installRoot: string,
  manifest: Pick<PackageManifest, 'publisher' | 'name' | 'version'>,
): string {
  const dirName = `${safeSegment('publisher', manifest.publisher)}-${safeSegment('name', manifest.name)}-${safeSegment('version', manifest.version)}`;
  const dir = path.resolve(installRoot, dirName);
  const root = path.resolve(installRoot);
  if (dir !== path.join(root, dirName) || !dir.startsWith(root + path.sep)) {
    throw new Error('resolved package directory escapes the install root');
  }
  return dir;
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

  const dir = packageInstallDir(installRoot, manifest);
  fs.mkdirSync(dir, { recursive: true });
  for (const [rel, content] of files) {
    // rel is guarded against traversal in extractMpack; re-assert containment
    const target = path.resolve(dir, rel);
    if (target !== path.join(dir, rel) || !target.startsWith(dir + path.sep)) {
      throw new Error(`bundle entry escapes the package directory: ${rel}`);
    }
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
  }

  return loadPackageDir(dir);
}

/** Recursively read every file under `dir` into a path → content map, relative to `dir`. */
function readDirFiles(dir: string, base: string = dir): Map<string, Buffer> {
  const files = new Map<string, Buffer>();
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      for (const [rel, content] of readDirFiles(full, base)) files.set(rel, content);
    } else if (entry.isFile()) {
      files.set(path.relative(base, full).split(path.sep).join('/'), fs.readFileSync(full));
    }
  }
  return files;
}

/**
 * Re-verify an installed package against its manifest signatures. Installed
 * code is `require()`d with full engine privileges, so the on-disk bytes are
 * re-checked at every load rather than trusting that whatever is in the
 * install directory was verified when it was written.
 */
export function verifyInstalledDir(dir: string, allowUnverified: boolean): PackageManifest {
  const files = readDirFiles(dir);
  const result = verifyPackage(files);
  if (!isInstallAllowed(result.status, allowUnverified)) {
    throw new Error(
      `installed package failed re-verification (${result.status}): ${result.errors.join('; ') || 'not countersigned by MagiCaal'}`,
    );
  }
  return JSON.parse(files.get('manifest.json')!.toString('utf8')) as PackageManifest;
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

  return { manifest, nodes, integration, dir };
}

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { glob } from 'glob';
import { compile, CompileError, AgentGraph } from '@magicaal/compiler';
import type { AgentGraphDefinition } from '@magicaal/core';

export interface BuildOptions {
  agentsDir: string;
  outDir: string;
  cwd: string;
}

export interface ManifestEntry {
  handle: string;
  file: string;
  hash: string;
}

export interface BuildResult {
  built: ManifestEntry[];
  errors: { file: string; error: string }[];
}

export async function runBuild(opts: BuildOptions): Promise<BuildResult> {
  const agentsDir = resolve(opts.cwd, opts.agentsDir);
  const outDir = resolve(opts.cwd, opts.outDir);

  if (!existsSync(agentsDir)) {
    console.error(`Agents directory not found: ${agentsDir}`);
    return { built: [], errors: [] };
  }

  mkdirSync(outDir, { recursive: true });

  const pattern = join(agentsDir, '**', '*.agent.ts').replace(/\\/g, '/');
  const files = await glob(pattern);

  if (files.length === 0) {
    console.log(`No *.agent.ts files found in ${agentsDir}`);
  }

  const built: ManifestEntry[] = [];
  const errors: { file: string; error: string }[] = [];

  for (const filePath of files) {
    const relPath = relative(opts.cwd, filePath);
    try {
      // Use tsx register to support TypeScript + decorators at runtime
      const mod = await import(`tsx/esm?${Date.now()}`).catch(() => null);
      void mod; // tsx is pre-registered via --import flag at CLI entry; direct import here

      // Dynamic import of the agent file
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const exports: Record<string, any> = await import(filePath);

      // Find the decorated class
      let definition: AgentGraphDefinition | null = null;
      for (const key of Object.keys(exports)) {
        const value = exports[key];
        if (typeof value === 'function' && value.prototype instanceof AgentGraph) {
          try {
            definition = compile(value as new () => AgentGraph);
            break;
          } catch (err) {
            if (err instanceof CompileError) {
              const details = err.details?.join('\n  ') ?? '';
              errors.push({ file: relPath, error: `${err.message}\n  ${details}` });
            } else {
              throw err;
            }
          }
        }
      }

      if (!definition) {
        if (!errors.find((e) => e.file === relPath)) {
          errors.push({ file: relPath, error: 'No class extending AgentGraph with @Agent decorator found' });
        }
        continue;
      }

      const json = JSON.stringify(definition, null, 2);
      const hash = createHash('sha256').update(json).digest('hex');
      const outFile = join(outDir, `${definition.handle}.agent.json`);
      writeFileSync(outFile, json, 'utf8');

      built.push({ handle: definition.handle!, file: relPath, hash });
      console.log(`  ✓ ${definition.handle} → ${relative(opts.cwd, outFile)}`);
    } catch (err) {
      errors.push({
        file: relPath,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  // Write manifest — skip if nothing compiled successfully to prevent accidental staling
  const manifestPath = join(outDir, 'agents.manifest.json');
  if (built.length === 0 && errors.length > 0) {
    console.warn('\nNo agents compiled successfully — skipping manifest write to prevent staling existing agents.');
  } else {
    writeFileSync(manifestPath, JSON.stringify({ agents: built }, null, 2), 'utf8');
    console.log(`\nManifest written: ${relative(opts.cwd, manifestPath)}`);
  }

  // Report errors
  for (const e of errors) {
    console.error(`\n  ✗ ${e.file}:\n    ${e.error.replace(/\n/g, '\n    ')}`);
  }

  return { built, errors };
}

export async function buildCommand(
  agentsDir: string,
  outDir: string,
  cwd = process.cwd(),
): Promise<void> {
  console.log(`Building agents from: ${agentsDir}`);
  const result = await runBuild({ agentsDir, outDir, cwd });
  if (result.errors.length > 0) {
    process.exitCode = 1;
  }
  console.log(`\nDone: ${result.built.length} built, ${result.errors.length} errors`);
}

// Read the manifest (used by boot-time sync)
export function readManifest(outDir: string): ManifestEntry[] {
  const manifestPath = join(outDir, 'agents.manifest.json');
  if (!existsSync(manifestPath)) return [];
  const raw = readFileSync(manifestPath, 'utf8');
  const parsed = JSON.parse(raw) as { agents: ManifestEntry[] };
  return parsed.agents;
}

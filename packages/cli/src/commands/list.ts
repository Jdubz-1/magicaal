import { resolve, relative } from 'node:path';
import { existsSync } from 'node:fs';
import { glob } from 'glob';
import { join } from 'node:path';
import { AgentGraph, AgentMeta, AGENT_META_KEY } from '@magicaal/compiler';
import 'reflect-metadata';

export async function listCommand(agentsDir: string, cwd = process.cwd()): Promise<void> {
  const dir = resolve(cwd, agentsDir);
  if (!existsSync(dir)) {
    console.error(`Agents directory not found: ${dir}`);
    process.exitCode = 1;
    return;
  }

  const pattern = join(dir, '**', '*.agent.ts').replace(/\\/g, '/');
  const files = await glob(pattern);

  if (files.length === 0) {
    console.log('No *.agent.ts files found');
    return;
  }

  console.log('Agents:\n');
  for (const filePath of files) {
    const relPath = relative(cwd, filePath);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const exports: Record<string, any> = await import(filePath);
      for (const key of Object.keys(exports)) {
        const value = exports[key];
        if (typeof value === 'function' && value.prototype instanceof AgentGraph) {
          const meta: AgentMeta | undefined = Reflect.getMetadata(AGENT_META_KEY, value);
          if (meta) {
            console.log(`  ${meta.handle.padEnd(30)} ${meta.name}`);
            console.log(`  ${''.padEnd(30)} ${relPath}`);
            if (meta.description) console.log(`  ${''.padEnd(30)} ${meta.description}`);
            console.log();
          }
        }
      }
    } catch {
      console.warn(`  (skipped ${relPath} — import failed)`);
    }
  }
}

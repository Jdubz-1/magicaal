import { resolve, relative } from 'node:path';
import { existsSync } from 'node:fs';
import { glob } from 'glob';
import { join } from 'node:path';
import { compile, CompileError, AgentGraph } from '@magicaal/compiler';

export async function validateCommand(agentsDir: string, cwd = process.cwd()): Promise<void> {
  const dir = resolve(cwd, agentsDir);
  if (!existsSync(dir)) {
    console.error(`Agents directory not found: ${dir}`);
    process.exitCode = 1;
    return;
  }

  const pattern = join(dir, '**', '*.agent.ts').replace(/\\/g, '/');
  const files = await glob(pattern);

  if (files.length === 0) {
    console.log(`No *.agent.ts files found in ${dir}`);
    return;
  }

  let valid = 0;
  let invalid = 0;

  for (const filePath of files) {
    const relPath = relative(cwd, filePath);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const exports: Record<string, any> = await import(filePath);
      let found = false;
      for (const key of Object.keys(exports)) {
        const value = exports[key];
        if (typeof value === 'function' && value.prototype instanceof AgentGraph) {
          compile(value as new () => AgentGraph);
          console.log(`  ✓ ${relPath} (${key})`);
          valid++;
          found = true;
          break;
        }
      }
      if (!found) {
        console.error(`  ✗ ${relPath}: no @Agent class found`);
        invalid++;
      }
    } catch (err) {
      if (err instanceof CompileError) {
        console.error(`  ✗ ${relPath}: ${err.message}`);
        if (err.details) {
          for (const d of err.details) console.error(`      ${d}`);
        }
      } else {
        console.error(`  ✗ ${relPath}: ${err instanceof Error ? err.message : String(err)}`);
      }
      invalid++;
    }
  }

  console.log(`\n${valid} valid, ${invalid} invalid`);
  if (invalid > 0) process.exitCode = 1;
}

#!/usr/bin/env node
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

// Register tsx for TypeScript + decorator support in agent files
register('tsx/esm', pathToFileURL('./'));

import { Command } from 'commander';
import { buildCommand } from './commands/build.js';
import { validateCommand } from './commands/validate.js';
import { listCommand } from './commands/list.js';
import { sessionsCommand } from './commands/sessions.js';
import { generateCommand } from './commands/generate.js';

const program = new Command();

program
  .name('magicaal')
  .description('MagiCaal CLI — build and manage code-defined agents')
  .version('0.1.0');

program
  .command('build')
  .description('Compile *.agent.ts files to agent JSON')
  .option('-d, --agents-dir <dir>', 'Directory containing *.agent.ts files', './agents')
  .option('-o, --out-dir <dir>', 'Output directory for compiled agent JSON', './dist/agents')
  .action(async (opts: { agentsDir: string; outDir: string }) => {
    await buildCommand(opts.agentsDir, opts.outDir);
  });

program
  .command('validate')
  .description('Validate *.agent.ts files without writing output')
  .option('-d, --agents-dir <dir>', 'Directory containing *.agent.ts files', './agents')
  .action(async (opts: { agentsDir: string }) => {
    await validateCommand(opts.agentsDir);
  });

program
  .command('list')
  .description('List all agents found in the agents directory')
  .option('-d, --agents-dir <dir>', 'Directory containing *.agent.ts files', './agents')
  .action(async (opts: { agentsDir: string }) => {
    await listCommand(opts.agentsDir);
  });

program
  .command('generate')
  .description('Generate typed descriptors (*.types.ts + *.descriptor.ts) from agent schemas')
  .option('-a, --agent <handleOrId>', 'Generate for a single agent')
  .option('--all', 'Generate for all accessible agents')
  .option('--check', 'Verify generated files are up to date (exit 1 on drift)')
  .option('-o, --out-dir <dir>', 'Output directory', './src/magicaal')
  .option('--api-url <url>', 'MagiCaal API base URL', 'http://localhost:3000')
  .option('--token <token>', 'API token (defaults to MAGICAAL_API_TOKEN)')
  .action(async (opts: { agent?: string; all?: boolean; check?: boolean; outDir: string; apiUrl: string; token?: string }) => {
    await generateCommand(opts);
  });

const sessionsCmd = program.command('sessions').description('Manage persistent agent sessions');

sessionsCmd
  .command('migrate')
  .description('Trigger schema migration for sessions with stale schema versions')
  .option('-a, --agent <handle>', 'Migrate only sessions for the given agent handle or id')
  .option('--api-url <url>', 'MagiCaal API base URL', 'http://localhost:3000')
  .option('--token <token>', 'API token (defaults to MAGICAAL_API_TOKEN)')
  .action(async (opts: { agent?: string; apiUrl: string; token?: string }) => {
    await sessionsCommand('migrate', opts.agent, opts.apiUrl, opts.token);
  });

program.parse(process.argv);

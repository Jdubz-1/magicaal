import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Router } from 'express';

jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

jest.mock('@/queue/client', () => ({
  redis: { incr: jest.fn(), expire: jest.fn(), publish: jest.fn() },
  runTriggerQueue: { add: jest.fn() },
  runScheduledQueue: { add: jest.fn(), getRepeatableJobs: jest.fn(), removeRepeatableByKey: jest.fn() },
  runRetryQueue: { add: jest.fn() },
}));

import { healthRouter } from '@/routes/health';
import { internalRouter } from '@/routes/internal';

interface EngineRoute {
  method: string;
  path: string;
}

/** Route layers registered directly on a router (no further nested mounts). */
function routesOf(router: Router): EngineRoute[] {
  const routes: EngineRoute[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const layer of (router as any).stack) {
    if (!layer.route) continue;
    for (const method of Object.keys(layer.route.methods)) {
      routes.push({ method: method.toUpperCase(), path: layer.route.path });
    }
  }
  return routes;
}

/** :id, :agentId, :runId, … all mean "some path segment" for existence-checking purposes. */
function normalize(pathTemplate: string): string {
  return pathTemplate.replace(/:[A-Za-z0-9_]+/g, ':param');
}

const engineRoutes = new Set<string>([
  ...routesOf(healthRouter).map((r) => `${r.method} ${normalize(r.path)}`),
  ...routesOf(internalRouter).map((r) => `${r.method} ${normalize(`/internal${r.path}`)}`),
]);

/**
 * Every path apps/api's engineClient calls, scraped directly from source
 * rather than imported — apps/api is a separate workspace with its own build
 * graph, and the point of this test is to catch drift with zero coupling
 * beyond text. A template literal's `${...}` interpolations become `:param`,
 * matching how normalize() treats the engine's `:id`-style params.
 */
function apiCallSites(): Array<{ method: string; path: string; file: string }> {
  const apiSrcDir = path.join(__dirname, '../../../api/src');
  const calls: Array<{ method: string; path: string; file: string }> = [];

  const callRegex = /engineClient\.(get|post|put|delete|patch)\(\s*(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g;

  function walk(dir: string): void {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && entry.name.endsWith('.ts') && !entry.name.endsWith('.test.ts')) {
        const content = fs.readFileSync(full, 'utf8');
        for (const match of content.matchAll(callRegex)) {
          const method = match[1].toUpperCase();
          const rawLiteral = match[2].slice(1, -1); // strip quotes/backticks
          const genericPath = rawLiteral.replace(/\$\{[^}]*\}/g, ':param');
          calls.push({ method, path: genericPath, file: path.relative(apiSrcDir, full) });
        }
      }
    }
  }

  walk(apiSrcDir);
  return calls;
}

describe('apps/api → apps/engine route contract', () => {
  it('every path apps/api calls via engineClient exists on the engine router', () => {
    const calls = apiCallSites();
    expect(calls.length).toBeGreaterThan(10); // sanity: the scrape actually found call sites

    const missing = calls.filter((c) => !engineRoutes.has(`${c.method} ${normalize(c.path)}`));

    if (missing.length > 0) {
      const detail = missing.map((m) => `  ${m.method} ${m.path}  (${m.file})`).join('\n');
      throw new Error(
        `apps/api calls routes the engine does not serve:\n${detail}\n\n` +
          `Engine routes:\n${[...engineRoutes].sort().map((r) => `  ${r}`).join('\n')}`,
      );
    }
  });
});

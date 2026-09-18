import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const CANVAS_DIR = join(__dirname, '../../src/canvas');

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.(svelte|ts)$/.test(entry) ? [full] : [];
  });
}

/**
 * The web app's /api proxy prepends /v1 to every forwarded path (app.ts), so a
 * canvas fetch to '/api/v1/...' reaches the API as '/v1/v1/...' and 404s — the
 * failure mode that made the Caal panel unusable.
 */
describe('canvas API paths', () => {
  it('never calls /api/v1/ — the proxy already adds the version prefix', () => {
    const offenders = sourceFiles(CANVAS_DIR).filter((file) =>
      readFileSync(file, 'utf8').includes('/api/v1/'),
    );

    expect(offenders).toEqual([]);
  });
});

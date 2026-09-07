import type { Router } from 'express';
import { router } from '../../src/routes';
import { buildOpenApiSpec } from '../../src/openapi/spec';

/**
 * The published OpenAPI document is hand-maintained, so it drifts from the
 * routes in both directions. Both have actually happened:
 *
 *  - `DELETE /v1/agents/{id}` was documented for months before the route
 *    existed, so the published reference advertised an endpoint that 404'd.
 *  - `/v1/sessions` and `/v1/utils` were registered and never documented.
 *
 * apps/engine/tests/route/api-contract.test.ts guards the api→engine seam the
 * same way; this is the public-contract equivalent.
 */

/** :id, {id}, :runId … all mean "some path segment" for existence checking. */
function normalize(pathTemplate: string): string {
  return pathTemplate
    .replace(/\{[^}]*\}/g, ':param')
    .replace(/:[A-Za-z0-9_]+/g, ':param')
    .replace(/\/$/, '');
}

/**
 * Recover a router's mount path from the regexp Express compiled it into.
 * `router.use('/v1/agents/:id/runs', r)` compiles to
 * `^\/v1\/agents(?:\/([^/]+?))\/runs\/?(?=\/|$)` — note the param group
 * carries its own leading slash, and the class inside it is unescaped.
 */
function mountPathOf(layer: { regexp?: RegExp & { fast_slash?: boolean } }): string {
  const re = layer.regexp;
  if (!re || re.fast_slash) return '';
  return re.source
    .replace(/^\^/, '')
    .replace(/\\\/\?\(\?=\\\/\|\$\)$/, '')
    .replace(/\(\?:\\\/\(\[\^\/\]\+\?\)\)/g, '/:param')
    .replace(/\\\//g, '/');
}

/** Every METHOD + path the composed router actually serves. */
function collectRoutes(r: Router, prefix = ''): string[] {
  const found: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const layer of (r as any).stack ?? []) {
    if (layer.route) {
      for (const method of Object.keys(layer.route.methods)) {
        found.push(`${method.toUpperCase()} ${normalize(prefix + layer.route.path)}`);
      }
    } else if (layer.name === 'router' && layer.handle?.stack) {
      found.push(...collectRoutes(layer.handle as Router, prefix + mountPathOf(layer)));
    }
  }
  return found;
}

const registered = new Set(collectRoutes(router));

/** Only /v1 paths are part of the public contract; /internal is engine-facing. */
const publicRegistered = [...registered].filter((r) => r.includes(' /v1/'));

const spec = buildOpenApiSpec() as { paths: Record<string, Record<string, unknown>> };
const documented = new Set(
  Object.entries(spec.paths).flatMap(([p, ops]) =>
    Object.keys(ops)
      .filter((k) => ['get', 'post', 'put', 'patch', 'delete'].includes(k))
      .map((m) => `${m.toUpperCase()} ${normalize(p)}`),
  ),
);

describe('OpenAPI spec ↔ registered routes', () => {
  it('the route walk found a realistic surface', () => {
    // Guards against the walk silently returning nothing and both assertions
    // below passing vacuously.
    expect(publicRegistered.length).toBeGreaterThan(40);
    expect(documented.size).toBeGreaterThan(40);
  });

  it('every documented path is actually served', () => {
    const phantom = [...documented].filter((d) => !registered.has(d));
    if (phantom.length > 0) {
      throw new Error(
        `The OpenAPI spec documents endpoints that no route serves — the published ` +
          `reference would 404:\n${phantom.map((p) => `  ${p}`).join('\n')}`,
      );
    }
  });

  it('every served /v1 route is documented', () => {
    const undocumented = publicRegistered.filter((r) => !documented.has(r));
    if (undocumented.length > 0) {
      throw new Error(
        `Routes are served but absent from the OpenAPI spec:\n` +
          undocumented.map((r) => `  ${r}`).join('\n'),
      );
    }
  });
});

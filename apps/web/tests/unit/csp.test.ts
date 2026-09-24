import { readFileSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import { join } from 'node:path';
import { createApp } from '../../src/app';

/**
 * `apps/web` renders tenant names, agent names and operator-supplied URLs into
 * HTML, and it was the one app running `helmet({ contentSecurityPolicy: false })`.
 * These tests pin the policy that replaced it, because a CSP fails silently:
 * a wrong directive blocks a script and nothing in the server logs says so.
 */

let server: Server;
let origin: string;

beforeAll(async () => {
  server = createServer(createApp());
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const addr = server.address();
  if (typeof addr === 'string' || addr === null) throw new Error('no port');
  origin = `http://127.0.0.1:${addr.port}`;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) =>
    server.close((err) => (err ? reject(err) : resolve())),
  );
});

async function policy(): Promise<string> {
  const res = await fetch(`${origin}/health`);
  const header = res.headers.get('content-security-policy');
  if (!header) throw new Error('no CSP header');
  return header;
}

function directive(csp: string, name: string): string {
  const found = csp.split(';').map((d) => d.trim()).find((d) => d.startsWith(`${name} `));
  if (!found) throw new Error(`no ${name} directive in: ${csp}`);
  return found;
}

describe('content security policy', () => {
  it('is sent on every response', async () => {
    await expect(policy()).resolves.toContain("default-src 'self'");
  });

  it.each([
    ["default-src", "default-src 'self'"],
    ['object-src', "object-src 'none'"],
    ['frame-ancestors', "frame-ancestors 'none'"],
    ['base-uri', "base-uri 'self'"],
    ['connect-src', "connect-src 'self'"],
    ['script-src-attr', "script-src-attr 'none'"],
    ['img-src', "img-src 'self' data:"],
  ])('sets %s', async (name, expected) => {
    expect(directive(await policy(), name)).toBe(expected);
  });

  /**
   * The whole value of the policy is here. A nonce makes the browser ignore
   * any `'unsafe-inline'` in the same directive, and without `'unsafe-eval'`
   * an injected string cannot be turned into code by `eval` or `new Function`.
   */
  it('allows scripts by nonce only — never unsafe-inline or unsafe-eval', async () => {
    const scriptSrc = directive(await policy(), 'script-src');

    expect(scriptSrc).toMatch(/'nonce-[A-Za-z0-9+/=]{16,}'/);
    expect(scriptSrc).not.toContain("'unsafe-inline'");
    expect(scriptSrc).not.toContain("'unsafe-eval'");
  });

  it('mints a different nonce per request', async () => {
    const [a, b] = await Promise.all([policy(), policy()]);
    const nonce = (csp: string): string => /'nonce-([^']+)'/.exec(csp)?.[1] ?? '';

    expect(nonce(a)).not.toBe('');
    expect(nonce(a)).not.toBe(nonce(b));
  });

  /**
   * Style attributes cannot carry a nonce — only `<style>` elements can — and
   * admin.ts has several hundred of them. This is the policy's one concession,
   * asserted so that it stays a deliberate one.
   */
  it('keeps unsafe-inline for styles, and only for styles', async () => {
    const csp = await policy();
    expect(directive(csp, 'style-src')).toBe("style-src 'self' 'unsafe-inline'");
    expect(csp.match(/'unsafe-inline'/g)).toHaveLength(1);
  });

  /**
   * Set to 'self' this would break POST /admin/integrations/:id/reconnect,
   * which answers with a redirect to the provider's OAuth authorization URL:
   * Safari enforces form-action against a form submission's redirect target.
   * Asserted so the directive is not added back as an obvious-looking win.
   */
  it('omits form-action, because the OAuth reconnect redirects off-origin', async () => {
    expect(await policy()).not.toContain('form-action');
  });

  it('names no third-party origin', async () => {
    expect(await policy()).not.toMatch(/https?:\/\//);
  });
});

describe('the pages the policy has to serve', () => {
  const ADMIN_SRC = readFileSync(join(__dirname, '../../src/routes/admin.ts'), 'utf8');
  const LAYOUT_SRC = readFileSync(join(__dirname, '../../src/views/layout.ts'), 'utf8');
  const STUDIO_SRC = readFileSync(join(__dirname, '../../src/routes/studio.ts'), 'utf8');

  /**
   * An inline `<script>` without a nonce is not a lint error and not a test
   * failure anywhere else — it simply does not execute in the browser. This is
   * the only thing standing between a new handler and a silently dead page.
   */
  it('gives every inline script a nonce', () => {
    // Comments talk about `<script>` tags without emitting one; drop them so
    // the prose does not count as a page the browser has to run.
    const withoutComments = (src: string): string => src.replace(/^\s*\/\/.*$/gm, '');

    for (const [name, src] of [['admin', ADMIN_SRC], ['layout', LAYOUT_SRC], ['studio', STUDIO_SRC]]) {
      const inline = withoutComments(src).match(/<script(?![^>]*\bsrc=)[^>]*>/g) ?? [];
      const unnonced = inline.filter((tag) => !tag.includes('nonce='));
      expect({ file: name, unnonced }).toEqual({ file: name, unnonced: [] });
    }
  });

  /**
   * The layout used to load Datastar from a jsDelivr `/gh/` path pinned to a
   * git ref rather than an immutable version: a moved tag or a compromised CDN
   * would have executed arbitrary JavaScript inside an authenticated admin
   * session. Nothing in the app ever used it.
   */
  it('loads no script from a third-party origin', () => {
    for (const src of [ADMIN_SRC, LAYOUT_SRC, STUDIO_SRC]) {
      expect(src).not.toMatch(/<script[^>]*src="https?:\/\//);
    }
  });
});

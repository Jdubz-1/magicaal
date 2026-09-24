import * as crypto from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { RequestHandler } from 'express';
import type { HelmetOptions } from 'helmet';

/**
 * A content security policy for the server-rendered admin and Studio shell.
 *
 * `apps/web` is the app that renders tenant names, agent names, provider
 * display names and operator-supplied URLs into HTML, and it is the one that
 * was running `helmet({ contentSecurityPolicy: false })` — `apps/api`, which
 * returns JSON, had the full default policy. This inverts the risk: the policy
 * belongs where the HTML is.
 *
 * The decisions below are each a trade rather than an obvious default, so
 * they are stated rather than left to be inferred from the directive list.
 *
 * **Scripts are allowed by nonce, not by `'unsafe-inline'`.** Five handlers in
 * `routes/admin.ts` emit a small inline `<script>`; one of them embeds a JSON
 * catalog, so a hash would change on every catalog edit. Each of those tags
 * carries `nonce="${res.locals.cspNonce}"`, and a fresh nonce is minted per
 * request. Adding a nonce also makes any `'unsafe-inline'` in `script-src` be
 * ignored by the browser, which is the point: an injected `<script>` has no
 * nonce and does not run.
 *
 * **`'unsafe-eval'` is deliberately absent**, so `eval` and `new Function` are
 * unavailable to page scripts. The canvas bundle was checked for both and uses
 * neither.
 *
 * **`style-src` keeps `'unsafe-inline'`.** `routes/admin.ts` carries several
 * hundred inline `style="…"` attributes, and a nonce cannot whitelist a style
 * *attribute* — only a `<style>` element. Removing them is a refactor of its
 * own. Inline styles are a far narrower capability than inline scripts, so
 * this is the concession the policy makes rather than the one it refuses.
 */

/** Mint a per-request nonce for the inline scripts the admin pages emit. */
export const cspNonce: RequestHandler = (_req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString('base64');
  next();
};

export const cspOptions: HelmetOptions['contentSecurityPolicy'] = {
  useDefaults: false,
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      // helmet types this callback against node's http primitives rather than
      // express's, so the express `locals` has to be reached explicitly.
      (_req: IncomingMessage, res: ServerResponse): string =>
        `'nonce-${(res as ServerResponse & { locals: { cspNonce: string } }).locals.cspNonce}'`,
    ],
    // No page uses an inline event handler, so the narrower capability can be
    // refused outright rather than inherited from script-src.
    scriptSrcAttr: ["'none'"],
    // See the note above: style attributes cannot carry a nonce.
    styleSrc: ["'self'", "'unsafe-inline'"],
    // The canvas bundle inlines SVG icons as data: URIs.
    imgSrc: ["'self'", 'data:'],
    fontSrc: ["'self'"],
    // XHR, fetch and the run-stream EventSource all target this origin; the
    // API is reached through the /api proxy rather than directly.
    connectSrc: ["'self'"],
    // `form-action` is deliberately omitted rather than set to 'self'.
    // POST /admin/integrations/:id/reconnect answers with a redirect to the
    // provider's OAuth authorization URL, and Safari — along with older
    // Chrome — enforces form-action against the *redirect target* of a form
    // submission, which would break reconnect silently and only in some
    // browsers. The directive has no fallback to default-src, so leaving it
    // out means unrestricted form targets; that is the cost of the OAuth hop.
    frameAncestors: ["'none'"],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    // `upgrade-insecure-requests`, which helmet's defaults include, is left
    // out: local development serves this app over plain http on localhost and
    // the directive would rewrite its own asset requests to https.
  },
};

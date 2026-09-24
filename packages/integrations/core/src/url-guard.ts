import { isIP } from 'node:net';
import { lookup } from 'node:dns/promises';

/**
 * Refusing to make requests to the infrastructure we are running on.
 *
 * A tenant registers an MCP server by URL and the engine fetches it
 * (apps/engine/src/mcp/mcp-client.ts). Without a check, `http://169.254.169.254`
 * turns that feature into a read of the cloud instance metadata service —
 * which on most providers hands back credentials. SECURITY.md names "SSRF via
 * MCP server registration" as in scope, so this is a class the project
 * actively invites reports on.
 *
 * Two layers, because neither is sufficient alone:
 *
 *  - `assertSafeUrl` is synchronous and rejects a literal internal address. It
 *    is cheap enough to run at registration time, where a 400 tells the user
 *    what is wrong while they are still looking at the form.
 *  - `assertSafeUrlResolved` additionally resolves the hostname and checks
 *    every address it returns. A registration-time check alone is bypassable:
 *    a name that resolved publicly when it was saved can resolve to 127.0.0.1
 *    by the time it is fetched. This belongs immediately before the request.
 */

export class UnsafeUrlError extends Error {
  readonly code = 'UNSAFE_URL';
  constructor(message: string) {
    super(message);
    this.name = 'UnsafeUrlError';
  }
}

export interface UrlGuardOptions {
  /**
   * Permit loopback and private ranges. Off by default. An operator running an
   * MCP server beside the engine on a private network has a legitimate need
   * for this; it should be a deliberate choice, not the default.
   *
   * Link-local (169.254.0.0/16, fe80::/10) is refused even when this is set —
   * that range is the metadata service, and no legitimate MCP server lives
   * there.
   */
  allowPrivate?: boolean;
}

function ipv4Class(ip: string): 'link-local' | 'private' | 'public' {
  const [a, b] = ip.split('.').map(Number);
  if (a === 169 && b === 254) return 'link-local';   // metadata service
  if (a === 127) return 'private';                   // loopback
  if (a === 10) return 'private';
  if (a === 172 && b >= 16 && b <= 31) return 'private';
  if (a === 192 && b === 168) return 'private';
  if (a === 0) return 'private';                     // "this host"
  if (a === 100 && b >= 64 && b <= 127) return 'private'; // CGNAT
  if (a === 192 && b === 0) return 'private';        // IETF protocol assignments
  if (a === 198 && (b === 18 || b === 19)) return 'private'; // benchmarking
  return 'public';
}

function ipv6Class(ip: string): 'link-local' | 'private' | 'public' {
  const addr = ip.toLowerCase().replace(/^\[|\]$/g, '');

  // IPv4-mapped addresses reach the same hosts as their v4 equivalents, so
  // they are classified as v4.
  //
  // Both notations have to be handled. `new URL()` rewrites the readable
  // dotted form into hex — `::ffff:169.254.169.254` comes back out of
  // `url.hostname` as `::ffff:a9fe:a9fe` — so matching only the dotted form
  // would let the metadata service through under its normalized spelling.
  const dotted = addr.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (dotted) return ipv4Class(dotted[1]);

  const hex = addr.match(/^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/);
  if (hex) {
    const high = parseInt(hex[1], 16);
    const low = parseInt(hex[2], 16);
    return ipv4Class(`${high >> 8}.${high & 0xff}.${low >> 8}.${low & 0xff}`);
  }

  if (addr === '::1') return 'private';   // loopback
  if (addr === '::') return 'private';    // unspecified
  if (/^fe[89ab]/.test(addr)) return 'link-local'; // fe80::/10
  if (/^f[cd]/.test(addr)) return 'private';       // fc00::/7 unique-local
  return 'public';
}

function classify(host: string): 'link-local' | 'private' | 'public' | 'not-an-ip' {
  const version = isIP(host.replace(/^\[|\]$/g, ''));
  if (version === 4) return ipv4Class(host);
  if (version === 6) return ipv6Class(host);
  return 'not-an-ip';
}

function check(host: string, opts: UrlGuardOptions, context: string): void {
  const kind = classify(host);
  if (kind === 'link-local') {
    throw new UnsafeUrlError(
      `${context} resolves to a link-local address (${host}). That range hosts the cloud instance metadata service and is never a valid target.`,
    );
  }
  if (kind === 'private' && !opts.allowPrivate) {
    throw new UnsafeUrlError(
      `${context} resolves to a private or loopback address (${host}). Set the allow-private option if this is a deliberate same-network deployment.`,
    );
  }
}

/**
 * Parse and check a URL without touching DNS. Throws `UnsafeUrlError`.
 *
 * Catches a literal internal address, which is the direct form of the attack.
 * A hostname is accepted here and must still be checked after resolution —
 * see `assertSafeUrlResolved`.
 */
export function assertSafeUrl(raw: string, opts: UrlGuardOptions = {}): URL {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new UnsafeUrlError(`"${raw}" is not a valid URL.`);
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new UnsafeUrlError(
      `"${url.protocol}" is not a supported scheme; only http and https are allowed.`,
    );
  }
  if (!url.hostname) {
    throw new UnsafeUrlError(`"${raw}" has no host.`);
  }

  check(url.hostname, opts, `The host "${url.hostname}"`);
  return url;
}

/**
 * As `assertSafeUrl`, then resolve the hostname and check every address it
 * returns.
 *
 * Belongs immediately before the request rather than at registration: a name
 * that resolved publicly when it was saved can resolve to 127.0.0.1 by the
 * time it is fetched, and only the caller is in a position to notice.
 */
export async function assertSafeUrlResolved(
  raw: string,
  opts: UrlGuardOptions = {},
): Promise<URL> {
  const url = assertSafeUrl(raw, opts);

  // A literal address needed no lookup and was already checked.
  if (classify(url.hostname) !== 'not-an-ip') return url;

  let addresses: Array<{ address: string }>;
  try {
    addresses = await lookup(url.hostname, { all: true });
  } catch {
    // A name that does not resolve cannot reach anything. Let the request
    // itself fail with its own error rather than reporting this as unsafe,
    // which would be misleading.
    return url;
  }

  for (const { address } of addresses) {
    check(address, opts, `The host "${url.hostname}"`);
  }
  return url;
}

/** Non-throwing form, for callers that only need a boolean. */
export function isSafeUrl(raw: string, opts: UrlGuardOptions = {}): boolean {
  try {
    assertSafeUrl(raw, opts);
    return true;
  } catch {
    return false;
  }
}

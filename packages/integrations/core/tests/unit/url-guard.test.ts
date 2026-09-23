// Real DNS by default — the loopback case below needs it — with `lookup`
// replaceable for the one test that must simulate a name going nowhere.
// spyOn cannot reach it: url-guard binds `lookup` at import time, so the
// module has to be intercepted before that happens.
jest.mock('node:dns/promises', () => {
  const actual = jest.requireActual('node:dns/promises') as typeof import('node:dns/promises');
  return { ...actual, lookup: jest.fn(actual.lookup) };
});

import { lookup } from 'node:dns/promises';
import { assertSafeUrl, assertSafeUrlResolved, isSafeUrl, UnsafeUrlError } from '../../src/url-guard';

/**
 * A tenant registers an MCP server by URL and the engine fetches it. Without
 * these checks, `http://169.254.169.254` turns that feature into a read of the
 * cloud instance metadata service, which on most providers returns
 * credentials. SECURITY.md names SSRF via MCP server registration as in scope.
 */

describe('assertSafeUrl', () => {
  describe('refuses internal addresses', () => {
    it.each([
      ['http://169.254.169.254/latest/meta-data/', 'the AWS/GCP/Azure metadata service'],
      ['http://169.254.169.254', 'metadata, bare'],
      ['http://[fe80::1]/', 'IPv6 link-local'],
    ])('%s — %s', (url) => {
      expect(() => assertSafeUrl(url)).toThrow(UnsafeUrlError);
      expect(() => assertSafeUrl(url)).toThrow(/link-local/);
    });

    it.each([
      ['http://127.0.0.1:8080/mcp', 'IPv4 loopback'],
      ['http://10.0.0.5/mcp', 'RFC1918 10/8'],
      ['http://172.16.0.1/mcp', 'RFC1918 172.16/12'],
      ['http://192.168.1.1/mcp', 'RFC1918 192.168/16'],
      ['http://0.0.0.0/', 'unspecified'],
      ['http://[::1]:9000/', 'IPv6 loopback'],
      ['http://[fd00::1]/', 'IPv6 unique-local'],
      ['http://[::ffff:127.0.0.1]/', 'IPv4-mapped loopback'],
    ])('%s — %s', (url) => {
      expect(() => assertSafeUrl(url)).toThrow(UnsafeUrlError);
    });

    /**
     * ::ffff:169.254.169.254 reaches the same host as the bare v4 form, so the
     * mapped notation must not be a way around the check.
     */
    it('classifies an IPv4-mapped metadata address as link-local, not merely private', () => {
      expect(() => assertSafeUrl('http://[::ffff:169.254.169.254]/')).toThrow(/link-local/);
    });

    /**
     * `new URL()` rewrites the readable dotted form into hex, so
     * `::ffff:169.254.169.254` arrives at the guard as `::ffff:a9fe:a9fe`.
     * Matching only the dotted spelling would have let the metadata service
     * through under its normalized name.
     */
    it('catches the hex spelling the URL parser normalizes to', () => {
      expect(new URL('http://[::ffff:169.254.169.254]/').hostname).toBe('[::ffff:a9fe:a9fe]');
      expect(() => assertSafeUrl('http://[::ffff:a9fe:a9fe]/')).toThrow(/link-local/);
      expect(() => assertSafeUrl('http://[::ffff:7f00:1]/')).toThrow(UnsafeUrlError);
    });
  });

  describe('refuses non-HTTP schemes', () => {
    it.each(['file:///etc/passwd', 'gopher://x/', 'ftp://example.com/'])('%s', (url) => {
      expect(() => assertSafeUrl(url)).toThrow(/not a supported scheme/);
    });
  });

  it('refuses something that is not a URL at all', () => {
    expect(() => assertSafeUrl('not a url')).toThrow(/not a valid URL/);
    expect(() => assertSafeUrl('')).toThrow(UnsafeUrlError);
  });

  describe('allows legitimate targets', () => {
    it.each([
      'https://mcp.example.com/sse',
      'http://example.com:3000/mcp',
      'https://8.8.8.8/mcp',
      'https://[2606:4700:4700::1111]/mcp',
    ])('%s', (url) => {
      expect(() => assertSafeUrl(url)).not.toThrow();
      expect(isSafeUrl(url)).toBe(true);
    });

    it('returns the parsed URL so the caller need not parse twice', () => {
      expect(assertSafeUrl('https://mcp.example.com/sse').hostname).toBe('mcp.example.com');
    });
  });

  describe('allowPrivate', () => {
    it('permits loopback and RFC1918 when the operator opts in', () => {
      for (const url of ['http://127.0.0.1:8080/', 'http://10.0.0.5/', 'http://[::1]/']) {
        expect(() => assertSafeUrl(url, { allowPrivate: true })).not.toThrow();
      }
    });

    /**
     * The opt-in exists for a same-network deployment. No legitimate MCP
     * server lives on the metadata range, so it stays refused regardless.
     */
    it('still refuses link-local', () => {
      expect(() => assertSafeUrl('http://169.254.169.254/', { allowPrivate: true })).toThrow(
        /link-local/,
      );
      expect(() => assertSafeUrl('http://[fe80::1]/', { allowPrivate: true })).toThrow(/link-local/);
    });
  });
});

describe('assertSafeUrlResolved', () => {
  it('rejects a hostname that resolves to loopback', async () => {
    // A registration-time check passes `localhost` only if it is spelled as an
    // address; by name it must fail after resolution.
    await expect(assertSafeUrlResolved('http://localhost:8080/mcp')).rejects.toThrow(UnsafeUrlError);
  });

  it('accepts a literal public address without a lookup', async () => {
    await expect(assertSafeUrlResolved('https://8.8.8.8/mcp')).resolves.toBeInstanceOf(URL);
  });

  /**
   * A name that does not resolve cannot reach anything, so reporting it as
   * unsafe would be misleading — let the request fail with its own error.
   *
   * DNS is mocked rather than using a `.invalid` host: many ISPs hijack
   * NXDOMAIN and answer with a private address, which would make this assert
   * the opposite of what it means to on those networks.
   */
  it('does not call a non-resolving host unsafe', async () => {
    (lookup as unknown as jest.Mock).mockRejectedValueOnce(
      Object.assign(new Error('getaddrinfo ENOTFOUND'), { code: 'ENOTFOUND' }),
    );

    await expect(assertSafeUrlResolved('https://nope.example/mcp')).resolves.toBeInstanceOf(URL);
  });
});

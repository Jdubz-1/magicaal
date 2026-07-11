export interface Page<T, TCursor> {
  items: T[];
  /** Cursor for the next page; undefined/null ends iteration. */
  nextCursor?: TCursor | null;
}

export interface PaginateOptions {
  /** Hard cap on pages fetched — guards against non-terminating cursors. Default 100. */
  maxPages?: number;
  /** Hard cap on items yielded. Default unlimited. */
  maxItems?: number;
}

/**
 * Generic cursor pagination driver. The caller supplies a page fetcher; the
 * generator yields items across pages until the fetcher returns no cursor,
 * a cap is hit, or a page comes back empty with the same cursor.
 *
 * Works for cursor-, offset-, and URL-based (Link header) pagination — the
 * cursor type is opaque to this function.
 */
export async function* paginate<T, TCursor = string>(
  fetchPage: (cursor: TCursor | undefined) => Promise<Page<T, TCursor>>,
  opts: PaginateOptions = {},
): AsyncGenerator<T, void, undefined> {
  const maxPages = opts.maxPages ?? 100;
  let cursor: TCursor | undefined = undefined;
  let yielded = 0;

  for (let page = 0; page < maxPages; page++) {
    const result = await fetchPage(cursor);

    for (const item of result.items) {
      yield item;
      yielded++;
      if (opts.maxItems !== undefined && yielded >= opts.maxItems) return;
    }

    if (result.nextCursor === undefined || result.nextCursor === null) return;
    if (result.nextCursor === cursor) return; // cursor did not advance — avoid a loop
    cursor = result.nextCursor;
  }
}

/** Collects a paginated sequence into an array (respecting the same caps). */
export async function collectAll<T, TCursor = string>(
  fetchPage: (cursor: TCursor | undefined) => Promise<Page<T, TCursor>>,
  opts: PaginateOptions = {},
): Promise<T[]> {
  const out: T[] = [];
  for await (const item of paginate(fetchPage, opts)) out.push(item);
  return out;
}

/**
 * Parses an RFC 5988 `Link` header (GitHub-style pagination) into a
 * rel → URL map, e.g. { next: "https://...", last: "https://..." }.
 */
export function parseLinkHeader(header: string | null): Record<string, string> {
  const rels: Record<string, string> = {};
  if (!header) return rels;

  for (const part of header.split(',')) {
    const match = part.match(/<([^>]+)>\s*;\s*rel="?([^";]+)"?/);
    if (match) rels[match[2]] = match[1];
  }
  return rels;
}

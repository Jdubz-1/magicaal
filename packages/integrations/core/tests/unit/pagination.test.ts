import { paginate, collectAll, parseLinkHeader, type Page } from '../../src/pagination';

function pages<T>(...batches: Array<T[]>): (cursor: string | undefined) => Promise<Page<T, string>> {
  return async (cursor) => {
    const idx = cursor === undefined ? 0 : parseInt(cursor, 10);
    const items = batches[idx] ?? [];
    const next = idx + 1 < batches.length ? String(idx + 1) : null;
    return { items, nextCursor: next };
  };
}

describe('paginate', () => {
  it('yields items across pages until the cursor ends', async () => {
    const out = await collectAll(pages([1, 2], [3, 4], [5]));
    expect(out).toEqual([1, 2, 3, 4, 5]);
  });

  it('respects maxItems', async () => {
    const out = await collectAll(pages([1, 2], [3, 4], [5]), { maxItems: 3 });
    expect(out).toEqual([1, 2, 3]);
  });

  it('respects maxPages', async () => {
    const out = await collectAll(pages([1], [2], [3]), { maxPages: 2 });
    expect(out).toEqual([1, 2]);
  });

  it('stops when the cursor does not advance', async () => {
    let calls = 0;
    const fetchPage = async (): Promise<Page<number, string>> => {
      calls++;
      return { items: [calls], nextCursor: 'stuck' };
    };
    const out = await collectAll(fetchPage, { maxPages: 50 });
    expect(out).toEqual([1, 2]); // first page (undefined cursor) + one 'stuck' page
    expect(calls).toBe(2);
  });

  it('is lazily evaluated', async () => {
    let calls = 0;
    const fetchPage = async (cursor: string | undefined): Promise<Page<number, string>> => {
      calls++;
      return pages([1, 2], [3, 4])(cursor);
    };
    const gen = paginate(fetchPage);
    await gen.next();
    expect(calls).toBe(1); // second page not fetched until needed
  });
});

describe('parseLinkHeader', () => {
  it('parses a GitHub-style Link header', () => {
    const header =
      '<https://api.github.com/repos?page=2>; rel="next", <https://api.github.com/repos?page=10>; rel="last"';
    expect(parseLinkHeader(header)).toEqual({
      next: 'https://api.github.com/repos?page=2',
      last: 'https://api.github.com/repos?page=10',
    });
  });

  it('returns an empty map for null', () => {
    expect(parseLinkHeader(null)).toEqual({});
  });
});

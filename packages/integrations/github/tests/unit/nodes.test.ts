import { githubCreateIssue } from '../../src/nodes/github-create-issue';
import { githubAddComment } from '../../src/nodes/github-add-comment';
import { githubListIssues } from '../../src/nodes/github-list-issues';
import { makeMockContext } from '../helpers/mock-context';

const CREDS = {
  'conn-gh': { type: 'apikey' as const, apiKey: 'ghp_token' },
};

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('integration:github:create-issue', () => {
  it('creates an issue and writes {number, url, id}', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(
        JSON.stringify({ number: 42, html_url: 'https://github.com/a/b/issues/42', id: 9 }),
        { status: 201 },
      ),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await githubCreateIssue.execute(ctx, {
      connectionId: 'conn-gh',
      repo: 'acme/api',
      title: 'Something broke',
      body: 'Details',
      labels: ['bug'],
      outputKey: 'issue',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('issue')).toEqual({
      number: 42,
      url: 'https://github.com/a/b/issues/42',
      id: 9,
    });

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe('https://api.github.com/repos/acme/api/issues');
    expect(init.headers.Authorization).toBe('Bearer ghp_token');
    expect(JSON.parse(init.body)).toEqual({
      title: 'Something broke',
      body: 'Details',
      labels: ['bug'],
    });
  });

  it('fails with the GitHub message on error responses', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 }),
    ) as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await githubCreateIssue.execute(ctx, {
      connectionId: 'conn-gh',
      repo: 'acme/missing',
      title: 'x',
      outputKey: 'issue',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.message).toContain('Not Found');
  });
});

describe('integration:github:add-comment', () => {
  it('posts a comment to the issue', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(
        JSON.stringify({ id: 7, html_url: 'https://github.com/a/b/issues/1#issuecomment-7' }),
        { status: 201 },
      ),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await githubAddComment.execute(ctx, {
      connectionId: 'conn-gh',
      repo: 'acme/api',
      issueNumber: '1',
      body: 'looks good',
      outputKey: 'comment',
    });

    expect(result.status).toBe('complete');
    expect(mockFetch.mock.calls[0][0]).toBe(
      'https://api.github.com/repos/acme/api/issues/1/comments',
    );
  });
});

describe('integration:github:list-issues', () => {
  it('paginates via Link headers and filters out pull requests', async () => {
    const page1 = new Response(
      JSON.stringify([
        { number: 1, title: 'A', state: 'open', html_url: 'u1', user: { login: 'kim' }, labels: [] },
        { number: 2, title: 'PR', state: 'open', html_url: 'u2', pull_request: {}, labels: [] },
      ]),
      {
        status: 200,
        headers: {
          link: '<https://api.github.com/repos/acme/api/issues?page=2>; rel="next"',
        },
      },
    );
    const page2 = new Response(
      JSON.stringify([
        { number: 3, title: 'B', state: 'open', html_url: 'u3', user: { login: 'lee' }, labels: [{ name: 'bug' }] },
      ]),
      { status: 200 },
    );
    const mockFetch = jest.fn().mockResolvedValueOnce(page1).mockResolvedValueOnce(page2);
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await githubListIssues.execute(ctx, {
      connectionId: 'conn-gh',
      repo: 'acme/api',
      outputKey: 'issues',
    });

    expect(result.status).toBe('complete');
    const issues = ctx.get<Array<{ number: number }>>('issues')!;
    expect(issues.map((i) => i.number)).toEqual([1, 3]);

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch.mock.calls[1][0]).toBe(
      'https://api.github.com/repos/acme/api/issues?page=2',
    );
  });
});

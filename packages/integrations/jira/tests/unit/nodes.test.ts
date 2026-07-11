import { jiraCreateIssue } from '../../src/nodes/jira-create-issue';
import { jiraAddComment } from '../../src/nodes/jira-add-comment';
import { makeMockContext } from '../helpers/mock-context';

const CREDS = {
  'conn-jira': {
    type: 'apikey' as const,
    extra: {
      base_url: 'https://acme.atlassian.net',
      email: 'dev@acme.com',
      api_token: 'jira-token',
    },
  },
};

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

describe('integration:jira:create-issue', () => {
  it('creates an issue with Basic auth and ADF description', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: '10001', key: 'ENG-42' }), { status: 201 }),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await jiraCreateIssue.execute(ctx, {
      connectionId: 'conn-jira',
      projectKey: 'ENG',
      summary: 'Fix the flux capacitor',
      description: 'It stopped fluxing.',
      outputKey: 'issue',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('issue')).toEqual({
      key: 'ENG-42',
      id: '10001',
      url: 'https://acme.atlassian.net/browse/ENG-42',
    });

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe('https://acme.atlassian.net/rest/api/3/issue');
    const expectedBasic = Buffer.from('dev@acme.com:jira-token').toString('base64');
    expect(init.headers.Authorization).toBe(`Basic ${expectedBasic}`);

    const body = JSON.parse(init.body);
    expect(body.fields.project.key).toBe('ENG');
    expect(body.fields.issuetype.name).toBe('Task');
    expect(body.fields.description.type).toBe('doc'); // ADF wrapper
  });

  it('fails without calling Jira when connection fields are missing', async () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext(
      {},
      { 'conn-jira': { type: 'apikey' as const, extra: { base_url: 'https://x.atlassian.net' } } },
    );
    const result = await jiraCreateIssue.execute(ctx, {
      connectionId: 'conn-jira',
      projectKey: 'ENG',
      summary: 'x',
      outputKey: 'issue',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('CONNECTION_MISSING_FIELDS');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('surfaces Jira error messages', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ errors: [{ project: 'project is required' }] }), {
        status: 400,
      }),
    ) as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await jiraCreateIssue.execute(ctx, {
      connectionId: 'conn-jira',
      projectKey: 'NOPE',
      summary: 'x',
      outputKey: 'issue',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.message).toContain('project is required');
  });
});

describe('integration:jira:add-comment', () => {
  it('posts an ADF comment to the issue', async () => {
    const mockFetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: '20001' }), { status: 201 }),
    );
    global.fetch = mockFetch as typeof fetch;

    const ctx = makeMockContext({}, CREDS);
    const result = await jiraAddComment.execute(ctx, {
      connectionId: 'conn-jira',
      issueKey: 'ENG-42',
      body: 'On it.',
      outputKey: 'comment',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('comment')).toEqual({ id: '20001' });
    expect(mockFetch.mock.calls[0][0]).toBe(
      'https://acme.atlassian.net/rest/api/3/issue/ENG-42/comment',
    );
  });
});

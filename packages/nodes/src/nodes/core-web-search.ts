import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';

interface WebSearchConfig {
  queryKey: string;
  connectionId: string;
  maxResults?: number;
  outputKey: string;
}

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  position: number;
}

async function callBraveSearch(
  query: string,
  apiKey: string,
  maxResults: number,
): Promise<SearchResult[]> {
  const url = new URL('https://api.search.brave.com/res/v1/web/search');
  url.searchParams.set('q', query);
  url.searchParams.set('count', String(Math.min(maxResults, 20)));

  const response = await fetch(url.toString(), {
    headers: { 'X-Subscription-Token': apiKey, Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Brave Search API returned ${response.status}`);
  }

  const data = (await response.json()) as {
    web?: { results?: { title: string; url: string; description: string }[] };
  };
  return (data.web?.results ?? []).map((r, i) => ({
    title: r.title,
    url: r.url,
    snippet: r.description,
    position: i + 1,
  }));
}

async function callTavilySearch(
  query: string,
  apiKey: string,
  maxResults: number,
): Promise<SearchResult[]> {
  const response = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: apiKey, query, max_results: maxResults }),
  });

  if (!response.ok) {
    throw new Error(`Tavily API returned ${response.status}`);
  }

  const data = (await response.json()) as {
    results?: { title: string; url: string; content: string }[];
  };
  return (data.results ?? []).map((r, i) => ({
    title: r.title,
    url: r.url,
    snippet: r.content,
    position: i + 1,
  }));
}

export const coreWebSearch: NodeModule<WebSearchConfig> = {
  type: 'core:web-search',
  meta: {
    name: 'Web Search',
    description:
      'Searches the web using a configured Integration Connection (Brave Search or Tavily). Reads the query from queryKey and writes an array of {title, url, snippet, position} results to outputKey.',
    category: 'integration',
    icon: 'search',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['queryKey', 'connectionId', 'outputKey'],
      properties: {
        queryKey: {
          type: 'string',
          description: 'Context key holding the search query string',
        },
        connectionId: {
          type: 'string',
          description: 'Integration Connection ID (Brave Search or Tavily API key)',
        },
        maxResults: {
          type: 'number',
          description: 'Maximum number of results to return (default: 5)',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write the results array to',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _search_result_count: { type: 'number' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: WebSearchConfig) {
    const query = ctx.get<string>(config.queryKey);
    if (typeof query !== 'string' || !query.trim()) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'SEARCH_INVALID_QUERY',
          message: `Context key "${config.queryKey}" is not a non-empty string`,
          retryable: false,
        },
      };
    }

    const creds = ctx.credentials[config.connectionId];
    if (!creds) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'SEARCH_NO_CONNECTION',
          message: `Integration Connection "${config.connectionId}" not found or credentials not resolved`,
          retryable: false,
        },
      };
    }

    const apiKey = creds.apiKey ?? creds.accessToken ?? '';
    if (!apiKey) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'SEARCH_NO_CONNECTION',
          message: 'Connection has no API key or access token',
          retryable: false,
        },
      };
    }

    const maxResults = config.maxResults ?? 5;
    const provider = (creds.extra as Record<string, string> | undefined)?.provider ?? 'brave';

    try {
      let results: SearchResult[];
      if (provider === 'tavily') {
        results = await callTavilySearch(query, apiKey, maxResults);
      } else {
        results = await callBraveSearch(query, apiKey, maxResults);
      }

      ctx.set(config.outputKey, results);
      ctx.set('_search_result_count', results.length);

      return {
        status: 'complete' as const,
        outputs: {
          [config.outputKey]: results,
          _search_result_count: results.length,
        },
      };
    } catch (err) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'SEARCH_API_ERROR',
          message: err instanceof Error ? err.message : 'Search API call failed',
          retryable: true,
        },
      };
    }
  },
};

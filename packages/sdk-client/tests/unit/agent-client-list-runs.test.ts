import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { createHttpClient } from '../../src/http';
import { AgentClient } from '../../src/agent-client';
import type { RunListPage } from '../../src/types';

function capturingAdapter(response: RunListPage): { adapter: AxiosAdapter; url: () => string } {
  let capturedUrl = '';
  const adapter: AxiosAdapter = async (config: InternalAxiosRequestConfig) => {
    capturedUrl = `${config.baseURL ?? ''}${config.url ?? ''}`;
    const res: AxiosResponse = { status: 200, statusText: '', data: response, headers: {}, config };
    return res;
  };
  return { adapter, url: () => capturedUrl };
}

describe('AgentClient.listRuns (ALIGN-021)', () => {
  const page: RunListPage = {
    runs: [{
      id: 'run-1',
      agentId: 'agent-1',
      triggerType: 'api',
      status: 'completed',
      startedAt: 0,
      tokenUsage: { promptTokens: 0, completionTokens: 0, estimatedCostUsd: 0 },
    }],
    limit: 50,
    offset: 0,
    hasMore: false,
  };

  it('builds the query string from status/limit/offset and returns the page', async () => {
    const { adapter, url } = capturingAdapter(page);
    const http = createHttpClient({ baseUrl: 'http://api.test' }, { adapter });
    const client = new AgentClient('agent-1', http);

    const result = await client.listRuns({ status: 'completed', limit: 10, offset: 20 });

    expect(url()).toBe('http://api.test/v1/agents/agent-1/runs?status=completed&limit=10&offset=20');
    expect(result).toEqual(page);
  });

  it('omits unset params', async () => {
    const { adapter, url } = capturingAdapter(page);
    const http = createHttpClient({ baseUrl: 'http://api.test' }, { adapter });
    const client = new AgentClient('agent-1', http);

    await client.listRuns();

    expect(url()).toBe('http://api.test/v1/agents/agent-1/runs?');
  });
});

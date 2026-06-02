import type { RunStreamEvent } from './types';

export async function* streamRun(
  url: string,
  headers: Record<string, string>,
  signal?: AbortSignal,
): AsyncGenerator<RunStreamEvent, void, unknown> {
  const response = await fetch(url, {
    headers: { ...headers, Accept: 'text/event-stream' },
    signal,
  });

  if (!response.ok) {
    throw new Error(`SSE connect failed: ${response.status}`);
  }
  if (!response.body) {
    throw new Error('No response body for SSE stream');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let currentEvent = 'message';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (line.startsWith('event: ')) {
          currentEvent = line.slice(7).trim();
        } else if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6)) as Record<string, unknown>;
            yield { type: currentEvent, ...data } as RunStreamEvent;
          } catch {
            // skip malformed SSE data line
          }
          currentEvent = 'message';
        }
        // empty line: SSE event boundary — currentEvent reset above after data line
      }
    }
  } finally {
    reader.releaseLock();
  }
}

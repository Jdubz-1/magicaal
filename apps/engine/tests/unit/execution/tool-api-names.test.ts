jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

import type { AssembledTool } from '@magicaal/core';
import { toApiToolName, mapToolsByApiName } from '@/execution/tool-executor';

function tool(name: string): AssembledTool {
  return { name, description: 'd', inputSchema: { type: 'object' }, source: 'native', nodeId: name };
}

describe('toApiToolName', () => {
  it('replaces characters providers reject', () => {
    // Anthropic requires ^[a-zA-Z0-9_-]{1,128}$ — a dotted id like
    // caal.graph.read failed the whole request with a bare 400.
    expect(toApiToolName('caal.graph.read')).toBe('caal_graph_read');
    expect(toApiToolName('acme:pkg:do thing')).toBe('acme_pkg_do_thing');
  });

  it('leaves an already-valid name untouched', () => {
    expect(toApiToolName('get_weather-2')).toBe('get_weather-2');
  });

  it('truncates to the 128-character limit', () => {
    const long = `caal.${'x'.repeat(200)}`;
    const result = toApiToolName(long);
    expect(result).toHaveLength(128);
    expect(result).toMatch(/^[a-zA-Z0-9_-]{1,128}$/);
  });

  it('never returns an empty name', () => {
    expect(toApiToolName('...')).toBe('___');
    expect(toApiToolName('')).toBe('tool');
  });
});

describe('mapToolsByApiName', () => {
  it('keys tools by their sanitized name so a returned call resolves', () => {
    const read = tool('caal.graph.read');
    const map = mapToolsByApiName([read, tool('caal.platform.listAgents')]);

    expect([...map.keys()]).toEqual(['caal_graph_read', 'caal_platform_listAgents']);
    // The dispatch path looks the returned name up here.
    expect(map.get('caal_graph_read')).toBe(read);
  });

  it('suffixes a collision rather than dropping a tool', () => {
    const dotted = tool('a.b');
    const underscored = tool('a_b');

    const map = mapToolsByApiName([dotted, underscored]);

    expect(map.size).toBe(2);
    expect(map.get('a_b')).toBe(dotted);
    expect(map.get('a_b_2')).toBe(underscored);
  });

  it('keeps suffixed names within the length limit', () => {
    const base = 'x'.repeat(128);
    const map = mapToolsByApiName([tool(base), tool(base)]);

    for (const name of map.keys()) {
      expect(name.length).toBeLessThanOrEqual(128);
      expect(name).toMatch(/^[a-zA-Z0-9_-]{1,128}$/);
    }
    expect(map.size).toBe(2);
  });
});

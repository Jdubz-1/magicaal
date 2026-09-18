import { ALL_CAAL_TOOLS } from '@magicaal/integration-caal';

/**
 * Caal's tools are handed to the provider as tool definitions, and a provider
 * rejects the whole request when one of them declares no type — six of these
 * shipped as a bare `{}`, which failed every suggest/modify run with a 400.
 */
describe('Caal tool schemas', () => {
  it.each(ALL_CAAL_TOOLS.map((t) => [t.type, t] as const))(
    '%s declares an object input schema',
    (_type, tool) => {
      const schema = tool.schema.config as { type?: string; properties?: unknown };

      expect(schema).toBeDefined();
      expect(schema.type).toBe('object');
      expect(schema.properties).toBeDefined();
    },
  );

  it('registers at least the tools the Caal graph wires up', () => {
    const types = ALL_CAAL_TOOLS.map((t) => t.type);
    for (const wired of [
      'caal.graph.read',
      'caal.graph.summarize',
      'caal.platform.listNodeTypes',
      'caal.proposal.create',
    ]) {
      expect(types).toContain(wired);
    }
  });
});

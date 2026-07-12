import type { AgentDescriptor } from '../../src/types.js';

// Compile-time contract for generated descriptors: client.agent(descriptor)
// must reject incorrect inputs at build time. These assignments are the
// compile gate — ts-jest fails the suite if an @ts-expect-error is unmet.

interface DemoInput {
  query: string;
  limit?: number;
}
interface DemoOutput {
  answer: string;
}

const descriptor: AgentDescriptor<DemoInput, DemoOutput> = {
  agentId: 'agent-1',
  handle: 'demo',
  schemaHash: 'abc',
  inputSchema: { type: 'object' },
  outputSchema: { type: 'object' },
};

type InferredIn = NonNullable<typeof descriptor.__in>;
type InferredOut = NonNullable<typeof descriptor.__out>;

describe('AgentDescriptor typing', () => {
  it('carries input/output types through the phantom parameters', () => {
    const goodInput: InferredIn = { query: 'hello', limit: 3 };

    // @ts-expect-error — missing required field `query`
    const badInput: InferredIn = { limit: 3 };

    // @ts-expect-error — wrong type for `query`
    const wrongType: InferredIn = { query: 42 };

    const goodOutput: InferredOut = { answer: 'hi' };

    // @ts-expect-error — `answer` must be a string
    const badOutput: InferredOut = { answer: 7 };

    // Runtime no-op assertions so the compile-time fixtures are "used"
    expect(goodInput.query).toBe('hello');
    expect(badInput).toBeDefined();
    expect(wrongType).toBeDefined();
    expect(goodOutput.answer).toBe('hi');
    expect(badOutput).toBeDefined();
  });
});

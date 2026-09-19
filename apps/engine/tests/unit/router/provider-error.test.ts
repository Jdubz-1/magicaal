import { providerError } from '@/router/adapters/provider-error';

describe('providerError', () => {
  it('carries the provider body so the reason is visible', async () => {
    // "Anthropic error 400" alone hid an invalid tool name for three rounds of
    // debugging; the body is where the rejected field is named.
    const response = new Response(
      JSON.stringify({ error: { type: 'invalid_request_error', message: 'tools.0.name: invalid' } }),
      { status: 400 },
    );

    const err = await providerError('Anthropic', response);

    expect(err.message).toContain('Anthropic error 400');
    expect(err.message).toContain('tools.0.name: invalid');
    expect(err.status).toBe(400);
    expect(err._providerError).toBe(true);
  });

  it('truncates a long body', async () => {
    const err = await providerError('OpenAI', new Response('x'.repeat(5000), { status: 500 }));

    expect(err.message.length).toBeLessThan(600);
    expect(err.status).toBe(500);
  });

  it('still reports the status when the body cannot be read', async () => {
    const unreadable = {
      status: 503,
      text: () => Promise.reject(new Error('stream already consumed')),
    } as unknown as Response;

    const err = await providerError('Google', unreadable);

    expect(err.message).toBe('Google error 503');
    expect(err._providerError).toBe(true);
  });
});

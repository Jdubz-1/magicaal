/** Provider error bodies can be long; enough to name the offending field. */
const MAX_BODY_CHARS = 500;

/**
 * A failed provider response as an Error carrying its body.
 *
 * The status alone ("Anthropic error 400") says nothing about *why* — the body
 * is where a provider names the rejected field, and dropping it turned a
 * one-line schema mistake into a multi-round debugging session. `status` and
 * `_providerError` are preserved because translateError and the circuit
 * breaker branch on them.
 */
export async function providerError(
  provider: string,
  response: Response,
): Promise<Error & { status: number; _providerError: true }> {
  let detail = '';
  try {
    detail = (await response.text()).slice(0, MAX_BODY_CHARS).trim();
  } catch {
    // Body already consumed or unreadable — the status still travels.
  }

  return Object.assign(
    new Error(`${provider} error ${response.status}${detail ? `: ${detail}` : ''}`),
    { status: response.status, _providerError: true as const },
  );
}

import type { CredentialValidationResult } from '@magicaal/sdk-node';

const VALIDATION_TIMEOUT_MS = 5000;

/**
 * Probe a provider's token-free list-models endpoint to check an API key.
 * 401/403 means the key was rejected; network failures and timeouts mean the
 * provider couldn't be reached, which callers may choose to tolerate.
 * The key travels only in `headers` and never appears in the result.
 */
export async function probeProviderKey(
  url: string,
  headers: Record<string, string>,
): Promise<CredentialValidationResult> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: 'GET',
      headers,
      signal: AbortSignal.timeout(VALIDATION_TIMEOUT_MS),
    });
  } catch {
    return { ok: false, reason: 'unreachable', message: 'Provider could not be reached' };
  }

  if (response.ok) return { ok: true };
  if (response.status === 401 || response.status === 403) {
    return { ok: false, reason: 'invalid_key', message: 'API key was rejected by the provider' };
  }

  // Gemini answers a bad key with 400 INVALID_ARGUMENT / API_KEY_INVALID and
  // reserves 403 for a valid key lacking permission — without this a typo'd
  // key was reported as "provider unreachable" and offered a save-anyway.
  // Only a 400 that names the key counts; other 400s stay unknown.
  if (response.status === 400) {
    let body = '';
    try {
      body = (await response.text()).toLowerCase();
    } catch {
      // Unreadable body — fall through to unknown.
    }
    if (body.includes('api_key') || body.includes('api key')) {
      return { ok: false, reason: 'invalid_key', message: 'API key was rejected by the provider' };
    }
  }

  return { ok: false, reason: 'unknown', message: `Provider responded with status ${response.status}` };
}

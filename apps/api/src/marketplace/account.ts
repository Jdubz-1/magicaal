import { db } from '../db/client';
import { marketplaceAccount } from '../db/schema';
import { decryptCredentials } from '../lib/credentials';

/**
 * The linked MagiCaal Account key, or undefined when no account is linked.
 *
 * The key is stored encrypted by POST /v1/marketplace/account and is required
 * to authenticate the Marketplace background jobs. The API owns it — that is
 * why the license heartbeat and usage reporter live here rather than in the
 * engine, which has no access to it.
 */
export async function marketplaceAccountKey(): Promise<string | undefined> {
  const rows = await db.select().from(marketplaceAccount);
  const row = rows[0];
  if (!row) return undefined;
  return decryptCredentials(row.apiKeyEnc);
}

/** Authorization header for Marketplace calls, or undefined when unlinked. */
export async function marketplaceAuthHeaders(): Promise<Record<string, string> | undefined> {
  const key = await marketplaceAccountKey();
  if (!key) return undefined;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${key}`,
  };
}

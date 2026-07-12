import { eq } from 'drizzle-orm';
import { db } from './client';
import { integrationTriggers } from './schema';
import { encryptCredentials, decryptCredentials } from '../lib/credentials';
import { config } from '../config';
import { logger } from '../lib/logger';

/**
 * Encrypt integration trigger signing secrets that were stored in plaintext
 * before they were treated as credentials.
 *
 * This is a data migration, not a schema one — the column type is unchanged
 * and encryption needs the master key, which SQL has no access to. Runs at
 * boot, after migrations; already-encrypted rows are left alone, so it is
 * idempotent and safe to run on every start.
 */
export async function backfillTriggerSecrets(): Promise<void> {
  if (!config.masterKey) return;

  const rows = await db
    .select({ id: integrationTriggers.id, secret: integrationTriggers.secret })
    .from(integrationTriggers);

  let encrypted = 0;
  for (const row of rows) {
    try {
      // Already ciphertext — decrypts cleanly under the master key
      decryptCredentials(row.secret);
      continue;
    } catch {
      // Not decryptable: a legacy plaintext secret
    }

    await db
      .update(integrationTriggers)
      .set({ secret: encryptCredentials(row.secret) })
      .where(eq(integrationTriggers.id, row.id));
    encrypted++;
  }

  if (encrypted > 0) {
    logger.info({ count: encrypted }, 'Encrypted legacy plaintext trigger secrets');
  }
}

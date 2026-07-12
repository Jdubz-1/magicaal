import * as crypto from 'node:crypto';
import { config } from '../config';

/**
 * AES-256-GCM encryption of credential material at rest (integration
 * connections, OAuth client secrets, the Marketplace account key).
 *
 * Wire format: [12B IV][16B authTag][ciphertext], base64. The engine's
 * credential resolver decrypts the same layout — keep them in step.
 */

function deriveKey(masterKey: string): Buffer {
  return crypto.createHash('sha256').update(masterKey).digest();
}

function requireMasterKey(): string {
  if (!config.masterKey) {
    throw new Error('MAGICAAL_MASTER_KEY is required for Integration Connections');
  }
  return config.masterKey;
}

export function encryptCredentials(plaintext: string): string {
  const key = deriveKey(requireMasterKey());
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, encrypted]).toString('base64');
}

export function decryptCredentials(encryptedBase64: string): string {
  const buf = Buffer.from(encryptedBase64, 'base64');
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    deriveKey(requireMasterKey()),
    buf.subarray(0, 12),
  );
  decipher.setAuthTag(buf.subarray(12, 28));
  return Buffer.concat([decipher.update(buf.subarray(28)), decipher.final()]).toString('utf8');
}

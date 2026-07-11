/**
 * MagiCaal Labs countersignature public key (Ed25519, base64 raw 32 bytes).
 *
 * The production key is pinned at build time before the hosted Marketplace
 * goes live (Stage 5). Until then it is injected via MAGICAAL_SIGNING_PUBLIC_KEY
 * — required for internal staging and for air-gapped bundles produced by the
 * bundle tooling, which signs with the corresponding staging private key.
 */
export const PINNED_MAGICAAL_PUBLIC_KEY = '';

export function magicaalSigningPublicKey(): string {
  return process.env.MAGICAAL_SIGNING_PUBLIC_KEY ?? PINNED_MAGICAAL_PUBLIC_KEY;
}

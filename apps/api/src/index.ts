import { createApp } from './app';
import { config } from './config';
import { runMigrations } from './db/migrate';
import { backfillTriggerSecrets } from './db/backfill';
import { runSeedIfEmpty } from './db/seed';
import { logger } from './lib/logger';
import { ensurePlatformTenant } from './platform/bootstrap';
import { bootTimeSync } from './sync/boot-sync';
import { startLicenseValidator } from './marketplace/license-validator';
import { startUsageReporter } from './marketplace/usage-reporter';

async function main(): Promise<void> {
  if (!config.masterKey) {
    logger.warn('MAGICAAL_MASTER_KEY is not set — required before Phase 1');
  }

  await runMigrations();
  await backfillTriggerSecrets();
  await runSeedIfEmpty();
  await ensurePlatformTenant();
  await bootTimeSync(config.agentsDir);

  // Marketplace background processes. They live here rather than in the engine
  // because the account key they authenticate with is stored (encrypted) in
  // this service's DB. No-ops unless MARKETPLACE_ENABLED=true.
  startLicenseValidator();
  startUsageReporter();

  const app = createApp();
  app.listen(config.port, () => {
    logger.info({ port: config.port, env: config.nodeEnv }, 'Server started');
  });
}

main().catch((err) => {
  console.error('Fatal startup error', err);
  process.exit(1);
});

import { createApp } from './app';
import { config } from './config';
import { runMigrations } from './db/migrate';
import { runSeedIfEmpty } from './db/seed';
import { logger } from './lib/logger';
import { ensurePlatformTenant } from './platform/bootstrap';
import { bootTimeSync } from './sync/boot-sync';

async function main(): Promise<void> {
  if (!config.masterKey) {
    logger.warn('MAGICAAL_MASTER_KEY is not set — required before Phase 1');
  }

  await runMigrations();
  await runSeedIfEmpty();
  await ensurePlatformTenant();
  await bootTimeSync(config.agentsDir);

  const app = createApp();
  app.listen(config.port, () => {
    logger.info({ port: config.port, env: config.nodeEnv }, 'Server started');
  });
}

main().catch((err) => {
  console.error('Fatal startup error', err);
  process.exit(1);
});

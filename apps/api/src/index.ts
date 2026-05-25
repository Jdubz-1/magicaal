import { createApp } from './app';
import { config } from './config';
import { runMigrations } from './db/migrate';
import { logger } from './lib/logger';

async function main(): Promise<void> {
  if (!config.masterKey) {
    logger.warn('MAGICAAL_MASTER_KEY is not set — required before Phase 1');
  }

  await runMigrations();

  const app = createApp();
  app.listen(config.port, () => {
    logger.info({ port: config.port, env: config.nodeEnv }, 'Server started');
  });
}

main().catch((err) => {
  console.error('Fatal startup error', err);
  process.exit(1);
});

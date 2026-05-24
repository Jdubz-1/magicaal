import { createApp } from './app';
import { config } from './config';
import { logger } from './lib/logger';
import { runTelemetryMigrations } from './db/telemetry-migrate';
import { registerNodes } from './registry/startup';
import { startScheduler } from './execution/scheduler';

async function main(): Promise<void> {
  if (!config.masterKey) {
    logger.warn('MAGICAAL_MASTER_KEY is not set — required before Phase 1');
  }

  await runTelemetryMigrations();
  registerNodes();
  startScheduler();

  const app = createApp();
  app.listen(config.port, () => {
    logger.info({ port: config.port, env: config.nodeEnv }, 'Engine started');
  });
}

main().catch((err) => {
  console.error('Fatal startup error', err);
  process.exit(1);
});

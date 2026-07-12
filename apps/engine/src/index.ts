import { createApp } from './app';
import { config } from './config';
import { logger } from './lib/logger';
import { runTelemetryMigrations } from './db/telemetry-migrate';
import { registerNodes, registerAdapters, registerIntegrations } from './registry/startup';
import { startScheduler } from './execution/scheduler';
import { initPricingCache } from './router/router-engine';
import { sessionManager } from './session/session-manager';
import { startHotLoadSubscriber, reloadInstalledPackages } from './marketplace/hot-load';
import { startLicenseValidator } from './marketplace/license-validator';
import { startUsageReporter } from './marketplace/usage-reporter';
import { redis } from './queue/client';

const SESSION_EXPIRY_INTERVAL_MS = 60 * 60 * 1000; // 1 hour

async function main(): Promise<void> {
  if (!config.masterKey) {
    logger.warn('MAGICAAL_MASTER_KEY is not set — required before Phase 1');
  }

  await runTelemetryMigrations();
  registerNodes();
  registerIntegrations();
  registerAdapters();
  // Marketplace/air-gapped installs from previous boots layer on top of the
  // built-ins — must complete before any run can be dispatched.
  reloadInstalledPackages();
  initPricingCache(); // seeds built-in defaults; DB overrides loaded after first API sync
  startScheduler();
  startHotLoadSubscriber(redis);
  // Marketplace background processes — no-ops unless MARKETPLACE_ENABLED=true
  startLicenseValidator();
  startUsageReporter();

  // Hourly session expiry sweep
  setInterval(() => {
    void sessionManager.expireSessions();
  }, SESSION_EXPIRY_INTERVAL_MS);

  const app = createApp();
  app.listen(config.port, () => {
    logger.info({ port: config.port, env: config.nodeEnv }, 'Engine started');
  });
}

main().catch((err) => {
  console.error('Fatal startup error', err);
  process.exit(1);
});

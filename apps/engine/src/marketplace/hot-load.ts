import * as fs from 'node:fs';
import * as path from 'node:path';
import { Redis } from 'ioredis';
import { logger } from '../lib/logger';
import { config } from '../config';
import { registry } from '../registry/node-registry';
import { integrationRegistry } from '../registry/integration-registry';
import { loadPackageDir, verifyInstalledDir } from './package-loader';

export const PACKAGE_EVENTS_CHANNEL = 'magicaal:package-events';

/**
 * Re-load packages installed in previous runs. Installs persist to
 * PACKAGES_DIR (inside the /data volume) but the registries are rebuilt from
 * the built-ins on every boot — without this, marketplace and air-gapped
 * installs silently disappear on restart while package_registry still
 * advertises their node types to the Studio palette.
 *
 * Runs after built-in registration (built-ins are the base layer) and before
 * the scheduler starts (no run may execute against a half-built registry).
 * A single bad package logs and is skipped; it must not block boot.
 */
export function reloadInstalledPackages(): void {
  const root = config.packagesDir;
  if (!fs.existsSync(root)) return;

  let loadedCount = 0;
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const dir = path.join(root, entry.name);
    if (!fs.existsSync(path.join(dir, 'manifest.json'))) continue;

    try {
      verifyInstalledDir(dir, config.marketplaceAllowUnverified);
      const loaded = loadPackageDir(dir);
      registry.hotLoad(loaded.nodes);
      if (loaded.integration) {
        integrationRegistry.register(loaded.integration);
      }
      loadedCount++;
      logger.info(
        {
          packageId: `${loaded.manifest.publisher}/${loaded.manifest.name}@${loaded.manifest.version}`,
          nodeTypes: loaded.nodes.map((n) => n.type),
        },
        'Installed package re-loaded at startup',
      );
    } catch (err) {
      logger.error({ dir, err }, 'Failed to re-load installed package — skipping');
    }
  }

  if (loadedCount > 0) {
    logger.info({ count: loadedCount }, 'Installed packages re-loaded');
  }
}

export interface PackageEvent {
  event: 'installed' | 'updated' | 'removed';
  packageId: string;
  /** Directory the package was installed to (installed/updated events). */
  packageDir?: string;
}

/**
 * Apply a package event to the live registries. New runs see the updated
 * registry immediately; in-flight runs keep their startup snapshot
 * (copy-on-write in NodeRegistry.hotLoad).
 */
export function applyPackageEvent(event: PackageEvent): void {
  if (event.event === 'removed') {
    // Removal keeps the module loaded for in-flight runs; the registry entry
    // stays until restart. The package_registry row (enabled=false) already
    // hides it from the palette via the API layer.
    logger.info({ packageId: event.packageId }, 'Package removal event — palette-only');
    return;
  }

  if (!event.packageDir) {
    logger.warn({ event }, 'Package event has no packageDir — skipping');
    return;
  }

  const loaded = loadPackageDir(event.packageDir);
  const generation = registry.hotLoad(loaded.nodes);
  if (loaded.integration) {
    integrationRegistry.register(loaded.integration);
  }

  logger.info(
    {
      packageId: event.packageId,
      nodeTypes: loaded.nodes.map((n) => n.type),
      generation,
    },
    'Package hot-loaded into node registry',
  );
}

/**
 * Subscribe to package install events published by the API layer after a
 * successful (signature-verified) install. Uses a dedicated Redis connection
 * — a subscriber connection cannot issue regular commands, so the BullMQ
 * connection cannot be shared directly; duplicate() inherits its options.
 */
export function startHotLoadSubscriber(baseConnection: Redis): Redis {
  const subscriber = baseConnection.duplicate();

  subscriber.subscribe(PACKAGE_EVENTS_CHANNEL, (err) => {
    if (err) {
      logger.error({ err }, 'Failed to subscribe to package events channel');
      return;
    }
    logger.info({ channel: PACKAGE_EVENTS_CHANNEL }, 'Hot-load subscriber active');
  });

  subscriber.on('message', (channel, message) => {
    if (channel !== PACKAGE_EVENTS_CHANNEL) return;
    try {
      const event = JSON.parse(message) as PackageEvent;
      applyPackageEvent(event);
    } catch (err) {
      logger.error({ err, message }, 'Failed to apply package event');
    }
  });

  return subscriber;
}

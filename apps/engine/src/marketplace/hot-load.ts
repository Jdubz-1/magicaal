import { Redis } from 'ioredis';
import { logger } from '../lib/logger';
import { registry } from '../registry/node-registry';
import { integrationRegistry } from '../registry/integration-registry';
import { loadPackageDir } from './package-loader';

export const PACKAGE_EVENTS_CHANNEL = 'magicaal:package-events';

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

import { ALL_NODES } from '@magicaal/nodes';
import { registry } from './node-registry';
import { logger } from '../lib/logger';

export function registerNodes(): void {
  for (const node of ALL_NODES) {
    registry.register(node);
  }
  logger.info({ count: ALL_NODES.length }, 'Node registry initialized');
}

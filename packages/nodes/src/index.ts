import type { NodeModule } from '@magicaal/sdk-node';
import { coreStart } from './nodes/core-start';
import { coreEnd } from './nodes/core-end';
import { coreStop } from './nodes/core-stop';
import { coreCondition } from './nodes/core-condition';
import { coreRouter } from './nodes/core-router';

export { coreStart, coreEnd, coreStop, coreCondition, coreRouter };
export { evaluate, evaluateBoolean, evaluateString } from './utils/jsonata';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ALL_NODES: NodeModule<any>[] = [
  coreStart,
  coreEnd,
  coreStop,
  coreCondition,
  coreRouter,
];

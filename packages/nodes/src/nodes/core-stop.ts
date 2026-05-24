import type { NodeModule } from '@magicaal/sdk-node';

interface StopConfig {
  reason?: string;
}

export const coreStop: NodeModule<StopConfig> = {
  type: 'core:stop',
  meta: {
    name: 'Stop',
    description: 'Explicitly terminates the run with a STOPPED status. The lifecycle manager detects _terminated and ends the run.',
    category: 'control-flow',
    icon: 'x-circle',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      properties: {
        reason: {
          type: 'string',
          description: 'Optional reason recorded in the run output',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _terminated: { type: 'boolean', const: true },
        reason: { type: 'string' },
      },
    },
  },
  async execute(_ctx, config) {
    return {
      status: 'complete',
      outputs: { _terminated: true, reason: config.reason ?? 'Stopped' },
    };
  },
};

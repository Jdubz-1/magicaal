import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';

interface ForkConfig {
  branchKey?: string;
}

export const coreFork: NodeModule<ForkConfig> = {
  type: 'core:fork',
  meta: {
    name: 'Fork',
    description:
      'Splits execution into parallel branches. All outbound unconditional edges fire simultaneously and execute in parallel. A downstream Join node merges results.',
    category: 'control-flow',
    icon: 'git-branch',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      properties: {
        branchKey: {
          type: 'string',
          description: 'Optional context key to write the number of parallel branches to',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _fork_branch_count: { type: 'number' },
      },
    },
  },
  async execute(ctx: ExecutionContext, config: ForkConfig) {
    // The actual parallel execution is managed by the engine worker.
    // This node signals the fork point by setting _fork_active = true.
    ctx.set('_fork_active', true);

    if (config.branchKey) {
      // Branch count is determined by the engine after edge resolution;
      // set a placeholder that the engine replaces with the actual count.
      ctx.set(config.branchKey, 0);
    }

    return {
      status: 'complete' as const,
      outputs: { _fork_branch_count: 0 },
    };
  },
};

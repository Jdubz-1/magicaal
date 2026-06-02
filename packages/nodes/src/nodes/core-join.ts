import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';

type MergeStrategy = 'last-wins' | 'merge' | 'collect';

interface JoinConfig {
  mergeStrategy: MergeStrategy;
  collectKey?: string;
}

export const coreJoin: NodeModule<JoinConfig> = {
  type: 'core:join',
  meta: {
    name: 'Join',
    description:
      'Barrier node that waits for all upstream parallel branches (from a Fork) to complete, then merges their context outputs according to the specified strategy before continuing.',
    category: 'control-flow',
    icon: 'git-merge',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['mergeStrategy'],
      properties: {
        mergeStrategy: {
          type: 'string',
          enum: ['last-wins', 'merge', 'collect'],
          description:
            '"last-wins": latest branch output overwrites earlier keys. "merge": deep-merge all branch outputs. "collect": gather each branch output into an array at collectKey.',
        },
        collectKey: {
          type: 'string',
          description: 'Context key to write the collected array to (required when mergeStrategy is "collect")',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _join_branch_count: { type: 'number' },
      },
    },
  },
  async execute(ctx: ExecutionContext, _config: JoinConfig) {
    // Merging is performed by the engine worker before calling this node.
    // This node simply marks the join point as complete.
    const branchCount = ctx.get<number>('_fork_branch_count') ?? 0;
    ctx.set('_fork_active', false);

    return {
      status: 'complete' as const,
      outputs: { _join_branch_count: branchCount },
    };
  },
};

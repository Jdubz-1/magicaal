import type { NodeModule } from '@magicaal/sdk-node';

interface ReduceConfig {
  outputKey: string;
  mergeStrategy?: 'collect' | 'merge' | 'last-wins';
}

export const coreReduce: NodeModule<ReduceConfig> = {
  type: 'core:reduce',
  meta: {
    name: 'Reduce',
    description: 'Collects Fan-Out branch outputs and merges them via the configured strategy.',
    category: 'composition',
    icon: 'merge',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['outputKey'],
      properties: {
        outputKey:     { type: 'string', description: 'Context key to write the merged results' },
        mergeStrategy: { type: 'string', enum: ['collect', 'merge', 'last-wins'], description: 'How to merge branch outputs (default: collect)' },
      },
    },
    input:  {},
    output: {},
  },
  async execute(ctx, config) {
    const results = ctx.get<unknown[]>('_fanout_results') ?? [];
    const strategy = config.mergeStrategy ?? 'collect';
    const outputKey = config.outputKey;

    let merged: unknown;
    if (strategy === 'collect') {
      merged = results;
    } else if (strategy === 'last-wins') {
      merged = results[results.length - 1] ?? {};
    } else {
      // merge: deep-merge all branch data objects
      merged = {};
      for (const r of results) {
        if (r && typeof r === 'object') Object.assign(merged as object, r);
      }
    }

    ctx.set(outputKey, merged);
    return { status: 'complete', outputs: { [outputKey]: merged } };
  },
};

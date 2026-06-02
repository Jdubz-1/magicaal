import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';
import * as crypto from 'node:crypto';

interface HumanReviewConfig {
  prompt?: string;
  contextKeys?: string[];
  reviewIdKey?: string;
}

export const coreHumanReview: NodeModule<HumanReviewConfig> = {
  type: 'core:human-review',
  meta: {
    name: 'Human Review',
    description:
      'Suspends the run and requests human review. On first execution: generates a reviewId, suspends the run, and emits run.suspended via SSE. When the run is resumed after approval: sets _review_approved=true and continues to downstream nodes. On rejection: the run is marked failed by the resume endpoint.',
    category: 'guardrails',
    icon: 'user-check',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'Instructions shown to the human reviewer in the Admin panel',
        },
        contextKeys: {
          type: 'array',
          items: { type: 'string' },
          description: 'Context keys to include in the review payload for the reviewer to inspect',
        },
        reviewIdKey: {
          type: 'string',
          description: 'Context key to write the reviewId to (for reference in downstream nodes after approval)',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _review_approved: { type: 'boolean' },
        _review_id: { type: 'string' },
        _review_modifications: { type: 'object' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: HumanReviewConfig) {
    // Resumed path: _review_approved was set by the resume endpoint
    if (ctx.get<boolean>('_review_approved') === true) {
      ctx.log('info', 'Human review approved — continuing execution');
      return {
        status: 'complete' as const,
        outputs: {
          _review_approved: true,
          _review_id: ctx.get<string>('_review_id') ?? '',
          _review_modifications: ctx.get('_review_modifications') ?? null,
        },
      };
    }

    // First execution: generate reviewId and suspend
    const reviewId = `rev_${crypto.randomUUID()}`;
    ctx.set('_review_id', reviewId);

    if (config.reviewIdKey) {
      ctx.set(config.reviewIdKey, reviewId);
    }

    // Suspend the run — the scheduler will persist the checkpoint
    ctx.suspend(reviewId);

    ctx.log('info', `Run suspended for human review (reviewId: ${reviewId})`);

    return {
      status: 'suspended' as const,
      outputs: { _review_id: reviewId },
    };
  },
};

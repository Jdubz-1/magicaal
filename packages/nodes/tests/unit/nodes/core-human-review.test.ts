import { coreHumanReview } from '../../../src/nodes/core-human-review';
import { makeMockContext } from '../../helpers/mock-context';

describe('core:human-review', () => {
  it('suspends on first execution and sets _review_id', async () => {
    const ctx = makeMockContext({});
    const result = await coreHumanReview.execute(ctx, {});

    expect(result.status).toBe('suspended');
    const reviewId = ctx.get<string>('_review_id');
    expect(reviewId).toBeDefined();
    expect(reviewId).toMatch(/^rev_/);
    expect(ctx.suspend).toHaveBeenCalledWith(reviewId);
  });

  it('passes through when _review_approved is true (resumed path)', async () => {
    const ctx = makeMockContext({ _review_approved: true, _review_id: 'rev_existing' });
    const result = await coreHumanReview.execute(ctx, {});

    expect(result.status).toBe('complete');
    expect(ctx.suspend).not.toHaveBeenCalled();
    expect(result.outputs._review_approved).toBe(true);
  });

  it('writes reviewId to reviewIdKey when configured', async () => {
    const ctx = makeMockContext({});
    await coreHumanReview.execute(ctx, { reviewIdKey: 'myReviewId' });

    const reviewId = ctx.get<string>('_review_id');
    expect(ctx.get('myReviewId')).toBe(reviewId);
  });

  it('logs a warning on first suspension', async () => {
    const ctx = makeMockContext({});
    await coreHumanReview.execute(ctx, {});
    expect(ctx.log).toHaveBeenCalledWith('info', expect.stringContaining('suspended for human review'));
  });
});

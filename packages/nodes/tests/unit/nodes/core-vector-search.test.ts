import { coreVectorSearch } from '../../../src/nodes/core-vector-search';
import { makeMockContext } from '../../helpers/mock-context';

const vectors = [
  { id: 'doc-a', vector: [1, 0, 0], metadata: { title: 'Doc A' } },
  { id: 'doc-b', vector: [0, 1, 0], metadata: { title: 'Doc B' } },
  { id: 'doc-c', vector: [0.7, 0.7, 0], metadata: { title: 'Doc C' } },
];

describe('core:vector-search', () => {
  it('returns top-K results sorted by cosine similarity', async () => {
    const ctx = makeMockContext({
      index: vectors,
      query: [1, 0, 0], // identical to doc-a
    });

    const result = await coreVectorSearch.execute(ctx, {
      vectorsKey: 'index',
      queryVectorKey: 'query',
      topK: 2,
      outputKey: 'results',
    });

    expect(result.status).toBe('complete');
    const results = ctx.get<{ id: string; score: number }[]>('results');
    expect(results).toHaveLength(2);
    expect(results?.[0].id).toBe('doc-a');
    expect(results?.[0].score).toBeCloseTo(1.0);
  });

  it('filters results below minScore', async () => {
    const ctx = makeMockContext({
      index: vectors,
      query: [1, 0, 0],
    });

    const result = await coreVectorSearch.execute(ctx, {
      vectorsKey: 'index',
      queryVectorKey: 'query',
      minScore: 0.5,
      outputKey: 'results',
    });

    expect(result.status).toBe('complete');
    const results = ctx.get<{ id: string }[]>('results');
    // doc-b has score 0 (orthogonal), doc-c ~0.7, doc-a = 1
    expect(results?.every((r) => r.id !== 'doc-b')).toBe(true);
  });

  it('includes metadata in results', async () => {
    const ctx = makeMockContext({ index: vectors, query: [0, 1, 0] });

    await coreVectorSearch.execute(ctx, {
      vectorsKey: 'index',
      queryVectorKey: 'query',
      topK: 1,
      outputKey: 'results',
    });

    const results = ctx.get<{ id: string; metadata: { title: string } }[]>('results');
    expect(results?.[0].metadata?.title).toBe('Doc B');
  });

  it('returns VECTOR_EMPTY_INDEX when vectors array is empty', async () => {
    const ctx = makeMockContext({ index: [], query: [1, 0] });

    const result = await coreVectorSearch.execute(ctx, {
      vectorsKey: 'index',
      queryVectorKey: 'query',
      outputKey: 'results',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('VECTOR_EMPTY_INDEX');
  });

  it('returns VECTOR_DIMENSIONS_MISMATCH on mismatched dimensions', async () => {
    const ctx = makeMockContext({
      index: [{ id: 'x', vector: [1, 2, 3] }],
      query: [1, 2], // different dim
    });

    const result = await coreVectorSearch.execute(ctx, {
      vectorsKey: 'index',
      queryVectorKey: 'query',
      outputKey: 'results',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('VECTOR_DIMENSIONS_MISMATCH');
  });

  it('sets _vector_result_count in context', async () => {
    const ctx = makeMockContext({ index: vectors, query: [1, 0, 0] });

    await coreVectorSearch.execute(ctx, {
      vectorsKey: 'index',
      queryVectorKey: 'query',
      outputKey: 'results',
    });

    expect(ctx.get('_vector_result_count')).toBe(3);
  });
});

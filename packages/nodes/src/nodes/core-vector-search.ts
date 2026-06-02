import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';

interface VectorEntry {
  id: string;
  vector: number[];
  metadata?: Record<string, unknown>;
}

interface VectorSearchResult {
  id: string;
  score: number;
  metadata?: Record<string, unknown>;
}

interface VectorSearchConfig {
  vectorsKey: string;
  queryVectorKey: string;
  topK?: number;
  minScore?: number;
  outputKey: string;
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

export const coreVectorSearch: NodeModule<VectorSearchConfig> = {
  type: 'core:vector-search',
  meta: {
    name: 'Vector Search',
    description:
      'Performs in-memory cosine similarity search over a vector index stored in context. Reads a {id, vector, metadata}[] array from vectorsKey and a query vector from queryVectorKey. Returns top-K results sorted by descending similarity.',
    category: 'ai-llm',
    icon: 'layers',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['vectorsKey', 'queryVectorKey', 'outputKey'],
      properties: {
        vectorsKey: {
          type: 'string',
          description: 'Context key holding the vector index: {id, vector, metadata?}[]',
        },
        queryVectorKey: {
          type: 'string',
          description: 'Context key holding the query vector (number[])',
        },
        topK: {
          type: 'number',
          description: 'Number of top results to return (default: 5)',
        },
        minScore: {
          type: 'number',
          description: 'Minimum cosine similarity threshold 0–1 (default: 0)',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write {id, score, metadata?}[] results to',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _vector_result_count: { type: 'number' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: VectorSearchConfig) {
    const vectors = ctx.get<VectorEntry[]>(config.vectorsKey);
    if (!Array.isArray(vectors) || vectors.length === 0) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'VECTOR_EMPTY_INDEX',
          message: `Context key "${config.vectorsKey}" is empty or not an array`,
          retryable: false,
        },
      };
    }

    const queryVector = ctx.get<number[]>(config.queryVectorKey);
    if (!Array.isArray(queryVector) || queryVector.length === 0) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'VECTOR_INVALID_QUERY',
          message: `Context key "${config.queryVectorKey}" is not a non-empty number array`,
          retryable: false,
        },
      };
    }

    // Validate dimension consistency
    const expectedDims = queryVector.length;
    const mismatch = vectors.find((v) => v.vector.length !== expectedDims);
    if (mismatch) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'VECTOR_DIMENSIONS_MISMATCH',
          message: `Index entry "${mismatch.id}" has ${mismatch.vector.length} dimensions; query has ${expectedDims}`,
          retryable: false,
        },
      };
    }

    const topK = config.topK ?? 5;
    const minScore = config.minScore ?? 0;

    // Compute similarities and sort
    const results: VectorSearchResult[] = vectors
      .map((entry) => ({
        id: entry.id,
        score: cosineSimilarity(queryVector, entry.vector),
        ...(entry.metadata !== undefined && { metadata: entry.metadata }),
      }))
      .filter((r) => r.score >= minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    ctx.set(config.outputKey, results);
    ctx.set('_vector_result_count', results.length);

    return {
      status: 'complete' as const,
      outputs: {
        [config.outputKey]: results,
        _vector_result_count: results.length,
      },
    };
  },
};

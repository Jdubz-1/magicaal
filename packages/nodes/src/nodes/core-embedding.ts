import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';
import type { ModelRouterConfig } from '@magicaal/core';

interface EmbeddingConfig {
  inputKey: string;
  outputKey: string;
  router?: ModelRouterConfig;
}

export const coreEmbedding: NodeModule<EmbeddingConfig> = {
  type: 'core:embedding',
  meta: {
    name: 'Embedding',
    description:
      'Generates a vector embedding for a text value from context. Writes the float array to outputKey. Requires a router config pointing to an embedding-capable model.',
    category: 'ai-llm',
    icon: 'vector',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['inputKey', 'outputKey'],
      properties: {
        inputKey: {
          type: 'string',
          description: 'Context key containing the text to embed',
        },
        outputKey: {
          type: 'string',
          description: 'Context key to write the embedding vector (float array) to',
        },
        router: {
          type: 'object',
          description: 'Router config pointing to an embedding model (e.g. text-embedding-3-small)',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _embedding_dimensions: { type: 'number' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: EmbeddingConfig) {
    const text = ctx.get<string>(config.inputKey);
    if (typeof text !== 'string') {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'EMBEDDING_INPUT_NOT_STRING',
          message: `Context key "${config.inputKey}" is not a string`,
          retryable: false,
        },
      };
    }

    // Embedding is a special single-turn call with an empty message array
    // and the text embedded as a user message. The provider adapter translates
    // this to the appropriate embedding endpoint when the model is an embedding model.
    const response = await ctx.llmCall(
      {
        messages: [{ role: 'user', content: text }],
        metadata: { embeddingMode: true, inputText: text },
      },
      config.router ?? null,
    );

    // The response content for embedding calls contains the vector as a JSON array
    let vector: number[];
    try {
      vector = JSON.parse(response.content) as number[];
    } catch {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'EMBEDDING_PARSE_FAILED',
          message: 'Embedding response could not be parsed as a numeric array',
          retryable: true,
        },
      };
    }

    ctx.set(config.outputKey, vector);
    ctx.set('_embedding_dimensions', vector.length);

    return {
      status: 'complete' as const,
      outputs: { [config.outputKey]: vector, _embedding_dimensions: vector.length },
    };
  },
};

import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';
import type { AgenticRouterConfig } from '@magicaal/core';
import type { ModelRouterConfig } from '@magicaal/core';

interface AgenticRouterNodeConfig extends Omit<AgenticRouterConfig, 'model'> {
  model?: string;       // deprecated; use router instead
  router?: ModelRouterConfig;
}

interface ClassificationResult {
  route: string;
  confidence: number;
  reasoning: string;
}

const OUTPUT_SCHEMA = {
  type: 'object',
  required: ['route', 'confidence', 'reasoning'],
  properties: {
    route: {
      type: 'string',
      description: 'The selected route key from the provided cases',
    },
    confidence: {
      type: 'number',
      description: 'Confidence score between 0.0 and 1.0',
    },
    reasoning: {
      type: 'string',
      description: 'Brief explanation of why this route was selected',
    },
  },
};

function buildClassificationPrompt(config: AgenticRouterNodeConfig, inputText: string): string {
  const caseDescriptions = config.cases
    .map((c) => `- "${c.key}" (${c.label}): ${c.description}`)
    .join('\n');

  return `You are a routing classifier. Given the following input, select the most appropriate route from the options below.

Input to classify:
${inputText}

Available routes:
${caseDescriptions}

Respond with a JSON object containing:
- route: the key of the selected route (must be one of: ${config.cases.map((c) => `"${c.key}"`).join(', ')})
- confidence: a number between 0.0 and 1.0 indicating your confidence
- reasoning: a brief explanation of why you selected this route`;
}

export const coreAgenticRouter: NodeModule<AgenticRouterNodeConfig> = {
  type: 'core:agentic-router',
  meta: {
    name: 'Agentic Router',
    description:
      'LLM-powered intent classifier. Calls the configured model with a classification prompt built from the declared cases. Writes the selected route key to routeOutputKey. If confidence falls below confidenceThreshold, routes to _human_review for HITL escalation. Edge conditions should check the value of routeOutputKey.',
    category: 'ai-llm',
    icon: 'zap',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['inputKey', 'cases', 'routeOutputKey'],
      properties: {
        model: {
          type: 'string',
          description: 'Deprecated — use router instead. Kept for backwards compatibility.',
        },
        router: {
          type: 'object',
          description: 'Router config for the classification LLM call',
        },
        inputKey: {
          type: 'string',
          description: 'Context key whose string value is the text to classify',
        },
        cases: {
          type: 'array',
          description: 'Declared routing cases. Each case needs a unique key, label, and description.',
          items: {
            type: 'object',
            required: ['key', 'label', 'description'],
            properties: {
              key: { type: 'string' },
              label: { type: 'string' },
              description: { type: 'string' },
            },
          },
        },
        routeOutputKey: {
          type: 'string',
          description: 'Context key to write the selected route key to (e.g. "_route"). Outbound conditional edges should check this key.',
        },
        confidenceOutputKey: {
          type: 'string',
          description: 'Optional context key to write the confidence score (0.0–1.0)',
        },
        reasoningOutputKey: {
          type: 'string',
          description: 'Optional context key to write the reasoning text',
        },
        confidenceThreshold: {
          type: 'number',
          description: 'If confidence < threshold, route is overridden to "_human_review" for HITL escalation',
        },
        systemPrompt: {
          type: 'string',
          description: 'Optional additional system prompt injected before the auto-generated classification prompt',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _route: { type: 'string' },
        _route_confidence: { type: 'number' },
        _route_reasoning: { type: 'string' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: AgenticRouterNodeConfig) {
    const inputText = String(ctx.get(config.inputKey) ?? '');

    if (!inputText.trim()) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'AGENTIC_ROUTER_EMPTY_INPUT',
          message: `Context key "${config.inputKey}" is empty or not set`,
          retryable: false,
        },
      };
    }

    if (!config.cases || config.cases.length === 0) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'AGENTIC_ROUTER_NO_CASES',
          message: 'No routing cases declared',
          retryable: false,
        },
      };
    }

    const classificationPrompt = buildClassificationPrompt(config, inputText);
    const systemPrompt =
      typeof config.systemPrompt === 'string'
        ? `${config.systemPrompt}\n\n${classificationPrompt}`
        : classificationPrompt;

    let result: ClassificationResult;
    try {
      const response = await ctx.llmCall(
        {
          messages: [{ role: 'user', content: 'Classify the input.' }],
          system: systemPrompt,
          outputSchema: OUTPUT_SCHEMA,
        },
        config.router ?? null,
      );

      result = JSON.parse(response.content) as ClassificationResult;
    } catch (err) {
      return {
        status: 'failed' as const,
        outputs: {},
        error: {
          code: 'AGENTIC_ROUTER_CALL_FAILED',
          message: err instanceof Error ? err.message : 'Classification LLM call failed',
          retryable: true,
        },
      };
    }

    // Validate that the returned route is one of the declared case keys
    const validKeys = new Set(config.cases.map((c) => c.key));
    let selectedRoute = validKeys.has(result.route) ? result.route : config.cases[0].key;
    const confidence = Math.max(0, Math.min(1, result.confidence ?? 0));

    // Confidence threshold check → HITL escalation
    if (
      config.confidenceThreshold !== undefined &&
      confidence < config.confidenceThreshold
    ) {
      selectedRoute = '_human_review';
      ctx.log(
        'info',
        `Agentic router confidence ${confidence.toFixed(2)} below threshold ${config.confidenceThreshold} — routing to human review`,
      );
    }

    ctx.set(config.routeOutputKey, selectedRoute);
    ctx.set('_route', selectedRoute);
    ctx.set('_route_confidence', confidence);
    ctx.set('_route_reasoning', result.reasoning ?? '');

    if (config.confidenceOutputKey) {
      ctx.set(config.confidenceOutputKey, confidence);
    }
    if (config.reasoningOutputKey) {
      ctx.set(config.reasoningOutputKey, result.reasoning ?? '');
    }

    return {
      status: 'complete' as const,
      outputs: {
        [config.routeOutputKey]: selectedRoute,
        _route: selectedRoute,
        _route_confidence: confidence,
        _route_reasoning: result.reasoning ?? '',
      },
    };
  },
};

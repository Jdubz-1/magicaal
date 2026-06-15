import type { NodeModule } from '@magicaal/sdk-node';
import type { ModelRouterConfig } from '@magicaal/core';
import { evaluate as evaluateJSONata } from '../utils/jsonata';

interface RuleBasedConfig {
  evaluatorType: 'rule-based';
  rules: Array<{ expression: string; score: number; label?: string }>;
}

interface LlmJudgeConfig {
  evaluatorType: 'llm-judge';
  rubric: string;
  router?: ModelRouterConfig;
}

interface ExactMatchConfig {
  evaluatorType: 'exact-match';
  expectedKey: string;
}

type EvaluateConfig = {
  inputKey: string;
  scoreOutputKey: string;
  labelOutputKey?: string;
} & (RuleBasedConfig | LlmJudgeConfig | ExactMatchConfig);

export const coreEvaluate: NodeModule<EvaluateConfig> = {
  type: 'core:evaluate',
  meta: {
    name: 'Evaluate',
    description: 'Scores a context value via rule-based, LLM-as-judge, or exact-match evaluation. Emits score to telemetry.',
    category: 'composition',
    icon: 'star',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['inputKey', 'scoreOutputKey', 'evaluatorType'],
      properties: {
        inputKey:       { type: 'string' },
        scoreOutputKey: { type: 'string' },
        labelOutputKey: { type: 'string' },
        evaluatorType:  { type: 'string', enum: ['rule-based', 'llm-judge', 'exact-match'] },
        rules:          { type: 'array', description: 'rule-based: array of { expression, score, label? }' },
        rubric:         { type: 'string', description: 'llm-judge: scoring rubric' },
        router:         { type: 'object', description: 'llm-judge: ModelRouterConfig' },
        expectedKey:    { type: 'string', description: 'exact-match: context key of expected value' },
      },
    },
    input:  {},
    output: {},
  },
  async execute(ctx, config) {
    const input = ctx.get(config.inputKey);
    let score = 0;
    let label = '';

    if (config.evaluatorType === 'rule-based') {
      const cfg = config as EvaluateConfig & RuleBasedConfig;
      for (const rule of cfg.rules) {
        const matched = await evaluateJSONata(rule.expression, ctx.data);
        if (matched === true || matched === 1) {
          score = rule.score;
          label = rule.label ?? `rule:${rule.expression.slice(0, 20)}`;
          break;
        }
      }
    } else if (config.evaluatorType === 'exact-match') {
      const cfg = config as EvaluateConfig & ExactMatchConfig;
      const expected = ctx.get(cfg.expectedKey);
      score = JSON.stringify(input) === JSON.stringify(expected) ? 1.0 : 0.0;
      label = score === 1.0 ? 'exact-match' : 'mismatch';
    } else if (config.evaluatorType === 'llm-judge') {
      const cfg = config as EvaluateConfig & LlmJudgeConfig;
      const response = await ctx.llmCall(
        {
          system: cfg.rubric + '\n\nReturn a JSON object with keys "score" (0.0-1.0) and "reasoning" (string).',
          messages: [{ role: 'user' as const, content: `Evaluate this output:\n\n${JSON.stringify(input, null, 2)}` }],
          outputSchema: {
            type: 'object',
            required: ['score', 'reasoning'],
            properties: { score: { type: 'number' }, reasoning: { type: 'string' } },
          },
        },
        cfg.router ?? null,
      );
      try {
        const parsed = JSON.parse(response.content) as { score: number; reasoning: string };
        score = Math.max(0, Math.min(1, parsed.score));
        label = parsed.reasoning?.slice(0, 100) ?? 'llm-judge';
      } catch {
        score = 0;
        label = 'parse-failed';
      }
    }

    ctx.set(config.scoreOutputKey, score);
    if (config.labelOutputKey) ctx.set(config.labelOutputKey, label);

    // Emit score to telemetry via metric
    ctx.metric(`evaluate.${config.evaluatorType}`, score);

    return {
      status: 'complete',
      outputs: {
        [config.scoreOutputKey]: score,
        ...(config.labelOutputKey ? { [config.labelOutputKey]: label } : {}),
      },
    };
  },
};

import type { NodeModule } from '@magicaal/sdk-node';

interface TokenBudgetConfig {
  inputKey: string;
  budgetTokens: number;
  overBudgetKey?: string;
  estimatedTokensKey?: string;
}

export const coreTokenBudget: NodeModule<TokenBudgetConfig> = {
  type: 'core:token-budget',
  meta: {
    name: 'Token Budget',
    description: 'Estimates token count for a context value and routes to a trim branch if over budget.',
    category: 'ai-llm',
    icon: 'gauge',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['inputKey', 'budgetTokens'],
      properties: {
        inputKey:          { type: 'string' },
        budgetTokens:      { type: 'number', description: 'Token budget threshold' },
        overBudgetKey:     { type: 'string', description: 'Context key to write boolean over-budget flag (default: _over_budget)' },
        estimatedTokensKey: { type: 'string', description: 'Context key to write estimated token count' },
      },
    },
    input:  {},
    output: {
      type: 'object',
      properties: {
        _over_budget:     { type: 'boolean' },
        _estimated_tokens: { type: 'number' },
      },
    },
  },
  async execute(ctx, config) {
    const value = ctx.get(config.inputKey);
    const serialized = typeof value === 'string' ? value : JSON.stringify(value ?? '');
    // Rough estimate: ~4 chars per token (conservative)
    const estimatedTokens = Math.ceil(serialized.length / 4);
    const overBudget = estimatedTokens > config.budgetTokens;

    const overKey = config.overBudgetKey ?? '_over_budget';
    const estKey  = config.estimatedTokensKey ?? '_estimated_tokens';
    ctx.set(overKey, overBudget);
    ctx.set(estKey, estimatedTokens);

    return {
      status: 'complete',
      outputs: { [overKey]: overBudget, [estKey]: estimatedTokens },
    };
  },
};

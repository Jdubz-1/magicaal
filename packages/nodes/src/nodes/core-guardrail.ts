import type { NodeModule } from '@magicaal/sdk-node';
import type { ExecutionContext } from '@magicaal/sdk-node';
import { evaluateBoolean } from '../utils/jsonata';
import { evaluate } from '../utils/jsonata';

type GuardrailMode = 'block-and-fail' | 'reroute-to-fallback' | 'redact-and-continue';

interface GuardrailRule {
  expression: string;
  description?: string;
  redactKey?: string;
  redactValue?: string;
}

interface GuardrailConfig {
  mode: GuardrailMode;
  rules: GuardrailRule[];
  failureMessage?: string;
}

export const coreGuardrail: NodeModule<GuardrailConfig> = {
  type: 'core:guardrail',
  meta: {
    name: 'Guardrail',
    description:
      'Evaluates a set of JSONata rule expressions against the current context. On violation: "block-and-fail" terminates the run with an error; "reroute-to-fallback" sets _guardrail_blocked=true so the fallback edge fires; "redact-and-continue" replaces the offending context value and continues.',
    category: 'guardrails',
    icon: 'shield',
    version: '1.0.0',
  },
  schema: {
    config: {
      type: 'object',
      required: ['mode', 'rules'],
      properties: {
        mode: {
          type: 'string',
          enum: ['block-and-fail', 'reroute-to-fallback', 'redact-and-continue'],
          description: 'What to do when a rule is violated',
        },
        rules: {
          type: 'array',
          description: 'Array of rule objects. A rule fires when its expression evaluates to true (meaning a policy is violated).',
          items: {
            type: 'object',
            required: ['expression'],
            properties: {
              expression: { type: 'string', description: 'JSONata expression — true = violation detected' },
              description: { type: 'string' },
              redactKey: { type: 'string', description: 'Context key to redact (mode: redact-and-continue)' },
              redactValue: { type: 'string', description: 'Replacement value when redacting (defaults to "[REDACTED]")' },
            },
          },
        },
        failureMessage: {
          type: 'string',
          description: 'Message set in _guardrail_reason on violation',
        },
      },
    },
    input: {},
    output: {
      type: 'object',
      properties: {
        _guardrail_passed: { type: 'boolean' },
        _guardrail_blocked: { type: 'boolean' },
        _guardrail_redacted: { type: 'boolean' },
        _guardrail_reason: { type: 'string' },
      },
    },
  },

  async execute(ctx: ExecutionContext, config: GuardrailConfig) {
    let violated = false;
    let violatingRule: GuardrailRule | null = null;

    for (const rule of config.rules) {
      try {
        const triggered = await evaluateBoolean(rule.expression, ctx.data);
        if (triggered) {
          violated = true;
          violatingRule = rule;
          break;
        }
      } catch {
        // Expression evaluation error — treat as non-violation to be safe
      }
    }

    const reason = config.failureMessage ?? violatingRule?.description ?? 'Guardrail policy violated';

    if (!violated) {
      ctx.set('_guardrail_passed', true);
      ctx.set('_guardrail_blocked', false);
      ctx.set('_guardrail_redacted', false);
      return {
        status: 'complete' as const,
        outputs: { _guardrail_passed: true, _guardrail_blocked: false, _guardrail_redacted: false },
      };
    }

    ctx.log('warn', `Guardrail violation (mode: ${config.mode}): ${reason}`);

    switch (config.mode) {
      case 'block-and-fail':
        return {
          status: 'failed' as const,
          outputs: {},
          error: {
            code: 'GUARDRAIL_BLOCKED',
            message: reason,
            retryable: false,
          },
        };

      case 'reroute-to-fallback':
        ctx.set('_guardrail_passed', false);
        ctx.set('_guardrail_blocked', true);
        ctx.set('_guardrail_reason', reason);
        return {
          status: 'complete' as const,
          outputs: { _guardrail_passed: false, _guardrail_blocked: true, _guardrail_reason: reason },
        };

      case 'redact-and-continue': {
        let redacted = false;
        for (const rule of config.rules) {
          if (rule.redactKey) {
            ctx.set(rule.redactKey, rule.redactValue ?? '[REDACTED]');
            redacted = true;
          }
        }
        ctx.set('_guardrail_passed', true);
        ctx.set('_guardrail_redacted', redacted);
        ctx.set('_guardrail_reason', reason);
        return {
          status: 'complete' as const,
          outputs: { _guardrail_passed: true, _guardrail_redacted: redacted, _guardrail_reason: reason },
        };
      }
    }
  },
};

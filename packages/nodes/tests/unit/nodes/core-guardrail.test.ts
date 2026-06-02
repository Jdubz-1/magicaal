import { coreGuardrail } from '../../../src/nodes/core-guardrail';
import { makeMockContext } from '../../helpers/mock-context';

describe('core:guardrail', () => {
  const ruleSet = [{ expression: '$._blocked = true', description: 'Block flag is set' }];

  it('passes when no rules are violated', async () => {
    const ctx = makeMockContext({ _blocked: false });
    const result = await coreGuardrail.execute(ctx, {
      mode: 'block-and-fail',
      rules: ruleSet,
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('_guardrail_passed')).toBe(true);
    expect(ctx.get('_guardrail_blocked')).toBe(false);
  });

  it('block-and-fail returns failed status on violation', async () => {
    const ctx = makeMockContext({ _blocked: true });
    const result = await coreGuardrail.execute(ctx, {
      mode: 'block-and-fail',
      rules: ruleSet,
      failureMessage: 'Blocked by policy',
    });

    expect(result.status).toBe('failed');
    expect(result.error?.code).toBe('GUARDRAIL_BLOCKED');
    expect(result.error?.message).toBe('Blocked by policy');
  });

  it('reroute-to-fallback sets _guardrail_blocked=true on violation', async () => {
    const ctx = makeMockContext({ _blocked: true });
    const result = await coreGuardrail.execute(ctx, {
      mode: 'reroute-to-fallback',
      rules: ruleSet,
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('_guardrail_blocked')).toBe(true);
    expect(ctx.get('_guardrail_passed')).toBe(false);
  });

  it('redact-and-continue replaces specified context key on violation', async () => {
    const ctx = makeMockContext({ _blocked: true, sensitiveField: 'secret-value' });
    const result = await coreGuardrail.execute(ctx, {
      mode: 'redact-and-continue',
      rules: [{ expression: '$._blocked = true', redactKey: 'sensitiveField', redactValue: '[REMOVED]' }],
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('sensitiveField')).toBe('[REMOVED]');
    expect(ctx.get('_guardrail_redacted')).toBe(true);
  });

  it('stops at the first violated rule', async () => {
    const ctx = makeMockContext({ a: true, b: true });
    const result = await coreGuardrail.execute(ctx, {
      mode: 'block-and-fail',
      rules: [
        { expression: '$.a = true', description: 'Rule A' },
        { expression: '$.b = true', description: 'Rule B' },
      ],
    });

    expect(result.status).toBe('failed');
    expect(result.error?.message).toBe('Rule A');
  });
});

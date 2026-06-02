import { corePromptBuilder } from '../../../src/nodes/core-prompt-builder';
import { makeMockContext } from '../../helpers/mock-context';

describe('core:prompt-builder', () => {
  it('interpolates simple {{key}} placeholders', async () => {
    const ctx = makeMockContext({ name: 'Alice', topic: 'TypeScript' });
    const result = await corePromptBuilder.execute(ctx, {
      template: 'Hello {{name}}, tell me about {{topic}}.',
      outputKey: 'prompt',
    });

    expect(result.status).toBe('complete');
    expect(ctx.get('prompt')).toBe('Hello Alice, tell me about TypeScript.');
  });

  it('handles nested dot-notation placeholders', async () => {
    const ctx = makeMockContext({ user: { role: 'admin' } });
    await corePromptBuilder.execute(ctx, {
      template: 'You are a {{user.role}}.',
      outputKey: 'systemPrompt',
    });

    expect(ctx.get('systemPrompt')).toBe('You are a admin.');
  });

  it('replaces missing keys with empty string', async () => {
    const ctx = makeMockContext({});
    await corePromptBuilder.execute(ctx, {
      template: 'Value: {{missing}}',
      outputKey: 'out',
    });

    expect(ctx.get('out')).toBe('Value: ');
  });

  it('sets _prompt_built = true', async () => {
    const ctx = makeMockContext({ x: 1 });
    await corePromptBuilder.execute(ctx, { template: 'x={{x}}', outputKey: 'p' });
    expect(ctx.get('_prompt_built')).toBe(true);
  });

  it('handles templates with no placeholders', async () => {
    const ctx = makeMockContext({});
    await corePromptBuilder.execute(ctx, {
      template: 'Static system prompt.',
      outputKey: 'sys',
    });
    expect(ctx.get('sys')).toBe('Static system prompt.');
  });
});

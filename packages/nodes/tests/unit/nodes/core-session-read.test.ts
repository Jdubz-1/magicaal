import { coreSessionRead } from '../../../src/nodes/core-session-read';
import { makeMockContext } from '../../helpers/mock-context';

describe('core:session-read', () => {
  it('copies a stored value to a different context key', async () => {
    const ctx = makeMockContext({ messages: [{ role: 'user', content: 'hi' }] });

    const result = await coreSessionRead.execute(ctx, {
      reads: { sessionMessages: 'messages' },
    });

    expect(ctx.get('sessionMessages')).toEqual([{ role: 'user', content: 'hi' }]);
    expect(result.outputs).toEqual({ sessionMessages: [{ role: 'user', content: 'hi' }] });
  });

  it('treats an identity mapping as a no-op', async () => {
    // The loaded value already sits under that key. Writing it back records it
    // as a write by this run, and the session layer then appends an `append`
    // key onto itself on every run.
    const ctx = makeMockContext({ messages: ['stored'] });

    const result = await coreSessionRead.execute(ctx, { reads: { messages: 'messages' } });

    expect(ctx.get('messages')).toEqual(['stored']);
    expect(result.outputs).toEqual({});
  });

  it('skips keys the session did not have', async () => {
    const ctx = makeMockContext({});

    const result = await coreSessionRead.execute(ctx, { reads: { target: 'absent' } });

    expect(ctx.get('target')).toBeUndefined();
    expect(result.outputs).toEqual({});
  });

  it('applies identity and renaming mappings side by side', async () => {
    const ctx = makeMockContext({ messages: ['stored'], lastProposal: { id: 'p1' } });

    const result = await coreSessionRead.execute(ctx, {
      reads: { sessionMessages: 'messages', lastProposal: 'lastProposal' },
    });

    expect(result.outputs).toEqual({ sessionMessages: ['stored'] });
    expect(ctx.get('lastProposal')).toEqual({ id: 'p1' });
  });
});

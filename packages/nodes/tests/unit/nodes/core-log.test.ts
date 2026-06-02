import { coreLog } from '../../../src/nodes/core-log';
import { makeMockContext } from '../../helpers/mock-context';

describe('core:log', () => {
  it('logs message at specified level', async () => {
    const ctx = makeMockContext();
    const result = await coreLog.execute(ctx, { level: 'info', message: 'hello world' });

    expect(result.status).toBe('complete');
    expect(ctx.log).toHaveBeenCalledWith('info', 'hello world');
    expect(ctx.get('_logged')).toBe(true);
    expect(ctx.get('_log_message')).toBe('hello world');
  });

  it('reads message from messageKey when set', async () => {
    const ctx = makeMockContext({ dynamicMsg: 'from context' });
    const result = await coreLog.execute(ctx, { level: 'warn', message: 'fallback', messageKey: 'dynamicMsg' });

    expect(result.status).toBe('complete');
    expect(ctx.log).toHaveBeenCalledWith('warn', 'from context');
  });

  it('writes to outputKey when configured', async () => {
    const ctx = makeMockContext();
    await coreLog.execute(ctx, { level: 'debug', message: 'test', outputKey: 'lastLog' });

    expect(ctx.get('lastLog')).toBe('test');
  });

  it('emits a node.log event via ctx.emit', async () => {
    const ctx = makeMockContext();
    await coreLog.execute(ctx, { level: 'error', message: 'oops' });

    expect(ctx.emit).toHaveBeenCalledWith('node.log', { level: 'error', message: 'oops' });
  });
});

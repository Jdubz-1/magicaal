// Import after mock setup so we get a fresh instance
function makeSseManager() {
  jest.resetModules();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const m = require('../../../src/sse/sse-manager') as {
    sseManager: {
      subscribe(runId: string, res: unknown): void;
      broadcast(runId: string, event: string, payload: unknown): void;
      close(runId: string): void;
    };
  };
  return m;
}

function mockRes() {
  const written: string[] = [];
  let closeHandler: (() => void) | null = null;
  return {
    _writtenFrames: written,
    setHeader: jest.fn(),
    flushHeaders: jest.fn(),
    write: jest.fn().mockImplementation((data: string) => { written.push(data); return true; }),
    end: jest.fn(),
    on: jest.fn().mockImplementation((event: string, cb: () => void) => {
      if (event === 'close') closeHandler = cb;
    }),
    triggerClose() { if (closeHandler) closeHandler(); },
  };
}

describe('SseManager', () => {
  it('sets correct SSE headers on subscribe', () => {
    const { sseManager } = makeSseManager();
    const res = mockRes();
    sseManager.subscribe('run-1', res);

    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/event-stream');
    expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', 'no-cache');
    expect(res.setHeader).toHaveBeenCalledWith('Connection', 'keep-alive');
    expect(res.flushHeaders).toHaveBeenCalled();
  });

  it('broadcasts event frames to all subscribers', () => {
    const { sseManager } = makeSseManager();
    const res1 = mockRes();
    const res2 = mockRes();

    sseManager.subscribe('run-2', res1);
    sseManager.subscribe('run-2', res2);

    sseManager.broadcast('run-2', 'node.started', { nodeId: 'n1', nodeType: 'core:start' });

    const expected = `event: node.started\ndata: ${JSON.stringify({ nodeId: 'n1', nodeType: 'core:start' })}\n\n`;
    expect(res1._writtenFrames).toContain(expected);
    expect(res2._writtenFrames).toContain(expected);
  });

  it('does not broadcast to disconnected subscribers', () => {
    const { sseManager } = makeSseManager();
    const res = mockRes();

    sseManager.subscribe('run-3', res);
    res.triggerClose();

    sseManager.broadcast('run-3', 'run.started', {});
    expect(res._writtenFrames.some((f) => f.includes('run.started'))).toBe(false);
  });

  it('broadcasts to different runs independently', () => {
    const { sseManager } = makeSseManager();
    const resA = mockRes();
    const resB = mockRes();

    sseManager.subscribe('run-A', resA);
    sseManager.subscribe('run-B', resB);

    sseManager.broadcast('run-A', 'run.completed', { runId: 'run-A' });

    expect(resA._writtenFrames.some((f) => f.includes('run.completed'))).toBe(true);
    expect(resB._writtenFrames.some((f) => f.includes('run.completed'))).toBe(false);
  });

  it('calls end() on all subscribers when close() is called', () => {
    const { sseManager } = makeSseManager();
    const res1 = mockRes();
    const res2 = mockRes();

    sseManager.subscribe('run-4', res1);
    sseManager.subscribe('run-4', res2);
    sseManager.close('run-4');

    expect(res1.end).toHaveBeenCalled();
    expect(res2.end).toHaveBeenCalled();
  });

  it('no-ops broadcast when no subscribers', () => {
    const { sseManager } = makeSseManager();
    expect(() => sseManager.broadcast('no-subscribers', 'run.started', {})).not.toThrow();
  });
});

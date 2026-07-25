jest.mock('@/lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

const mockInvalidate = jest.fn();
jest.mock('@/graph/graph-loader', () => ({
  graphLoader: { invalidate: (...args: unknown[]) => mockInvalidate(...args) },
}));

import {
  GRAPH_INVALIDATE_CHANNEL,
  publishGraphInvalidate,
  startGraphInvalidateSubscriber,
} from '@/graph/graph-invalidate';
import { ENGINE_INSTANCE_ID } from '@/lib/instance-id';

/** Minimal fake Redis: enough surface for duplicate/subscribe/on/publish. */
function fakeRedis() {
  const messageHandlers: Array<(channel: string, message: string) => void> = [];
  const publish = jest.fn().mockResolvedValue(1);
  const subscribe = jest.fn((_channel: string, cb: (err: Error | null) => void) => cb(null));
  const on = jest.fn((event: string, handler: (channel: string, message: string) => void) => {
    if (event === 'message') messageHandlers.push(handler);
  });
  const conn = {
    publish,
    subscribe,
    on,
    duplicate: jest.fn(),
  };
  conn.duplicate.mockReturnValue(conn);
  return { conn, emit: (channel: string, message: string) => messageHandlers.forEach((h) => h(channel, message)) };
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('publishGraphInvalidate (ALIGN-030)', () => {
  it('invalidates locally and publishes an event carrying this instance id', async () => {
    const { conn } = fakeRedis();

    await publishGraphInvalidate(conn as never, 'agent-1');

    expect(mockInvalidate).toHaveBeenCalledWith('agent-1');
    expect(conn.publish).toHaveBeenCalledWith(
      GRAPH_INVALIDATE_CHANNEL,
      JSON.stringify({ agentId: 'agent-1', instanceId: ENGINE_INSTANCE_ID }),
    );
  });
});

describe('startGraphInvalidateSubscriber', () => {
  it('subscribes on a duplicated connection', () => {
    const { conn } = fakeRedis();
    startGraphInvalidateSubscriber(conn as never);
    expect(conn.duplicate).toHaveBeenCalledTimes(1);
    expect(conn.subscribe).toHaveBeenCalledWith(GRAPH_INVALIDATE_CHANNEL, expect.any(Function));
  });

  it('ignores an event carrying its own instance id', () => {
    const { conn, emit } = fakeRedis();
    startGraphInvalidateSubscriber(conn as never);

    emit(GRAPH_INVALIDATE_CHANNEL, JSON.stringify({ agentId: 'agent-1', instanceId: ENGINE_INSTANCE_ID }));

    expect(mockInvalidate).not.toHaveBeenCalled();
  });

  it('invalidates locally when the event came from a different instance', () => {
    const { conn, emit } = fakeRedis();
    startGraphInvalidateSubscriber(conn as never);

    emit(GRAPH_INVALIDATE_CHANNEL, JSON.stringify({ agentId: 'agent-2', instanceId: 'some-other-instance' }));

    expect(mockInvalidate).toHaveBeenCalledWith('agent-2');
  });

  it('ignores messages on unrelated channels', () => {
    const { conn, emit } = fakeRedis();
    startGraphInvalidateSubscriber(conn as never);

    emit('magicaal:package-events', JSON.stringify({ agentId: 'agent-3', instanceId: 'other' }));

    expect(mockInvalidate).not.toHaveBeenCalled();
  });
});

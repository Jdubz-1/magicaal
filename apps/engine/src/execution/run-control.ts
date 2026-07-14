import { redis } from '../queue/client';

/**
 * Cooperative run abort (ALIGN-001/ALIGN-002). A Redis flag is set by whoever
 * wants the run stopped — the cancel endpoint or the scheduler's deadline
 * timer — and checked at node boundaries (executeGraph's BFS loop) and between
 * agent-loop iterations. The abort therefore lands at the next yield point; a
 * node stuck inside a single non-yielding call runs to its own completion
 * first. Redis (rather than process memory) so a cancel reaches the engine
 * instance actually executing the run under horizontal scaling.
 */
export type AbortReason = 'cancelled' | 'timeout';

const ABORT_TTL_SECONDS = 86_400;

function abortKey(runId: string): string {
  return `run:abort:${runId}`;
}

export async function requestAbort(runId: string, reason: AbortReason): Promise<void> {
  await redis.set(abortKey(runId), reason, 'EX', ABORT_TTL_SECONDS);
}

export async function checkAbort(runId: string): Promise<AbortReason | null> {
  const value = await redis.get(abortKey(runId));
  return value === 'cancelled' || value === 'timeout' ? value : null;
}

export async function clearAbort(runId: string): Promise<void> {
  await redis.del(abortKey(runId));
}

/**
 * Arm the run's deadline (ALIGN-002). When it fires, the abort flag is set
 * with reason 'timeout' and the executing worker fails the run with
 * RUN_TIMEOUT at its next boundary check. Returns a disarm function the
 * scheduler calls once the run reaches a terminal state.
 */
export function startRunDeadline(runId: string, timeoutMs: number): () => void {
  const timer = setTimeout(() => {
    void requestAbort(runId, 'timeout');
  }, timeoutMs);
  timer.unref();
  return () => clearTimeout(timer);
}

/** Typed error thrown from the execution loop when an abort flag is seen. */
export function abortError(reason: AbortReason): Error {
  return Object.assign(
    new Error(reason === 'timeout' ? 'Run exceeded its configured timeout' : 'Run was cancelled'),
    {
      code: reason === 'timeout' ? 'RUN_TIMEOUT' : 'RUN_CANCELLED',
      retryable: false,
    },
  );
}

export function isAbortErrorCode(code: unknown): code is 'RUN_TIMEOUT' | 'RUN_CANCELLED' {
  return code === 'RUN_TIMEOUT' || code === 'RUN_CANCELLED';
}

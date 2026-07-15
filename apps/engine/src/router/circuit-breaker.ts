import type { CircuitBreakerConfig } from '@magicaal/core';
import { logger } from '../lib/logger';

export type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

interface BreakerEntry {
  state: CircuitState;
  failureCount: number;
  openedAt?: number;
  halfOpenProbes: number;
}

const DEFAULT_CONFIG: CircuitBreakerConfig = {
  failureThreshold: 5,
  errorRateThreshold: 0.5,
  windowMs: 60_000,
  cooldownMs: 30_000,
  halfOpenProbeCount: 1,
};

class CircuitBreaker {
  private readonly states = new Map<string, BreakerEntry>();

  private entry(targetId: string): BreakerEntry {
    if (!this.states.has(targetId)) {
      this.states.set(targetId, {
        state: 'CLOSED',
        failureCount: 0,
        halfOpenProbes: 0,
      });
    }
    return this.states.get(targetId)!;
  }

  canAttempt(targetId: string, config?: Partial<CircuitBreakerConfig>): boolean {
    const cfg = { ...DEFAULT_CONFIG, ...config };
    const e = this.entry(targetId);

    if (e.state === 'CLOSED') return true;

    if (e.state === 'OPEN') {
      const elapsed = Date.now() - (e.openedAt ?? 0);
      if (elapsed >= cfg.cooldownMs) {
        e.state = 'HALF_OPEN';
        e.halfOpenProbes = 0;
        logger.info({ targetId }, 'Circuit breaker entering HALF_OPEN');
        return true;
      }
      return false;
    }

    // HALF_OPEN — allow probe through
    return e.halfOpenProbes < cfg.halfOpenProbeCount;
  }

  recordSuccess(targetId: string, config?: Partial<CircuitBreakerConfig>): void {
    const cfg = { ...DEFAULT_CONFIG, ...config };
    const e = this.entry(targetId);

    if (e.state === 'HALF_OPEN') {
      e.halfOpenProbes++;
      if (e.halfOpenProbes >= cfg.halfOpenProbeCount) {
        e.state = 'CLOSED';
        e.failureCount = 0;
        logger.info({ targetId }, 'Circuit breaker CLOSED (recovered)');
      }
    } else if (e.state === 'CLOSED') {
      e.failureCount = Math.max(0, e.failureCount - 1);
    }
  }

  recordFailure(targetId: string, config?: Partial<CircuitBreakerConfig>): void {
    const cfg = { ...DEFAULT_CONFIG, ...config };
    const e = this.entry(targetId);

    if (e.state === 'HALF_OPEN') {
      e.state = 'OPEN';
      e.openedAt = Date.now();
      logger.warn({ targetId }, 'Circuit breaker re-OPEN (probe failed)');
      return;
    }

    if (e.state === 'CLOSED') {
      e.failureCount++;
      if (e.failureCount >= cfg.failureThreshold) {
        e.state = 'OPEN';
        e.openedAt = Date.now();
        logger.warn({ targetId, failureCount: e.failureCount }, 'Circuit breaker OPEN');
      }
    }
  }

  getState(targetId: string): CircuitState {
    return this.entry(targetId).state;
  }

  /** All known targets' states — the provider health dashboard's view (ALIGN-024). */
  snapshot(): Record<string, CircuitState> {
    return Object.fromEntries([...this.states].map(([id, e]) => [id, e.state]));
  }
}

export const circuitBreaker = new CircuitBreaker();

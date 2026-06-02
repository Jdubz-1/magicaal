import { circuitBreaker } from '../../../src/router/circuit-breaker';

// Reset circuit breaker state between tests by using unique target IDs
let counter = 0;
function nextId() {
  return `target-${counter++}`;
}

describe('CircuitBreaker', () => {
  describe('CLOSED state', () => {
    it('allows attempts when closed', () => {
      const id = nextId();
      expect(circuitBreaker.canAttempt(id)).toBe(true);
    });

    it('opens after failureThreshold consecutive failures', () => {
      const id = nextId();
      const cfg = { failureThreshold: 3, errorRateThreshold: 0.5, windowMs: 60000, cooldownMs: 1000, halfOpenProbeCount: 1 };

      circuitBreaker.recordFailure(id, cfg);
      expect(circuitBreaker.canAttempt(id, cfg)).toBe(true);
      circuitBreaker.recordFailure(id, cfg);
      expect(circuitBreaker.canAttempt(id, cfg)).toBe(true);
      circuitBreaker.recordFailure(id, cfg);
      // Now should be OPEN
      expect(circuitBreaker.canAttempt(id, cfg)).toBe(false);
      expect(circuitBreaker.getState(id)).toBe('OPEN');
    });

    it('decrements failure count on success', () => {
      const id = nextId();
      const cfg = { failureThreshold: 3, errorRateThreshold: 0.5, windowMs: 60000, cooldownMs: 1000, halfOpenProbeCount: 1 };

      circuitBreaker.recordFailure(id, cfg);
      circuitBreaker.recordFailure(id, cfg);
      circuitBreaker.recordSuccess(id, cfg);
      circuitBreaker.recordFailure(id, cfg);
      // Failure count should be 2 (2-1+1) not 3 — circuit stays closed
      expect(circuitBreaker.getState(id)).toBe('CLOSED');
    });
  });

  describe('OPEN → HALF_OPEN transition', () => {
    it('transitions to HALF_OPEN after cooldown', async () => {
      const id = nextId();
      const cfg = { failureThreshold: 1, errorRateThreshold: 0.5, windowMs: 60000, cooldownMs: 50, halfOpenProbeCount: 1 };

      circuitBreaker.recordFailure(id, cfg);
      expect(circuitBreaker.getState(id)).toBe('OPEN');
      expect(circuitBreaker.canAttempt(id, cfg)).toBe(false);

      await new Promise((r) => setTimeout(r, 60));

      // Should transition to HALF_OPEN
      expect(circuitBreaker.canAttempt(id, cfg)).toBe(true);
      expect(circuitBreaker.getState(id)).toBe('HALF_OPEN');
    });
  });

  describe('HALF_OPEN state', () => {
    it('closes circuit after successful probe', async () => {
      const id = nextId();
      const cfg = { failureThreshold: 1, errorRateThreshold: 0.5, windowMs: 60000, cooldownMs: 50, halfOpenProbeCount: 1 };

      circuitBreaker.recordFailure(id, cfg);
      await new Promise((r) => setTimeout(r, 60));
      circuitBreaker.canAttempt(id, cfg); // triggers HALF_OPEN

      circuitBreaker.recordSuccess(id, cfg);
      expect(circuitBreaker.getState(id)).toBe('CLOSED');
    });

    it('re-opens circuit after failed probe', async () => {
      const id = nextId();
      const cfg = { failureThreshold: 1, errorRateThreshold: 0.5, windowMs: 60000, cooldownMs: 50, halfOpenProbeCount: 1 };

      circuitBreaker.recordFailure(id, cfg);
      await new Promise((r) => setTimeout(r, 60));
      circuitBreaker.canAttempt(id, cfg); // triggers HALF_OPEN

      circuitBreaker.recordFailure(id, cfg);
      expect(circuitBreaker.getState(id)).toBe('OPEN');
    });
  });
});

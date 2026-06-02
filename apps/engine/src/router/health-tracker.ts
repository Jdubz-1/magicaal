const RING_SIZE = 100;

interface HealthSample {
  durationMs: number;
  isError: boolean;
}

class HealthTracker {
  private readonly rings = new Map<string, HealthSample[]>();

  record(targetId: string, durationMs: number, isError: boolean): void {
    if (!this.rings.has(targetId)) {
      this.rings.set(targetId, []);
    }
    const ring = this.rings.get(targetId)!;
    ring.push({ durationMs, isError });
    if (ring.length > RING_SIZE) ring.shift();
  }

  getP50(targetId: string): number | null {
    const ring = this.rings.get(targetId);
    if (!ring || ring.length === 0) return null;
    const sorted = ring.map((s) => s.durationMs).sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
  }

  getErrorRate(targetId: string): number {
    const ring = this.rings.get(targetId);
    if (!ring || ring.length === 0) return 0;
    return ring.filter((s) => s.isError).length / ring.length;
  }

  getSampleCount(targetId: string): number {
    return this.rings.get(targetId)?.length ?? 0;
  }

  getStats(targetId: string): { p50: number | null; errorRate: number; sampleCount: number } {
    return {
      p50: this.getP50(targetId),
      errorRate: this.getErrorRate(targetId),
      sampleCount: this.getSampleCount(targetId),
    };
  }

  reset(targetId: string): void {
    this.rings.delete(targetId);
  }
}

export const healthTracker = new HealthTracker();

import type { RequestHandler } from 'express';
import { eq } from 'drizzle-orm';
import * as crypto from 'node:crypto';
import { db } from '../db/client';
import { usageCounters } from '../db/schema';

/** The UTC day a timestamp falls in, as YYYY-MM-DD. */
function utcDayOf(now: Date): string {
  return now.toISOString().slice(0, 10);
}

/**
 * POST /internal/marketplace/usage (§8.2 / ALIGN-019) — the engine flushes a
 * run's per-package node-execution counts here at run end; the API owns
 * usage_counters. One row per tenant × package × UTC day, incremented.
 */
export const internalRecordUsage: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId, counts } = req.body as {
      tenantId?: string;
      counts?: Record<string, number>;
    };

    if (!tenantId || !counts || typeof counts !== 'object') {
      throw Object.assign(
        new Error('tenantId and counts are required'),
        { status: 400, code: 'INVALID_USAGE_REPORT' },
      );
    }

    const now = new Date();
    const day = utcDayOf(now);
    const windowStart = Math.floor(Date.parse(`${day}T00:00:00.000Z`) / 1000);

    for (const [packageId, n] of Object.entries(counts)) {
      if (!Number.isInteger(n) || n < 1) continue;
      const counterKey = `${tenantId}:${packageId}:${day}`;

      const existing = await db
        .select({ id: usageCounters.id, value: usageCounters.value })
        .from(usageCounters)
        .where(eq(usageCounters.counterKey, counterKey));

      if (existing[0]) {
        await db
          .update(usageCounters)
          .set({ value: existing[0].value + n, updatedAt: now })
          .where(eq(usageCounters.id, existing[0].id));
      } else {
        await db.insert(usageCounters).values({
          id: crypto.randomUUID(),
          tenantId,
          counterKey,
          value: n,
          windowStart,
          updatedAt: now,
        });
      }
    }

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

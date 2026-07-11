import type { RequestHandler } from 'express';
import { eq, desc } from 'drizzle-orm';
import { db } from '../db/client';
import { providerPricing, syncEvents } from '../db/schema';
import { engineClient } from '../lib/engine-client';
import { config } from '../config';

function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Non-sensitive platform feature flags for the frontend. */
export const getSystemConfig: RequestHandler = (_req, res) => {
  res.json({
    marketplaceEnabled: config.marketplaceEnabled,
    marketplaceCatalogSource: config.marketplaceCatalogSource,
  });
};

export const getSystemHealth: RequestHandler = async (_req, res, next) => {
  try {
    let engineStatus: 'ok' | 'unreachable' = 'unreachable';

    try {
      await engineClient.get('/health', { timeout: 3000 });
      engineStatus = 'ok';
    } catch {
      // engine unreachable
    }

    res.json({ api: 'ok', engine: engineStatus });
  } catch (err) {
    next(err);
  }
};

export const listNodes: RequestHandler = async (_req, res, next) => {
  try {
    const response = await engineClient.get('/internal/nodes');
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

export const getProviderPricing: RequestHandler = async (_req, res, next) => {
  try {
    const rows = await db.select().from(providerPricing);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const upsertProviderPricing: RequestHandler = async (req, res, next) => {
  try {
    const entries = req.body as Array<{
      provider: string;
      model: string;
      promptTokensPerMillion: number;
      completionTokensPerMillion: number;
      currency?: string;
    }>;

    if (!Array.isArray(entries) || entries.length === 0) {
      throw Object.assign(new Error('Body must be a non-empty array of pricing entries'), { status: 400 });
    }

    const now = new Date();
    const results = [];
    for (const entry of entries) {
      const existing = await db
        .select()
        .from(providerPricing)
        .where(eq(providerPricing.provider, entry.provider));
      const match = existing.find((r) => r.model === entry.model);

      if (match) {
        const [updated] = await db
          .update(providerPricing)
          .set({
            promptTokensPerMillion: entry.promptTokensPerMillion,
            completionTokensPerMillion: entry.completionTokensPerMillion,
            ...(entry.currency && { currency: entry.currency }),
            effectiveAt: now,
          })
          .where(eq(providerPricing.id, match.id))
          .returning();
        results.push(updated);
      } else {
        const [created] = await db
          .insert(providerPricing)
          .values({
            id: newId(),
            provider: entry.provider,
            model: entry.model,
            promptTokensPerMillion: entry.promptTokensPerMillion,
            completionTokensPerMillion: entry.completionTokensPerMillion,
            currency: entry.currency ?? 'USD',
            effectiveAt: now,
            createdAt: now,
          })
          .returning();
        results.push(created);
      }
    }

    res.json(results);
  } catch (err) {
    next(err);
  }
};

export const getLastSyncEvent: RequestHandler = async (_req, res, next) => {
  try {
    const rows = await db.select().from(syncEvents).orderBy(desc(syncEvents.startedAt)).limit(1);
    res.json(rows[0] ?? null);
  } catch (err) {
    next(err);
  }
};

export const listSyncEvents: RequestHandler = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(String(req.query.limit ?? '20'), 10), 100);
    const rows = await db.select().from(syncEvents).orderBy(desc(syncEvents.startedAt)).limit(limit);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

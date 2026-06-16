import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { caalConfiguration } from '../db/schema';

export const getCaalConfig: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const rows = await db.select().from(caalConfiguration).where(eq(caalConfiguration.tenantId, tenantId));
    if (!rows[0]) {
      res.json(null);
      return;
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

export const upsertCaalConfig: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const {
      enabled,
      modelOverride,
      routerPolicyId,
      generationMode,
      confirmationMode,
      showReasoning,
      systemPromptSuffix,
      preferredConnections,
      allowedOperations,
    } = req.body as Partial<{
      enabled: boolean;
      modelOverride: string;
      routerPolicyId: string;
      generationMode: 'complete' | 'skeleton';
      confirmationMode: 'always_confirm' | 'confirm_structural' | 'apply_directly';
      showReasoning: boolean;
      systemPromptSuffix: string;
      preferredConnections: Record<string, string>;
      allowedOperations: string[];
    }>;

    const now = new Date();
    const existing = await db.select({ id: caalConfiguration.id }).from(caalConfiguration).where(eq(caalConfiguration.tenantId, tenantId));

    if (existing[0]) {
      await db.update(caalConfiguration).set({
        ...(enabled !== undefined && { enabled }),
        ...(modelOverride !== undefined && { modelOverride }),
        ...(routerPolicyId !== undefined && { routerPolicyId }),
        ...(generationMode && { generationMode }),
        ...(confirmationMode && { confirmationMode }),
        ...(showReasoning !== undefined && { showReasoning }),
        ...(systemPromptSuffix !== undefined && { systemPromptSuffix }),
        ...(preferredConnections !== undefined && { preferredConnections: JSON.stringify(preferredConnections) }),
        ...(allowedOperations !== undefined && { allowedOperations: JSON.stringify(allowedOperations) }),
        updatedAt: now,
      }).where(eq(caalConfiguration.tenantId, tenantId));
    } else {
      await db.insert(caalConfiguration).values({
        id: crypto.randomUUID(),
        tenantId,
        enabled: enabled ?? true,
        modelOverride: modelOverride ?? null,
        routerPolicyId: routerPolicyId ?? null,
        generationMode: generationMode ?? 'complete',
        confirmationMode: confirmationMode ?? 'confirm_structural',
        showReasoning: showReasoning ?? false,
        systemPromptSuffix: systemPromptSuffix ?? null,
        preferredConnections: preferredConnections ? JSON.stringify(preferredConnections) : null,
        allowedOperations: allowedOperations ? JSON.stringify(allowedOperations) : null,
        createdAt: now,
        updatedAt: now,
      });
    }

    const rows = await db.select().from(caalConfiguration).where(eq(caalConfiguration.tenantId, tenantId));
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

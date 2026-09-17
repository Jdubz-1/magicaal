import type { RequestHandler } from 'express';
import * as crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { caalConfiguration } from '../db/schema';

/**
 * Field defaults for a tenant that has never saved Caal settings. Shared by the
 * GET response and the insert branch of upsertCaalConfig so the "unsaved" view
 * and the first saved row cannot drift apart.
 */
export const CAAL_CONFIG_DEFAULTS = {
  enabled: true,
  modelOverride: null,
  routerPolicyId: null,
  generationMode: 'complete',
  confirmationMode: 'confirm_structural',
  showReasoning: false,
  systemPromptSuffix: null,
  preferredConnections: null,
  allowedOperations: null,
} as const;

export const getCaalConfig: RequestHandler = async (req, res, next) => {
  try {
    const { tenantId } = req.user!;
    const rows = await db.select().from(caalConfiguration).where(eq(caalConfiguration.tenantId, tenantId));
    if (!rows[0]) {
      // The row is created lazily on first PATCH. Returning null here made
      // every caller null-check an object-shaped response — the Admin Caal
      // page did not, and crashed before it could render the form that would
      // have created the row. Unsaved tenants get the defaults they behave
      // under instead, with id/timestamps null to mark the row as absent.
      res.json({ id: null, tenantId, ...CAAL_CONFIG_DEFAULTS, createdAt: null, updatedAt: null });
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
        enabled: enabled ?? CAAL_CONFIG_DEFAULTS.enabled,
        modelOverride: modelOverride ?? CAAL_CONFIG_DEFAULTS.modelOverride,
        routerPolicyId: routerPolicyId ?? CAAL_CONFIG_DEFAULTS.routerPolicyId,
        generationMode: generationMode ?? CAAL_CONFIG_DEFAULTS.generationMode,
        confirmationMode: confirmationMode ?? CAAL_CONFIG_DEFAULTS.confirmationMode,
        showReasoning: showReasoning ?? CAAL_CONFIG_DEFAULTS.showReasoning,
        systemPromptSuffix: systemPromptSuffix ?? CAAL_CONFIG_DEFAULTS.systemPromptSuffix,
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

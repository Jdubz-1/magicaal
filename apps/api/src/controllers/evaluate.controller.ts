import type { RequestHandler } from 'express';
import { evaluate } from '@magicaal/nodes';

/**
 * The Studio expression editor evaluates on every keystroke-ish interaction,
 * so it gets a tighter budget than a graph node: a runaway expression here
 * would stall the API for every tenant.
 */
const STUDIO_TIMEOUT_MS = 1_000;

export const evaluateExpression: RequestHandler = async (req, res, next) => {
  try {
    const { expression, context = {} } = req.body as {
      expression?: string;
      context?: Record<string, unknown>;
    };
    if (!expression) return res.json({ result: null });
    try {
      const result = await evaluate(expression, context, { timeoutMs: STUDIO_TIMEOUT_MS });
      res.json({ result });
    } catch (err) {
      // Return evaluation errors as 200 with an error field so the UI can display them
      res.json({ error: err instanceof Error ? err.message : String(err) });
    }
  } catch (err) {
    next(err);
  }
};

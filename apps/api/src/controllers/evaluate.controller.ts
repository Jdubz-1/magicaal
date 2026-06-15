import type { RequestHandler } from 'express';
import { evaluate } from '@magicaal/nodes';

export const evaluateExpression: RequestHandler = async (req, res, next) => {
  try {
    const { expression, context = {} } = req.body as {
      expression?: string;
      context?: Record<string, unknown>;
    };
    if (!expression) return res.json({ result: null });
    try {
      const result = await evaluate(expression, context);
      res.json({ result });
    } catch (err) {
      // Return evaluation errors as 200 with an error field so the UI can display them
      res.json({ error: err instanceof Error ? err.message : String(err) });
    }
  } catch (err) {
    next(err);
  }
};
